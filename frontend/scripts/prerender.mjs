import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tools } from '../src/data/tools.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const siteUrl = 'https://kalkulatorin.com';
const siteName = 'Hitungin';
const defaultSiteDescription = 'Tools Bisnis & Keuangan Indonesia untuk invoice, simulasi pinjaman, diskon, margin, dan PPN.';

// Static pages definition with content
const staticPages = [
  {
    path: '/',
    id: {
      title: 'Tools Bisnis & Keuangan Indonesia | Hitungin',
      description: 'Platform tools online gratis untuk invoice, simulasi pinjaman, diskon, margin, PPN, dan kebutuhan keuangan lainnya.',
      h1: 'Tools Bisnis & Keuangan Indonesia',
      intro: 'Kumpulan kalkulator dan alat bantu bisnis online yang ringan, cepat, dan mudah digunakan langsung dari browser Anda.',
      html: `
        <div class="prose-like mt-8">
          <h2>Mengapa memilih Hitungin?</h2>
          <p>Hitungin menyediakan berbagai kalkulator bisnis dan finansial yang dirancang khusus untuk kebutuhan operasional UMKM, freelancer, ritel, perpajakan, dan pengelolaan keuangan pribadi di Indonesia. Seluruh rumus dihitung secara presisi mengikuti regulasi dan standar yang berlaku di Indonesia.</p>
          <div class="grid gap-4 md:grid-cols-3 mt-6">
            <div class="p-5 border border-slate-200 dark:border-white/10 rounded-2xl bg-white/50 dark:bg-white/5">
              <h3>Mudah & Gratis</h3>
              <p class="text-sm">Gunakan semua tool gratis tanpa pendaftaran akun atau konfigurasi spreadsheet yang rumit.</p>
            </div>
            <div class="p-5 border border-slate-200 dark:border-white/10 rounded-2xl bg-white/50 dark:bg-white/5">
              <h3>Regulasi Indonesia</h3>
              <p class="text-sm">Perhitungan pajak (PPN, PPh 21), BPJS, zakat, dan pesangon disesuaikan dengan UU yang berlaku.</p>
            </div>
            <div class="p-5 border border-slate-200 dark:border-white/10 rounded-2xl bg-white/50 dark:bg-white/5">
              <h3>Ekspor Dokumen</h3>
              <p class="text-sm">Hasilkan dokumen profesional seperti invoice dalam format PDF secara instan.</p>
            </div>
          </div>
        </div>
      `
    },
    en: {
      title: 'Business & Finance Tools Indonesia | Hitungin',
      description: 'Free online business and finance tools for invoices, loan simulation, discounts, margin, VAT, and other financial needs.',
      h1: 'Business & Finance Tools Indonesia',
      intro: 'A collection of lightweight, fast, and easy-to-use online business tools running directly in your browser.',
      html: `
        <div class="prose-like mt-8">
          <h2>Why Choose Hitungin?</h2>
          <p>Hitungin provides various business and financial calculators designed for SMEs, freelancers, retail, tax compliance, and personal finance management in Indonesia. All formulas are computed precisely following local regulations and standards.</p>
          <div class="grid gap-4 md:grid-cols-3 mt-6">
            <div class="p-5 border border-slate-200 dark:border-white/10 rounded-2xl bg-white/50 dark:bg-white/5">
              <h3>Easy & Free</h3>
              <p class="text-sm">Use all tools for free without registration or complex spreadsheet configurations.</p>
            </div>
            <div class="p-5 border border-slate-200 dark:border-white/10 rounded-2xl bg-white/50 dark:bg-white/5">
              <h3>Local Compliance</h3>
              <p class="text-sm">Tax calculations (VAT, PPh 21), BPJS, zakat, and severance pay comply with active laws.</p>
            </div>
            <div class="p-5 border border-slate-200 dark:border-white/10 rounded-2xl bg-white/50 dark:bg-white/5">
              <h3>Export Documents</h3>
              <p class="text-sm">Instantly generate professional invoice documents in PDF format.</p>
            </div>
          </div>
        </div>
      `
    }
  },
  {
    path: '/kalkulator-bisnis-keuangan-online',
    id: {
      title: 'Kalkulator Bisnis & Keuangan Online Gratis | Hitungin',
      description: 'Akses cepat berbagai kalkulator bisnis gratis untuk estimasi margin, BEP, PPN, amortisasi kredit, dan proyeksi pendapatan.',
      h1: 'Kalkulator Bisnis & Keuangan Online Gratis',
      intro: 'Pusat simulasi perhitungan operasional usaha untuk mempermudah pengambilan keputusan bisnis Anda.',
      html: '<p>Halaman ini merupakan direktori utama untuk kalkulator bisnis. Pilih kategori mulai dari keuangan, investasi, pajak, operasional, hingga personal finance untuk memulai perhitungan Anda secara instan.</p>'
    },
    en: {
      title: 'Free Business & Finance Calculators Online | Hitungin',
      description: 'Quick access to free business calculators for margin estimation, BEP, VAT, credit amortization, and revenue projection.',
      h1: 'Free Business & Finance Calculators Online',
      intro: 'Business operational calculation directory to ease your business decision-making process.',
      html: '<p>This is the main directory for business calculators. Choose a category from finance, investment, tax, operations, to personal finance to start your calculations instantly.</p>'
    }
  },
  {
    path: '/tools',
    id: {
      title: 'Daftar Semua Tools Bisnis Keuangan | Hitungin',
      description: 'Jelajahi seluruh kalkulator finansial dan bisnis gratis yang tersedia di Hitungin. Mulai dari invoice generator hingga PPh 21.',
      h1: 'Semua Tools Bisnis Keuangan',
      intro: 'Temukan alat kalkulasi yang paling relevan untuk operasional bisnis, investasi, perpajakan, maupun keuangan pribadi.',
      html: '<p>Gunakan navigasi cepat untuk beralih antar tool ritel, operasional, pajak, dan investasi yang aman dan akurat.</p>'
    },
    en: {
      title: 'All Business & Finance Tools | Hitungin',
      description: 'Explore all free financial and business calculators available on Hitungin. From invoice generator to PPh 21 tax.',
      h1: 'All Business & Finance Tools',
      intro: 'Find the most relevant calculation tool for business operations, investments, taxation, or personal finance.',
      html: '<p>Use our quick navigation to switch between retail, operational, tax, and investment tools safely and accurately.</p>'
    }
  },
  {
    path: '/about',
    id: {
      title: 'Tentang Kami | Hitungin',
      description: 'Ketahui misi, standar editorial, basis regulasi, dan transparansi iklan Google AdSense di balik platform Hitungin.',
      h1: 'Tentang Hitungin',
      intro: 'Platform kalkulator online gratis untuk memajukan produktivitas bisnis dan literasi keuangan masyarakat Indonesia.',
      html: `
        <div class="prose-like mt-6">
          <h2>Misi Kami</h2>
          <p>Menyediakan tools bisnis dan keuangan yang mudah diakses, cepat, dan akurat demi membantu efisiensi UMKM, freelancer, dan pekerja profesional di Indonesia.</p>
          <h2>Standar Editorial & Regulasi</h2>
          <p>Kalkulator kami menggunakan formula terverifikasi berbasis regulasi formal, seperti Undang-Undang Harmonisasi Peraturan Perpajakan (UU HPP), kebijakan PTKP Ditjen Pajak, pedoman Zakat BAZNAS, dan UU Ketenagakerjaan/Cipta Kerja.</p>
        </div>
      `
    },
    en: {
      title: 'About Us | Hitungin',
      description: 'Learn about our mission, editorial standards, regulatory references, and Google AdSense ad transparency.',
      h1: 'About Hitungin',
      intro: 'Free online calculators to advance business productivity and financial literacy in Indonesia.',
      html: `
        <div class="prose-like mt-6">
          <h2>Our Mission</h2>
          <p>Providing business and financial tools that are accessible, fast, and accurate to help increase efficiency for SMEs, freelancers, and professionals in Indonesia.</p>
          <h2>Editorial Standards & Regulations</h2>
          <p>Our calculators utilize verified formulas based on formal regulations, such as the Tax Harmonization Law (UU HPP), DJP tax relief policies, BAZNAS zakat rules, and current labor/Job Creation regulations.</p>
        </div>
      `
    }
  },
  {
    path: '/contact',
    id: {
      title: 'Hubungi Kami & Feedback | Hitungin',
      description: 'Ajukan pertanyaan, saran perbaikan formula kalkulator, atau hubungi tim pengembang Hitungin secara langsung.',
      h1: 'Hubungi Kami',
      intro: 'Ada saran kalkulator baru atau koreksi rumus? Kami senang mendengar masukan Anda.',
      html: '<p>Kirimkan email kepada kami di hello@kalkulatorin.com. Tim kami akan segera menanggapi masukan Anda untuk menjaga akurasi platform.</p>'
    },
    en: {
      title: 'Contact Us & Feedback | Hitungin',
      description: 'Submit your questions, calculator formula corrections, or contact the Hitungin developer team directly.',
      h1: 'Contact Us',
      intro: 'Have a suggestion for a new calculator or formula correction? We would love to hear from you.',
      html: '<p>Email us at hello@kalkulatorin.com. Our team will respond quickly to keep our platform accurate.</p>'
    }
  },
  {
    path: '/privacy-policy',
    id: {
      title: 'Kebijakan Privasi | Hitungin',
      description: 'Pelajari bagaimana kami mengelola data Anda, kebijakan cookie, dan kepatuhan iklan Google AdSense.',
      h1: 'Kebijakan Privasi',
      intro: 'Kami berkomitmen penuh untuk menjaga keamanan privasi informasi pengunjung kami.',
      html: `
        <div class="prose-like mt-6">
          <p>Situs kami tidak menyimpan data sensitif dari kalkulator Anda di server kami. Semua kalkulasi diproses secara lokal di sisi browser Anda.</p>
          <h2>Cookie Iklan & Google AdSense</h2>
          <p>Kami menggunakan pihak ketiga seperti Google AdSense untuk menayangkan iklan. Google menggunakan cookie untuk menayangkan iklan berdasarkan kunjungan pengguna sebelumnya ke situs ini atau situs lainnya.</p>
        </div>
      `
    },
    en: {
      title: 'Privacy Policy | Hitungin',
      description: 'Learn how we manage your data, cookie policies, and Google AdSense advertising compliance.',
      h1: 'Privacy Policy',
      intro: 'We are fully committed to maintaining the privacy and security of our visitors.',
      html: `
        <div class="prose-like mt-6">
          <p>Our site does not store sensitive data from your calculations on our servers. All calculations are processed locally inside your browser.</p>
          <h2>Advertising Cookies & Google AdSense</h2>
          <p>We use third-party vendors, such as Google AdSense, to serve ads. Google uses cookies to serve ads based on a user's prior visits to this or other websites.</p>
        </div>
      `
    }
  },
  {
    path: '/terms-of-service',
    id: {
      title: 'Syarat dan Ketentuan | Hitungin',
      description: 'Ketentuan dan aturan penggunaan seluruh kalkulator dan layanan di platform online Hitungin.',
      h1: 'Syarat dan Ketentuan Penggunaan',
      intro: 'Aturan penggunaan layanan platform Hitungin untuk semua pengunjung.',
      html: '<p>Dengan mengakses platform Hitungin, Anda menyetujui syarat penggunaan, kebijakan privasi, serta pelepasan tanggung jawab hukum atas hasil perhitungan kami yang bersifat simulasi.</p>'
    },
    en: {
      title: 'Terms of Service | Hitungin',
      description: 'Terms and rules for using all calculators and services on the Hitungin online platform.',
      h1: 'Terms of Service',
      intro: 'Rules for using the Hitungin platform services for all visitors.',
      html: '<p>By accessing the Hitungin platform, you agree to these terms of use, our privacy policy, and the legal disclaimers regarding the simulated nature of our calculator outputs.</p>'
    }
  },
  {
    path: '/disclaimer',
    id: {
      title: 'Disclaimer & Sanggahan Hukum | Hitungin',
      description: 'Penjelasan mengenai batasan tanggung jawab hukum hasil kalkulasi dan simulasi di Hitungin.',
      h1: 'Disclaimer',
      intro: 'Pernyataan mengenai sifat hasil perhitungan kalkulator kami sebagai simulasi edukatif.',
      html: '<p>Seluruh hasil perhitungan yang dihasilkan oleh kalkulator di Hitungin adalah simulasi kasar dan tidak boleh dianggap sebagai nasihat keuangan resmi, perpajakan, atau hukum formal. Silakan berkonsultasi dengan profesional ahli sebelum mengambil keputusan finansial penting.</p>'
    },
    en: {
      title: 'Disclaimer & Legal Notice | Hitungin',
      description: 'Notice regarding the limitations of legal liability for calculations and simulations on Hitungin.',
      h1: 'Disclaimer',
      intro: 'Notice regarding the educational and simulated nature of our calculator outputs.',
      html: '<p>All calculations generated by Hitungin are rough simulations and should not be treated as official financial, tax, or legal advice. Please consult with qualified professionals before making major financial decisions.</p>'
    }
  },
  {
    path: '/glossary',
    id: {
      title: 'Kamus Finansial & Bisnis Lengkap | Hitungin',
      description: 'Cari istilah bisnis dan keuangan populer seperti Amortisasi, BEP, PPN, Margin, Markup, dan ROI untuk edukasi usaha.',
      h1: 'Kamus Finansial & Bisnis',
      intro: 'Pelajari istilah-istilah keuangan penting demi mengelola bisnis secara lebih profesional.',
      html: '<p>Kami mengumpulkan glosarium lengkap mulai dari pengertian margin laba, titik impas (BEP), anuitas bunga pinjaman, hingga aturan perpajakan terbaru di Indonesia.</p>'
    },
    en: {
      title: 'Financial & Business Glossary | Hitungin',
      description: 'Search popular business and financial terms like Amortization, BEP, VAT, Margin, Markup, and ROI for business education.',
      h1: 'Financial & Business Glossary',
      intro: 'Learn key financial terms to run your business more professionally.',
      html: '<p>We compile a complete glossary covering profit margin definitions, break-even point (BEP), interest amortization, and active tax guidelines.</p>'
    }
  },
  {
    path: '/sitemap',
    id: {
      title: 'Peta Situs (Sitemap) | Hitungin',
      description: 'Daftar rute halaman lengkap untuk mengakses seluruh kalkulator bisnis yang tersedia di Hitungin.',
      h1: 'Peta Situs',
      intro: 'Struktur halaman navigasi lengkap platform Hitungin.',
      html: '<p>Jelajahi seluruh indeks halaman untuk menemukan kalkulator ritel, keuangan, pajak, operasional, dan halaman legal kami secara teratur.</p>'
    },
    en: {
      title: 'Sitemap | Hitungin',
      description: 'A complete list of page routes to access all business calculators available on Hitungin.',
      h1: 'Sitemap',
      intro: 'Complete page structure navigation of the Hitungin platform.',
      html: '<p>Browse our page index to find retail, financial, tax, operational, and legal pages easily.</p>'
    }
  }
];

