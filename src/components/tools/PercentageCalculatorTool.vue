<script setup lang="ts">
import { computed, reactive } from 'vue';

const form = reactive({
  baseValue: 100,
  percentage: 20,
});

const percentageValue = computed(() => form.baseValue * (form.percentage / 100));
const increasedValue = computed(() => form.baseValue + percentageValue.value);
const decreasedValue = computed(() => Math.max(0, form.baseValue - percentageValue.value));
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Nilai Dasar</span>
        <input v-model.number="form.baseValue" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Persentase (%)</span>
        <input v-model.number="form.percentage" type="number" min="0" step="0.1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-3">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Nilai Persen</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ percentageValue.toFixed(2) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Naik Jadi</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ increasedValue.toFixed(2) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Turun Jadi</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ decreasedValue.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>
