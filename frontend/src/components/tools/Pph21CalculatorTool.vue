<script setup lang="ts">
import { ref, computed } from 'vue';

const salary = ref<number | null>(null);
const otherIncome = ref<number>(0);
const maritalStatus = ref('TK/0');
const hasNpwp = ref(true);

const PTKP_MAP: Record<string, number> = {
  'TK/0': 54000000,
  'K/0': 58500000,
  'K/1': 63000000,
  'K/2': 67500000,
  'K/3': 72000000,
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

const annualGrossIncome = computed(() => {
  if (salary.value === null) return 0;
  return (salary.value + otherIncome.value) * 12;
});

const ptkp = computed(() => PTKP_MAP[maritalStatus.value] || 54000000);

const pkp = computed(() => {
  const value = annualGrossIncome.value - ptkp.value;
  return value > 0 ? value : 0;
});

const calculateTax = (amount: number) => {
  let tax = 0;
  let remaining = amount;

  // Layer 1: 0 - 60jt (5%)
  const layer1 = Math.min(remaining, 60000000);
  tax += layer1 * 0.05;
  remaining -= layer1;

  // Layer 2: 60jt - 250jt (15%)
  if (remaining > 0) {
    const layer2 = Math.min(remaining, 190000000); // 250jt - 60jt
    tax += layer2 * 0.15;
    remaining -= layer2;
  }

  // Layer 3: 250jt - 500jt (25%)
  if (remaining > 0) {
    const layer3 = Math.min(remaining, 250000000); // 500jt - 250jt
    tax += layer3 * 0.25;
    remaining -= layer3;
  }

  // Layer 4: 500jt - 5M (30%)
  if (remaining > 0) {
    const layer4 = Math.min(remaining, 4500000000); // 5M - 500jt
    tax += layer4 * 0.30;
    remaining -= layer4;
  }

  // Layer 5: > 5M (35%)
  if (remaining > 0) {
    tax += remaining * 0.35;
  }

  // If no NPWP, tax is 20% higher
  if (!hasNpwp.value) {
    tax = tax * 1.2;
  }

  return tax;
};

const annualTax = computed(() => calculateTax(pkp.value));
const monthlyTax = computed(() => annualTax.value / 12);
</script>

<template>
  <div class="glass-panel p-6 shadow-lg">
    <div class="grid gap-6 md:grid-cols-2">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Gaji Bulanan (Net/Bruto)</label>
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
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Pendapatan Lainnya (Bulanan)</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <span class="inline-flex items-center rounded-l-md border border-r-0 border-slate-300 bg-slate-50 px-3 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">Rp</span>
            <input
              v-model.number="otherIncome"
              type="number"
              class="block w-full flex-1 rounded-none rounded-r-md border-slate-300 focus:border-brand-500 focus:ring-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
              placeholder="Contoh: 0"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Status Marital (PTKP)</label>
          <select
            v-model="maritalStatus"
            class="mt-1 block w-full rounded-md border-slate-300 focus:border-brand-500 focus:ring-brand-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
          >
            <option value="TK/0" class="bg-slate-900 text-white">TK/0 (Lajang)</option>
            <option value="K/0" class="bg-slate-900 text-white">K/0 (Menikah, 0 Anak)</option>
            <option value="K/1" class="bg-slate-900 text-white">K/1 (Menikah, 1 Anak)</option>
            <option value="K/2" class="bg-slate-900 text-white">K/2 (Menikah, 2 Anak)</option>
            <option value="K/3" class="bg-slate-900 text-white">K/3 (Menikah, 3 Anak)</option>
          </select>
        </div>

        <div class="flex items-center gap-2">
          <input
            id="has-npwp"
            v-model="hasNpwp"
            type="checkbox"
            class="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <label for="has-npwp" class="text-sm text-slate-700 dark:text-slate-300">Memiliki NPWP</label>
        </div>
      </div>

      <div class="rounded-2xl bg-slate-50 p-6 dark:bg-white/5">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Estimasi PPh 21</h3>
        <div class="mt-6 space-y-4">
          <div class="flex justify-between border-b border-slate-200 pb-2 dark:border-white/10">
            <span class="text-sm text-slate-600 dark:text-slate-400">Pajak Per Bulan</span>
            <span class="text-lg font-bold text-brand-600 dark:text-brand-400">{{ formatCurrency(monthlyTax) }}</span>
          </div>
          <div class="flex justify-between border-b border-slate-200 pb-2 dark:border-white/10">
            <span class="text-sm text-slate-600 dark:text-slate-400">Pajak Per Tahun</span>
            <span class="text-base font-semibold text-slate-900 dark:text-white">{{ formatCurrency(annualTax) }}</span>
          </div>
          <div class="flex justify-between border-b border-slate-200 pb-2 dark:border-white/10">
            <span class="text-sm text-slate-600 dark:text-slate-400">Penghasilan Bruto (Tahunan)</span>
            <span class="text-sm text-slate-900 dark:text-white">{{ formatCurrency(annualGrossIncome) }}</span>
          </div>
          <div class="flex justify-between border-b border-slate-200 pb-2 dark:border-white/10">
            <span class="text-sm text-slate-600 dark:text-slate-400">PTKP</span>
            <span class="text-sm text-slate-900 dark:text-white">{{ formatCurrency(ptkp) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-slate-600 dark:text-slate-400">Penghasilan Kena Pajak (PKP)</span>
            <span class="text-sm text-slate-900 dark:text-white">{{ formatCurrency(pkp) }}</span>
          </div>
        </div>

        <div class="mt-6 rounded-lg bg-brand-50 p-3 text-xs text-brand-800 dark:bg-brand-500/10 dark:text-brand-200">
          <p><strong>Catatan:</strong> Perhitungan ini menggunakan tarif progresif UU HPP terbaru dan PTKP standar. Hasil bisa berbeda tergantung tunjangan lainnya (BPJS, JKK, JKM, dll).</p>
        </div>
      </div>
    </div>
  </div>
</template>
