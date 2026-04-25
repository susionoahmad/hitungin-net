<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  fixedCost: 8000000,
  variableCost: 35000,
  units: 300,
});

const totalCost = computed(() => form.fixedCost + form.variableCost * form.units);
const unitCost = computed(() => (form.units > 0 ? totalCost.value / form.units : 0));
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="block">
        <span class="text-sm text-slate-300">Biaya Tetap</span>
        <input v-model.number="form.fixedCost" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Biaya Variabel / Unit</span>
        <input v-model.number="form.variableCost" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Jumlah Unit</span>
        <input v-model.number="form.units" type="number" min="1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Total Biaya</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(totalCost) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Biaya per Unit</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ formatRupiah(unitCost) }}</p>
      </div>
    </div>
  </div>
</template>
