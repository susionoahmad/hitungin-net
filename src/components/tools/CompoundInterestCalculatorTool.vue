<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  principal: 5000000,
  annualRate: 10,
  years: 5,
});

const finalAmount = computed(() =>
  form.principal * Math.pow(1 + form.annualRate / 100, Math.max(0, form.years)),
);
const totalInterest = computed(() => finalAmount.value - form.principal);
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="block">
        <span class="text-sm text-slate-300">Modal Awal</span>
        <input v-model.number="form.principal" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Bunga per Tahun (%)</span>
        <input v-model.number="form.annualRate" type="number" min="0" step="0.1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Lama Investasi (tahun)</span>
        <input v-model.number="form.years" type="number" min="0" step="1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Nilai Akhir</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(finalAmount) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Total Bunga</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ formatRupiah(totalInterest) }}</p>
      </div>
    </div>
  </div>
</template>
