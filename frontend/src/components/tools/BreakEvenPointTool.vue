<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  fixedCost: 5000000,
  variableCost: 35000,
  sellingPrice: 60000,
});

const contributionMargin = computed(() => Math.max(0, form.sellingPrice - form.variableCost));
const unitsToBreakEven = computed(() =>
  contributionMargin.value > 0 ? Math.ceil(form.fixedCost / contributionMargin.value) : 0,
);
const revenueToBreakEven = computed(() => unitsToBreakEven.value * form.sellingPrice);
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
        <span class="text-sm text-slate-300">Harga Jual / Unit</span>
        <input v-model.number="form.sellingPrice" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-3">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Unit BEP</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ unitsToBreakEven }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Omzet BEP</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(revenueToBreakEven) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Kontribusi / Unit</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ formatRupiah(contributionMargin) }}</p>
      </div>
    </div>
  </div>
</template>
