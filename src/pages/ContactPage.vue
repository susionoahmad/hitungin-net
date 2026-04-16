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
  title: locale.value === 'en' ? `Contact | ${siteName}` : `Kontak | ${siteName}`,
  description:
    locale.value === 'en'
      ? 'Contact Tools Bisnis & Keuangan Indonesia for partnerships, feedback, or general questions.'
      : 'Hubungi tim Tools Bisnis & Keuangan Indonesia untuk kerja sama, masukan, atau pertanyaan.',
  canonical: `${siteUrl}${buildLocalePath('/contact', locale.value)}`,
  alternates: [
    { hreflang: 'id', href: `${siteUrl}${buildLocalePath('/contact', 'id')}` },
    { hreflang: 'en', href: `${siteUrl}${buildLocalePath('/contact', 'en')}` },
    { hreflang: 'x-default', href: `${siteUrl}/contact` },
  ],
});
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <SectionHeading eyebrow="Contact">{{ locale === 'en' ? 'Contact Us' : 'Hubungi Kami' }}</SectionHeading>
    <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div class="prose-like max-w-none">
        <p v-if="locale === 'en'">
          We welcome feedback, content corrections, collaboration inquiries, monetization partnerships, and requests
          for new tools.
        </p>
        <p v-else>
          Kami terbuka untuk masukan, koreksi konten, kerja sama konten, kolaborasi monetisasi, maupun permintaan
          penambahan tool baru.
        </p>
        <h2>{{ locale === 'en' ? 'What you can send' : 'Jenis pesan yang bisa dikirim' }}</h2>
        <p v-if="locale === 'en'">
          You can contact us about bugs, feature ideas, new business tool requests, site policy questions, or business
          collaboration opportunities.
        </p>
        <p v-else>
          Anda dapat menghubungi kami untuk pelaporan bug, saran fitur, permintaan tool bisnis baru, pertanyaan
          mengenai kebijakan situs, atau kebutuhan kerja sama.
        </p>
        <h2>{{ locale === 'en' ? 'Why this page exists' : 'Tujuan kontak' }}</h2>
        <p v-if="locale === 'en'">
          This page helps the site remain transparent and easy to contact, which is useful for trust and long-term
          growth.
        </p>
        <p v-else>
          Halaman ini disediakan agar situs memiliki struktur yang lebih lengkap, transparan, dan mudah dihubungi.
        </p>
      </div>

      <aside class="glass-panel p-6">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{{ locale === 'en' ? 'Contact Info' : 'Informasi Kontak' }}</p>
        <div class="mt-4 space-y-4 text-sm text-slate-300">
          <div>
            <p class="text-slate-400">Email</p>
            <p class="font-semibold text-white">hello@toolsbisniskeuangan.id</p>
          </div>
          <div>
            <p class="text-slate-400">{{ locale === 'en' ? 'Response Time' : 'Respons' }}</p>
            <p class="font-semibold text-white">{{ locale === 'en' ? 'Business days, Western Indonesia Time' : 'Hari kerja, waktu Indonesia Barat' }}</p>
          </div>
          <div>
            <p class="text-slate-400">{{ locale === 'en' ? 'Website' : 'Situs' }}</p>
            <p class="font-semibold text-white">{{ siteName }}</p>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>
