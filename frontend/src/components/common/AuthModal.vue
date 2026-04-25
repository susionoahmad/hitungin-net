<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

const props = defineProps<{
  mode: 'login' | 'register' | 'forgot' | 'reset'
  isEn?: boolean
  isSubmitting?: boolean
  errorMessage?: string | null
  helperMessage?: string | null
  initialEmail?: string
  initialResetToken?: string
  showGoogleButton?: boolean
}>()

const emit = defineEmits<{
  close: []
  switchMode: [mode: 'login' | 'register' | 'forgot' | 'reset']
  submit: [payload: { name: string; email: string; password: string; token: string }]
  google: []
}>()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  token: '',
})
const localError = ref<string | null>(null)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isGoogleLoading = ref(false)

function handleGoogleClick() {
  if (props.isSubmitting || isGoogleLoading.value) return
  isGoogleLoading.value = true
  emit('google')
}

const ui = computed(() => (props.isEn
  ? {
      loginTitle: 'Sign In',
      registerTitle: 'Create Account',
      forgotTitle: 'Forgot Password',
      resetTitle: 'Reset Password',
      subtitleLogin: 'Access your saved invoices and usage history from the Laravel backend.',
      subtitleRegister: 'Create an account to save invoices, reuse drafts, and manage export history.',
      subtitleForgot: 'Enter your email to request a password reset token.',
      subtitleReset: 'Enter the reset token and your new password.',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      token: 'Reset Token',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'name@business.com',
      passwordPlaceholder: 'Minimum 8 characters',
      confirmPasswordPlaceholder: 'Repeat your password',
      tokenPlaceholder: 'Paste the reset token',
      loginSubmit: 'Sign In',
      registerSubmit: 'Create Account',
      forgotSubmit: 'Send Reset Token',
      resetSubmit: 'Update Password',
      switchToLogin: 'Already have an account? Sign in',
      switchToRegister: 'Need an account? Create one',
      switchToForgot: 'Forgot your password?',
      switchToReset: 'Already have a reset token? Reset now',
      google: 'Continue with Google',
      orDivider: 'or continue with email',
      cancel: 'Cancel',
      showPassword: 'Show',
      hidePassword: 'Hide',
      nameRequired: 'Name is required to create an account.',
      emailRequired: 'Email is required.',
      emailInvalid: 'Use a valid email address.',
      passwordRequired: 'Password is required.',
      passwordShort: 'Password must be at least 8 characters.',
      confirmPasswordRequired: 'Please confirm your password.',
      passwordMismatch: 'Passwords do not match.',
      tokenRequired: 'Reset token is required.',
    }
  : {
      loginTitle: 'Login',
      registerTitle: 'Buat Akun',
      forgotTitle: 'Lupa Password',
      resetTitle: 'Reset Password',
      subtitleLogin: 'Masuk untuk membuka invoice tersimpan dan riwayat penggunaan dari backend Laravel.',
      subtitleRegister: 'Buat akun untuk simpan invoice, pakai ulang draft, dan kelola history export.',
      subtitleForgot: 'Masukkan email Anda untuk meminta token reset password.',
      subtitleReset: 'Masukkan token reset dan password baru Anda.',
      name: 'Nama',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Konfirmasi Password',
      token: 'Token Reset',
      namePlaceholder: 'Nama Anda',
      emailPlaceholder: 'nama@bisnis.com',
      passwordPlaceholder: 'Minimal 8 karakter',
      confirmPasswordPlaceholder: 'Ulangi password Anda',
      tokenPlaceholder: 'Tempel token reset',
      loginSubmit: 'Login',
      registerSubmit: 'Buat Akun',
      forgotSubmit: 'Kirim Token Reset',
      resetSubmit: 'Perbarui Password',
      switchToLogin: 'Sudah punya akun? Login',
      switchToRegister: 'Belum punya akun? Buat akun',
      switchToForgot: 'Lupa password?',
      switchToReset: 'Sudah punya token reset? Reset sekarang',
      google: 'Lanjutkan dengan Google',
      orDivider: 'atau lanjut dengan email',
      cancel: 'Batal',
      showPassword: 'Lihat',
      hidePassword: 'Sembunyikan',
      nameRequired: 'Nama wajib diisi untuk membuat akun.',
      emailRequired: 'Email wajib diisi.',
      emailInvalid: 'Gunakan alamat email yang valid.',
      passwordRequired: 'Password wajib diisi.',
      passwordShort: 'Password minimal 8 karakter.',
      confirmPasswordRequired: 'Konfirmasi password wajib diisi.',
      passwordMismatch: 'Konfirmasi password tidak cocok.',
      tokenRequired: 'Token reset wajib diisi.',
    }))

