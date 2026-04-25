export function formatRupiah(value: number): string {
  const normalized = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(normalized);
}

export function parseNumberInput(value: string): number {
  const cleaned = value.replace(/[^0-9,-]/g, '').replace(/\./g, '').replace(',', '.');
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}
