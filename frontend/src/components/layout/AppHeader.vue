<script setup lang="ts">
import { ref } from 'vue';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import { buildLocalePath, detectLocaleFromPath, localeDisplayName, switchLocalePath } from '@/utils/locale';
import { t } from '@/utils/localText';
import { trackClickEvent } from '@/utils/tracking';
import { useAuth } from '@/composables/useAuth';

const { isDark, toggleTheme } = useTheme();
const { user, profile, isAdmin, openAuthModal, signOut } = useAuth();
const isSigningOut = ref(false);
const menuOpen = ref(false);

async function handleSignOut() {
  isSigningOut.value = true;
  try {
    await signOut();
  } finally {
    isSigningOut.value = false;
  }
}
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
  ...(isAdmin() ? [{ label: 'Admin', to: '/admin' }] : []),
]);

function trackHeaderClick(label: string, target?: string) {
  trackClickEvent({
    click_text: label,
    click_target: target,
    click_location: 'header',
    language: currentLocale.value,
  });
}

function toggleThemeWithTracking() {
  trackHeaderClick(isDark.value ? 'Light mode' : 'Dark mode');
  toggleTheme();
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-slate-950/85">
    <div class="section-shell flex items-center justify-between gap-4 py-4">
      <RouterLink :to="buildLocalePath('/', currentLocale)" class="flex items-center gap-3" @click="trackHeaderClick('Brand logo', buildLocalePath('/', currentLocale))">
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
          @click="trackHeaderClick(item.label, item.to)"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 md:hidden"
          @click="trackHeaderClick('Menu'); menuOpen = !menuOpen"
        >
          Menu
        </button>
        <button
          type="button"
          class="hidden sm:block rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          @click="toggleThemeWithTracking"
        >
          {{ isDark ? 'Light mode' : 'Dark mode' }}
        </button>
        <template v-if="!user">
          <button
            type="button"
            class="hidden rounded-full px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white lg:block"
            @click="openAuthModal('login')"
          >
            {{ t('login', currentLocale) || 'Login' }}
          </button>
          <button
            type="button"
            class="hidden rounded-full bg-brand-500 px-5 py-2 text-sm font-bold text-white hover:bg-brand-400 lg:block shadow-md shadow-brand-500/10"
            @click="openAuthModal('register')"
          >
            {{ t('register', currentLocale) || 'Buat Akun' }}
          </button>
        </template>
        <template v-else>
          <div class="hidden items-center gap-3 lg:flex">
            <div class="text-right">
              <p class="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[120px]">{{ user.email }}</p>
              <p class="text-[10px] uppercase tracking-wider text-brand-600 dark:text-brand-300">
                {{ profile?.plan }} | {{ profile?.role }}
                <span v-if="profile?.plan === 'pro' && profile?.plan_expires_at" class="text-slate-400 dark:text-slate-500 normal-case ml-1 font-normal">
                  (Exp: {{ new Date(profile.plan_expires_at).toLocaleDateString() }})
                </span>
              </p>
            </div>
            <button
              type="button"
              class="rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 hover:text-red-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
              :disabled="isSigningOut"
              @click="handleSignOut"
              title="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </template>
 
        <RouterLink
          :to="languageLink"
          class="hidden sm:block rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-500/20 dark:text-brand-200"
          @click="trackHeaderClick(`Switch language to ${languageLabel}`, languageLink)"
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
          @click="trackHeaderClick(item.label, item.to); menuOpen = false"
        >
          {{ item.label }}
        </RouterLink>
        <RouterLink :to="languageLink" class="rounded-xl px-4 py-3 text-sm font-medium text-brand-700 hover:bg-slate-100 dark:text-brand-200 dark:hover:bg-white/5" @click="trackHeaderClick(`Switch language to ${languageLabel}`, languageLink)">
          {{ languageLabel }}
        </RouterLink>
        <button type="button" class="rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5" @click="toggleThemeWithTracking">
          {{ isDark ? 'Light mode' : 'Dark mode' }}
        </button>

        <div class="h-px bg-slate-200 dark:bg-white/10 my-2"></div>

        <template v-if="!user">
          <button type="button" class="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5" @click="openAuthModal('login'); menuOpen = false">
            {{ t('login', currentLocale) || 'Login' }}
          </button>
          <button type="button" class="w-full rounded-xl bg-brand-500 px-4 py-3 text-left text-sm font-bold text-white" @click="openAuthModal('register'); menuOpen = false">
            {{ t('register', currentLocale) || 'Buat Akun' }}
          </button>
        </template>
        <template v-else>
          <div class="px-4 py-3">
            <p class="text-xs font-bold text-slate-900 dark:text-white">{{ user.email }}</p>
            <p class="text-[10px] uppercase tracking-wider text-brand-600 dark:text-brand-300">
              {{ profile?.plan }} | {{ profile?.role }}
              <span v-if="profile?.plan === 'pro' && profile?.plan_expires_at" class="text-slate-400 dark:text-slate-500 normal-case ml-1 font-normal">
                (Exp: {{ new Date(profile.plan_expires_at).toLocaleDateString() }})
              </span>
            </p>
          </div>
          <button type="button" class="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10" @click="handleSignOut(); menuOpen = false">
            Logout
          </button>
        </template>
      </nav>
    </div>
  </header>
</template>
