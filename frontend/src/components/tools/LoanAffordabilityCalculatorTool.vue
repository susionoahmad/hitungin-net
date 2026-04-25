<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  monthlyIncome: 12000000,
  safeRatio: 35,
  otherCommitments: 1500000,
});

const maxInstallment = computed(() => form.monthlyIncome * (form.safeRatio / 100));
const availableForLoan = computed(() => Math.max(0, maxInstallment.value - form.otherCommitments));
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <label class="block">
        <span class="text-sm text-slate-300">Penghasilan Bulanan</span>
        <input v-model.number="form.monthlyIncome" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Rasio Aman (%)</span>
        <input v-model.number="form.safeRatio" type="number" min="0" max="100" step="0.1" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Komitmen Lain</span>
        <input v-model.number="form.otherCommitments" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Batas Cicilan Aman</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(maxInstallment) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Sisa untuk Pinjaman</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ formatRupiah(availableForLoan) }}</p>
      </div>
    </div>
  </div>
</template>
