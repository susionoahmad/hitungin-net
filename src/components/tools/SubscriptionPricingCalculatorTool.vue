<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { formatRupiah } from '@/utils/currency';
import { detectLocaleFromPath } from '@/utils/locale';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));

const form = reactive({
  monthlyCost: 3000000,
  targetMargin: 60,
  payingCustomers: 50,
});

const requiredRevenue = computed(() =>
  form.targetMargin < 100 ? form.monthlyCost / (1 - form.targetMargin / 100) : 0,
);
const pricePerCustomer = computed(() =>
  form.payingCustomers > 0 ? requiredRevenue.value / form.payingCustomers : 0,
);
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="block">
        <span class="text-sm text-slate-300">{{ locale === 'en' ? 'Monthly Cost' : 'Biaya Bulanan' }}</span>
        <input v-model.number="form.monthlyCost" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">{{ locale === 'en' ? 'Target Margin (%)' : 'Margin Target (%)' }}</span>
        <input v-model.number="form.targetMargin" type="number" min="0" max="99" step="0.1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">{{ locale === 'en' ? 'Paying Customers' : 'Pelanggan Bayar' }}</span>
        <input v-model.number="form.payingCustomers" type="number" min="1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>
    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ locale === 'en' ? 'Required Revenue' : 'Pendapatan Dibutuhkan' }}</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(requiredRevenue) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ locale === 'en' ? 'Price per Customer' : 'Harga per Pelanggan' }}</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ formatRupiah(pricePerCustomer) }}</p>
      </div>
    </div>
  </div>
</template>
