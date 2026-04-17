<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import ToolCard from '@/components/common/ToolCard.vue';
import AdInContent from '@/components/ads/AdInContent.vue';
import { tools, resolveToolPresentation } from '@/data/tools';
import { applySeo } from '@/utils/seo';
import { siteDescription, siteName, siteUrl } from '@/utils/site';
import { buildLocalePath, detectLocaleFromPath } from '@/utils/locale';
import { t } from '@/utils/localText';

const route = useRoute();
const locale = computed(() => detectLocaleFromPath(route.path));
const hasLocalePrefix = computed(() => /\/(id|en)(?:\/|$)/.test(route.path));

applySeo({
  title:
    locale.value === 'en'
      ? `${siteName} | Business & Finance Tools Indonesia`
      : `${siteName} | Tools Bisnis & Keuangan Indonesia`,
  description:
    locale.value === 'en'
      ? 'Business and finance tools for invoices, loans, discounts, margin, VAT, and more.'
      : siteDescription,
  canonical: hasLocalePrefix.value ? `${siteUrl}/${locale.value}` : siteUrl,
  alternates: [
    { hreflang: 'id', href: `${siteUrl}/id` },
    { hreflang: 'en', href: `${siteUrl}/en` },
    { hreflang: 'x-default', href: siteUrl },
  ],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
  ],
});

const featuredTools = computed(() => tools.map((tool) => resolveToolPresentation(tool, locale.value)));
const quickLinks = computed(() =>
  locale.value === 'en'
    ? [
        { label: 'Invoice Generator', to: '/invoice-generator' },
        { label: 'Loan Calculator', to: '/loan-calculator' },
        { label: 'VAT Calculator', to: '/kalkulator-ppn' },
        { label: 'ROI Calculator', to: '/roi-calculator' },
      ]
    : [
        { label: 'Invoice Generator', to: '/invoice-generator' },
        { label: 'Loan Calculator', to: '/loan-calculator' },
        { label: 'Kalkulator PPN', to: '/kalkulator-ppn' },
        { label: 'ROI Calculator', to: '/roi-calculator' },
      ],
);
</script>

