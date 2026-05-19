export function formatCurrency(value: number, currencyCode: string = 'IDR'): string {
  const normalized = Number.isFinite(value) ? value : 0;
  const upperCode = (currencyCode || 'IDR').toUpperCase();

  let locale = 'id-ID';
  if (upperCode === 'USD') locale = 'en-US';
  else if (upperCode === 'SGD') locale = 'en-SG';
  else if (upperCode === 'EUR') locale = 'de-DE';
  else if (upperCode === 'GBP') locale = 'en-GB';
  else if (upperCode === 'JPY') locale = 'ja-JP';

  const hasDecimals = upperCode !== 'IDR' && upperCode !== 'JPY';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: upperCode,
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  }).format(normalized);
}

export function formatRupiah(value: number): string {
  return formatCurrency(value, 'IDR');
}

export function parseNumberInput(value: string): number {
  const cleaned = value.replace(/[^0-9,-]/g, '').replace(/\./g, '').replace(',', '.');
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}
