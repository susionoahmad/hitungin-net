<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  subtotal: 1500000,
  taxRate: 11,
});

const taxAmount = computed(() => form.subtotal * (form.taxRate / 100));
const total = computed(() => form.subtotal + taxAmount.value);
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Subtotal</span>
        <input v-model.number="form.subtotal" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Pajak (%)</span>
        <input v-model.number="form.taxRate" type="number" min="0" step="0.1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>
    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Pajak</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(taxAmount) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Total</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ formatRupiah(total) }}</p>
      </div>
    </div>
  </div>
</template>
