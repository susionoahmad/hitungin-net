<script setup lang="ts">
import { computed, defineAsyncComponent, nextTick, onBeforeUnmount, ref, watch, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import ToolCard from '@/components/common/ToolCard.vue';
import AdInContent from '@/components/ads/AdInContent.vue';
import AdSidebar from '@/components/ads/AdSidebar.vue';
import { getToolBySlug, resolveToolPresentation, tools } from '@/data/tools';
import { applySeo, createBreadcrumbSchema, createFaqSchema, createWebPageSchema } from '@/utils/seo';
import { siteUrl } from '@/utils/site';
import { buildLocalePath, normalizeLocale, type Locale } from '@/utils/locale';
import { t } from '@/utils/localText';
import { createToolDomTranslator } from '@/utils/toolDomTranslator';

const props = defineProps<{ slug: string; locale?: Locale }>();
const locale = computed(() => normalizeLocale(props.locale));

const tool = computed(() => getToolBySlug(props.slug));
const presentedTool = computed(() => (tool.value ? resolveToolPresentation(tool.value, locale.value) : null));
const ToolComponent = computed(() => (tool.value ? defineAsyncComponent(tool.value.component) : null));
const toolHost = ref<HTMLElement | null>(null);
const domTranslator = createToolDomTranslator();

watchEffect(() => {
  if (!tool.value) {
    applySeo({
          title: locale.value === 'en' ? 'Tool not found' : 'Tool tidak ditemukan',
      description:
        locale.value === 'en' ? 'The requested tool page could not be found.' : 'Halaman tool tidak ditemukan.',
      canonical: `${siteUrl}${buildLocalePath(`/${props.slug}`, locale.value)}`,
      alternates: [
        { hreflang: 'id', href: `${siteUrl}${buildLocalePath(`/${props.slug}`, 'id')}` },
        { hreflang: 'en', href: `${siteUrl}${buildLocalePath(`/${props.slug}`, 'en')}` },
        { hreflang: 'x-default', href: `${siteUrl}/${props.slug}` },
      ],
    });
    return;
  }

  const toolPath = props.locale ? `/${props.locale}/${tool.value.slug}` : `/${tool.value.slug}`;
  const displayTool = presentedTool.value ?? tool.value;
  const breadcrumbItems = [
    { name: t('home', locale.value), url: `${siteUrl}/${locale.value}` },
    { name: t('allTools', locale.value), url: `${siteUrl}/${locale.value}/tools` },
    { name: displayTool.title, url: `${siteUrl}${toolPath}` },
  ];

  applySeo({
    title: displayTool.seoTitle,
    description: displayTool.seoDescription,
    canonical: `${siteUrl}${toolPath}`,
    alternates: [
      { hreflang: 'id', href: `${siteUrl}${buildLocalePath(`/${tool.value.slug}`, 'id')}` },
      { hreflang: 'en', href: `${siteUrl}${buildLocalePath(`/${tool.value.slug}`, 'en')}` },
      { hreflang: 'x-default', href: `${siteUrl}/${tool.value.slug}` },
    ],
    schema: [
      createWebPageSchema({
        name: displayTool.title,
        description: displayTool.seoDescription,
        url: `${siteUrl}${toolPath}`,
      }),
      createBreadcrumbSchema(breadcrumbItems),
      createFaqSchema(displayTool.faqs),
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
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-300">{{ presentedTool?.category ?? tool.category }}</p>
          <h1 class="mt-3 text-4xl font-bold text-slate-950 dark:text-white sm:text-5xl">{{ presentedTool?.title ?? tool.title }}</h1>
          <p class="mt-4 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">{{ presentedTool?.intro ?? tool.intro }}</p>

          <div ref="toolHost" class="mt-8">
            <component :is="ToolComponent" />
          </div>

          <AdInContent />

          <article class="prose-like max-w-none">
            <SectionHeading :eyebrow="locale === 'en' ? 'SEO Content' : 'SEO Content'">
              {{ locale === 'en' ? `Complete guide to ${presentedTool?.title ?? tool.title}` : `Panduan lengkap ${presentedTool?.title ?? tool.title}` }}
            </SectionHeading>
            <p>
              {{
                locale === 'en'
                  ? presentedTool?.seoDescription ?? tool.seoDescription
                  : presentedTool?.seoDescription ?? tool.seoDescription
              }}
            </p>
            <p v-if="locale === 'en'">
              This page is designed to help users understand the tool in a practical way, not just see the final
              result. Clear explanations, usage notes, and FAQs make the page useful for both visitors and search
              engines.
            </p>
            <p v-else>
              Halaman ini dibuat untuk membantu pengguna memahami cara kerja tool secara praktis, bukan hanya melihat
              hasil akhirnya. Pada konteks bisnis, penjelasan yang jelas sering sama pentingnya dengan angka yang
              ditampilkan.
            </p>
            <div v-for="section in presentedTool?.content ?? tool.content" :key="section.heading">
              <h2>{{ section.heading }}</h2>
              <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
            </div>
          </article>

          <div class="mt-12">
            <SectionHeading eyebrow="FAQ">{{ locale === 'en' ? 'Frequently asked questions' : 'Pertanyaan yang sering ditanyakan' }}</SectionHeading>
            <div class="space-y-4">
              <details v-for="faq in presentedTool?.faqs ?? tool.faqs" :key="faq.question" class="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                <summary class="cursor-pointer text-base font-semibold text-slate-950 dark:text-white">{{ faq.question }}</summary>
                <p class="mt-3 leading-7 text-slate-700 dark:text-slate-300">{{ faq.answer }}</p>
              </details>
            </div>
          </div>

          <div class="mt-12">
            <SectionHeading eyebrow="Related Tools">{{ t('relatedTools', locale) }}</SectionHeading>
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

          <div class="mt-12 rounded-3xl border border-brand-400/20 bg-brand-500/10 p-6">
            <h2 class="text-2xl font-semibold text-slate-950 dark:text-white">
              {{ locale === 'en' ? 'Explore the site structure' : 'Jelajahi struktur situs' }}
            </h2>
            <p class="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {{
                locale === 'en'
                  ? 'If you want to see all tools at once, open the tools page or our SEO landing page. For questions, visit the contact page.'
                  : 'Kalau Anda ingin melihat semua tool sekaligus, buka halaman tools atau landing SEO kami. Untuk pertanyaan, kunjungi halaman kontak.'
              }}
            </p>
            <div class="mt-5 flex flex-wrap gap-3">
              <RouterLink :to="buildLocalePath('/tools', locale)" class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10">{{ locale === 'en' ? 'All tools' : 'Semua tools' }}</RouterLink>
              <RouterLink :to="buildLocalePath('/kalkulator-bisnis-keuangan-online', locale)" class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10">{{ t('landingSeo', locale) }}</RouterLink>
              <RouterLink :to="buildLocalePath('/contact', locale)" class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10">{{ locale === 'en' ? 'Contact' : 'Kontak' }}</RouterLink>
              <RouterLink :to="buildLocalePath('/sitemap', locale)" class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10">{{ locale === 'en' ? 'Sitemap' : 'Peta situs' }}</RouterLink>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <AdSidebar />
          <div class="glass-panel p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{{ locale === 'en' ? 'Quick Navigation' : 'Navigasi Cepat' }}</p>
            <div class="mt-4 space-y-3 text-sm">
              <RouterLink :to="buildLocalePath('/tools', locale)" class="block text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">{{ locale === 'en' ? 'All tools' : 'Semua tools' }}</RouterLink>
              <RouterLink :to="buildLocalePath('/about', locale)" class="block text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">{{ locale === 'en' ? 'About' : 'Tentang' }}</RouterLink>
              <RouterLink :to="buildLocalePath('/privacy-policy', locale)" class="block text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">{{ locale === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi' }}</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="glass-panel p-8 text-center">
        <h1 class="text-3xl font-bold text-slate-950 dark:text-white">{{ locale === 'en' ? 'Tool not found' : 'Tool tidak ditemukan' }}</h1>
        <p class="mt-4 text-slate-700 dark:text-slate-300">{{ locale === 'en' ? 'Please return to the tools list to choose an available page.' : 'Silakan kembali ke daftar tools untuk memilih halaman yang tersedia.' }}</p>
        <RouterLink :to="buildLocalePath('/tools', locale)" class="mt-6 inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white">
          {{ locale === 'en' ? 'View all tools' : 'Lihat semua tools' }}
        </RouterLink>
      </div>
    </template>
  </section>
</template>
