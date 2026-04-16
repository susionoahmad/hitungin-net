<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { detectLocaleFromPath } from '@/utils/locale';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));

const form = reactive({
  averageDailyUsage: 15,
  maxLeadTimeDays: 14,
  averageLeadTimeDays: 10,
});

const safetyStock = computed(() => form.averageDailyUsage * (form.maxLeadTimeDays - form.averageLeadTimeDays));
const reorderPoint = computed(() => form.averageDailyUsage * form.averageLeadTimeDays + safetyStock.value);
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="block">
        <span class="text-sm text-slate-300">{{ locale === 'en' ? 'Average Daily Usage' : 'Pemakaian Harian Rata-rata' }}</span>
        <input v-model.number="form.averageDailyUsage" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">{{ locale === 'en' ? 'Average Lead Time (days)' : 'Lead Time Rata-rata (hari)' }}</span>
        <input v-model.number="form.averageLeadTimeDays" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">{{ locale === 'en' ? 'Max Lead Time (days)' : 'Lead Time Maksimum (hari)' }}</span>
        <input v-model.number="form.maxLeadTimeDays" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>
    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ locale === 'en' ? 'Safety Stock' : 'Stok Pengaman' }}</p>
        <p class="mt-2 text-3xl font-bold text-white">{{ safetyStock.toFixed(0) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ locale === 'en' ? 'Reorder Point' : 'Titik Pesan Ulang' }}</p>
        <p class="mt-2 text-3xl font-bold text-brand-300">{{ reorderPoint.toFixed(0) }}</p>
      </div>
    </div>
  </div>
</template>
