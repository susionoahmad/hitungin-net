<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  type: 'profesi', // 'profesi' | 'emas'
  monthlyIncome: 10000000,
  otherIncome: 0,
  goldPrice: 1200000,
  goldWeight: 100,
});

const NISAB_GOLD_GRAMS = 85;

const professionZakat = computed(() => {
  const totalIncome = form.monthlyIncome + form.otherIncome;
  const monthlyNisab = (form.goldPrice * NISAB_GOLD_GRAMS) / 12;
  
  if (totalIncome >= monthlyNisab) {
    return totalIncome * 0.025;
  }
  return 0;
});

const goldZakat = computed(() => {
  if (form.goldWeight >= NISAB_GOLD_GRAMS) {
    return (form.goldWeight * form.goldPrice) * 0.025;
  }
  return 0;
});

const result = computed(() => (form.type === 'profesi' ? professionZakat.value : goldZakat.value));
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="mb-6 flex gap-2">
      <button 
        @click="form.type = 'profesi'"
        :class="[form.type === 'profesi' ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700']"
        class="rounded-xl px-4 py-2 text-sm font-medium transition-all"
      >
        Zakat Profesi
      </button>
      <button 
        @click="form.type = 'emas'"
        :class="[form.type === 'emas' ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700']"
        class="rounded-xl px-4 py-2 text-sm font-medium transition-all"
      >
        Zakat Emas
      </button>
    </div>

    <div v-if="form.type === 'profesi'" class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Penghasilan Bulanan</span>
        <input v-model.number="form.monthlyIncome" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Penghasilan Lainnya (Opsional)</span>
        <input v-model.number="form.otherIncome" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block md:col-span-2">
        <span class="text-sm text-slate-300">Harga Emas Hari Ini (per gram)</span>
        <input v-model.number="form.goldPrice" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Total Berat Emas (gram)</span>
        <input v-model.number="form.goldWeight" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Harga Emas Hari Ini (per gram)</span>
        <input v-model.number="form.goldPrice" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
      <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Total Zakat yang Harus Dibayar</p>
      <p class="mt-2 text-3xl font-bold text-brand-300">{{ formatRupiah(result) }}</p>
      <p v-if="result === 0" class="mt-3 text-sm text-slate-400 italic">
        * Nominal belum mencapai Nisab (batas minimum wajib zakat).
      </p>
      <p v-else class="mt-3 text-sm text-slate-400 italic">
        * Perhitungan berdasarkan tarif zakat 2.5%.
      </p>
    </div>
  </div>
</template>
