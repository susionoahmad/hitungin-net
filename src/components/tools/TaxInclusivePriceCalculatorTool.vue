<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  basePrice: 100000,
  vatRate: 11,
});

const taxAmount = computed(() => form.basePrice * (form.vatRate / 100));
const totalPrice = computed(() => form.basePrice + taxAmount.value);
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Harga Dasar</span>
        <input v-model.number="form.basePrice" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">PPN (%)</span>
        <input v-model.number="form.vatRate" type="number" min="0" step="0.1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">PPN</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(taxAmount) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Harga Termasuk Pajak</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ formatRupiah(totalPrice) }}</p>
      </div>
    </div>
  </div>
</template>
