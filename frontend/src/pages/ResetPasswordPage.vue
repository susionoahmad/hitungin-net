<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Breadcrumbs from '@/components/common/Breadcrumbs.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { useAuth } from '@/composables/useAuth'
import { applySeo } from '@/utils/seo'
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale'
import { siteName, siteUrl } from '@/utils/site'

const route = useRoute()
const { resetPassword } = useAuth()

const locale = computed(() => detectLocaleFromPath(route.path))
const isEn = computed(() => locale.value === 'en')

const form = reactive({
  email: '',
  token: '',
  password: '',
  confirmPassword: '',
})

const isSubmitting = ref(false)
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)

const ui = computed(() => (isEn.value
  ? {
      title: 'Reset Password',
      description: 'Update your password securely using the reset token from your email.',
      eyebrow: 'Account Recovery',
      intro: 'Paste your reset token and choose a new password to regain access to your invoice history.',
      email: 'Email',
      token: 'Reset Token',
      password: 'New Password',
      confirmPassword: 'Confirm New Password',
      emailPlaceholder: 'name@business.com',
      tokenPlaceholder: 'Paste reset token',
      passwordPlaceholder: 'Minimum 8 characters',
      confirmPasswordPlaceholder: 'Repeat new password',
      submit: 'Update Password',
      processing: 'Updating...',
      backHome: 'Back to Home',
      backTools: 'Back to Tools',
      emailRequired: 'Email is required.',
      tokenRequired: 'Reset token is required.',
      passwordRequired: 'New password is required.',
      passwordShort: 'New password must be at least 8 characters.',
      confirmRequired: 'Please confirm your new password.',
      passwordMismatch: 'Passwords do not match.',
      success: 'Password updated successfully. You can now return and sign in.',
    }
  : {
      title: 'Reset Password',
      description: 'Perbarui password Anda dengan aman menggunakan token reset dari email.',
      eyebrow: 'Pemulihan Akun',
      intro: 'Tempel token reset dan buat password baru untuk mendapatkan kembali akses ke history invoice Anda.',
      email: 'Email',
      token: 'Token Reset',
      password: 'Password Baru',
      confirmPassword: 'Konfirmasi Password Baru',
      emailPlaceholder: 'nama@bisnis.com',
      tokenPlaceholder: 'Tempel token reset',
      passwordPlaceholder: 'Minimal 8 karakter',
      confirmPasswordPlaceholder: 'Ulangi password baru',
      submit: 'Perbarui Password',
      processing: 'Memperbarui...',
      backHome: 'Kembali ke Home',
      backTools: 'Kembali ke Tools',
      emailRequired: 'Email wajib diisi.',
      tokenRequired: 'Token reset wajib diisi.',
      passwordRequired: 'Password baru wajib diisi.',
      passwordShort: 'Password baru minimal 8 karakter.',
      confirmRequired: 'Konfirmasi password baru wajib diisi.',
      passwordMismatch: 'Konfirmasi password tidak cocok.',
      success: 'Password berhasil diperbarui. Anda sekarang bisa kembali dan login.',
    }))

watch(
  () => route.query,
  (query) => {
    form.email = typeof query.email === 'string' ? query.email : ''
    form.token = typeof query.token === 'string' ? query.token : ''
  },
  { immediate: true },
)

applySeo({
  title: `${ui.value.title} | ${siteName}`,
  description: ui.value.description,
  canonical: `${siteUrl}${buildLocalePath('/reset-password', locale.value)}`,
  alternates: [
    { hreflang: 'id', href: `${siteUrl}${buildLocalePath('/reset-password', 'id')}` },
    { hreflang: 'en', href: `${siteUrl}${buildLocalePath('/reset-password', 'en')}` },
    { hreflang: 'x-default', href: `${siteUrl}/reset-password` },
  ],
})

async function handleSubmit() {
  errorMessage.value = null
  successMessage.value = null

  if (!form.email.trim()) {
    errorMessage.value = ui.value.emailRequired
    return
  }

  if (!form.token.trim()) {
    errorMessage.value = ui.value.tokenRequired
    return
  }

  if (!form.password) {
    errorMessage.value = ui.value.passwordRequired
    return
  }

  if (form.password.length < 8) {
    errorMessage.value = ui.value.passwordShort
    return
  }

  if (!form.confirmPassword) {
    errorMessage.value = ui.value.confirmRequired
    return
  }

  if (form.password !== form.confirmPassword) {
    errorMessage.value = ui.value.passwordMismatch
    return
  }

  isSubmitting.value = true

  try {
    const response = await resetPassword({
      email: form.email.trim(),
      token: form.token.trim(),
      password: form.password,
    })

    successMessage.value = response.message || ui.value.success
    form.password = ''
    form.confirmPassword = ''
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : ui.value.description
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <SectionHeading :eyebrow="ui.eyebrow">{{ ui.title }}</SectionHeading>

    <div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div class="glass-panel p-6 sm:p-8">
        <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">
          {{ ui.intro }}
        </p>

        <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
          <label class="block">
            <span class="text-sm text-slate-600 dark:text-slate-300">{{ ui.email }}</span>
            <input v-model="form.email" type="email" class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none focus:border-brand-400 dark:border-white/10 dark:bg-slate-950 dark:text-white" :placeholder="ui.emailPlaceholder" />
          </label>

          <label class="block">
            <span class="text-sm text-slate-600 dark:text-slate-300">{{ ui.token }}</span>
            <input v-model="form.token" type="text" class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none focus:border-brand-400 dark:border-white/10 dark:bg-slate-950 dark:text-white" :placeholder="ui.tokenPlaceholder" />
          </label>

          <label class="block">
            <span class="text-sm text-slate-600 dark:text-slate-300">{{ ui.password }}</span>
            <input v-model="form.password" type="password" class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none focus:border-brand-400 dark:border-white/10 dark:bg-slate-950 dark:text-white" :placeholder="ui.passwordPlaceholder" />
          </label>

          <label class="block">
            <span class="text-sm text-slate-600 dark:text-slate-300">{{ ui.confirmPassword }}</span>
            <input v-model="form.confirmPassword" type="password" class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none focus:border-brand-400 dark:border-white/10 dark:bg-slate-950 dark:text-white" :placeholder="ui.confirmPasswordPlaceholder" />
          </label>

          <p v-if="errorMessage" class="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-200">
            {{ errorMessage }}
          </p>

          <p v-if="successMessage" class="rounded-2xl border border-brand-400/20 bg-brand-500/10 px-4 py-3 text-sm text-brand-700 dark:text-brand-100">
            {{ successMessage }}
          </p>

          <button type="submit" class="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 font-semibold text-white hover:bg-brand-400 disabled:opacity-60" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
            {{ isSubmitting ? ui.processing : ui.submit }}
          </button>
        </form>
      </div>

      <aside class="glass-panel p-6 sm:p-8">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          {{ ui.eyebrow }}
        </p>
        <div class="mt-4 space-y-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
          <p>
            {{ ui.description }}
          </p>
          <p>
            {{ isEn
              ? 'If you opened a link from the reset email, the email address and token may already be filled in for you.'
              : 'Jika Anda membuka link dari email reset, email dan token bisa langsung terisi otomatis.' }}
          </p>
        </div>

        <div class="mt-6 flex flex-wrap gap-3">
          <RouterLink :to="buildLocalePath('/', locale)" class="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100">
            {{ ui.backHome }}
          </RouterLink>
          <RouterLink :to="buildLocalePath('/tools', locale)" class="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5">
            {{ ui.backTools }}
          </RouterLink>
        </div>
      </aside>
    </div>
  </section>
</template>
