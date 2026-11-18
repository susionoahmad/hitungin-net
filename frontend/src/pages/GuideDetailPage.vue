<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import ToolCard from '@/components/common/ToolCard.vue';
import { getGuideBySlug, guides } from '@/data/guides';
import { getToolBySlug, resolveToolPresentation } from '@/data/tools';
import {
  applySeo,
  createArticleSchema,
  createBreadcrumbSchema,
  createFaqSchema,
} from '@/utils/seo';
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale';
import { siteBrand, siteUrl } from '@/utils/site';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));
const slug = computed(() => String(route.params.slug || ''));
const guide = computed(() => getGuideBySlug(slug.value));

const relatedTools = computed(() =>
  guide.value
    ? guide.value.relatedToolSlugs
        .map((toolSlug) => getToolBySlug(toolSlug))
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
        .map((item) => resolveToolPresentation(item, locale.value))
    : [],
);

const otherGuides = computed(() => guides.filter((g) => g.slug !== slug.value).slice(0, 4));

watchEffect(() => {
  const isEn = locale.value === 'en';
  if (!guide.value) {
    applySeo({
      title: `Panduan tidak ditemukan | ${siteBrand}`,
      description: 'Artikel panduan yang Anda cari tidak ditemukan.',
      canonical: `${siteUrl}/panduan`,
      robots: 'noindex, follow',
      lang: locale.value,
    });
    return;
  }

  const path = buildLocalePath(`/panduan/${guide.value.slug}`, locale.value);
  const fullUrl = `${siteUrl}${path}`;

  applySeo({
    title: guide.value.seoTitle,
    description: guide.value.description,
    canonical: fullUrl,
    type: 'article',
    lang: locale.value,
    robots: isEn ? 'noindex, follow' : 'index, follow',
    schema: [
      createArticleSchema({
        headline: guide.value.title,
        description: guide.value.description,
        url: fullUrl,
        datePublished: guide.value.publishedAt,
        dateModified: guide.value.updatedAt,
      }),
      createBreadcrumbSchema([
        { name: isEn ? 'Home' : 'Beranda', url: isEn ? `${siteUrl}/en` : siteUrl },
        { name: isEn ? 'Guides' : 'Panduan', url: `${siteUrl}${buildLocalePath('/panduan', locale.value)}` },
        { name: guide.value.title, url: fullUrl },
      ]),
      createFaqSchema(guide.value.faqs),
    ],
  });
});
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />

    <template v-if="guide">
      <div class="grid gap-10 xl:grid-cols-[minmax(0,1fr)_320px]">
        <article>
          <div class="flex flex-wrap items-center gap-3 text-xs">
            <span class="rounded-full bg-brand-500/10 px-3 py-1 font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
              {{ guide.category }}
            </span>
            <span class="text-slate-500 dark:text-slate-400">
              {{ guide.readTimeMinutes }} menit baca
            </span>
            <span class="text-slate-500 dark:text-slate-400">
              Diperbarui {{ guide.updatedAt }}
            </span>
          </div>

          <h1 class="mt-4 text-3xl font-bold leading-tight text-slate-950 dark:text-white sm:text-5xl">
            {{ guide.title }}
          </h1>
          <p class="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">
            {{ guide.summary }}
          </p>

          <!-- Key Takeaways -->
          <div class="mt-8 rounded-3xl border border-brand-400/25 bg-brand-500/10 p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700 dark:text-brand-300">
              Ringkasan Poin Penting
            </p>
            <ul class="mt-3 space-y-2 text-sm leading-7 text-slate-800 dark:text-slate-200">
              <li v-for="point in guide.keyTakeaways" :key="point" class="flex items-start gap-2.5">
                <span class="mt-1 text-brand-600 dark:text-brand-300">•</span>
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>

          <!-- Sections -->
          <div class="prose-like mt-8 max-w-none space-y-8">
            <section v-for="section in guide.sections" :key="section.heading">
              <h2>{{ section.heading }}</h2>
              <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>

              <div
                v-if="section.formula"
                class="my-5 rounded-2xl border border-slate-200 bg-slate-900 px-5 py-4 font-mono text-sm text-emerald-300 dark:border-white/10"
              >
                <p class="mb-1 text-[11px] font-sans font-semibold uppercase tracking-widest text-slate-400">
                  Rumus Acuan
                </p>
                {{ section.formula }}
              </div>

              <div
                v-if="section.table"
                class="my-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900/70"
              >
                <table class="w-full text-left text-sm">
                  <thead class="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                    <tr>
                      <th v-for="header in section.table.headers" :key="header" class="px-4 py-3 font-semibold">
                        {{ header }}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 dark:divide-white/10">
                    <tr v-for="(row, idx) in section.table.rows" :key="idx">
                      <td v-for="(cell, cIdx) in row" :key="cIdx" class="px-4 py-3 text-slate-700 dark:text-slate-300">
                        {{ cell }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <ul v-if="section.bullets && section.bullets.length > 0" class="mt-4 list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300">
                <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
              </ul>
            </section>
          </div>

          <!-- Editorial Disclaimer -->
          <div class="mt-10 rounded-2xl border border-amber-400/30 bg-amber-50/80 p-5 text-sm leading-7 text-amber-900 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-200">
            <strong>Catatan Edukasi:</strong> Seluruh contoh angka dan penjelasan di halaman ini disusun untuk tujuan informasi dan pembelajaran. Untuk pelaporan pajak atau keputusan hukum resmi, verifikasi kembali dengan konsultan pajak atau profesional berlisensi. Baca
            <RouterLink :to="buildLocalePath('/disclaimer', locale)" class="underline font-semibold">Disclaimer lengkap</RouterLink>.
          </div>

          <!-- FAQ -->
          <div class="mt-12">
            <SectionHeading eyebrow="FAQ">Pertanyaan yang Sering Ditanyakan</SectionHeading>
            <div class="space-y-4">
              <details
                v-for="faq in guide.faqs"
                :key="faq.question"
                class="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <summary class="cursor-pointer text-base font-semibold text-slate-950 dark:text-white">
                  {{ faq.question }}
                </summary>
                <p class="mt-3 leading-7 text-slate-700 dark:text-slate-300">{{ faq.answer }}</p>
              </details>
            </div>
          </div>

          <!-- Related Tools -->
          <div v-if="relatedTools.length > 0" class="mt-12">
            <SectionHeading eyebrow="Praktik Langsung">Kalkulator Terkait Panduan Ini</SectionHeading>
            <div class="grid gap-6 md:grid-cols-2">
              <ToolCard
                v-for="tool in relatedTools"
                :key="tool.slug"
                :title="tool.title"
                :description="tool.description"
                :slug="tool.slug"
                :category="tool.category"
              />
            </div>
          </div>
        </article>

        <!-- Sidebar -->
        <aside class="space-y-6">
          <div class="glass-panel p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Panduan Lainnya
            </p>
            <div class="mt-4 space-y-4">
              <RouterLink
                v-for="item in otherGuides"
                :key="item.slug"
                :to="buildLocalePath(`/panduan/${item.slug}`, locale)"
                class="block rounded-2xl border border-slate-200 bg-white/60 p-3.5 transition-colors hover:border-brand-400/50 dark:border-white/10 dark:bg-white/5"
              >
                <span class="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">
                  {{ item.category }}
                </span>
                <p class="mt-1 text-sm font-semibold leading-snug text-slate-900 dark:text-white">
                  {{ item.title }}
                </p>
              </RouterLink>
            </div>
          </div>

          <div class="glass-panel p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Navigasi Cepat
            </p>
            <div class="mt-4 space-y-3 text-sm">
              <RouterLink :to="buildLocalePath('/panduan', locale)" class="block text-brand-600 hover:underline dark:text-brand-400">
                ← Semua Panduan
              </RouterLink>
              <RouterLink :to="buildLocalePath('/tools', locale)" class="block text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
                Jelajahi Semua Kalkulator
              </RouterLink>
              <RouterLink :to="buildLocalePath('/glossary', locale)" class="block text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
                Kamus Finansial
              </RouterLink>
              <RouterLink :to="buildLocalePath('/about', locale)" class="block text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
                Standar Editorial Kami
              </RouterLink>
            </div>
          </div>
        </aside>
      </div>
    </template>

    <template v-else>
      <div class="glass-panel p-8 text-center">
        <h1 class="text-3xl font-bold text-slate-950 dark:text-white">Panduan tidak ditemukan</h1>
        <p class="mt-4 text-slate-700 dark:text-slate-300">
          Artikel yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <RouterLink
          :to="buildLocalePath('/panduan', locale)"
          class="mt-6 inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-400"
        >
          Lihat Semua Panduan
        </RouterLink>
      </div>
    </template>
  </section>
</template>
