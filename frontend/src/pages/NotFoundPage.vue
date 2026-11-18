<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { applySeo } from '@/utils/seo';
import { siteBrand, siteUrl } from '@/utils/site';

applySeo({
  title: `Halaman Tidak Ditemukan (404) | ${siteBrand}`,
  description: 'Halaman yang Anda cari tidak tersedia atau telah dipindahkan.',
  canonical: siteUrl,
  robots: 'noindex, nofollow',
});
</script>

<template>
  <section class="section-shell py-16">
    <div class="glass-panel mx-auto max-w-2xl p-8 text-center sm:p-10">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-300">404</p>
      <h1 class="mt-4 text-3xl font-bold text-slate-950 dark:text-white">Halaman tidak ditemukan</h1>
      <p class="mt-4 text-base leading-7 text-slate-700 dark:text-slate-300">
        Tautan yang Anda buka tidak tersedia atau alamatnya sudah berubah. Silakan kembali ke beranda, jelajahi semua kalkulator, atau baca panduan kami.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <RouterLink to="/" class="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-400">
          Kembali ke Beranda
        </RouterLink>
        <RouterLink to="/tools" class="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10">
          Semua Kalkulator
        </RouterLink>
        <RouterLink to="/panduan" class="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10">
          Panduan Keuangan
        </RouterLink>
      </div>
    </div>
  </section>
</template>
