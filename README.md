# Tools Bisnis & Keuangan Indonesia

Vue 3 + TypeScript + TailwindCSS web app untuk tool bisnis dan keuangan Indonesia.

## Struktur inti

- `src/data/tools.ts` - konfigurasi semua tool
- `src/router/index.ts` - routing otomatis dari konfigurasi
- `src/pages` - halaman home, detail tool, dan legal page
- `src/components/tools` - komponen UI setiap tool
- `src/components/ads` - placeholder iklan AdSense
- `src/components/layout` - header, footer, layout utama
- `src/utils` - format rupiah, SEO, dan matematika

## Jalankan

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Catatan deploy

- Set `VITE_SITE_URL` di root `.env.production` atau `.env.local` untuk canonical URL produksi.
- Ganti placeholder iklan dengan unit AdSense nyata saat siap tayang.
- Tambahkan tool baru cukup lewat `src/data/tools.ts`.

## Deploy GitHub -> Vercel

1. Push project ke GitHub.
2. Import repository ke Vercel.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Tambahkan environment variable di Vercel Project Settings:
   - `VITE_SITE_URL=https://domain-anda.com`
   - `VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX`
   - `VITE_GSC_VERIFICATION_TOKEN=...` (kode dari meta tag verifikasi Google Search Console)
6. Deploy.

Catatan:
- Project sudah memakai `vercel.json` rewrite ke `index.html` agar route SPA seperti `/en/loan-calculator` tidak 404 saat direct open/refresh.
- `sitemap.xml` dan `robots.txt` digenerate saat build melalui `scripts/generate-seo.mjs`, sehingga URL di dalam sitemap akan mengikuti `VITE_SITE_URL`.
- GA4 akan otomatis kirim page view setiap perpindahan route (SPA tracking).
