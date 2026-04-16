<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import jsPDF from 'jspdf';
import { formatRupiah } from '@/utils/currency';
import { detectLocaleFromPath } from '@/utils/locale';

type InvoiceItem = {
  name: string;
  qty: number;
  price: number;
};

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));
const isEn = computed(() => locale.value === 'en');

const ui = computed(() => (isEn.value
  ? {
      customerName: 'Customer Name',
      customerPlaceholder: 'Customer name',
      invoiceNumber: 'Invoice Number',
      taxRate: 'VAT (%)',
      addItem: 'Add Item',
      exportPdf: 'Export PDF',
      summary: 'Summary',
      subtotal: 'Subtotal',
      tax: 'VAT',
      total: 'Total',
      note: 'This invoice supports a simple workflow: add items, calculate automatically, then export to PDF.',
      itemPlaceholder: 'Item name',
      qtyPlaceholder: 'Qty',
      pricePlaceholder: 'Price',
      remove: 'Remove',
      defaultItemName: 'Service / Product 1',
      pdfTitle: 'Invoice',
      pdfNumber: 'Number',
      pdfCustomer: 'Customer',
      pdfDate: 'Date',
      pdfItem: 'Item',
      pdfPrice: 'Price',
      pdfSubtotal: 'Subtotal',
      pdfTotal: 'Total',
      fileSuffix: 'invoice',
    }
  : {
      customerName: 'Nama Customer',
      customerPlaceholder: 'Nama customer',
      invoiceNumber: 'Nomor Invoice',
      taxRate: 'PPN (%)',
      addItem: 'Tambah Item',
      exportPdf: 'Export PDF',
      summary: 'Ringkasan',
      subtotal: 'Subtotal',
      tax: 'PPN',
      total: 'Total',
      note: 'Invoice ini mendukung alur kerja bisnis yang sederhana: isi item, hitung otomatis, lalu ekspor ke PDF.',
      itemPlaceholder: 'Nama item',
      qtyPlaceholder: 'Qty',
      pricePlaceholder: 'Harga',
      remove: 'Hapus',
      defaultItemName: 'Layanan / Produk 1',
      pdfTitle: 'Invoice',
      pdfNumber: 'Nomor',
      pdfCustomer: 'Customer',
      pdfDate: 'Tanggal',
      pdfItem: 'Item',
      pdfPrice: 'Harga',
      pdfSubtotal: 'Subtotal',
      pdfTotal: 'Total',
      fileSuffix: 'invoice',
    }));

const invoiceNumber = `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(
  1000 + Math.random() * 9000
)}`;

const form = reactive({
  invoiceNumber,
  customerName: '',
  taxRate: 11,
  items: [
    { name: ui.value.defaultItemName, qty: 1, price: 150000 },
  ] as InvoiceItem[],
});

const subtotal = computed(() =>
  form.items.reduce((total, item) => total + Math.max(0, item.qty) * Math.max(0, item.price), 0),
);
const taxAmount = computed(() => subtotal.value * (Math.max(0, form.taxRate) / 100));
const total = computed(() => subtotal.value + taxAmount.value);

function addItem() {
  form.items.push({ name: ui.value.defaultItemName, qty: 1, price: 0 });
}

function removeItem(index: number) {
  if (form.items.length === 1) return;
  form.items.splice(index, 1);
}

