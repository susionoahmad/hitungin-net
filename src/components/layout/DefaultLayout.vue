<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import AdTopBanner from '@/components/ads/AdTopBanner.vue';
</script>

<template>
  <div class="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_38%),linear-gradient(to_bottom,_#f8fafc,_#e2e8f0)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_35%),linear-gradient(to_bottom,_#020617,_#0f172a)]">
    <AppHeader />
    <main>
      <div class="section-shell pt-6">
        <AdTopBanner />
      </div>
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
