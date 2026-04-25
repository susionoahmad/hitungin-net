<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  cost: 120000,
  shippingCost: 25000,
  sellingPrice: 180000,
});

const totalCost = computed(() => form.cost + form.shippingCost);
const profit = computed(() => Math.max(0, form.sellingPrice - totalCost.value));
const margin = computed(() => (form.sellingPrice > 0 ? (profit.value / form.sellingPrice) * 100 : 0));
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="block">
        <span class="text-sm text-slate-300">Harga Modal</span>
        <input v-model.number="form.cost" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Ongkir</span>
        <input v-model.number="form.shippingCost" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Harga Jual</span>
        <input v-model.number="form.sellingPrice" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>
    <div class="mt-6 grid gap-4 sm:grid-cols-3">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Total Cost</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(totalCost) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Profit</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(profit) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Margin</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ margin.toFixed(2) }}%</p>
      </div>
    </div>
  </div>
</template>