function exportPdf() {
  const pdf = new jsPDF();
  pdf.setFontSize(18);
  pdf.text(ui.value.pdfTitle, 14, 18);
  pdf.setFontSize(11);
  pdf.text(`${ui.value.pdfNumber}: ${form.invoiceNumber}`, 14, 28);
  pdf.text(`${ui.value.pdfCustomer}: ${form.customerName || '-'}`, 14, 35);
  pdf.text(`${ui.value.pdfDate}: ${new Date().toLocaleDateString(isEn.value ? 'en-US' : 'id-ID')}`, 14, 42);

  let y = 54;
  pdf.setFontSize(10);
  pdf.text(ui.value.pdfItem, 14, y);
  pdf.text('Qty', 90, y);
  pdf.text(ui.value.pdfPrice, 110, y);
  pdf.text(ui.value.pdfSubtotal, 160, y);
  y += 6;

  form.items.forEach((item) => {
    const lineSubtotal = Math.max(0, item.qty) * Math.max(0, item.price);
    pdf.text(item.name || '-', 14, y);
    pdf.text(String(Math.max(0, item.qty)), 92, y);
    pdf.text(formatRupiah(item.price), 110, y);
    pdf.text(formatRupiah(lineSubtotal), 160, y);
    y += 7;
  });

  y += 5;
  pdf.text(`${ui.value.pdfSubtotal}: ${formatRupiah(subtotal.value)}`, 14, y);
  y += 7;
  pdf.text(`${ui.value.tax} (${form.taxRate}%): ${formatRupiah(taxAmount.value)}`, 14, y);
  y += 7;
  pdf.setFontSize(12);
  pdf.text(`${ui.value.pdfTotal}: ${formatRupiah(total.value)}`, 14, y);
  pdf.save(`${form.invoiceNumber}-${ui.value.fileSuffix}.pdf`);
}
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(260px,0.7fr)]">
      <div class="min-w-0">
        <div class="grid gap-4 md:grid-cols-2">
          <label class="block">
            <span class="text-sm text-slate-300">{{ ui.customerName }}</span>
            <input v-model="form.customerName" type="text" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-brand-400" :placeholder="ui.customerPlaceholder" />
          </label>
          <label class="block">
            <span class="text-sm text-slate-300">{{ ui.invoiceNumber }}</span>
            <input v-model="form.invoiceNumber" type="text" class="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-brand-400" />
          </label>
        </div>

        <div class="mt-4 flex flex-wrap items-end gap-4">
          <label class="block">
            <span class="text-sm text-slate-300">{{ ui.taxRate }}</span>
            <input v-model.number="form.taxRate" type="number" min="0" step="0.1" class="mt-2 w-32 rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-brand-400" />
          </label>
          <button type="button" class="rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-400" @click="addItem">
            {{ ui.addItem }}
          </button>
          <button type="button" class="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10" @click="exportPdf">
            {{ ui.exportPdf }}
          </button>
        </div>

        <div class="mt-6 space-y-4">
          <div v-for="(item, index) in form.items" :key="index" class="grid gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1.4fr)_110px_minmax(0,0.7fr)_auto]">
            <input v-model="item.name" type="text" class="min-w-0 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none" :placeholder="ui.itemPlaceholder" />
            <input v-model.number="item.qty" type="number" min="1" class="min-w-0 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none" :placeholder="ui.qtyPlaceholder" />
            <input v-model.number="item.price" type="number" min="0" class="min-w-0 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none md:col-span-2 xl:col-span-1" :placeholder="ui.pricePlaceholder" />
            <button type="button" class="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 hover:bg-red-500/20 md:col-span-2 xl:col-span-1" @click="removeItem(index)">
              {{ ui.remove }}
            </button>
          </div>
        </div>
      </div>

      <aside class="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{{ ui.summary }}</p>
        <div class="mt-5 space-y-3 text-sm">
          <div class="flex items-center justify-between gap-4">
            <span class="text-slate-400">{{ ui.subtotal }}</span>
            <span class="font-semibold text-white">{{ formatRupiah(subtotal) }}</span>
          </div>
          <div class="flex items-center justify-between gap-4">
            <span class="text-slate-400">{{ ui.tax }}</span>
            <span class="font-semibold text-white">{{ formatRupiah(taxAmount) }}</span>
          </div>
          <div class="flex items-center justify-between gap-4 border-t border-white/10 pt-3 text-base">
            <span class="font-semibold text-white">{{ ui.total }}</span>
            <span class="font-bold text-brand-300">{{ formatRupiah(total) }}</span>
          </div>
        </div>
        <div class="mt-6 rounded-2xl bg-brand-500/10 p-4 text-sm leading-7 text-brand-100">
          {{ ui.note }}
        </div>
      </aside>
    </div>
  </div>
</template>