watch(
  () => props.initialEmail,
  (value) => {
    if (typeof value === 'string') {
      form.email = value
    }
  },
  { immediate: true },
)

watch(
  () => props.initialResetToken,
  (value) => {
    form.token = value ?? ''
  },
  { immediate: true },
)

watch(
  () => props.mode,
  () => {
    form.password = ''
    form.confirmPassword = ''
    form.token = props.initialResetToken ?? ''
    localError.value = null
    showPassword.value = false
    showConfirmPassword.value = false
  },
)

watch(
  () => [form.name, form.email, form.password, form.confirmPassword],
  () => {
    localError.value = null
  },
)

function handleSubmit() {
  if (props.mode === 'register' && !form.name.trim()) {
    localError.value = ui.value.nameRequired
    return
  }

  if (!form.email.trim()) {
    localError.value = ui.value.emailRequired
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    localError.value = ui.value.emailInvalid
    return
  }

  if (props.mode === 'forgot') {
    emit('submit', {
      name: form.name.trim(),
      email: form.email.trim(),
      password: '',
      token: '',
    })
    return
  }

  if ((props.mode === 'login' || props.mode === 'register' || props.mode === 'reset') && !form.password) {
    localError.value = ui.value.passwordRequired
    return
  }

  if ((props.mode === 'login' || props.mode === 'register' || props.mode === 'reset') && form.password.length < 8) {
    localError.value = ui.value.passwordShort
    return
  }

  if (props.mode === 'register' && !form.confirmPassword) {
    localError.value = ui.value.confirmPasswordRequired
    return
  }

  if (props.mode === 'register' && form.password !== form.confirmPassword) {
    localError.value = ui.value.passwordMismatch
    return
  }

  if (props.mode === 'reset' && !form.token.trim()) {
    localError.value = ui.value.tokenRequired
    return
  }

  if (props.mode === 'reset' && !form.confirmPassword) {
    localError.value = ui.value.confirmPasswordRequired
    return
  }

  if (props.mode === 'reset' && form.password !== form.confirmPassword) {
    localError.value = ui.value.passwordMismatch
    return
  }

  emit('submit', {
    name: form.name.trim(),
    email: form.email.trim(),
    password: form.password,
    token: form.token.trim(),
  })
}
</script>

