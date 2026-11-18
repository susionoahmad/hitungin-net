<script setup lang="ts">
import { computed, defineAsyncComponent, nextTick, onBeforeUnmount, ref, watch, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import ToolCard from '@/components/common/ToolCard.vue';
import { getToolBySlug, resolveToolPresentation } from '@/data/tools';
import { getToolExtraGuide } from '@/data/toolGuides';
import { getGuideBySlug } from '@/data/guides';
import {
  applySeo,
  createBreadcrumbSchema,
  createFaqSchema,
  createSoftwareAppSchema,
  createWebPageSchema,
} from '@/utils/seo';
import { siteBrand, siteUrl } from '@/utils/site';
import { buildLocalePath, normalizeLocale, type Locale } from '@/utils/locale';
import { t } from '@/utils/localText';
import { createToolDomTranslator } from '@/utils/toolDomTranslator';

const props = defineProps<{ slug: string; locale?: Locale }>();
const locale = computed(() => normalizeLocale(props.locale));

const tool = computed(() => getToolBySlug(props.slug));
const presentedTool = computed(() => (tool.value ? resolveToolPresentation(tool.value, locale.value) : null));
const extraGuide = computed(() => (tool.value ? getToolExtraGuide(tool.value.slug) : undefined));
const linkedArticle = computed(() =>
  extraGuide.value?.relatedGuideSlug ? getGuideBySlug(extraGuide.value.relatedGuideSlug) : undefined,
);
const ToolComponent = computed(() => (tool.value ? defineAsyncComponent(tool.value.component) : null));
const toolHost = ref<HTMLElement | null>(null);
const domTranslator = createToolDomTranslator();

const mergedFaqs = computed(() => {
  const baseFaqs = presentedTool.value?.faqs ?? tool.value?.faqs ?? [];
  if (locale.value === 'en' || !extraGuide.value) {
    return baseFaqs;
  }
  return [...baseFaqs, ...extraGuide.value.extraFaqs];
});

watchEffect(() => {
  const isEn = locale.value === 'en';
  if (!tool.value) {
    applySeo({
      title: isEn ? `Calculator not found | ${siteBrand}` : `Kalkulator tidak ditemukan | ${siteBrand}`,
      description: isEn
        ? 'The requested calculator page could not be found.'
        : 'Halaman kalkulator yang Anda cari tidak ditemukan.',
      canonical: `${siteUrl}/tools`,
      robots: 'noindex, follow',
      lang: locale.value,
    });
    return;
  }

  const toolPath = buildLocalePath(`/${tool.value.slug}`, locale.value);
  const fullUrl = `${siteUrl}${toolPath}`;
  const displayTool = presentedTool.value ?? tool.value;
  const homePath = buildLocalePath('/', locale.value);
  const toolsPath = buildLocalePath('/tools', locale.value);
  const breadcrumbItems = [
    { name: t('home', locale.value), url: `${siteUrl}${homePath === '/' ? '' : homePath}` },
    { name: t('allTools', locale.value), url: `${siteUrl}${toolsPath}` },
    { name: displayTool.title, url: fullUrl },
  ];

  applySeo({
    title: displayTool.seoTitle,
    description: displayTool.seoDescription,
    canonical: fullUrl,
    lang: locale.value,
    robots: isEn ? 'noindex, follow' : 'index, follow',
    schema: [
      createWebPageSchema({
        name: displayTool.title,
        description: displayTool.seoDescription,
        url: fullUrl,
      }),
      createSoftwareAppSchema({
        name: displayTool.title,
        description: displayTool.seoDescription,
        url: fullUrl,
        category: displayTool.category,
      }),
      createBreadcrumbSchema(breadcrumbItems),
      createFaqSchema(mergedFaqs.value),
    ],
  });
});

const relatedTools = computed(() =>
  tool.value
    ? tool.value.relatedSlugs
        .map((slug) => getToolBySlug(slug))
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
        .map((item) => resolveToolPresentation(item, locale.value))
    : [],
);

watch(
  [locale, tool],
  async () => {
    await nextTick();
    domTranslator.attach(toolHost.value, locale.value === 'en');
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  domTranslator.disconnect();
});
</script>

<template>
  <section class="section-shell py-10">
    <template v-if="tool && ToolComponent">
      <Breadcrumbs />
      <div class="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-300">
            {{ presentedTool?.category ?? tool.category }}
          </p>
          <h1 class="mt-3 text-4xl font-bold text-slate-950 dark:text-white sm:text-5xl">
            {{ presentedTool?.title ?? tool.title }}
          </h1>
          <p class="mt-4 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            {{ presentedTool?.intro ?? tool.intro }}
          </p>

          <div ref="toolHost" class="mt-8">
            <component :is="ToolComponent" />
          </div>

          <!-- Formula & Worked Example (High-Value Educational Block) -->
          <div v-if="extraGuide && locale !== 'en'" class="mt-12 space-y-6">
            <div class="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/60">
              <p class="text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-300">
                Rumus & Dasar Perhitungan
              </p>
              <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">
                Cara Kerja {{ presentedTool?.title ?? tool.title }}
              </h2>
              <div class="mt-4 rounded-2xl border border-slate-200 bg-slate-900 px-5 py-4 font-mono text-sm text-emerald-300 dark:border-white/10">
                {{ extraGuide.formula }}
              </div>
              <ul class="mt-5 space-y-2.5 text-sm leading-7 text-slate-700 dark:text-slate-300">
                <li v-for="variable in extraGuide.variables" :key="variable" class="flex items-start gap-2.5">
                  <span class="mt-1 font-bold text-brand-600 dark:text-brand-300">•</span>
                  <span>{{ variable }}</span>
                </li>
              </ul>
            </div>

            <div class="rounded-3xl border border-emerald-500/25 bg-emerald-50/70 p-6 dark:border-emerald-400/20 dark:bg-emerald-500/10">
              <p class="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-300">
                Simulasi Kasus Nyata
              </p>
              <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">
                Contoh Perhitungan Langkah demi Langkah
              </h2>
              <p class="mt-3 text-sm leading-7 text-slate-800 dark:text-slate-200">
                <strong>Skenario:</strong> {{ extraGuide.example.scenario }}
              </p>
              <ol class="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
                <li v-for="step in extraGuide.example.steps" :key="step">{{ step }}</li>
              </ol>
              <p class="mt-4 rounded-2xl bg-white/80 px-4 py-3 text-sm font-semibold text-emerald-900 dark:bg-slate-950/60 dark:text-emerald-200">
                Hasil: {{ extraGuide.example.result }}
              </p>
            </div>
          </div>

          <!-- Detailed Explanation -->
          <article class="prose-like mt-12 max-w-none">
            <SectionHeading :eyebrow="locale === 'en' ? 'Practical Guide' : 'Panduan Praktis'">
              {{
                locale === 'en'
                  ? `How to use ${presentedTool?.title ?? tool.title}`
                  : `Memahami ${presentedTool?.title ?? tool.title}`
              }}
            </SectionHeading>
            <div v-for="section in presentedTool?.content ?? tool.content" :key="section.heading">
              <h2>{{ section.heading }}</h2>
              <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
            </div>
          </article>

          <!-- Practical Tips -->
          <div v-if="extraGuide && locale !== 'en'" class="mt-10 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-300">
              Tips Praktis & Hal yang Perlu Diperhatikan
            </p>
            <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
              <li v-for="tip in extraGuide.tips" :key="tip" class="flex items-start gap-2.5">
                <span class="mt-1 text-brand-600 dark:text-brand-300">✓</span>
                <span>{{ tip }}</span>
              </li>
            </ul>
          </div>

          <!-- Disclaimer Notice -->
          <div class="mt-8 rounded-2xl border border-amber-400/30 bg-amber-50/70 px-5 py-4 text-xs leading-6 text-amber-900 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-200">
            <strong>Catatan:</strong>
            {{
              locale === 'en'
                ? 'Calculation results are simulations for informational and educational purposes. Please verify critical tax, financial, or legal figures with qualified professionals.'
                : 'Hasil perhitungan kalkulator ini bersifat simulasi untuk kebutuhan informasi dan perencanaan awal. Untuk pelaporan pajak atau keputusan hukum resmi, verifikasi kembali dengan profesional terkait.'
            }}
            <RouterLink :to="buildLocalePath('/disclaimer', locale)" class="ml-1 font-semibold underline">
              {{ locale === 'en' ? 'Read Disclaimer' : 'Baca Disclaimer' }}
            </RouterLink>
          </div>

          <!-- FAQ -->
          <div class="mt-12">
            <SectionHeading eyebrow="FAQ">
              {{ locale === 'en' ? 'Frequently asked questions' : 'Pertanyaan yang sering ditanyakan' }}
            </SectionHeading>
            <div class="space-y-4">
              <details
                v-for="faq in mergedFaqs"
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

          <!-- Related Deep Guide -->
          <div v-if="linkedArticle && locale !== 'en'" class="mt-12 rounded-3xl border border-brand-400/25 bg-brand-500/10 p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700 dark:text-brand-300">
              Bacaan Mendalam Terkait
            </p>
            <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ linkedArticle.title }}</h2>
            <p class="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{{ linkedArticle.summary }}</p>
            <div class="mt-5 flex flex-wrap gap-3">
              <RouterLink
                :to="buildLocalePath(`/panduan/${linkedArticle.slug}`, locale)"
                class="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-400"
              >
                Baca Panduan Lengkap →
              </RouterLink>
              <RouterLink
                :to="buildLocalePath('/panduan', locale)"
                class="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                Semua Panduan
              </RouterLink>
            </div>
          </div>

          <!-- Related Tools -->
          <div class="mt-12">
            <SectionHeading :eyebrow="locale === 'en' ? 'Related Calculators' : 'Kalkulator Terkait'">
              {{ t('relatedTools', locale) }}
            </SectionHeading>
            <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <ToolCard
                v-for="related in relatedTools"
                :key="related.slug"
                :title="related.title"
                :description="related.description"
                :slug="related.slug"
                :category="related.category"
              />
            </div>
          </div>
        </div>

        <!-- Clean Sidebar Navigation (No fake Ad placeholders) -->
        <aside class="space-y-6">
          <div class="glass-panel p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              {{ locale === 'en' ? 'Quick Navigation' : 'Navigasi Cepat' }}
            </p>
            <div class="mt-4 space-y-3 text-sm">
              <RouterLink :to="buildLocalePath('/tools', locale)" class="block text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
                {{ locale === 'en' ? 'All Calculators' : 'Semua Kalkulator' }}
              </RouterLink>
              <RouterLink :to="buildLocalePath('/panduan', locale)" class="block text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
                {{ locale === 'en' ? 'Finance Guides' : 'Panduan & Artikel' }}
              </RouterLink>
              <RouterLink :to="buildLocalePath('/glossary', locale)" class="block text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
                {{ locale === 'en' ? 'Financial Glossary' : 'Kamus Finansial' }}
              </RouterLink>
              <RouterLink :to="buildLocalePath('/about', locale)" class="block text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
                {{ locale === 'en' ? 'About & Standards' : 'Tentang & Standar Rumus' }}
              </RouterLink>
              <RouterLink :to="buildLocalePath('/contact', locale)" class="block text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
                {{ locale === 'en' ? 'Report a Formula Issue' : 'Laporkan Koreksi Rumus' }}
              </RouterLink>
            </div>
          </div>

          <div v-if="linkedArticle && locale !== 'en'" class="glass-panel p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-300">
              Panduan Terkait
            </p>
            <p class="mt-3 text-sm font-semibold leading-snug text-slate-950 dark:text-white">
              {{ linkedArticle.title }}
            </p>
            <p class="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400">
              {{ linkedArticle.readTimeMinutes }} menit baca · Dilengkapi tabel contoh Rupiah
            </p>
            <RouterLink
              :to="buildLocalePath(`/panduan/${linkedArticle.slug}`, locale)"
              class="mt-4 inline-flex text-sm font-semibold text-brand-600 hover:underline dark:text-brand-300"
            >
              Pelajari selengkapnya →
            </RouterLink>
          </div>
        </aside>
      </div>
    </template>

    <template v-else>
      <div class="glass-panel p-8 text-center">
        <h1 class="text-3xl font-bold text-slate-950 dark:text-white">
          {{ locale === 'en' ? 'Calculator not found' : 'Kalkulator tidak ditemukan' }}
        </h1>
        <p class="mt-4 text-slate-700 dark:text-slate-300">
          {{
            locale === 'en'
              ? 'Please return to the calculators directory to choose an available tool.'
              : 'Silakan kembali ke daftar kalkulator untuk memilih alat hitung yang tersedia.'
          }}
        </p>
        <RouterLink
          :to="buildLocalePath('/tools', locale)"
          class="mt-6 inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-400"
        >
          {{ locale === 'en' ? 'View all calculators' : 'Lihat semua kalkulator' }}
        </RouterLink>
      </div>
    </template>
  </section>
</template>
