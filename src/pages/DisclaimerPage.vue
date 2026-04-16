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
  title: locale.value === 'en' ? `Disclaimer | ${siteName}` : `Disclaimer | ${siteName}`,
  description:
    locale.value === 'en'
      ? 'Disclaimer for information and calculation results on Tools Bisnis & Keuangan Indonesia.'
      : 'Disclaimer penggunaan informasi dan kalkulasi pada Tools Bisnis & Keuangan Indonesia.',
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
    <div class="prose-like max-w-none">
      <p v-if="locale === 'en'">
        All information, content, and calculation results on {{ siteName }} are provided for general informational and
        educational purposes only.
      </p>
      <p v-else>
        Seluruh informasi, konten, dan hasil perhitungan pada {{ siteName }} disediakan semata-mata untuk tujuan
        informasi umum dan edukasi.
      </p>
      <p v-if="locale === 'en'">
        The site is not a substitute for professional advice from accountants, tax consultants, lawyers, financial
        advisors, or other relevant professionals.
      </p>
      <p v-else>
        Situs ini bukan pengganti nasihat profesional dari akuntan, konsultan pajak, pengacara, penasihat keuangan,
        maupun profesional lain yang relevan.
      </p>
      <p v-if="locale === 'en'">
        Some tools display estimates or simulations based on assumptions. Results may vary when inputs or external
        conditions change.
      </p>
      <p v-else>
        Beberapa tool menampilkan estimasi, simulasi, atau perhitungan pendekatan berdasarkan asumsi tertentu.
      </p>
      <p v-if="locale === 'en'">
        The site operator is not responsible for decisions or losses arising from use of the information without
        additional verification.
      </p>
      <p v-else>
        Pengelola situs tidak bertanggung jawab atas tindakan, keputusan, atau kerugian apa pun yang timbul dari
        penggunaan informasi di situs ini tanpa verifikasi tambahan.
      </p>
    </div>
  </section>
</template>
