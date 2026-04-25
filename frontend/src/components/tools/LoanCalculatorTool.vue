<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { buildAmortizationSchedule, calculateLoanPayment } from '@/utils/toolMath';
import { formatRupiah } from '@/utils/currency';
import { detectLocaleFromPath } from '@/utils/locale';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));
const isEn = computed(() => locale.value === 'en');

const ui = computed(() =>
  isEn.value
    ? {
        amount: 'Loan Amount',
        annualRate: 'Annual Interest (%)',
        tenor: 'Tenor (months)',
        monthlyInstallment: 'Monthly Installment',
        totalInterest: 'Total Interest',
        totalPayment: 'Total Payment',
        month: 'Month',
        installment: 'Installment',
        interest: 'Interest',
        principal: 'Principal',
        remaining: 'Remaining Balance',
      }
    : {
        amount: 'Jumlah Pinjaman',
        annualRate: 'Bunga per Tahun (%)',
        tenor: 'Tenor (bulan)',
        monthlyInstallment: 'Cicilan / Bulan',
        totalInterest: 'Total Bunga',
        totalPayment: 'Total Pembayaran',
        month: 'Bulan',
        installment: 'Angsuran',
        interest: 'Bunga',
        principal: 'Pokok',
        remaining: 'Sisa',
      },
);

const form = reactive({
  amount: 50000000,
  annualRate: 12,
  tenorMonths: 12,
});

const monthlyPayment = computed(() =>
  calculateLoanPayment(form.amount, form.annualRate, form.tenorMonths),
);

const schedule = computed(() => buildAmortizationSchedule(form.amount, form.annualRate, form.tenorMonths));
const totalPayment = computed(() => monthlyPayment.value * form.tenorMonths);
const totalInterest = computed(() => totalPayment.value - form.amount);
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div class="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
        <label class="block">
          <span class="text-sm text-slate-300">{{ ui.amount }}</span>
          <input v-model.number="form.amount" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
        </label>
        <label class="block">
          <span class="text-sm text-slate-300">{{ ui.annualRate }}</span>
          <input v-model.number="form.annualRate" type="number" min="0" step="0.1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
        </label>
        <label class="block">
          <span class="text-sm text-slate-300">{{ ui.tenor }}</span>
          <input v-model.number="form.tenorMonths" type="number" min="1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
        </label>
      </div>

      <div class="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ ui.monthlyInstallment }}</p>
          <p class="mt-2 text-xl font-bold leading-tight text-white tabular-nums 2xl:text-2xl">{{ formatRupiah(monthlyPayment) }}</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ ui.totalInterest }}</p>
          <p class="mt-2 text-xl font-bold leading-tight text-white tabular-nums 2xl:text-2xl">{{ formatRupiah(totalInterest) }}</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ ui.totalPayment }}</p>
          <p class="mt-2 text-xl font-bold leading-tight text-white tabular-nums 2xl:text-2xl">{{ formatRupiah(totalPayment) }}</p>
        </div>
      </div>
    </div>

    <div class="mt-8 overflow-x-auto rounded-2xl border border-white/10">
      <table class="min-w-full divide-y divide-white/10 text-sm">
        <thead class="bg-slate-900/80 text-slate-300">
          <tr>
            <th class="px-4 py-3 text-left font-semibold">{{ ui.month }}</th>
            <th class="px-4 py-3 text-left font-semibold">{{ ui.installment }}</th>
            <th class="px-4 py-3 text-left font-semibold">{{ ui.interest }}</th>
            <th class="px-4 py-3 text-left font-semibold">{{ ui.principal }}</th>
            <th class="px-4 py-3 text-left font-semibold">{{ ui.remaining }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/10 bg-slate-950/60">
          <tr v-for="row in schedule.slice(0, 12)" :key="row.month">
            <td class="px-4 py-3 text-slate-200">{{ row.month }}</td>
            <td class="px-4 py-3 text-slate-200">{{ formatRupiah(row.payment) }}</td>
            <td class="px-4 py-3 text-slate-200">{{ formatRupiah(row.interest) }}</td>
            <td class="px-4 py-3 text-slate-200">{{ formatRupiah(row.principalPaid) }}</td>
            <td class="px-4 py-3 text-slate-200">{{ formatRupiah(row.remainingBalance) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
