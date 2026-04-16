<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  goal: 20000000,
  months: 12,
});

const monthlySaving = computed(() => (form.months > 0 ? form.goal / form.months : 0));
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Target Tabungan</span>
        <input v-model.number="form.goal" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Durasi (bulan)</span>
        <input v-model.number="form.months" type="number" min="1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Setoran Bulanan</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(monthlySaving) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Target Akhir</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ formatRupiah(form.goal) }}</p>
      </div>
    </div>
  </div>
</template>
