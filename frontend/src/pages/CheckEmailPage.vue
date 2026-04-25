<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Breadcrumbs from '@/components/common/Breadcrumbs.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { applySeo } from '@/utils/seo'
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale'
import { siteName, siteUrl } from '@/utils/site'

const route = useRoute()
const locale = computed(() => detectLocaleFromPath(route.path))
const isEn = computed(() => locale.value === 'en')
const email = computed(() => typeof route.query.email === 'string' ? route.query.email : '')
const resetUrl = computed(() => typeof route.query.reset_url === 'string' ? route.query.reset_url : '')
const resetToken = computed(() => typeof route.query.reset_token === 'string' ? route.query.reset_token : '')

const ui = computed(() => (isEn.value
  ? {
      title: 'Check Your Email',
      description: 'We have sent password reset instructions to your email inbox.',
      eyebrow: 'Password Recovery',
      intro: 'Your reset request is on its way. Open your inbox and use the reset link to continue.',
      localNote: 'Local development detected. You can open the reset link directly from here.',
      openResetLink: 'Open Reset Link',
      backHome: 'Back to Home',
      backTools: 'Back to Tools',
      sentTo: 'Sent to',
    }
  : {
      title: 'Cek Email Anda',
      description: 'Instruksi reset password sudah dikirim ke inbox email Anda.',
      eyebrow: 'Pemulihan Password',
      intro: 'Permintaan reset Anda sedang diproses. Buka inbox email Anda lalu gunakan link reset untuk melanjutkan.',
      localNote: 'Mode lokal terdeteksi. Anda bisa membuka link reset langsung dari halaman ini.',
      openResetLink: 'Buka Link Reset',
      backHome: 'Kembali ke Home',
      backTools: 'Kembali ke Tools',
      sentTo: 'Dikirim ke',
    }))

applySeo({
  title: `${ui.value.title} | ${siteName}`,
  description: ui.value.description,
  canonical: `${siteUrl}${buildLocalePath('/check-email', locale.value)}`,
  alternates: [
    { hreflang: 'id', href: `${siteUrl}${buildLocalePath('/check-email', 'id')}` },
    { hreflang: 'en', href: `${siteUrl}${buildLocalePath('/check-email', 'en')}` },
    { hreflang: 'x-default', href: `${siteUrl}/check-email` },
  ],
})
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

        <div v-if="email" class="mt-6 rounded-2xl border border-brand-400/20 bg-brand-500/10 px-4 py-4">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 dark:text-brand-200">{{ ui.sentTo }}</p>
          <p class="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{{ email }}</p>
        </div>

        <div v-if="resetUrl" class="mt-6 rounded-2xl border border-slate-200 bg-white/70 px-4 py-4 dark:border-white/10 dark:bg-white/5">
          <p class="text-sm text-slate-700 dark:text-slate-300">{{ ui.localNote }}</p>
          <a :href="resetUrl" class="mt-4 inline-flex rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-400">
            {{ ui.openResetLink }}
          </a>
          <p v-if="resetToken" class="mt-3 break-all text-xs text-slate-500 dark:text-slate-400">
            Token: {{ resetToken }}
          </p>
        </div>
      </div>

      <aside class="glass-panel p-6 sm:p-8">
        <div class="space-y-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
          <p>
            {{ ui.description }}
          </p>
          <p>
            {{ isEn
              ? 'If you do not see the email, check your spam or promotions folder and try again if needed.'
              : 'Jika email belum terlihat, cek folder spam atau promosi lalu coba lagi bila perlu.' }}
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
