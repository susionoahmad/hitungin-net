<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  investmentCost: 2500000,
  returnValue: 3500000,
});

const profit = computed(() => Math.max(0, form.returnValue - form.investmentCost));
const roi = computed(() => (form.investmentCost > 0 ? (profit.value / form.investmentCost) * 100 : 0));
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Biaya Investasi</span>
        <input v-model.number="form.investmentCost" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Nilai Kembali</span>
        <input v-model.number="form.returnValue" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-3">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Profit Bersih</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(profit) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">ROI</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ roi.toFixed(2) }}%</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Nilai Kembali</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(form.returnValue) }}</p>
      </div>
    </div>
  </div>
</template>
