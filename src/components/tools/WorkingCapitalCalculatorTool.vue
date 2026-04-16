<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  currentAssets: 25000000,
  currentLiabilities: 12000000,
  safetyBuffer: 3000000,
});

const workingCapital = computed(() => form.currentAssets - form.currentLiabilities + form.safetyBuffer);
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="block">
        <span class="text-sm text-slate-300">Aset Lancar</span>
        <input v-model.number="form.currentAssets" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Liabilitas Lancar</span>
        <input v-model.number="form.currentLiabilities" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Buffer Kas</span>
        <input v-model.number="form.safetyBuffer" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Kebutuhan Modal Kerja</p>
      <p class="mt-2 text-3xl font-bold text-brand-300">{{ formatRupiah(workingCapital) }}</p>
    </div>
  </div>
</template>
