<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  presentValue: 10000000,
  annualInflation: 5,
  years: 10,
});

const futureValue = computed(() => {
  return form.presentValue * Math.pow(1 + form.annualInflation / 100, form.years);
});

const lossValue = computed(() => futureValue.value - form.presentValue);
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="block">
        <span class="text-sm text-slate-300">Nilai Uang Saat Ini</span>
        <input v-model.number="form.presentValue" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Inflasi Tahunan (%)</span>
        <input v-model.number="form.annualInflation" type="number" min="0" step="0.1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Jangka Waktu (Tahun)</span>
        <input v-model.number="form.years" type="number" min="1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-8 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Nilai di Masa Depan</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(futureValue) }}</p>
        <p class="mt-2 text-xs text-slate-500">
          Uang {{ formatRupiah(form.presentValue) }} hari ini setara dengan {{ formatRupiah(futureValue) }} di {{ form.years }} tahun lagi.
        </p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Kenaikan Biaya Hidup</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ formatRupiah(lossValue) }}</p>
        <p class="mt-2 text-xs text-slate-500">
          Total kenaikan harga barang/jasa selama periode {{ form.years }} tahun.
        </p>
      </div>
    </div>

    <div class="mt-6 rounded-xl border border-brand-500/20 bg-brand-500/5 p-4 text-sm text-brand-200">
      <p>💡 <strong>Insight:</strong> Tanpa investasi yang mengimbangi inflasi, nilai kekayaan Anda akan terus menurun. Inflasi rata-rata di Indonesia biasanya berkisar antara 3% - 6% per tahun.</p>
    </div>
  </div>
</template>
