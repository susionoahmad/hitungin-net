<script setup lang="ts">
import { ref, computed } from 'vue';

const salary = ref<number | null>(null);
const tenureMonths = ref<number>(12);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

const thrAmount = computed(() => {
  if (salary.value === null) return 0;
  if (tenureMonths.value >= 12) {
    return salary.value;
  }
  if (tenureMonths.value > 0) {
    return (tenureMonths.value / 12) * salary.value;
  }
  return 0;
});
</script>

<template>
  <div class="glass-panel p-6 shadow-lg">
    <div class="grid gap-6 md:grid-cols-2">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Gaji Bulanan (Gaji Pokok + Tunjangan Tetap)</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <span class="inline-flex items-center rounded-l-md border border-r-0 border-slate-300 bg-slate-50 px-3 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">Rp</span>
            <input
              v-model.number="salary"
              type="number"
              class="block w-full flex-1 rounded-none rounded-r-md border-slate-300 focus:border-brand-500 focus:ring-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
              placeholder="Contoh: 10000000"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Masa Kerja (Bulan)</label>
          <input
            v-model.number="tenureMonths"
            type="range"
            min="0"
            max="24"
            class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 dark:bg-white/10"
          />
          <div class="mt-2 flex justify-between text-xs text-slate-500">
            <span>0 Bulan</span>
            <span class="font-bold text-brand-600 dark:text-brand-400">{{ tenureMonths }} Bulan</span>
            <span>24+ Bulan</span>
          </div>
        </div>
      </div>

      <div class="rounded-2xl bg-slate-50 p-6 dark:bg-white/5">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Estimasi THR Anda</h3>
        <div class="mt-8 text-center">
          <p class="text-sm text-slate-600 dark:text-slate-400">Nominal THR yang diterima:</p>
          <p class="mt-2 text-4xl font-bold text-brand-600 dark:text-brand-400">{{ formatCurrency(thrAmount) }}</p>
        </div>

        <div class="mt-10 space-y-3">
          <div class="flex justify-between text-sm">
            <span class="text-slate-600 dark:text-slate-400">Status Masa Kerja</span>
            <span class="font-medium text-slate-900 dark:text-white">
              {{ tenureMonths >= 12 ? 'Penuh (>= 12 Bulan)' : 'Proposional (Prorata)' }}
            </span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-slate-600 dark:text-slate-400">Rumus Digunakan</span>
            <span class="font-medium text-slate-900 dark:text-white">
              {{ tenureMonths >= 12 ? '1 x Gaji' : `(${tenureMonths}/12) x Gaji` }}
            </span>
          </div>
        </div>

        <div class="mt-6 rounded-lg bg-brand-50 p-3 text-xs text-brand-800 dark:bg-brand-500/10 dark:text-brand-200">
          <p><strong>Catatan:</strong> Sesuai Permenaker No. 6 Tahun 2016, pekerja dengan masa kerja minimal 1 bulan berhak mendapatkan THR secara proporsional.</p>
        </div>
      </div>
    </div>
  </div>
</template>
