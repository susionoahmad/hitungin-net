<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  cost: 120000,
  markupPercent: 35,
});

const markupAmount = computed(() => form.cost * (form.markupPercent / 100));
const sellingPrice = computed(() => form.cost + markupAmount.value);
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Harga Modal</span>
        <input v-model.number="form.cost" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Markup (%)</span>
        <input v-model.number="form.markupPercent" type="number" min="0" step="0.1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Markup</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(markupAmount) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Harga Jual</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ formatRupiah(sellingPrice) }}</p>
      </div>
    </div>
  </div>
</template>
