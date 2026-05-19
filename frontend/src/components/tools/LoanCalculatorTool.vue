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

const principalPercentage = computed(() => {
  if (totalPayment.value <= 0) return 100;
  return (form.amount / totalPayment.value) * 100;
});

const interestPercentage = computed(() => {
  if (totalPayment.value <= 0) return 0;
  return (totalInterest.value / totalPayment.value) * 100;
});

const amortizationPath = computed(() => {
  const N = schedule.value.length;
  if (N === 0) return 'M 0,90 L 300,90';
  
  let path = `M 0,10`;
  schedule.value.forEach((row, i) => {
    const x = ((i + 1) / N) * 300;
    const y = 10 + (1 - row.remainingBalance / form.amount) * 80;
    path += ` L ${x.toFixed(1)},${y.toFixed(1)}`;
  });
  
  return path;
});

const amortizationAreaPath = computed(() => {
  const path = amortizationPath.value;
  if (!path) return '';
  return `${path} L 300,90 L 0,90 Z`;
});
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

      <div class="flex flex-col gap-6">
        <!-- Hasil Kalkulasi Cards -->
        <div class="grid gap-4 md:grid-cols-3">
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

        <!-- Visualisasi Grafik -->
        <div class="grid gap-4 md:grid-cols-2">
          <!-- Chart 1: Donut Chart -->
          <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-5 flex flex-col items-center justify-between">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 w-full mb-4">{{ isEn ? 'Payment Composition' : 'Komposisi Pembayaran' }}</p>
            <div class="flex items-center gap-6 w-full justify-center">
              <div class="relative w-28 h-28 flex items-center justify-center">
                <svg viewBox="0 0 36 36" class="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#1e293b" stroke-width="3.5" />
                  
                  <!-- Bunga Segment (Base) -->
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" stroke-width="3.5"
                          stroke-dasharray="100" stroke-dashoffset="0" />
                  
                  <!-- Pokok Segment (Overlay) -->
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" stroke-width="3.5"
                          stroke-dasharray="100" :stroke-dashoffset="100 - principalPercentage"
                          class="transition-all duration-500 ease-out" />
                </svg>
                <div class="absolute flex flex-col items-center">
                  <span class="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">{{ isEn ? 'Principal' : 'Pokok' }}</span>
                  <span class="text-sm font-bold text-white">{{ principalPercentage.toFixed(0) }}%</span>
                </div>
              </div>
              
              <div class="flex flex-col gap-2 text-xs">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded bg-blue-500"></span>
                  <span class="text-slate-300 font-medium">{{ isEn ? 'Principal' : 'Pokok' }} ({{ principalPercentage.toFixed(0) }}%)</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded bg-red-500"></span>
                  <span class="text-slate-300 font-medium">{{ isEn ? 'Interest' : 'Bunga' }} ({{ interestPercentage.toFixed(0) }}%)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Chart 2: Amortization Trend Area Chart -->
          <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-5 flex flex-col">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">{{ isEn ? 'Remaining Balance Trend' : 'Tren Penurunan Sisa Utang' }}</p>
            <div class="relative w-full h-28 mt-2">
              <svg viewBox="0 0 300 100" class="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.4" />
                    <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.0" />
                  </linearGradient>
                </defs>
                
                <line x1="0" y1="10" x2="300" y2="10" stroke="#334155" stroke-width="0.5" stroke-dasharray="2,2" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="#334155" stroke-width="0.5" stroke-dasharray="2,2" />
                <line x1="0" y1="90" x2="300" y2="90" stroke="#334155" stroke-width="0.5" />
                
                <path :d="amortizationAreaPath" fill="url(#areaGrad)" class="transition-all duration-500 ease-out" />
                <path :d="amortizationPath" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-all duration-500 ease-out" />
                
                <circle cx="0" cy="10" r="3.5" fill="#3b82f6" stroke="#0f172a" stroke-width="1.5" />
                <circle cx="300" cy="90" r="3.5" fill="#3b82f6" stroke="#0f172a" stroke-width="1.5" />
              </svg>
              <div class="absolute -top-3 left-0 text-[8px] text-slate-500 font-semibold uppercase">{{ formatRupiah(form.amount) }}</div>
              <div class="absolute bottom-1 right-0 text-[8px] text-slate-500 font-semibold uppercase">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 overflow-auto max-h-96 rounded-2xl border border-white/10">
      <table class="min-w-full divide-y divide-white/10 text-sm">
        <thead class="bg-slate-900/90 backdrop-blur-md text-slate-300 sticky top-0 z-10">
          <tr>
            <th class="px-4 py-3 text-left font-semibold">{{ ui.month }}</th>
            <th class="px-4 py-3 text-left font-semibold">{{ ui.installment }}</th>
            <th class="px-4 py-3 text-left font-semibold">{{ ui.interest }}</th>
            <th class="px-4 py-3 text-left font-semibold">{{ ui.principal }}</th>
            <th class="px-4 py-3 text-left font-semibold">{{ ui.remaining }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/10 bg-slate-950/60">
          <tr v-for="row in schedule" :key="row.month">
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
