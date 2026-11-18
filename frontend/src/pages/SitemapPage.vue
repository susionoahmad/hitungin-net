<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import { tools, resolveToolPresentation } from '@/data/tools';
import { guides } from '@/data/guides';
import { applySeo, createBreadcrumbSchema, createWebPageSchema } from '@/utils/seo';
import { siteBrand, siteUrl } from '@/utils/site';
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));

watchEffect(() => {
  const isEn = locale.value === 'en';
  const path = buildLocalePath('/sitemap', locale.value);
  const title = isEn ? `Sitemap | ${siteBrand}` : `Peta Situs | ${siteBrand}`;
  const description = isEn
    ? `Complete navigation sitemap of all ${tools.length} calculators, guides, and information pages on ${siteBrand}.`
    : `Daftar navigasi lengkap seluruh ${tools.length} kalkulator, panduan keuangan, dan halaman informasi di ${siteBrand}.`;

  applySeo({
    title,
    description,
    canonical: `${siteUrl}${path}`,
    lang: locale.value,
    robots: isEn ? 'noindex, follow' : 'index, follow',
    schema: [
      createWebPageSchema({ name: title, description, url: `${siteUrl}${path}` }),
      createBreadcrumbSchema([
        { name: isEn ? 'Home' : 'Beranda', url: isEn ? `${siteUrl}/en` : siteUrl },
        { name: isEn ? 'Sitemap' : 'Peta Situs', url: `${siteUrl}${path}` },
      ]),
    ],
  });
});

const groupedTools = computed(() => {
  const map = new Map<string, ReturnType<typeof resolveToolPresentation>[]>();
  for (const rawTool of tools) {
    const tool = resolveToolPresentation(rawTool, locale.value);
    const list = map.get(tool.category) ?? [];
    list.push(tool);
    map.set(tool.category, list);
  }
  return Array.from(map.entries()).map(([category, items]) => ({ category, items }));
});

const staticPages = computed(() => {
  const isEn = locale.value === 'en';
  return [
    { label: isEn ? 'Home' : 'Beranda', to: buildLocalePath('/', locale.value) },
    { label: isEn ? 'All Calculators' : 'Semua Kalkulator', to: buildLocalePath('/tools', locale.value) },
    { label: isEn ? 'Finance Guides' : 'Panduan Keuangan', to: buildLocalePath('/panduan', locale.value) },
    { label: isEn ? 'Business Workflows' : 'Panduan Alur Bisnis', to: buildLocalePath('/kalkulator-bisnis-keuangan-online', locale.value) },
    { label: isEn ? 'Financial Glossary' : 'Kamus Finansial', to: buildLocalePath('/glossary', locale.value) },
    { label: isEn ? 'About Us' : 'Tentang Kami', to: buildLocalePath('/about', locale.value) },
    { label: isEn ? 'Contact' : 'Kontak', to: buildLocalePath('/contact', locale.value) },
    { label: isEn ? 'Privacy Policy' : 'Kebijakan Privasi', to: buildLocalePath('/privacy-policy', locale.value) },
    { label: isEn ? 'Terms of Service' : 'Ketentuan Layanan', to: buildLocalePath('/terms-of-service', locale.value) },
    { label: 'Disclaimer', to: buildLocalePath('/disclaimer', locale.value) },
  ];
});
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <SectionHeading eyebrow="Navigasi">{{ locale === 'en' ? 'Visual Sitemap' : 'Peta Situs Lengkap' }}</SectionHeading>
    <p class="max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
      {{
        locale === 'en'
          ? `Browse all ${tools.length} calculators, ${guides.length} finance guides, and informational pages available on ${siteBrand}.`
          : `Jelajahi seluruh ${tools.length} kalkulator, ${guides.length} panduan bisnis & keuangan, serta halaman informasi resmi yang tersedia di ${siteBrand}.`
      }}
    </p>

    <div class="mt-10 space-y-8">
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="glass-panel p-6">
          <h2 class="text-xl font-bold text-slate-950 dark:text-white">
            {{ locale === 'en' ? 'Main & Legal Pages' : 'Halaman Utama & Legalitas' }}
          </h2>
          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <RouterLink
              v-for="page in staticPages"
              :key="page.to"
              :to="page.to"
              class="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-medium text-slate-800 hover:border-brand-400/50 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {{ page.label }}
            </RouterLink>
          </div>
        </div>

        <div class="glass-panel p-6">
          <h2 class="text-xl font-bold text-slate-950 dark:text-white">
            {{ locale === 'en' ? 'Educational Guides' : 'Panduan Bisnis & Keuangan' }}
          </h2>
          <div class="mt-4 space-y-2.5">
            <RouterLink
              v-for="guide in guides"
              :key="guide.slug"
              :to="buildLocalePath(`/panduan/${guide.slug}`, locale)"
              class="block rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-medium text-slate-800 hover:border-brand-400/50 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {{ guide.title }}
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="glass-panel p-6">
        <h2 class="text-xl font-bold text-slate-950 dark:text-white">
          {{ locale === 'en' ? `All Calculators by Category (${tools.length})` : `Seluruh Kalkulator Berdasarkan Kategori (${tools.length})` }}
        </h2>
        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <div v-for="group in groupedTools" :key="group.category">
            <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
              {{ group.category }} ({{ group.items.length }})
            </h3>
            <div class="mt-3 grid gap-2.5">
              <RouterLink
                v-for="tool in group.items"
                :key="tool.slug"
                :to="buildLocalePath(`/${tool.slug}`, locale)"
                class="rounded-2xl border border-slate-200 bg-white/70 px-4 py-2.5 text-sm text-slate-800 hover:border-brand-400/50 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
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
