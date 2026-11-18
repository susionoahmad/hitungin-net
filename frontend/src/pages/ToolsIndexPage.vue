<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import ToolCard from '@/components/common/ToolCard.vue';
import { tools, resolveToolPresentation } from '@/data/tools';
import { applySeo, createBreadcrumbSchema, createWebPageSchema } from '@/utils/seo';
import { siteBrand, siteUrl } from '@/utils/site';
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));
const searchQuery = ref('');
const selectedCategory = ref('Semua');

const presentedTools = computed(() => tools.map((tool) => resolveToolPresentation(tool, locale.value)));

const categories = computed(() => [
  'Semua',
  ...Array.from(new Set(presentedTools.value.map((tool) => tool.category))),
]);

const filteredTools = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  return presentedTools.value.filter((tool) => {
    const matchCategory = selectedCategory.value === 'Semua' || tool.category === selectedCategory.value;
    if (!matchCategory) return false;
    if (!q) return true;
    return (
      tool.title.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.slug.toLowerCase().includes(q)
    );
  });
});

watchEffect(() => {
  const isEn = locale.value === 'en';
  const path = buildLocalePath('/tools', locale.value);
  const title = isEn
    ? `All Business & Finance Calculators (${tools.length}) | ${siteBrand}`
    : `Semua Kalkulator Bisnis & Keuangan (${tools.length} Alat) | ${siteBrand}`;
  const description = isEn
    ? 'Complete directory of free online business, tax, loan, margin, invoice, and personal finance calculators.'
    : `Daftar lengkap ${tools.length} kalkulator bisnis, pajak, kredit, margin, invoice, dan keuangan pribadi Indonesia yang gratis dan siap pakai.`;

  applySeo({
    title,
    description,
    canonical: `${siteUrl}${path}`,
    lang: locale.value,
    robots: isEn ? 'noindex, follow' : 'index, follow',
    schema: [
      createWebPageSchema({
        name: title,
        description,
        url: `${siteUrl}${path}`,
      }),
      createBreadcrumbSchema([
        { name: isEn ? 'Home' : 'Beranda', url: isEn ? `${siteUrl}/en` : siteUrl },
        { name: isEn ? 'All Calculators' : 'Semua Kalkulator', url: `${siteUrl}${path}` },
      ]),
    ],
  });
});
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <SectionHeading :eyebrow="locale === 'en' ? 'Calculator Directory' : 'Direktori Kalkulator'">
      {{ locale === 'en' ? `All Calculators (${tools.length})` : `Semua Kalkulator Bisnis & Keuangan (${tools.length})` }}
    </SectionHeading>
    <p class="max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
      {{
        locale === 'en'
          ? 'Find the calculator you need by searching or filtering by category. Every tool includes practical explanations, formulas, and FAQs.'
          : 'Cari kalkulator yang sesuai kebutuhan bisnis, pajak, maupun keuangan pribadi Anda. Setiap alat dilengkapi penjelasan rumus, contoh perhitungan Rupiah, dan pertanyaan umum.'
      }}
    </p>

    <!-- Search & Category Filter -->
    <div class="mt-8 space-y-4">
      <div class="max-w-lg">
        <label for="tools-directory-search" class="sr-only">Cari kalkulator</label>
        <input
          id="tools-directory-search"
          v-model="searchQuery"
          type="search"
          :placeholder="locale === 'en' ? 'Search calculator name or topic...' : 'Cari nama kalkulator atau topik (mis. PPN, BEP, KPR, Zakat)...'"
          class="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-brand-500 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
        />
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          @click="selectedCategory = cat"
          :class="[
            'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors',
            selectedCategory === cat
              ? 'bg-brand-500 text-white shadow-sm'
              : 'border border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10',
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <p class="mt-6 text-xs text-slate-500 dark:text-slate-400">
      Menampilkan {{ filteredTools.length }} dari {{ tools.length }} kalkulator.
    </p>

    <div v-if="filteredTools.length > 0" class="mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <ToolCard
        v-for="tool in filteredTools"
        :key="tool.slug"
        :title="tool.title"
        :description="tool.description"
        :slug="tool.slug"
        :category="tool.category"
      />
    </div>
    <div v-else class="glass-panel mt-6 p-8 text-center">
      <p class="text-slate-700 dark:text-slate-300">
        Tidak ditemukan kalkulator dengan filter tersebut.
      </p>
      <button
        type="button"
        class="mt-4 rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white"
        @click="searchQuery = ''; selectedCategory = 'Semua'"
      >
        Reset Filter
      </button>
    </div>
  </section>
</template>
