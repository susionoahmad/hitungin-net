<script setup lang="ts">
import { computed, reactive } from 'vue';

const form = reactive({
  cashBalance: 50000000,
  monthlyBurn: 10000000,
});

const runwayMonths = computed(() => (form.monthlyBurn > 0 ? form.cashBalance / form.monthlyBurn : 0));
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Saldo Kas</span>
        <input v-model.number="form.cashBalance" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Pembakaran Kas Bulanan</span>
        <input v-model.number="form.monthlyBurn" type="number" min="1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>
    <div class="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Runway (bulan)</p>
      <p class="mt-2 text-3xl font-bold text-brand-300">{{ runwayMonths.toFixed(1) }}</p>
    </div>
  </div>
</template>
