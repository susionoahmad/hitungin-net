<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import SectionHeading from '@/components/common/SectionHeading.vue';
import ToolCard from '@/components/common/ToolCard.vue';
import { tools, resolveToolPresentation } from '@/data/tools';
import { guides } from '@/data/guides';
import { applySeo } from '@/utils/seo';
import { siteBrand, siteDescription, siteName, siteUrl } from '@/utils/site';
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale';
import { trackClickEvent } from '@/utils/tracking';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));
const searchQuery = ref('');
const activeGroup = ref('Semua');

watchEffect(() => {
  const isEn = locale.value === 'en';
  applySeo({
    title: isEn
      ? `${siteBrand} — Indonesian Business, Tax & Finance Calculators`
      : siteName,
    description: isEn
      ? 'Free Indonesian business, tax, and personal finance calculators for invoices, PPh 21, VAT 11%, loans, profit margins, break-even points, and zakat.'
      : siteDescription,
    canonical: isEn ? `${siteUrl}/en` : siteUrl,
    lang: locale.value,
    robots: isEn ? 'noindex, follow' : 'index, follow',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteBrand,
        alternateName: siteName,
        url: siteUrl,
        inLanguage: 'id-ID',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteBrand,
        url: siteUrl,
        email: 'hello@kalkulatorin.com',
      },
    ],
  });
});

const categoryGroups = [
  { id: 'Semua', label: 'Semua Populer', slugs: ['invoice-generator', 'kalkulator-pph-21', 'kalkulator-ppn', 'loan-calculator', 'kalkulator-margin', 'break-even-point', 'kalkulator-zakat', 'kalkulator-pesangon', 'kalkulator-dana-darurat'] },
  { id: 'Pajak & HR', label: 'Pajak & HR Indonesia', slugs: ['kalkulator-pph-21', 'kalkulator-ppn', 'vat-reverse-calculator', 'kalkulator-thr', 'kalkulator-pesangon', 'salary-take-home-calculator'] },
  { id: 'Bisnis & Pricing', label: 'UMKM & Pricing', slugs: ['invoice-generator', 'kalkulator-margin', 'price-markup-calculator', 'gross-margin-calculator', 'kalkulator-diskon', 'shipping-margin-calculator'] },
  { id: 'Keuangan & Kredit', label: 'Kredit & Arus Kas', slugs: ['loan-calculator', 'flat-installment-calculator', 'loan-affordability-calculator', 'cash-flow-forecast', 'break-even-point', 'roi-calculator'] },
  { id: 'Keuangan Pribadi', label: 'Keuangan Pribadi', slugs: ['kalkulator-zakat', 'kalkulator-dana-darurat', 'kalkulator-inflasi', 'kalkulator-dana-pendidikan', 'kalkulator-pelunasan-hutang', 'compound-interest-calculator'] },
];

const displayedTools = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (q) {
    return tools
      .map((tool) => resolveToolPresentation(tool, locale.value))
      .filter(
        (tool) =>
          tool.title.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          tool.category.toLowerCase().includes(q) ||
          tool.slug.toLowerCase().includes(q),
      )
      .slice(0, 12);
  }
  const group = categoryGroups.find((g) => g.id === activeGroup.value) ?? categoryGroups[0];
  return group.slugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((tool) => resolveToolPresentation(tool, locale.value));
});

const featuredGuides = computed(() => guides.slice(0, 4));

function trackHomeClick(label: string, target: string) {
  trackClickEvent({
    click_text: label,
    click_target: buildLocalePath(target, locale.value),
    click_location: 'home',
    language: locale.value,
  });
}
</script>

