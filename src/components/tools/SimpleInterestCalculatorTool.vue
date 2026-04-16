<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  principal: 8000000,
  rate: 12,
  years: 2,
});

const interest = computed(() => form.principal * (form.rate / 100) * form.years);
const totalAmount = computed(() => form.principal + interest.value);
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="block">
        <span class="text-sm text-slate-300">Pokok</span>
        <input v-model.number="form.principal" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Bunga per Tahun (%)</span>
        <input v-model.number="form.rate" type="number" min="0" step="0.1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Lama (tahun)</span>
        <input v-model.number="form.years" type="number" min="0" step="0.1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Bunga</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(interest) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Total Akhir</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ formatRupiah(totalAmount) }}</p>
      </div>
    </div>
  </div>
</template>
