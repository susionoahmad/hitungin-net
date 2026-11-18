<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import { applySeo, createBreadcrumbSchema, createWebPageSchema } from '@/utils/seo';
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale';
import { siteBrand, siteName, siteUrl } from '@/utils/site';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));

watchEffect(() => {
  const isEn = locale.value === 'en';
  const path = buildLocalePath('/terms-of-service', locale.value);
  const title = isEn ? `Terms of Service | ${siteBrand}` : `Ketentuan Layanan | ${siteBrand}`;
  const description = isEn
    ? `Terms of service for using ${siteName}.`
    : `Ketentuan dan syarat penggunaan kalkulator serta konten pada ${siteName}.`;

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
        { name: isEn ? 'Terms of Service' : 'Ketentuan Layanan', url: `${siteUrl}${path}` },
      ]),
    ],
  });
});
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <SectionHeading eyebrow="Legal">
      {{ locale === 'en' ? 'Terms of Service' : 'Ketentuan Layanan' }}
    </SectionHeading>
    <div class="prose-like max-w-none">
      <p v-if="locale === 'en'">
        By accessing and using {{ siteName }}, you agree to be bound by these Terms of Service. If you do not agree,
        please stop using the site.
      </p>
      <p v-else>
        Dengan mengakses dan menggunakan {{ siteName }}, Anda menyatakan setuju untuk tunduk pada Ketentuan Layanan
        ini.
      </p>
      <h2>{{ locale === 'en' ? '1. Use of the Site' : '1. Penggunaan Situs' }}</h2>
      <p v-if="locale === 'en'">
        The site is provided for informational, educational, and general calculation purposes.
      </p>
      <p v-else>
        Situs ini disediakan untuk tujuan informasi, edukasi, dan kalkulasi umum.
      </p>
      <h2>{{ locale === 'en' ? '2. Accuracy and Verification' : '2. Akurasi dan Validasi Hasil' }}</h2>
      <p v-if="locale === 'en'">
        We strive to keep calculations and content accurate, but outputs are estimates and may be affected by user
        input, rounding methods, or policy changes.
      </p>
      <p v-else>
        Kami berupaya menjaga agar setiap perhitungan dan konten tetap akurat. Namun, hasil yang ditampilkan bersifat
        estimasi.
      </p>
      <h2>{{ locale === 'en' ? '3. Intellectual Property' : '3. Hak Kekayaan Intelektual' }}</h2>
      <p v-if="locale === 'en'">
        All text, design, structure, code, logos, and visual elements on this site belong to the site operator or its
        licensors unless stated otherwise.
      </p>
      <p v-else>
        Seluruh teks, desain, struktur, kode, logo, dan elemen visual yang terdapat pada situs ini merupakan milik
        pengelola situs atau pihak yang memberikan lisensi.
      </p>
      <h2>{{ locale === 'en' ? '4. Third-Party Content and Links' : '4. Konten dan Tautan Pihak Ketiga' }}</h2>
      <p v-if="locale === 'en'">
        The site may contain links or references to third-party services. We are not responsible for their content or
        policies.
      </p>
      <p v-else>
        Situs ini dapat menampilkan tautan, referensi, atau layanan yang disediakan oleh pihak ketiga.
      </p>
      <h2>{{ locale === 'en' ? '5. Limitation of Liability' : '5. Pembatasan Tanggung Jawab' }}</h2>
      <p v-if="locale === 'en'">
        To the fullest extent permitted by law, the site operator is not liable for direct, indirect, incidental, or
        consequential losses arising from use of the site.
      </p>
      <p v-else>
        Sejauh diizinkan oleh hukum yang berlaku, pengelola situs tidak bertanggung jawab atas kerugian langsung,
        tidak langsung, insidental, atau konsekuensial.
      </p>
      <h2>{{ locale === 'en' ? '6. Changes to These Terms' : '6. Perubahan Ketentuan' }}</h2>
      <p v-if="locale === 'en'">
        We may update these Terms of Service from time to time, and changes take effect when published on this page.
      </p>
      <p v-else>
        Kami dapat memperbarui Ketentuan Layanan ini dari waktu ke waktu.
      </p>
    </div>
  </section>
</template>
