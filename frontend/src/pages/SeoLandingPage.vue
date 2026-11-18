<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import ToolCard from '@/components/common/ToolCard.vue';
import { tools, resolveToolPresentation } from '@/data/tools';
import { applySeo, createBreadcrumbSchema, createFaqSchema, createWebPageSchema } from '@/utils/seo';
import { siteBrand, siteUrl } from '@/utils/site';
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));

const faqs = [
  {
    question: 'Kalkulator mana yang paling penting untuk memulai usaha UMKM?',
    answer:
      'Mulailah dari Unit Cost Calculator untuk memastikan HPP per produk, lanjut ke Kalkulator Margin untuk menetapkan harga jual sehat, lalu Break-Even Point (BEP) untuk mengetahui target penjualan minimal bulanan.',
  },
  {
    question: 'Apakah seluruh kalkulator bisnis dan keuangan di Kalkulatorin gratis?',
    answer:
      'Ya, seluruh kalkulator dasar dapat digunakan secara gratis langsung dari browser tanpa perlu menginstal aplikasi tambahan.',
  },
  {
    question: 'Apakah data angka yang saya masukkan disimpan di server?',
    answer:
      'Tidak. Seluruh perhitungan kalkulator dijalankan secara lokal di browser perangkat Anda untuk menjaga kerahasiaan data finansial Anda.',
  },
];

watchEffect(() => {
  const isEn = locale.value === 'en';
  const path = buildLocalePath('/kalkulator-bisnis-keuangan-online', locale.value);
  const title = isEn
    ? `Business & Finance Calculator Workflows by Profession | ${siteBrand}`
    : `Panduan Memilih Kalkulator Bisnis & Keuangan Sesuai Profesi | ${siteBrand}`;
  const description = isEn
    ? 'Curated calculator workflows for SME owners, online sellers, freelancers, HR teams, and personal financial planning in Indonesia.'
    : 'Temukan alur kalkulator bisnis dan keuangan yang tepat untuk pemilik UMKM, penjual online, freelancer, tim HR, hingga perencanaan keuangan keluarga.';

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
        { name: isEn ? 'Business Directory' : 'Panduan Bisnis', url: `${siteUrl}${path}` },
      ]),
      createFaqSchema(faqs),
    ],
  });
});

const workflows = [
  {
    role: 'Pemilik UMKM & Toko Online',
    summary: 'Fokus menjaga margin produk tetap sehat setelah diskon, ongkir, dan persediaan stok.',
    steps: [
      { label: '1. Hitung HPP per Produk', slug: 'unit-cost-calculator' },
      { label: '2. Tetapkan Margin & Harga Jual', slug: 'kalkulator-margin' },
      { label: '3. Cek Margin Setelah Ongkir', slug: 'shipping-margin-calculator' },
      { label: '4. Hitung Titik Impas (BEP)', slug: 'break-even-point' },
      { label: '5. Atur Reorder Point Stok', slug: 'stock-reorder-point-calculator' },
    ],
  },
  {
    role: 'Freelancer, Agency & Konsultan B2B',
    summary: 'Fokus pada penagihan tepat waktu, pemisahan PPN 11%, dan kestabilan kas proyek.',
    steps: [
      { label: '1. Buat Invoice PDF Profesional', slug: 'invoice-generator' },
      { label: '2. Pisahkan DPP & PPN 11%', slug: 'vat-reverse-calculator' },
      { label: '3. Tetapkan Tanggal Jatuh Tempo', slug: 'invoice-due-date-calculator' },
      { label: '4. Hitung Denda Keterlambatan', slug: 'late-payment-interest-calculator' },
      { label: '5. Proyeksikan Arus Kas', slug: 'cash-flow-forecast' },
    ],
  },
  {
    role: 'Karyawan & Tim HRD',
    summary: 'Fokus memahami penghasilan bersih, potongan pajak PPh 21, hak THR, dan pesangon.',
    steps: [
      { label: '1. Simulasi PPh 21 UU HPP', slug: 'kalkulator-pph-21' },
      { label: '2. Estimasi Gaji Bersih (THP)', slug: 'salary-take-home-calculator' },
      { label: '3. Hitung THR Penuh / Prorata', slug: 'kalkulator-thr' },
      { label: '4. Simulasi Pesangon & UPMK', slug: 'kalkulator-pesangon' },
    ],
  },
  {
    role: 'Perencanaan Keuangan Pribadi & Keluarga',
    summary: 'Fokus membangun dana darurat, menyiapkan pendidikan anak, kredit sehat, dan zakat.',
    steps: [
      { label: '1. Target Dana Darurat', slug: 'kalkulator-dana-darurat' },
      { label: '2. Uji Kemampuan Cicilan Kredit', slug: 'loan-affordability-calculator' },
      { label: '3. Simulasi KPR / Pinjaman', slug: 'loan-calculator' },
      { label: '4. Dana Pendidikan & Inflasi', slug: 'kalkulator-dana-pendidikan' },
      { label: '5. Hitung Zakat Penghasilan/Mal', slug: 'kalkulator-zakat' },
    ],
  },
];

