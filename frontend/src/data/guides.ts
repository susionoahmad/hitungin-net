export type GuideTable = {
  headers: string[];
  rows: string[][];
};

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  formula?: string;
  table?: GuideTable;
};

export type GuideArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: string;
  readTimeMinutes: number;
  publishedAt: string;
  updatedAt: string;
  summary: string;
  keyTakeaways: string[];
  sections: GuideSection[];
  relatedToolSlugs: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export const guides: GuideArticle[] = [
  {
    slug: 'panduan-margin-vs-markup-umkm',
    title: 'Perbedaan Margin dan Markup dalam Penentuan Harga Jual UMKM',
    seoTitle: 'Perbedaan Margin vs Markup & Cara Menghitung Harga Jual UMKM | Kalkulatorin',
    description:
      'Pelajari perbedaan mendasar antara margin keuntungan dan markup harga jual, rumus lengkap, tabel konversi, serta contoh perhitungan untuk bisnis ritel dan UMKM.',
    category: 'Bisnis & Pricing',
    readTimeMinutes: 7,
    publishedAt: '2026-08-10',
    updatedAt: '2026-11-18',
    summary:
      'Banyak pelaku usaha mengira menaikkan harga 30% dari modal berarti mendapatkan margin 30%. Panduan ini meluruskan perbedaan margin dan markup lengkap dengan contoh angka Rupiah dan strategi diskon aman.',
    keyTakeaways: [
      'Margin dihitung dari harga jual (pendapatan), sedangkan markup dihitung dari harga pokok/modal (HPP).',
      'Markup 50% hanya menghasilkan margin kotor sebesar 33,33%, bukan 50%.',
      'Sebelum memberi diskon atau ikut promo marketplace, selalu hitung ulang margin bersih setelah biaya admin dan ongkir.',
    ],
    sections: [
      {
        heading: 'Mengapa Margin dan Markup Sering Tertukar?',
        paragraphs: [
          'Dalam operasional harian UMKM, toko ritel, maupun penjual online di marketplace, istilah margin dan markup kerap dianggap sama. Padahal, keduanya memakai penyebut yang berbeda. Kesalahan memahami perbedaan ini adalah salah satu penyebab paling umum mengapa omzet terlihat tinggi, tetapi kas usaha tetap seret di akhir bulan.',
          'Margin menunjukkan berapa persen dari setiap Rupiah penjualan yang benar-benar menjadi laba kotor sebelum biaya operasional. Sementara itu, markup menunjukkan berapa persen tambahan harga yang Anda naikkan di atas harga pokok pembelian atau biaya produksi (HPP).',
        ],
      },
      {
        heading: 'Rumus Margin dan Rumus Markup',
        paragraphs: [
          'Agar tidak tertukar saat menyusun daftar harga produk, gunakan dua rumus standar berikut secara konsisten:',
        ],
        formula:
          'Margin (%) = ((Harga Jual - HPP) / Harga Jual) × 100%  |  Markup (%) = ((Harga Jual - HPP) / HPP) × 100%',
        bullets: [
          'Laba Kotor = Harga Jual − HPP (Harga Pokok Penjualan)',
          'Menentukan Harga Jual dari Target Margin: Harga Jual = HPP / (1 − Target Margin)',
          'Menentukan Harga Jual dari Target Markup: Harga Jual = HPP × (1 + Target Markup)',
        ],
      },
      {
        heading: 'Tabel Konversi Markup ke Margin dan Contoh Rupiah',
        paragraphs: [
          'Misalkan Anda menjual produk fesyen dengan HPP Rp100.000 per potong. Perhatikan bagaimana persentase markup yang sama menghasilkan persentase margin yang jauh lebih kecil:',
        ],
        table: {
          headers: ['HPP (Modal)', 'Target Markup', 'Harga Jual', 'Laba Kotor', 'Margin Aktual'],
          rows: [
            ['Rp100.000', '20%', 'Rp120.000', 'Rp20.000', '16,67%'],
            ['Rp100.000', '25%', 'Rp125.000', 'Rp25.000', '20,00%'],
            ['Rp100.000', '33,33%', 'Rp133.333', 'Rp33.333', '25,00%'],
            ['Rp100.000', '50%', 'Rp150.000', 'Rp50.000', '33,33%'],
            ['Rp100.000', '100%', 'Rp200.000', 'Rp100.000', '50,00%'],
          ],
        },
      },
      {
        heading: 'Dampak Diskon dan Biaya Marketplace Terhadap Margin',
        paragraphs: [
          'Bayangkan Anda menetapkan markup 30% pada produk bermodal Rp100.000 sehingga harga jualnya Rp130.000 (margin aktual 23,08%). Jika Anda kemudian memberikan diskon 15% saat kampanye tanggal kembar dan terkena biaya layanan marketplace 8% dari harga jual, pendapatan bersih Anda turun menjadi sekitar Rp101.660.',
          'Artinya, laba kotor per transaksi menyusut drastis dari Rp30.000 menjadi hanya Rp1.660 — belum termasuk biaya kemasan, iklan, dan gaji admin. Oleh karena itu, penetapan harga jual sebaiknya selalu dimulai dari target margin bersih setelah memperhitungkan semua potongan kanal penjualan.',
        ],
        bullets: [
          'Catat seluruh komponen HPP: bahan baku, kemasan, label, dan ongkir bahan masuk.',
          'Tambahkan buffer minimal 10%–15% di atas margin ideal jika produk sering diikutkan program voucher atau gratis ongkir.',
          'Evaluasi margin per SKU setiap kuartal agar produk bervolume besar tidak diam-diam merugi.',
        ],
      },
    ],
    relatedToolSlugs: [
      'kalkulator-margin',
      'price-markup-calculator',
      'gross-margin-calculator',
      'kalkulator-diskon',
      'shipping-margin-calculator',
    ],
    faqs: [
      {
        question: 'Mana yang lebih tepat dipakai untuk laporan keuangan: margin atau markup?',
        answer:
          'Untuk evaluasi profitabilitas dan laporan laba rugi, gunakan margin (gross margin dan net profit margin) karena langsung membandingkan laba terhadap total pendapatan. Markup lebih cocok dipakai saat menentukan harga jual awal dari daftar HPP.',
      },
      {
        question: 'Berapa margin kotor yang sehat untuk UMKM di Indonesia?',
        answer:
          'Tergantung industrinya. Bisnis sembako atau distribusi umumnya berada di kisaran 10%–20%, kuliner dan F&B idealnya 40%–60%, sementara produk fesyen, kosmetik, atau jasa digital biasanya menargetkan margin kotor 50%–70% agar mampu menutup biaya pemasaran dan operasional.',
      },
    ],
  },
  {
    slug: 'panduan-pph-21-dan-ptkp-karyawan',
    title: 'Panduan Lengkap Menghitung PPh 21, PTKP, dan Tarif Progresif UU HPP',
    seoTitle: 'Cara Menghitung PPh 21 Karyawan, Tabel PTKP & Tarif UU HPP | Kalkulatorin',
    description:
      'Pahami cara kerja pemotongan PPh 21 karyawan tetap, daftar PTKP TK/0 hingga K/3, lapisan tarif progresif UU HPP 5%–35%, serta contoh perhitungan gaji bulanan.',
    category: 'Pajak Indonesia',
    readTimeMinutes: 8,
    publishedAt: '2026-08-18',
    updatedAt: '2026-11-18',
    summary:
      'Penghasilan karyawan di atas batas PTKP dikenakan Pajak Penghasilan Pasal 21. Artikel ini menjelaskan struktur PTKP, lapisan tarif progresif UU HPP, dan simulasi potongan pajak agar Anda bisa memverifikasi slip gaji dengan tepat.',
    keyTakeaways: [
      'Tarif progresif UU HPP No. 7 Tahun 2021 terdiri dari 5 lapisan: 5%, 15%, 25%, 30%, dan 35%.',
      'Batas Penghasilan Tidak Kena Pajak (PTKP) untuk lajang tanpa tanggungan (TK/0) adalah Rp54.000.000 per tahun atau setara Rp4.500.000 per bulan.',
      'Setiap tambahan status menikah atau tanggungan keluarga (maksimal 3 tanggungan) menambah PTKP sebesar Rp4.500.000 per tahun.',
    ],
    sections: [
      {
        heading: 'Apa Itu PPh 21 dan Siapa yang Wajib Dipotong?',
        paragraphs: [
          'Pajak Penghasilan Pasal 21 (PPh 21) adalah pajak atas penghasilan berupa gaji, upah, honorarium, tunjangan, bonus, maupun pembayaran lain sehubungan dengan pekerjaan, jasa, atau kegiatan yang diterima wajib pajak orang pribadi dalam negeri.',
          'Bagi karyawan tetap, pemotongan PPh 21 dilakukan langsung oleh pemberi kerja setiap bulan dan dilaporkan dalam bukti potong tahunan (Formulir 1721-A1 untuk pegawai swasta atau 1721-A2 untuk ASN/TNI/Polri). Memahami mekanisme dasarnya membantu karyawan membaca slip gaji secara kritis serta membantu tim HR menyusun simulasi anggaran gaji.',
        ],
      },
      {
        heading: 'Daftar PTKP (Penghasilan Tidak Kena Pajak) yang Berlaku',
        paragraphs: [
          'PTKP adalah batas penghasilan neto tahunan yang dibebaskan dari pengenaan pajak. Besarnya ditentukan berdasarkan status perkawinan dan jumlah tanggungan sedarah/semenda dalam garis keturunan lurus pada awal tahun pajak (1 Januari):',
        ],
        table: {
          headers: ['Status PTKP', 'Keterangan', 'PTKP per Tahun', 'Rata-Rata per Bulan'],
          rows: [
            ['TK/0', 'Tidak Kawin, 0 tanggungan', 'Rp54.000.000', 'Rp4.500.000'],
            ['TK/1', 'Tidak Kawin, 1 tanggungan', 'Rp58.500.000', 'Rp4.875.000'],
            ['K/0', 'Kawin, 0 tanggungan', 'Rp58.500.000', 'Rp4.875.000'],
            ['K/1', 'Kawin, 1 tanggungan', 'Rp63.000.000', 'Rp5.250.000'],
            ['K/2', 'Kawin, 2 tanggungan', 'Rp67.500.000', 'Rp5.625.000'],
            ['K/3', 'Kawin, 3 tanggungan (maksimal)', 'Rp72.000.000', 'Rp6.000.000'],
          ],
        },
      },
      {
        heading: 'Lapisan Tarif Progresif Pasal 17 UU HPP',
        paragraphs: [
          'Setelah penghasilan neto setahun dikurangi PTKP, sisanya disebut Penghasilan Kena Pajak (PKP) yang dibulatkan ke bawah dalam ribuan penuh. Pajak dihitung secara berlapis (progresif), bukan langsung mengenakan tarif tertinggi pada seluruh penghasilan:',
        ],
        table: {
          headers: ['Lapisan PKP Tahunan', 'Tarif Pajak'],
          rows: [
            ['Sampai dengan Rp60.000.000', '5%'],
            ['Di atas Rp60.000.000 s.d. Rp250.000.000', '15%'],
            ['Di atas Rp250.000.000 s.d. Rp500.000.000', '25%'],
            ['Di atas Rp500.000.000 s.d. Rp5.000.000.000', '30%'],
            ['Di atas Rp5.000.000.000', '35%'],
          ],
        },
      },
      {
        heading: 'Contoh Simulasi Perhitungan PPh 21 Setahun',
        paragraphs: [
          'Misalkan seorang karyawan berstatus K/1 (menikah dengan 1 anak) memiliki penghasilan neto sebesar Rp12.000.000 per bulan atau Rp144.000.000 per tahun. Dengan PTKP K/1 sebesar Rp63.000.000, maka PKP setahunnya adalah Rp144.000.000 − Rp63.000.000 = Rp81.000.000.',
          'Karena PKP melampaui lapisan pertama Rp60.000.000, perhitungannya dibagi dua lapisan: 5% × Rp60.000.000 = Rp3.000.000 ditambah 15% × Rp21.000.000 = Rp3.150.000. Total PPh 21 terutang setahun adalah Rp6.150.000, atau sekitar Rp512.500 per bulan.',
        ],
        formula: 'PPh 21 Terutang = Σ (PKP pada Lapisan ke-i × Tarif Lapisan ke-i)',
        bullets: [
          'Pada mekanisme TER (Tarif Efektif Rata-Rata) bulanan sejak 2024, pemotongan Januari–November memakai tabel TER, lalu direkonsiliasi di masa Desember menggunakan tarif progresif Pasal 17 UU HPP di atas.',
          'Total pajak setahun pada akhir tahun tetap mengikuti hasil perhitungan tarif progresif Pasal 17 UU HPP.',
          'Pastikan NIK Anda sudah dipadankan sebagai NPWP agar tidak terkendala administrasi perpajakan.',
        ],
      },
    ],
    relatedToolSlugs: ['kalkulator-pph-21', 'salary-take-home-calculator', 'kalkulator-thr', 'kalkulator-pesangon'],
    faqs: [
      {
        question: 'Apakah gaji di bawah Rp4,5 juta per bulan dikenakan PPh 21?',
        answer:
          'Untuk karyawan berstatus TK/0 dengan penghasilan neto tidak melebihi Rp54.000.000 setahun (rata-rata Rp4.500.000/bulan), PKP bernilai nol sehingga PPh 21 terutangnya adalah Rp0.',
      },
      {
        question: 'Mengapa potongan PPh 21 di bulan Desember bisa berbeda dengan bulan lain?',
        answer:
          'Pada masa pajak Desember, pemberi kerja menghitung ulang total kewajiban PPh 21 setahun penuh menggunakan tarif progresif Pasal 17 UU HPP lalu menguranginya dengan total pajak yang sudah dipotong pada Januari–November. Selisihnya itulah yang dipotong (atau dikembalikan) di bulan Desember.',
      },
    ],
  },
  {
    slug: 'panduan-ppn-11-persen-dan-invoice-bisnis',
    title: 'Panduan PPN 11%, Pemisahan Harga Inklusif Pajak, dan Pembuatan Invoice Bisnis',
    seoTitle: 'Cara Menghitung PPN 11%, DPP & Invoice Profesional UMKM | Kalkulatorin',
    description:
      'Pelajari rumus menghitung PPN 11% dari harga sebelum pajak maupun harga sudah termasuk PPN (reverse VAT), serta elemen wajib pada invoice bisnis Indonesia.',
    category: 'Pajak & Penagihan',
    readTimeMinutes: 6,
    publishedAt: '2026-08-25',
    updatedAt: '2026-11-18',
    summary:
      'Salah memisahkan DPP dan PPN 11% pada harga inklusif pajak adalah kesalahan yang sering terjadi di tim billing. Panduan ini membahas rumus tambah PPN, rumus ekstrak PPN, dan standar isi invoice profesional.',
    keyTakeaways: [
      'Menghitung harga sudah termasuk PPN 11%: kalikan DPP dengan 1,11.',
      'Mengekstrak DPP dari harga yang sudah termasuk PPN 11%: bagi total dengan 1,11 (bukan dikurangi 11% langsung!).',
      'Invoice yang rapi minimal memuat nomor urut, tanggal terbit, jatuh tempo, rincian item, DPP, PPN (jika PKP), dan rekening tujuan.',
    ],
    sections: [
      {
        heading: 'Kesalahan Umum Saat Menghitung Harga Sudah Termasuk PPN',
        paragraphs: [
          'Ketika klien menyepakati harga final Rp11.100.000 sudah termasuk PPN 11%, kesalahan yang sangat sering dilakukan adalah mengalikan Rp11.100.000 × 11% = Rp1.221.000 lalu menganggap DPP-nya Rp9.879.000. Angka tersebut salah karena jika Rp9.879.000 ditambah PPN 11%, hasilnya hanya Rp10.965.690.',
          'Cara yang benar secara matematis dan sesuai ketentuan perpajakan adalah membagi nilai inklusif pajak dengan (1 + tarif PPN), yakni 1,11. Dengan demikian, Rp11.100.000 / 1,11 menghasilkan DPP tepat Rp10.000.000 dan PPN Rp1.100.000.',
        ],
        formula:
          'Tambah PPN: Total = DPP × 1,11  |  Ekstrak PPN (Inklusif): DPP = Total / 1,11 dan PPN = Total − DPP',
      },
      {
        heading: 'Perbandingan Contoh Perhitungan Eksklusif vs Inklusif PPN',
        paragraphs: [
          'Tabel berikut membandingkan dua skenario penawaran harga agar tim sales dan finance Anda selalu selaras:',
        ],
        table: {
          headers: ['Skenario', 'Angka Acuan', 'DPP (Harga Dasar)', 'Nilai PPN 11%', 'Total Tagihan'],
          rows: [
            ['Belum termasuk PPN', 'DPP Rp5.000.000', 'Rp5.000.000', 'Rp550.000', 'Rp5.550.000'],
            ['Sudah termasuk PPN', 'Total Rp5.000.000', 'Rp4.504.505', 'Rp495.495', 'Rp5.000.000'],
            ['Belum termasuk PPN', 'DPP Rp25.000.000', 'Rp25.000.000', 'Rp2.750.000', 'Rp27.750.000'],
            ['Sudah termasuk PPN', 'Total Rp25.000.000', 'Rp22.522.523', 'Rp2.477.477', 'Rp25.000.000'],
          ],
        },
      },
      {
        heading: 'Daftar Periksa Elemen Wajib pada Invoice Bisnis',
        paragraphs: [
          'Invoice yang terstruktur mempercepat proses persetujuan pembayaran di bagian finance klien B2B dan mengurangi revisi berulang. Pastikan setiap invoice yang Anda kirimkan selalu mencantumkan komponen berikut:',
        ],
        bullets: [
          'Nomor invoice unik dan berurutan (misalnya INV/2026/11/0042) agar mudah direkonsiliasi.',
          'Tanggal terbit invoice dan tanggal jatuh tempo pembayaran (misalnya Net 14 atau Net 30).',
          'Identitas lengkap penerbit dan penerima tagihan (nama perusahaan/pribadi, alamat, dan kontak).',
          'Rincian deskripsi barang/jasa, kuantitas, harga satuan, subtotal/DPP, nilai PPN (khusus PKP), dan grand total.',
          'Informasi rekening bank tujuan beserta nama pemilik rekening dan ketentuan denda keterlambatan bila disepakati dalam kontrak.',
        ],
      },
    ],
    relatedToolSlugs: [
      'kalkulator-ppn',
      'vat-reverse-calculator',
      'invoice-generator',
      'invoice-tax-breakdown-calculator',
      'invoice-due-date-calculator',
    ],
    faqs: [
      {
        question: 'Apakah semua UMKM wajib memungut PPN 11% pada invoice?',
        answer:
          'Tidak. Kewajiban memungut PPN dan menerbitkan Faktur Pajak hanya berlaku bagi Pengusaha Kena Pajak (PKP), yakni usaha dengan omzet di atas Rp4,8 miliar per tahun atau usaha yang secara sukarela mengajukan pengukuhan sebagai PKP.',
      },
      {
        question: 'Bagaimana jika klien meminta harga bersih tanpa tambahan pajak lagi?',
        answer:
          'Gunakan metode harga inklusif pajak (reverse VAT). Bagikan angka kesepakatan dengan 1,11 untuk mencatat DPP di pembukuan Anda dan pisahkan sisanya sebagai kewajiban PPN keluaran.',
      },
    ],
  },
  {
    slug: 'panduan-bep-dan-arus-kas-usaha',
    title: 'Cara Menghitung Break-Even Point (BEP) dan Menjaga Arus Kas UMKM',
    seoTitle: 'Cara Menghitung BEP Unit, BEP Rupiah & Cash Runway Bisnis | Kalkulatorin',
    description:
      'Pelajari rumus Break-Even Point (BEP) unit dan BEP rupiah, margin kontribusi, serta cara memantau arus kas dan cash runway agar usaha tetap sehat.',
    category: 'Keuangan Bisnis',
    readTimeMinutes: 7,
    publishedAt: '2026-09-04',
    updatedAt: '2026-11-18',
    summary:
      'Profit di atas kertas belum tentu menyelamatkan usaha jika arus kas macet. Pahami titik impas (BEP) dan proyeksi arus kas bulanan agar Anda tahu persis berapa target penjualan minimum dan berapa lama kas usaha bertahan.',
    keyTakeaways: [
      'BEP Unit menunjukkan jumlah produk minimum yang harus terjual agar pendapatan tepat menutup biaya tetap dan biaya variabel.',
      'Biaya tetap (sewa, gaji tetap, langganan software) tetap keluar meski penjualan nol; biaya variabel naik seiring jumlah produk terjual.',
      'Proyeksi arus kas (cash flow forecast) wajib membedakan tanggal transaksi dengan tanggal uang benar-benar masuk ke rekening.',
    ],
    sections: [
      {
        heading: 'Memisahkan Biaya Tetap dan Biaya Variabel',
        paragraphs: [
          'Langkah pertama sebelum menghitung titik impas adalah mengelompokkan pengeluaran usaha ke dalam dua pos utama. Biaya tetap (fixed cost) adalah biaya yang nilainya relatif konstan setiap bulan terlepas dari volume penjualan, seperti sewa ruko, gaji karyawan tetap, internet, dan penyusutan peralatan.',
          'Sementara itu, biaya variabel (variable cost) berubah secara proporsional dengan jumlah unit yang diproduksi atau dijual, misalnya bahan baku, kemasan, komisi penjualan, dan biaya pengiriman per pesanan.',
        ],
      },
      {
        heading: 'Rumus BEP Unit dan BEP Rupiah',
        paragraphs: [
          'Selisih antara harga jual per unit dan biaya variabel per unit disebut Margin Kontribusi (Contribution Margin). Nilai inilah yang setiap kali terjadi penjualan dipakai untuk menutup biaya tetap bulanan Anda:',
        ],
        formula:
          'BEP Unit = Biaya Tetap / (Harga Jual per Unit − Biaya Variabel per Unit)  |  BEP Rupiah = Biaya Tetap / Rasio Margin Kontribusi',
      },
      {
        heading: 'Contoh Kasus Nyata: Usaha Kedai Kopi Skala UMKM',
        paragraphs: [
          'Sebuah kedai kopi memiliki biaya tetap Rp18.000.000 per bulan (sewa tempat Rp6 juta, gaji 3 barista Rp9 juta, listrik/air/internet Rp3 juta). Harga jual rata-rata segelas kopi Rp25.000 dengan biaya variabel (biji kopi, susu, gelas, sedotan, es) Rp10.000 per gelas.',
          'Margin kontribusi per gelas adalah Rp25.000 − Rp10.000 = Rp15.000 (rasio 60%). Maka BEP Unit = Rp18.000.000 / Rp15.000 = 1.200 gelas per bulan, atau rata-rata 40 gelas per hari. Dalam nilai omzet, BEP Rupiah = Rp18.000.000 / 0,60 = Rp30.000.000 per bulan. Gelas ke-1.201 barulah mulai menghasilkan laba bersih.',
        ],
        table: {
          headers: ['Volume Penjualan / Bulan', 'Total Omzet', 'Total Biaya (Tetap + Variabel)', 'Laba / (Rugi) Bersih'],
          rows: [
            ['800 gelas', 'Rp20.000.000', 'Rp26.000.000', '(Rp6.000.000)'],
            ['1.200 gelas (Titik BEP)', 'Rp30.000.000', 'Rp30.000.000', 'Rp0'],
            ['1.600 gelas', 'Rp40.000.000', 'Rp34.000.000', '+Rp6.000.000'],
            ['2.000 gelas', 'Rp50.000.000', 'Rp38.000.000', '+Rp12.000.000'],
          ],
        },
      },
      {
        heading: 'Menghubungkan BEP dengan Arus Kas dan Cash Runway',
        paragraphs: [
          'Pada fase awal usaha, penjualan sering belum langsung menyentuh BEP di 3–6 bulan pertama. Di sinilah perhitungan cash runway berperan penting: dengan membagi saldo kas tersedia terhadap net burn bulanan, Anda tahu berapa bulan napas operasional bisnis sebelum perlu menaikkan penjualan atau menambah modal kerja.',
        ],
        bullets: [
          'Simpan dana cadangan modal kerja minimal untuk 3–6 bulan biaya tetap.',
          'Jika penjualan dilakukan secara tempo (piutang B2B), pantau jadwal jatuh tempo pembayaran agar kas tidak defisit saat tanggal gajian tiba.',
          'Uji sensitivitas BEP sebelum menambah biaya tetap baru seperti menyewa cabang tambahan atau merekrut staf baru.',
        ],
      },
    ],
    relatedToolSlugs: [
      'break-even-point',
      'break-even-revenue-calculator',
      'cash-flow-forecast',
      'cash-runway-calculator',
      'working-capital-calculator',
    ],
    faqs: [
      {
        question: 'Bagaimana cara mempercepat pencapaian BEP?',
        answer:
          'Ada tiga tuas utama: menekan biaya tetap, menurunkan biaya variabel per unit (misalnya negosiasi pemasok), atau meningkatkan margin kontribusi melalui penyesuaian harga maupun paket bundling bernilai tambah.',
      },
      {
        question: 'Bagaimana menghitung BEP jika bisnis menjual banyak jenis produk?',
        answer:
          'Gunakan BEP Rupiah berbasis rata-rata margin kontribusi tertimbang (weighted average contribution margin ratio) dari bauran penjualan Anda.',
      },
    ],
  },
  {
    slug: 'simulasi-kredit-bunga-anuitas-vs-flat',
    title: 'Perbedaan Bunga Anuitas vs Bunga Flat pada Pinjaman & Cara Mengukur Kemampuan Cicilan',
    seoTitle: 'Perbedaan Bunga Anuitas vs Bunga Flat & Simulasi Cicilan Kredit | Kalkulatorin',
    description:
      'Bandingkan cara kerja bunga anuitas (efektif) dan bunga flat pada KPR, KTA, dan kredit usaha lengkap dengan tabel simulasi total bunga serta rasio cicilan sehat.',
    category: 'Kredit & Pinjaman',
    readTimeMinutes: 7,
    publishedAt: '2026-09-16',
    updatedAt: '2026-11-18',
    summary:
      'Bunga flat 8% per tahun tidak sama murahnya dengan bunga anuitas 8% per tahun — total bunga flat bisa hampir dua kali lipat lebih mahal. Pelajari perbedaannya sebelum menandatangani perjanjian kredit.',
    keyTakeaways: [
      'Bunga flat menghitung bunga dari pokok pinjaman awal sepanjang tenor, meski saldo pokok sebenarnya terus berkurang.',
      'Bunga anuitas menghitung bunga dari sisa pokok pinjaman yang menurun tiap bulan dengan cicilan total bulanan yang tetap.',
      'Rasio total cicilan utang sehat (Debt Service Ratio / DSR) idealnya tidak melebihi 30%–35% dari penghasilan bersih bulanan.',
    ],
    sections: [
      {
        heading: 'Mengapa Angka Persentase Bunga Saja Bisa Menipu?',
        paragraphs: [
          'Saat membandingkan penawaran KTA, kredit kendaraan, atau pinjaman modal kerja, banyak calon debitur hanya melihat angka bunga tahunan yang tertulis di brosur. Padahal, metode perhitungan bunga — apakah flat atau efektif/anuitas — mengubah total biaya pinjaman secara drastis.',
          'Pada bunga flat, bunga setiap bulan selalu dikalikan dengan total pinjaman awal. Akibatnya, suku bunga efektif sebenarnya pada skema flat kira-kira 1,8 hingga 2 kali lipat dari angka bunga flat yang diiklankan.',
        ],
      },
      {
        heading: 'Perbandingan Simulasi Pinjaman Rp100.000.000 Tenor 36 Bulan',
        paragraphs: [
          'Perhatikan perbandingan nyata pinjaman Rp100.000.000 dengan tenor 3 tahun (36 bulan) pada tingkat suku bunga nominal yang sama-sama tertulis 10% per tahun:',
        ],
        table: {
          headers: ['Skema Bunga', 'Suku Bunga Nominal', 'Cicilan / Bulan', 'Total Bunga (3 Tahun)', 'Total Pembayaran'],
          rows: [
            ['Bunga Anuitas (Efektif)', '10% p.a.', 'Rp3.226.719', 'Rp16.161.875', 'Rp116.161.875'],
            ['Bunga Flat', '10% p.a.', 'Rp3.611.111', 'Rp30.000.000', 'Rp130.000.000'],
          ],
        },
      },
      {
        heading: 'Cara Membaca Tabel Amortisasi dan Batas Cicilan Aman',
        paragraphs: [
          'Pada kredit berbunga anuitas seperti KPR, cicilan bulanan Anda tetap selama masa suku bunga fixed, tetapi komposisinya berubah setiap bulan. Pada tahun-tahun awal, porsi bunga lebih besar sementara pelunasan pokok lebih kecil. Menjelang akhir tenor, kondisi berbalik sehingga porsi pokok mendominasi.',
          'Sebelum mengambil pinjaman baru, hitung rasio total seluruh cicilan bulanan (KPR, kendaraan, paylater, kartu kredit) dibandingkan penghasilan bersih bulanan. Bank umumnya menetapkan batas maksimal DSR di kisaran 30%–40%, tetapi menjaga di bawah 30% memberikan ruang aman apabila suku bunga KPR berubah menjadi floating atau terjadi penurunan pendapatan.',
        ],
        formula: 'DSR (%) = (Total Semua Cicilan Bulanan / Penghasilan Bersih Bulanan) × 100%',
        bullets: [
          'Tanyakan selalu apakah angka bunga di brosur adalah bunga flat atau efektif/anuitas.',
          'Hitung juga biaya provisi, administrasi, asuransi jiwa/kebakaran, dan penalti pelunasan dipercepat.',
          'Untuk KPR dengan promo fixed 2–5 tahun, simulasikan ulang cicilan dengan asumsi bunga floating 11%–13% agar tidak kaget saat masa promo berakhir.',
        ],
      },
    ],
    relatedToolSlugs: [
      'loan-calculator',
      'flat-installment-calculator',
      'loan-affordability-calculator',
      'kalkulator-pelunasan-hutang',
    ],
    faqs: [
      {
        question: 'Kapan skema bunga flat umumnya digunakan di Indonesia?',
        answer:
          'Bunga flat paling sering digunakan pada kredit kendaraan bermotor (leasing), kredit multiguna jangka pendek, dan sebagian produk Kredit Tanpa Agunan (KTA). Sementara KPR dan kredit investasi jangka panjang umumnya memakai bunga efektif/anuitas.',
      },
      {
        question: 'Apakah melunasi KPR lebih cepat di awal tenor lebih menghemat bunga?',
        answer:
          'Ya, pada skema anuitas, pelunasan sebagian pokok di awal tenor jauh lebih menghemat total bunga dibandingkan di akhir tenor karena sisa pokok masih tinggi. Pastikan saja penghematan bunganya lebih besar daripada biaya penalti pelunasan dipercepat.',
      },
    ],
  },
  {
    slug: 'panduan-pesangon-dan-thr-uu-cipta-kerja',
    title: 'Cara Menghitung Pesangon, UPMK, dan THR Karyawan Sesuai Regulasi Ketenagakerjaan',
    seoTitle: 'Cara Menghitung Pesangon, UPMK & THR Karyawan UU Cipta Kerja | Kalkulatorin',
    description:
      'Panduan lengkap komponen hak karyawan saat PHK (Uang Pesangon, UPMK, UPH) berdasarkan PP No. 35 Tahun 2021 serta rumus THR penuh dan THR prorata.',
    category: 'HR & Ketenagakerjaan',
    readTimeMinutes: 7,
    publishedAt: '2026-09-28',
    updatedAt: '2026-11-18',
    summary:
      'Baik karyawan maupun tim HR perlu memahami dasar hukum perhitungan THR dan kompensasi PHK. Panduan ini merangkum tabel masa kerja PP 35/2021 dan rumus THR prorata secara ringkas.',
    keyTakeaways: [
      'Hak PHK karyawan tetap terdiri dari tiga komponen utama: Uang Pesangon (UP), Uang Penghargaan Masa Kerja (UPMK), dan Uang Penggantian Hak (UPH).',
      'Besaran pengali pesangon bergantung pada alasan PHK (misalnya efisiensi, pensiun, merger, atau pelanggaran) sesuai PP No. 35 Tahun 2021.',
      'Karyawan dengan masa kerja minimal 1 bulan berhak atas THR secara prorata (masa kerja / 12 × 1 bulan upah).',
    ],
    sections: [
      {
        heading: 'Komponen Upah yang Menjadi Dasar Perhitungan',
        paragraphs: [
          'Dalam regulasi ketenagakerjaan Indonesia (UU Cipta Kerja beserta peraturan turunannya PP No. 35 Tahun 2021 dan Permenaker No. 6 Tahun 2016 tentang THR), komponen upah yang dijadikan dasar perhitungan pesangon maupun THR adalah gaji pokok ditambah tunjangan tetap — yaitu tunjangan yang dibayarkan rutin tanpa dipengaruhi kehadiran atau pencapaian target tertentu.',
          'Tunjangan tidak tetap seperti uang makan berbasis kehadiran, uang transport harian, atau insentif komisi penjualan tidak dimasukkan ke dalam dasar perhitungan upah sebulan tersebut.',
        ],
      },
      {
        heading: 'Tabel Dasar Uang Pesangon (UP) dan UPMK Berdasarkan Masa Kerja',
        paragraphs: [
          'Berikut skala standar Uang Pesangon (maksimal 9 bulan upah) dan Uang Penghargaan Masa Kerja (mulai masa kerja 3 tahun, maksimal 10 bulan upah) menurut PP No. 35 Tahun 2021:',
        ],
        table: {
          headers: ['Masa Kerja', 'Uang Pesangon (UP)', 'UPMK'],
          rows: [
            ['Kurang dari 1 tahun', '1 bulan upah', '0 bulan upah'],
            ['1 tahun s.d. < 2 tahun', '2 bulan upah', '0 bulan upah'],
            ['2 tahun s.d. < 3 tahun', '3 bulan upah', '0 bulan upah'],
            ['3 tahun s.d. < 6 tahun', '4–6 bulan upah', '2 bulan upah'],
            ['6 tahun s.d. < 9 tahun', '7–9 bulan upah', '3 bulan upah'],
            ['9 tahun s.d. < 12 tahun', '9 bulan upah', '4 bulan upah'],
            ['12 tahun s.d. < 15 tahun', '9 bulan upah', '5 bulan upah'],
            ['24 tahun atau lebih', '9 bulan upah', '10 bulan upah'],
          ],
        },
      },
      {
        heading: 'Rumus Perhitungan THR Penuh dan THR Prorata',
        paragraphs: [
          'Tunjangan Hari Raya (THR) Keagamaan wajib dibayarkan pengusaha paling lambat 7 hari sebelum hari raya keagamaan. Karyawan yang telah bekerja terus-menerus selama 12 bulan atau lebih berhak menerima 1 bulan upah penuh. Jika masa kerja antara 1 bulan sampai kurang dari 12 bulan, THR dihitung secara proporsional:',
        ],
        formula: 'THR Prorata = (Masa Kerja dalam Bulan / 12) × (Gaji Pokok + Tunjangan Tetap)',
        bullets: [
          'Contoh: Karyawan dengan gaji pokok + tunjangan tetap Rp7.200.000 yang telah bekerja 7 bulan berhak atas THR = (7/12) × Rp7.200.000 = Rp4.200.000.',
          'THR termasuk objek pemotongan PPh 21 pada bulan pembayarannya.',
          'Untuk pekerja PKWT (kontrak) yang kontraknya berakhir sebelum hari raya, hak THR mengikuti ketentuan Permenaker yang berlaku.',
        ],
      },
    ],
    relatedToolSlugs: ['kalkulator-pesangon', 'kalkulator-thr', 'kalkulator-pph-21', 'salary-take-home-calculator'],
    faqs: [
      {
        question: 'Apakah karyawan yang mengundurkan diri (resign) mendapat uang pesangon?',
        answer:
          'Karyawan yang mengundurkan diri atas kemauan sendiri tidak memperoleh Uang Pesangon dan UPMK, tetapi tetap berhak atas Uang Penggantian Hak (misalnya cuti tahunan yang belum gugur) serta uang pisah sesuai yang diatur dalam Perjanjian Kerja, Peraturan Perusahaan, atau PKB.',
      },
      {
        question: 'Apakah pesangon yang diterima sekaligus dikenakan pajak?',
        answer:
          'Ya, uang pesangon yang dibayarkan sekaligus dikenakan PPh 21 Final dengan tarif khusus: 0% untuk bagian sampai Rp50 juta, 5% untuk Rp50–100 juta, 15% untuk Rp100–500 juta, dan 25% di atas Rp500 juta.',
      },
    ],
  },
  {
    slug: 'strategi-dana-darurat-inflasi-dana-pendidikan',
    title: 'Strategi Menyiapkan Dana Darurat dan Dana Pendidikan di Tengah Inflasi',
    seoTitle: 'Cara Menghitung Dana Darurat, Dampak Inflasi & Dana Pendidikan | Kalkulatorin',
    description:
      'Pelajari rumus ideal dana darurat (3–12x pengeluaran), cara memperhitungkan inflasi biaya pendidikan 10% per tahun, dan strategi menabung bulanan secara realistis.',
    category: 'Keuangan Pribadi',
    readTimeMinutes: 7,
    publishedAt: '2026-10-06',
    updatedAt: '2026-11-18',
    summary:
      'Menyimpan uang tanpa memperhitungkan inflasi membuat target dana pendidikan anak meleset jauh di masa depan. Panduan ini membahas urutan prioritas mulai dari dana darurat, perlindungan terhadap inflasi, hingga proyeksi tabungan bulanan.',
    keyTakeaways: [
      'Dana darurat harus dibangun sebelum berinvestasi agresif: 3–6x pengeluaran bulanan untuk lajang, dan 6–12x untuk keluarga atau pekerja lepas.',
      'Inflasi biaya pendidikan di Indonesia secara historis lebih tinggi daripada inflasi umum (sering berkisar 8%–12% per tahun).',
      'Memulai investasi dana pendidikan 5 tahun lebih awal dapat memangkas beban setoran bulanan hingga separuhnya berkat efek bunga majemuk.',
    ],
    sections: [
      {
        heading: 'Menentukan Target Dana Darurat yang Ideal',
        paragraphs: [
          'Dana darurat adalah bantalan likuiditas yang melindungi keuangan keluarga dari risiko tak terduga seperti PHK, penurunan omzet mendadak, atau kebutuhan medis darurat. Besarnya dihitung dari pengeluaran wajib bulanan (kebutuhan pokok, cicilan, utilitas, premi asuransi), bukan dari total gaji.',
        ],
        table: {
          headers: ['Profil Kondisi Keuangan', 'Kelipatan Ideal', 'Contoh Pengeluaran Rp6 Juta/Bln'],
          rows: [
            ['Lajang, penghasilan tetap', '3 – 6 kali pengeluaran', 'Rp18.000.000 – Rp36.000.000'],
            ['Menikah tanpa anak', '6 kali pengeluaran', 'Rp36.000.000'],
            ['Menikah dengan anak', '6 – 9 kali pengeluaran', 'Rp36.000.000 – Rp54.000.000'],
            ['Freelancer / Pengusaha UMKM', '9 – 12 kali pengeluaran', 'Rp54.000.000 – Rp72.000.000'],
          ],
        },
      },
      {
        heading: 'Mengapa Inflasi Wajib Dimasukkan ke Dana Pendidikan?',
        paragraphs: [
          'Jika biaya masuk dan kuliah hari ini Rp100.000.000, pada 10 tahun mendatang biayanya tidak lagi Rp100.000.000. Dengan asumsi inflasi pendidikan 10% per tahun, nilai masa depannya (Future Value) membengkak menjadi sekitar Rp259.374.000.',
          'Karena itu, merencanakan dana pendidikan memakai angka biaya hari ini tanpa faktor inflasi hampir pasti menghasilkan kekurangan dana saat anak memasuki jenjang sekolah atau universitas.',
        ],
        formula: 'Biaya Masa Depan (FV) = Biaya Saat Ini × (1 + Tingkat Inflasi)^Jumlah Tahun',
      },
      {
        heading: 'Memilih Instrumen Simpanan Berdasarkan Horizon Waktu',
        paragraphs: [
          'Penempatan dana harus disesuaikan dengan kapan uang tersebut dibutuhkan agar tidak terpaksa mencairkan aset berisiko tinggi saat pasar sedang turun:',
        ],
        bullets: [
          'Dana Darurat (kapan saja dibutuhkan): rekening terpisah berbiaya rendah, deposito cair cepat, atau reksa dana pasar uang.',
          'Dana Pendidikan Jangka Menengah (3–5 tahun): obligasi pemerintah ritel (SBN), reksa dana pendapatan tetap, atau kombinasi dengan emas.',
          'Dana Pendidikan Jangka Panjang (> 7 tahun): kombinasi instrumen bertumbuh untuk mengimbangi inflasi pendidikan, lalu geser bertahap ke aset lebih konservatif 2 tahun sebelum jatuh tempo.',
        ],
      },
    ],
    relatedToolSlugs: [
      'kalkulator-dana-darurat',
      'kalkulator-inflasi',
      'kalkulator-dana-pendidikan',
      'compound-interest-calculator',
      'savings-goal-calculator',
    ],
    faqs: [
      {
        question: 'Bolehkah dana darurat disimpan seluruhnya dalam bentuk emas atau saham?',
        answer:
          'Tidak disarankan. Saham memiliki volatilitas harga tinggi dalam jangka pendek, sedangkan emas memiliki selisih harga jual-beli (spread). Dana darurat utamanya harus mudah dicairkan cepat (likuid) dengan nilai pokok relatif stabil.',
      },
      {
        question: 'Bagaimana jika penghasilan pas-pasan dan belum sanggup menyisihkan banyak?',
        answer:
          'Mulailah dengan target bertahap — misalnya mengumpulkan 1 bulan pengeluaran terlebih dahulu dengan menyisihkan 10% penghasilan secara otomatis setiap tanggal gajian, lalu tingkatkan perlahan saat ada bonus atau kenaikan penghasilan.',
      },
    ],
  },
  {
    slug: 'panduan-zakat-penghasilan-dan-zakat-mal',
    title: 'Panduan Lengkap Zakat Penghasilan dan Zakat Mal: Nisab, Haul, dan Cara Hitung',
    seoTitle: 'Cara Menghitung Zakat Penghasilan & Zakat Mal Sesuai BAZNAS | Kalkulatorin',
    description:
      'Ketahui syarat nisab emas 85 gram, syarat haul 1 tahun, tarif 2,5%, dan contoh perhitungan zakat profesi bulanan maupun zakat mal sesuai pedoman BAZNAS.',
    category: 'Keuangan Syariah',
    readTimeMinutes: 6,
    publishedAt: '2026-10-20',
    updatedAt: '2026-11-18',
    summary:
      'Menghitung zakat dengan benar membantu memastikan kewajiban ibadah tertunaikan tepat sasaran. Panduan ini menjelaskan syarat nisab 85 gram emas, perbedaan zakat penghasilan dan zakat mal, serta contoh hitung praktis.',
    keyTakeaways: [
      'Tarif zakat penghasilan (profesi) dan zakat mal (harta/tabungan/emas) adalah 2,5%.',
      'Nisab zakat merujuk pada nilai 85 gram emas murni berdasarkan harga emas yang berlaku saat perhitungan.',
      'Zakat mal mensyaratkan kepemilikan penuh selama 1 tahun hijriah (haul), sedangkan zakat penghasilan dapat ditunaikan setiap bulan saat menerima gaji jika penghasilan tahunannya mencapai nisab.',
    ],
    sections: [
      {
        heading: 'Memahami Nisab dan Haul dalam Perhitungan Zakat',
        paragraphs: [
          'Nisab adalah batas minimum harta atau penghasilan yang mewajibkan seseorang mengeluarkan zakat. Sesuai Peraturan Menteri Agama No. 31 Tahun 2019 dan pedoman BAZNAS (Badan Amil Zakat Nasional), nisab zakat penghasilan dan zakat mal disetarakan dengan nilai 85 gram emas.',
          'Haul adalah batas waktu kepemilikan harta selama satu tahun penuh (12 bulan hijriah). Syarat haul berlaku pada zakat mal seperti tabungan, deposito, logam mulia, dan aset investasi. Sementara pada zakat penghasilan, ulama dan BAZNAS membolehkan penunaian setiap bulan ketika menerima penghasilan agar lebih ringan dan rutin.',
        ],
        formula: 'Nisab Tahunan = 85 × Harga Emas per Gram  |  Zakat = 2,5% × Harta/Penghasilan Wajib Zakat',
      },
      {
        heading: 'Contoh Simulasi Zakat Penghasilan dan Zakat Mal',
        paragraphs: [
          'Misalkan harga emas saat ini Rp1.500.000 per gram. Maka nisab tahunan adalah 85 × Rp1.500.000 = Rp127.500.000 per tahun (atau setara Rp10.625.000 per bulan).',
        ],
        table: {
          headers: ['Jenis Zakat', 'Contoh Nilai Harta / Penghasilan', 'Status Nisab', 'Zakat 2,5%'],
          rows: [
            ['Zakat Penghasilan (Bulanan)', 'Gaji & bonus Rp12.000.000/bulan', 'Mencapai nisab (≥ Rp10,625 jt)', 'Rp300.000 / bulan'],
            ['Zakat Penghasilan (Bulanan)', 'Gaji Rp8.000.000/bulan', 'Belum mencapai nisab', 'Rp0 (dianjurkan infak/sedekah)'],
            ['Zakat Mal (Tahunan)', 'Tabungan + emas bersih Rp180.000.000 (haul 1 thn)', 'Mencapai nisab (≥ Rp127,5 jt)', 'Rp4.500.000 / tahun'],
          ],
        },
      },
      {
        heading: 'Tips Praktis Agar Tidak Terjadi Perhitungan Ganda',
        paragraphs: [
          'Sebagian orang khawatir membayar zakat dua kali untuk uang yang sama — pertama saat gaji diterima, lalu kedua saat uang tersebut mengendap di tabungan setahun kemudian. Kuncinya adalah mencatat tanggal haul harta secara konsisten setiap tahun (misalnya setiap bulan Ramadan).',
        ],
        bullets: [
          'Hitung total harta likuid (tabungan, deposito, emas, saham, piutang lancar) lalu kurangi utang jatuh tempo jangka pendek.',
          'Jika Anda sudah rutin membayar zakat penghasilan bulanan, sisihkan catatannya agar zakat mal tahunan hanya menghitung akumulasi harta bersih yang telah mencapai haul dan belum dizakati.',
          'Salurkan melalui lembaga amil zakat resmi seperti BAZNAS atau LAZ terverifikasi agar memperoleh bukti setor zakat yang juga dapat menjadi pengurang penghasilan kena pajak (sesuai ketentuan DJP).',
        ],
      },
    ],
    relatedToolSlugs: ['kalkulator-zakat', 'kalkulator-pph-21', 'kalkulator-dana-darurat', 'savings-goal-calculator'],
    faqs: [
      {
        question: 'Apakah rumah tinggal pribadi dan kendaraan harian dikenakan zakat mal?',
        answer:
          'Tidak. Aset yang digunakan langsung untuk kebutuhan pokok sehari-hari (rumah tinggal, kendaraan operasional pribadi, perabotan rumah) tidak termasuk objek zakat mal. Yang dizakati adalah harta simpanan, emas, dan aset produktif/investasi.',
      },
      {
        question: 'Apakah zakat penghasilan dihitung dari gaji kotor atau gaji bersih?',
        answer:
          'Terdapat dua pendekatan yang diakui: BAZNAS umumnya mencontohkan perhitungan dari penghasilan bruto (lebih hati-hati dan sederhana), sementara sebagian ulama memperbolehkan penghitungan dari penghasilan bersih setelah kebutuhan pokok dan utang jatuh tempo. Pilih metode yang paling menenangkan hati dan konsisten.',
      },
    ],
  },
  {
    slug: 'panduan-safety-stock-dan-reorder-point-umkm',
    title: 'Cara Menghitung Safety Stock, Reorder Point, dan HPP per Unit agar Stok Tidak Kosong',
    seoTitle: 'Cara Menghitung Safety Stock, Reorder Point & Unit Cost UMKM | Kalkulatorin',
    description:
      'Pelajari rumus Safety Stock, Reorder Point (ROP), dan biaya per unit (unit cost) untuk mencegah kehabisan stok (stockout) maupun kelebihan persediaan yang menahan kas usaha.',
    category: 'Operasional & Inventory',
    readTimeMinutes: 6,
    publishedAt: '2026-10-29',
    updatedAt: '2026-11-18',
    summary:
      'Stok habis saat permintaan sedang tinggi membuat pelanggan pindah ke kompetitor, sementara stok menumpuk membekukan modal kerja. Pelajari rumus Safety Stock dan Reorder Point yang sederhana untuk diterapkan di toko ritel maupun online.',
    keyTakeaways: [
      'Safety Stock berfungsi sebagai stok penyangga ketika penjualan melonjak mendadak atau pengiriman pemasok terlambat.',
      'Reorder Point (ROP) menentukan titik jumlah stok persis saat Anda wajib melakukan pemesanan ulang ke pemasok.',
      'Menghitung Unit Cost secara lengkap (termasuk ongkir masuk dan kemasan) mencegah kesalahan saat menentukan harga jual.',
    ],
    sections: [
      {
        heading: 'Mengapa Mengandalkan Perkiraan Kasar untuk Stok Berisiko?',
        paragraphs: [
          'Banyak pemilik toko ritel dan seller marketplace baru memesan barang ulang saat rak hampir kosong. Jika waktu pengiriman dari pemasok (lead time) memakan waktu 7–14 hari, produk terlaris pasti mengalami kekosongan stok (stockout). Di marketplace, produk yang sering kehabisan stok juga kehilangan momentum peringkat pencarian.',
          'Sebaliknya, memesan barang terlalu banyak tanpa perhitungan mengikat modal kerja di gudang, meningkatkan risiko barang rusak, kadaluarsa, atau ketinggalan tren.',
        ],
      },
      {
        heading: 'Rumus Safety Stock dan Reorder Point (ROP)',
        paragraphs: [
          'Dengan data penjualan harian dan lama waktu pengiriman pemasok, Anda dapat menetapkan batas pemesanan ulang yang terukur:',
        ],
        formula:
          'Safety Stock = (Penjualan Maks × Lead Time Maks) − (Penjualan Rata-rata × Lead Time Rata-rata)  |  ROP = (Penjualan Rata-rata × Lead Time Rata-rata) + Safety Stock',
      },
      {
        heading: 'Contoh Perhitungan untuk Produk Best-Seller Toko Online',
        paragraphs: [
          'Misalkan sebuah produk skincare terjual rata-rata 20 unit per hari, dan saat tanggal kembar bisa mencapai 35 unit per hari. Pengiriman dari pemasok rata-rata 5 hari, tetapi saat padat bisa melambat hingga 8 hari:',
        ],
        table: {
          headers: ['Komponen Perhitungan', 'Rumus / Nilai', 'Hasil'],
          rows: [
            ['Kebutuhan Rata-rata Selama Lead Time', '20 unit/hari × 5 hari', '100 unit'],
            ['Kebutuhan Maksimal Saat Puncak', '35 unit/hari × 8 hari', '280 unit'],
            ['Safety Stock (Stok Penyangga)', '280 − 100 unit', '180 unit'],
            ['Reorder Point (Titik Pesan Ulang)', '100 + 180 unit', '280 unit'],
          ],
        },
      },
      {
        heading: 'Tips Mengoptimalkan Modal Kerja di Persediaan',
        paragraphs: [
          'Tidak semua produk perlu memiliki stok penyangga sebesar produk terlaris. Terapkan pengelompokan sederhana (analisis ABC) agar kas bisnis Anda berputar optimal:',
        ],
        bullets: [
          'Produk Kategori A (20% SKU penyumbang 80% omzet): terapkan pemantauan ROP ketat dan safety stock penuh.',
          'Produk Kategori B & C (perputaran sedang/lambat): gunakan safety stock lebih tipis agar modal tidak mengendap.',
          'Selalu perbarui perhitungan HPP per unit (Unit Cost) setiap kali tarif ekspedisi atau harga pemasok berubah.',
        ],
      },
    ],
    relatedToolSlugs: [
      'safety-stock-calculator',
      'stock-reorder-point-calculator',
      'unit-cost-calculator',
      'working-capital-calculator',
      'average-order-value-calculator',
    ],
    faqs: [
      {
        question: 'Seberapa sering angka Reorder Point perlu diperbarui?',
        answer:
          'Idealnya evaluasi setiap 1–3 bulan sekali, atau segera menjelang musim puncak penjualan (seperti Ramadan, Lebaran, dan Harbolnas) karena penjualan harian maupun lead time ekspedisi biasanya berubah signifikan.',
      },
      {
        question: 'Apa beda Safety Stock dan Buffer Stock?',
        answer:
          'Dalam praktik manajemen rantai pasok UMKM, keduanya merujuk pada konsep yang sama, yaitu persediaan cadangan di luar kebutuhan normal untuk meredam ketidakpastian permintaan dan keterlambatan pasokan.',
      },
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
