<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatRupiah } from '@/utils/currency';

const form = reactive({
  monthlyExpense: 5000000,
  status: 'single', // 'single' | 'married' | 'kids'
});

const multiplier = computed(() => {
  switch (form.status) {
    case 'single': return 6;
    case 'married': return 9;
    case 'kids': return 12;
    default: return 6;
  }
});

const targetFund = computed(() => form.monthlyExpense * multiplier.value);
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-sm text-slate-300">Pengeluaran Bulanan</span>
        <input v-model.number="form.monthlyExpense" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
      </label>
      <label class="block">
        <span class="text-sm text-slate-300">Status Kehidupan</span>
        <select v-model="form.status" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none appearance-none">
          <option value="single" class="bg-slate-900 text-white">Single (Lajang)</option>
          <option value="married" class="bg-slate-900 text-white">Menikah (Tanpa Anak)</option>
          <option value="kids" class="bg-slate-900 text-white">Menikah (Dengan Anak)</option>
        </select>
      </label>
    </div>

    <div class="mt-8 grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Rekomendasi (Bulan)</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ multiplier }} Bulan Pengeluaran</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Target Dana Darurat</p>
        <p class="mt-2 text-2xl font-bold text-brand-300">{{ formatRupiah(targetFund) }}</p>
      </div>
    </div>

    <div class="mt-6 rounded-xl bg-slate-800/40 p-4 text-sm text-slate-400 leading-relaxed">
      <p><strong>Kenapa jumlahnya berbeda?</strong></p>
      <ul class="mt-2 list-inside list-disc space-y-1">
        <li><strong>Single:</strong> Cukup 3-6 bulan pengeluaran karena risiko tanggungan lebih rendah.</li>
        <li><strong>Menikah:</strong> Disarankan 6-9 bulan untuk menjaga stabilitas keluarga.</li>
        <li><strong>Anak:</strong> Minimal 9-12 bulan karena kebutuhan darurat anak biasanya lebih mendesak.</li>
      </ul>
    </div>
  </div>
</template>
