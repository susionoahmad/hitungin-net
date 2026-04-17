<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { buildLocalePath, detectLocaleFromPath, type Locale } from '@/utils/locale';
import { trackConversionEvent } from '@/utils/tracking';

const props = defineProps<{
  title: string;
  description: string;
  slug: string;
  category: string;
  locale?: Locale;
}>();

const route = useRoute();
const locale = computed(() => props.locale ?? detectLocaleFromPath(route.path));

function trackOpenTool() {
  trackConversionEvent('select_tool', {
    tool_slug: props.slug,
    tool_title: props.title,
    tool_category: props.category,
    language: locale.value,
    source_path: route.path,
  });
}
</script>

<template>
  <article class="glass-panel flex h-full flex-col justify-between p-6">
    <div>
      <p class="text-xs font-semibold uppercase tracking-[0.25em] text-brand-300">{{ category }}</p>
      <h3 class="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{{ title }}</h3>
      <p class="mt-3 leading-7 text-slate-700 dark:text-slate-300">{{ description }}</p>
    </div>
    <RouterLink
      :to="buildLocalePath(`/${slug}`, locale)"
      class="mt-6 inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
      @click="trackOpenTool"
    >
      {{ locale === 'en' ? 'Open tool' : 'Buka tool' }}
      <span class="ml-2">-&gt;</span>
    </RouterLink>
  </article>
</template>
