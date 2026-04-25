<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import ToolCard from '@/components/common/ToolCard.vue';
import { tools, resolveToolPresentation } from '@/data/tools';
import { applySeo, createFaqSchema } from '@/utils/seo';
import { siteName, siteUrl } from '@/utils/site';
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));

applySeo({
  title:
    locale.value === 'en'
      ? `Free Business & Finance Calculators | ${siteName}`
      : `Kalkulator Bisnis & Keuangan Online Gratis | ${siteName}`,
  description:
    locale.value === 'en'
      ? 'Free business and finance calculators for invoices, loans, margin, VAT, ROI, and revenue projection in Indonesia.'
      : 'Kalkulator bisnis dan keuangan online gratis untuk invoice, pinjaman, margin, PPN, ROI, dan proyeksi pendapatan di Indonesia.',
  canonical: `${siteUrl}${locale.value === 'en' ? '/en/kalkulator-bisnis-keuangan-online' : '/kalkulator-bisnis-keuangan-online'}`,
  alternates: [
    { hreflang: 'id', href: `${siteUrl}/id/kalkulator-bisnis-keuangan-online` },
    { hreflang: 'en', href: `${siteUrl}/en/kalkulator-bisnis-keuangan-online` },
    { hreflang: 'x-default', href: `${siteUrl}/kalkulator-bisnis-keuangan-online` },
  ],
  schema: createFaqSchema([
    {
      question: 'Apa saja tool yang tersedia di situs ini?',
      answer:
        'Situs ini menyediakan tool bisnis dan keuangan seperti invoice generator, kalkulator pinjaman, PPN, margin, ROI, dan berbagai kalkulator lain.',
    },
    {
      question: 'Apakah tool bisa dipakai gratis?',
      answer: 'Ya, seluruh tool dapat digunakan secara gratis langsung melalui browser tanpa instalasi aplikasi.',
    },
  ]),
});

const spotlight = computed(() =>
  tools
    .filter((tool) =>
  ['invoice-generator', 'loan-calculator', 'kalkulator-ppn', 'roi-calculator', 'cash-flow-forecast'].includes(tool.slug),
    )
    .map((tool) => resolveToolPresentation(tool, locale.value)),
);
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-300">
          {{ locale === 'en' ? 'SEO Landing Page' : 'SEO Landing Page' }}
        </p>
        <h1 class="mt-4 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl">
          {{
            locale === 'en'
              ? 'Free online business and finance calculators for Indonesian users'
              : 'Kalkulator bisnis dan keuangan online gratis untuk pengguna Indonesia'
          }}
        </h1>
        <p class="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          {{
            locale === 'en'
              ? 'If you are looking for a fast, clean, and easy-to-use set of business calculators, this page is the best entry point. You can quickly find tools for invoices, loans, VAT, margin, ROI, revenue projection, and expense analysis.'
              : 'Jika Anda mencari kumpulan kalkulator bisnis online yang cepat, rapi, dan mudah dipakai, halaman ini adalah pintu masuk terbaik. Di sini Anda bisa langsung menemukan tool untuk invoice, pinjaman, PPN, margin, ROI, proyeksi pendapatan, dan analisis biaya. Struktur halaman dibuat untuk membantu pengguna bergerak dari pencarian umum ke alat yang paling relevan tanpa kebingungan.'
          }}
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink :to="buildLocalePath('/tools', locale)" class="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-400">
            {{ locale === 'en' ? 'View all tools' : 'Lihat semua tools' }}
          </RouterLink>
          <RouterLink :to="buildLocalePath('/contact', locale)" class="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10">
            {{ locale === 'en' ? 'Contact us' : 'Hubungi kami' }}
          </RouterLink>
        </div>
      </div>

      <aside class="glass-panel p-6">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          {{ locale === 'en' ? 'Why this page exists' : 'Kenapa halaman ini dibuat' }}
        </p>
        <p class="mt-3 text-sm leading-7 text-slate-300">
          {{
            locale === 'en'
              ? 'This landing page is designed for high-intent SEO traffic. Visitors from broad keywords can quickly choose the most relevant tool, then move to detail pages with deeper explanations, FAQs, and related tools.'
              : 'Landing page ini ditargetkan untuk traffic SEO dengan intent tinggi. Pengunjung yang datang dari kata kunci umum bisa langsung memilih tool yang paling sesuai, lalu berpindah ke halaman detail yang menyediakan penjelasan lebih dalam, FAQ, dan tool terkait.'
          }}
        </p>
      </aside>
    </div>

    <div class="mt-14">
      <SectionHeading :eyebrow="locale === 'en' ? 'Spotlight Tools' : 'Spotlight Tools'">
        {{ locale === 'en' ? 'The most searched tools' : 'Tool yang paling sering dicari' }}
      </SectionHeading>
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <ToolCard
            v-for="tool in spotlight"
            :key="tool.slug"
            :title="tool.title"
            :description="tool.description"
          :slug="tool.slug"
          :category="tool.category"
        />
      </div>
    </div>

    <div class="prose-like mt-14 max-w-none">
      <SectionHeading :eyebrow="locale === 'en' ? 'SEO Guide' : 'Panduan SEO'">
        {{ locale === 'en' ? 'How to use this site' : 'Cara pakai situs ini' }}
      </SectionHeading>
      <p>
        {{
          locale === 'en'
            ? 'Use this landing page as the main entry point for broad keyword searches. From there, choose the most relevant tool from the category list or spotlight section.'
            : 'Gunakan landing page ini sebagai jalur masuk utama untuk pencarian keyword umum. Setelah itu, pilih tool yang paling sesuai dari daftar kategori atau spotlight. Jika Anda membutuhkan invoice yang rapi, buka invoice generator. Jika fokusnya adalah pembayaran, pinjaman, dan kemampuan cicilan, lanjutkan ke kalkulator pinjaman atau affordability calculator. Jika tujuan Anda adalah analisis margin dan profit, gunakan margin, profit, gross margin, atau net profit calculator.'
        }}
      </p>
      <p>
        {{
          locale === 'en'
            ? 'For business owners and freelancers, this flow helps solve multiple operational problems in one site. You can move from a basic calculation to a deeper analysis without leaving the site.'
            : 'Untuk pemilik bisnis dan freelancer, alur seperti ini membantu menyelesaikan banyak masalah operasional dengan satu situs. Anda bisa berpindah dari perhitungan dasar ke analisis yang lebih dalam tanpa harus mencari situs lain. Itu juga membuat konten situs lebih kaya secara internal linking, sehingga mesin pencari lebih mudah memahami struktur topik dan relevansi antar halaman.'
        }}
      </p>
    </div>
  </section>
</template>