async function prerender() {
  const distDir = resolve(__dirname, '../dist');
  let htmlTemplate = '';
  try {
    htmlTemplate = await readFile(resolve(distDir, 'index.html'), 'utf8');
  } catch (err) {
    console.error('Failed to read dist/index.html. Make sure you run vite build first!');
    process.exit(1);
  }

  // 1. Prerender Static Pages (ID & EN)
  for (const page of staticPages) {
    const isHome = page.path === '/';
    
    // Prerender ID
    await renderPage(
      htmlTemplate,
      distDir,
      page.path,
      page.id.title,
      page.id.description,
      page.id.h1,
      page.id.intro,
      page.id.html,
      'id',
      isHome
    );

    // Prerender EN
    const enPath = isHome ? '/en' : `/en${page.path}`;
    await renderPage(
      htmlTemplate,
      distDir,
      enPath,
      page.en.title,
      page.en.description,
      page.en.h1,
      page.en.intro,
      page.en.html,
      'en',
      false
    );
  }

  // 2. Prerender Dynamic Tool Pages (ID & EN)
  for (const tool of tools) {
    // Determine ID Tool Details
    const idTitle = tool.seoTitle || `${tool.title} | Hitungin`;
    const idDescription = tool.seoDescription || tool.description;
    const idIntro = tool.intro;
    
    let idContentHtml = `<div class="prose-like mt-8">`;
    for (const section of tool.content) {
      idContentHtml += `<h2>${section.heading}</h2>`;
      for (const p of section.paragraphs) {
        idContentHtml += `<p>${p}</p>`;
      }
    }
    idContentHtml += `</div>`;

    if (tool.faqs && tool.faqs.length > 0) {
      idContentHtml += `<div class="mt-8"><h2>FAQ - Pertanyaan Umum</h2><div class="space-y-4">`;
      for (const faq of tool.faqs) {
        idContentHtml += `<details class="p-4 border border-slate-200 dark:border-white/10 rounded-2xl bg-white/5 dark:bg-white/5"><summary class="font-semibold cursor-pointer">${faq.question}</summary><p class="mt-2 text-slate-600 dark:text-slate-300 text-sm">${faq.answer}</p></details>`;
      }
      idContentHtml += `</div></div>`;
    }

    // Render ID tool page
    await renderPage(
      htmlTemplate,
      distDir,
      `/${tool.slug}`,
      idTitle,
      idDescription,
      tool.title,
      idIntro,
      idContentHtml,
      'id',
      false
    );

    // Determine EN Tool Details
    const enCopy = tool.localized?.en;
    const enTitle = enCopy?.seoTitle || tool.seoTitle_en || `${tool.title} | Hitungin`;
    const enDescription = enCopy?.seoDescription || tool.seoDescription_en || tool.description;
    const enIntro = enCopy?.intro || tool.intro;
    const enSections = enCopy?.content || tool.content;
    const enFaqs = enCopy?.faqs || tool.faqs;

    let enContentHtml = `<div class="prose-like mt-8">`;
    for (const section of enSections) {
      enContentHtml += `<h2>${section.heading}</h2>`;
      for (const p of section.paragraphs) {
        enContentHtml += `<p>${p}</p>`;
      }
    }
    enContentHtml += `</div>`;

    if (enFaqs && enFaqs.length > 0) {
      enContentHtml += `<div class="mt-8"><h2>FAQ - Frequently Asked Questions</h2><div class="space-y-4">`;
      for (const faq of enFaqs) {
        enContentHtml += `<details class="p-4 border border-slate-200 dark:border-white/10 rounded-2xl bg-white/5 dark:bg-white/5"><summary class="font-semibold cursor-pointer">${faq.question}</summary><p class="mt-2 text-slate-600 dark:text-slate-300 text-sm">${faq.answer}</p></details>`;
      }
      enContentHtml += `</div></div>`;
    }

    // Render EN tool page
    await renderPage(
      htmlTemplate,
      distDir,
      `/en/${tool.slug}`,
      enTitle,
      enDescription,
      enCopy?.title || tool.title,
      enIntro,
      enContentHtml,
      'en',
      false
    );
  }

  console.log('Prerendering completed successfully!');
}

