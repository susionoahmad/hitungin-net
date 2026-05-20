<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import { glossaryTerms, type GlossaryTerm } from '@/data/glossary';
import { applySeo, createBreadcrumbSchema, createWebPageSchema } from '@/utils/seo';
import { siteName, siteUrl } from '@/utils/site';
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));

const searchQuery = ref('');
const selectedCategory = ref<'all' | 'pajak' | 'investasi' | 'bisnis' | 'kredit' | 'personal'>('all');

// SEO and Meta Setup
watchEffect(() => {
  const isEn = locale.value === 'en';
  const title = isEn ? `Business & Financial Glossary | ${siteName}` : `Kamus Istilah Finansial & Bisnis | ${siteName}`;
  const description = isEn
    ? 'A complete educational dictionary of financial, tax, investment, loan, and business terms in Indonesia with direct calculation tools.'
    : 'Kamus dan panduan lengkap istilah keuangan, pajak, investasi, kredit, dan bisnis di Indonesia yang dilengkapi kalkulator praktis.';
  const path = buildLocalePath('/glossary', locale.value);
  
  applySeo({
    title,
    description,
    canonical: `${siteUrl}${path}`,
    alternates: [
      { hreflang: 'id', href: `${siteUrl}${buildLocalePath('/glossary', 'id')}` },
      { hreflang: 'en', href: `${siteUrl}${buildLocalePath('/glossary', 'en')}` },
      { hreflang: 'x-default', href: `${siteUrl}/glossary` },
    ],
    schema: [
      createWebPageSchema({
        name: title,
        description,
        url: `${siteUrl}${path}`,
      }),
      createBreadcrumbSchema([
        { name: isEn ? 'Home' : 'Beranda', url: `${siteUrl}/${locale.value}` },
        { name: isEn ? 'Glossary' : 'Kamus Finansial', url: `${siteUrl}${path}` },
      ]),
    ],
  });
});

const categories = computed(() => {
  const isEn = locale.value === 'en';
  return [
    { value: 'all', label: isEn ? 'All Categories' : 'Semua Kategori' },
    { value: 'pajak', label: isEn ? 'Tax' : 'Pajak' },
    { value: 'investasi', label: isEn ? 'Investment' : 'Investasi' },
    { value: 'bisnis', label: isEn ? 'Business' : 'Bisnis' },
    { value: 'kredit', label: isEn ? 'Credit & Loans' : 'Kredit & Pinjaman' },
    { value: 'personal', label: isEn ? 'Personal Finance' : 'Keuangan Pribadi' },
  ];
});

// Filtering logic
const filteredTerms = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  const cat = selectedCategory.value;
  const isEn = locale.value === 'en';

  return glossaryTerms.filter((term) => {
    // Filter by category
    if (cat !== 'all' && term.category !== cat) {
      return false;
    }

    // Filter by search query
    if (query) {
      const termText = isEn ? term.term.en : term.term.id;
      const defText = isEn ? term.definition.en : term.definition.id;
      return termText.toLowerCase().includes(query) || defText.toLowerCase().includes(query);
    }

    return true;
  });
});

