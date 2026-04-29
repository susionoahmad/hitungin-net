import type { Component } from 'vue';
import type { Locale } from '@/utils/locale';

export type ToolFaq = {
  question: string;
  answer: string;
};

export type ToolSection = {
  heading: string;
  paragraphs: string[];
};

export type ToolLocalizedCopy = {
  title: string;
  description: string;
  category?: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  content: ToolSection[];
  faqs: ToolFaq[];
};

export type ToolDefinition = {
  slug: string;
  title: string;
  description: string;
  category: string;
  component: () => Promise<{ default: Component }>;
  seoTitle: string;
  seoDescription: string;
  seoTitle_en?: string;
  seoDescription_en?: string;
  intro: string;
  content: ToolSection[];
  faqs: ToolFaq[];
  relatedSlugs: string[];
  localized?: Partial<Record<Locale, ToolLocalizedCopy>>;
};

export const tools: ToolDefinition[] = [
  {
    slug: 'invoice-generator',
    title: 'Invoice Generator',
    description: 'Buat invoice profesional dengan nomor otomatis, item dinamis, PPN 11%, dan ekspor PDF.',
    category: 'Bisnis',
    component: () => import('@/components/tools/InvoiceGeneratorTool.vue'),
    seoTitle: 'Invoice Generator Online | Tools Bisnis & Keuangan Indonesia',
    seoDescription:
      'Buat invoice profesional secara cepat dengan nomor otomatis, kalkulasi PPN 11%, item dinamis, dan ekspor PDF.',
    intro:
      'Invoice generator ini membantu pelaku usaha membuat tagihan yang rapi, cepat, dan mudah dibagikan ke pelanggan. Semua perhitungan dilakukan otomatis agar Anda bisa fokus pada transaksi, bukan hitung manual.',
    content: [
      {
        heading: 'Mengapa invoice yang rapi itu penting?',
        paragraphs: [
          'Invoice bukan sekadar bukti tagihan. Dokumen ini menjadi bagian dari identitas bisnis Anda di mata pelanggan. Invoice yang jelas, konsisten, dan mudah dibaca membantu mempercepat proses pembayaran, mengurangi kesalahan nominal, serta memberi kesan profesional pada usaha kecil maupun perusahaan yang sedang berkembang.',
          'Di Indonesia, banyak pelaku UMKM masih membuat invoice dengan spreadsheet sederhana atau chat manual. Cara ini boleh saja dipakai di awal, tetapi ketika jumlah pesanan mulai bertambah, risiko salah tulis, salah hitung pajak, dan lupa nomor invoice ikut meningkat. Tool ini dirancang untuk mengatasi masalah tersebut dengan alur yang lebih terstruktur dan nyaman dipakai di desktop maupun mobile.',
        ],
      },
      {
        heading: 'Fungsi utama yang disediakan',
        paragraphs: [
          'Anda dapat mengisi nama customer, menambahkan beberapa item produk atau jasa, menghapus baris yang tidak diperlukan, lalu sistem menghitung subtotal, PPN 11%, dan total akhir secara otomatis. Nomor invoice juga dibuat otomatis agar urutan dokumen lebih mudah dilacak saat Anda melakukan arsip atau rekonsiliasi pembayaran.',
          'Setelah invoice selesai, hasilnya bisa diekspor ke PDF. Ini sangat membantu untuk dikirim lewat email, WhatsApp, atau disimpan sebagai arsip internal. Dengan format yang konsisten, invoice Anda juga terlihat lebih kredibel saat dipakai untuk proyek freelance, penjualan B2B, maupun langganan layanan bulanan.',
        ],
      },
      {
        heading: 'Tips penggunaan untuk bisnis',
        paragraphs: [
          'Agar invoice lebih efektif, gunakan deskripsi item yang ringkas namun jelas, sertakan tanggal transaksi, dan pastikan nominal pajak sesuai dengan kebijakan bisnis Anda. Bila Anda menjual produk yang sudah termasuk pajak, tampilkan detail pajaknya secara transparan agar pelanggan memahami total yang dibayar.',
          'Untuk ke depan, struktur data invoice pada tool ini mudah diperluas. Anda bisa menambahkan logo, alamat perusahaan, diskon, nomor PO, atau template berbeda tanpa mengubah arsitektur utama. Itulah alasan sistem berbasis konfigurasi dipilih: tambah fitur baru cukup di satu tempat, lalu halaman lain tetap ikut terhubung dengan baik.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah invoice ini otomatis menghitung PPN 11%?',
        answer: 'Ya, default-nya memakai PPN 11% dan total akan dihitung otomatis dari subtotal item.',
      },
      {
        question: 'Apakah nomor invoice bisa diubah?',
        answer: 'Bisa. Nomor di-generate otomatis, tetapi Anda tetap dapat menyesuaikannya sebelum menyimpan atau mengekspor.',
      },
      {
        question: 'Apakah hasil invoice bisa disimpan sebagai PDF?',
        answer: 'Bisa, tersedia tombol ekspor PDF agar invoice mudah dibagikan ke pelanggan atau diarsipkan.',
      },
    ],
    relatedSlugs: ['loan-calculator', 'kalkulator-ppn', 'kalkulator-margin'],
  },
  {
    slug: 'loan-calculator',
    title: 'Loan Calculator',
    description: 'Simulasi pinjaman dengan cicilan bulanan, total bunga, dan tabel amortisasi.',
    category: 'Keuangan',
    component: () => import('@/components/tools/LoanCalculatorTool.vue'),
    seoTitle: 'Simulasi Pinjaman Online | Kalkulator Cicilan Bulanan',
    seoDescription:
      'Hitung cicilan pinjaman bulanan, total bunga, dan lihat tabel amortisasi dengan cepat dan mudah.',
    intro:
      'Simulasi pinjaman ini membantu Anda memahami berapa besar cicilan bulanan, total bunga, dan sisa pokok dari waktu ke waktu. Cocok untuk kredit usaha, pinjaman pribadi, maupun perencanaan pembelian aset.',
    content: [
      {
        heading: 'Memahami cicilan sebelum mengambil pinjaman',
        paragraphs: [
          'Banyak orang hanya fokus pada nominal pinjaman saat mengajukan kredit, padahal beban sebenarnya ada pada cicilan bulanan dan total bunga selama tenor. Dengan simulasi yang jelas, Anda bisa melihat apakah cash flow bisnis atau keuangan pribadi benar-benar sanggup menanggung kewajiban tersebut. Tool ini membantu memberikan gambaran yang lebih realistis sebelum keputusan diambil.',
          'Untuk bisnis, perhitungan yang akurat juga penting ketika Anda membandingkan beberapa opsi pembiayaan. Suku bunga yang tampak kecil bisa menghasilkan total biaya yang berbeda jauh jika tenornya panjang. Karena itu, alat ini menampilkan tidak hanya pembayaran bulanan, tetapi juga akumulasi bunga dan tabel amortisasi agar perbandingan lebih mudah dilakukan.',
        ],
      },
      {
        heading: 'Apa yang dihitung di dalam alat ini?',
        paragraphs: [
          'Anda memasukkan jumlah pinjaman, bunga per tahun, dan tenor dalam bulan. Sistem lalu menghitung cicilan tetap per bulan menggunakan rumus anuitas. Hasilnya menampilkan pembayaran bulanan, total bunga, total pembayaran, serta daftar amortisasi yang menunjukkan bagaimana porsi bunga dan pokok berubah setiap bulan.',
          'Tabel amortisasi sangat berguna untuk melihat berapa cepat pokok pinjaman menurun. Pada awal periode, porsi bunga biasanya lebih besar. Seiring waktu, porsi pokok akan semakin dominan. Informasi ini membantu Anda menyusun strategi pembayaran, refinancing, atau penjadwalan pengeluaran bisnis.',
        ],
      },
      {
        heading: 'Kapan simulasi ini paling berguna?',
        paragraphs: [
          'Alat ini relevan saat Anda sedang memilih kredit modal kerja, cicilan kendaraan operasional, pembiayaan alat produksi, atau pembelian inventaris. Dengan simulasi yang cepat, Anda bisa membandingkan skema bank dan menentukan pilihan yang paling sehat untuk arus kas.',
          'Ke depannya, sistem ini mudah diperluas untuk mendukung bunga flat, efektif, atau skema khusus lainnya. Arsitektur data-driven membuat kita bisa menambah variasi kalkulasi tanpa merombak halaman dan navigasi utama.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah hasil cicilan sudah termasuk bunga?',
        answer: 'Ya, cicilan bulanan dihitung dengan bunga sehingga total pembayaran lebih realistis.',
      },
      {
        question: 'Apakah ada tabel amortisasi?',
        answer: 'Ada. Tabel amortisasi menampilkan cicilan per bulan, porsi bunga, pokok, dan sisa saldo.',
      },
      {
        question: 'Apakah alat ini cocok untuk pinjaman bisnis?',
        answer: 'Cocok, terutama untuk simulasi awal sebelum Anda mengajukan pembiayaan atau kredit usaha.',
      },
    ],
    relatedSlugs: ['invoice-generator', 'kalkulator-margin', 'kalkulator-ppn'],
  },
  {
    slug: 'kalkulator-diskon',
    title: 'Kalkulator Diskon',
    description: 'Hitung harga setelah diskon, nominal potongan, dan persentase penghematan.',
    category: 'Ritel',
    component: () => import('@/components/tools/DiscountCalculatorTool.vue'),
    seoTitle: 'Kalkulator Diskon Online | Hitung Harga Setelah Diskon',
    seoDescription:
      'Hitung harga setelah diskon, nominal potongan, dan nilai penghematan secara cepat dalam Rupiah.',
    intro:
      'Kalkulator diskon ini memudahkan Anda menghitung harga akhir setelah potongan, baik untuk promo toko, penawaran jasa, maupun simulasi harga grosir. Hasilnya langsung jelas tanpa perlu hitung manual.',
    content: [
      {
        heading: 'Kenapa kalkulator diskon penting?',
        paragraphs: [
          'Diskon sering dipakai untuk mendorong penjualan, membersihkan stok lama, atau memberi penawaran menarik pada pelanggan. Namun, jika Anda menghitungnya manual di tengah transaksi yang ramai, risiko salah input bisa mengganggu margin dan kepercayaan pelanggan. Kalkulator ini membantu Anda mengetahui harga akhir dengan cepat, tepat, dan konsisten.',
          'Untuk bisnis ritel dan e-commerce, kecepatan sangat berpengaruh. Harga yang tampil harus jelas agar pelanggan tidak bingung saat checkout. Dengan alat ini, Anda dapat menyiapkan penawaran promosi, bundling, atau campaign musiman secara lebih rapi tanpa perlu beralih ke spreadsheet.',
        ],
      },
      {
        heading: 'Apa yang dihitung?',
        paragraphs: [
          'Masukkan harga awal dan persentase diskon, lalu sistem akan menampilkan nominal potongan, harga setelah diskon, serta persentase penghematan. Jika Anda ingin menyesuaikan strategi promosi, Anda dapat dengan cepat mencoba beberapa skenario dan membandingkan hasilnya.',
          'Tool ini juga berguna untuk salesperson yang ingin memberikan estimasi harga secara langsung saat berhadapan dengan customer. Dengan hasil yang cepat dan seragam, proses negosiasi menjadi lebih efisien dan profesional.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah kalkulator ini bisa menghitung diskon bertingkat?',
        answer: 'Saat ini fokus pada satu diskon utama, tetapi struktur aplikasinya mudah diperluas untuk diskon bertingkat.',
      },
      {
        question: 'Apakah hasilnya menggunakan Rupiah?',
        answer: 'Ya, semua nilai ditampilkan dalam format Rupiah agar sesuai dengan kebutuhan pengguna Indonesia.',
      },
    ],
    relatedSlugs: ['kalkulator-margin', 'kalkulator-ppn', 'loan-calculator'],
  },
  {
    slug: 'kalkulator-margin',
    title: 'Kalkulator Margin',
    description: 'Hitung margin keuntungan, markup, dan rasio profit dari harga jual dan modal.',
    category: 'Keuangan',
    component: () => import('@/components/tools/MarginCalculatorTool.vue'),
    seoTitle: 'Kalkulator Margin Keuntungan | Hitung Profit Bisnis',
    seoDescription:
      'Hitung margin keuntungan, markup, dan rasio profit dari harga modal dan harga jual dengan mudah.',
    intro:
      'Kalkulator margin membantu Anda memahami seberapa besar keuntungan dari suatu produk atau layanan. Alat ini berguna untuk menjaga harga tetap kompetitif tanpa mengorbankan profit yang sehat.',
    content: [
      {
        heading: 'Margin dan markup itu berbeda',
        paragraphs: [
          'Dalam praktik bisnis, margin dan markup sering tertukar. Margin melihat keuntungan sebagai persentase dari harga jual, sedangkan markup melihat tambahan harga dibanding modal. Perbedaan ini penting karena keputusan pricing yang salah bisa membuat bisnis terlihat untung di permukaan, tetapi sebenarnya tipis di kenyataan.',
          'Dengan kalkulator ini, Anda dapat memasukkan modal dan harga jual untuk mengetahui profit nominal, margin persentase, dan markup. Hasil tersebut membantu saat menentukan harga pasar, menyusun katalog, atau mengevaluasi produk mana yang paling sehat secara finansial.',
        ],
      },
      {
        heading: 'Siapa yang paling diuntungkan dari tool ini?',
        paragraphs: [
          'UMKM, reseller, penjual marketplace, brand lokal, dan freelancer yang menjual jasa sama-sama membutuhkan gambaran margin yang jelas. Jika Anda terlalu sering memberi diskon tanpa hitung margin, pendapatan bisa terkikis. Sebaliknya, jika harga terlalu tinggi, pelanggan bisa beralih ke kompetitor.',
          'Tool ini memberi keseimbangan. Anda bisa menguji beberapa skenario harga sebelum memutuskan angka final, sehingga strategi pricing lebih berbasis data dan tidak sekadar feeling. Untuk bisnis yang sedang tumbuh, kebiasaan seperti ini sangat membantu menjaga kesehatan arus kas.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah alat ini menghitung keuntungan nominal?',
        answer: 'Ya, keuntungan nominal dihitung dari selisih harga jual dan modal.',
      },
      {
        question: 'Apa beda margin dan markup?',
        answer: 'Margin dihitung dari harga jual, sedangkan markup dihitung dari modal. Keduanya sama-sama penting untuk pricing.',
      },
    ],
    relatedSlugs: ['kalkulator-diskon', 'invoice-generator', 'kalkulator-ppn'],
  },
  {
    slug: 'kalkulator-ppn',
    title: 'Kalkulator PPN',
    description: 'Hitung PPN 11%, harga sebelum pajak, dan total harga setelah pajak.',
    category: 'Pajak',
    component: () => import('@/components/tools/VatCalculatorTool.vue'),
    seoTitle: 'Kalkulator PPN 11% Online | Hitung Pajak Cepat',
    seoDescription:
      'Hitung PPN 11%, harga sebelum pajak, dan total harga akhir dengan hasil yang cepat dan akurat.',
    intro:
      'Kalkulator PPN ini membantu Anda menghitung pajak pertambahan nilai dengan cepat, baik saat membuat invoice, menyusun penawaran, maupun mengecek harga jual yang sudah termasuk pajak.',
    content: [
      {
        heading: 'Mengapa PPN perlu dihitung dengan benar?',
        paragraphs: [
          'PPN adalah komponen penting dalam transaksi bisnis tertentu. Jika tidak dihitung dengan benar, harga akhir bisa berbeda dari ekspektasi pelanggan dan laporan keuangan pun menjadi kurang rapi. Tool ini membantu Anda memisahkan harga dasar dan nilai pajak agar total transaksi lebih transparan.',
          'Bagi pelaku usaha, pemahaman PPN yang baik memudahkan pembuatan invoice, penawaran harga, dan komunikasi dengan pelanggan. Dengan input yang sederhana, Anda bisa melihat berapa besar pajak yang harus ditambahkan atau dipisahkan dari harga yang sudah final.',
        ],
      },
      {
        heading: 'Dua mode yang berguna',
        paragraphs: [
          'Anda bisa menghitung PPN dari harga sebelum pajak atau mencari harga dasar dari nominal yang sudah termasuk PPN. Mode seperti ini sangat membantu saat Anda menerima angka final dari pelanggan atau supplier dan perlu menyesuaikannya dengan struktur harga internal.',
          'Karena hasil ditampilkan dalam Rupiah, alat ini cocok dipakai di konteks Indonesia dan bisa langsung dipadukan dengan invoice generator di situs ini. Kombinasi tool seperti ini membuat workflow bisnis lebih rapi tanpa harus berpindah-pindah aplikasi.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah PPN yang dipakai 11%?',
        answer: 'Ya, default-nya menggunakan PPN 11% sesuai kebutuhan umum pengguna di Indonesia.',
      },
      {
        question: 'Apakah bisa menghitung harga termasuk pajak?',
        answer: 'Bisa, Anda dapat memilih mode hitung dari harga dasar atau dari harga yang sudah termasuk PPN.',
      },
    ],
    relatedSlugs: ['invoice-generator', 'kalkulator-margin', 'loan-calculator'],
  },
  {
    slug: 'break-even-point',
    title: 'Break Even Point',
    description: 'Hitung titik impas, jumlah unit minimal, dan omzet yang dibutuhkan untuk balik modal.',
    category: 'Bisnis',
    component: () => import('@/components/tools/BreakEvenPointTool.vue'),
    seoTitle: 'Break Even Point Calculator | Titik Impas Bisnis',
    seoDescription:
      'Hitung titik impas bisnis, jumlah unit minimal, dan omzet yang dibutuhkan untuk balik modal.',
    intro:
      'Break even point membantu Anda melihat kapan bisnis mulai menutup biaya dan menghasilkan keuntungan. Tool ini cocok untuk evaluasi produk baru, usaha kecil, maupun keputusan pricing.',
    content: [
      {
        heading: 'Mengapa titik impas penting?',
        paragraphs: [
          'Titik impas adalah batas minimum penjualan agar seluruh biaya tetap dan biaya variabel tertutup. Dalam dunia usaha, memahami angka ini sangat membantu karena Anda bisa tahu kapan bisnis benar-benar mulai menghasilkan laba. Tanpa perhitungan BEP, keputusan harga sering terlalu bergantung pada intuisi.',
          'Tool ini berguna untuk toko fisik, bisnis online, jasa, maupun produk digital. Anda tinggal memasukkan biaya tetap, biaya variabel per unit, dan harga jual per unit untuk melihat jumlah unit minimal yang harus terjual. Hasilnya membantu Anda menyusun target penjualan yang lebih realistis dan terukur.',
        ],
      },
      {
        heading: 'Kegunaan praktis',
        paragraphs: [
          'Dengan mengetahui break even point, Anda bisa menilai apakah strategi promosi masih aman, apakah harga terlalu rendah, atau apakah perlu menaikkan margin. Informasi ini penting terutama saat bisnis sedang tumbuh dan setiap keputusan harga punya dampak langsung pada cash flow.',
          'Ke depannya, tool seperti ini mudah diperluas untuk simulasi beberapa skenario harga sekaligus. Karena data tool disimpan di satu konfigurasi, penambahan varian perhitungan tidak perlu mengubah arsitektur halaman inti.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah BEP selalu sama untuk semua produk?',
        answer: 'Tidak. BEP berubah mengikuti biaya tetap, biaya variabel, dan harga jual yang Anda pakai.',
      },
      {
        question: 'Apakah hasilnya bisa dipakai untuk target penjualan?',
        answer: 'Ya, titik impas sangat berguna sebagai baseline target penjualan minimal.',
      },
    ],
    relatedSlugs: ['kalkulator-margin', 'invoice-generator', 'percentage-calculator'],
  },
  {
    slug: 'cash-flow-forecast',
    title: 'Cash Flow Forecast',
    description: 'Proyeksikan pemasukan, pengeluaran, dan saldo kas bulanan secara sederhana.',
    category: 'Keuangan',
    component: () => import('@/components/tools/CashFlowForecastTool.vue'),
    seoTitle: 'Cash Flow Forecast | Proyeksi Arus Kas Bulanan',
    seoDescription:
      'Proyeksikan pemasukan, pengeluaran, dan saldo kas bulanan secara sederhana untuk perencanaan bisnis.',
    intro:
      'Forecast arus kas membantu Anda melihat apakah bisnis akan tetap sehat dalam beberapa bulan ke depan. Tool ini memberikan gambaran cepat tentang saldo kas berdasarkan pemasukan dan pengeluaran yang diperkirakan.',
    content: [
      {
        heading: 'Arus kas adalah napas bisnis',
        paragraphs: [
          'Banyak bisnis terlihat untung di laporan, tetapi kesulitan membayar operasional karena arus kas tidak dikelola dengan baik. Proyeksi cash flow membantu Anda melihat apakah uang masuk benar-benar cukup untuk menutup biaya keluar pada periode mendatang. Dengan pandangan ini, Anda bisa mengambil keputusan lebih awal sebelum masalah muncul.',
          'Tool ini cocok dipakai untuk skenario sederhana seperti omzet bulanan, biaya gaji, biaya langganan, sewa, atau pembelian stok. Anda dapat mengisi beberapa bulan ke depan dan melihat tren saldo kas secara lebih intuitif.',
        ],
      },
      {
        heading: 'Manfaat untuk perencanaan',
        paragraphs: [
          'Saat Anda tahu bulan mana yang berpotensi defisit, Anda bisa menyiapkan cadangan kas atau menggeser jadwal pengeluaran. Ini sangat penting bagi UMKM dan bisnis yang pendapatannya tidak stabil setiap bulan. Proyeksi sederhana sering kali sudah cukup untuk mencegah keputusan yang terlalu berisiko.',
          'Seiring pertumbuhan situs, tool ini juga mudah dikembangkan menjadi versi yang lebih lengkap dengan kategori pemasukan, pengeluaran rutin, dan analisis saldo kumulatif. Struktur data terpusat menjaga semuanya tetap rapi.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah ini pembukuan lengkap?',
        answer: 'Bukan. Ini adalah forecast sederhana untuk membantu melihat arah cash flow secara cepat.',
      },
      {
        question: 'Bisa dipakai untuk bisnis kecil?',
        answer: 'Sangat bisa, karena tampilannya ringan dan inputnya mudah disesuaikan.',
      },
    ],
    relatedSlugs: ['loan-calculator', 'break-even-point', 'invoice-generator'],
  },
  {
    slug: 'percentage-calculator',
    title: 'Percentage Calculator',
    description: 'Hitung persentase dari nilai, kenaikan, penurunan, dan perubahan angka.',
    category: 'Utilitas',
    component: () => import('@/components/tools/PercentageCalculatorTool.vue'),
    seoTitle: 'Percentage Calculator Online | Hitung Persentase',
    seoDescription:
      'Hitung persentase dari nilai, kenaikan, penurunan, dan perubahan angka dengan cepat.',
    intro:
      'Kalkulator persentase berguna untuk diskon, pertumbuhan, perubahan omzet, margin, dan banyak kebutuhan bisnis lainnya. Tool ini menyederhanakan hitungan yang sering muncul dalam laporan harian.',
    content: [
      {
        heading: 'Persentase sering muncul di banyak konteks',
        paragraphs: [
          'Mulai dari diskon, pajak, growth rate, hingga perubahan harga, persentase hampir selalu muncul dalam bisnis. Meski rumusnya sederhana, salah input sedikit saja bisa menghasilkan keputusan yang keliru. Tool ini menyatukan beberapa kebutuhan umum agar Anda bisa menghitung cepat tanpa pindah alat.',
          'Dengan tampilan yang sederhana, pengguna bisa memahami hasil secara langsung. Ini berguna bagi tim sales, operasional, maupun pemilik bisnis yang perlu membaca angka dengan cepat dalam rapat atau saat negosiasi harga.',
        ],
      },
      {
        heading: 'Lebih mudah dibanding hitung manual',
        paragraphs: [
          'Alih-alih menulis rumus di kalkulator fisik atau spreadsheet, cukup masukkan nilai dasar dan persentasenya. Hasil yang rapi dan konsisten membantu mengurangi kesalahan perhitungan, terutama ketika Anda harus membandingkan beberapa skenario dalam waktu singkat.',
          'Tool ini juga membuka peluang untuk turunan konten SEO yang luas, karena halaman persentase sangat relevan untuk pengguna umum maupun pencarian bisnis yang lebih spesifik.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah bisa menghitung kenaikan dan penurunan?',
        answer: 'Bisa. Tool ini dirancang untuk kebutuhan perubahan angka yang paling umum.',
      },
      {
        question: 'Apakah tool ini cocok untuk diskon?',
        answer: 'Ya, sangat cocok karena diskon pada dasarnya juga perhitungan persentase.',
      },
    ],
    relatedSlugs: ['kalkulator-diskon', 'kalkulator-margin', 'kalkulator-ppn'],
  },
  {
    slug: 'price-markup-calculator',
    title: 'Price Markup Calculator',
    description: 'Hitung harga jual dari modal, markup, dan target margin secara cepat.',
    category: 'Harga',
    component: () => import('@/components/tools/PriceMarkupCalculatorTool.vue'),
    seoTitle: 'Price Markup Calculator | Hitung Harga Jual',
    seoDescription:
      'Hitung harga jual dari modal, markup, dan target margin secara cepat untuk keputusan pricing.',
    intro:
      'Tool markup membantu Anda menentukan harga jual yang sesuai dengan target keuntungan. Cocok untuk reseller, UMKM, dan siapa pun yang ingin menata pricing dengan lebih terukur.',
    content: [
      {
        heading: 'Markup membantu menentukan harga jual',
        paragraphs: [
          'Banyak pelaku usaha tahu berapa modal mereka, tetapi belum tentu tahu harga jual yang ideal. Dengan markup, Anda bisa menambahkan persentase tertentu di atas modal untuk mendapatkan harga jual yang tetap kompetitif namun masih sehat bagi profit. Ini berguna saat menyusun katalog atau daftar harga.',
          'Harga jual yang baik tidak hanya menutup modal, tetapi juga menyisakan ruang untuk biaya operasional, promosi, dan risiko retur. Karena itu, markup sebaiknya dihitung secara konsisten agar margin tidak terkikis diam-diam.',
        ],
      },
      {
        heading: 'Cocok untuk bisnis produk dan jasa',
        paragraphs: [
          'Tool ini dapat digunakan untuk produk fisik, jasa kreatif, atau penawaran paket. Saat Anda mengetahui markup yang sesuai, proses negosiasi dengan pelanggan jadi lebih tenang karena angka dasar sudah ditetapkan secara rasional.',
          'Dengan struktur modular, tool ini mudah dijadikan pintu masuk ke konten lain seperti margin calculator, break even point, dan invoice generator yang saling terhubung secara internal.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah markup sama dengan margin?',
        answer: 'Tidak sama. Markup dihitung dari modal, sementara margin dihitung dari harga jual.',
      },
      {
        question: 'Apakah ini berguna untuk reseller?',
        answer: 'Sangat berguna, karena reseller sering perlu menentukan harga jual dari modal dan target profit.',
      },
    ],
    relatedSlugs: ['kalkulator-margin', 'break-even-point', 'percentage-calculator'],
  },
  {
    slug: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    description: 'Hitung pertumbuhan investasi dan bunga majemuk secara bertahap.',
    category: 'Investasi',
    component: () => import('@/components/tools/CompoundInterestCalculatorTool.vue'),
    seoTitle: 'Compound Interest Calculator | Hitung Bunga Majemuk',
    seoDescription:
      'Hitung pertumbuhan investasi dan bunga majemuk secara bertahap untuk perencanaan finansial.',
    intro:
      'Bunga majemuk membantu Anda melihat bagaimana nilai investasi tumbuh dari waktu ke waktu. Tool ini berguna untuk simulasi sederhana, perbandingan skenario, dan edukasi finansial.',
    content: [
      {
        heading: 'Mengapa bunga majemuk menarik?',
        paragraphs: [
          'Bunga majemuk bekerja dengan cara menambahkan hasil ke pokok awal, sehingga periode berikutnya dihitung dari jumlah yang lebih besar. Mekanisme ini membuat pertumbuhan bisa terasa lebih cepat dibanding bunga sederhana. Untuk perencanaan jangka panjang, pemahaman ini sangat penting.',
          'Dengan simulasi yang mudah dipakai, pengguna bisa mengubah modal awal, tingkat bunga, dan durasi untuk melihat proyeksi akhir. Ini membantu memahami kekuatan waktu dalam investasi, tanpa harus membuka kalkulator finansial yang kompleks.',
        ],
      },
      {
        heading: 'Cocok untuk edukasi dan perencanaan',
        paragraphs: [
          'Alat ini bukan nasihat investasi, tetapi sangat berguna untuk ilustrasi dan pembelajaran. Saat pengguna memahami efek compounding, mereka biasanya lebih mudah melihat kenapa konsistensi setoran dan durasi investasi sangat berpengaruh terhadap hasil akhir.',
          'Ke depan, Anda bisa menambahkan fitur setoran bulanan, inflasi, atau target nilai akhir tanpa mengubah fondasi arsitektur situs.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah ini alat investasi resmi?',
        answer: 'Bukan. Ini adalah alat simulasi dan edukasi untuk membantu memahami bunga majemuk.',
      },
      {
        question: 'Apakah bisa dipakai untuk perencanaan jangka panjang?',
        answer: 'Ya, terutama untuk melihat dampak waktu dan bunga terhadap pertumbuhan nilai.',
      },
    ],
    relatedSlugs: ['loan-calculator', 'cash-flow-forecast', 'percentage-calculator'],
  },
  {
    slug: 'roi-calculator',
    title: 'ROI Calculator',
    description: 'Hitung return on investment, profit bersih, dan persentase ROI dari suatu proyek.',
    category: 'Investasi',
    component: () => import('@/components/tools/RoiCalculatorTool.vue'),
    seoTitle: 'ROI Calculator Online | Hitung Return on Investment',
    seoDescription:
      'Hitung return on investment, profit bersih, dan persentase ROI dari suatu proyek atau kampanye.',
    intro:
      'ROI calculator membantu Anda menilai apakah sebuah investasi, kampanye, atau proyek benar-benar menghasilkan nilai yang sepadan. Ini berguna untuk bisnis yang ingin mengambil keputusan berbasis data.',
    content: [
      {
        heading: 'ROI membantu membandingkan efisiensi investasi',
        paragraphs: [
          'Return on investment adalah metrik yang sangat umum digunakan untuk menilai efisiensi modal. Dengan membandingkan keuntungan bersih terhadap biaya investasi, Anda bisa melihat apakah suatu proyek layak diteruskan, diperbesar, atau dihentikan.',
          'Tool ini cocok untuk kampanye iklan, pembelian alat produksi, proyek freelance, atau peluncuran produk baru. Dengan angka yang sederhana, Anda bisa menilai performa keuangan tanpa perlu laporan yang rumit.',
        ],
      },
      {
        heading: 'Cocok untuk keputusan cepat',
        paragraphs: [
          'Banyak keputusan bisnis harus dibuat cepat. ROI calculator memberi pandangan awal yang mudah dipahami sebelum data yang lebih lengkap dianalisis lebih jauh. Ini membantu tim tetap gesit namun tetap rasional.',
          'Arsitektur situs memungkinkan tool ini tumbuh bersama kebutuhan konten lain seperti cash flow forecast, margin, dan break even point agar insight yang diberikan semakin lengkap.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah ROI selalu dinyatakan dalam persen?',
        answer: 'Ya, biasanya ROI ditampilkan sebagai persentase agar mudah dibandingkan antar proyek.',
      },
      {
        question: 'Apakah ROI sama dengan profit?',
        answer: 'Tidak sama. Profit adalah nominal keuntungan, sedangkan ROI adalah persentase efisiensi dari modal yang dipakai.',
      },
    ],
    relatedSlugs: ['break-even-point', 'cash-flow-forecast', 'compound-interest-calculator'],
  },
  {
    slug: 'net-profit-margin-calculator',
    title: 'Net Profit Margin Calculator',
    description: 'Hitung margin laba bersih setelah biaya operasional dan beban lain dipotong.',
    category: 'Keuangan',
    component: () => import('@/components/tools/NetProfitMarginCalculatorTool.vue'),
    seoTitle: 'Net Profit Margin Calculator | Hitung Laba Bersih',
    seoDescription:
      'Hitung margin laba bersih setelah biaya operasional, pajak, dan beban lain dipotong.',
    intro:
      'Tool ini membantu Anda melihat seberapa besar laba bersih yang benar-benar tersisa setelah seluruh biaya dihitung. Cocok untuk evaluasi bisnis yang ingin menjaga profit tetap sehat.',
    content: [
      {
        heading: 'Laba bersih memberi gambaran yang lebih jujur',
        paragraphs: [
          'Pendapatan tinggi tidak selalu berarti bisnis sehat. Margin laba bersih menunjukkan seberapa besar sisa yang benar-benar dapat dinikmati setelah biaya operasional, promosi, beban administrasi, dan biaya lain diperhitungkan. Itulah sebabnya metrik ini penting untuk dibaca secara rutin.',
          'Dengan input yang sederhana, pengguna dapat melihat apakah penjualan sudah cukup efisien atau masih terlalu banyak biaya bocor di tengah jalan. Hasilnya membantu tim keuangan dan pemilik usaha membuat keputusan yang lebih terukur.',
        ],
      },
      {
        heading: 'Berguna untuk evaluasi berkala',
        paragraphs: [
          'Bagi UMKM maupun bisnis yang sudah berjalan, evaluasi margin laba bersih secara berkala membantu mendeteksi penurunan efisiensi lebih dini. Anda bisa membandingkan bulan ke bulan atau proyek ke proyek tanpa perlu membangun spreadsheet yang rumit.',
          'Tool ini melengkapi kalkulator margin yang sudah ada sehingga pengguna dapat membedakan antara margin kotor dan margin bersih dengan lebih mudah.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apa bedanya margin bersih dan margin kotor?',
        answer: 'Margin kotor menghitung laba sebelum beban operasional, sedangkan margin bersih menghitung sisa setelah semua beban utama dipotong.',
      },
      {
        question: 'Apakah tool ini cocok untuk laporan bisnis?',
        answer: 'Cocok sebagai simulasi atau evaluasi awal sebelum laporan formal disusun.',
      },
    ],
    relatedSlugs: ['kalkulator-margin', 'cash-flow-forecast', 'roi-calculator'],
  },
  {
    slug: 'salary-take-home-calculator',
    title: 'Salary Take Home Calculator',
    description: 'Hitung gaji bersih setelah potongan dasar, pajak, dan kontribusi lainnya.',
    category: 'Personal Finance',
    component: () => import('@/components/tools/SalaryTakeHomeCalculatorTool.vue'),
    seoTitle: 'Salary Take Home Calculator | Hitung Gaji Bersih',
    seoDescription:
      'Hitung gaji bersih setelah potongan dasar, pajak, dan kontribusi lainnya dengan cepat.',
    intro:
      'Tool ini membantu karyawan dan freelancer memperkirakan gaji bersih yang benar-benar diterima. Cocok untuk perencanaan bulanan dan evaluasi penawaran kerja.',
    content: [
      {
        heading: 'Gaji bruto dan gaji bersih sering berbeda jauh',
        paragraphs: [
          'Dalam banyak kasus, angka gaji yang terlihat di kontrak bukanlah jumlah yang masuk ke rekening. Setelah dipotong pajak, iuran, atau komponen lain, nilai bersih yang diterima bisa berbeda cukup jauh. Karena itu, kalkulator take home pay membantu memberi ekspektasi yang lebih realistis.',
          'Dengan memahami nominal bersih sejak awal, seseorang dapat merencanakan biaya hidup, cicilan, dan tabungan dengan lebih baik. Tool ini juga bermanfaat saat membandingkan beberapa tawaran pekerjaan.',
        ],
      },
      {
        heading: 'Membantu perencanaan pribadi',
        paragraphs: [
          'Keuangan pribadi menjadi lebih sehat ketika pemasukan bersih dipahami sejak awal. Tool ini memberi ruang untuk simulasi yang cepat sehingga Anda tidak hanya melihat angka besar di atas kertas, tetapi juga angka yang benar-benar tersedia untuk dipakai.',
          'Situs ini dapat dikembangkan lebih lanjut ke arah kalkulator pajak atau simulasi kompensasi karyawan, namun struktur dasarnya tetap sama: data-driven, modular, dan mudah dipelihara.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah ini pengganti perhitungan payroll?',
        answer: 'Bukan. Ini adalah estimasi sederhana untuk perencanaan pribadi atau awal negosiasi.',
      },
      {
        question: 'Apakah cocok untuk freelancer?',
        answer: 'Cocok, terutama untuk memperkirakan pendapatan bersih setelah potongan tertentu.',
      },
    ],
    relatedSlugs: ['percentage-calculator', 'cash-flow-forecast', 'roi-calculator'],
  },
  {
    slug: 'savings-goal-calculator',
    title: 'Savings Goal Calculator',
    description: 'Hitung target tabungan bulanan untuk mencapai tujuan finansial tertentu.',
    category: 'Personal Finance',
    component: () => import('@/components/tools/SavingsGoalCalculatorTool.vue'),
    seoTitle: 'Savings Goal Calculator | Target Tabungan Bulanan',
    seoDescription:
      'Hitung target tabungan bulanan untuk mencapai tujuan finansial tertentu secara terukur.',
    intro:
      'Savings goal calculator membantu Anda menentukan berapa yang harus disisihkan setiap bulan agar tujuan keuangan tercapai tepat waktu. Cocok untuk dana darurat, liburan, atau pembelian aset.',
    content: [
      {
        heading: 'Tujuan finansial perlu angka yang konkret',
        paragraphs: [
          'Menetapkan target tabungan tanpa angka sering kali membuat rencana terasa abstrak. Dengan kalkulator ini, Anda bisa melihat berapa nominal bulanan yang perlu disisihkan berdasarkan target akhir dan tenggat waktu yang diinginkan.',
          'Alat seperti ini membuat tujuan keuangan lebih mudah dieksekusi. Daripada sekadar berniat menabung, Anda punya jadwal yang lebih jelas dan bisa mengevaluasi apakah target masih realistis atau perlu disesuaikan.',
        ],
      },
      {
        heading: 'Berguna untuk disiplin keuangan',
        paragraphs: [
          'Ketika target tabungan terlihat jelas, disiplin finansial menjadi lebih mudah dibangun. Pengguna bisa memutuskan berapa yang harus dialokasikan setiap bulan dan menyesuaikannya dengan pengeluaran rutin.',
          'Tool ini juga melengkapi halaman lain di situs ini karena banyak keputusan bisnis dan pribadi pada akhirnya membutuhkan pengelolaan cash flow yang sehat.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah ini menghitung bunga tabungan?',
        answer: 'Versi dasar fokus pada target nominal sederhana, namun struktur situs memungkinkan pengembangan bunga di masa depan.',
      },
      {
        question: 'Apakah cocok untuk dana darurat?',
        answer: 'Cocok, karena dana darurat juga butuh target dan jadwal setoran yang jelas.',
      },
    ],
    relatedSlugs: ['cash-flow-forecast', 'percentage-calculator', 'compound-interest-calculator'],
  },
  {
    slug: 'flat-installment-calculator',
    title: 'Flat Installment Calculator',
    description: 'Hitung cicilan flat dengan pokok dan bunga bulanan yang stabil.',
    category: 'Kredit',
    component: () => import('@/components/tools/FlatInstallmentCalculatorTool.vue'),
    seoTitle: 'Flat Installment Calculator | Hitung Cicilan Flat',
    seoDescription:
      'Hitung cicilan flat dengan pokok dan bunga bulanan yang stabil untuk simulasi kredit.',
    intro:
      'Cicilan flat sering dipakai untuk simulasi pinjaman sederhana karena pola pembayarannya mudah dipahami. Tool ini membantu menghitung cicilan tetap, total bunga, dan total pembayaran.',
    content: [
      {
        heading: 'Apa itu cicilan flat?',
        paragraphs: [
          'Pada skema flat, bunga biasanya dihitung dari pokok awal lalu dibagi merata selama tenor. Hasilnya, cicilan bulanan terlihat stabil dan mudah diprediksi. Ini memudahkan pengguna memahami kewajiban pembayaran sejak awal.',
          'Meski sederhana, skema ini tetap perlu dihitung dengan benar agar calon peminjam tidak salah membaca total biaya yang harus disiapkan selama masa pinjaman.',
        ],
      },
      {
        heading: 'Berguna untuk simulasi awal',
        paragraphs: [
          'Tool ini cocok untuk membandingkan pinjaman, kredit barang, atau pembiayaan usaha dengan skema flat. Dengan hasil yang cepat dan jelas, pengguna dapat menilai apakah produk kredit tertentu masuk akal atau tidak.',
          'Karena situs ini dirancang modular, penambahan metode perhitungan seperti flat, efektif, atau anuitas tetap dapat dilakukan tanpa mengubah halaman lain secara besar-besaran.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah cicilan flat sama dengan anuitas?',
        answer: 'Tidak. Cicilan flat relatif stabil, sedangkan anuitas memiliki komposisi bunga dan pokok yang berubah dari waktu ke waktu.',
      },
      {
        question: 'Apakah tool ini cocok untuk pembanding kredit?',
        answer: 'Ya, sangat cocok sebagai simulasi awal sebelum membandingkan beberapa produk kredit.',
      },
    ],
    relatedSlugs: ['loan-calculator', 'roi-calculator', 'break-even-point'],
  },
  {
    slug: 'working-capital-calculator',
    title: 'Working Capital Calculator',
    description: 'Hitung kebutuhan modal kerja untuk menjaga operasional bisnis tetap lancar.',
    category: 'Operasional',
    component: () => import('@/components/tools/WorkingCapitalCalculatorTool.vue'),
    seoTitle: 'Working Capital Calculator Online | Hitung Modal Kerja Bisnis',
    seoDescription:
      'Hitung kebutuhan modal kerja bisnis online gratis untuk operasional, stok, dan biaya rutin.',
    intro:
      'Working capital calculator membantu Anda mengetahui berapa modal kerja yang dibutuhkan agar bisnis bisa berjalan stabil. Tool ini cocok untuk usaha kecil, distributor, dan toko online yang butuh arus kas sehat.',
    content: [
      {
        heading: 'Modal kerja adalah bahan bakar operasional',
        paragraphs: [
          'Tanpa modal kerja yang cukup, bisnis yang omzetnya bagus pun dapat tersendat. Anda tetap perlu membayar stok, gaji, sewa, logistik, dan biaya operasional lain sebelum pembayaran dari pelanggan benar-benar masuk. Karena itu, memahami kebutuhan modal kerja sangat penting agar bisnis tidak kekurangan dana di tengah jalan.',
          'Tool ini membantu memberikan estimasi dasar berdasarkan komponen biaya yang paling sering muncul. Hasilnya bisa dipakai sebagai acuan awal untuk mengatur kas, mencari pembiayaan, atau menambah buffer likuiditas.',
        ],
      },
      {
        heading: 'Cocok untuk skala bisnis yang sedang tumbuh',
        paragraphs: [
          'Ketika bisnis mulai berkembang, kebutuhan stok dan beban operasional biasanya ikut naik. Dengan kalkulator modal kerja, Anda dapat menilai apakah dana yang tersedia masih cukup atau perlu tambahan cadangan. Ini membantu mencegah gangguan operasional yang tidak perlu.',
          'Situs ini juga dapat memperluas tema keuangan operasional lain seperti cash flow forecast dan break even point, sehingga pengunjung punya jalur pembelajaran yang saling terhubung.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah tool ini cocok untuk usaha online?',
        answer: 'Ya, sangat cocok untuk toko online, reseller, dan bisnis yang butuh persediaan atau biaya operasional rutin.',
      },
      {
        question: 'Apakah hasilnya final?',
        answer: 'Tidak. Hasilnya adalah estimasi awal untuk membantu perencanaan modal kerja.',
      },
    ],
    relatedSlugs: ['cash-flow-forecast', 'break-even-point', 'invoice-generator'],
  },
  {
    slug: 'gross-margin-calculator',
    title: 'Gross Margin Calculator',
    description: 'Hitung gross margin dari revenue dan cost of goods sold dengan cepat.',
    category: 'Keuangan',
    component: () => import('@/components/tools/GrossMarginCalculatorTool.vue'),
    seoTitle: 'Gross Margin Calculator Online | Hitung Margin Kotor',
    seoDescription:
      'Hitung gross margin kotor bisnis online gratis dari revenue dan cost of goods sold.',
    intro:
      'Gross margin calculator membantu Anda memahami margin kotor sebelum biaya operasional lain dihitung. Tool ini penting untuk menilai efisiensi produk, toko, atau layanan.',
    content: [
      {
        heading: 'Margin kotor menunjukkan efisiensi inti',
        paragraphs: [
          'Gross margin memberi gambaran awal seberapa besar keuntungan yang tersisa setelah biaya pokok produk atau jasa dikurangi dari pendapatan. Metrik ini sering digunakan untuk menilai apakah pricing dan sourcing sudah efisien atau masih perlu diperbaiki.',
          'Dengan angka yang sederhana, Anda dapat membandingkan performa beberapa produk dan melihat mana yang paling sehat secara margin. Ini sangat membantu saat menyusun katalog dan prioritas stok.',
        ],
      },
      {
        heading: 'Bermanfaat untuk analisis produk',
        paragraphs: [
          'Jika margin kotor terlalu kecil, bisnis bisa tampak sibuk tetapi kurang menghasilkan laba yang layak. Tool ini membantu Anda mendeteksi kondisi tersebut lebih cepat sehingga keputusan pricing dapat dilakukan sebelum margin terkikis lebih jauh.',
          'Halaman ini juga memberi jalur internal ke tool margin bersih, ROI, dan modal kerja agar pengguna bisa menelusuri analisis yang lebih lengkap secara bertahap.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apa beda gross margin dan net margin?',
        answer: 'Gross margin menghitung laba sebelum biaya operasional, sedangkan net margin menghitung laba setelah semua beban utama dipotong.',
      },
      {
        question: 'Apakah cocok untuk reseller?',
        answer: 'Sangat cocok, karena reseller perlu melihat apakah harga jual masih menyisakan margin yang sehat.',
      },
    ],
    relatedSlugs: ['kalkulator-margin', 'net-profit-margin-calculator', 'price-markup-calculator'],
  },
  {
    slug: 'revenue-projection-calculator',
    title: 'Revenue Projection Calculator',
    description: 'Proyeksikan pendapatan bisnis dari target unit, harga jual, dan periode penjualan.',
    category: 'Forecast',
    component: () => import('@/components/tools/RevenueProjectionCalculatorTool.vue'),
    seoTitle: 'Revenue Projection Calculator | Proyeksi Pendapatan Bisnis',
    seoDescription:
      'Proyeksikan pendapatan bisnis online gratis dari target unit, harga jual, dan periode penjualan.',
    intro:
      'Revenue projection calculator membantu Anda memperkirakan pendapatan berdasarkan asumsi penjualan yang realistis. Cocok untuk campaign, rencana stok, dan target bulanan.',
    content: [
      {
        heading: 'Proyeksi pendapatan membantu perencanaan',
        paragraphs: [
          'Saat bisnis ingin tumbuh, target pendapatan perlu dihitung dengan asumsi yang jelas. Tool ini memberikan gambaran awal tentang berapa omzet yang bisa diharapkan berdasarkan volume unit dan harga jual yang Anda tetapkan.',
          'Dengan proyeksi yang sederhana, Anda dapat menilai apakah target bulanan masih masuk akal, apakah strategi promosi perlu diperkuat, atau apakah stok harus dinaikkan lebih awal.',
        ],
      },
      {
        heading: 'Cocok untuk campaign dan forecasting',
        paragraphs: [
          'Revenue projection sering dipakai saat menyusun strategi campaign, peluncuran produk, atau perencanaan kuartalan. Dengan alat ini, Anda bisa membuat skenario cepat tanpa harus menyiapkan spreadsheet yang kompleks.',
          'Halaman ini juga terhubung dengan cash flow forecast dan ROI, sehingga pengunjung dapat berpindah dari proyeksi pendapatan ke analisis hasil secara alami.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah ini menghitung laba?',
        answer: 'Tidak langsung. Tool ini fokus pada proyeksi pendapatan, bukan laba bersih.',
      },
      {
        question: 'Apakah bisa untuk target produk baru?',
        answer: 'Ya, sangat cocok untuk simulasi pendapatan produk atau campaign baru.',
      },
    ],
    relatedSlugs: ['cash-flow-forecast', 'roi-calculator', 'working-capital-calculator'],
  },
  {
    slug: 'expense-ratio-calculator',
    title: 'Expense Ratio Calculator',
    description: 'Hitung rasio biaya terhadap pendapatan untuk melihat efisiensi pengeluaran.',
    category: 'Analisis',
    component: () => import('@/components/tools/ExpenseRatioCalculatorTool.vue'),
    seoTitle: 'Expense Ratio Calculator Online | Hitung Rasio Biaya',
    seoDescription:
      'Hitung rasio biaya bisnis online gratis untuk melihat efisiensi pengeluaran terhadap pendapatan.',
    intro:
      'Expense ratio calculator membantu Anda memahami seberapa besar porsi biaya terhadap pendapatan. Tool ini cocok untuk menilai efisiensi dan menemukan area penghematan.',
    content: [
      {
        heading: 'Rasio biaya membantu mengontrol efisiensi',
        paragraphs: [
          'Semakin besar biaya dibandingkan pendapatan, semakin kecil ruang profit yang tersisa. Rasio biaya memberikan sinyal cepat apakah struktur pengeluaran masih sehat atau perlu dievaluasi ulang. Ini sangat berguna untuk bisnis yang mulai tumbuh namun belum merasa arus kasnya benar-benar stabil.',
          'Dengan kalkulator ini, Anda bisa memantau perbandingan antara biaya dan pendapatan tanpa perlu membuka laporan yang panjang. Hasilnya langsung bisa dipakai untuk diskusi internal atau evaluasi bulanan.',
        ],
      },
      {
        heading: 'Mudah dipakai untuk review rutin',
        paragraphs: [
          'Tool ini cocok dipakai pada akhir bulan atau akhir proyek untuk melihat apakah biaya masih proporsional. Bila rasio biaya naik terlalu tinggi, Anda dapat segera mencari sumber pemborosan atau menyesuaikan pricing.',
          'Karena satu situs ini mengumpulkan banyak tool keuangan, pengguna dapat berpindah dari expense ratio ke net margin, cash flow, atau ROI untuk analisis yang lebih lengkap.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah expense ratio sama dengan margin?',
        answer: 'Tidak sama. Expense ratio melihat porsi biaya terhadap pendapatan, sedangkan margin melihat sisa laba.',
      },
      {
        question: 'Apakah tool ini berguna untuk freelancer?',
        answer: 'Ya, terutama untuk mengukur apakah biaya operasional masih wajar terhadap penghasilan.',
      },
    ],
    relatedSlugs: ['net-profit-margin-calculator', 'cash-flow-forecast', 'roi-calculator'],
  },
  {
    slug: 'tax-inclusive-price-calculator',
    title: 'Tax Inclusive Price Calculator',
    description: 'Hitung harga termasuk pajak, harga dasar, dan komponen PPN secara cepat.',
    category: 'Pajak',
    component: () => import('@/components/tools/TaxInclusivePriceCalculatorTool.vue'),
    seoTitle: 'Tax Inclusive Price Calculator | Hitung Harga Termasuk Pajak',
    seoDescription:
      'Hitung harga termasuk pajak, harga dasar, dan PPN secara cepat untuk penawaran dan invoice.',
    intro:
      'Tax inclusive price calculator membantu Anda memisahkan harga dasar dan pajak atau menambahkan pajak ke harga awal. Tool ini cocok untuk invoice, katalog, dan quotation.',
    content: [
      {
        heading: 'Harga termasuk pajak harus transparan',
        paragraphs: [
          'Dalam banyak transaksi, pelanggan ingin tahu berapa harga bersih dan berapa bagian pajaknya. Dengan kalkulator ini, Anda bisa menjelaskan struktur harga secara transparan, sehingga dokumen penawaran maupun invoice terlihat lebih profesional.',
          'Tool ini juga membantu saat Anda menerima angka final dan perlu tahu berapa nilai dasar sebelum pajak ditambahkan. Ini membuat komunikasi harga jadi lebih jelas dan minim salah paham.',
        ],
      },
      {
        heading: 'Relevan untuk bisnis yang sering berurusan dengan PPN',
        paragraphs: [
          'Untuk bisnis yang sering bekerja dengan harga final, mengetahui komponen pajak sangat penting. Tool ini membantu proses tersebut agar lebih cepat, terutama saat membuat penawaran atau menyesuaikan harga jual.',
          'Halaman ini bersifat sangat relevan dengan invoice generator dan kalkulator PPN yang sudah ada, sehingga pengguna mendapatkan rangkaian tools pajak yang saling terhubung.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah ini sama dengan kalkulator PPN?',
        answer: 'Mirip, tetapi fokusnya pada harga final yang sudah termasuk pajak dan bagaimana memecahnya menjadi komponen dasar.',
      },
      {
        question: 'Apakah bisa untuk invoice?',
        answer: 'Ya, sangat cocok untuk menyusun invoice yang mencantumkan nilai dasar dan pajak secara jelas.',
      },
    ],
    relatedSlugs: ['kalkulator-ppn', 'invoice-generator', 'price-markup-calculator'],
  },
  {
    slug: 'profit-calculator',
    title: 'Profit Calculator',
    description: 'Hitung profit bersih, laba, dan persentase keuntungan dari revenue dan biaya.',
    category: 'Keuangan',
    component: () => import('@/components/tools/ProfitCalculatorTool.vue'),
    seoTitle: 'Profit Calculator Online | Hitung Laba Bersih Bisnis',
    seoDescription:
      'Hitung profit bersih, laba, dan persentase keuntungan dari revenue dan biaya secara cepat.',
    intro:
      'Profit calculator membantu Anda melihat laba bisnis dengan cara yang sederhana dan cepat. Tool ini berguna untuk mengevaluasi produk, proyek, dan penawaran yang sedang berjalan.',
    content: [
      {
        heading: 'Profit adalah inti dari banyak keputusan bisnis',
        paragraphs: [
          'Tanpa mengetahui profit, Anda hanya melihat omzet tanpa tahu apakah usaha benar-benar menghasilkan uang. Tool ini membantu memisahkan pendapatan dan biaya sehingga laba bisa dihitung dengan lebih jelas. Hasilnya dapat dipakai untuk menilai performa produk, kampanye, atau periode penjualan tertentu.',
          'Dengan tampilan yang sederhana, pengguna dapat langsung melihat nominal profit dan persentasenya. Ini sangat berguna bagi bisnis yang butuh evaluasi cepat sebelum rapat, diskusi stok, atau penyesuaian harga.',
        ],
      },
      {
        heading: 'Cocok untuk evaluasi cepat',
        paragraphs: [
          'Profit calculator dapat dipakai baik oleh pemilik bisnis maupun freelancer. Ketika biaya meningkat atau margin turun, Anda bisa segera melihat dampaknya terhadap laba. Informasi ini membantu menjaga keputusan tetap berbasis data.',
          'Halaman ini juga saling terhubung dengan gross margin, net profit margin, dan ROI sehingga pengunjung bisa melanjutkan analisis tanpa meninggalkan situs.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah profit sama dengan omzet?',
        answer: 'Tidak. Omzet adalah pendapatan kotor, sedangkan profit adalah sisa setelah biaya dikurangi.',
      },
      {
        question: 'Apakah tool ini cocok untuk penjualan produk?',
        answer: 'Ya, sangat cocok untuk menilai apakah produk masih menyisakan laba yang sehat.',
      },
    ],
    relatedSlugs: ['gross-margin-calculator', 'net-profit-margin-calculator', 'roi-calculator'],
  },
  {
    slug: 'loan-affordability-calculator',
    title: 'Loan Affordability Calculator',
    description: 'Hitung kemampuan cicilan berdasarkan penghasilan dan rasio aman bulanan.',
    category: 'Kredit',
    component: () => import('@/components/tools/LoanAffordabilityCalculatorTool.vue'),
    seoTitle: 'Loan Affordability Calculator | Cek Kemampuan Pinjaman',
    seoDescription:
      'Hitung kemampuan cicilan berdasarkan penghasilan dan rasio aman bulanan untuk pinjaman yang lebih sehat.',
    intro:
      'Tool ini membantu Anda mengetahui berapa besar cicilan yang masih aman berdasarkan penghasilan bulanan. Cocok untuk perencanaan kredit pribadi maupun bisnis.',
    content: [
      {
        heading: 'Kemampuan bayar harus dihitung sejak awal',
        paragraphs: [
          'Sebelum mengambil pinjaman, yang paling penting bukan hanya jumlah dana yang diterima, tetapi apakah cicilannya masih aman dibayar tiap bulan. Tool ini memberi estimasi kemampuan angsuran berdasarkan penghasilan dan rasio aman yang Anda pilih.',
          'Dengan pendekatan sederhana, Anda bisa menghindari beban cicilan yang terlalu berat dan menjaga cash flow tetap sehat, baik untuk keuangan pribadi maupun bisnis.',
        ],
      },
      {
        heading: 'Membantu keputusan kredit lebih sehat',
        paragraphs: [
          'Saat membandingkan produk kredit, affordability calculator membantu Anda menyaring opsi yang realistis. Ini sangat berguna untuk pembelian aset, modal usaha, atau pembiayaan personal.',
          'Tool ini terhubung dengan loan calculator, flat installment calculator, dan cash flow forecast agar keputusan pembiayaan bisa dievaluasi dari berbagai sisi.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah ini menghitung limit pinjaman?',
        answer: 'Secara tidak langsung, ya. Tool ini memperkirakan cicilan yang masih aman berdasarkan penghasilan.',
      },
      {
        question: 'Apakah cocok untuk cek pinjaman pribadi?',
        answer: 'Sangat cocok untuk mengecek batas cicilan yang wajar sebelum mengajukan pinjaman.',
      },
    ],
    relatedSlugs: ['loan-calculator', 'flat-installment-calculator', 'cash-flow-forecast'],
  },
  {
    slug: 'payment-due-date-calculator',
    title: 'Payment Due Date Calculator',
    description: 'Hitung tanggal jatuh tempo invoice berdasarkan tanggal terbit dan termin pembayaran.',
    category: 'Invoice',
    component: () => import('@/components/tools/PaymentDueDateCalculatorTool.vue'),
    seoTitle: 'Payment Due Date Calculator | Hitung Jatuh Tempo Invoice',
    seoDescription:
      'Hitung tanggal jatuh tempo invoice berdasarkan tanggal terbit dan termin pembayaran dengan cepat.',
    intro:
      'Tool ini membantu Anda menentukan tanggal jatuh tempo invoice agar proses penagihan lebih rapi dan mudah dipantau. Cocok untuk freelancer, UMKM, dan tim administrasi.',
    content: [
      {
        heading: 'Jatuh tempo yang jelas mempercepat pembayaran',
        paragraphs: [
          'Ketika tanggal jatuh tempo ditentukan dengan jelas, pelanggan lebih mudah memahami batas waktu pembayaran. Hal ini membantu mengurangi kebingungan, memperbaiki komunikasi, dan mempercepat arus kas masuk.',
          'Tool ini bermanfaat untuk invoice yang memakai termin 7 hari, 14 hari, 30 hari, atau skema pembayaran lain yang umum digunakan dalam bisnis.',
        ],
      },
      {
        heading: 'Sangat relevan untuk alur invoice',
        paragraphs: [
          'Karena situs ini juga memiliki invoice generator, pembayaran jatuh tempo menjadi komponen penting untuk melengkapi alur kerja penagihan. Dengan tool ini, Anda dapat menjaga tanggal penagihan dan reminder tetap konsisten.',
          'Internal linking dari tool ini ke invoice generator dan kontak membantu pengguna bergerak dari pembuatan invoice ke pengaturan jadwal penagihan secara lebih natural.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah tool ini bisa untuk termin 30 hari?',
        answer: 'Bisa, Anda tinggal memasukkan jumlah hari termin yang diinginkan.',
      },
      {
        question: 'Apakah cocok untuk freelancer?',
        answer: 'Sangat cocok untuk membantu mengatur invoice dan waktu penagihan.',
      },
    ],
    relatedSlugs: ['invoice-generator', 'cash-flow-forecast', 'loan-calculator'],
  },
  {
    slug: 'unit-cost-calculator',
    title: 'Unit Cost Calculator',
    description: 'Hitung biaya per unit dari total biaya tetap dan variabel.',
    category: 'Operasional',
    component: () => import('@/components/tools/UnitCostCalculatorTool.vue'),
    seoTitle: 'Unit Cost Calculator Online | Hitung Biaya per Unit',
    seoDescription:
      'Hitung biaya per unit dari total biaya tetap dan variabel untuk pricing dan analisis biaya.',
    intro:
      'Unit cost calculator membantu Anda mengetahui biaya per produk atau layanan. Tool ini penting saat menentukan harga jual, margin, dan efisiensi produksi.',
    content: [
      {
        heading: 'Biaya per unit memengaruhi pricing',
        paragraphs: [
          'Mengetahui biaya per unit adalah langkah dasar dalam penentuan harga. Jika biaya per unit tidak dihitung dengan benar, margin bisa tergerus tanpa disadari. Tool ini membantu memisahkan biaya tetap dan variabel lalu membaginya ke jumlah unit yang dihasilkan.',
          'Hasilnya memberi gambaran yang berguna untuk produk fisik, jasa paket, maupun layanan berbasis volume. Dengan data ini, Anda dapat membuat keputusan harga lebih percaya diri.',
        ],
      },
      {
        heading: 'Berguna untuk stok dan produksi',
        paragraphs: [
          'Saat jumlah unit berubah, biaya per unit ikut berubah. Karena itu, tool ini cocok untuk bisnis yang memproduksi atau menjual dalam volume tertentu. Ini membantu memantau apakah skala produksi sudah efisien atau masih terlalu mahal.',
          'Halaman ini juga terhubung dengan gross margin, profit calculator, dan working capital calculator agar alur analisis biaya semakin lengkap.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah biaya per unit sama dengan harga jual?',
        answer: 'Tidak. Biaya per unit adalah modal dasar; harga jual biasanya ditambah margin atau markup.',
      },
      {
        question: 'Apakah cocok untuk jasa?',
        answer: 'Ya, terutama jika jasa dijual dalam paket atau per unit layanan.',
      },
    ],
    relatedSlugs: ['gross-margin-calculator', 'profit-calculator', 'working-capital-calculator'],
  },
  {
    slug: 'simple-interest-calculator',
    title: 'Simple Interest Calculator',
    description: 'Hitung bunga sederhana, total pinjaman, dan nominal akhir dengan mudah.',
    category: 'Keuangan',
    component: () => import('@/components/tools/SimpleInterestCalculatorTool.vue'),
    seoTitle: 'Simple Interest Calculator Online | Hitung Bunga Sederhana',
    seoDescription:
      'Hitung bunga sederhana, total pinjaman, dan nominal akhir dengan mudah untuk simulasi dasar.',
    intro:
      'Simple interest calculator cocok untuk simulasi bunga dasar yang mudah dibaca. Tool ini berguna untuk edukasi finansial, pinjaman sederhana, dan perhitungan cepat.',
    content: [
      {
        heading: 'Bunga sederhana mudah dipahami',
        paragraphs: [
          'Dalam banyak konteks, bunga sederhana lebih mudah dibaca karena dihitung dari pokok awal saja. Ini membuat simulasi pinjaman atau investasi dasar menjadi lebih transparan dan cepat dipahami pengguna.',
          'Tool ini cocok untuk kebutuhan edukasi, simulasi awal, atau perbandingan dengan skema lain seperti bunga majemuk dan anuitas.',
        ],
      },
      {
        heading: 'Berguna untuk perbandingan skema',
        paragraphs: [
          'Dengan hasil yang sederhana, pengguna dapat membandingkan total bunga dan nominal akhir dari berbagai skema. Ini berguna untuk membangun pemahaman sebelum melihat simulasi yang lebih kompleks.',
          'Tool ini melengkapi loan calculator dan compound interest calculator agar situs punya rangkaian alat pembelajaran finansial yang lengkap.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah simple interest sama dengan bunga majemuk?',
        answer: 'Tidak. Simple interest dihitung dari pokok awal, sedangkan bunga majemuk berkembang dari pokok plus bunga yang terakumulasi.',
      },
      {
        question: 'Apakah cocok untuk simulasi pinjaman dasar?',
        answer: 'Ya, sangat cocok untuk simulasi pinjaman dasar atau edukasi finansial.',
      },
    ],
    relatedSlugs: ['compound-interest-calculator', 'loan-calculator', 'roi-calculator'],
  },
  {
    slug: 'discount-reverse-calculator',
    title: 'Discount Reverse Calculator',
    description: 'Hitung harga awal dari harga setelah diskon dan persentase potongan.',
    category: 'Harga',
    component: () => import('@/components/tools/DiscountReverseCalculatorTool.vue'),
    seoTitle: 'Discount Reverse Calculator Online | Hitung Harga Sebelum Diskon',
    seoDescription:
      'Hitung harga awal dari harga setelah diskon dan persentase potongan secara cepat.',
    intro:
      'Tool ini membantu Anda mencari harga sebelum diskon ketika yang diketahui hanya harga akhir dan persentase potongan. Cocok untuk promo, invoice, dan analisis harga jual.',
    content: [
      {
        heading: 'Kenapa harga awal penting?',
        paragraphs: [
          'Dalam banyak kampanye promosi, Anda sering melihat harga akhir tanpa tahu nominal awalnya. Dengan kalkulator ini, Anda bisa menghitung kembali harga sebelum diskon sehingga lebih mudah memahami besarnya potongan yang benar-benar diberikan.',
          'Hal ini penting untuk menjaga margin, membandingkan promo, dan menghindari kesalahan saat membuat penawaran harga kepada pelanggan atau partner bisnis.',
        ],
      },
      {
        heading: 'Berguna untuk evaluasi promo',
        paragraphs: [
          'Saat Anda merencanakan diskon, tool ini membantu menilai apakah potongan masih masuk akal atau terlalu besar. Ini berguna untuk reseller, pemilik toko, dan tim marketing yang ingin menjaga keseimbangan antara konversi dan profit.',
          'Tool ini terhubung erat dengan discount calculator, price markup calculator, dan gross margin calculator sehingga pengguna bisa mengalir dari promo ke evaluasi profit secara natural.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah tool ini kebalikan dari kalkulator diskon?',
        answer: 'Ya, tool ini dirancang untuk menghitung harga awal dari harga setelah diskon.',
      },
      {
        question: 'Apakah cocok untuk cek promo toko?',
        answer: 'Sangat cocok untuk mengecek promo dan memastikan potongan tidak merusak margin.',
      },
    ],
    relatedSlugs: ['kalkulator-diskon', 'price-markup-calculator', 'gross-margin-calculator'],
  },
  {
    slug: 'vat-reverse-calculator',
    title: 'VAT Reverse Calculator',
    description: 'Hitung harga sebelum VAT/PPN dari harga final yang sudah termasuk pajak.',
    category: 'Pajak',
    component: () => import('@/components/tools/VatReverseCalculatorTool.vue'),
    seoTitle: 'VAT Reverse Calculator Online | Hitung Harga Sebelum Pajak',
    seoDescription:
      'Hitung harga sebelum VAT/PPN dari harga final yang sudah termasuk pajak dengan cepat.',
    intro:
      'Jika Anda hanya tahu harga final, tool ini membantu memisahkan komponen pajak dan harga dasar. Cocok untuk invoice, quotation, dan kebutuhan administrasi bisnis.',
    content: [
      {
        heading: 'Pisahkan harga dasar dan pajak dengan cepat',
        paragraphs: [
          'Tidak semua transaksi dimulai dari harga sebelum pajak. Kadang Anda hanya menerima nominal final. Tool ini membantu Anda menghitung kembali harga dasar agar struktur harga lebih transparan dan mudah dibaca.',
          'Hasil seperti ini sangat berguna ketika Anda perlu membuat invoice, membandingkan penawaran, atau menyusun harga internal yang konsisten dengan kebijakan perusahaan.',
        ],
      },
      {
        heading: 'Mendukung alur kerja invoice',
        paragraphs: [
          'Karena situs ini memiliki invoice generator dan kalkulator PPN, reverse VAT calculator menjadi pasangan yang sangat relevan. Anda bisa berpindah dari harga final ke harga dasar lalu ke penagihan tanpa perlu keluar dari situs.',
          'Internal linking yang kuat membantu mesin pencari dan pengguna memahami hubungan antar halaman yang membahas pajak dan invoice.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah ini sama dengan kalkulator PPN?',
        answer: 'Mirip, tetapi fokus pada perhitungan balik dari harga final ke harga dasar sebelum pajak.',
      },
      {
        question: 'Apakah bisa untuk harga yang sudah termasuk pajak?',
        answer: 'Ya, itulah fungsi utamanya.',
      },
    ],
    relatedSlugs: ['kalkulator-ppn', 'tax-inclusive-price-calculator', 'invoice-generator'],
  },
  {
    slug: 'sales-commission-calculator',
    title: 'Sales Commission Calculator',
    description: 'Hitung komisi penjualan berdasarkan target, persentase, dan bonus.',
    category: 'Sales',
    component: () => import('@/components/tools/SalesCommissionCalculatorTool.vue'),
    seoTitle: 'Sales Commission Calculator Online | Hitung Komisi Penjualan',
    seoDescription:
      'Hitung komisi penjualan berdasarkan target, persentase, dan bonus secara cepat.',
    intro:
      'Tool ini membantu sales, reseller, dan tim marketing menghitung komisi secara cepat dan transparan. Cocok untuk skema insentif harian, mingguan, atau bulanan.',
    content: [
      {
        heading: 'Komisi yang jelas membantu motivasi tim',
        paragraphs: [
          'Skema komisi yang transparan membuat tim lebih mudah memahami target dan potensi penghasilan. Dengan kalkulator ini, komisi dapat dihitung cepat berdasarkan omzet atau target yang dicapai.',
          'Ini penting bagi bisnis yang ingin menjaga semangat penjualan sekaligus menghindari salah hitung saat pembayaran insentif.',
        ],
      },
      {
        heading: 'Berguna untuk evaluasi performa',
        paragraphs: [
          'Saat target penjualan berubah, komisi juga ikut berubah. Tool ini memudahkan perhitungan ulang tanpa harus mengutak-atik spreadsheet yang panjang. Hasilnya langsung bisa dipakai untuk evaluasi kinerja dan penganggaran.',
          'Halaman ini saling terhubung dengan revenue projection, profit calculator, dan expense ratio untuk memberi pandangan yang lebih utuh tentang performa bisnis.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah bisa dipakai untuk bonus sales?',
        answer: 'Bisa, karena bonus sales pada dasarnya juga perhitungan komisi berbasis target.',
      },
      {
        question: 'Apakah cocok untuk reseller?',
        answer: 'Sangat cocok untuk menghitung komisi atau margin tambahan dari penjualan.',
      },
    ],
    relatedSlugs: ['revenue-projection-calculator', 'profit-calculator', 'expense-ratio-calculator'],
  },
  {
    slug: 'break-even-revenue-calculator',
    title: 'Break Even Revenue Calculator',
    description: 'Hitung omzet minimum yang dibutuhkan untuk mencapai titik impas.',
    category: 'Bisnis',
    component: () => import('@/components/tools/BreakEvenRevenueCalculatorTool.vue'),
    seoTitle: 'Break Even Revenue Calculator | Hitung Omzet Impas',
    seoDescription:
      'Hitung omzet minimum yang dibutuhkan untuk mencapai titik impas pada bisnis Anda.',
    intro:
      'Break even revenue calculator membantu Anda mengetahui omzet minimum yang harus dicapai agar bisnis tidak rugi. Ini berguna untuk target penjualan dan evaluasi performa.',
    content: [
      {
        heading: 'Omzet impas memberi patokan target',
        paragraphs: [
          'Mengetahui berapa omzet minimum yang harus dicapai membantu bisnis fokus pada target yang realistis. Dengan angka ini, Anda dapat mengevaluasi apakah strategi penjualan saat ini sudah cukup atau perlu ditingkatkan.',
          'Tool ini sangat berguna untuk bisnis baru, campaign musiman, maupun evaluasi bulanan yang menuntut keputusan cepat.',
        ],
      },
      {
        heading: 'Membantu perencanaan penjualan',
        paragraphs: [
          'Ketika omzet impas sudah diketahui, tim penjualan bisa mengarahkan usaha lebih efektif. Anda bisa membandingkan target dengan kapasitas operasional dan menyesuaikan strategi sebelum terjadi defisit.',
          'Tool ini juga bisa menjadi jembatan ke break even point, gross margin, dan working capital calculator.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah omzet impas sama dengan BEP?',
        answer: 'Omzet impas adalah salah satu bentuk perhitungan BEP yang diukur dari nilai pendapatan minimal.',
      },
      {
        question: 'Apakah tool ini cocok untuk bisnis kecil?',
        answer: 'Ya, sangat cocok untuk menentukan target penjualan minimum.',
      },
    ],
    relatedSlugs: ['break-even-point', 'gross-margin-calculator', 'working-capital-calculator'],
  },
  {
    slug: 'profit-target-calculator',
    title: 'Profit Target Calculator',
    description: 'Hitung target omzet yang dibutuhkan untuk mencapai profit tertentu.',
    category: 'Bisnis',
    component: () => import('@/components/tools/ProfitTargetCalculatorTool.vue'),
    seoTitle: 'Profit Target Calculator Online | Hitung Target Laba',
    seoDescription:
      'Hitung target omzet yang dibutuhkan untuk mencapai profit tertentu secara cepat.',
    intro:
      'Tool ini membantu Anda menghitung berapa omzet yang diperlukan agar profit target tercapai. Cocok untuk perencanaan bisnis, produk, dan campaign.',
    content: [
      {
        heading: 'Profit target memandu strategi penjualan',
        paragraphs: [
          'Saat Anda punya target laba tertentu, Anda bisa menghitung balik omzet yang perlu dicapai. Ini memudahkan tim dalam menyusun target harian, mingguan, atau bulanan agar tujuan bisnis lebih terukur.',
          'Dengan mengetahui angka tersebut, Anda dapat menilai apakah strategi harga, margin, dan biaya sudah berada di jalur yang benar.',
        ],
      },
      {
        heading: 'Mendukung pengambilan keputusan',
        paragraphs: [
          'Profit target calculator berguna untuk owner yang ingin cepat menghitung kebutuhan revenue berdasarkan laba yang diincar. Tool ini cocok dipakai saat menyusun target kampanye, rencana produksi, atau forecast awal.',
          'Rangkaian internal link ke profit calculator, ROI, dan revenue projection membuat pengguna dapat berpindah dari target ke realisasi dengan lebih mulus.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah tool ini menghitung target omzet?',
        answer: 'Ya, fokus utamanya adalah menghitung omzet yang dibutuhkan untuk mencapai profit tertentu.',
      },
      {
        question: 'Apakah cocok untuk campaign?',
        answer: 'Cocok, terutama jika Anda punya target laba dari kampanye tertentu.',
      },
    ],
    relatedSlugs: ['profit-calculator', 'revenue-projection-calculator', 'roi-calculator'],
  },
  {
    slug: 'invoice-tax-breakdown-calculator',
    title: 'Invoice Tax Breakdown Calculator',
    description: 'Pisahkan subtotal, pajak, dan total invoice secara cepat dan jelas.',
    category: 'Invoice',
    component: () => import('@/components/tools/InvoiceTaxBreakdownCalculatorTool.vue'),
    seoTitle: 'Invoice Tax Breakdown Calculator | Pisahkan Pajak Invoice',
    seoDescription:
      'Pisahkan subtotal, pajak, dan total invoice secara cepat dan jelas untuk kebutuhan bisnis.',
    intro:
      'Tool ini membantu Anda melihat struktur invoice dengan lebih jelas, terutama saat perlu memisahkan subtotal, pajak, dan total akhir.',
    content: [
      {
        heading: 'Struktur invoice yang mudah dipahami',
        paragraphs: [
          'Invoice yang rapi memudahkan pelanggan memahami nominal dasar, pajak, dan total yang harus dibayar. Kalkulator ini membantu menampilkan komponen tersebut secara lebih transparan agar proses penagihan lebih profesional.',
          'Dengan output yang cepat, Anda bisa menyusun invoice atau quotation tanpa perlu menghitung manual setiap kali ada perubahan nominal.',
        ],
      },
      {
        heading: 'Cocok untuk pekerjaan harian',
        paragraphs: [
          'Freelancer, UMKM, dan tim administrasi sering membutuhkan gambaran cepat tentang pembagian harga dalam invoice. Tool ini mempersingkat langkah tersebut dan membuat komunikasi harga lebih jelas.',
          'Halaman ini sangat relevan dengan invoice generator, kalkulator PPN, dan tax inclusive price calculator yang sudah ada di situs.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah tool ini cocok untuk invoice layanan?',
        answer: 'Ya, sangat cocok untuk layanan yang perlu memisahkan subtotal dan pajak.',
      },
      {
        question: 'Apakah hasilnya bisa dipakai untuk quotation?',
        answer: 'Bisa, terutama saat Anda ingin menunjukkan struktur harga yang transparan.',
      },
    ],
    relatedSlugs: ['invoice-generator', 'kalkulator-ppn', 'tax-inclusive-price-calculator'],
  },
  {
    slug: 'cash-runway-calculator',
    title: 'Cash Runway Calculator',
    description: 'Hitung berapa lama kas bisnis akan bertahan dengan pengeluaran saat ini.',
    category: 'Cash Flow',
    component: () => import('@/components/tools/CashRunwayCalculatorTool.vue'),
    seoTitle: 'Cash Runway Calculator Online | Hitung Sisa Kas Bisnis',
    seoDescription:
      'Hitung berapa lama kas bisnis akan bertahan dengan pengeluaran saat ini secara cepat dan praktis.',
    intro:
      'Tool ini membantu Anda memahami berapa lama kas bisnis akan cukup jika pengeluaran berjalan seperti sekarang. Sangat berguna untuk startup dan UMKM.',
    content: [
      {
        heading: 'Kas harus bertahan cukup lama',
        paragraphs: [
          'Cash runway adalah salah satu indikator paling penting untuk melihat kesehatan keuangan jangka pendek. Dengan mengetahui berapa lama kas akan bertahan, Anda bisa menilai apakah bisnis masih aman atau perlu penghematan.',
          'Tool ini membantu memberikan estimasi sederhana agar Anda dapat membuat keputusan lebih cepat sebelum dana operasional menipis.',
        ],
      },
      {
        heading: 'Berguna untuk kontrol pengeluaran',
        paragraphs: [
          'Saat cash runway mulai pendek, Anda bisa segera meninjau biaya langganan, operasional, dan pengeluaran yang kurang prioritas. Dengan begitu, bisnis tetap punya ruang bernapas yang cukup.',
          'Halaman ini melengkapi cash flow forecast dan working capital calculator agar analisis arus kas lebih utuh.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apa itu cash runway?',
        answer: 'Cash runway adalah perkiraan berapa lama kas bisnis dapat bertahan jika pengeluaran berjalan seperti saat ini.',
      },
      {
        question: 'Apakah cocok untuk startup?',
        answer: 'Sangat cocok, karena startup sering memantau sisa kas dengan sangat ketat.',
      },
    ],
    relatedSlugs: ['cash-flow-forecast', 'working-capital-calculator', 'profit-target-calculator'],
  },
  {
    slug: 'stock-reorder-point-calculator',
    title: 'Stock Reorder Point Calculator',
    description: 'Hitung kapan stok harus dipesan ulang agar operasional tetap lancar.',
    category: 'Inventory',
    component: () => import('@/components/tools/StockReorderPointCalculatorTool.vue'),
    seoTitle: 'Stock Reorder Point Calculator | Hitung Titik Pesan Ulang Stok',
    seoDescription:
      'Hitung kapan stok harus dipesan ulang agar operasional dan penjualan tetap lancar.',
    intro:
      'Tool ini membantu Anda menentukan titik aman untuk memesan stok ulang sebelum kehabisan. Cocok untuk toko online, retail, dan bisnis berbasis persediaan.',
    content: [
      {
        heading: 'Stok kosong bisa menghambat penjualan',
        paragraphs: [
          'Jika stok habis terlalu cepat, penjualan ikut terganggu dan pelanggan bisa pindah ke kompetitor. Reorder point membantu Anda menentukan kapan stok harus dipesan ulang sebelum titik kritis itu terjadi.',
          'Tool ini sangat berguna untuk bisnis yang menjual banyak SKU atau memiliki lead time pengiriman yang tidak singkat.',
        ],
      },
      {
        heading: 'Membantu manajemen persediaan',
        paragraphs: [
          'Dengan titik pesan ulang yang jelas, Anda bisa mengatur pengadaan lebih terencana dan menghindari pembelian mendadak. Ini membantu menjaga cash flow sekaligus memastikan ketersediaan barang tetap aman.',
          'Halaman ini relevan dengan unit cost calculator, gross margin, dan working capital calculator.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah tool ini cocok untuk toko online?',
        answer: 'Ya, sangat cocok untuk toko yang butuh kontrol stok dan pengadaan yang lebih disiplin.',
      },
      {
        question: 'Apakah bisa untuk beberapa produk?',
        answer: 'Versi dasar fokus pada satu item, tetapi konsepnya mudah diperluas untuk banyak SKU.',
      },
    ],
    relatedSlugs: ['unit-cost-calculator', 'working-capital-calculator', 'gross-margin-calculator'],
  },
  {
    slug: 'gross-profit-target-calculator',
    title: 'Gross Profit Target Calculator',
    description: 'Hitung omzet yang dibutuhkan untuk mencapai target gross profit.',
    category: 'Pricing',
    component: () => import('@/components/tools/GrossProfitTargetCalculatorTool.vue'),
    seoTitle: 'Gross Profit Target Calculator | Hitung Target Gross Profit',
    seoDescription:
      'Hitung omzet yang dibutuhkan untuk mencapai target gross profit secara cepat dan terukur.',
    intro:
      'Tool ini membantu Anda menghitung omzet yang dibutuhkan jika target gross profit sudah ditentukan. Cocok untuk pricing dan perencanaan penjualan.',
    content: [
      {
        heading: 'Target profit harus diterjemahkan ke omzet',
        paragraphs: [
          'Saat target gross profit sudah ditentukan, langkah berikutnya adalah menghitung omzet minimal yang harus diraih. Tool ini menyederhanakan proses itu sehingga target Anda lebih mudah dieksekusi oleh tim penjualan.',
          'Ini sangat berguna ketika Anda ingin membangun pricing yang tidak hanya menarik pelanggan, tetapi juga menghasilkan laba yang sesuai harapan.',
        ],
      },
      {
        heading: 'Mendukung perencanaan penjualan',
        paragraphs: [
          'Dengan mengetahui omzet yang dibutuhkan, Anda bisa menyesuaikan jumlah unit, harga jual, atau strategi promosi. Hasilnya membantu membuat target bulanan yang lebih realistis.',
          'Halaman ini terhubung dengan gross margin calculator, profit target calculator, dan revenue projection calculator.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah ini sama dengan profit target calculator?',
        answer: 'Mirip, tetapi fokusnya ada pada target gross profit, bukan profit bersih secara umum.',
      },
      {
        question: 'Apakah cocok untuk tim sales?',
        answer: 'Ya, karena omzet target adalah metrik yang mudah dipahami oleh tim sales.',
      },
    ],
    relatedSlugs: ['gross-margin-calculator', 'profit-target-calculator', 'revenue-projection-calculator'],
  },
  {
    slug: 'shipping-margin-calculator',
    title: 'Shipping Margin Calculator',
    description: 'Hitung margin produk setelah biaya pengiriman diperhitungkan.',
    category: 'Pricing',
    component: () => import('@/components/tools/ShippingMarginCalculatorTool.vue'),
    seoTitle: 'Shipping Margin Calculator Online | Hitung Margin Setelah Ongkir',
    seoDescription:
      'Hitung margin produk setelah biaya pengiriman diperhitungkan untuk pricing yang lebih akurat.',
    intro:
      'Tool ini membantu Anda melihat margin nyata setelah biaya pengiriman ikut dihitung. Cocok untuk seller marketplace dan toko online.',
    content: [
      {
        heading: 'Ongkir sering memengaruhi profit',
        paragraphs: [
          'Biaya pengiriman bisa mengubah margin secara signifikan, terutama pada produk bernilai rendah atau penjualan lintas wilayah. Dengan kalkulator ini, Anda bisa melihat profit yang tersisa setelah ongkir masuk ke perhitungan.',
          'Hasil yang lebih akurat membantu Anda menentukan apakah perlu menaikkan harga, memberi subsidi ongkir, atau mengubah strategi pengiriman.',
        ],
      },
      {
        heading: 'Relevan untuk marketplace',
        paragraphs: [
          'Seller marketplace sering perlu menghitung harga jual yang masih sehat setelah ongkir, promo, dan biaya platform. Tool ini membantu proses evaluasi tersebut secara cepat.',
          'Halaman ini juga cocok dipasangkan dengan gross margin, price markup, dan discount reverse calculator.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah ongkir dihitung sebagai biaya?',
        answer: 'Ya, tool ini membantu memasukkan ongkir ke dalam evaluasi margin produk.',
      },
      {
        question: 'Apakah cocok untuk seller online?',
        answer: 'Sangat cocok, terutama untuk marketplace dan toko dengan pengiriman berbayar.',
      },
    ],
    relatedSlugs: ['gross-margin-calculator', 'price-markup-calculator', 'discount-reverse-calculator'],
  },
  {
    slug: 'late-payment-interest-calculator',
    title: 'Kalkulator Denda Keterlambatan',
    description: 'Hitung denda bunga keterlambatan pembayaran invoice secara cepat dan jelas.',
    category: 'Penagihan',
    component: () => import('@/components/tools/LatePaymentInterestCalculatorTool.vue'),
    seoTitle: 'Kalkulator Denda Keterlambatan | Hitung Total Tagihan',
    seoDescription:
      'Hitung denda bunga keterlambatan pembayaran invoice dan total tagihan yang harus dibayar.',
    intro:
      'Kalkulator denda keterlambatan membantu Anda menghitung bunga tambahan dari invoice yang dibayar melewati jatuh tempo. Tool ini berguna untuk administrasi penagihan yang lebih rapi.',
    content: [
      {
        heading: 'Kenapa denda keterlambatan perlu dihitung?',
        paragraphs: [
          'Dalam penagihan bisnis, keterlambatan pembayaran bisa mengganggu arus kas. Dengan menghitung denda secara konsisten, Anda dapat menjaga transparansi sekaligus memberi sinyal yang jelas kepada pelanggan tentang konsekuensi pembayaran terlambat.',
          'Tool ini cocok untuk invoice freelance, layanan bulanan, maupun tagihan usaha kecil yang membutuhkan perhitungan tambahan ketika pembayaran melewati tenggat.',
        ],
      },
      {
        heading: 'Berguna untuk komunikasi billing',
        paragraphs: [
          'Hasil perhitungan bisa langsung dipakai untuk menyiapkan pengingat pembayaran, revisi invoice, atau update ke tim keuangan. Karena nilainya dihitung otomatis, Anda tidak perlu menghitung ulang setiap kali tenggat berubah.',
          'Halaman ini juga melengkapi invoice generator dan invoice tax breakdown calculator agar alur billing di situs tetap saling terhubung.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah denda dihitung harian?',
        answer: 'Ya, contoh default-nya menggunakan bunga per hari agar mudah disesuaikan dengan kebijakan billing.',
      },
      {
        question: 'Apakah cocok untuk invoice jasa?',
        answer: 'Sangat cocok untuk invoice jasa, tagihan freelance, dan pembayaran langganan yang terlambat.',
      },
    ],
    relatedSlugs: ['invoice-generator', 'invoice-tax-breakdown-calculator', 'payment-due-date-calculator'],
    localized: {
      en: {
        title: 'Late Payment Interest Calculator',
        description: 'Calculate late payment interest and the updated invoice total in seconds.',
        category: 'Billing',
        seoTitle: 'Late Payment Interest Calculator | Updated Invoice Total',
        seoDescription:
          'Calculate late payment interest, overdue fees, and the updated amount due for invoice billing.',
        intro:
          'This calculator helps you estimate late payment interest for overdue invoices. It is useful for cleaner billing workflows and transparent customer communication.',
        content: [
          {
            heading: 'Why late fees matter',
            paragraphs: [
              'Late payments can slow down cash flow and make billing less predictable. By calculating overdue interest consistently, you keep billing transparent and set clear expectations for customers.',
              'The tool is useful for freelancer invoices, monthly retainers, and small business billing where an extra charge may apply after the due date.',
            ],
          },
          {
            heading: 'Helpful for billing follow-ups',
            paragraphs: [
              'You can use the result for reminders, invoice revisions, or finance team updates. Since the amount is calculated automatically, there is no need to recalculate whenever the overdue period changes.',
              'It also pairs naturally with the invoice generator and invoice tax breakdown calculator so your billing flow stays connected.',
            ],
          },
        ],
        faqs: [
          {
            question: 'Is the fee calculated daily?',
            answer: 'Yes, the default example uses a daily rate so it is easy to adjust to your billing policy.',
          },
          {
            question: 'Is this suitable for service invoices?',
            answer: 'Yes, it works well for service invoices, freelance billing, and overdue subscription payments.',
          },
        ],
      },
    },
  },
  {
    slug: 'subscription-pricing-calculator',
    title: 'Kalkulator Harga Subscription',
    description: 'Hitung harga langganan bulanan berdasarkan biaya, margin, dan jumlah pelanggan.',
    category: 'SaaS',
    component: () => import('@/components/tools/SubscriptionPricingCalculatorTool.vue'),
    seoTitle: 'Kalkulator Harga Subscription | Pricing SaaS',
    seoDescription:
      'Hitung harga langganan bulanan berdasarkan biaya operasional, margin target, dan jumlah pelanggan.',
    intro:
      'Kalkulator harga subscription membantu Anda menentukan harga jual layanan berlangganan dengan pendekatan yang lebih sehat. Cocok untuk produk digital, membership, dan SaaS.',
    content: [
      {
        heading: 'Pricing subscription harus menutup biaya',
        paragraphs: [
          'Model subscription terlihat sederhana, tetapi harga yang terlalu rendah bisa membuat bisnis sulit berkembang. Dengan tool ini, Anda bisa menghitung harga yang masuk akal berdasarkan biaya bulanan dan margin target.',
          'Ini sangat berguna untuk produk digital, layanan membership, software berlangganan, dan paket layanan bulanan lainnya.',
        ],
      },
      {
        heading: 'Mudah dipakai untuk simulasi',
        paragraphs: [
          'Cukup isi biaya bulanan, margin target, dan jumlah pelanggan berbayar, lalu hasil harga per pelanggan akan langsung muncul. Anda bisa mencoba beberapa skenario pricing sebelum masuk ke pasar.',
          'Halaman ini relevan dengan revenue projection, gross margin, dan profit target calculator untuk analisis pricing yang lebih lengkap.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah cocok untuk SaaS?',
        answer: 'Ya, sangat cocok untuk SaaS, membership, atau layanan digital berlangganan.',
      },
      {
        question: 'Apakah bisa dipakai untuk paket tahunan?',
        answer: 'Bisa. Anda tinggal menyesuaikan input biaya dan target yang ingin dicapai.',
      },
    ],
    relatedSlugs: ['revenue-projection-calculator', 'gross-margin-calculator', 'profit-target-calculator'],
    localized: {
      en: {
        title: 'Subscription Pricing Calculator',
        description: 'Set monthly subscription pricing based on costs, margin, and paying customers.',
        category: 'SaaS',
        seoTitle: 'Subscription Pricing Calculator | SaaS Pricing Tool',
        seoDescription:
          'Calculate monthly subscription pricing from operating cost, target margin, and active customers.',
        intro:
          'This calculator helps you set healthier subscription pricing for digital products, memberships, and SaaS offers.',
        content: [
          {
            heading: 'Subscription pricing must cover cost',
            paragraphs: [
              'A subscription model looks simple, but pricing too low can make growth difficult. This calculator helps you find a realistic price based on monthly cost and your target margin.',
              'It is useful for digital products, memberships, software subscriptions, and other recurring offers.',
            ],
          },
          {
            heading: 'Simple scenario testing',
            paragraphs: [
              'Enter monthly cost, target margin, and paying customers, then the tool calculates the price per customer. You can test several pricing scenarios before launch.',
              'It works well with revenue projection, gross margin, and profit target calculators for a fuller pricing analysis.',
            ],
          },
        ],
        faqs: [
          {
            question: 'Is this suitable for SaaS?',
            answer: 'Yes, it is designed for SaaS, memberships, and recurring digital services.',
          },
          {
            question: 'Can I use it for annual plans?',
            answer: 'Yes. Just adjust the inputs to match the pricing period you want to simulate.',
          },
        ],
      },
    },
  },
  {
    slug: 'safety-stock-calculator',
    title: 'Kalkulator Safety Stock',
    description: 'Hitung stok pengaman untuk menjaga ketersediaan barang saat lead time berubah.',
    category: 'Inventory',
    component: () => import('@/components/tools/SafetyStockCalculatorTool.vue'),
    seoTitle: 'Kalkulator Safety Stock | Stok Pengaman Inventory',
    seoDescription:
      'Hitung safety stock dan titik pesan ulang untuk menjaga ketersediaan barang di gudang.',
    intro:
      'Kalkulator safety stock membantu Anda menentukan stok pengaman agar penjualan tidak terganggu saat lead time pengiriman berubah.',
    content: [
      {
        heading: 'Stok pengaman mencegah kehabisan barang',
        paragraphs: [
          'Dalam inventory management, stok yang habis terlalu cepat bisa menyebabkan penjualan terhenti. Safety stock memberi cadangan agar operasional tetap lancar saat permintaan naik atau pengiriman terlambat.',
          'Tool ini cocok untuk toko online, gudang retail, dan bisnis yang perlu menjaga ketersediaan SKU dengan lebih disiplin.',
        ],
      },
      {
        heading: 'Mendukung keputusan pembelian',
        paragraphs: [
          'Dengan safety stock yang jelas, Anda bisa menentukan kapan harus memesan ulang dan seberapa besar cadangan minimum yang perlu dijaga. Ini membantu mengurangi pembelian mendadak.',
          'Halaman ini terhubung dengan stock reorder point, unit cost, dan working capital calculator untuk manajemen persediaan yang lebih utuh.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah safety stock sama dengan reorder point?',
        answer: 'Tidak sama. Safety stock adalah cadangan, sedangkan reorder point adalah titik kapan barang harus dipesan ulang.',
      },
      {
        question: 'Apakah cocok untuk e-commerce?',
        answer: 'Sangat cocok, terutama untuk bisnis yang menjual banyak SKU dan ingin menghindari stockout.',
      },
    ],
    relatedSlugs: ['stock-reorder-point-calculator', 'unit-cost-calculator', 'working-capital-calculator'],
    localized: {
      en: {
        title: 'Safety Stock Calculator',
        description: 'Calculate safety stock to reduce stockout risk when lead times change.',
        category: 'Inventory',
        seoTitle: 'Safety Stock Calculator | Inventory Buffer Tool',
        seoDescription:
          'Calculate safety stock and reorder point values to keep inventory available and operations smooth.',
        intro:
          'This calculator helps you set a safety buffer so sales are not interrupted when lead times change.',
        content: [
          {
            heading: 'Safety stock prevents stockouts',
            paragraphs: [
              'In inventory management, running out of stock too early can stop sales. Safety stock gives you a buffer so operations stay smooth when demand rises or delivery is delayed.',
              'It is useful for online stores, retail warehouses, and businesses that need tighter SKU control.',
            ],
          },
          {
            heading: 'Supports purchasing decisions',
            paragraphs: [
              'With a clear safety stock value, you can decide when to reorder and how much buffer inventory to keep. That helps reduce last-minute buying decisions.',
              'The page pairs well with the stock reorder point, unit cost, and working capital calculators for a fuller inventory workflow.',
            ],
          },
        ],
        faqs: [
          {
            question: 'Is safety stock the same as reorder point?',
            answer: 'No. Safety stock is the buffer, while reorder point is the trigger level for placing a new order.',
          },
          {
            question: 'Is this good for e-commerce?',
            answer: 'Yes, especially for stores with many SKUs that want to avoid stockouts.',
          },
        ],
      },
    },
  },
  {
    slug: 'invoice-due-date-calculator',
    title: 'Kalkulator Jatuh Tempo Invoice',
    description: 'Hitung tanggal jatuh tempo invoice berdasarkan tanggal terbit dan termin pembayaran.',
    category: 'Penagihan',
    component: () => import('@/components/tools/InvoiceDueDateCalculatorTool.vue'),
    seoTitle: 'Kalkulator Jatuh Tempo Invoice | Due Date Generator',
    seoDescription:
      'Hitung tanggal jatuh tempo invoice berdasarkan tanggal terbit dan termin pembayaran dengan cepat.',
    intro:
      'Kalkulator jatuh tempo invoice membantu Anda menentukan kapan pembayaran seharusnya diterima. Cocok untuk billing yang teratur dan profesional.',
    content: [
      {
        heading: 'Jatuh tempo penting untuk billing yang disiplin',
        paragraphs: [
          'Tanggal jatuh tempo mempermudah pelanggan memahami kapan tagihan harus dibayar. Ini juga membantu tim keuangan menjaga penagihan tetap konsisten dan terdokumentasi dengan baik.',
          'Tool ini cocok digunakan sebelum mengirim invoice, terutama jika Anda memakai termin 7 hari, 14 hari, atau 30 hari.',
        ],
      },
      {
        heading: 'Membantu workflow administrasi',
        paragraphs: [
          'Dengan due date yang otomatis, Anda bisa menyiapkan reminder, memeriksa invoice yang belum lunas, dan mengatur follow-up lebih cepat.',
          'Halaman ini relevan dengan invoice generator, late payment interest calculator, dan invoice tax breakdown calculator.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah bisa dipakai untuk termin 30 hari?',
        answer: 'Bisa, Anda hanya perlu mengubah jumlah hari termin pembayaran.',
      },
      {
        question: 'Apakah hasil tanggal mengikuti zona Indonesia?',
        answer: 'Ya, format tanggal disesuaikan untuk pengguna Indonesia dan English locale.',
      },
    ],
    relatedSlugs: ['invoice-generator', 'late-payment-interest-calculator', 'invoice-tax-breakdown-calculator'],
    localized: {
      en: {
        title: 'Invoice Due Date Calculator',
        description: 'Find the invoice due date from the issue date and payment terms.',
        category: 'Billing',
        seoTitle: 'Invoice Due Date Calculator | Payment Term Tool',
        seoDescription:
          'Calculate the invoice due date from issue date and payment term length in a few seconds.',
        intro:
          'This calculator helps you define when payment should be received, which is useful for clean and professional billing.',
        content: [
          {
            heading: 'Due dates keep billing disciplined',
            paragraphs: [
              'A clear due date helps customers understand exactly when payment is expected. It also gives your finance team a consistent way to document billing timelines.',
              'Use it before sending invoices, especially when you work with 7-day, 14-day, or 30-day payment terms.',
            ],
          },
          {
            heading: 'Useful for admin workflow',
            paragraphs: [
              'With the due date calculated automatically, you can prepare reminders, review unpaid invoices, and follow up faster.',
              'The page works well with the invoice generator, late payment interest calculator, and invoice tax breakdown calculator.',
            ],
          },
        ],
        faqs: [
          {
            question: 'Can I use a 30-day payment term?',
            answer: 'Yes, just change the number of days in the payment term input.',
          },
          {
            question: 'Does it follow Indonesian date format?',
            answer: 'Yes, the date output is adapted for Indonesian and English locale use.',
          },
        ],
      },
    },
  },
  {
    slug: 'average-order-value-calculator',
    title: 'Kalkulator Average Order Value',
    description: 'Hitung rata-rata nilai order untuk memantau performa penjualan toko.',
    category: 'Analitik',
    component: () => import('@/components/tools/AverageOrderValueCalculatorTool.vue'),
    seoTitle: 'Kalkulator Average Order Value | AOV Calculator',
    seoDescription:
      'Hitung average order value untuk melihat rata-rata nilai transaksi penjualan toko Anda.',
    intro:
      'Kalkulator average order value membantu Anda memahami nilai rata-rata dari setiap transaksi. Tool ini berguna untuk toko online, marketing, dan evaluasi performa penjualan.',
    content: [
      {
        heading: 'AOV membantu melihat kualitas penjualan',
        paragraphs: [
          'Jika omzet naik tetapi jumlah order juga naik sangat cepat, Anda perlu tahu apakah nilai rata-rata transaksi ikut membaik. Average order value memberi gambaran yang lebih detail tentang perilaku pembelian pelanggan.',
          'Metrik ini sering dipakai untuk memantau efektivitas promo, bundling, dan strategi upsell di e-commerce maupun bisnis layanan.',
        ],
      },
      {
        heading: 'Cocok untuk evaluasi marketing',
        paragraphs: [
          'Dengan AOV, Anda bisa melihat apakah campaign tertentu benar-benar mendorong pembelian bernilai lebih tinggi. Hasilnya membantu Anda menilai promosi mana yang layak diulang.',
          'Halaman ini terhubung dengan revenue projection, sales commission, dan profit calculator untuk analisis performa yang lebih lengkap.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apakah AOV cocok untuk toko online?',
        answer: 'Ya, AOV sangat sering dipakai untuk memantau performa toko online dan marketplace.',
      },
      {
        question: 'Apakah bisa dipakai untuk layanan?',
        answer: 'Bisa, terutama jika bisnis Anda menerima banyak transaksi layanan dengan nilai yang bervariasi.',
      },
    ],
    relatedSlugs: ['revenue-projection-calculator', 'sales-commission-calculator', 'profit-calculator'],
    localized: {
      en: {
        title: 'Average Order Value Calculator',
        description: 'Measure the average value of each order to track sales performance.',
        category: 'Analytics',
        seoTitle: 'Average Order Value Calculator | AOV Tool',
        seoDescription:
          'Calculate average order value to see the typical transaction size in your store or business.',
        intro:
          'This calculator helps you understand the average value of each transaction, which is useful for online stores, marketing, and sales analysis.',
        content: [
          {
            heading: 'AOV shows sales quality',
            paragraphs: [
              'If revenue goes up but order volume rises even faster, you need to know whether the average transaction size is improving. AOV gives a more detailed view of customer buying behavior.',
              'It is often used to evaluate promo effectiveness, bundling, and upsell strategies in e-commerce or service businesses.',
            ],
          },
          {
            heading: 'Useful for marketing reviews',
            paragraphs: [
              'With AOV, you can see whether a campaign really encourages higher-value purchases. That helps you decide which promotions are worth repeating.',
              'The page connects well with revenue projection, sales commission, and profit calculator for a deeper performance review.',
            ],
          },
        ],
        faqs: [
          {
            question: 'Is AOV good for online stores?',
            answer: 'Yes, AOV is commonly used to track the performance of online stores and marketplaces.',
          },
          {
            question: 'Can it be used for services?',
            answer: 'Yes, especially if your business has many service transactions with varying values.',
          },
        ],
      },
    },
  },
  {
    slug: 'kalkulator-zakat',
    title: 'Kalkulator Zakat',
    description: 'Hitung zakat mal, profesi, dan emas dengan nisab terbaru secara akurat.',
    category: 'Pajak',
    component: () => import('@/components/tools/ZakatCalculatorTool.vue'),
    seoTitle: 'Kalkulator Zakat Online | Hitung Zakat Profesi & Emas',
    seoDescription:
      'Hitung zakat mal, profesi, dan emas secara akurat berdasarkan nisab terbaru untuk kewajiban finansial Anda.',
    intro:
      'Kalkulator zakat ini membantu Anda menghitung kewajiban zakat mal, profesi, maupun emas dengan praktis. Dilengkapi dengan acuan nisab terbaru agar perhitungan tetap akurat dan sesuai kaidah.',
    content: [
      {
        heading: 'Mengapa zakat perlu dihitung dengan tepat?',
        paragraphs: [
          'Zakat adalah instrumen penting dalam menyucikan harta dan membantu sesama. Namun, menentukan apakah harta kita sudah mencapai nisab dan berapa nominal yang harus dikeluarkan sering kali membingungkan bagi sebagian orang. Tool ini dirancang untuk menyederhanakan proses tersebut.',
          'Dengan memasukkan penghasilan atau berat emas Anda, sistem akan membandingkannya dengan nisab (batas minimum wajib zakat) yang berlaku. Jika sudah mencapai batasnya, zakat sebesar 2.5% akan dihitung otomatis sehingga Anda bisa menunaikan kewajiban dengan lebih tenang.',
        ],
      },
      {
        heading: 'Jenis zakat yang didukung',
        paragraphs: [
          'Saat ini, alat ini mendukung dua jenis zakat yang paling umum: Zakat Profesi (penghasilan bulanan) dan Zakat Emas. Untuk zakat profesi, nisab biasanya setara dengan 522 kg beras atau 85 gram emas per tahun (tergantung kebijakan yang diikuti), sedangkan zakat emas murni menggunakan batas 85 gram.',
          'Ke depannya, sistem ini dapat diperluas untuk mencakup zakat perdagangan, zakat saham, maupun zakat tabungan lainnya agar pengelolaan keuangan spiritual Anda menjadi lebih terpusat.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Berapa persen tarif zakat profesi?',
        answer: 'Tarif zakat profesi adalah 2.5% dari total penghasilan yang telah mencapai nisab.',
      },
      {
        question: 'Kapan seseorang wajib membayar zakat emas?',
        answer: 'Zakat emas wajib dibayar jika emas yang dimiliki telah mencapai nisab 85 gram dan telah dimiliki selama satu tahun (haul).',
      },
    ],
    relatedSlugs: ['salary-take-home-calculator', 'savings-goal-calculator', 'kalkulator-ppn'],
  },
  {
    slug: 'kalkulator-dana-darurat',
    title: 'Kalkulator Dana Darurat',
    description: 'Hitung kebutuhan dana darurat berdasarkan pengeluaran bulanan dan profil risiko.',
    category: 'Personal Finance',
    component: () => import('@/components/tools/EmergencyFundCalculatorTool.vue'),
    seoTitle: 'Kalkulator Dana Darurat Online | Perencanaan Keuangan Sehat',
    seoDescription:
      'Hitung kebutuhan dana darurat Anda berdasarkan pengeluaran bulanan dan status kehidupan agar keuangan tetap aman.',
    intro:
      'Dana darurat adalah fondasi utama keuangan yang sehat. Kalkulator ini membantu Anda menentukan berapa besar "bantalan" finansial yang ideal agar Anda tetap tenang saat menghadapi situasi tak terduga.',
    content: [
      {
        heading: 'Kenapa dana darurat itu wajib?',
        paragraphs: [
          'Situasi darurat seperti kehilangan pekerjaan, kerusakan kendaraan, atau biaya medis mendadak bisa merusak rencana keuangan jika tidak ada persiapan. Dana darurat berfungsi sebagai pelindung agar Anda tidak perlu berhutang saat menghadapi tekanan finansial tersebut.',
          'Besaran dana darurat setiap orang berbeda-beda. Seorang yang masih lajang tentu memiliki kebutuhan cadangan yang berbeda dibandingkan dengan mereka yang sudah berkeluarga dan memiliki anak. Tool ini mempertimbangkan profil risiko tersebut untuk memberikan rekomendasi yang tepat.',
        ],
      },
      {
        heading: 'Berapa idealnya dana yang disimpan?',
        paragraphs: [
          'Secara umum, pakar keuangan menyarankan 3 hingga 12 bulan pengeluaran bulanan untuk disimpan sebagai dana darurat. Angka ini fleksibel tergantung pada stabilitas penghasilan dan jumlah tanggungan Anda.',
          'Simpanlah dana ini di instrumen yang likuid dan aman, seperti tabungan biasa atau reksa dana pasar uang, agar mudah ditarik kapan saja saat dibutuhkan tanpa ada potongan nilai yang signifikan.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Di mana sebaiknya menyimpan dana darurat?',
        answer: 'Disarankan menyimpannya di tempat yang likuid seperti tabungan bank, deposito, atau reksa dana pasar uang.',
      },
      {
        question: 'Apakah dana darurat boleh dipakai untuk investasi?',
        answer: 'Tidak disarankan. Dana darurat tujuannya untuk keamanan, bukan untuk mencari return tinggi yang berisiko.',
      },
    ],
    relatedSlugs: ['savings-goal-calculator', 'salary-take-home-calculator', 'cash-flow-forecast'],
  },
  {
    slug: 'kalkulator-inflasi',
    title: 'Kalkulator Inflasi',
    description: 'Hitung nilai uang di masa depan berdasarkan rata-rata tingkat inflasi tahunan.',
    category: 'Keuangan',
    component: () => import('@/components/tools/InflationCalculatorTool.vue'),
    seoTitle: 'Kalkulator Inflasi Online | Hitung Daya Beli Uang',
    seoDescription:
      'Lihat bagaimana inflasi memengaruhi daya beli uang Anda di masa depan dengan kalkulator inflasi sederhana.',
    intro:
      'Pernah merasa harga barang semakin mahal dari tahun ke tahun? Itu adalah efek inflasi. Kalkulator ini membantu Anda melihat berapa nilai uang Anda di masa depan dan seberapa besar kenaikan biaya hidup yang harus diantisipasi.',
    content: [
      {
        heading: 'Memahami cara kerja inflasi',
        paragraphs: [
          'Inflasi adalah kenaikan harga barang dan jasa secara umum dalam jangka waktu tertentu. Hal ini menyebabkan daya beli uang kita menurun. Uang 10 juta hari ini tidak akan bisa membeli barang yang sama banyaknya di 10 tahun yang akan datang.',
          'Dengan memahami angka inflasi, Anda bisa merencanakan investasi dengan lebih baik. Anda perlu mencari instrumen investasi yang imbal hasilnya di atas tingkat inflasi agar kekayaan Anda benar-benar tumbuh secara riil.',
        ],
      },
      {
        heading: 'Kegunaan menghitung inflasi',
        paragraphs: [
          'Tool ini sangat berguna untuk perencanaan jangka panjang seperti dana pensiun atau pembelian aset besar. Anda bisa memperkirakan berapa biaya hidup yang harus Anda siapkan di masa tua dengan memperhitungkan kenaikan harga tahunan.',
          'Data inflasi di Indonesia biasanya berada di kisaran 3-6% per tahun, namun angka ini bisa bervariasi tergantung kondisi ekonomi global dan domestik.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Berapa rata-rata inflasi di Indonesia?',
        answer: 'Secara historis biasanya berkisar antara 3% hingga 6% per tahun.',
      },
      {
        question: 'Bagaimana cara melawan inflasi?',
        answer: 'Cara paling efektif adalah dengan berinvestasi pada instrumen yang memberikan return lebih tinggi dari tingkat inflasi.',
      },
    ],
    relatedSlugs: ['compound-interest-calculator', 'savings-goal-calculator', 'roi-calculator'],
  },
  {
    slug: 'kalkulator-dana-pendidikan',
    title: 'Kalkulator Dana Pendidikan',
    description: 'Rencanakan tabungan pendidikan anak dengan mempertimbangkan kenaikan biaya sekolah.',
    category: 'Personal Finance',
    component: () => import('@/components/tools/EducationFundCalculatorTool.vue'),
    seoTitle: 'Kalkulator Dana Pendidikan | Perencanaan Tabungan Anak',
    seoDescription:
      'Hitung estimasi biaya sekolah di masa depan dan tentukan target tabungan bulanan untuk pendidikan anak Anda.',
    intro:
      'Biaya pendidikan merupakan salah satu pengeluaran terbesar dalam keluarga yang kenaikannya sering kali melampaui inflasi umum. Kalkulator ini membantu Anda menyiapkan dana tersebut sejak dini secara terukur.',
    content: [
      {
        heading: 'Tantangan kenaikan biaya pendidikan',
        paragraphs: [
          'Di Indonesia, kenaikan biaya pendidikan per tahun (inflasi pendidikan) bisa mencapai 10% hingga 15%. Hal ini membuat tabungan biasa terkadang tidak cukup untuk menutupi biaya masuk sekolah atau kuliah di masa depan.',
          'Mulai merencanakan sejak anak masih kecil memberikan keuntungan berupa waktu yang lebih panjang untuk berinvestasi (compounding effect), sehingga beban tabungan bulanan menjadi lebih ringan.',
        ],
      },
      {
        heading: 'Langkah menyiapkan dana pendidikan',
        paragraphs: [
          'Pertama, tentukan target sekolah dan cari tahu biaya masuknya saat ini. Kedua, masukkan jangka waktu sampai anak mulai sekolah. Ketiga, tentukan target return investasi yang realistis. Tool ini akan menghitung berapa yang harus Anda sisihkan setiap bulan.',
          'Dengan angka yang konkret, Anda bisa memilih instrumen investasi yang tepat, seperti reksa dana atau emas, sesuai dengan jangka waktu dan profil risiko Anda.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Kapan waktu terbaik mulai menabung dana pendidikan?',
        answer: 'Sesegera mungkin, idealnya sejak anak lahir agar jangka waktu investasi lebih panjang.',
      },
      {
        question: 'Berapa persen kenaikan biaya sekolah per tahun?',
        answer: 'Rata-rata di Indonesia berkisar antara 10% hingga 15% per tahun.',
      },
    ],
    relatedSlugs: ['savings-goal-calculator', 'inflation-calculator', 'compound-interest-calculator'],
  },
  {
    slug: 'kalkulator-pelunasan-hutang',
    title: 'Kalkulator Pelunasan Hutang',
    description: 'Strategi pelunasan hutang lebih cepat dengan metode Snowball atau Avalanche.',
    category: 'Kredit',
    component: () => import('@/components/tools/DebtPayoffCalculatorTool.vue'),
    seoTitle: 'Kalkulator Pelunasan Hutang | Strategi Bebas Hutang',
    seoDescription:
      'Hitung waktu pelunasan hutang Anda dan lihat bagaimana cicilan tambahan dapat mempercepat proses menjadi bebas hutang.',
    intro:
      'Memiliki hutang bisa terasa membebani jika tidak dikelola dengan rencana yang jelas. Kalkulator ini membantu Anda melihat kapan hutang Anda akan lunas dan berapa total bunga yang harus dibayar berdasarkan cicilan saat ini.',
    content: [
      {
        heading: 'Pentingnya rencana pelunasan yang disiplin',
        paragraphs: [
          'Hutang dengan bunga tinggi bisa terus membengkak jika kita hanya membayar cicilan minimum. Dengan melihat timeline pelunasan yang konkret, Anda akan termotivasi untuk mengalokasikan dana lebih guna mempercepat proses tersebut.',
          'Tool ini menghitung sisa hutang terhadap bunga berjalan dan cicilan bulanan Anda. Anda bisa mencoba menambah nominal cicilan untuk melihat seberapa banyak waktu dan bunga yang bisa dihemat.',
        ],
      },
      {
        heading: 'Mengenal strategi pelunasan',
        paragraphs: [
          'Ada dua metode populer: Debt Avalanche (fokus pada hutang dengan bunga tertinggi dulu untuk menghemat biaya) dan Debt Snowball (fokus pada hutang terkecil dulu untuk membangun momentum psikologis).',
          'Apapun metodenya, kunci utamanya adalah konsistensi dan berhenti menambah hutang baru selama proses pelunasan berlangsung.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Apa itu metode Debt Snowball?',
        answer: 'Metode melunasi hutang dari saldo terkecil ke terbesar untuk mendapatkan rasa pencapaian lebih cepat.',
      },
      {
        question: 'Mana yang lebih baik, Avalanche atau Snowball?',
        answer: 'Avalanche secara matematis lebih hemat bunga, namun Snowball seringkali lebih efektif secara psikologis bagi banyak orang.',
      },
    ],
    relatedSlugs: ['loan-calculator', 'flat-installment-calculator', 'cash-flow-forecast'],
  },
];

const LEGACY_EN_CATEGORY_MAP: Record<string, string> = {
  Bisnis: 'Business',
  Keuangan: 'Finance',
  Pajak: 'Tax',
  Ritel: 'Retail',
  Analitik: 'Analytics',
  Analisis: 'Analytics',
  Penagihan: 'Billing',
  Harga: 'Pricing',
  Investasi: 'Investment',
  Kredit: 'Credit',
  Operasional: 'Operations',
  Utilitas: 'Utilities',
};

const LEGACY_EN_TITLE_MAP: Record<string, string> = {
  'kalkulator-diskon': 'Discount Calculator',
  'kalkulator-margin': 'Margin Calculator',
  'kalkulator-ppn': 'VAT Calculator',
  'salary-take-home-calculator': 'Take-Home Pay Calculator',
};

type LegacyEnProfile = {
  purpose: string;
  metrics: string;
  bestFor: string;
};

type SeoIntent = 'informational' | 'commercial' | 'transactional';

type EnglishSeoBlueprint = {
  intent: SeoIntent;
  focus: string;
  audience: string;
  benefit: string;
};

const LEGACY_EN_PROFILE_MAP: Record<string, LegacyEnProfile> = {
  'invoice-generator': {
    purpose: 'create professional invoices with automatic totals and tax-ready details',
    metrics: 'subtotal, VAT, and final payable amount',
    bestFor: 'service businesses and small teams',
  },
  'loan-calculator': {
    purpose: 'estimate monthly installments, total interest, and repayment structure',
    metrics: 'monthly payment, total interest, and amortization',
    bestFor: 'personal and business loan planning',
  },
  'kalkulator-diskon': {
    purpose: 'calculate discounted prices and customer savings instantly',
    metrics: 'discount value, final price, and savings rate',
    bestFor: 'retail promotions and campaign pricing',
  },
  'kalkulator-margin': {
    purpose: 'measure profitability from cost and selling price',
    metrics: 'profit amount, margin percentage, and markup',
    bestFor: 'pricing checks for products and services',
  },
  'kalkulator-ppn': {
    purpose: 'add or extract VAT accurately in sales pricing',
    metrics: 'tax value, net price, and gross price',
    bestFor: 'invoice preparation and tax-aware quoting',
  },
  'break-even-point': {
    purpose: 'find the sales volume needed to cover total costs',
    metrics: 'break-even units, fixed cost coverage, and contribution margin',
    bestFor: 'new products and operating planning',
  },
  'cash-flow-forecast': {
    purpose: 'project cash in, cash out, and future cash balance',
    metrics: 'net cash flow and ending cash position',
    bestFor: 'monthly cash planning and risk control',
  },
  'percentage-calculator': {
    purpose: 'solve percentage increase, decrease, and proportion scenarios quickly',
    metrics: 'percentage change and percentage value',
    bestFor: 'daily operations, reports, and quick validation',
  },
  'price-markup-calculator': {
    purpose: 'set selling prices from cost and markup targets',
    metrics: 'markup value, final price, and target margin signal',
    bestFor: 'retail and wholesale pricing decisions',
  },
  'compound-interest-calculator': {
    purpose: 'project future value growth with compounding returns',
    metrics: 'future value, interest earned, and growth effect',
    bestFor: 'savings and long-term investment planning',
  },
  'roi-calculator': {
    purpose: 'evaluate investment performance against capital spent',
    metrics: 'ROI percentage and net gain',
    bestFor: 'campaign, project, and asset evaluation',
  },
  'net-profit-margin-calculator': {
    purpose: 'assess final profitability after all business expenses',
    metrics: 'net profit and net margin ratio',
    bestFor: 'profitability tracking and performance review',
  },
  'salary-take-home-calculator': {
    purpose: 'estimate net salary after taxes and deductions',
    metrics: 'gross pay, deductions, and take-home pay',
    bestFor: 'employee payroll and personal budgeting',
  },
  'savings-goal-calculator': {
    purpose: 'plan how much to save to reach a financial target',
    metrics: 'monthly saving requirement and target timeline',
    bestFor: 'personal finance goals and disciplined saving',
  },
  'flat-installment-calculator': {
    purpose: 'calculate installment plans using a flat-interest method',
    metrics: 'installment amount, principal, and interest total',
    bestFor: 'simple financing and internal payment plans',
  },
  'working-capital-calculator': {
    purpose: 'estimate working capital needed for short-term operations',
    metrics: 'current asset coverage and liquidity gap',
    bestFor: 'operational cash management',
  },
  'gross-margin-calculator': {
    purpose: 'analyze gross profit from revenue and direct costs',
    metrics: 'gross profit and gross margin percentage',
    bestFor: 'product-level performance monitoring',
  },
  'revenue-projection-calculator': {
    purpose: 'forecast future revenue with growth assumptions',
    metrics: 'projected revenue and growth trajectory',
    bestFor: 'target setting and planning scenarios',
  },
  'expense-ratio-calculator': {
    purpose: 'measure how much revenue is consumed by expenses',
    metrics: 'expense ratio and cost pressure level',
    bestFor: 'operating efficiency reviews',
  },
  'tax-inclusive-price-calculator': {
    purpose: 'break down tax-inclusive prices into base amount and tax portion',
    metrics: 'net price and included tax value',
    bestFor: 'pricing communication and invoice checks',
  },
  'profit-calculator': {
    purpose: 'calculate net profit from revenue and costs',
    metrics: 'profit amount and profitability view',
    bestFor: 'daily business performance checks',
  },
  'loan-affordability-calculator': {
    purpose: 'estimate a safe loan size based on repayment capacity',
    metrics: 'affordable installment and recommended loan range',
    bestFor: 'pre-application credit planning',
  },
  'payment-due-date-calculator': {
    purpose: 'determine payment deadlines from invoice issue dates and terms',
    metrics: 'due date and payment window',
    bestFor: 'accounts receivable scheduling',
  },
  'unit-cost-calculator': {
    purpose: 'compute cost per unit from fixed and variable costs',
    metrics: 'unit cost and production cost structure',
    bestFor: 'manufacturing and pricing control',
  },
  'simple-interest-calculator': {
    purpose: 'calculate interest and maturity value using simple interest',
    metrics: 'interest amount and final payable value',
    bestFor: 'short-term lending and basic financial checks',
  },
  'discount-reverse-calculator': {
    purpose: 'recover original prices from discounted selling prices',
    metrics: 'original price and implied discount amount',
    bestFor: 'promotion analysis and pricing audits',
  },
  'vat-reverse-calculator': {
    purpose: 'extract pre-tax value from VAT-inclusive totals',
    metrics: 'base amount and VAT amount',
    bestFor: 'billing verification and tax reconciliation',
  },
  'sales-commission-calculator': {
    purpose: 'compute sales commissions from achieved sales and rate rules',
    metrics: 'commission payout and incentive value',
    bestFor: 'sales team compensation planning',
  },
  'break-even-revenue-calculator': {
    purpose: 'estimate the minimum revenue required to avoid losses',
    metrics: 'break-even revenue and coverage threshold',
    bestFor: 'target planning and viability analysis',
  },
  'profit-target-calculator': {
    purpose: 'calculate sales needed to reach a specific profit goal',
    metrics: 'target revenue and required contribution',
    bestFor: 'goal-based planning and monthly targets',
  },
  'invoice-tax-breakdown-calculator': {
    purpose: 'split invoice totals into taxable base, tax, and grand total',
    metrics: 'invoice subtotal, tax breakdown, and payable total',
    bestFor: 'clean invoice documentation',
  },
  'cash-runway-calculator': {
    purpose: 'estimate how long current cash can sustain operations',
    metrics: 'runway duration and monthly burn pressure',
    bestFor: 'startup and cash-risk monitoring',
  },
  'stock-reorder-point-calculator': {
    purpose: 'set reorder triggers from demand and supplier lead time',
    metrics: 'reorder point and replenishment timing',
    bestFor: 'inventory continuity planning',
  },
  'gross-profit-target-calculator': {
    purpose: 'find required sales to hit a desired gross profit level',
    metrics: 'required revenue and gross profit target gap',
    bestFor: 'pricing and profitability targets',
  },
  'shipping-margin-calculator': {
    purpose: 'measure profit after shipping and fulfillment costs',
    metrics: 'post-shipping margin and real order profit',
    bestFor: 'e-commerce order profitability checks',
  },
  'kalkulator-zakat': {
    purpose: 'calculate your zakat obligations for income and gold based on the latest nisab',
    metrics: 'zakat payable and nisab status',
    bestFor: 'religious financial planning and compliance',
  },
  'kalkulator-dana-darurat': {
    purpose: 'determine the ideal emergency fund size based on your expenses and lifestyle',
    metrics: 'target fund size and months of coverage',
    bestFor: 'personal financial security and safety nets',
  },
  'kalkulator-inflasi': {
    purpose: 'visualize how inflation impacts your money and purchasing power over time',
    metrics: 'future value and cost of living increase',
    bestFor: 'long-term planning and investment education',
  },
  'kalkulator-dana-pendidikan': {
    purpose: 'plan for future education costs by factoring in education-specific inflation',
    metrics: 'future tuition cost and required monthly savings',
    bestFor: 'parents planning for their children\'s education',
  },
  'kalkulator-pelunasan-hutang': {
    purpose: 'calculate your debt payoff timeline and see the total interest cost',
    metrics: 'months to payoff and total interest paid',
    bestFor: 'debt management and clearance strategies',
  },
};

export const EN_SEO_BLUEPRINTS: Record<string, EnglishSeoBlueprint> = {
  'invoice-generator': {
    intent: 'transactional',
    focus: 'Invoice Generator',
    audience: 'Freelancers & Small Businesses',
    benefit: 'Create polished invoices with tax-ready totals',
  },
  'loan-calculator': {
    intent: 'commercial',
    focus: 'Loan Payment',
    audience: 'Personal & Business Borrowers',
    benefit: 'Estimate monthly installments and total interest',
  },
  'kalkulator-diskon': {
    intent: 'transactional',
    focus: 'Discount',
    audience: 'Retail Sellers & Online Stores',
    benefit: 'Calculate final prices and savings instantly',
  },
  'kalkulator-margin': {
    intent: 'commercial',
    focus: 'Profit Margin',
    audience: 'Sellers & Business Owners',
    benefit: 'Set healthier prices with clear margin insights',
  },
  'kalkulator-ppn': {
    intent: 'transactional',
    focus: 'VAT',
    audience: 'SMEs & Invoice Teams',
    benefit: 'Add or extract VAT quickly and accurately',
  },
  'break-even-point': {
    intent: 'informational',
    focus: 'Break-Even Point',
    audience: 'Startup Founders & Managers',
    benefit: 'Know how many units you must sell to break even',
  },
  'cash-flow-forecast': {
    intent: 'informational',
    focus: 'Cash Flow Forecast',
    audience: 'Finance Teams & Founders',
    benefit: 'Project cash balance and avoid shortfalls early',
  },
  'percentage-calculator': {
    intent: 'transactional',
    focus: 'Percentage',
    audience: 'Students, Teams, and Daily Users',
    benefit: 'Solve increase, decrease, and ratio questions fast',
  },
  'price-markup-calculator': {
    intent: 'commercial',
    focus: 'Markup Price',
    audience: 'Retail & Wholesale Sellers',
    benefit: 'Turn costs into profitable selling prices',
  },
  'compound-interest-calculator': {
    intent: 'informational',
    focus: 'Compound Interest',
    audience: 'Investors & Savers',
    benefit: 'See long-term growth from compounding returns',
  },
  'roi-calculator': {
    intent: 'commercial',
    focus: 'ROI',
    audience: 'Founders, Marketers, and Analysts',
    benefit: 'Measure return quickly before committing budget',
  },
  'net-profit-margin-calculator': {
    intent: 'commercial',
    focus: 'Net Profit Margin',
    audience: 'Finance Teams & Business Owners',
    benefit: 'Track bottom-line profitability with confidence',
  },
  'salary-take-home-calculator': {
    intent: 'transactional',
    focus: 'Take-Home Pay',
    audience: 'Employees & HR Teams',
    benefit: 'Estimate net salary after deductions in seconds',
  },
  'savings-goal-calculator': {
    intent: 'informational',
    focus: 'Savings Goal',
    audience: 'Personal Finance Planners',
    benefit: 'Plan monthly savings needed to hit your target',
  },
  'flat-installment-calculator': {
    intent: 'transactional',
    focus: 'Flat Installment',
    audience: 'Finance Admins & Borrowers',
    benefit: 'Calculate fixed installments with flat interest',
  },
  'working-capital-calculator': {
    intent: 'commercial',
    focus: 'Working Capital',
    audience: 'SMEs & Operations Teams',
    benefit: 'Check liquidity needs for daily operations',
  },
  'gross-margin-calculator': {
    intent: 'commercial',
    focus: 'Gross Margin',
    audience: 'Product and Sales Teams',
    benefit: 'Measure profit before operating expenses',
  },
  'revenue-projection-calculator': {
    intent: 'informational',
    focus: 'Revenue Projection',
    audience: 'Founders & Planning Teams',
    benefit: 'Forecast future sales with clear assumptions',
  },
  'expense-ratio-calculator': {
    intent: 'informational',
    focus: 'Expense Ratio',
    audience: 'Finance Managers',
    benefit: 'See how much revenue is consumed by costs',
  },
  'tax-inclusive-price-calculator': {
    intent: 'transactional',
    focus: 'Tax-Inclusive Price',
    audience: 'Sales and Billing Teams',
    benefit: 'Split tax-inclusive totals into base and tax',
  },
  'profit-calculator': {
    intent: 'transactional',
    focus: 'Profit',
    audience: 'Business Owners & Store Managers',
    benefit: 'Calculate profit fast from revenue and costs',
  },
  'loan-affordability-calculator': {
    intent: 'commercial',
    focus: 'Loan Affordability',
    audience: 'Borrowers & Loan Applicants',
    benefit: 'Find a safer loan amount for your budget',
  },
  'payment-due-date-calculator': {
    intent: 'transactional',
    focus: 'Payment Due Date',
    audience: 'Billing Teams & Freelancers',
    benefit: 'Set accurate due dates from payment terms',
  },
  'unit-cost-calculator': {
    intent: 'commercial',
    focus: 'Unit Cost',
    audience: 'Manufacturing & Operations Teams',
    benefit: 'Know true cost per item before pricing',
  },
  'simple-interest-calculator': {
    intent: 'informational',
    focus: 'Simple Interest',
    audience: 'Students, Borrowers, and Savers',
    benefit: 'Calculate interest and final value quickly',
  },
  'discount-reverse-calculator': {
    intent: 'transactional',
    focus: 'Original Price from Discount',
    audience: 'Retail Teams & Sellers',
    benefit: 'Recover pre-discount prices accurately',
  },
  'vat-reverse-calculator': {
    intent: 'transactional',
    focus: 'VAT Reverse',
    audience: 'Finance & Tax Teams',
    benefit: 'Extract pre-tax values from VAT-inclusive totals',
  },
  'sales-commission-calculator': {
    intent: 'transactional',
    focus: 'Sales Commission',
    audience: 'Sales Managers & Teams',
    benefit: 'Calculate commission payouts quickly and clearly',
  },
  'break-even-revenue-calculator': {
    intent: 'informational',
    focus: 'Break-Even Revenue',
    audience: 'Founders & Finance Teams',
    benefit: 'Estimate minimum revenue needed to avoid losses',
  },
  'profit-target-calculator': {
    intent: 'commercial',
    focus: 'Profit Target',
    audience: 'Business Owners',
    benefit: 'Find the sales needed to hit your profit goal',
  },
  'invoice-tax-breakdown-calculator': {
    intent: 'transactional',
    focus: 'Invoice Tax Breakdown',
    audience: 'Billing & Accounting Teams',
    benefit: 'Separate subtotal, tax, and total instantly',
  },
  'cash-runway-calculator': {
    intent: 'commercial',
    focus: 'Cash Runway',
    audience: 'Startups & Finance Leads',
    benefit: 'Estimate how long your cash can sustain operations',
  },
  'stock-reorder-point-calculator': {
    intent: 'commercial',
    focus: 'Reorder Point',
    audience: 'Inventory & Procurement Teams',
    benefit: 'Set smarter reorder triggers to avoid stockouts',
  },
  'gross-profit-target-calculator': {
    intent: 'commercial',
    focus: 'Gross Profit Target',
    audience: 'Sales & Finance Teams',
    benefit: 'Calculate revenue needed to reach gross profit goals',
  },
  'shipping-margin-calculator': {
    intent: 'transactional',
    focus: 'Shipping Margin',
    audience: 'Online Sellers',
    benefit: 'See real profit after shipping and fulfillment costs',
  },
  'late-payment-interest-calculator': {
    intent: 'transactional',
    focus: 'Late Payment Interest',
    audience: 'Freelancers & Billing Teams',
    benefit: 'Calculate overdue fees and updated invoice totals',
  },
  'subscription-pricing-calculator': {
    intent: 'commercial',
    focus: 'Subscription Pricing',
    audience: 'SaaS Founders & Product Teams',
    benefit: 'Set profitable recurring prices from cost targets',
  },
  'safety-stock-calculator': {
    intent: 'commercial',
    focus: 'Safety Stock',
    audience: 'Inventory Managers',
    benefit: 'Set buffer stock levels to reduce stockout risk',
  },
  'invoice-due-date-calculator': {
    intent: 'transactional',
    focus: 'Invoice Due Date',
    audience: 'Freelancers & AR Teams',
    benefit: 'Generate due dates quickly from payment terms',
  },
  'average-order-value-calculator': {
    intent: 'informational',
    focus: 'Average Order Value',
    audience: 'Ecommerce & Growth Teams',
    benefit: 'Track transaction quality and campaign impact',
  },
  'kalkulator-zakat': {
    intent: 'transactional',
    focus: 'Zakat',
    audience: 'Muslim Professionals & Individuals',
    benefit: 'Calculate zakat mal and profession zakat accurately',
  },
  'kalkulator-dana-darurat': {
    intent: 'informational',
    focus: 'Emergency Fund',
    audience: 'Individuals & Families',
    benefit: 'Build a solid financial safety net for unexpected events',
  },
  'kalkulator-inflasi': {
    intent: 'informational',
    focus: 'Inflation',
    audience: 'Savers & Investors',
    benefit: 'Understand how inflation erodes your wealth over time',
  },
  'kalkulator-dana-pendidikan': {
    intent: 'commercial',
    focus: 'Education Fund',
    audience: 'Parents & Guardians',
    benefit: 'Save enough for your children\'s future education costs',
  },
  'kalkulator-pelunasan-hutang': {
    intent: 'commercial',
    focus: 'Debt Payoff',
    audience: 'Borrowers & Debtors',
    benefit: 'Create a clear plan to become debt-free faster',
  },
};

function trimText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function fitTitle(value: string) {
  const cleaned = trimText(value);
  if (cleaned.length <= 70) {
    return cleaned;
  }
  return cleaned.slice(0, 70).replace(/\s+\S*$/, '').trim();
}

function pickBestTitle(candidates: string[]) {
  const normalized = candidates.map((item) => trimText(item));
  return fitTitle(normalized.find((item) => item.length <= 70) ?? normalized[0]);
}

function fitMetaDescription(value: string) {
  let result = trimText(value);
  if (result.length < 140) {
    result = `${result} No signup needed.`;
  }
  if (result.length < 140) {
    result = `${result} Try it now.`;
  }
  if (result.length <= 160) {
    return result;
  }
  return `${result.slice(0, 157).replace(/\s+\S*$/, '').trim()}...`;
}

function buildEnglishSeoMeta(tool: ToolDefinition) {
  const englishTitle = tool.localized?.en?.title ?? LEGACY_EN_TITLE_MAP[tool.slug] ?? tool.title;
  const blueprint = EN_SEO_BLUEPRINTS[tool.slug] ?? {
    intent: 'transactional',
    focus: englishTitle,
    audience: 'Business Users',
    benefit: 'Get accurate results quickly',
  };

  const hash = [...tool.slug].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variant = hash % 2;

  let titleCandidates: string[] = [];
  if (blueprint.intent === 'informational') {
    titleCandidates =
      variant === 0
        ? [
            `How to Calculate ${blueprint.focus} (Free Online Tool)`,
            `${blueprint.focus} Formula & Calculator (Free Online)`,
            `${blueprint.focus} Calculator (Free & Accurate)`,
          ]
        : [
            `${blueprint.focus} Formula & Calculator (Free Online)`,
            `How to Calculate ${blueprint.focus} (Free Online Tool)`,
            `${blueprint.focus} Calculator (Free & Accurate)`,
          ];
  } else if (blueprint.intent === 'commercial') {
    titleCandidates =
      variant === 0
        ? [
            `Best ${blueprint.focus} Calculator for ${blueprint.audience}`,
            `${blueprint.focus} Calculator for ${blueprint.audience} (Instant)`,
            `${blueprint.focus} Calculator (Free & Accurate)`,
          ]
        : [
            `${blueprint.focus} Calculator for ${blueprint.audience} (Instant)`,
            `Best ${blueprint.focus} Calculator for ${blueprint.audience}`,
            `${blueprint.focus} Calculator (Free & Accurate)`,
          ];
  } else {
    titleCandidates =
      variant === 0
        ? [
            `Free ${blueprint.focus} Calculator Online for ${blueprint.audience}`,
            `${blueprint.focus} Tool for ${blueprint.audience} (Free & Accurate)`,
            `Free ${blueprint.focus} Calculator Online`,
          ]
        : [
            `${blueprint.focus} Tool for ${blueprint.audience} (Free & Accurate)`,
            `Free ${blueprint.focus} Calculator Online for ${blueprint.audience}`,
            `Free ${blueprint.focus} Calculator Online`,
          ];
  }

  const title = pickBestTitle(titleCandidates);
  const description = fitMetaDescription(
    `${blueprint.benefit}. Built for ${blueprint.audience}, this free online ${englishTitle.toLowerCase()} gives accurate results in seconds for faster decisions.`,
  );

  return { title, description };
}

function buildLegacyEnglishCopy(tool: ToolDefinition): ToolLocalizedCopy {
  const title = LEGACY_EN_TITLE_MAP[tool.slug] ?? tool.title;
  const category = LEGACY_EN_CATEGORY_MAP[tool.category] ?? tool.category;
  const profile = LEGACY_EN_PROFILE_MAP[tool.slug] ?? {
    purpose: `calculate ${title.toLowerCase()} results for practical business decisions`,
    metrics: 'key outputs and planning indicators',
    bestFor: 'day-to-day business use',
  };

  return {
    title,
    description: `Use this ${title.toLowerCase()} to ${profile.purpose}.`,
    category,
    seoTitle: `${title} | ${category} Calculator`,
    seoDescription: `Use the ${title.toLowerCase()} to track ${profile.metrics} for ${profile.bestFor}.`,
    intro: `The ${title.toLowerCase()} helps you ${profile.purpose} so decisions stay faster, clearer, and easier to validate.`,
    content: [
      {
        heading: `What this ${title.toLowerCase()} helps you measure`,
        paragraphs: [
          `You can quickly calculate ${profile.metrics} without manual formulas, which reduces errors and keeps reporting more consistent.`,
          `This is especially useful for ${profile.bestFor}, where repeatable calculations are needed before executing a pricing, budgeting, sales, or finance action.`,
        ],
      },
      {
        heading: 'How to get better decisions from the result',
        paragraphs: [
          'Enter your key inputs, review the result, then compare two to three scenarios to see which option best matches your target outcome.',
          'For better planning quality, combine this output with related tools in the catalog so assumptions and follow-up calculations remain aligned.',
        ],
      },
    ],
    faqs: [
      {
        question: `What can I evaluate with the ${title.toLowerCase()}?`,
        answer: `You can evaluate ${profile.metrics} to support ${profile.bestFor} with faster and clearer calculations.`,
      },
      {
        question: 'Can this be used for quick scenario comparison?',
        answer:
          'Yes. Change the inputs and compare multiple scenarios to test assumptions before finalizing your decision.',
      },
    ],
  };
}

for (const tool of tools) {
  const englishSeo = buildEnglishSeoMeta(tool);
  tool.seoTitle_en = englishSeo.title;
  tool.seoDescription_en = englishSeo.description;

  if (tool.localized?.en) {
    tool.localized.en = {
      ...tool.localized.en,
      seoTitle: englishSeo.title,
      seoDescription: englishSeo.description,
    };
    continue;
  }
  tool.localized = {
    ...tool.localized,
    en: {
      ...buildLegacyEnglishCopy(tool),
      seoTitle: englishSeo.title,
      seoDescription: englishSeo.description,
    },
  };
}

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function resolveToolPresentation(tool: ToolDefinition, locale: Locale) {
  const localized = tool.localized?.[locale];
  const englishSeoTitle = tool.seoTitle_en ?? tool.localized?.en?.seoTitle;
  const englishSeoDescription = tool.seoDescription_en ?? tool.localized?.en?.seoDescription;
  return {
    ...tool,
    title: localized?.title ?? tool.title,
    description: localized?.description ?? tool.description,
    category: localized?.category ?? tool.category,
    seoTitle:
      locale === 'en' ? englishSeoTitle ?? localized?.seoTitle ?? tool.seoTitle : localized?.seoTitle ?? tool.seoTitle,
    seoDescription:
      locale === 'en'
        ? englishSeoDescription ?? localized?.seoDescription ?? tool.seoDescription
        : localized?.seoDescription ?? tool.seoDescription,
    intro: localized?.intro ?? tool.intro,
    content: localized?.content ?? tool.content,
    faqs: localized?.faqs ?? tool.faqs,
  };
}
