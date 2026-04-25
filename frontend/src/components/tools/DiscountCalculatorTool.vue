<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  price: 250000,
  discountPercent: 20,
});

const discountAmount = computed(() => form.price * (form.discountPercent / 100));
const finalPrice = computed(() => Math.max(0, form.price - discountAmount.value));
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Harga Awal</span>
        <input v-model.number="form.price" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Diskon (%)</span>
        <input v-model.number="form.discountPercent" type="number" min="0" max="100" step="0.1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Nominal Diskon</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(discountAmount) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Harga Setelah Diskon</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ formatRupiah(finalPrice) }}</p>
      </div>
    </div>
  </div>
</template>
