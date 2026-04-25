<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { getToolBySlug } from '@/data/tools';
import { buildLocalePath, normalizeLocale } from '@/utils/locale';
import { t } from '@/utils/localText';

const route = useRoute();
const locale = computed(() => normalizeLocale(route.params.locale));

const crumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean);
  const first = segments[0] === 'id' || segments[0] === 'en' ? segments[1] : segments[0];
  const items = [{ label: t('home', locale.value), to: buildLocalePath('/', locale.value) }];

  if (first === 'tools') {
    items.push({ label: t('allTools', locale.value), to: buildLocalePath('/tools', locale.value) });
    return items;
  }

  if (first === 'about') items.push({ label: t('about', locale.value), to: buildLocalePath('/about', locale.value) });
  if (first === 'privacy-policy') items.push({ label: t('privacy', locale.value), to: buildLocalePath('/privacy-policy', locale.value) });
  if (first === 'terms-of-service') items.push({ label: t('terms', locale.value), to: buildLocalePath('/terms-of-service', locale.value) });
  if (first === 'disclaimer') items.push({ label: t('disclaimer', locale.value), to: buildLocalePath('/disclaimer', locale.value) });
  if (first === 'contact') items.push({ label: t('contact', locale.value), to: buildLocalePath('/contact', locale.value) });
  if (first === 'sitemap') items.push({ label: t('sitemap', locale.value), to: buildLocalePath('/sitemap', locale.value) });
  if (first === 'kalkulator-bisnis-keuangan-online') items.push({ label: t('landingSeo', locale.value), to: buildLocalePath('/kalkulator-bisnis-keuangan-online', locale.value) });

  const tool = getToolBySlug(first);
  if (tool) items.push({ label: tool.title, to: buildLocalePath(`/${tool.slug}`, locale.value) });

  return items;
});
</script>

<template>
  <nav aria-label="Breadcrumb" class="mb-6 text-sm text-slate-600 dark:text-slate-400">
    <ol class="flex flex-wrap items-center gap-2">
      <li v-for="(crumb, index) in crumbs" :key="crumb.to" class="flex items-center gap-2">
        <RouterLink :to="crumb.to" class="hover:text-slate-900 dark:hover:text-white">{{ crumb.label }}</RouterLink>
        <span v-if="index < crumbs.length - 1">/</span>
      </li>
    </ol>
  </nav>
</template>
