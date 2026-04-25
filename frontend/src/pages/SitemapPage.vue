<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import { tools, resolveToolPresentation } from '@/data/tools';
import { applySeo } from '@/utils/seo';
import { siteName, siteUrl } from '@/utils/site';
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));

applySeo({
  title: locale.value === 'en' ? `Sitemap | ${siteName}` : `Peta Situs | ${siteName}`,
  description:
    locale.value === 'en'
      ? 'Visual sitemap for Tools Bisnis & Keuangan Indonesia to make navigation easier.'
      : 'Peta situs visual Tools Bisnis & Keuangan Indonesia untuk navigasi yang lebih mudah.',
  canonical: `${siteUrl}${locale.value === 'en' ? '/en/sitemap' : '/sitemap'}`,
  alternates: [
    { hreflang: 'id', href: `${siteUrl}/id/sitemap` },
    { hreflang: 'en', href: `${siteUrl}/en/sitemap` },
    { hreflang: 'x-default', href: `${siteUrl}/sitemap` },
  ],
});

const groupedTools = computed(() => [
  {
    category: 'Bisnis',
    items: tools.filter((tool) => ['Bisnis', 'Operasional', 'Forecast'].includes(tool.category)).map((tool) => resolveToolPresentation(tool, locale.value)),
  },
  {
    category: 'Sales',
    items: tools.filter((tool) => ['Sales'].includes(tool.category)).map((tool) => resolveToolPresentation(tool, locale.value)),
  },
  {
    category: 'Invoice',
    items: tools.filter((tool) => ['Invoice'].includes(tool.category)).map((tool) => resolveToolPresentation(tool, locale.value)),
  },
  {
    category: 'Keuangan',
    items: tools.filter((tool) => ['Keuangan', 'Investasi', 'Analisis'].includes(tool.category)).map((tool) => resolveToolPresentation(tool, locale.value)),
  },
  {
    category: 'Penagihan',
    items: tools.filter((tool) => ['Penagihan'].includes(tool.category)).map((tool) => resolveToolPresentation(tool, locale.value)),
  },
  {
    category: 'SaaS',
    items: tools.filter((tool) => ['SaaS'].includes(tool.category)).map((tool) => resolveToolPresentation(tool, locale.value)),
  },
  {
    category: 'Inventory',
    items: tools.filter((tool) => ['Inventory'].includes(tool.category)).map((tool) => resolveToolPresentation(tool, locale.value)),
  },
  {
    category: 'Harga & Pajak',
    items: tools.filter((tool) => ['Harga', 'Pajak', 'Kredit'].includes(tool.category)).map((tool) => resolveToolPresentation(tool, locale.value)),
  },
  {
    category: 'Analitik',
    items: tools.filter((tool) => ['Analitik'].includes(tool.category)).map((tool) => resolveToolPresentation(tool, locale.value)),
  },
  {
    category: 'Personal Finance',
    items: tools.filter((tool) => ['Personal Finance'].includes(tool.category)).map((tool) => resolveToolPresentation(tool, locale.value)),
  },
]);

const staticPages = [
  { label: locale.value === 'en' ? 'Home' : 'Home', to: buildLocalePath('/', locale.value) },
  { label: locale.value === 'en' ? 'SEO Landing' : 'Landing SEO', to: buildLocalePath('/kalkulator-bisnis-keuangan-online', locale.value) },
  { label: locale.value === 'en' ? 'All Tools' : 'Semua Tools', to: buildLocalePath('/tools', locale.value) },
  { label: locale.value === 'en' ? 'About' : 'Tentang', to: buildLocalePath('/about', locale.value) },
  { label: locale.value === 'en' ? 'Contact' : 'Kontak', to: buildLocalePath('/contact', locale.value) },
  { label: locale.value === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi', to: buildLocalePath('/privacy-policy', locale.value) },
  { label: locale.value === 'en' ? 'Terms of Service' : 'Ketentuan Layanan', to: buildLocalePath('/terms-of-service', locale.value) },
  { label: locale.value === 'en' ? 'Disclaimer' : 'Disclaimer', to: buildLocalePath('/disclaimer', locale.value) },
];
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <SectionHeading eyebrow="Sitemap">{{ locale === 'en' ? 'Visual Sitemap' : 'Peta Situs Visual' }}</SectionHeading>
    <p class="max-w-3xl text-lg leading-8 text-slate-300">
      {{
        locale === 'en'
          ? 'This page shows the main site structure so users and search engines can navigate all tools and informational pages more easily.'
          : 'Halaman ini menampilkan struktur utama situs agar pengguna dan mesin pencari lebih mudah menjelajahi seluruh tool serta halaman informasi yang tersedia.'
      }}
    </p>

    <div class="mt-10 grid gap-6 lg:grid-cols-2">
      <div class="glass-panel p-6">
        <h2 class="text-xl font-semibold text-white">{{ locale === 'en' ? 'Static Pages' : 'Halaman Statis' }}</h2>
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <RouterLink
            v-for="page in staticPages"
            :key="page.to"
            :to="page.to"
            class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
          >
            {{ page.label }}
          </RouterLink>
        </div>
      </div>

      <div class="glass-panel p-6">
        <h2 class="text-xl font-semibold text-white">{{ locale === 'en' ? 'Tool Categories' : 'Kategori Tool' }}</h2>
        <div class="mt-4 space-y-5">
          <div v-for="group in groupedTools" :key="group.category">
            <h3 class="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">{{ group.category }}</h3>
            <div class="mt-3 grid gap-3 sm:grid-cols-2">
              <RouterLink
                v-for="tool in group.items"
                :key="tool.slug"
                :to="buildLocalePath(`/${tool.slug}`, locale)"
                class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
              >
                {{ tool.title }}
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
