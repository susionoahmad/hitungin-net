<script setup lang="ts">
import { ref, computed } from 'vue';

const salary = ref<number | null>(null);
const yearsOfService = ref<number>(1);
const reason = ref('layoff'); // layoff, retirement, resignation

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

const upRate = computed(() => {
  if (yearsOfService.value < 1) return 1;
  if (yearsOfService.value < 2) return 2;
  if (yearsOfService.value < 3) return 3;
  if (yearsOfService.value < 4) return 4;
  if (yearsOfService.value < 5) return 5;
  if (yearsOfService.value < 6) return 6;
  if (yearsOfService.value < 7) return 7;
  if (yearsOfService.value < 8) return 8;
  return 9;
});

const upmkRate = computed(() => {
  if (yearsOfService.value < 3) return 0;
  if (yearsOfService.value < 6) return 2;
  if (yearsOfService.value < 9) return 3;
  if (yearsOfService.value < 12) return 4;
  if (yearsOfService.value < 15) return 5;
  if (yearsOfService.value < 18) return 6;
  if (yearsOfService.value < 21) return 7;
  if (yearsOfService.value < 24) return 8;
  return 10;
});

const multiplier = computed(() => {
  if (reason.value === 'resignation') return 0; // Resignation only gets UPH and UPMK (if eligible)
  if (reason.value === 'retirement') return 1.75; // Example multiplier for retirement
  return 0.5; // Default layoff multiplier in UU Cipta Kerja for efficiency
});

const upAmount = computed(() => (salary.value || 0) * upRate.value * (reason.value === 'resignation' ? 0 : multiplier.value));
const upmkAmount = computed(() => (salary.value || 0) * upmkRate.value);
const totalAmount = computed(() => upAmount.value + upmkAmount.value);
</script>

<template>
  <div class="glass-panel p-6 shadow-lg">
    <div class="grid gap-6 md:grid-cols-2">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Gaji Bulanan (Pokok + Tunjangan Tetap)</label>
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
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Masa Kerja (Tahun)</label>
          <input
            v-model.number="yearsOfService"
            type="number"
            min="0"
            class="mt-1 block w-full rounded-md border-slate-300 focus:border-brand-500 focus:ring-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Alasan Berhenti Kerja</label>
          <select
            v-model="reason"
            class="mt-1 block w-full rounded-md border-slate-300 focus:border-brand-500 focus:ring-brand-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
          >
            <option value="layoff" class="bg-slate-900 text-white">PHK (Efisiensi/Lainnya)</option>
            <option value="retirement" class="bg-slate-900 text-white">Pensiun</option>
            <option value="resignation" class="bg-slate-900 text-white">Mengundurkan Diri (Resign)</option>
          </select>
        </div>
      </div>

      <div class="rounded-2xl bg-slate-50 p-6 dark:bg-white/5">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Estimasi Pesangon</h3>
        <div class="mt-6 space-y-4">
          <div class="flex justify-between border-b border-slate-200 pb-2 dark:border-white/10">
            <span class="text-sm text-slate-600 dark:text-slate-400">Uang Pesangon (UP)</span>
            <span class="text-sm font-medium text-slate-900 dark:text-white">{{ formatCurrency(upAmount) }}</span>
          </div>
          <div class="flex justify-between border-b border-slate-200 pb-2 dark:border-white/10">
            <span class="text-sm text-slate-600 dark:text-slate-400">Uang Penghargaan (UPMK)</span>
            <span class="text-sm font-medium text-slate-900 dark:text-white">{{ formatCurrency(upmkAmount) }}</span>
          </div>
          <div class="flex justify-between pt-2">
            <span class="text-base font-bold text-slate-900 dark:text-white">Total Estimasi</span>
            <span class="text-xl font-bold text-brand-600 dark:text-brand-400">{{ formatCurrency(totalAmount) }}</span>
          </div>
        </div>

        <div class="mt-6 rounded-lg bg-brand-50 p-3 text-xs text-brand-800 dark:bg-brand-500/10 dark:text-brand-200">
          <p><strong>Catatan:</strong> Perhitungan ini merupakan estimasi dasar berdasarkan PP 35/2021. Hasil akhir bisa berbeda tergantung kebijakan perusahaan, sisa cuti (UPH), dan peraturan perusahaan lainnya.</p>
        </div>
      </div>
    </div>
  </div>
</template>
