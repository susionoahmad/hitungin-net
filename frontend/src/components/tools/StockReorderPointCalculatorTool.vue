<script setup lang="ts">
import { computed, reactive } from 'vue';

const form = reactive({
  averageDailyUsage: 12,
  leadTimeDays: 10,
  safetyStock: 50,
});

const reorderPoint = computed(() => form.averageDailyUsage * form.leadTimeDays + form.safetyStock);
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="block">
        <span class="text-sm text-slate-300">Pemakaian Harian Rata-rata</span>
        <input v-model.number="form.averageDailyUsage" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Lead Time (hari)</span>
        <input v-model.number="form.leadTimeDays" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Safety Stock</span>
        <input v-model.number="form.safetyStock" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>
    <div class="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Reorder Point</p>
      <p class="mt-2 text-3xl font-bold text-brand-300">{{ reorderPoint.toFixed(0) }}</p>
    </div>
  </div>
</template>