<template>
  <section class="section-shell pb-16 pt-10">
    <!-- Hero -->
    <div class="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-300">
          {{ siteBrand }} · {{ tools.length }} Kalkulator Gratis
        </p>
        <h1 class="mt-4 max-w-3xl text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-5xl">
          {{
            locale === 'en'
              ? 'Accurate business, tax, and personal finance calculators for Indonesia.'
              : 'Kalkulator bisnis, pajak, dan keuangan Indonesia yang cepat dan akurat.'
          }}
        </h1>
        <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
          {{
            locale === 'en'
              ? 'Calculate invoices, PPh 21, VAT 11%, loan amortization, profit margin, break-even points, severance pay, and zakat directly in your browser — complete with formulas and worked Rupiah examples.'
              : 'Hitung invoice PDF, PPh 21, PPN 11%, simulasi cicilan pinjaman, margin keuntungan, titik impas (BEP), pesangon, hingga zakat langsung dari browser Anda — lengkap dengan rumus dan contoh perhitungan Rupiah.'
          }}
        </p>

        <!-- Quick Search -->
        <div class="mt-6 max-w-xl">
          <label for="home-tool-search" class="sr-only">Cari kalkulator</label>
          <input
            id="home-tool-search"
            v-model="searchQuery"
            type="search"
            :placeholder="locale === 'en' ? 'Search calculators (e.g. VAT, PPh 21, margin, loan)...' : 'Cari kalkulator (mis. PPh 21, PPN, invoice, margin, KPR, zakat)...'"
            class="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-brand-500 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
          />
        </div>

        <div class="mt-5 flex flex-wrap gap-3">
          <RouterLink
            :to="buildLocalePath('/tools', locale)"
            class="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-400"
            @click="trackHomeClick('Lihat semua kalkulator', '/tools')"
          >
            {{ locale === 'en' ? `Browse All ${tools.length} Calculators` : `Jelajahi Semua ${tools.length} Kalkulator` }}
          </RouterLink>
          <RouterLink
            :to="buildLocalePath('/panduan', locale)"
            class="rounded-full border border-brand-400/40 bg-brand-500/10 px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-500/20 dark:text-brand-200"
            @click="trackHomeClick('Baca Panduan Keuangan', '/panduan')"
          >
            {{ locale === 'en' ? 'Read Finance Guides' : 'Baca Panduan Keuangan' }}
          </RouterLink>
          <RouterLink
            :to="buildLocalePath('/glossary', locale)"
            class="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
            @click="trackHomeClick('Kamus Finansial', '/glossary')"
          >
            {{ locale === 'en' ? 'Financial Glossary' : 'Kamus Finansial' }}
          </RouterLink>
        </div>
      </div>

      <aside class="glass-panel p-6">
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-300">
          {{ locale === 'en' ? 'Built for Indonesian Context' : 'Dirancang untuk Kebutuhan Indonesia' }}
        </p>
        <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
          <li class="flex items-start gap-2.5">
            <span class="mt-0.5 font-bold text-brand-600 dark:text-brand-300">✓</span>
            <span><strong>Acuan Regulasi Lokal:</strong> PPN 11% & PPh 21 (UU HPP), Pesangon & THR (PP 35/2021), serta Zakat (BAZNAS).</span>
          </li>
          <li class="flex items-start gap-2.5">
            <span class="mt-0.5 font-bold text-brand-600 dark:text-brand-300">✓</span>
            <span><strong>Privasi Terjaga:</strong> Seluruh perhitungan diproses langsung di perangkat Anda tanpa menyimpan data input finansial ke server.</span>
          </li>
          <li class="flex items-start gap-2.5">
            <span class="mt-0.5 font-bold text-brand-600 dark:text-brand-300">✓</span>
            <span><strong>Dilengkapi Rumus & Contoh:</strong> Setiap kalkulator menyertakan rumus terbuka dan simulasi angka Rupiah agar mudah diverifikasi.</span>
          </li>
        </ul>
      </aside>
    </div>

    <!-- Categorized Calculator Showcase -->
    <div class="mt-14">
      <SectionHeading :eyebrow="locale === 'en' ? 'Calculators' : 'Pilih Kalkulator'">
        {{ searchQuery.trim() ? `Hasil pencarian "${searchQuery}"` : (locale === 'en' ? 'Popular Calculators by Category' : 'Kalkulator Populer Berdasarkan Kebutuhan') }}
      </SectionHeading>

      <div v-if="!searchQuery.trim()" class="mb-6 flex flex-wrap gap-2">
        <button
          v-for="group in categoryGroups"
          :key="group.id"
          type="button"
          @click="activeGroup = group.id"
          :class="[
            'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
            activeGroup === group.id
              ? 'bg-brand-500 text-white shadow-sm'
              : 'border border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10',
          ]"
        >
          {{ group.label }}
        </button>
      </div>

      <div v-if="displayedTools.length > 0" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ToolCard
          v-for="tool in displayedTools"
          :key="tool.slug"
          :title="tool.title"
          :description="tool.description"
          :slug="tool.slug"
          :category="tool.category"
        />
      </div>
      <div v-else class="glass-panel p-8 text-center">
        <p class="text-slate-700 dark:text-slate-300">Tidak ada kalkulator yang cocok dengan kata kunci "{{ searchQuery }}".</p>
        <button type="button" class="mt-4 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white" @click="searchQuery = ''">
          Reset Pencarian
        </button>
      </div>

      <div class="mt-8 text-center">
        <RouterLink
          :to="buildLocalePath('/tools', locale)"
          class="inline-flex items-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
        >
          Lihat seluruh {{ tools.length }} kalkulator →
        </RouterLink>
      </div>
    </div>

    <!-- Featured Educational Guides -->
    <div class="mt-16">
      <SectionHeading eyebrow="Edukasi & Panduan">
        Panduan Praktis Bisnis, Pajak & Keuangan
      </SectionHeading>
      <p class="mb-6 max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-300">
        Pelajari konsep di balik angka kalkulator melalui artikel panduan lengkap yang disertai tabel perbandingan dan studi kasus UMKM maupun keuangan pribadi.
      </p>
      <div class="grid gap-6 md:grid-cols-2">
        <article
          v-for="guide in featuredGuides"
          :key="guide.slug"
          class="glass-panel flex flex-col justify-between p-6"
        >
          <div>
            <div class="flex items-center justify-between text-xs">
              <span class="rounded-full bg-brand-500/10 px-3 py-1 font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                {{ guide.category }}
              </span>
              <span class="text-slate-500 dark:text-slate-400">{{ guide.readTimeMinutes }} menit baca</span>
            </div>
            <h3 class="mt-4 text-xl font-bold leading-snug text-slate-950 dark:text-white">
              <RouterLink :to="buildLocalePath(`/panduan/${guide.slug}`, locale)" class="hover:text-brand-600 dark:hover:text-brand-300">
                {{ guide.title }}
              </RouterLink>
            </h3>
            <p class="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {{ guide.summary }}
            </p>
          </div>
          <RouterLink
            :to="buildLocalePath(`/panduan/${guide.slug}`, locale)"
            class="mt-5 inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300"
          >
            Baca selengkapnya →
          </RouterLink>
        </article>
      </div>
      <div class="mt-6">
        <RouterLink
          :to="buildLocalePath('/panduan', locale)"
          class="inline-flex items-center text-sm font-semibold text-brand-600 hover:underline dark:text-brand-300"
        >
          Lihat semua {{ guides.length }} panduan keuangan →
        </RouterLink>
      </div>
    </div>

    <!-- Practical Value Overview -->
    <div class="prose-like mt-16 max-w-none">
      <SectionHeading eyebrow="Manfaat Penggunaan">
        Siapa yang Terbantu oleh {{ siteBrand }}?
      </SectionHeading>
      <p>
        Dalam operasional harian usaha maupun pengelolaan gaji bulanan, banyak keputusan penting bergantung pada perhitungan yang presisi — mulai dari menentukan harga jual agar tidak tergerus biaya marketplace, memisahkan DPP dan PPN 11% pada tagihan klien, hingga membandingkan total bunga anuitas dan bunga flat sebelum menandatangani perjanjian kredit.
      </p>
      <div class="not-prose mt-6 grid gap-4 md:grid-cols-3">
        <div class="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 class="text-lg font-semibold text-slate-950 dark:text-white">UMKM & Penjual Online</h3>
          <p class="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
            Susun harga jual dengan Kalkulator Margin & Markup, jaga stok lewat Reorder Point & Safety Stock, dan terbitkan Invoice PDF rapi untuk pelanggan B2B maupun ritel.
          </p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 class="text-lg font-semibold text-slate-950 dark:text-white">Karyawan & Tim HR</h3>
          <p class="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
            Simulasikan potongan PPh 21 sesuai lapisan UU HPP, hitung Take-Home Pay, cek hak THR prorata, serta estimasikan Uang Pesangon & UPMK berdasarkan PP 35/2021.
          </p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 class="text-lg font-semibold text-slate-950 dark:text-white">Perencanaan Keluarga</h3>
          <p class="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
            Rencanakan dana darurat 3–12 bulan, hitung dampak inflasi terhadap biaya pendidikan anak, ukur kemampuan cicilan kredit, dan tunaikan zakat sesuai nisab BAZNAS.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
