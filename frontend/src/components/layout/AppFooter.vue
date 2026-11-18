<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale';
import { t } from '@/utils/localText';
import { siteBrand } from '@/utils/site';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));

const brandDescription = computed(() =>
  locale.value === 'en'
    ? 'Free Indonesian business, tax, and personal finance calculators designed to support faster and more accurate everyday decisions.'
    : 'Platform kalkulator bisnis, pajak, dan keuangan pribadi Indonesia yang akurat, gratis, dan dirancang untuk membantu pengambilan keputusan finansial sehari-hari.',
);

const popularTools = computed(() => [
  { label: locale.value === 'en' ? 'Invoice Generator' : 'Invoice Generator PDF', to: buildLocalePath('/invoice-generator', locale.value) },
  { label: locale.value === 'en' ? 'PPh 21 Tax Calculator' : 'Kalkulator PPh 21', to: buildLocalePath('/kalkulator-pph-21', locale.value) },
  { label: locale.value === 'en' ? 'VAT 11% Calculator' : 'Kalkulator PPN 11%', to: buildLocalePath('/kalkulator-ppn', locale.value) },
  { label: locale.value === 'en' ? 'Loan Simulator' : 'Simulasi Pinjaman & Amortisasi', to: buildLocalePath('/loan-calculator', locale.value) },
  { label: locale.value === 'en' ? 'Profit Margin Calculator' : 'Kalkulator Margin Keuntungan', to: buildLocalePath('/kalkulator-margin', locale.value) },
  { label: locale.value === 'en' ? 'Zakat Calculator' : 'Kalkulator Zakat BAZNAS', to: buildLocalePath('/kalkulator-zakat', locale.value) },
]);

const educationLinks = computed(() => [
  { label: t('guides', locale.value), to: buildLocalePath('/panduan', locale.value) },
  { label: t('glossary', locale.value), to: buildLocalePath('/glossary', locale.value) },
  { label: t('allTools', locale.value), to: buildLocalePath('/tools', locale.value) },
  { label: t('landingSeo', locale.value), to: buildLocalePath('/kalkulator-bisnis-keuangan-online', locale.value) },
  { label: t('sitemap', locale.value), to: buildLocalePath('/sitemap', locale.value) },
]);

const legalLinks = computed(() => [
  { label: t('about', locale.value), to: buildLocalePath('/about', locale.value) },
  { label: t('contact', locale.value), to: buildLocalePath('/contact', locale.value) },
  { label: t('privacy', locale.value), to: buildLocalePath('/privacy-policy', locale.value) },
  { label: t('terms', locale.value), to: buildLocalePath('/terms-of-service', locale.value) },
  { label: t('disclaimer', locale.value), to: buildLocalePath('/disclaimer', locale.value) },
]);
</script>

<template>
  <footer class="border-t border-slate-200 bg-white/90 dark:border-white/10 dark:bg-slate-950">
    <div class="section-shell py-12">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p class="text-lg font-bold text-slate-900 dark:text-white">{{ siteBrand }}</p>
          <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            {{ brandDescription }}
          </p>
          <p class="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Email:
            <a href="mailto:hello@kalkulatorin.com" class="font-medium text-brand-600 hover:underline dark:text-brand-400">
              hello@kalkulatorin.com
            </a>
          </p>
        </div>

        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300">
            {{ locale === 'en' ? 'Popular Calculators' : 'Kalkulator Populer' }}
          </p>
          <ul class="mt-4 space-y-2.5">
            <li v-for="item in popularTools" :key="item.to">
              <RouterLink :to="item.to" class="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300">
            {{ locale === 'en' ? 'Resources & Guides' : 'Edukasi & Direktori' }}
          </p>
          <ul class="mt-4 space-y-2.5">
            <li v-for="item in educationLinks" :key="item.to">
              <RouterLink :to="item.to" class="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300">
            {{ locale === 'en' ? 'Company & Legal' : 'Informasi & Legalitas' }}
          </p>
          <ul class="mt-4 space-y-2.5">
            <li v-for="item in legalLinks" :key="item.to">
              <RouterLink :to="item.to" class="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
        <span>© {{ new Date().getFullYear() }} {{ siteBrand }} (kalkulatorin.com). All rights reserved.</span>
        <span class="text-xs text-slate-500 dark:text-slate-400">
          {{ locale === 'en' ? 'Calculation results are simulations for informational purposes.' : 'Hasil perhitungan bersifat simulasi edukatif. Konsultasikan keputusan finansial penting dengan profesional.' }}
        </span>
      </div>
    </div>
  </footer>
</template>
