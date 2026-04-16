<template>
  <div class="mb-6">
    <p v-if="eyebrow" class="text-sm font-semibold uppercase tracking-[0.25em] text-brand-300">
      {{ eyebrow }}
    </p>
    <h2 class="mt-2 text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
      <slot />
    </h2>
  </div>
</template>

<script setup lang="ts">
defineProps<{ eyebrow?: string }>();
</script>