<template>
  <div class="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
    <div class="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900 sm:p-8">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white">
            {{ mode === 'login' ? ui.loginTitle : mode === 'register' ? ui.registerTitle : mode === 'forgot' ? ui.forgotTitle : ui.resetTitle }}
          </h3>
          <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {{ mode === 'login' ? ui.subtitleLogin : mode === 'register' ? ui.subtitleRegister : mode === 'forgot' ? ui.subtitleForgot : ui.subtitleReset }}
          </p>
        </div>

        <button type="button" class="rounded-full border border-slate-200 p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:hover:bg-white/5 dark:hover:text-white" @click="emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
        <button
          v-if="showGoogleButton && (mode === 'login' || mode === 'register')"
          type="button"
          class="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50 py-3 font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 disabled:opacity-50"
          :disabled="isSubmitting || isGoogleLoading"
          @click="handleGoogleClick"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="h-5 w-5">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5Z"/>
            <path fill="#FF3D00" d="M6.3 14.7 12.9 19.5C14.7 15 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7Z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.3 35 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.6 5.1C9.5 39.6 16.2 44 24 44Z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 2.8-2.9 5-5.6 6.6l.1-.1 6.2 5.2C35.6 40 44 34 44 24c0-1.3-.1-2.3-.4-3.5Z"/>
          </svg>
          <span v-if="isGoogleLoading" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
          {{ isGoogleLoading ? (isEn ? 'Connecting...' : 'Menghubungkan...') : ui.google }}
        </button>

        <div v-if="showGoogleButton && (mode === 'login' || mode === 'register')" class="flex items-center gap-3 py-1">
          <div class="h-px flex-1 bg-slate-200 dark:bg-white/10"></div>
          <span class="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{{ ui.orDivider }}</span>
          <div class="h-px flex-1 bg-white/10"></div>
        </div>

        <label v-if="mode === 'register'" class="block">
          <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ ui.name }}</span>
          <input v-model="form.name" type="text" class="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-brand-400" :placeholder="ui.namePlaceholder" />
        </label>

        <label class="block">
          <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ ui.email }}</span>
          <input v-model="form.email" type="email" required class="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-brand-400" :placeholder="ui.emailPlaceholder" />
        </label>

        <label v-if="mode !== 'forgot'" class="block">
          <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ ui.password }}</span>
          <div class="mt-2 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required minlength="8" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-brand-400" :placeholder="ui.passwordPlaceholder" />
            <button type="button" class="rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white" @click="showPassword = !showPassword">
              {{ showPassword ? ui.hidePassword : ui.showPassword }}
            </button>
          </div>
        </label>

        <label v-if="mode === 'register' || mode === 'reset'" class="block">
          <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ ui.confirmPassword }}</span>
          <div class="mt-2 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <input v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" required minlength="8" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-brand-400" :placeholder="ui.confirmPasswordPlaceholder" />
            <button type="button" class="rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white" @click="showConfirmPassword = !showConfirmPassword">
              {{ showConfirmPassword ? ui.hidePassword : ui.showPassword }}
            </button>
          </div>
        </label>

        <label v-if="mode === 'reset'" class="block">
          <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ ui.token }}</span>
          <input v-model="form.token" type="text" class="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-brand-400" :placeholder="ui.tokenPlaceholder" />
        </label>

        <p v-if="helperMessage" class="rounded-2xl border border-brand-400/20 bg-brand-500/10 px-4 py-3 text-sm text-brand-100">
          {{ helperMessage }}
        </p>

        <p v-if="localError || errorMessage" class="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {{ localError || errorMessage }}
        </p>

        <button type="submit" class="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 font-semibold text-white hover:bg-brand-400 disabled:opacity-60" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
          {{ mode === 'login' ? ui.loginSubmit : mode === 'register' ? ui.registerSubmit : mode === 'forgot' ? ui.forgotSubmit : ui.resetSubmit }}
        </button>
      </form>

      <div class="mt-5 flex flex-col gap-3 text-sm">
        <button v-if="mode === 'login'" type="button" class="text-left text-brand-200 hover:text-brand-100" @click="emit('switchMode', 'register')">
          {{ ui.switchToRegister }}
        </button>
        <button v-if="mode === 'login'" type="button" class="text-left text-brand-200 hover:text-brand-100" @click="emit('switchMode', 'forgot')">
          {{ ui.switchToForgot }}
        </button>
        <button v-if="mode === 'register'" type="button" class="text-left text-brand-200 hover:text-brand-100" @click="emit('switchMode', 'login')">
          {{ ui.switchToLogin }}
        </button>
        <button v-if="mode === 'forgot'" type="button" class="text-left text-brand-200 hover:text-brand-100" @click="emit('switchMode', 'reset')">
          {{ ui.switchToReset }}
        </button>
        <button v-if="mode === 'forgot' || mode === 'reset'" type="button" class="text-left text-brand-200 hover:text-brand-100" @click="emit('switchMode', 'login')">
          {{ ui.switchToLogin }}
        </button>
        <button v-if="mode === 'reset'" type="button" class="text-left text-brand-200 hover:text-brand-100" @click="emit('switchMode', 'forgot')">
          {{ ui.switchToForgot }}
        </button>
        <button type="button" class="text-left text-slate-500 hover:text-slate-300" @click="emit('close')">
          {{ ui.cancel }}
        </button>
      </div>
    </div>
  </div>
</template>
