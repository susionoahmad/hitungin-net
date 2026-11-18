export const siteBrand = 'Kalkulatorin';
export const siteName = 'Kalkulatorin — Kalkulator Bisnis & Keuangan Indonesia';
export const siteDescription =
  'Kumpulan kalkulator bisnis, pajak, dan keuangan pribadi Indonesia yang akurat dan gratis: invoice PDF, PPh 21, PPN 11%, cicilan pinjaman, margin, BEP, zakat, hingga dana darurat.';
export const siteUrl = (
  import.meta.env.VITE_SITE_URL ||
  (typeof window !== 'undefined' ? window.location.origin : 'https://kalkulatorin.com')
).replace(/\/+$/, '');
