<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import { tools } from '@/data/tools';
import { guides } from '@/data/guides';
import { applySeo, createBreadcrumbSchema, createWebPageSchema } from '@/utils/seo';
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale';
import { siteBrand, siteUrl } from '@/utils/site';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));

watchEffect(() => {
  const isEn = locale.value === 'en';
  const path = buildLocalePath('/about', locale.value);
  const title = isEn ? `About ${siteBrand}` : `Tentang ${siteBrand} & Standar Editorial`;
  const description = isEn
    ? `Learn about the mission, calculation methodology, and Indonesian regulatory references behind ${siteBrand}.`
    : `Pelajari misi, metodologi perhitungan, standar editorial, dan referensi regulasi Indonesia di balik platform ${siteBrand}.`;

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
        { name: isEn ? 'About' : 'Tentang Kami', url: `${siteUrl}${path}` },
      ]),
    ],
  });
});

const expertisePillars = [
  {
    icon: '📋',
    titleId: 'Formula Terbuka & Terverifikasi',
    titleEn: 'Transparent Formulas',
    descId: 'Setiap kalkulator menampilkan dasar rumus dan contoh perhitungan langkah demi langkah dalam Rupiah sehingga hasil dapat diverifikasi secara mandiri.',
    descEn: 'Every calculator displays its underlying formula and worked Rupiah examples so outputs can be independently verified.',
  },
  {
    icon: '🏛️',
    titleId: 'Acuan Regulasi Perpajakan',
    titleEn: 'Tax Regulation References',
    descId: 'Simulasi PPN 11% dan PPh 21 mengacu pada UU Harmonisasi Peraturan Perpajakan (UU HPP No. 7 Tahun 2021) dan ketentuan PTKP Direktorat Jenderal Pajak.',
    descEn: 'VAT 11% and PPh 21 simulations reference the Tax Harmonization Law (UU HPP No. 7/2021) and Directorate General of Taxes PTKP brackets.',
  },
  {
    icon: '🕌',
    titleId: 'Pedoman Zakat BAZNAS',
    titleEn: 'BAZNAS Zakat Guidelines',
    descId: 'Perhitungan zakat penghasilan dan zakat mal mengacu pada ketentuan nisab 85 gram emas dan tarif 2,5% sesuai pedoman BAZNAS.',
    descEn: 'Income and wealth zakat calculations follow the 85-gram gold nisab benchmark and 2.5% rate set by BAZNAS.',
  },
  {
    icon: '⚖️',
    titleId: 'Ketenagakerjaan & HR',
    titleEn: 'Indonesian Labor Standards',
    descId: 'Simulasi pesangon, UPMK, dan THR merujuk pada UU Cipta Kerja, PP No. 35 Tahun 2021, dan Permenaker No. 6 Tahun 2016.',
    descEn: 'Severance, UPMK, and THR estimates reference the Job Creation Law, Government Regulation No. 35/2021, and Permenaker No. 6/2016.',
  },
];
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <SectionHeading :eyebrow="locale === 'en' ? 'About Us' : 'Tentang Kami'">
      {{ locale === 'en' ? `About ${siteBrand}` : `Tentang ${siteBrand}` }}
    </SectionHeading>

    <div class="grid gap-10 lg:grid-cols-[1fr_320px]">
      <div class="prose-like max-w-none">
        <p v-if="locale === 'en'">
          <strong>{{ siteBrand }}</strong> (kalkulatorin.com) is an independent Indonesian business, tax, and personal finance calculator platform created to help SME owners, freelancers, HR practitioners, and households run practical financial calculations quickly directly from their browser.
        </p>
        <p v-else>
          <strong>{{ siteBrand }}</strong> (kalkulatorin.com) adalah platform kalkulator bisnis, perpajakan, dan keuangan pribadi asal Indonesia yang dibangun untuk membantu pelaku UMKM, freelancer, praktisi HR, serta keluarga menjalankan perhitungan finansial sehari-hari secara cepat dan transparan langsung dari browser.
        </p>

        <p v-if="locale === 'en'">
          Beyond raw calculator outputs, we publish open mathematical formulas, worked Rupiah case studies, a financial glossary, and in-depth guides so visitors truly understand the numbers behind every business or personal finance decision.
        </p>
        <p v-else>
          Kami percaya angka hasil kalkulator saja tidak cukup tanpa pemahaman konteks di baliknya. Karena itu, setiap kalkulator dilengkapi penjelasan rumus yang terbuka, simulasi kasus nyata dalam Rupiah, Kamus Finansial, serta artikel panduan praktis agar pengguna dapat mengambil keputusan yang lebih rasional.
        </p>

        <h2>{{ locale === 'en' ? 'Editorial & Formula Review Process' : 'Standar Editorial & Pemeliharaan Rumus' }}</h2>
        <ol>
          <li v-if="locale === 'en'"><strong>Source Verification:</strong> Formulas are cross-checked against public Indonesian regulations (UU HPP, PP 35/2021, Permenaker, BAZNAS) and standard accounting principles.</li>
          <li v-else><strong>Verifikasi Sumber:</strong> Rumus disusun dan dicocokkan terhadap peraturan resmi yang dipublikasikan pemerintah (UU HPP, PP 35/2021, Permenaker, BAZNAS) serta prinsip akuntansi keuangan standar.</li>
          <li v-if="locale === 'en'"><strong>Worked Examples:</strong> Every calculator is tested with realistic Rupiah scenarios to ensure edge cases such as tax-inclusive pricing or progressive tax brackets behave accurately.</li>
          <li v-else><strong>Uji Simulasi Kasus Nyata:</strong> Setiap kalkulator diuji dengan skenario angka Rupiah yang realistis untuk memastikan kasus khusus seperti harga inklusif pajak atau lapisan tarif progresif dihitung dengan benar.</li>
          <li v-if="locale === 'en'"><strong>Periodic Updates:</strong> Whenever key rates or thresholds change, calculators and accompanying guides are reviewed and updated.</li>
          <li v-else><strong>Pembaruan Berkala:</strong> Ketika terdapat perubahan tarif pajak, batas PTKP, atau ketentuan ketenagakerjaan, kalkulator dan panduan terkait ditinjau ulang dan diperbarui.</li>
          <li v-if="locale === 'en'"><strong>Clear Simulation Disclosure:</strong> All outputs are explicitly disclosed as educational simulations, not legally binding financial or tax advice.</li>
          <li v-else><strong>Transparansi Batasan:</strong> Seluruh hasil perhitungan dinyatakan secara jelas sebagai simulasi edukatif, bukan pengganti konsultasi resmi konsultan pajak, akuntan publik, atau penasihat hukum.</li>
        </ol>

        <h2>{{ locale === 'en' ? 'Reference Pillars' : 'Landasan Referensi Kami' }}</h2>
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

        <h2>{{ locale === 'en' ? 'How We Keep This Platform Free' : 'Transparansi Layanan Gratis' }}</h2>
        <p v-if="locale === 'en'">
          To keep our calculators and guides accessible free of charge, this site may display advertising through Google AdSense. Advertising never influences the formulas, calculation accuracy, or editorial independence of our content.
        </p>
        <p v-else>
          Agar seluruh kalkulator dan artikel panduan tetap dapat diakses secara gratis oleh masyarakat luas, operasional situs ini dapat didukung melalui penayangan iklan Google AdSense. Iklan tidak memengaruhi rumus, hasil perhitungan, maupun independensi editorial kami.
        </p>

        <h2>{{ locale === 'en' ? 'Feedback & Corrections' : 'Masukan & Koreksi Rumus' }}</h2>
        <p v-if="locale === 'en'">
          Spotted a calculation discrepancy or want to suggest a new Indonesian calculator? Reach out via our
          <RouterLink :to="buildLocalePath('/contact', locale)" class="text-brand-600 dark:text-brand-400">Contact page</RouterLink>
          or email us directly at <a href="mailto:hello@kalkulatorin.com" class="text-brand-600 dark:text-brand-400">hello@kalkulatorin.com</a>.
        </p>
        <p v-else>
          Menemukan ketidaksesuaian angka atau ingin mengusulkan kalkulator baru? Hubungi tim kami melalui
          <RouterLink :to="buildLocalePath('/contact', locale)" class="text-brand-600 dark:text-brand-400">halaman Kontak</RouterLink>
          atau kirim email langsung ke <a href="mailto:hello@kalkulatorin.com" class="text-brand-600 dark:text-brand-400">hello@kalkulatorin.com</a>.
        </p>
      </div>

      <aside class="space-y-6">
        <div class="glass-panel p-5">
          <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
            {{ locale === 'en' ? 'Platform Overview' : 'Ringkasan Platform' }}
          </p>
          <dl class="mt-4 space-y-4 text-sm">
            <div>
              <dt class="text-slate-500 dark:text-slate-400">{{ locale === 'en' ? 'Calculators Available' : 'Jumlah Kalkulator' }}</dt>
              <dd class="font-bold text-slate-950 dark:text-white">{{ tools.length }} {{ locale === 'en' ? 'free calculators' : 'kalkulator gratis' }}</dd>
            </div>
            <div>
              <dt class="text-slate-500 dark:text-slate-400">{{ locale === 'en' ? 'Editorial Guides' : 'Panduan Mendalam' }}</dt>
              <dd class="font-bold text-slate-950 dark:text-white">{{ guides.length }} {{ locale === 'en' ? 'practical guides' : 'artikel panduan' }}</dd>
            </div>
            <div>
              <dt class="text-slate-500 dark:text-slate-400">{{ locale === 'en' ? 'Regulatory Focus' : 'Fokus Regulasi' }}</dt>
              <dd class="font-bold text-slate-950 dark:text-white">{{ locale === 'en' ? 'Indonesian tax, labor & business rules' : 'Perpajakan, ketenagakerjaan & UMKM Indonesia' }}</dd>
            </div>
            <div>
              <dt class="text-slate-500 dark:text-slate-400">{{ locale === 'en' ? 'Data Privacy' : 'Privasi Input' }}</dt>
              <dd class="font-bold text-slate-950 dark:text-white">{{ locale === 'en' ? 'Processed locally in your browser' : 'Diproses lokal di browser Anda' }}</dd>
            </div>
          </dl>
        </div>

        <div class="glass-panel p-5">
          <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
            {{ locale === 'en' ? 'Useful Links' : 'Tautan Berguna' }}
          </p>
          <nav class="mt-4 space-y-3 text-sm">
            <RouterLink :to="buildLocalePath('/tools', locale)" class="block text-brand-600 hover:underline dark:text-brand-400">
              {{ locale === 'en' ? 'Browse All Calculators' : 'Jelajahi Semua Kalkulator' }}
            </RouterLink>
            <RouterLink :to="buildLocalePath('/panduan', locale)" class="block text-brand-600 hover:underline dark:text-brand-400">
              {{ locale === 'en' ? 'Finance Guides' : 'Panduan Keuangan' }}
            </RouterLink>
            <RouterLink :to="buildLocalePath('/glossary', locale)" class="block text-brand-600 hover:underline dark:text-brand-400">
              {{ locale === 'en' ? 'Financial Glossary' : 'Kamus Finansial' }}
            </RouterLink>
            <RouterLink :to="buildLocalePath('/disclaimer', locale)" class="block text-brand-600 hover:underline dark:text-brand-400">
              Disclaimer
            </RouterLink>
            <RouterLink :to="buildLocalePath('/privacy-policy', locale)" class="block text-brand-600 hover:underline dark:text-brand-400">
              {{ locale === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi' }}
            </RouterLink>
          </nav>
        </div>
      </aside>
    </div>
  </section>
</template>
