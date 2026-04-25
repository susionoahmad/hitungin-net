<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  fixedCost: 6000000,
  contributionRatio: 40,
});

const breakEvenRevenue = computed(() =>
  form.contributionRatio > 0 ? form.fixedCost / (form.contributionRatio / 100) : 0,
);
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Biaya Tetap</span>
        <input v-model.number="form.fixedCost" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Rasio Kontribusi (%)</span>
        <input v-model.number="form.contributionRatio" type="number" min="0" max="100" step="0.1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Omzet Impas</p>
      <p class="mt-2 text-3xl font-bold text-brand-300">{{ formatRupiah(breakEvenRevenue) }}</p>
    </div>
  </div>
</template>
