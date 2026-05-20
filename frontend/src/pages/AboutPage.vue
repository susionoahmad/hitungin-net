<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import { applySeo } from '@/utils/seo';
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale';
import { siteName, siteUrl } from '@/utils/site';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));

applySeo({
  title: locale.value === 'en' ? `About | ${siteName}` : `Tentang | ${siteName}`,
  description:
    locale.value === 'en'
      ? 'Learn about the mission, editorial standards, expertise, and regulatory references behind Tools Bisnis & Keuangan Indonesia.'
      : 'Pelajari misi, standar editorial, keahlian, dan referensi regulasi di balik Tools Bisnis & Keuangan Indonesia.',
  canonical: `${siteUrl}${buildLocalePath('/about', locale.value)}`,
  alternates: [
    { hreflang: 'id', href: `${siteUrl}${buildLocalePath('/about', 'id')}` },
    { hreflang: 'en', href: `${siteUrl}${buildLocalePath('/about', 'en')}` },
    { hreflang: 'x-default', href: `${siteUrl}/about` },
  ],
});

const expertisePillars = [
  {
    icon: '📋',
    titleId: 'Formula Terverifikasi',
    titleEn: 'Verified Formulas',
    descId: 'Setiap rumus perhitungan didasarkan pada standar akuntansi nasional, regulasi perpajakan, dan referensi bisnis resmi.',
    descEn: 'Every calculation formula is based on national accounting standards, tax regulations, and official business references.',
  },
  {
    icon: '🏛️',
    titleId: 'Referensi Regulasi',
    titleEn: 'Regulatory References',
    descId: 'Kalkulator pajak mengacu pada UU HPP (No.7/2021), PTKP terbaru PMK, dan ketentuan BPJS Ketenagakerjaan.',
    descEn: 'Tax calculators reference UU HPP (No.7/2021), the latest PTKP PMK regulations, and BPJS Ketenagakerjaan provisions.',
  },
  {
    icon: '🕌',
    titleId: 'Standar Keuangan Syariah',
    titleEn: 'Islamic Finance Standards',
    descId: 'Kalkulator zakat mengikuti pedoman nisab dan haul dari BAZNAS (Badan Amil Zakat Nasional) Republik Indonesia.',
    descEn: 'The zakat calculator follows nisab and haul guidelines from BAZNAS (National Zakat Board) of the Republic of Indonesia.',
  },
  {
    icon: '⚖️',
    titleId: 'Ketenagakerjaan & HR',
    titleEn: 'Labor & HR Compliance',
    descId: 'Kalkulator pesangon dan THR mengacu langsung pada UU Cipta Kerja (No.11/2020) dan Permenaker terbaru yang berlaku.',
    descEn: 'Severance pay and THR calculators directly reference the Job Creation Law (No.11/2020) and the latest Permenaker provisions.',
  },
];
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <SectionHeading eyebrow="About">
      {{ locale === 'en' ? 'About Business & Finance Tools Indonesia' : `Tentang ${siteName}` }}
    </SectionHeading>

    <div class="grid gap-10 lg:grid-cols-[1fr_320px]">
      <div class="prose-like max-w-none">

        <!-- Mission -->
        <p v-if="locale === 'en'">
          <strong>{{ siteName }}</strong> is an online utility platform built to serve the practical calculation needs of
          business owners, freelancers, HR professionals, and everyday users across Indonesia. Our mission is to provide
          fast, accurate, and accessible financial tools — without requiring sign-ins or navigating a complex interface.
        </p>
        <p v-else>
          <strong>{{ siteName }}</strong> adalah platform tools online yang dibangun untuk melayani kebutuhan perhitungan
          praktis bagi pemilik bisnis, freelancer, profesional HR, dan pengguna umum di seluruh Indonesia. Misi kami
          adalah menyediakan alat bantu keuangan yang cepat, akurat, dan mudah diakses — tanpa perlu login atau
          mempelajari antarmuka yang rumit.
        </p>

        <!-- Architecture -->
        <p v-if="locale === 'en'">
          The site is built with a modular, data-driven architecture. Each calculator is defined as a self-contained unit
          with its own metadata, bilingual SEO content, FAQ schema, and cross-links to related tools — making both human
          navigation and search engine indexing highly efficient.
        </p>
        <p v-else>
          Situs ini dibangun dengan arsitektur modular berbasis data. Setiap kalkulator didefinisikan sebagai unit mandiri
          dengan metadata sendiri, konten SEO dua bahasa, skema FAQ, dan tautan silang ke tool terkait — sehingga navigasi
          pengguna maupun pengindeksan mesin pencari menjadi sangat efisien.
        </p>

        <!-- Editorial Standards -->
        <h2>{{ locale === 'en' ? 'Editorial Standards' : 'Standar Editorial' }}</h2>
        <p v-if="locale === 'en'">
          All content on this site is created and reviewed according to the following editorial process:
        </p>
        <p v-else>
          Seluruh konten di situs ini dibuat dan ditinjau berdasarkan proses editorial berikut:
        </p>
        <ol>
          <li v-if="locale === 'en'"><strong>Research:</strong> Formula and methodology sourced from official legislation, public accounting standards, or peer-reviewed references.</li>
          <li v-else><strong>Riset:</strong> Formula dan metodologi bersumber dari perundang-undangan resmi, standar akuntansi publik, atau referensi terverifikasi.</li>
          <li v-if="locale === 'en'"><strong>Validation:</strong> Calculations are cross-checked with official government rate tables (e.g. DJP tax brackets) and Indonesian accounting standards (SAK).</li>
          <li v-else><strong>Validasi:</strong> Perhitungan dicocokkan silang dengan tabel tarif resmi pemerintah (misalnya bracket pajak DJP) dan standar akuntansi Indonesia (SAK).</li>
          <li v-if="locale === 'en'"><strong>Update:</strong> When regulations change (e.g. new PPN rate, PTKP revision), tools are updated to reflect the current values within a reasonable timeframe.</li>
          <li v-else><strong>Pembaruan:</strong> Saat regulasi berubah (misalnya tarif PPN baru, revisi PTKP), tools diperbarui untuk mencerminkan nilai terkini dalam waktu yang wajar.</li>
          <li v-if="locale === 'en'"><strong>Disclosure:</strong> Where a tool is a simulation or estimation, this is clearly disclosed on the tool's page and in our Disclaimer.</li>
          <li v-else><strong>Pengungkapan:</strong> Jika sebuah tool bersifat simulasi atau estimasi, hal ini diungkapkan dengan jelas di halaman tool tersebut dan dalam Disclaimer kami.</li>
        </ol>

        <!-- Regulatory References -->
        <h2>{{ locale === 'en' ? 'Regulatory & Expert References' : 'Referensi Regulasi & Keahlian' }}</h2>
        <p v-if="locale === 'en'">
          Our financial tools reference the following authoritative sources:
        </p>
        <p v-else>
          Tools keuangan kami mengacu pada sumber-sumber otoritatif berikut:
        </p>

        <div class="not-prose mt-4 grid gap-4 sm:grid-cols-2">
          <div
            v-for="pillar in expertisePillars"
            :key="pillar.titleEn"
            class="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-white/10 dark:bg-slate-900/50"
          >
            <div class="flex items-start gap-3">
              <span class="text-2xl">{{ pillar.icon }}</span>
              <div>
                <h3 class="font-semibold text-slate-900 dark:text-white">
                  {{ locale === 'en' ? pillar.titleEn : pillar.titleId }}
                </h3>
                <p class="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {{ locale === 'en' ? pillar.descEn : pillar.descId }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- AdSense Transparency -->
        <h2>{{ locale === 'en' ? 'Advertising & Monetization' : 'Iklan & Monetisasi' }}</h2>
        <p v-if="locale === 'en'">
          This site is supported by display advertising via <strong>Google AdSense</strong>. Advertisements are clearly
          separated from content and do not influence the editorial accuracy of any tool or article. We are committed to
          maintaining a clean, non-intrusive reading experience even when ads are shown.
        </p>
        <p v-else>
          Situs ini didukung oleh iklan bergambar melalui <strong>Google AdSense</strong>. Iklan dipisahkan dengan jelas
          dari konten dan tidak memengaruhi akurasi editorial tool maupun artikel manapun. Kami berkomitmen untuk menjaga
          pengalaman membaca yang bersih dan tidak mengganggu meskipun iklan ditampilkan.
        </p>

        <!-- Contact -->
        <h2>{{ locale === 'en' ? 'Get in Touch' : 'Hubungi Kami' }}</h2>
        <p v-if="locale === 'en'">
          We welcome feedback about formula accuracy, new tool suggestions, or content corrections. Visit our
          <RouterLink :to="buildLocalePath('/contact', locale)" class="text-brand-600 dark:text-brand-400">Contact page</RouterLink>
          or explore the
          <RouterLink :to="buildLocalePath('/glossary', locale)" class="text-brand-600 dark:text-brand-400">Financial Glossary</RouterLink>
          for educational definitions behind the tools.
        </p>
        <p v-else>
          Kami menerima masukan tentang akurasi formula, saran tool baru, atau koreksi konten. Kunjungi
          <RouterLink :to="buildLocalePath('/contact', locale)" class="text-brand-600 dark:text-brand-400">halaman Kontak</RouterLink>
          kami atau jelajahi
          <RouterLink :to="buildLocalePath('/glossary', locale)" class="text-brand-600 dark:text-brand-400">Kamus Finansial</RouterLink>
          untuk definisi edukatif di balik setiap tool.
        </p>
      </div>

      <!-- Sidebar -->
      <aside class="space-y-6">
        <div class="glass-panel p-5">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            {{ locale === 'en' ? 'Site Summary' : 'Ringkasan Situs' }}
          </p>
          <dl class="mt-4 space-y-4 text-sm">
            <div>
              <dt class="text-slate-500 dark:text-slate-400">{{ locale === 'en' ? 'Tools Available' : 'Jumlah Tools' }}</dt>
              <dd class="font-bold text-slate-950 dark:text-white">50+ {{ locale === 'en' ? 'calculators' : 'kalkulator' }}</dd>
            </div>
            <div>
              <dt class="text-slate-500 dark:text-slate-400">{{ locale === 'en' ? 'Languages' : 'Bahasa' }}</dt>
              <dd class="font-bold text-slate-950 dark:text-white">Bahasa Indonesia & English</dd>
            </div>
            <div>
              <dt class="text-slate-500 dark:text-slate-400">{{ locale === 'en' ? 'Regulation Base' : 'Basis Regulasi' }}</dt>
              <dd class="font-bold text-slate-950 dark:text-white">{{ locale === 'en' ? 'Indonesian law & standards' : 'Hukum & standar Indonesia' }}</dd>
            </div>
            <div>
              <dt class="text-slate-500 dark:text-slate-400">{{ locale === 'en' ? 'Data Storage' : 'Penyimpanan Data' }}</dt>
              <dd class="font-bold text-slate-950 dark:text-white">{{ locale === 'en' ? 'Browser-side only (no server storage by default)' : 'Sisi browser (tidak disimpan server secara default)' }}</dd>
            </div>
          </dl>
        </div>

        <div class="glass-panel p-5">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            {{ locale === 'en' ? 'Useful Links' : 'Tautan Berguna' }}
          </p>
          <nav class="mt-4 space-y-3 text-sm">
            <RouterLink :to="buildLocalePath('/tools', locale)" class="block text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">
              {{ locale === 'en' ? 'Browse All Tools' : 'Jelajahi Semua Tools' }}
            </RouterLink>
            <RouterLink :to="buildLocalePath('/glossary', locale)" class="block text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">
              {{ locale === 'en' ? 'Financial Glossary' : 'Kamus Finansial' }}
            </RouterLink>
            <RouterLink :to="buildLocalePath('/disclaimer', locale)" class="block text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">
              {{ locale === 'en' ? 'Disclaimer' : 'Disclaimer' }}
            </RouterLink>
            <RouterLink :to="buildLocalePath('/privacy-policy', locale)" class="block text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">
              {{ locale === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi' }}
            </RouterLink>
            <RouterLink :to="buildLocalePath('/contact', locale)" class="block text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">
              {{ locale === 'en' ? 'Contact & Feedback' : 'Kontak & Masukan' }}
            </RouterLink>
          </nav>
        </div>
      </aside>
    </div>
  </section>
</template>
