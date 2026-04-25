<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  amount: 500000,
  vatRate: 11,
  includeTax: false,
});

const taxAmount = computed(() => {
  if (form.includeTax) {
    return form.amount - form.amount / (1 + form.vatRate / 100);
  }
  return form.amount * (form.vatRate / 100);
});

const baseAmount = computed(() => {
  if (form.includeTax) {
    return form.amount / (1 + form.vatRate / 100);
  }
  return form.amount;
});

const totalAmount = computed(() => (form.includeTax ? form.amount : form.amount + taxAmount.value));
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="block md:col-span-2">
        <span class="text-sm text-slate-300">Nominal</span>
        <input v-model.number="form.amount" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">PPN (%)</span>
        <input v-model.number="form.vatRate" type="number" min="0" step="0.1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <label class="mt-4 inline-flex items-center gap-3 text-sm text-slate-300">
      <input v-model="form.includeTax" type="checkbox" class="h-4 w-4 rounded border-white/20 bg-slate-900" />
      Nominal sudah termasuk PPN
    </label>

    <div class="mt-6 grid gap-4 sm:grid-cols-3">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Harga Dasar</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(baseAmount) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">PPN</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(taxAmount) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Total</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ formatRupiah(totalAmount) }}</p>
      </div>
    </div>
  </div>
</template>
