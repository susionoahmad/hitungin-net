<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { formatRupiah } from '@/utils/currency';
import { detectLocaleFromPath } from '@/utils/locale';

type Row = { month: string; income: number; expense: number };
type ForecastRow = Row & { balance: number; netCash: number };

const route = useRoute();
const isEn = computed(() => detectLocaleFromPath(route.path) === 'en');
const defaultOpeningCash = 10000000;
const defaultRowsEn: Row[] = [
  { month: 'Month 1', income: 15000000, expense: 12000000 },
  { month: 'Month 2', income: 18000000, expense: 14000000 },
  { month: 'Month 3', income: 16000000, expense: 17000000 },
];
const defaultRowsId: Row[] = [
  { month: 'Bulan 1', income: 15000000, expense: 12000000 },
  { month: 'Bulan 2', income: 18000000, expense: 14000000 },
  { month: 'Bulan 3', income: 16000000, expense: 17000000 },
];

const ui = computed(() =>
  isEn.value
    ? {
        openingCash: 'Opening Cash',
        month: 'Month',
        income: 'Cash In',
        expense: 'Cash Out',
        netCash: 'Net Cash Flow',
        balance: 'Ending Balance',
        addPeriod: 'Add Period',
        resetSample: 'Reset Sample',
        exportCsv: 'Export CSV',
        remove: 'Remove',
        summary: 'Forecast Summary',
        periods: 'Periods',
        finalBalance: 'Final Balance',
        negativePeriods: 'Negative Balance Periods',
      }
    : {
        openingCash: 'Saldo Awal',
        month: 'Bulan',
        income: 'Pemasukan',
        expense: 'Pengeluaran',
        netCash: 'Arus Kas Bersih',
        balance: 'Saldo',
        addPeriod: 'Tambah Periode',
        resetSample: 'Reset Sampel',
        exportCsv: 'Ekspor CSV',
        remove: 'Hapus',
        summary: 'Ringkasan Forecast',
        periods: 'Jumlah Periode',
        finalBalance: 'Saldo Akhir',
        negativePeriods: 'Periode Saldo Minus',
      },
);

const form = reactive({
  openingCash: defaultOpeningCash,
  rows: [...defaultRowsId] as Row[],
});

const forecast = computed<ForecastRow[]>(() => {
  let balance = form.openingCash;
  return form.rows.map((row) => {
    const netCash = row.income - row.expense;
    balance += netCash;
    return { ...row, netCash, balance };
  });
});

const negativePeriods = computed(() => forecast.value.filter((row) => row.balance < 0).length);
const finalBalance = computed(() =>
  forecast.value.length ? forecast.value[forecast.value.length - 1].balance : form.openingCash,
);

function addRow() {
  form.rows.push({
    month: isEn.value ? `Month ${form.rows.length + 1}` : `Bulan ${form.rows.length + 1}`,
    income: 0,
    expense: 0,
  });
}

function removeRow(index: number) {
  if (form.rows.length === 1) return;
  form.rows.splice(index, 1);
}

function resetSample() {
  form.openingCash = defaultOpeningCash;
  const sample = isEn.value ? defaultRowsEn : defaultRowsId;
  form.rows.splice(0, form.rows.length, ...sample.map((row) => ({ ...row })));
}

