<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  revenue: 22000000,
  costs: 17000000,
});

const profit = computed(() => Math.max(0, form.revenue - form.costs));
const profitMargin = computed(() => (form.revenue > 0 ? (profit.value / form.revenue) * 100 : 0));
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Revenue</span>
        <input v-model.number="form.revenue" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Total Biaya</span>
        <input v-model.number="form.costs" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Profit</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(profit) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Profit Margin</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ profitMargin.toFixed(2) }}%</p>
      </div>
    </div>
  </div>
</template>
