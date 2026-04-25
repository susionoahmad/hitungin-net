<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { applySeo } from '@/utils/seo';
import { siteUrl } from '@/utils/site';

applySeo({
  title: 'Halaman tidak ditemukan',
  description: 'Halaman yang Anda cari tidak ditemukan.',
  canonical: siteUrl,
});
</script>

<template>
  <section class="section-shell py-16">
    <div class="glass-panel p-8 text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-300">404</p>
      <h1 class="mt-4 text-3xl font-bold text-white">Halaman tidak ditemukan</h1>
      <p class="mt-4 text-slate-300">Silakan kembali ke beranda atau buka daftar tools untuk melanjutkan.</p>
      <RouterLink to="/" class="mt-6 inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-400">
        Kembali ke Home
      </RouterLink>
    </div>
  </section>
</template>
