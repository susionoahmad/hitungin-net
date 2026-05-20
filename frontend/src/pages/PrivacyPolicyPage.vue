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
  title: locale.value === 'en' ? `Privacy Policy | ${siteName}` : `Kebijakan Privasi | ${siteName}`,
  description:
    locale.value === 'en'
      ? 'Privacy policy for Tools Bisnis & Keuangan Indonesia, including how Google AdSense cookies and data are handled.'
      : 'Kebijakan privasi penggunaan situs Tools Bisnis & Keuangan Indonesia, termasuk penggunaan cookie Google AdSense.',
  canonical: `${siteUrl}${buildLocalePath('/privacy-policy', locale.value)}`,
  alternates: [
    { hreflang: 'id', href: `${siteUrl}${buildLocalePath('/privacy-policy', 'id')}` },
    { hreflang: 'en', href: `${siteUrl}${buildLocalePath('/privacy-policy', 'en')}` },
    { hreflang: 'x-default', href: `${siteUrl}/privacy-policy` },
  ],
});

const navItems = computed(() => {
  const isEn = locale.value === 'en';
  return [
    { id: 'scope', label: isEn ? '1. Scope' : '1. Ruang Lingkup' },
    { id: 'info-collected', label: isEn ? '2. Information We May Collect' : '2. Informasi yang Dapat Dikumpulkan' },
    { id: 'adsense', label: isEn ? '3. Google AdSense & Cookies' : '3. Google AdSense & Cookie Iklan' },
    { id: 'cookies', label: isEn ? '4. Cookies & Local Storage' : '4. Cookies & Penyimpanan Lokal' },
    { id: 'usage', label: isEn ? '5. How We Use Information' : '5. Penggunaan Informasi' },
    { id: 'third-party', label: isEn ? '6. Third-Party Providers' : '6. Penyedia Layanan Pihak Ketiga' },
    { id: 'security', label: isEn ? '7. Data Security' : '7. Keamanan Data' },
    { id: 'children', label: isEn ? "8. Children's Privacy" : '8. Privasi Anak-Anak' },
    { id: 'changes', label: isEn ? '9. Changes to This Policy' : '9. Perubahan Kebijakan' },
  ];
});
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <SectionHeading eyebrow="Legal">
      {{ locale === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi' }}
    </SectionHeading>

    <div class="grid gap-8 lg:grid-cols-[1fr_280px]">
      <div class="prose-like max-w-none">

        <p v-if="locale === 'en'">
          This Privacy Policy explains how <strong>{{ siteName }}</strong> ("we", "our", "the site") collects, uses, stores,
          and protects information when you access this site. By using the site, you acknowledge that you have read and accepted this policy in full.
        </p>
        <p v-else>
          Dokumen Kebijakan Privasi ini menjelaskan cara <strong>{{ siteName }}</strong> ("kami", "situs") mengumpulkan, menggunakan,
          menyimpan, dan melindungi informasi yang mungkin timbul saat Anda mengakses situs ini. Dengan menggunakan situs ini,
          Anda menyatakan telah membaca dan menyetujui kebijakan ini secara penuh.
        </p>

        <h2 id="scope">{{ locale === 'en' ? '1. Scope' : '1. Ruang Lingkup' }}</h2>
        <p v-if="locale === 'en'">
          This policy applies to all pages, features, forms, content, and financial tools available at this domain and
          its localized paths (e.g. <code>/id/*</code>, <code>/en/*</code>).
        </p>
        <p v-else>
          Kebijakan ini berlaku untuk seluruh halaman, fitur, formulir, konten, dan tools yang tersedia di domain ini dan
          jalur lokalnya (misalnya <code>/id/*</code>, <code>/en/*</code>).
        </p>

        <h2 id="info-collected">{{ locale === 'en' ? '2. Information We May Collect' : '2. Informasi yang Dapat Dikumpulkan' }}</h2>
        <p v-if="locale === 'en'">We may collect non-personally-identifiable technical information such as:</p>
        <p v-else>Kami dapat mengumpulkan informasi teknis yang tidak bersifat identitas pribadi, di antaranya:</p>
        <ul>
          <li v-if="locale === 'en'">IP address, browser type, and operating system</li>
          <li v-else>Alamat IP, jenis peramban, dan sistem operasi</li>
          <li v-if="locale === 'en'">Pages visited, referrer URL, and timestamps</li>
          <li v-else>Halaman yang dibuka, URL referral, dan waktu akses</li>
          <li v-if="locale === 'en'">Device information and screen resolution</li>
          <li v-else>Informasi perangkat dan resolusi layar</li>
        </ul>
        <p v-if="locale === 'en'">
          <strong>Calculator Inputs:</strong> When you enter data into a calculator tool, that data is processed entirely in
          your browser (client-side). It is not transmitted to or stored on our servers unless a feature explicitly requires it
          (e.g. invoice saving for registered users).
        </p>
        <p v-else>
          <strong>Input Kalkulator:</strong> Saat Anda memasukkan data ke dalam tool kalkulator, data tersebut diproses
          sepenuhnya di browser Anda (sisi klien). Data tidak dikirimkan ke atau disimpan di server kami, kecuali fitur
          tertentu secara eksplisit memerlukannya (misalnya penyimpanan invoice untuk pengguna terdaftar).
        </p>

        <h2 id="adsense">{{ locale === 'en' ? '3. Google AdSense & Advertising Cookies' : '3. Google AdSense & Cookie Iklan' }}</h2>
        <p v-if="locale === 'en'">
          This site uses <strong>Google AdSense</strong>, a third-party advertising service provided by Google LLC. Google AdSense
          uses cookies to serve advertisements based on your prior visits to this site or other sites on the internet. You may
          opt out of personalized advertising at any time by visiting Google's
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Ad Settings</a>.
        </p>
        <p v-else>
          Situs ini menggunakan <strong>Google AdSense</strong>, layanan iklan pihak ketiga yang disediakan oleh Google LLC. Google
          AdSense menggunakan cookies untuk menampilkan iklan berdasarkan kunjungan Anda. Anda dapat menonaktifkan iklan yang
          dipersonalisasi kapan saja dengan mengunjungi
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Setelan Iklan Google</a>.
        </p>
        <p v-if="locale === 'en'">
          Google AdSense also uses <strong>DoubleClick DART cookies</strong> to serve ads. You can opt out of DART cookies via the
          <a href="http://www.google.com/privacy_ads.html" target="_blank" rel="noopener noreferrer">Google Ad and Content Network privacy policy</a>
          or through the <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer">Network Advertising Initiative opt-out page</a>.
        </p>
        <p v-else>
          Google AdSense juga menggunakan <strong>cookie DoubleClick DART</strong>. Anda dapat menonaktifkannya melalui
          <a href="http://www.google.com/privacy_ads.html" target="_blank" rel="noopener noreferrer">kebijakan privasi Jaringan Iklan Google</a>
          atau melalui <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer">halaman opt-out Network Advertising Initiative</a>.
        </p>

        <h2 id="cookies">{{ locale === 'en' ? '4. Cookies and Local Storage' : '4. Cookies dan Penyimpanan Lokal' }}</h2>
        <p v-if="locale === 'en'">We use first-party cookies and local storage for the following functional purposes:</p>
        <p v-else>Kami menggunakan cookie pihak pertama dan penyimpanan lokal untuk tujuan fungsional berikut:</p>
        <ul>
          <li v-if="locale === 'en'">Storing your preferred display mode (light/dark theme)</li>
          <li v-else>Menyimpan preferensi tampilan Anda (mode terang/gelap)</li>
          <li v-if="locale === 'en'">Maintaining your authentication session when logged in</li>
          <li v-else>Mempertahankan sesi autentikasi saat Anda masuk</li>
          <li v-if="locale === 'en'">Temporarily caching tool inputs for better user experience</li>
          <li v-else>Menyimpan sementara input kalkulator untuk pengalaman yang lebih baik</li>
        </ul>

        <h2 id="usage">{{ locale === 'en' ? '5. How We Use Information' : '5. Penggunaan Informasi' }}</h2>
        <ul>
          <li v-if="locale === 'en'">Ensure the site functions correctly and securely</li>
          <li v-else>Memastikan situs berfungsi dengan benar dan aman</li>
          <li v-if="locale === 'en'">Analyze traffic patterns and improve page performance</li>
          <li v-else>Menganalisis pola lalu lintas dan meningkatkan performa halaman</li>
          <li v-if="locale === 'en'">Display relevant advertising through AdSense</li>
          <li v-else>Menampilkan iklan yang relevan melalui AdSense</li>
          <li v-if="locale === 'en'">Respond to contact or feedback submissions</li>
          <li v-else>Merespons pengiriman kontak atau umpan balik</li>
        </ul>
        <p v-if="locale === 'en'"><strong>We do not sell, trade, or rent personally identifiable information to third parties.</strong></p>
        <p v-else><strong>Kami tidak menjual, memperdagangkan, atau menyewakan informasi yang dapat mengidentifikasi pribadi kepada pihak ketiga.</strong></p>

        <h2 id="third-party">{{ locale === 'en' ? '6. Third-Party Service Providers' : '6. Penyedia Layanan Pihak Ketiga' }}</h2>
        <ul>
          <li><strong>Google AdSense</strong> — <span v-if="locale === 'en'">serves display advertisements.</span><span v-else>menampilkan iklan bergambar.</span></li>
          <li><strong>Google Analytics</strong> — <span v-if="locale === 'en'">provides anonymized traffic insights.</span><span v-else>menyediakan wawasan lalu lintas yang dianonimkan.</span></li>
        </ul>
        <p v-if="locale === 'en'">We are not responsible for the privacy policies or practices of these third-party services.</p>
        <p v-else>Kami tidak bertanggung jawab atas kebijakan privasi atau praktik dari layanan pihak ketiga tersebut.</p>

        <h2 id="security">{{ locale === 'en' ? '7. Data Security' : '7. Keamanan Data' }}</h2>
        <p v-if="locale === 'en'">
          We apply commercially reasonable security measures to protect data processed on this site. However, no method of
          transmission over the internet is 100% secure.
        </p>
        <p v-else>
          Kami menerapkan langkah-langkah keamanan yang wajar untuk melindungi data yang diproses di situs ini.
          Namun, tidak ada metode transmisi melalui internet yang 100% aman.
        </p>

        <h2 id="children">{{ locale === 'en' ? "8. Children's Privacy" : '8. Privasi Anak-Anak' }}</h2>
        <p v-if="locale === 'en'">
          This site is not directed to children under 13. We do not knowingly collect data from minors. If you believe we have
          inadvertently received data from a minor, please
          <RouterLink :to="buildLocalePath('/contact', locale)">contact us</RouterLink> immediately.
        </p>
        <p v-else>
          Situs ini tidak ditujukan untuk anak-anak di bawah usia 13 tahun. Jika Anda percaya kami telah menerima data dari
          anak di bawah umur secara tidak sengaja, harap
          <RouterLink :to="buildLocalePath('/contact', locale)">hubungi kami</RouterLink> segera.
        </p>

        <h2 id="changes">{{ locale === 'en' ? '9. Changes to This Policy' : '9. Perubahan Kebijakan' }}</h2>
        <p v-if="locale === 'en'">
          This Privacy Policy may be updated from time to time. Continued use of the site after any changes constitutes
          your acceptance of the updated policy.
        </p>
        <p v-else>
          Kebijakan Privasi ini dapat diperbarui sewaktu-waktu. Penggunaan situs yang berkelanjutan setelah perubahan apapun
          merupakan penerimaan Anda terhadap kebijakan yang diperbarui.
        </p>

        <div class="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
          <span v-if="locale === 'en'">
            <strong>Last Updated:</strong> May 2026. For questions, visit our
            <RouterLink :to="buildLocalePath('/contact', locale)" class="text-brand-600 dark:text-brand-400">Contact page</RouterLink>.
          </span>
          <span v-else>
            <strong>Terakhir Diperbarui:</strong> Mei 2026. Untuk pertanyaan, kunjungi
            <RouterLink :to="buildLocalePath('/contact', locale)" class="text-brand-600 dark:text-brand-400">halaman Kontak</RouterLink> kami.
          </span>
        </div>
      </div>

      <!-- Sidebar Quick Nav -->
      <aside class="hidden lg:block">
        <div class="glass-panel sticky top-24 p-5">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            {{ locale === 'en' ? 'Quick Navigation' : 'Navigasi Cepat' }}
          </p>
          <nav class="mt-4 space-y-2 text-sm">
            <a
              v-for="item in navItems"
              :key="item.id"
              :href="`#${item.id}`"
              class="block text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300 transition-colors duration-150"
            >
              {{ item.label }}
            </a>
          </nav>
          <div class="mt-6 border-t border-slate-200 pt-4 dark:border-white/10">
            <RouterLink :to="buildLocalePath('/disclaimer', locale)" class="block text-sm text-brand-600 hover:text-brand-800 dark:text-brand-400">
              {{ locale === 'en' ? 'View Disclaimer →' : 'Lihat Disclaimer →' }}
            </RouterLink>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>