function exportCsv() {
  const headers = [ui.value.month, ui.value.income, ui.value.expense, ui.value.netCash, ui.value.balance];
  const rows = forecast.value.map((row) => [
    row.month,
    String(row.income),
    String(row.expense),
    String(row.netCash),
    String(row.balance),
  ]);

  const csv = [headers, ...rows]
    .map((line) =>
      line
        .map((cell) => {
          const escaped = cell.replace(/"/g, '""');
          return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
        })
        .join(','),
    )
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = isEn.value ? 'cash-flow-forecast.csv' : 'forecast-arus-kas.csv';
  link.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <label class="block max-w-sm">
      <span class="text-sm text-slate-300">{{ ui.openingCash }}</span>
      <input v-model.number="form.openingCash" type="number" min="0" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none" />
    </label>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <button
        type="button"
        class="w-full rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-400 sm:w-auto"
        @click="addRow"
      >
        {{ ui.addPeriod }}
      </button>
      <button
        type="button"
        class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 sm:w-auto"
        @click="resetSample"
      >
        {{ ui.resetSample }}
      </button>
      <button
        type="button"
        class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 sm:w-auto"
        @click="exportCsv"
      >
        {{ ui.exportCsv }}
      </button>
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-3">
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ ui.periods }}</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ form.rows.length }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ ui.finalBalance }}</p>
        <p class="mt-2 text-2xl font-bold text-white">{{ formatRupiah(finalBalance) }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ ui.negativePeriods }}</p>
        <p :class="['mt-2 text-2xl font-bold', negativePeriods > 0 ? 'text-red-300' : 'text-emerald-300']">
          {{ negativePeriods }}
        </p>
      </div>
    </div>

    <div class="mt-6 space-y-4 md:hidden">
      <div
        v-for="(row, index) in forecast"
        :key="`${row.month}-${index}-mobile`"
        class="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
      >
        <div class="grid gap-3">
          <label class="block">
            <span class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ ui.month }}</span>
            <input
              v-model="form.rows[index].month"
              type="text"
              class="mt-2 w-full rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none"
            />
          </label>
          <div class="grid grid-cols-2 gap-3">
            <label class="block">
              <span class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ ui.income }}</span>
              <input
                v-model.number="form.rows[index].income"
                type="number"
                min="0"
                class="mt-2 w-full rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none"
              />
            </label>
            <label class="block">
              <span class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ ui.expense }}</span>
              <input
                v-model.number="form.rows[index].expense"
                type="number"
                min="0"
                class="mt-2 w-full rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none"
              />
            </label>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-lg border border-white/10 bg-slate-900/50 p-3">
              <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ ui.netCash }}</p>
              <p :class="['mt-2 text-sm font-semibold', row.netCash < 0 ? 'text-red-300' : 'text-emerald-300']">
                {{ formatRupiah(row.netCash) }}
              </p>
            </div>
            <div class="rounded-lg border border-white/10 bg-slate-900/50 p-3">
              <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ ui.balance }}</p>
              <p :class="['mt-2 text-sm font-semibold', row.balance < 0 ? 'text-red-300' : 'text-slate-100']">
                {{ formatRupiah(row.balance) }}
              </p>
            </div>
          </div>
          <button
            type="button"
            class="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 hover:bg-red-500/20"
            @click="removeRow(index)"
          >
            {{ ui.remove }}
          </button>
        </div>
      </div>
    </div>

    <div class="mt-6 hidden overflow-x-auto rounded-2xl border border-white/10 md:block">
      <table class="min-w-full divide-y divide-white/10 text-sm">
        <thead class="bg-slate-900/80 text-slate-300">
          <tr>
            <th class="px-4 py-3 text-left font-semibold">{{ ui.month }}</th>
            <th class="px-4 py-3 text-left font-semibold">{{ ui.income }}</th>
            <th class="px-4 py-3 text-left font-semibold">{{ ui.expense }}</th>
            <th class="px-4 py-3 text-left font-semibold">{{ ui.netCash }}</th>
            <th class="px-4 py-3 text-left font-semibold">{{ ui.balance }}</th>
            <th class="px-4 py-3 text-left font-semibold">#</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/10 bg-slate-950/60">
          <tr v-for="(row, index) in forecast" :key="`${row.month}-${index}`">
            <td class="px-4 py-3 text-slate-200">
              <input
                v-model="form.rows[index].month"
                type="text"
                class="w-36 rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none"
              />
            </td>
            <td class="px-4 py-3 text-slate-200">
              <input
                v-model.number="form.rows[index].income"
                type="number"
                min="0"
                class="w-40 rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none"
              />
            </td>
            <td class="px-4 py-3 text-slate-200">
              <input
                v-model.number="form.rows[index].expense"
                type="number"
                min="0"
                class="w-40 rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none"
              />
            </td>
            <td :class="['px-4 py-3 font-semibold', row.netCash < 0 ? 'text-red-300' : 'text-emerald-300']">
              {{ formatRupiah(row.netCash) }}
            </td>
            <td :class="['px-4 py-3 font-semibold', row.balance < 0 ? 'text-red-300' : 'text-slate-100']">
              {{ formatRupiah(row.balance) }}
            </td>
            <td class="px-4 py-3">
              <button
                type="button"
                class="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 hover:bg-red-500/20"
                @click="removeRow(index)"
              >
                {{ ui.remove }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
