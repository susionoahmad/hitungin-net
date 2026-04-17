<script setup lang="ts">
import { ref } from 'vue';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import { buildLocalePath, detectLocaleFromPath, localeDisplayName, switchLocalePath } from '@/utils/locale';
import { t } from '@/utils/localText';

const { isDark, toggleTheme } = useTheme();
const menuOpen = ref(false);
const route = useRoute();
const currentLocale = computed(() => detectLocaleFromPath(route.path));
const alternateLocale = computed(() => (currentLocale.value === 'id' ? 'en' : 'id'));
const languageLink = computed(() => switchLocalePath(route.path, alternateLocale.value));
const languageLabel = computed(() => localeDisplayName(alternateLocale.value));
const brandEyebrow = computed(() => (currentLocale.value === 'en' ? 'Business Tools' : 'Tools Bisnis'));
const brandName = computed(() =>
  currentLocale.value === 'en' ? 'Business & Finance Tools Indonesia' : 'Tools Bisnis & Keuangan Indonesia',
);

const navItems = computed(() => [
  { label: t('home', currentLocale.value), to: buildLocalePath('/', currentLocale.value) },
  { label: t('allTools', currentLocale.value), to: buildLocalePath('/tools', currentLocale.value) },
  { label: t('about', currentLocale.value), to: buildLocalePath('/about', currentLocale.value) },
  { label: t('privacy', currentLocale.value), to: buildLocalePath('/privacy-policy', currentLocale.value) },
]);
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-slate-950/85">
    <div class="section-shell flex items-center justify-between gap-4 py-4">
      <RouterLink :to="buildLocalePath('/', currentLocale)" class="flex items-center gap-3">
        <div class="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500/15 text-lg font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-200">
          TB
        </div>
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">{{ brandEyebrow }}</p>
          <p class="text-base font-semibold text-slate-900 dark:text-white">{{ brandName }}</p>
        </div>
      </RouterLink>

      <nav class="hidden items-center gap-6 md:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 md:hidden"
          @click="menuOpen = !menuOpen"
        >
          Menu
        </button>
        <button
          type="button"
          class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          @click="toggleTheme"
        >
          {{ isDark ? 'Light mode' : 'Dark mode' }}
        </button>
        <RouterLink
          :to="languageLink"
          class="rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-500/20 dark:text-brand-200"
        >
          {{ languageLabel }}
        </RouterLink>
      </div>
    </div>

    <div v-if="menuOpen" class="section-shell pb-4 md:hidden">
      <nav class="glass-panel flex flex-col gap-1 p-3">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
          @click="menuOpen = false"
        >
          {{ item.label }}
        </RouterLink>
        <RouterLink :to="languageLink" class="rounded-xl px-4 py-3 text-sm font-medium text-brand-700 hover:bg-slate-100 dark:text-brand-200 dark:hover:bg-white/5">
          {{ languageLabel }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