<template>
  <section class="section-shell pb-16 pt-10">
    <Breadcrumbs />
    <div class="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-300">
          {{ locale === 'en' ? 'Business & Finance Tools Indonesia' : 'Tools Bisnis & Keuangan Indonesia' }}
        </p>
        <h1 class="mt-4 max-w-3xl text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-5xl">
          {{
            locale === 'en'
              ? 'Clean online tools for invoice, loans, discounts, margin, and VAT.'
              : 'Tools online yang rapi untuk invoice, pinjaman, diskon, margin, dan PPN.'
          }}
        </h1>
        <p class="mt-6 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
          {{
            locale === 'en'
              ? 'This platform helps business owners, freelancers, and everyday users calculate business needs quickly without complicated spreadsheets. Every tool is lightweight, easy to understand, and focused on useful daily results.'
              : 'Platform ini dibangun untuk membantu pelaku usaha, freelancer, dan pengguna umum menghitung kebutuhan bisnis dengan cepat tanpa harus membuka spreadsheet yang rumit. Setiap tool dibuat ringan, mudah dipahami, dan langsung mengarah ke hasil yang bisa dipakai dalam pekerjaan sehari-hari.'
          }}
        </p>
      </div>

      <aside class="glass-panel p-6">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          {{ locale === 'en' ? 'Why this site was built' : 'Kenapa situs ini dibuat' }}
        </p>
        <p class="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
          {{
            locale === 'en'
              ? 'Many small businesses need fast calculations without installing heavy apps. This site brings essential tools into one place, with clean SEO structure, clear legal pages, and ad-ready spacing for healthy monetization.'
              : 'Banyak bisnis kecil butuh perhitungan cepat tanpa harus instal aplikasi berat. Website ini menyatukan tool penting dalam satu tempat, dengan struktur SEO yang bersih, halaman legal yang jelas, dan ruang yang cukup untuk iklan agar siap dipakai untuk monetisasi yang sehat.'
          }}
        </p>
        <div class="mt-5 flex flex-wrap gap-3">
          <RouterLink :to="buildLocalePath('/kalkulator-bisnis-keuangan-online', locale)" class="rounded-full border border-brand-400/40 bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-500/20 dark:text-brand-200">
            {{ t('landingSeo', locale) }}
          </RouterLink>
          <RouterLink :to="buildLocalePath('/tools', locale)" class="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400">
            {{ locale === 'en' ? 'View all tools' : 'Lihat semua tools' }}
          </RouterLink>
          <RouterLink :to="buildLocalePath('/about', locale)" class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10">
            {{ locale === 'en' ? 'About us' : 'Tentang kami' }}
          </RouterLink>
        </div>
      </aside>
    </div>

    <AdInContent />

    <div class="prose-like max-w-none">
      <SectionHeading :eyebrow="locale === 'en' ? 'SEO Intro' : 'SEO Intro'">
        {{ locale === 'en' ? 'Why are these business and finance tools useful?' : 'Mengapa tools bisnis dan keuangan ini berguna?' }}
      </SectionHeading>
      <template v-if="locale === 'en'">
        <p>
          In daily operations, teams often lose time on small calculations that should be quick. Whether you are
          creating invoices, checking discounts, reviewing margin, validating VAT, or comparing loan options, you need
          tools that are fast, accurate, and easy to use, not heavy software.
        </p>
        <p>
          This site brings practical business and finance calculators into one place with a clean, scalable structure.
          Each tool has clear content, FAQs, and related-tool links so users can solve one task and continue to the next
          without friction.
        </p>
        <p>
          We also keep the site search-friendly with readable headings, focused metadata, and structured FAQ sections.
          The layout leaves healthy spacing for ads and legal elements, supporting long-term monetization without
          harming user experience.
        </p>
        <p>
          For users, the benefit is simple: faster decisions, fewer manual mistakes, and practical results you can use
          immediately in day-to-day work.
        </p>
      </template>
      <template v-else>
        <p>
          Dalam keseharian bisnis, waktu sering habis untuk hal-hal kecil yang sebenarnya bisa dipangkas dengan tool yang
          tepat. Saat Anda harus membuat invoice, menghitung diskon, menilai margin, memeriksa PPN, atau membandingkan
          skema pinjaman, yang Anda butuhkan bukan aplikasi besar yang kompleks, melainkan alat yang cepat, presisi, dan
          enak dipakai. Itulah tujuan utama situs ini: mengumpulkan banyak kalkulasi penting ke dalam satu tempat yang
          terstruktur, ramah SEO, dan mudah diperluas. Dengan pendekatan data-driven, setiap tool punya identitas,
          deskripsi, konten penjelasan, FAQ, dan relasi internal yang membantu pengguna menemukan alat lain yang relevan.
        </p>
        <p>
          Bagi pemilik usaha kecil dan menengah, invoice yang profesional bukan hanya soal tampilan. Invoice yang rapi
          membantu alur penagihan, meminimalkan kesalahan nominal, dan memberi kesan bahwa bisnis Anda dikelola dengan
          serius. Pada saat yang sama, kalkulator pinjaman dapat membantu Anda mengukur apakah cicilan bulanan masih aman
          untuk cash flow. Kalkulator diskon membantu tim penjualan menjaga promosi tetap menguntungkan. Kalkulator margin
          memberi pandangan yang lebih jujur terhadap profit, sementara kalkulator PPN menjaga transisi antara harga dasar
          dan harga akhir tetap transparan.
        </p>
        <p>
          Situs ini juga disusun dengan struktur yang nyaman untuk mesin pencari. Setiap halaman memakai heading yang
          jelas, konten bahasa Indonesia yang natural, metadata unik, dan schema FAQ agar konteks halaman lebih mudah
          dipahami mesin pencari. Untuk AdSense, layout dibuat bersih dengan jarak yang cukup antara konten dan slot iklan,
          sehingga pengguna tetap fokus membaca tanpa merasa terganggu. Pendekatan ini penting karena monetisasi yang baik
          seharusnya berjalan seiring dengan pengalaman pengguna yang baik, bukan saling mengorbankan.
        </p>
        <p>
          Keunggulan lainnya adalah fleksibilitas. Begitu Anda ingin menambah tool baru, Anda cukup menambahkan satu
          entri ke file konfigurasi data, lalu router dan daftar halaman akan ikut terbentuk. Ini membuat situs mudah
          tumbuh dari lima tool awal menjadi puluhan tool tanpa perlu merombak arsitektur. Dari sisi pemeliharaan, ini
          jauh lebih aman dan efisien. Dari sisi SEO, setiap tool baru tetap bisa mendapat halaman detail sendiri dengan
          konten dan FAQ yang unik.
        </p>
        <p>
          Untuk pengguna, manfaatnya sederhana: lebih cepat, lebih jelas, dan lebih sedikit kesalahan. Anda tidak perlu
          menghafal rumus atau membuka kalkulator terpisah. Cukup pilih tool yang sesuai, masukkan data, dan hasil
          langsung muncul. Bagi blog bisnis, situs affiliate, maupun portal alat online, model seperti ini sangat cocok
          karena mudah dikembangkan ke banyak topik turunan. Hari ini invoice dan pinjaman, besok bisa pajak, pembulatan,
          konversi harga, simulasi cash flow, atau alat operasional lainnya.
        </p>
      </template>
      <div class="mt-8 grid gap-4 md:grid-cols-3">
        <div class="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 class="text-lg font-semibold text-slate-950 dark:text-white">{{ locale === 'en' ? 'Fast to use' : 'Cepat dipakai' }}</h3>
          <p class="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
            {{
              locale === 'en'
                ? 'Each tool opens with a straightforward form, so users can get results quickly without learning a complex interface.'
                : 'Setiap tool langsung terbuka dengan form yang sederhana, sehingga pengguna tidak perlu belajar antarmuka yang rumit untuk mendapatkan hasil.'
            }}
          </p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 class="text-lg font-semibold text-slate-950 dark:text-white">{{ locale === 'en' ? 'Built to scale' : 'Siap berkembang' }}</h3>
          <p class="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
            {{
              locale === 'en'
                ? 'A centralized configuration model makes adding new tools easier, more consistent, and lower risk.'
                : 'Konfigurasi terpusat membuat penambahan tool baru menjadi lebih mudah, konsisten, dan minim risiko.'
            }}
          </p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 class="text-lg font-semibold text-slate-950 dark:text-white">{{ locale === 'en' ? 'Structured for SEO' : 'Rapi untuk SEO' }}</h3>
          <p class="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
            {{
              locale === 'en'
                ? 'Heading structure, editorial content, FAQs, and internal links are organized so search engines can understand each page better.'
                : 'Struktur heading, konten editorial, FAQ, dan internal link dirancang agar halaman mudah dipahami mesin pencari.'
            }}
          </p>
        </div>
      </div>

      <div class="mt-8 rounded-3xl border border-brand-400/20 bg-brand-500/10 p-6">
        <h3 class="text-xl font-semibold text-slate-950 dark:text-white">{{ locale === 'en' ? 'Quick path to core tools' : 'Jalur cepat ke tool utama' }}</h3>
        <p class="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
          {{
            locale === 'en'
              ? 'Start with invoice, loans, and VAT for common needs. If you need profit analysis, move to margin, profit, or ROI. For cash flow and target planning, use cash flow forecast, working capital, and savings goal.'
              : 'Untuk kebutuhan paling umum, mulai dari invoice, pinjaman, dan PPN. Jika Anda butuh analisis laba, lanjut ke margin, profit, atau ROI. Untuk perencanaan arus kas dan target, gunakan cash flow forecast, modal kerja, dan savings goal.'
          }}
        </p>
        <div class="mt-5 flex flex-wrap gap-3">
          <RouterLink
            v-for="link in quickLinks"
            :key="link.to"
            :to="buildLocalePath(link.to, locale)"
            class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {{ link.label }}
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="mt-16">
      <SectionHeading :eyebrow="locale === 'en' ? 'All Tools' : 'Semua Tools'">
        {{ locale === 'en' ? 'Start with the most-used tools' : 'Mulai dari tool yang paling sering dipakai' }}
      </SectionHeading>
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ToolCard
          v-for="tool in featuredTools"
          :key="tool.slug"
          :title="tool.title"
          :description="tool.description"
          :slug="tool.slug"
          :category="tool.category"
        />
      </div>
    </div>
  </section>
</template>