async function renderPage(
  template,
  distDir,
  routePath,
  title,
  description,
  h1,
  intro,
  bodyHtml,
  locale,
  isHome
) {
  // Construct canonical URL
  const canonicalUrl = `${siteUrl}${routePath === '/' ? '' : routePath}`;
  const idAlternate = `${siteUrl}${routePath === '/' ? '' : routePath.replace(/^\/en/, '')}`;
  const enAlternate = `${siteUrl}${routePath.startsWith('/en') ? routePath : `/en${routePath === '/' ? '' : routePath}`}`;

  // Build JSON-LD Schema
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description: description,
      url: canonicalUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl
      }
    }
  ];

  const alternatesHtml = `
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="id" href="${idAlternate}" />
    <link rel="alternate" hreflang="en" href="${enAlternate}" />
    <link rel="alternate" hreflang="x-default" href="${idAlternate}" />
    <script id="page-jsonld" type="application/ld+json">${JSON.stringify(schema)}</script>
  `;

  // Pre-rendered HTML content structure
  const preRenderedContent = `
    <div class="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_38%),linear-gradient(to_bottom,_#f8fafc,_#e2e8f0)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_35%),linear-gradient(to_bottom,_#020617,_#0f172a)] text-slate-900 dark:text-slate-100">
      <!-- Header Placeholder -->
      <header class="border-b border-slate-200 bg-white/80 dark:border-white/10 dark:bg-slate-950/80 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          <a href="${locale === 'en' ? '/en' : '/'}" class="flex items-center gap-3">
            <div class="h-10 w-10 bg-blue-500 rounded-xl grid place-items-center text-white font-bold text-sm">TB</div>
            <div>
              <span class="block text-xs uppercase tracking-[0.2em] font-semibold text-blue-500">${locale === 'en' ? 'Business Tools' : 'Tools Bisnis'}</span>
              <span class="block text-sm font-semibold">${locale === 'en' ? 'Business & Finance Tools Indonesia' : 'Tools Bisnis & Keuangan Indonesia'}</span>
            </div>
          </a>
          <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="${locale === 'en' ? '/en' : '/'}">${locale === 'en' ? 'Home' : 'Beranda'}</a>
            <a href="${locale === 'en' ? '/en/tools' : '/tools'}">${locale === 'en' ? 'All Tools' : 'Semua Tools'}</a>
            <a href="${locale === 'en' ? '/en/about' : '/about'}">${locale === 'en' ? 'About' : 'Tentang'}</a>
            <a href="${locale === 'en' ? '/en/contact' : '/contact'}">${locale === 'en' ? 'Contact' : 'Kontak'}</a>
            <a href="${locale === 'en' ? '/' : '/en'}" class="px-3 py-1 bg-blue-500/10 rounded-full text-blue-500 text-xs font-semibold">${locale === 'en' ? 'Bahasa Indonesia' : 'English'}</a>
          </nav>
        </div>
      </header>

      <!-- Main SEO Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="max-w-4xl">
          <span class="text-xs uppercase tracking-[0.3em] font-semibold text-blue-500">${locale === 'en' ? 'Premium Web Calculator' : 'Kalkulator Web Premium'}</span>
          <h1 class="text-4xl font-bold mt-2 text-slate-900 dark:text-white leading-tight">${h1}</h1>
          <p class="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">${intro}</p>
          
          <!-- Interactive Widget Loading Placeholder -->
          <div class="my-8 p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl shadow-lg relative overflow-hidden min-h-[300px] flex items-center justify-center">
            <div class="text-center">
              <div class="inline-block animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
              <p class="text-sm text-slate-500">${locale === 'en' ? 'Loading interactive calculator...' : 'Memuat kalkulator interaktif...'}</p>
            </div>
          </div>

          <!-- SEO Content Prose -->
          ${bodyHtml}
        </div>
      </main>

      <!-- Footer Placeholder -->
      <footer class="border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 mt-16 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-4 text-sm text-slate-500">
          <div>
            <p class="font-bold text-slate-900 dark:text-white mb-3">${locale === 'en' ? 'Business Tools' : 'Tools Bisnis'}</p>
            <p>${locale === 'en' ? 'Accurate, responsive, and compliance-based financial tools.' : 'Alat keuangan akurat, responsif, dan berbasis regulasi Indonesia.'}</p>
          </div>
          <div>
            <p class="font-bold text-slate-900 dark:text-white mb-3">${locale === 'en' ? 'Language' : 'Bahasa'}</p>
            <ul class="space-y-2">
              <li><a href="${idAlternate}">Bahasa Indonesia</a></li>
              <li><a href="${enAlternate}">English</a></li>
            </ul>
          </div>
          <div>
            <p class="font-bold text-slate-900 dark:text-white mb-3">${locale === 'en' ? 'Legal' : 'Legalitas'}</p>
            <ul class="space-y-2">
              <li><a href="${locale === 'en' ? '/en/privacy-policy' : '/privacy-policy'}">${locale === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi'}</a></li>
              <li><a href="${locale === 'en' ? '/en/terms-of-service' : '/terms-of-service'}">${locale === 'en' ? 'Terms of Service' : 'Syarat & Ketentuan'}</a></li>
              <li><a href="${locale === 'en' ? '/en/disclaimer' : '/disclaimer'}">${locale === 'en' ? 'Disclaimer' : 'Sanggahan'}</a></li>
            </ul>
          </div>
          <div>
            <p class="font-bold text-slate-900 dark:text-white mb-3">${locale === 'en' ? 'Navigation' : 'Navigasi'}</p>
            <ul class="space-y-2">
              <li><a href="${locale === 'en' ? '/en/about' : '/about'}">${locale === 'en' ? 'About Us' : 'Tentang Kami'}</a></li>
              <li><a href="${locale === 'en' ? '/en/contact' : '/contact'}">${locale === 'en' ? 'Contact' : 'Kontak'}</a></li>
              <li><a href="${locale === 'en' ? '/en/sitemap' : '/sitemap'}">${locale === 'en' ? 'Sitemap' : 'Peta Situs'}</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  `;

  // Replace Title
  let outputHtml = template.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);

  // Replace Meta Description
  outputHtml = outputHtml.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${description}" />`
  );

  // Inject alternates, canonicals and schema right before </head>
  outputHtml = outputHtml.replace('</head>', `${alternatesHtml}\n</head>`);

  // Inject content inside <div id="app"></div>
  outputHtml = outputHtml.replace(
    /<div\s+id="app"\s*><\/div>/i,
    `<div id="app">${preRenderedContent}</div>`
  );

  // Determine file destination path
  let targetFile = '';
  if (routePath === '/') {
    targetFile = resolve(distDir, 'index.html'); // Overwrite main index.html for root ID
  } else {
    const pageDir = resolve(distDir, routePath.startsWith('/') ? routePath.slice(1) : routePath);
    await mkdir(pageDir, { recursive: true });
    targetFile = resolve(pageDir, 'index.html');
  }

  await writeFile(targetFile, outputHtml, 'utf8');
}

prerender();
