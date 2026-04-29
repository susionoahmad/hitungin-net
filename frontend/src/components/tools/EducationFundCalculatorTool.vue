<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  currentCost: 50000000,
  yearsToStart: 5,
  annualInflation: 10,
  expectedReturn: 8,
});

const futureCost = computed(() => {
  return form.currentCost * Math.pow(1 + form.annualInflation / 100, form.yearsToStart);
});

const monthlySaving = computed(() => {
  const months = form.yearsToStart * 12;
  const monthlyRate = form.expectedReturn / 100 / 12;
  
  if (monthlyRate === 0) return futureCost.value / months;
  
  // PMT formula (simplified for target balance)
  // FV = PMT * [(1 + r)^n - 1] / r
  return futureCost.value * (monthlyRate / (Math.pow(1 + monthlyRate, months) - 1));
});
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Biaya Sekolah Saat Ini</span>
        <input v-model.number="form.currentCost" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Tahun Sampai Mulai (Tahun)</span>
        <input v-model.number="form.yearsToStart" type="number" min="1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Inflasi Biaya Sekolah (% / tahun)</span>
        <input v-model.number="form.annualInflation" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Target Return Investasi (% / tahun)</span>
        <input v-model.number="form.expectedReturn" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-8 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Estimasi Biaya Masa Depan</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(futureCost) }}</p>
        <p class="mt-2 text-xs text-slate-500">
          Total biaya yang dibutuhkan pada tahun ke-{{ form.yearsToStart }}.
        </p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Tabungan Bulanan Diperlukan</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ formatRupiah(monthlySaving) }}</p>
        <p class="mt-2 text-xs text-slate-500">
          Sisihkan setiap bulan ke instrumen investasi.
        </p>
      </div>
    </div>

    <div class="mt-6 rounded-xl bg-slate-800/40 p-4 text-sm text-slate-400 leading-relaxed">
      <p>💡 <strong>Informasi:</strong> Inflasi biaya pendidikan di Indonesia biasanya cukup tinggi, rata-rata berkisar antara 10% - 15% per tahun. Pastikan target return investasi Anda realistis (misal: Reksa Dana Saham 10-12%, Obligasi 6-8%).</p>
    </div>
  </div>
</template>
