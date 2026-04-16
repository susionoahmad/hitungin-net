<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  revenue: 12000000,
  operatingCost: 9500000,
  otherCost: 500000,
});

const netProfit = computed(() => Math.max(0, form.revenue - form.operatingCost - form.otherCost));
const netMargin = computed(() => (form.revenue > 0 ? (netProfit.value / form.revenue) * 100 : 0));
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="block">
        <span class="text-sm text-slate-300">Revenue</span>
        <input v-model.number="form.revenue" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Biaya Operasional</span>
        <input v-model.number="form.operatingCost" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Biaya Lain</span>
        <input v-model.number="form.otherCost" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Laba Bersih</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(netProfit) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Net Profit Margin</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ netMargin.toFixed(2) }}%</p>
      </div>
    </div>
  </div>
</template>
