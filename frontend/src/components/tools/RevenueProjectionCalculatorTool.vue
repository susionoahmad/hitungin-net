<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  unitPrice: 75000,
  unitsPerMonth: 400,
  months: 3,
});

const projectedRevenue = computed(() => form.unitPrice * form.unitsPerMonth * form.months);
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="block">
        <span class="text-sm text-slate-300">Harga per Unit</span>
        <input v-model.number="form.unitPrice" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Unit per Bulan</span>
        <input v-model.number="form.unitsPerMonth" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Periode (bulan)</span>
        <input v-model.number="form.months" type="number" min="1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Proyeksi Pendapatan</p>
      <p class="mt-2 text-3xl font-bold text-brand-300">{{ formatRupiah(projectedRevenue) }}</p>
    </div>
  </div>
</template>
