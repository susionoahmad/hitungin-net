<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { detectLocaleFromPath } from '@/utils/locale';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));

const form = reactive({
  invoiceDate: '2026-04-16',
  termDays: 14,
});

const dueDate = computed(() => {
  const date = new Date(form.invoiceDate);
  if (Number.isNaN(date.getTime())) return '';
  date.setDate(date.getDate() + form.termDays);
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
});
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">{{ locale === 'en' ? 'Invoice Date' : 'Tanggal Invoice' }}</span>
        <input v-model="form.invoiceDate" type="date" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">{{ locale === 'en' ? 'Payment Term (days)' : 'Jangka Waktu Pembayaran (hari)' }}</span>
        <input v-model.number="form.termDays" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>
    <div class="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ locale === 'en' ? 'Due Date' : 'Tanggal Jatuh Tempo' }}</p>
      <p class="mt-2 text-3xl font-bold text-brand-300">{{ dueDate }}</p>
    </div>
  </div>
</template>
