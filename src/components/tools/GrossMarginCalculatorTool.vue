<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  revenue: 18000000,
  cogs: 11000000,
});

const grossProfit = computed(() => Math.max(0, form.revenue - form.cogs));
const grossMargin = computed(() => (form.revenue > 0 ? (grossProfit.value / form.revenue) * 100 : 0));
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Revenue</span>
        <input v-model.number="form.revenue" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Cost of Goods Sold</span>
        <input v-model.number="form.cogs" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Gross Profit</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(grossProfit) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Gross Margin</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ grossMargin.toFixed(2) }}%</p>
      </div>
    </div>
  </div>
</template>
