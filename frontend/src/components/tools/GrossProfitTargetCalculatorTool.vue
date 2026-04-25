<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  targetGrossProfit: 10000000,
  grossMarginPercent: 35,
});

const requiredRevenue = computed(() =>
  form.grossMarginPercent > 0 ? form.targetGrossProfit / (form.grossMarginPercent / 100) : 0,
);
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Target Gross Profit</span>
        <input v-model.number="form.targetGrossProfit" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Gross Margin (%)</span>
        <input v-model.number="form.grossMarginPercent" type="number" min="0" max="100" step="0.1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>
    <div class="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Required Revenue</p>
      <p class="mt-2 text-3xl font-bold text-brand-300">{{ formatRupiah(requiredRevenue) }}</p>
    </div>
  </div>
</template>
