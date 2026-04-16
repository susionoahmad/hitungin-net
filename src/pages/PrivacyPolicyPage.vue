<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
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
      ? 'Privacy policy for Tools Bisnis & Keuangan Indonesia and how we handle user data.'
      : 'Kebijakan privasi penggunaan situs Tools Bisnis & Keuangan Indonesia.',
  canonical: `${siteUrl}${buildLocalePath('/privacy-policy', locale.value)}`,
  alternates: [
    { hreflang: 'id', href: `${siteUrl}${buildLocalePath('/privacy-policy', 'id')}` },
    { hreflang: 'en', href: `${siteUrl}${buildLocalePath('/privacy-policy', 'en')}` },
    { hreflang: 'x-default', href: `${siteUrl}/privacy-policy` },
  ],
});
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <SectionHeading eyebrow="Legal">
      {{ locale === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi' }}
    </SectionHeading>
    <div class="prose-like max-w-none">
      <p v-if="locale === 'en'">
        This Privacy Policy explains how {{ siteName }} collects, uses, stores, and protects information when you
        access the site. By using the site, you acknowledge that you have read and understood this policy.
      </p>
      <p v-else>
        Dokumen Kebijakan Privasi ini menjelaskan cara {{ siteName }} mengumpulkan, menggunakan, menyimpan, dan
        melindungi informasi yang mungkin timbul saat Anda mengakses situs ini.
      </p>
      <h2>{{ locale === 'en' ? '1. Scope' : '1. Ruang Lingkup Kebijakan' }}</h2>
      <p v-if="locale === 'en'">
        This policy applies to all pages, features, forms, content, and tools available on the site.
      </p>
      <p v-else>
        Kebijakan ini berlaku untuk seluruh halaman, fitur, formulir, konten, dan tool yang tersedia di situs.
      </p>
      <h2>{{ locale === 'en' ? '2. Information We May Collect' : '2. Informasi yang Dapat Dikumpulkan' }}</h2>
      <p v-if="locale === 'en'">
        We may collect non-sensitive technical information such as IP address, browser type, operating system, access
        time, pages visited, and referrer source. When you enter data into a tool, that data is generally processed in
        your browser and not stored on our server unless explicitly stated.
      </p>
      <p v-else>
        Kami dapat mengumpulkan informasi non-sensitif yang secara otomatis tercatat oleh sistem, termasuk namun tidak
        terbatas pada alamat IP, jenis peramban, sistem operasi, waktu akses, halaman yang dibuka, dan sumber rujukan.
      </p>
      <h2>{{ locale === 'en' ? '3. How We Use Information' : '3. Penggunaan Informasi' }}</h2>
      <p v-if="locale === 'en'">
        Information may be used to maintain site security, analyze page performance, improve service quality, and
        support advertising or analytics compliance. We do not sell personal information to third parties.
      </p>
      <p v-else>
        Informasi yang dikumpulkan dapat digunakan untuk menjaga keamanan situs, menganalisis performa halaman,
        meningkatkan kualitas layanan, serta mendukung kepatuhan terhadap kebijakan iklan atau analitik yang berlaku.
      </p>
      <h2>{{ locale === 'en' ? '4. Cookies and Local Storage' : '4. Cookies dan Penyimpanan Lokal' }}</h2>
      <p v-if="locale === 'en'">
        We may use cookies or local storage to remember preferences such as dark mode and to understand general usage
        patterns.
      </p>
      <p v-else>
        Situs ini dapat menggunakan cookies atau teknologi penyimpanan lokal untuk menyimpan preferensi tampilan,
        seperti mode gelap.
      </p>
      <h2>{{ locale === 'en' ? '5. Third-Party Services' : '5. Layanan Pihak Ketiga' }}</h2>
      <p v-if="locale === 'en'">
        If the site uses third-party services such as advertising or analytics providers, their own privacy policies
        govern how they process data.
      </p>
      <p v-else>
        Apabila situs menggunakan layanan pihak ketiga, seperti penyedia iklan atau analitik, pemrosesan data dapat
        tunduk pada kebijakan privasi masing-masing penyedia.
      </p>
      <h2>{{ locale === 'en' ? '6. Data Security' : '6. Keamanan Data' }}</h2>
      <p v-if="locale === 'en'">
        We apply reasonable measures to protect the site and the information it processes, but no electronic system is
        completely risk-free.
      </p>
      <p v-else>
        Kami menerapkan langkah-langkah yang wajar untuk menjaga keamanan situs dan informasi yang diproses.
      </p>
      <h2>{{ locale === 'en' ? '7. Changes to This Policy' : '7. Perubahan Kebijakan' }}</h2>
      <p v-if="locale === 'en'">
        This policy may be updated from time to time to reflect operational, technical, or legal changes.
      </p>
      <p v-else>
        Kebijakan Privasi ini dapat diperbarui sewaktu-waktu untuk menyesuaikan perubahan operasional, teknis, atau
        hukum.
      </p>
    </div>
  </section>
</template>
