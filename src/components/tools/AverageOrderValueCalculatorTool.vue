<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { formatRupiah } from '@/utils/currency';
import { detectLocaleFromPath } from '@/utils/locale';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));

const form = reactive({
  totalRevenue: 25000000,
  totalOrders: 125,
});

const aov = computed(() => (form.totalOrders > 0 ? form.totalRevenue / form.totalOrders : 0));
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">{{ locale === 'en' ? 'Total Revenue' : 'Total Pendapatan' }}</span>
        <input v-model.number="form.totalRevenue" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">{{ locale === 'en' ? 'Total Orders' : 'Total Order' }}</span>
        <input v-model.number="form.totalOrders" type="number" min="1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>
    <div class="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ locale === 'en' ? 'Average Order Value' : 'Rata-rata Nilai Order' }}</p>
      <p class="mt-2 text-3xl font-bold text-brand-300">{{ formatRupiah(aov) }}</p>
    </div>
  </div>
</template>
