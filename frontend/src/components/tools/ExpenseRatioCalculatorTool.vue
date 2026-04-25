<script setup lang="ts">
import { computed, reactive } from 'vue';

const form = reactive({
  expenses: 6500000,
  revenue: 15000000,
});

const expenseRatio = computed(() => (form.revenue > 0 ? (form.expenses / form.revenue) * 100 : 0));
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Total Biaya</span>
        <input v-model.number="form.expenses" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Pendapatan</span>
        <input v-model.number="form.revenue" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Expense Ratio</p>
      <p class="mt-2 text-3xl font-bold text-brand-300">{{ expenseRatio.toFixed(2) }}%</p>
    </div>
  </div>
</template>
