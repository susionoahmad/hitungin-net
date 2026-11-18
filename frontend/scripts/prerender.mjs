import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tools } from '../src/data/tools.ts';
import { toolGuides } from '../src/data/toolGuides.ts';
import { guides } from '../src/data/guides.ts';
import { glossaryTerms } from '../src/data/glossary.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const siteUrl = 'https://kalkulatorin.com';
const siteBrand = 'Kalkulatorin';
const siteName = 'Kalkulatorin — Kalkulator Bisnis & Keuangan Indonesia';

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderShell({ h1, eyebrow, intro, bodyHtml }) {
  return `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <header class="border-b border-slate-200 bg-white/90 dark:border-white/10 dark:bg-slate-950/90 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          <a href="/" class="flex items-center gap-3">
            <div class="h-10 w-10 bg-blue-500/15 rounded-2xl grid place-items-center text-blue-700 dark:text-blue-200 font-bold text-base">K</div>
            <div>
              <span class="block text-xs uppercase tracking-[0.2em] font-semibold text-blue-600 dark:text-blue-300">${siteBrand}</span>
              <span class="block text-sm font-semibold">Kalkulator Bisnis &amp; Keuangan</span>
            </div>
          </a>
          <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="/">Beranda</a>
            <a href="/tools">Semua Kalkulator</a>
            <a href="/panduan">Panduan</a>
            <a href="/glossary">Kamus Finansial</a>
            <a href="/about">Tentang Kami</a>
          </nav>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="max-w-4xl">
          ${eyebrow ? `<p class="text-xs uppercase tracking-[0.25em] font-semibold text-blue-600 dark:text-blue-300">${escapeHtml(eyebrow)}</p>` : ''}
          <h1 class="text-4xl font-bold mt-2 text-slate-950 dark:text-white leading-tight">${escapeHtml(h1)}</h1>
          ${intro ? `<p class="mt-4 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">${escapeHtml(intro)}</p>` : ''}
          <div class="mt-8">${bodyHtml}</div>
        </div>
      </main>

      <footer class="border-t border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950 mt-16 py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3 text-sm text-slate-600 dark:text-slate-400">
          <div>
            <p class="font-bold text-slate-900 dark:text-white mb-2">${siteBrand}</p>
            <p>Platform kalkulator bisnis, pajak, dan keuangan Indonesia yang akurat, gratis, dan dilengkapi panduan praktis.</p>
          </div>
          <div>
            <p class="font-bold text-slate-900 dark:text-white mb-2">Direktori</p>
            <ul class="space-y-1.5">
              <li><a href="/tools">Semua Kalkulator (${tools.length})</a></li>
              <li><a href="/panduan">Panduan Keuangan (${guides.length})</a></li>
              <li><a href="/glossary">Kamus Finansial</a></li>
              <li><a href="/sitemap">Peta Situs</a></li>
            </ul>
          </div>
          <div>
            <p class="font-bold text-slate-900 dark:text-white mb-2">Informasi &amp; Legalitas</p>
            <ul class="space-y-1.5">
              <li><a href="/about">Tentang Kami</a></li>
              <li><a href="/contact">Kontak</a></li>
              <li><a href="/privacy-policy">Kebijakan Privasi</a></li>
              <li><a href="/terms-of-service">Ketentuan Layanan</a></li>
              <li><a href="/disclaimer">Disclaimer</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  `;
}

function buildHtml(template, { routePath, title, description, type = 'website', robots = 'index, follow', schema, contentHtml }) {
  const canonicalUrl = `${siteUrl}${routePath === '/' ? '' : routePath}`;
  const ogImage = `${siteUrl}/og-image.svg`;

  const headInject = `
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="${siteBrand}" />
    <meta property="og:locale" content="id_ID" />
    <meta property="og:image" content="${ogImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${ogImage}" />
    ${schema ? `<script id="page-jsonld" type="application/ld+json">${JSON.stringify(schema)}</script>` : ''}
  `;

  let output = template.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  output = output.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  );
  output = output.replace('</head>', `${headInject}\n  </head>`);
  if (contentHtml) {
    output = output.replace(/<div\s+id="app"\s*><\/div>/i, `<div id="app">${contentHtml}</div>`);
  }
  return output;
}

