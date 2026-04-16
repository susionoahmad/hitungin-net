<script setup lang="ts">
import { computed, reactive } from 'vue';

const form = reactive({
  invoiceDate: '2026-04-16',
  dueDays: 14,
});

const dueDate = computed(() => {
  const base = new Date(form.invoiceDate);
  if (Number.isNaN(base.getTime())) return '-';
  base.setDate(base.getDate() + Math.max(0, form.dueDays));
  return base.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
});
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Tanggal Invoice</span>
        <input v-model="form.invoiceDate" type="date" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Termin (hari)</span>
        <input v-model.number="form.dueDays" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Tanggal Jatuh Tempo</p>
      <p class="mt-2 text-2xl font-bold text-brand-300">{{ dueDate }}</p>
    </div>
  </div>
</template>
