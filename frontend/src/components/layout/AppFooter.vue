<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale';
import { t } from '@/utils/localText';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));
const brandName = computed(() =>
  locale.value === 'en' ? 'Business & Finance Tools Indonesia' : 'Tools Bisnis & Keuangan Indonesia',
);
const brandDescription = computed(() =>
  locale.value === 'en'
    ? 'A business and finance tool platform built to make daily calculations faster, cleaner, and easier to understand.'
    : 'Platform tools bisnis dan keuangan yang dibuat untuk membantu perhitungan sehari-hari menjadi lebih cepat, rapi, dan mudah dipahami.',
);

const legalLinks = computed(() => [
  { label: t('landingSeo', locale.value), to: buildLocalePath('/kalkulator-bisnis-keuangan-online', locale.value) },
  { label: t('privacy', locale.value), to: buildLocalePath('/privacy-policy', locale.value) },
  { label: t('terms', locale.value), to: buildLocalePath('/terms-of-service', locale.value) },
  { label: t('disclaimer', locale.value), to: buildLocalePath('/disclaimer', locale.value) },
  { label: t('about', locale.value), to: buildLocalePath('/about', locale.value) },
  { label: t('contact', locale.value), to: buildLocalePath('/contact', locale.value) },
  { label: t('sitemap', locale.value), to: buildLocalePath('/sitemap', locale.value) },
]);
</script>

<template>
  <footer class="border-t border-slate-200 bg-white/90 dark:border-white/10 dark:bg-slate-950">
    <div class="section-shell py-10">
      <div class="grid gap-8 md:grid-cols-2">
        <div>
          <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ brandName }}</p>
          <p class="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
            {{ brandDescription }}
          </p>
        </div>
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300">Legal</p>
          <div class="mt-4 flex flex-wrap gap-4">
            <RouterLink v-for="item in legalLinks" :key="item.to" :to="item.to" class="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              {{ item.label }}
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-white/10">
        (c) {{ new Date().getFullYear() }} {{ brandName }}. All rights reserved.
      </div>
    </div>
  </footer>
</template>
