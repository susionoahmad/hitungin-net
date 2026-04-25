<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { formatRupiah } from '@/utils/currency';
import { detectLocaleFromPath } from '@/utils/locale';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));

const form = reactive({
  invoiceAmount: 5000000,
  dailyInterestRate: 0.2,
  daysLate: 7,
});

const lateInterest = computed(() => form.invoiceAmount * (form.dailyInterestRate / 100) * form.daysLate);
const totalDue = computed(() => form.invoiceAmount + lateInterest.value);
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="block">
        <span class="text-sm text-slate-300">{{ locale === 'en' ? 'Invoice Amount' : 'Nilai Invoice' }}</span>
        <input v-model.number="form.invoiceAmount" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">{{ locale === 'en' ? 'Interest Rate (% per day)' : 'Bunga (% per hari)' }}</span>
        <input v-model.number="form.dailyInterestRate" type="number" min="0" step="0.01" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">{{ locale === 'en' ? 'Days Late' : 'Jumlah Hari Terlambat' }}</span>
        <input v-model.number="form.daysLate" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>
    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ locale === 'en' ? 'Late Interest' : 'Denda Bunga' }}</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(lateInterest) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ locale === 'en' ? 'Total Due' : 'Total Tagihan' }}</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ formatRupiah(totalDue) }}</p>
      </div>
    </div>
  </div>
</template>
