<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  totalDebt: 50000000,
  interestRate: 12,
  monthlyPayment: 2500000,
});

const payoffData = computed(() => {
  let balance = form.totalDebt;
  const monthlyRate = form.interestRate / 100 / 12;
  let totalInterest = 0;
  let months = 0;
  
  if (form.monthlyPayment <= balance * monthlyRate) {
    return { months: Infinity, totalInterest: 0, possible: false };
  }

  while (balance > 0 && months < 360) { // Max 30 years to prevent infinite loop
    const interest = balance * monthlyRate;
    totalInterest += interest;
    balance = balance + interest - form.monthlyPayment;
    months++;
    if (balance < 0) balance = 0;
  }
  
  return { months, totalInterest, possible: true };
});
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="block">
        <span class="text-sm text-slate-300">Total Sisa Hutang</span>
        <input v-model.number="form.totalDebt" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Bunga Per Tahun (%)</span>
        <input v-model.number="form.interestRate" type="number" min="0" step="0.1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Cicilan Per Bulan</span>
        <input v-model.number="form.monthlyPayment" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div v-if="!payoffData.possible" class="mt-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
      ⚠️ <strong>Peringatan:</strong> Cicilan bulanan Anda lebih kecil dari bunga berjalan. Hutang Anda tidak akan pernah lunas jika cicilan tidak ditambah.
    </div>

    <div v-else class="mt-8 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Waktu Pelunasan</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ payoffData.months }} Bulan</p>
        <p class="mt-2 text-xs text-slate-500">
          Sekitar {{ (payoffData.months / 12).toFixed(1) }} tahun sampai lunas.
        </p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Total Bunga Dibayar</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ formatRupiah(payoffData.totalInterest) }}</p>
        <p class="mt-2 text-xs text-slate-500">
          Total biaya bunga yang dibayarkan selama periode pelunasan.
        </p>
      </div>
    </div>

    <div class="mt-6 rounded-xl bg-slate-800/40 p-4 text-sm text-slate-400 leading-relaxed">
      <p>💡 <strong>Tips:</strong> Gunakan metode <strong>Debt Avalanche</strong> (bayar hutang bunga tertinggi dulu) atau <strong>Debt Snowball</strong> (bayar hutang terkecil dulu) untuk mempercepat proses pelunasan.</p>
    </div>
  </div>
</template>
