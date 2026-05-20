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
  title: locale.value === 'en' ? `Disclaimer | ${siteName}` : `Disclaimer | ${siteName}`,
  description:
    locale.value === 'en'
      ? 'Important disclaimers and limitations of use for calculation results on Tools Bisnis & Keuangan Indonesia.'
      : 'Pernyataan pengecualian tanggung jawab dan batasan penggunaan hasil perhitungan pada Tools Bisnis & Keuangan Indonesia.',
  canonical: `${siteUrl}${buildLocalePath('/disclaimer', locale.value)}`,
  alternates: [
    { hreflang: 'id', href: `${siteUrl}${buildLocalePath('/disclaimer', 'id')}` },
    { hreflang: 'en', href: `${siteUrl}${buildLocalePath('/disclaimer', 'en')}` },
    { hreflang: 'x-default', href: `${siteUrl}/disclaimer` },
  ],
});
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <SectionHeading eyebrow="Legal">Disclaimer</SectionHeading>

    <!-- Warning Banner -->
    <div class="mb-8 rounded-2xl border border-amber-400/30 bg-amber-50 px-6 py-5 dark:border-amber-400/20 dark:bg-amber-500/10">
      <div class="flex items-start gap-4">
        <span class="text-2xl">⚠️</span>
        <div>
          <p class="font-semibold text-amber-800 dark:text-amber-300">
            {{ locale === 'en' ? 'Important Notice' : 'Perhatian Penting' }}
          </p>
          <p class="mt-1 text-sm leading-relaxed text-amber-700 dark:text-amber-400">
            <span v-if="locale === 'en'">
              All calculation results on this site are simulations for informational and educational purposes only.
              They are not a substitute for professional financial, tax, or legal advice.
            </span>
            <span v-else>
              Seluruh hasil perhitungan di situs ini bersifat simulasi untuk tujuan informasi dan edukasi semata.
              Hasil ini bukan pengganti nasihat keuangan, pajak, atau hukum dari profesional yang berwenang.
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="grid gap-8 lg:grid-cols-[1fr_280px]">
      <div class="prose-like max-w-none">

        <h2>{{ locale === 'en' ? '1. General Disclaimer' : '1. Disclaimer Umum' }}</h2>
        <p v-if="locale === 'en'">
          All information, content, and calculation results on <strong>{{ siteName }}</strong> are provided for general
          informational and educational purposes only. While we strive to ensure accuracy, we make no warranties or
          representations of any kind — express or implied — regarding the completeness, accuracy, reliability, suitability,
          or availability of any information on this site.
        </p>
        <p v-else>
          Seluruh informasi, konten, dan hasil perhitungan pada <strong>{{ siteName }}</strong> disediakan semata-mata untuk
          tujuan informasi umum dan edukasi. Meskipun kami berupaya memastikan akurasi, kami tidak memberikan jaminan atau
          pernyataan apa pun — tersurat maupun tersirat — mengenai kelengkapan, akurasi, keandalan, kesesuaian, atau
          ketersediaan informasi apapun di situs ini.
        </p>

        <h2>{{ locale === 'en' ? '2. Not Professional Advice' : '2. Bukan Nasihat Profesional' }}</h2>
        <p v-if="locale === 'en'">
          The tools and content on this site do <strong>not</strong> constitute professional advice from:
        </p>
        <p v-else>
          Tools dan konten di situs ini <strong>tidak</strong> merupakan nasihat profesional dari:
        </p>
        <ul>
          <li v-if="locale === 'en'">Certified Public Accountants (CPA) or registered accountants</li>
          <li v-else>Akuntan Publik Bersertifikat (CPA) atau akuntan terdaftar</li>
          <li v-if="locale === 'en'">Tax consultants or Direktorat Jenderal Pajak (DJP) representatives</li>
          <li v-else>Konsultan pajak atau perwakilan Direktorat Jenderal Pajak (DJP)</li>
          <li v-if="locale === 'en'">Licensed financial advisors or investment analysts</li>
          <li v-else>Penasihat keuangan berlisensi atau analis investasi</li>
          <li v-if="locale === 'en'">Lawyers, notaries, or legal practitioners</li>
          <li v-else>Pengacara, notaris, atau praktisi hukum</li>
          <li v-if="locale === 'en'">HR consultants or certified labor law specialists</li>
          <li v-else>Konsultan HR atau spesialis hukum ketenagakerjaan bersertifikat</li>
        </ul>
        <p v-if="locale === 'en'">
          We strongly recommend verifying all calculations with a qualified professional before making financial, tax,
          employment, or investment decisions.
        </p>
        <p v-else>
          Kami sangat menyarankan untuk memverifikasi semua hasil perhitungan dengan profesional yang berwenang sebelum
          mengambil keputusan keuangan, pajak, ketenagakerjaan, atau investasi.
        </p>

        <h2>{{ locale === 'en' ? '3. Simulation & Estimation Nature' : '3. Sifat Simulasi & Estimasi' }}</h2>
        <p v-if="locale === 'en'">
          Many tools on this site produce <strong>estimates or simulations</strong> based on user-entered inputs and
          publicly available formulas. Results may differ from actual figures due to:
        </p>
        <p v-else>
          Banyak tools di situs ini menghasilkan <strong>estimasi atau simulasi</strong> berdasarkan input yang dimasukkan
          pengguna dan formula yang tersedia untuk umum. Hasil dapat berbeda dari angka aktual karena:
        </p>
        <ul>
          <li v-if="locale === 'en'">Individual circumstances not captured by a general-purpose calculator</li>
          <li v-else>Keadaan individu yang tidak tercakup oleh kalkulator tujuan umum</li>
          <li v-if="locale === 'en'">Regulatory changes that have not yet been reflected in the tool</li>
          <li v-else>Perubahan regulasi yang belum tercermin dalam tool</li>
          <li v-if="locale === 'en'">Rounding differences or floating-point precision in calculations</li>
          <li v-else>Perbedaan pembulatan atau presisi floating-point dalam perhitungan</li>
          <li v-if="locale === 'en'">Specific exemptions, deductions, or allowances that vary by case</li>
          <li v-else>Pengecualian, potongan, atau tunjangan khusus yang bervariasi per kasus</li>
        </ul>

        <h2>{{ locale === 'en' ? '4. Tax & Regulatory Disclaimer' : '4. Disclaimer Pajak & Regulasi' }}</h2>
        <p v-if="locale === 'en'">
          Tax calculations (PPh 21, PPN, Zakat, Pesangon, THR) are based on publicly published rates and legislation
          including <strong>UU HPP No.7/2021</strong>, <strong>UU Cipta Kerja No.11/2020</strong>, and BAZNAS guidelines.
          These formulas are for estimation purposes and individual tax obligations may vary. Always consult a registered
          tax consultant (USKP-certified) for binding tax advice.
        </p>
        <p v-else>
          Perhitungan pajak (PPh 21, PPN, Zakat, Pesangon, THR) didasarkan pada tarif dan perundang-undangan yang
          dipublikasikan secara resmi, termasuk <strong>UU HPP No.7/2021</strong>, <strong>UU Cipta Kerja No.11/2020</strong>,
          dan pedoman BAZNAS. Formula ini hanya untuk tujuan estimasi dan kewajiban pajak individu dapat bervariasi.
          Selalu konsultasikan dengan konsultan pajak terdaftar (bersertifikat USKP) untuk nasihat pajak yang mengikat.
        </p>

        <h2>{{ locale === 'en' ? '5. Limitation of Liability' : '5. Batasan Tanggung Jawab' }}</h2>
        <p v-if="locale === 'en'">
          The site operator, its contributors, and any affiliated parties shall not be liable for any loss, damage,
          financial loss, penalties, or adverse consequences arising directly or indirectly from:
        </p>
        <p v-else>
          Pengelola situs, kontributornya, dan pihak terafiliasi mana pun tidak bertanggung jawab atas kerugian, kerusakan,
          kerugian finansial, sanksi, atau konsekuensi negatif yang timbul secara langsung atau tidak langsung dari:
        </p>
        <ul>
          <li v-if="locale === 'en'">Reliance on any calculation result without independent professional verification</li>
          <li v-else>Ketergantungan pada hasil perhitungan manapun tanpa verifikasi profesional independen</li>
          <li v-if="locale === 'en'">Misinterpretation of the outputs provided by any tool on this site</li>
          <li v-else>Salah tafsir terhadap output yang diberikan oleh tool manapun di situs ini</li>
          <li v-if="locale === 'en'">Errors, omissions, or outdated content that has not yet been updated</li>
          <li v-else>Kesalahan, kelalaian, atau konten yang sudah usang yang belum diperbarui</li>
        </ul>

        <h2>{{ locale === 'en' ? '6. External Links' : '6. Tautan Eksternal' }}</h2>
        <p v-if="locale === 'en'">
          This site may contain links to third-party websites for reference purposes. We are not responsible for the
          content, accuracy, or privacy practices of those external sites.
        </p>
        <p v-else>
          Situs ini mungkin berisi tautan ke situs web pihak ketiga untuk tujuan referensi. Kami tidak bertanggung jawab
          atas konten, akurasi, atau praktik privasi situs eksternal tersebut.
        </p>

        <div class="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
          <span v-if="locale === 'en'">
            For questions about tool accuracy, visit our
            <RouterLink :to="buildLocalePath('/contact', locale)" class="text-brand-600 dark:text-brand-400">Contact page</RouterLink>
            or read our <RouterLink :to="buildLocalePath('/about', locale)" class="text-brand-600 dark:text-brand-400">editorial standards</RouterLink>.
          </span>
          <span v-else>
            Untuk pertanyaan tentang akurasi tool, kunjungi
            <RouterLink :to="buildLocalePath('/contact', locale)" class="text-brand-600 dark:text-brand-400">halaman Kontak</RouterLink>
            kami atau baca <RouterLink :to="buildLocalePath('/about', locale)" class="text-brand-600 dark:text-brand-400">standar editorial</RouterLink> kami.
          </span>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="space-y-6">
        <div class="glass-panel p-5">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            {{ locale === 'en' ? 'Related Legal Pages' : 'Halaman Legal Terkait' }}
          </p>
          <nav class="mt-4 space-y-3 text-sm">
            <RouterLink :to="buildLocalePath('/privacy-policy', locale)" class="block text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">
              {{ locale === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi' }}
            </RouterLink>
            <RouterLink :to="buildLocalePath('/terms-of-service', locale)" class="block text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">
              {{ locale === 'en' ? 'Terms of Service' : 'Ketentuan Layanan' }}
            </RouterLink>
            <RouterLink :to="buildLocalePath('/about', locale)" class="block text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">
              {{ locale === 'en' ? 'About & Editorial Standards' : 'Tentang & Standar Editorial' }}
            </RouterLink>
            <RouterLink :to="buildLocalePath('/contact', locale)" class="block text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">
              {{ locale === 'en' ? 'Contact Us' : 'Hubungi Kami' }}
            </RouterLink>
          </nav>
        </div>

        <div class="glass-panel p-5">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            {{ locale === 'en' ? 'YMYL Notice' : 'Catatan YMYL' }}
          </p>
          <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <span v-if="locale === 'en'">
              This site covers financial and tax topics that may affect your money or legal standing.
              Always verify with licensed professionals.
            </span>
            <span v-else>
              Situs ini mencakup topik keuangan dan pajak yang dapat memengaruhi kondisi finansial atau hukum Anda.
              Selalu verifikasi dengan profesional berlisensi.
            </span>
          </p>
        </div>
      </aside>
    </div>
  </section>
</template>
