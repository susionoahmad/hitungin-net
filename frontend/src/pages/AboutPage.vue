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
  title: locale.value === 'en' ? `About | ${siteName}` : `Tentang | ${siteName}`,
  description:
    locale.value === 'en'
      ? 'Learn about the purpose, principles, and product direction of Tools Bisnis & Keuangan Indonesia.'
      : 'Pelajari tujuan, prinsip, dan arah pengembangan Tools Bisnis & Keuangan Indonesia.',
  canonical: `${siteUrl}${buildLocalePath('/about', locale.value)}`,
  alternates: [
    { hreflang: 'id', href: `${siteUrl}${buildLocalePath('/about', 'id')}` },
    { hreflang: 'en', href: `${siteUrl}${buildLocalePath('/about', 'en')}` },
    { hreflang: 'x-default', href: `${siteUrl}/about` },
  ],
});
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <SectionHeading eyebrow="About">
      {{ locale === 'en' ? 'About Business & Finance Tools Indonesia' : `Tentang ${siteName}` }}
    </SectionHeading>
    <div class="prose-like max-w-none">
      <p v-if="locale === 'en'">
        Tools Bisnis & Keuangan Indonesia is an online utility project focused on practical calculations for business
        owners, freelancers, and everyday users in Indonesia. Our goal is to provide fast, clear, and lightweight tools
        without forcing users to sign in or learn a complicated interface.
      </p>
      <p v-else>
        {{ siteName }} adalah proyek tools online yang berfokus pada kebutuhan bisnis dan keuangan pengguna Indonesia.
        Tujuan utama situs ini adalah menyediakan alat bantu perhitungan yang cepat, jelas, dan mudah dipakai tanpa
        harus login atau mempelajari antarmuka yang rumit.
      </p>
      <p v-if="locale === 'en'">
        The site is designed with a modular architecture so new tools can be added with minimal effort. Each tool has
        its own data definition, detail page, SEO content, and internal relationships to related tools.
      </p>
      <p v-else>
        Arsitektur situs dibangun secara modular agar penambahan tool baru bisa dilakukan dengan cara yang sederhana.
        Setiap tool punya definisi data sendiri, halaman detail sendiri, konten SEO sendiri, dan relasi ke tool lain.
      </p>
      <p v-if="locale === 'en'">
        We also reserve enough space for ads, legal pages, and a clean heading structure so the site is better aligned
        with AdSense expectations and long-term content growth.
      </p>
      <p v-else>
        Kami juga menyiapkan ruang yang cukup untuk iklan, halaman legal, dan struktur heading yang rapi agar situs
        lebih siap untuk monetisasi yang sehat dan kepatuhan kebijakan platform iklan.
      </p>
    </div>
  </section>
</template>