function clearSearch() {
  searchQuery.value = '';
}
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    
    <div class="grid gap-8 lg:grid-cols-[1fr_300px]">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-300">
          {{ locale === 'en' ? 'Education Directory' : 'Direktori Edukasi' }}
        </p>
        <h1 class="mt-4 text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-5xl">
          {{ locale === 'en' ? 'Financial & Business Glossary' : 'Kamus Istilah Finansial & Bisnis' }}
        </h1>
        <p class="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-300">
          {{
            locale === 'en'
              ? 'Find clear definitions, formulas, and explanations of common financial terms. Navigate directly from concepts to their corresponding calculators.'
              : 'Temukan definisi ringkas, penjelasan rumus, dan penerapan praktis untuk berbagai istilah keuangan. Hubungkan pemahaman teori langsung ke alat perhitungan kami.'
          }}
        </p>

        <!-- Search Input -->
        <div class="mt-8 relative max-w-lg">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="locale === 'en' ? 'Search terms...' : 'Cari istilah keuangan...'"
            class="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 pr-12 text-slate-900 shadow-sm placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
          />
          <button
            v-if="searchQuery"
            type="button"
            @click="clearSearch"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Filter Categories Tabs -->
        <div class="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4 dark:border-white/10">
          <button
            v-for="cat in categories"
            :key="cat.value"
            type="button"
            @click="selectedCategory = cat.value as any"
            :class="[
              'rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200',
              selectedCategory === cat.value
                ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/20'
                : 'bg-white/80 border border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-white/5 dark:border-white/5 dark:text-slate-300 dark:hover:bg-white/10'
            ]"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Terms Cards Grid -->
        <div class="mt-8 space-y-6">
          <div
            v-for="term in filteredTerms"
            :key="term.slug"
            class="group rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm transition-all duration-300 hover:border-brand-400/40 hover:bg-white dark:border-white/10 dark:bg-slate-900/50 dark:hover:border-brand-500/30 dark:hover:bg-slate-900"
          >
            <div class="flex flex-wrap items-center justify-between gap-2">
              <h2 class="text-xl font-bold text-slate-950 dark:text-white transition-colors duration-200 group-hover:text-brand-600 dark:group-hover:text-brand-300">
                {{ locale === 'en' ? term.term.en : term.term.id }}
              </h2>
              <span class="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                {{ locale === 'en' ? term.categoryLabel.en : term.categoryLabel.id }}
              </span>
            </div>
            
            <p class="mt-3 text-base leading-7 text-slate-700 dark:text-slate-300">
              {{ locale === 'en' ? term.definition.en : term.definition.id }}
            </p>

            <div v-if="term.relatedToolSlug" class="mt-4 flex justify-end">
              <RouterLink
                :to="buildLocalePath(`/${term.relatedToolSlug}`, locale)"
                class="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
              >
                <span>{{ locale === 'en' ? 'Open related calculator' : 'Buka kalkulator terkait' }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </RouterLink>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-if="filteredTerms.length === 0"
            class="rounded-3xl border border-dashed border-slate-200 bg-white/30 py-16 text-center dark:border-white/10 dark:bg-white/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.636Z" />
            </svg>
            <h3 class="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
              {{ locale === 'en' ? 'No terms found' : 'Istilah tidak ditemukan' }}
            </h3>
            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {{ locale === 'en' ? 'Try adjusting your search keywords or category filters.' : 'Coba sesuaikan kata kunci pencarian atau filter kategori Anda.' }}
            </p>
            <button
              type="button"
              @click="clearSearch(); selectedCategory = 'all'"
              class="mt-4 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400"
            >
              {{ locale === 'en' ? 'Reset Filters' : 'Reset Filter' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar guide info -->
      <aside class="space-y-6">
        <div class="glass-panel p-5">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            {{ locale === 'en' ? 'About Our Glossary' : 'Tentang Kamus Kami' }}
          </p>
          <p class="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
            {{
              locale === 'en'
                ? 'This glossary is verified by financial planners and complies with Indonesian tax codes (UU HPP), BAZNAS standards, and financial standards. Feel free to use the terms for reference.'
                : 'Kamus ini dibuat berdasarkan standar akuntansi nasional, peraturan perpajakan resmi Indonesia (UU HPP), dan ketentuan BAZNAS. Silakan gunakan definisi ini sebagai referensi bisnis yang terpercaya.'
            }}
          </p>
        </div>

        <div class="glass-panel p-5">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            {{ locale === 'en' ? 'Helpful Links' : 'Tautan Berguna' }}
          </p>
          <div class="mt-4 space-y-3 text-sm">
            <RouterLink
              :to="buildLocalePath('/tools', locale)"
              class="block text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
            >
              {{ locale === 'en' ? 'All Calculator Tools' : 'Semua Alat Kalkulator' }}
            </RouterLink>
            <RouterLink
              :to="buildLocalePath('/about', locale)"
              class="block text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
            >
              {{ locale === 'en' ? 'About Editorial Policy' : 'Tentang Kebijakan Editorial' }}
            </RouterLink>
            <RouterLink
              :to="buildLocalePath('/contact', locale)"
              class="block text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
            >
              {{ locale === 'en' ? 'Request new definition' : 'Usulkan istilah baru' }}
            </RouterLink>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>
