<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const router = useRouter()
const { hydrateFromToken } = useAuth()

const errorMessage = ref<string | null>(null)

onMounted(async () => {
  const token = typeof route.query.token === 'string' ? route.query.token : ''
  const next = typeof route.query.next === 'string' ? route.query.next : '/'
  const error = typeof route.query.error === 'string' ? route.query.error : ''

  if (error) {
    errorMessage.value = decodeURIComponent(error)
    return
  }

  if (!token) {
    errorMessage.value = 'Missing auth token from Google callback.'
    return
  }

  try {
    await hydrateFromToken(token)
    await router.replace(next)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Google login failed.'
  }
})
</script>

<template>
  <section class="section-shell py-16">
    <div class="glass-panel p-8 text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-300">Auth</p>
      <h1 class="mt-4 text-3xl font-bold text-white">Menyelesaikan login Google...</h1>
      <p v-if="!errorMessage" class="mt-4 text-slate-300">Mohon tunggu sebentar, kami sedang menyambungkan akun Anda.</p>
      <div v-else class="mt-6">
        <p class="text-red-300">{{ errorMessage }}</p>
        <RouterLink to="/" class="mt-6 inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-400">
          Kembali ke Home
        </RouterLink>
      </div>
    </div>
  </section>
</template>