async function writeRouteHtml(distDir, routePath, html) {
  if (routePath === '/') {
    await writeFile(resolve(distDir, 'index.html'), html, 'utf8');
    return;
  }
  const clean = routePath.replace(/^\/+/, '');
  const targetFile = resolve(distDir, `${clean}.html`);
  await mkdir(dirname(targetFile), { recursive: true });
  await writeFile(targetFile, html, 'utf8');
}

function buildStaticPages() {
  const toolLinksHtml = `<ul class="grid gap-3 md:grid-cols-2">${tools
    .map(
      (t) =>
        `<li><a href="/${t.slug}" class="font-semibold text-blue-600">${escapeHtml(t.title)}</a> — ${escapeHtml(t.description)}</li>`,
    )
    .join('')}</ul>`;

  const guideLinksHtml = `<ul class="space-y-4">${guides
    .map(
      (g) =>
        `<li><h2><a href="/panduan/${g.slug}" class="font-bold">${escapeHtml(g.title)}</a></h2><p>${escapeHtml(g.summary)}</p></li>`,
    )
    .join('')}</ul>`;

  const glossaryHtml = `<div class="space-y-4">${glossaryTerms
    .map(
      (term) =>
        `<article><h2>${escapeHtml(term.term.id)}</h2><p>${escapeHtml(term.definition.id)}</p>${
          term.relatedToolSlug ? `<p><a href="/${term.relatedToolSlug}">Buka kalkulator terkait</a></p>` : ''
        }</article>`,
    )
    .join('')}</div>`;

  return [
    {
      path: '/',
      title: siteName,
      description:
        'Kumpulan kalkulator bisnis, pajak, dan keuangan pribadi Indonesia yang akurat dan gratis: invoice PDF, PPh 21, PPN 11%, cicilan pinjaman, margin, BEP, zakat, hingga dana darurat.',
      eyebrow: `${siteBrand} · ${tools.length} Kalkulator Gratis`,
      h1: 'Kalkulator bisnis, pajak, dan keuangan Indonesia yang cepat dan akurat.',
      intro:
        'Hitung invoice PDF, PPh 21, PPN 11%, simulasi cicilan pinjaman, margin keuntungan, titik impas (BEP), pesangon, hingga zakat langsung dari browser Anda — lengkap dengan rumus dan contoh perhitungan Rupiah.',
      bodyHtml: `
        <section class="prose-like space-y-6">
          <h2>Kalkulator Populer</h2>
          ${toolLinksHtml}
          <h2>Panduan Praktis Bisnis, Pajak &amp; Keuangan</h2>
          ${guideLinksHtml}
        </section>
      `,
      schema: [
        { '@context': 'https://schema.org', '@type': 'WebSite', name: siteBrand, alternateName: siteName, url: siteUrl, inLanguage: 'id-ID' },
        { '@context': 'https://schema.org', '@type': 'Organization', name: siteBrand, url: siteUrl, email: 'hello@kalkulatorin.com' },
      ],
    },
    {
      path: '/tools',
      title: `Semua Kalkulator Bisnis & Keuangan (${tools.length} Alat) | ${siteBrand}`,
      description: `Daftar lengkap ${tools.length} kalkulator bisnis, pajak, kredit, margin, invoice, dan keuangan pribadi Indonesia yang gratis dan siap pakai.`,
      eyebrow: 'Direktori Kalkulator',
      h1: `Semua Kalkulator Bisnis & Keuangan (${tools.length})`,
      intro: 'Pilih kalkulator bisnis, pajak, kredit, ritel, maupun keuangan pribadi yang Anda butuhkan. Setiap alat dilengkapi rumus dan contoh perhitungan Rupiah.',
      bodyHtml: toolLinksHtml,
    },
    {
      path: '/panduan',
      title: `Panduan Bisnis, Pajak & Keuangan Indonesia | ${siteBrand}`,
      description: 'Kumpulan panduan praktis bisnis, pajak, dan keuangan pribadi Indonesia lengkap dengan rumus, tabel simulasi Rupiah, dan kalkulator terkait.',
      eyebrow: 'Edukasi Finansial & Bisnis',
      h1: 'Panduan Bisnis, Pajak & Keuangan',
      intro: 'Pelajari rumus, contoh kasus nyata dalam Rupiah, serta tips praktis mengelola harga jual, pajak Indonesia, kredit, hingga keuangan keluarga.',
      bodyHtml: guideLinksHtml,
    },
    {
      path: '/glossary',
      title: `Kamus Istilah Finansial & Bisnis | ${siteBrand}`,
      description: 'Kamus dan panduan lengkap istilah keuangan, pajak, investasi, kredit, dan bisnis di Indonesia yang dilengkapi kalkulator praktis.',
      eyebrow: 'Direktori Edukasi',
      h1: 'Kamus Istilah Finansial & Bisnis',
      intro: 'Temukan definisi ringkas dan penerapan praktis istilah keuangan seperti PPh 21, PPN 11%, PTKP, BEP, Amortisasi, Margin, Markup, hingga Zakat.',
      bodyHtml: glossaryHtml,
    },
    {
      path: '/kalkulator-bisnis-keuangan-online',
      title: `Panduan Memilih Kalkulator Bisnis & Keuangan Sesuai Profesi | ${siteBrand}`,
      description: 'Temukan alur kalkulator bisnis dan keuangan yang tepat untuk pemilik UMKM, penjual online, freelancer, tim HR, hingga perencanaan keuangan keluarga.',
      eyebrow: 'Panduan Alur Perhitungan',
      h1: 'Panduan Memilih Kalkulator Bisnis & Keuangan Sesuai Kebutuhan Anda',
      intro: `Urutan penggunaan ${tools.length} kalkulator di ${siteBrand} berdasarkan profil pengguna: UMKM & Toko Online, Freelancer B2B, Karyawan & HRD, serta Keuangan Keluarga.`,
      bodyHtml: `
        <div class="prose-like space-y-4">
          <h2>1. Pemilik UMKM &amp; Toko Online</h2>
          <p>Mulai dari <a href="/unit-cost-calculator">Unit Cost Calculator</a>, <a href="/kalkulator-margin">Kalkulator Margin</a>, <a href="/shipping-margin-calculator">Shipping Margin</a>, <a href="/break-even-point">Break-Even Point</a>, hingga <a href="/stock-reorder-point-calculator">Reorder Point Stok</a>.</p>
          <h2>2. Freelancer, Agency &amp; Konsultan B2B</h2>
          <p>Gunakan <a href="/invoice-generator">Invoice Generator PDF</a>, <a href="/vat-reverse-calculator">VAT Reverse Calculator</a>, <a href="/invoice-due-date-calculator">Invoice Due Date</a>, dan <a href="/cash-flow-forecast">Cash Flow Forecast</a>.</p>
          <h2>3. Karyawan &amp; Tim HRD</h2>
          <p>Simulasikan <a href="/kalkulator-pph-21">Kalkulator PPh 21</a>, <a href="/salary-take-home-calculator">Gaji Bersih (Take-Home Pay)</a>, <a href="/kalkulator-thr">Kalkulator THR</a>, dan <a href="/kalkulator-pesangon">Kalkulator Pesangon</a>.</p>
          <h2>4. Perencanaan Keuangan Keluarga</h2>
          <p>Rencanakan <a href="/kalkulator-dana-darurat">Dana Darurat</a>, <a href="/loan-affordability-calculator">Kemampuan Cicilan</a>, <a href="/loan-calculator">Simulasi Pinjaman</a>, <a href="/kalkulator-dana-pendidikan">Dana Pendidikan</a>, dan <a href="/kalkulator-zakat">Kalkulator Zakat</a>.</p>
        </div>
      `,
    },
    {
      path: '/about',
      title: `Tentang ${siteBrand} & Standar Editorial`,
      description: `Pelajari misi, metodologi perhitungan, standar editorial, dan referensi regulasi Indonesia di balik platform ${siteBrand}.`,
      eyebrow: 'Tentang Kami',
      h1: `Tentang ${siteBrand}`,
      intro: `${siteBrand} (kalkulatorin.com) adalah platform kalkulator bisnis, perpajakan, dan keuangan pribadi asal Indonesia yang gratis, cepat, dan transparan.`,
      bodyHtml: `
        <div class="prose-like space-y-4">
          <p>${siteBrand} menyediakan ${tools.length} kalkulator gratis dan ${guides.length} panduan mendalam yang dirancang untuk membantu pelaku UMKM, freelancer, praktisi HR, serta keluarga mengambil keputusan finansial yang lebih terukur.</p>
          <h2>Standar Editorial &amp; Verifikasi Rumus</h2>
          <p>Setiap kalkulator disusun berdasarkan prinsip akuntansi standar dan referensi peraturan resmi di Indonesia, antara lain UU Harmonisasi Peraturan Perpajakan (UU HPP No. 7 Tahun 2021), ketentuan PTKP DJP, UU Cipta Kerja &amp; PP No. 35 Tahun 2021 tentang ketenagakerjaan, Permenaker No. 6 Tahun 2016 tentang THR, serta pedoman zakat BAZNAS.</p>
          <h2>Privasi &amp; Transparansi</h2>
          <p>Input perhitungan kalkulator diproses langsung di sisi browser pengguna. Untuk menjaga layanan tetap gratis, situs ini dapat menayangkan iklan Google AdSense tanpa memengaruhi independensi dan akurasi rumus kami.</p>
        </div>
      `,
    },
    {
      path: '/contact',
      title: `Hubungi Kami | ${siteBrand}`,
      description: `Hubungi tim ${siteBrand} untuk laporan koreksi rumus, usulan kalkulator baru, atau kerja sama.`,
      eyebrow: 'Kontak',
      h1: 'Hubungi Kami',
      intro: 'Punya masukan koreksi rumus, pembaruan regulasi, atau usulan kalkulator baru? Hubungi tim kami melalui email resmi.',
      bodyHtml: `
        <div class="prose-like space-y-4">
          <p>Anda dapat menghubungi tim ${siteBrand} secara langsung melalui email <a href="mailto:hello@kalkulatorin.com">hello@kalkulatorin.com</a> pada jam operasional Senin – Jumat, pukul 09.00 – 17.00 WIB.</p>
          <p>Jika melaporkan ketidaksesuaian angka kalkulasi, mohon cantumkan nama kalkulator, angka input yang dimasukkan, serta referensi pembanding agar kami dapat segera meninjau dan memperbaikinya.</p>
        </div>
      `,
    },
    {
      path: '/privacy-policy',
      title: `Kebijakan Privasi | ${siteBrand}`,
      description: `Kebijakan privasi penggunaan situs ${siteName}, termasuk privasi input kalkulator, cookie analitik, dan Google AdSense.`,
      eyebrow: 'Legalitas',
      h1: 'Kebijakan Privasi',
      intro: `Kebijakan Privasi ini menjelaskan cara ${siteBrand} (kalkulatorin.com) mengelola privasi input pengguna, cookie, analitik, dan iklan.`,
      bodyHtml: `
        <div class="prose-like space-y-4">
          <h2>1. Privasi Input Kalkulator</h2>
          <p>Data angka yang Anda masukkan ke dalam kalkulator diproses secara lokal di browser perangkat Anda dan tidak disimpan di server kami, kecuali fitur penyimpanan akun yang Anda aktifkan secara eksplisit.</p>
          <h2>2. Analitik &amp; Cookie Iklan Google AdSense</h2>
          <p>Situs ini menggunakan Google Analytics untuk memahami pola penggunaan secara agregat dan Google AdSense untuk menayangkan iklan. Google beserta mitranya dapat menggunakan cookie untuk menayangkan iklan yang relevan. Anda dapat mengelola preferensi iklan di Setelan Iklan Google.</p>
          <h2>3. Keamanan &amp; Kontak</h2>
          <p>Kami tidak menjual atau memperdagangkan informasi pribadi pengunjung kepada pihak ketiga. Untuk pertanyaan mengenai privasi, hubungi <a href="mailto:hello@kalkulatorin.com">hello@kalkulatorin.com</a>.</p>
        </div>
      `,
    },
    {
      path: '/terms-of-service',
      title: `Ketentuan Layanan | ${siteBrand}`,
      description: `Ketentuan dan syarat penggunaan kalkulator serta konten pada ${siteName}.`,
      eyebrow: 'Legalitas',
      h1: 'Ketentuan Layanan',
      intro: `Syarat dan ketentuan penggunaan seluruh kalkulator, panduan, dan fitur pada ${siteBrand}.`,
      bodyHtml: `
        <div class="prose-like space-y-4">
          <h2>1. Penggunaan Layanan</h2>
          <p>Seluruh kalkulator dan artikel pada ${siteBrand} disediakan untuk tujuan informasi, edukasi, dan simulasi perhitungan umum.</p>
          <h2>2. Akurasi &amp; Validasi Hasil</h2>
          <p>Kami berupaya menjaga akurasi formula sesuai regulasi terkini, namun hasil perhitungan bersifat estimasi dan dapat dipengaruhi oleh pembulatan maupun ketentuan khusus tiap kasus.</p>
          <h2>3. Batasan Tanggung Jawab</h2>
          <p>Pengelola situs tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang timbul akibat penggunaan hasil simulasi tanpa verifikasi profesional yang berwenang.</p>
        </div>
      `,
    },
    {
      path: '/disclaimer',
      title: `Disclaimer | ${siteBrand}`,
      description: `Pernyataan pengecualian tanggung jawab dan batasan penggunaan hasil simulasi pada ${siteName}.`,
      eyebrow: 'Legalitas',
      h1: 'Disclaimer',
      intro: 'Seluruh hasil perhitungan dan panduan pada Kalkulatorin bersifat simulasi edukatif dan bukan nasihat profesional.',
      bodyHtml: `
        <div class="prose-like space-y-4">
          <h2>Bukan Nasihat Keuangan, Pajak, atau Hukum Resmi</h2>
          <p>Kalkulator dan artikel pada ${siteBrand} tidak dimaksudkan sebagai pengganti nasihat resmi dari akuntan publik, konsultan pajak bersertifikat, penasihat keuangan berlisensi, maupun praktisi hukum.</p>
          <h2>Referensi Regulasi</h2>
          <p>Simulasi PPh 21, PPN 11%, zakat, pesangon, dan THR disusun berdasarkan peraturan publik yang berlaku (seperti UU HPP No. 7/2021, PP No. 35/2021, dan pedoman BAZNAS). Verifikasi kembali angka final Anda sebelum melakukan pelaporan resmi.</p>
        </div>
      `,
    },
    {
      path: '/sitemap',
      title: `Peta Situs | ${siteBrand}`,
      description: `Daftar navigasi lengkap seluruh ${tools.length} kalkulator, panduan keuangan, dan halaman informasi di ${siteBrand}.`,
      eyebrow: 'Navigasi',
      h1: 'Peta Situs Lengkap',
      intro: `Struktur navigasi seluruh ${tools.length} kalkulator, ${guides.length} artikel panduan, dan halaman resmi ${siteBrand}.`,
      bodyHtml: `
        <div class="prose-like space-y-6">
          <h2>Panduan Keuangan</h2>
          ${guideLinksHtml}
          <h2>Semua Kalkulator (${tools.length})</h2>
          ${toolLinksHtml}
        </div>
      `,
    },
  ];
}

