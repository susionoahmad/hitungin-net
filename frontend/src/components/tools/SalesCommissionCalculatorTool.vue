<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  salesAmount: 30000000,
  commissionRate: 3,
  bonus: 1500000,
});

const commission = computed(() => form.salesAmount * (form.commissionRate / 100) + form.bonus);
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="block">
        <span class="text-sm text-slate-300">Nilai Penjualan</span>
        <input v-model.number="form.salesAmount" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Komisi (%)</span>
        <input v-model.number="form.commissionRate" type="number" min="0" step="0.1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Bonus Tetap</span>
        <input v-model.number="form.bonus" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Total Komisi</p>
      <p class="mt-2 text-3xl font-bold text-brand-300">{{ formatRupiah(commission) }}</p>
    </div>
  </div>
</template>
