<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import { guides } from '@/data/guides';
import { applySeo, createBreadcrumbSchema, createWebPageSchema } from '@/utils/seo';
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale';
import { siteBrand, siteUrl } from '@/utils/site';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));
const selectedCategory = ref('Semua');

const categories = computed(() => ['Semua', ...Array.from(new Set(guides.map((g) => g.category)))]);

const filteredGuides = computed(() => {
  if (selectedCategory.value === 'Semua') return guides;
  return guides.filter((g) => g.category === selectedCategory.value);
});

watchEffect(() => {
  const isEn = locale.value === 'en';
  const path = buildLocalePath('/panduan', locale.value);
  const title = isEn
    ? `Business, Tax & Personal Finance Guides | ${siteBrand}`
    : `Panduan Bisnis, Pajak & Keuangan Indonesia | ${siteBrand}`;
  const description = isEn
    ? 'Practical guides covering profit margin, PPh 21, VAT 11%, break-even analysis, loans, severance pay, zakat, and inventory management in Indonesia.'
    : 'Kumpulan panduan praktis bisnis, pajak, dan keuangan pribadi Indonesia lengkap dengan rumus, tabel simulasi Rupiah, dan kalkulator terkait.';

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
        { name: isEn ? 'Guides' : 'Panduan', url: `${siteUrl}${path}` },
      ]),
    ],
  });
});
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <div class="max-w-3xl">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-300">
        {{ locale === 'en' ? 'Educational Articles' : 'Edukasi Finansial & Bisnis' }}
      </p>
      <h1 class="mt-3 text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-5xl">
        {{ locale === 'en' ? 'Business, Tax & Finance Guides' : 'Panduan Bisnis, Pajak & Keuangan' }}
      </h1>
      <p class="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-300">
        {{
          locale === 'en'
            ? 'In-depth practical articles with formulas, worked Rupiah examples, and direct links to our calculators.'
            : 'Pelajari rumus, contoh kasus nyata dalam Rupiah, serta tips praktis untuk mengelola harga jual, pajak Indonesia, kredit, hingga keuangan keluarga secara lebih terukur.'
        }}
      </p>
    </div>

    <div class="mt-8 flex flex-wrap gap-2">
      <button
        v-for="cat in categories"
        :key="cat"
        type="button"
        @click="selectedCategory = cat"
        :class="[
          'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
          selectedCategory === cat
            ? 'bg-brand-500 text-white shadow-sm'
            : 'border border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10',
        ]"
      >
        {{ cat }}
      </button>
    </div>

    <div class="mt-10 grid gap-6 md:grid-cols-2">
      <article
        v-for="guide in filteredGuides"
        :key="guide.slug"
        class="glass-panel flex flex-col justify-between p-6 transition-all hover:border-brand-400/50"
      >
        <div>
          <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span class="rounded-full bg-brand-500/10 px-3 py-1 font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
              {{ guide.category }}
            </span>
            <span class="text-slate-500 dark:text-slate-400">
              {{ guide.readTimeMinutes }} menit baca · Diperbarui {{ guide.updatedAt }}
            </span>
          </div>
          <h2 class="mt-4 text-2xl font-bold leading-snug text-slate-950 dark:text-white">
            <RouterLink :to="buildLocalePath(`/panduan/${guide.slug}`, locale)" class="hover:text-brand-600 dark:hover:text-brand-300">
              {{ guide.title }}
            </RouterLink>
          </h2>
          <p class="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
            {{ guide.summary }}
          </p>
        </div>

        <div class="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/10">
          <span class="text-xs text-slate-500 dark:text-slate-400">
            {{ guide.relatedToolSlugs.length }} kalkulator terkait
          </span>
          <RouterLink
            :to="buildLocalePath(`/panduan/${guide.slug}`, locale)"
            class="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
          >
            Baca panduan →
          </RouterLink>
        </div>
      </article>
    </div>

    <div class="mt-14 rounded-3xl border border-brand-400/20 bg-brand-500/10 p-6 sm:p-8">
      <SectionHeading eyebrow="Langsung Praktik">Butuh Simulasi Angka Secara Cepat?</SectionHeading>
      <p class="max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300">
        Setiap artikel di atas terhubung langsung dengan kalkulator interaktif kami. Jelajahi seluruh daftar kalkulator atau pelajari istilah finansial dasar di Kamus Finansial.
      </p>
      <div class="mt-5 flex flex-wrap gap-3">
        <RouterLink :to="buildLocalePath('/tools', locale)" class="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-400">
          Buka Semua Kalkulator
        </RouterLink>
        <RouterLink :to="buildLocalePath('/glossary', locale)" class="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10">
          Buka Kamus Finansial
        </RouterLink>
      </div>
    </div>
  </section>
</template>