async function prerender() {
  const distDir = resolve(__dirname, '../dist');
  let rawTemplate = '';
  try {
    rawTemplate = await readFile(resolve(distDir, 'index.html'), 'utf8');
  } catch {
    console.error('Failed to read dist/index.html. Make sure you run vite build first!');
    process.exit(1);
  }

  // 1. Save untouched SPA shell for dynamic/non-indexable routes (/en/*, /admin, /auth/*, etc.)
  const spaHtml = rawTemplate.replace(
    '</head>',
    '    <meta name="robots" content="noindex, follow" />\n  </head>',
  );
  await writeFile(resolve(distDir, 'spa.html'), spaHtml, 'utf8');

  // 2. Write real 404.html for unknown URLs (true HTTP 404 on Vercel)
  const notFoundContent = renderShell({
    eyebrow: '404',
    h1: 'Halaman tidak ditemukan',
    intro: 'Tautan yang Anda buka tidak tersedia atau alamatnya sudah berubah.',
    bodyHtml:
      '<p><a href="/" class="text-blue-600 font-semibold">Kembali ke Beranda</a> · <a href="/tools" class="text-blue-600 font-semibold">Semua Kalkulator</a> · <a href="/panduan" class="text-blue-600 font-semibold">Panduan Keuangan</a></p>',
  });
  const notFoundHtml = buildHtml(rawTemplate, {
    routePath: '/',
    title: `Halaman Tidak Ditemukan (404) | ${siteBrand}`,
    description: 'Halaman yang Anda cari tidak tersedia atau telah dipindahkan.',
    robots: 'noindex, nofollow',
    contentHtml: notFoundContent,
  });
  await writeFile(resolve(distDir, '404.html'), notFoundHtml, 'utf8');

  // 3. Prerender Static Pages (Indonesian canonical)
  const staticPages = buildStaticPages();
  for (const page of staticPages) {
    const contentHtml = renderShell({
      eyebrow: page.eyebrow,
      h1: page.h1,
      intro: page.intro,
      bodyHtml: page.bodyHtml,
    });
    const fullUrl = `${siteUrl}${page.path === '/' ? '' : page.path}`;
    const schema = page.schema || [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page.title,
        description: page.description,
        url: fullUrl,
        inLanguage: 'id-ID',
        isPartOf: { '@type': 'WebSite', name: siteName, url: siteUrl },
      },
    ];
    const html = buildHtml(rawTemplate, {
      routePath: page.path,
      title: page.title,
      description: page.description,
      schema,
      contentHtml,
    });
    await writeRouteHtml(distDir, page.path, html);
  }

  // 4. Prerender Guide Articles (/panduan/:slug)
  for (const guide of guides) {
    const routePath = `/panduan/${guide.slug}`;
    const fullUrl = `${siteUrl}${routePath}`;
    let bodyHtml = `<section class="prose-like space-y-6">`;
    bodyHtml += `<div><h2>Ringkasan Poin Penting</h2><ul>${guide.keyTakeaways.map((k) => `<li>${escapeHtml(k)}</li>`).join('')}</ul></div>`;
    for (const section of guide.sections) {
      bodyHtml += `<section><h2>${escapeHtml(section.heading)}</h2>`;
      for (const p of section.paragraphs) {
        bodyHtml += `<p>${escapeHtml(p)}</p>`;
      }
      if (section.formula) {
        bodyHtml += `<pre><code>${escapeHtml(section.formula)}</code></pre>`;
      }
      if (section.table) {
        bodyHtml += `<table><thead><tr>${section.table.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${section.table.rows
          .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`)
          .join('')}</tbody></table>`;
      }
      if (section.bullets && section.bullets.length > 0) {
        bodyHtml += `<ul>${section.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>`;
      }
      bodyHtml += `</section>`;
    }
    if (guide.faqs.length > 0) {
      bodyHtml += `<section><h2>Pertanyaan Umum (FAQ)</h2>${guide.faqs
        .map((f) => `<details><summary>${escapeHtml(f.question)}</summary><p>${escapeHtml(f.answer)}</p></details>`)
        .join('')}</section>`;
    }
    bodyHtml += `<section><h2>Kalkulator Terkait</h2><ul>${guide.relatedToolSlugs
      .map((slug) => {
        const t = tools.find((item) => item.slug === slug);
        return t ? `<li><a href="/${t.slug}">${escapeHtml(t.title)}</a> — ${escapeHtml(t.description)}</li>` : '';
      })
      .join('')}</ul></section>`;
    bodyHtml += `</section>`;

    const contentHtml = renderShell({
      eyebrow: `${guide.category} · ${guide.readTimeMinutes} menit baca`,
      h1: guide.title,
      intro: guide.summary,
      bodyHtml,
    });

    const schema = [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.description,
        url: fullUrl,
        inLanguage: 'id-ID',
        datePublished: guide.publishedAt,
        dateModified: guide.updatedAt,
        author: { '@type': 'Organization', name: `Tim Editorial ${siteBrand}`, url: `${siteUrl}/about` },
        publisher: { '@type': 'Organization', name: siteBrand, url: siteUrl },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Panduan', item: `${siteUrl}/panduan` },
          { '@type': 'ListItem', position: 3, name: guide.title, item: fullUrl },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: guide.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ];

    const html = buildHtml(rawTemplate, {
      routePath,
      title: guide.seoTitle,
      description: guide.description,
      type: 'article',
      schema,
      contentHtml,
    });
    await writeRouteHtml(distDir, routePath, html);
  }

  // 5. Prerender All 48 Tool Pages (Indonesian canonical) with full formula, worked example, tips & FAQs
  for (const tool of tools) {
    const routePath = `/${tool.slug}`;
    const fullUrl = `${siteUrl}${routePath}`;
    const extra = toolGuides[tool.slug];
    const mergedFaqs = [...tool.faqs, ...(extra?.extraFaqs ?? [])];

    let bodyHtml = `<div class="prose-like space-y-6">`;

    if (extra) {
      bodyHtml += `
        <section>
          <h2>Rumus &amp; Dasar Perhitungan ${escapeHtml(tool.title)}</h2>
          <pre><code>${escapeHtml(extra.formula)}</code></pre>
          <ul>${extra.variables.map((v) => `<li>${escapeHtml(v)}</li>`).join('')}</ul>
        </section>
        <section>
          <h2>Contoh Perhitungan Langkah demi Langkah</h2>
          <p><strong>Skenario:</strong> ${escapeHtml(extra.example.scenario)}</p>
          <ol>${extra.example.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
          <p><strong>Hasil:</strong> ${escapeHtml(extra.example.result)}</p>
        </section>
      `;
    }

    for (const section of tool.content) {
      bodyHtml += `<section><h2>${escapeHtml(section.heading)}</h2>`;
      for (const p of section.paragraphs) {
        bodyHtml += `<p>${escapeHtml(p)}</p>`;
      }
      bodyHtml += `</section>`;
    }

    if (extra) {
      bodyHtml += `
        <section>
          <h2>Tips Praktis &amp; Hal yang Perlu Diperhatikan</h2>
          <ul>${extra.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join('')}</ul>
        </section>
      `;
    }

    if (mergedFaqs.length > 0) {
      bodyHtml += `<section><h2>Pertanyaan yang Sering Ditanyakan (FAQ)</h2>${mergedFaqs
        .map((faq) => `<details><summary>${escapeHtml(faq.question)}</summary><p>${escapeHtml(faq.answer)}</p></details>`)
        .join('')}</section>`;
    }

    const relatedLinks = tool.relatedSlugs
      .map((slug) => tools.find((t) => t.slug === slug))
      .filter(Boolean);
    if (relatedLinks.length > 0) {
      bodyHtml += `<section><h2>Kalkulator Terkait</h2><ul>${relatedLinks
        .map((rel) => `<li><a href="/${rel.slug}">${escapeHtml(rel.title)}</a> — ${escapeHtml(rel.description)}</li>`)
        .join('')}</ul></section>`;
    }

    bodyHtml += `</div>`;

    const contentHtml = renderShell({
      eyebrow: tool.category,
      h1: tool.title,
      intro: tool.intro,
      bodyHtml,
    });

    const schema = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: tool.title,
        description: tool.seoDescription || tool.description,
        url: fullUrl,
        inLanguage: 'id-ID',
        isPartOf: { '@type': 'WebSite', name: siteName, url: siteUrl },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: tool.title,
        description: tool.seoDescription || tool.description,
        url: fullUrl,
        applicationCategory: 'FinanceApplication',
        applicationSubCategory: tool.category,
        operatingSystem: 'All',
        inLanguage: 'id-ID',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'IDR' },
        publisher: { '@type': 'Organization', name: siteBrand, url: siteUrl },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Semua Kalkulator', item: `${siteUrl}/tools` },
          { '@type': 'ListItem', position: 3, name: tool.title, item: fullUrl },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: mergedFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ];

    const html = buildHtml(rawTemplate, {
      routePath,
      title: tool.seoTitle || `${tool.title} | ${siteBrand}`,
      description: tool.seoDescription || tool.description,
      schema,
      contentHtml,
    });
    await writeRouteHtml(distDir, routePath, html);
  }

  console.log(
    `Prerendered ${staticPages.length} static pages, ${guides.length} guides, ${tools.length} tools, plus spa.html and 404.html.`,
  );
}

prerender();