const spotlight = computed(() =>
  tools
    .filter((tool) =>
      ['invoice-generator', 'kalkulator-pph-21', 'kalkulator-ppn', 'loan-calculator', 'kalkulator-margin', 'break-even-point'].includes(
        tool.slug,
      ),
    )
    .map((tool) => resolveToolPresentation(tool, locale.value)),
);
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <div class="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-300">
          Panduan Alur Perhitungan
        </p>
        <h1 class="mt-4 max-w-4xl text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-5xl">
          Panduan Memilih Kalkulator Bisnis & Keuangan Sesuai Kebutuhan Anda
        </h1>
        <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
          Dengan {{ tools.length }} kalkulator yang tersedia di {{ siteBrand }}, halaman ini merangkum urutan kalkulator yang paling relevan sesuai peran Anda — mulai dari pemilik UMKM, freelancer, tim HR, hingga pengelola keuangan keluarga.
        </p>
        <div class="mt-7 flex flex-wrap gap-3">
          <RouterLink :to="buildLocalePath('/tools', locale)" class="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-400">
            Lihat Semua {{ tools.length }} Kalkulator
          </RouterLink>
          <RouterLink :to="buildLocalePath('/panduan', locale)" class="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10">
            Baca Artikel Panduan
          </RouterLink>
        </div>
      </div>

      <aside class="glass-panel p-6">
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
          Cara Memanfaatkan Alur Kerja
        </p>
        <p class="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
          Banyak masalah keuangan tidak cukup diselesaikan oleh satu angka saja. Misalnya, menentukan harga promo perlu menggabungkan HPP, margin kotor, dan biaya pengiriman; sementara mengambil pinjaman perlu mengecek batas DSR sekaligus tabel amortisasi bunga. Pilih jalur profesi di bawah ini untuk memulai langkah demi langkah.
        </p>
      </aside>
    </div>

    <!-- Role-based Workflows -->
    <div class="mt-14">
      <SectionHeading eyebrow="Alur Kerja Praktis">Rekomendasi Berdasarkan Profil Pengguna</SectionHeading>
      <div class="grid gap-6 md:grid-cols-2">
        <div v-for="flow in workflows" :key="flow.role" class="glass-panel p-6">
          <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ flow.role }}</h2>
          <p class="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{{ flow.summary }}</p>
          <div class="mt-5 space-y-2.5">
            <RouterLink
              v-for="step in flow.steps"
              :key="step.slug"
              :to="buildLocalePath(`/${step.slug}`, locale)"
              class="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-medium text-slate-800 transition-colors hover:border-brand-400/50 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:text-brand-300"
            >
              <span>{{ step.label }}</span>
              <span>→</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Spotlight -->
    <div class="mt-14">
      <SectionHeading eyebrow="Paling Sering Digunakan">Kalkulator Unggulan</SectionHeading>
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

    <!-- FAQ -->
    <div class="mt-14">
      <SectionHeading eyebrow="FAQ">Pertanyaan Umum</SectionHeading>
      <div class="space-y-4">
        <details
          v-for="faq in faqs"
          :key="faq.question"
          class="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
        >
          <summary class="cursor-pointer text-base font-semibold text-slate-950 dark:text-white">{{ faq.question }}</summary>
          <p class="mt-3 leading-7 text-slate-700 dark:text-slate-300">{{ faq.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
