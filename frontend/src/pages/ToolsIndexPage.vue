<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import ToolCard from '@/components/common/ToolCard.vue';
import { tools, resolveToolPresentation } from '@/data/tools';
import { applySeo } from '@/utils/seo';
import { siteName, siteUrl } from '@/utils/site';
import { detectLocaleFromPath } from '@/utils/locale';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));

const presentedTools = computed(() => tools.map((tool) => resolveToolPresentation(tool, locale.value)));

applySeo({
  title: locale.value === 'en' ? `All Tools | ${siteName}` : `Semua Tools | ${siteName}`,
  description:
    locale.value === 'en'
      ? 'A complete list of business and finance tools ready to use online.'
      : 'Daftar lengkap tools bisnis dan keuangan Indonesia yang siap dipakai secara online.',
  canonical: `${siteUrl}${locale.value === 'en' ? '/en/tools' : '/tools'}`,
  alternates: [
    { hreflang: 'id', href: `${siteUrl}/id/tools` },
    { hreflang: 'en', href: `${siteUrl}/en/tools` },
    { hreflang: 'x-default', href: `${siteUrl}/tools` },
  ],
});
</script>

<template>
  <section class="section-shell py-10">
    <Breadcrumbs />
    <SectionHeading eyebrow="Directory">{{ locale === 'en' ? 'All Tools' : 'Semua Tools' }}</SectionHeading>
    <p class="max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
      {{
        locale === 'en'
          ? 'Choose the tool that best matches your need. Each page includes explanations, FAQs, and internal navigation.'
          : 'Pilih tool yang paling sesuai dengan kebutuhan Anda. Setiap halaman punya penjelasan, FAQ, dan navigasi internal agar mudah dipahami pengguna maupun mesin pencari.'
      }}
    </p>
    <div class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <ToolCard
        v-for="tool in presentedTools"
        :key="tool.slug"
        :title="tool.title"
        :description="tool.description"
        :slug="tool.slug"
        :category="tool.category"
      />
    </div>
  </section>
</template>
