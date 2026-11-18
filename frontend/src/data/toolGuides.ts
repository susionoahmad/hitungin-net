export type ToolExtraGuide = {
  formula: string;
  variables: string[];
  example: {
    scenario: string;
    steps: string[];
    result: string;
  };
  tips: string[];
  extraFaqs: Array<{ question: string; answer: string }>;
  relatedGuideSlug?: string;
};

export const toolGuides: Record<string, ToolExtraGuide> = {
  'invoice-generator': {
    formula: 'Total Tagihan = Subtotal Item + (Subtotal Item × Tarif PPN %)',
    variables: [
      'Subtotal Item: jumlah seluruh (Kuantitas × Harga Satuan) dari baris produk atau jasa.',
      'Tarif PPN: umumnya 11% untuk Pengusaha Kena Pajak (PKP), atau 0% jika non-PKP.',
      'Grand Total: nominal akhir yang wajib dibayarkan klien sebelum tanggal jatuh tempo.',
    ],
    example: {
      scenario: 'Agency desain menagih 1 paket desain website Rp8.000.000 dan 2 bulan maintenance @ Rp1.000.000 dengan PPN 11%.',
      steps: [
        'Hitung subtotal item: Rp8.000.000 + (2 × Rp1.000.000) = Rp10.000.000.',
        'Hitung PPN 11%: 11% × Rp10.000.000 = Rp1.100.000.',
        'Jumlahkan total tagihan: Rp10.000.000 + Rp1.100.000 = Rp11.100.000.',
      ],
      result: 'Total invoice yang dikirim ke klien adalah Rp11.100.000 lengkap dengan rincian DPP dan PPN.',
    },
    tips: [
      'Gunakan format penomoran konsisten seperti INV/2026/11/001 agar mudah dicocokkan dengan mutasi rekening.',
      'Cantumkan tanggal jatuh tempo dan nomor rekening pembayaran secara jelas di catatan invoice.',
      'Simpan arsip PDF setiap invoice yang diterbitkan sebagai dokumen pendukung pembukuan dan pelaporan pajak.',
    ],
    extraFaqs: [
      {
        question: 'Apakah usaha non-PKP boleh menerbitkan invoice tanpa PPN?',
        answer:
          'Boleh. Usaha yang belum dikukuhkan sebagai Pengusaha Kena Pajak (PKP) cukup mengatur tarif PPN menjadi 0% sehingga subtotal langsung sama dengan total tagihan.',
      },
      {
        question: 'Apa beda invoice dengan kuitansi?',
        answer:
          'Invoice adalah dokumen permintaan pembayaran yang dikirim sebelum klien membayar, sedangkan kuitansi adalah tanda terima resmi setelah pembayaran benar-benar diterima.',
      },
    ],
    relatedGuideSlug: 'panduan-ppn-11-persen-dan-invoice-bisnis',
  },

  'loan-calculator': {
    formula: 'Cicilan Bulanan (PMT) = P × [r(1 + r)^n] / [(1 + r)^n − 1]',
    variables: [
      'P (Pokok Pinjaman): jumlah dana pinjaman yang diterima setelah dikurangi uang muka (DP).',
      'r (Bunga Bulanan): suku bunga efektif tahunan dibagi 12 bulan.',
      'n (Tenor): total jangka waktu cicilan dalam satuan bulan.',
    ],
    example: {
      scenario: 'Pinjaman modal usaha Rp120.000.000 dengan bunga anuitas 12% per tahun (1% per bulan) selama 24 bulan.',
      steps: [
        'Tentukan bunga bulanan: r = 12% / 12 = 0,01.',
        'Masukkan ke rumus anuitas: Rp120.000.000 × [0,01 × (1,01)^24] / [(1,01)^24 − 1].',
        'Didapat cicilan tetap Rp5.648.817 per bulan selama 24 bulan.',
      ],
      result: 'Total pembayaran 24 bulan adalah Rp135.571.600 dengan total beban bunga Rp15.571.600.',
    },
    tips: [
      'Perhatikan porsi bunga di tabel amortisasi: di awal tenor bunga lebih besar, lalu perlahan mengecil seiring turunnya sisa pokok.',
      'Pastikan total semua cicilan utang bulanan tidak melebihi 30%–35% dari pendapatan bersih.',
      'Untuk KPR, simulasikan pula skenario bunga floating 11%–13% setelah masa bunga fixed berakhir.',
    ],
    extraFaqs: [
      {
        question: 'Apa perbedaan bunga anuitas dengan bunga efektif murni?',
        answer:
          'Pada bunga efektif murni, cicilan pokok tiap bulan tetap sehingga total cicilan makin lama makin kecil. Pada bunga anuitas, total cicilan bulanan dibuat tetap, dengan komposisi bunga menurun dan pokok meningkat tiap bulan.',
      },
      {
        question: 'Apakah biaya provisi dan asuransi sudah termasuk di cicilan?',
        answer:
          'Belum. Biaya provisi, administrasi, notaris, dan asuransi biasanya dibayar di muka saat akad kredit sehingga perlu dianggarkan terpisah.',
      },
    ],
    relatedGuideSlug: 'simulasi-kredit-bunga-anuitas-vs-flat',
  },

  'kalkulator-diskon': {
    formula: 'Nominal Diskon = Harga Awal × (Persen Diskon / 100)  |  Harga Akhir = Harga Awal − Nominal Diskon',
    variables: [
      'Harga Awal: harga jual normal sebelum potongan promosi.',
      'Persen Diskon: besaran potongan harga yang ditawarkan dalam persen.',
      'Harga Akhir: nominal yang dibayarkan pembeli setelah diskon diterapkan.',
    ],
    example: {
      scenario: 'Sebuah jaket dijual seharga Rp450.000 lalu diberi diskon promo akhir pekan sebesar 25%.',
      steps: [
        'Hitung nominal potongan: Rp450.000 × 25% = Rp112.500.',
        'Kurangkan dari harga awal: Rp450.000 − Rp112.500 = Rp337.500.',
      ],
      result: 'Pembeli menghemat Rp112.500 dan cukup membayar Rp337.500.',
    },
    tips: [
      'Cek margin kotor terlebih dahulu sebelum memberi diskon besar agar harga akhir tidak jatuh di bawah HPP.',
      'Bandingkan promo persen diskon dengan promo potongan nominal (misalnya potongan Rp50.000) untuk melihat mana yang lebih efisien menjaga laba.',
      'Jika menjual di marketplace, ingat bahwa biaya admin platform biasanya tetap dihitung dari harga setelah diskon penjual.',
    ],
    extraFaqs: [
      {
        question: 'Apakah diskon 20% + 10% sama dengan diskon 30%?',
        answer:
          'Tidak sama. Diskon bertingkat 20% + 10% dihitung berurutan: harga dipotong 20% dulu menjadi 80%, lalu dipotong lagi 10% dari 80%, sehingga total potongan efektifnya hanya 28%.',
      },
      {
        question: 'Bagaimana menentukan batas maksimal diskon agar tidak rugi?',
        answer:
          'Batas maksimal diskon tidak boleh melebihi persentase margin kotor produk dikurangi seluruh biaya variabel (seperti komisi marketplace dan kemasan).',
      },
    ],
    relatedGuideSlug: 'panduan-margin-vs-markup-umkm',
  },

  'kalkulator-margin': {
    formula: 'Margin (%) = ((Harga Jual − HPP) / Harga Jual) × 100%  |  Markup (%) = ((Harga Jual − HPP) / HPP) × 100%',
    variables: [
      'HPP (Modal): seluruh biaya langsung untuk menghasilkan atau membeli 1 unit barang.',
      'Harga Jual: harga penawaran produk kepada pembeli sebelum potongan tambahan.',
      'Profit Nominal: selisih bersih antara Harga Jual dan HPP.',
    ],
    example: {
      scenario: 'Produk kopi kemasan bermodal Rp40.000 dijual dengan harga Rp65.000 per bungkus.',
      steps: [
        'Hitung profit nominal: Rp65.000 − Rp40.000 = Rp25.000.',
        'Hitung margin keuntungan: (Rp25.000 / Rp65.000) × 100% = 38,46%.',
        'Hitung markup dari modal: (Rp25.000 / Rp40.000) × 100% = 62,5%.',
      ],
      result: 'Laba Rp25.000 per bungkus menghasilkan margin 38,46% dan markup 62,5%.',
    },
    tips: [
      'Jangan menyamakan margin dengan markup; margin selalu lebih kecil daripada angka markup untuk harga yang sama.',
      'Masukkan biaya kemasan, stiker, dan ongkir bahan baku ke dalam modal agar angka margin tidak semu.',
      'Review margin produk secara rutin setiap kali harga bahan baku atau biaya iklan berubah.',
    ],
    extraFaqs: [
      {
        question: 'Mengapa margin tidak pernah bisa mencapai 100% jika ada modal?',
        answer:
          'Karena rumus margin membagi laba dengan harga jual. Selama HPP lebih besar dari nol, laba akan selalu lebih kecil dari harga jual sehingga margin selalu di bawah 100%.',
      },
      {
        question: 'Berapa selisih margin kotor yang aman untuk toko online?',
        answer:
          'Untuk menutup biaya admin marketplace, voucher, iklan, dan operasional, banyak seller menargetkan margin kotor minimal 35%–50%.',
      },
    ],
    relatedGuideSlug: 'panduan-margin-vs-markup-umkm',
  },

  'kalkulator-ppn': {
    formula: 'PPN = DPP × 11%  |  Total Termasuk PPN = DPP × 1,11',
    variables: [
      'DPP (Dasar Pengenaan Pajak): harga barang/jasa sebelum ditambahkan PPN.',
      'Tarif PPN: 11% sesuai ketentuan UU Harmonisasi Peraturan Perpajakan (UU HPP).',
      'Total Harga Akhir: nominal tagihan yang dibayarkan pembeli setelah ditambah PPN.',
    ],
    example: {
      scenario: 'Jasa konsultasi IT bernilai DPP Rp15.000.000 dikenakan PPN 11%.',
      steps: [
        'Hitung nilai PPN: Rp15.000.000 × 11% = Rp1.650.000.',
        'Jumlahkan ke DPP: Rp15.000.000 + Rp1.650.000 = Rp16.650.000.',
      ],
      result: 'Nilai PPN keluaran adalah Rp1.650.000 dengan total tagihan Rp16.650.000.',
    },
    tips: [
      'Pastikan pada penawaran harga tertulis jelas apakah nominal sudah termasuk PPN (inclusive) atau belum termasuk PPN (exclusive).',
      'Jika ingin memisahkan PPN dari harga final, bagi total harga dengan 1,11 — jangan langsung dikurangi 11%.',
      'PPN yang dipungut dari pembeli bukan pendapatan usaha, melainkan titipan pajak yang wajib disetorkan ke kas negara.',
    ],
    extraFaqs: [
      {
        question: 'Siapa yang berhak memungut PPN 11%?',
        answer:
          'Hanya pelaku usaha yang sudah dikukuhkan secara resmi sebagai Pengusaha Kena Pajak (PKP) oleh Direktorat Jenderal Pajak.',
      },
      {
        question: 'Apakah ongkos kirim dalam invoice ikut dikenakan PPN?',
        answer:
          'Jika ongkos kirim ditagihkan sebagai bagian dari nilai transaksi penjualan tanpa sistem reimbursement murni, umumnya ikut menjadi komponen DPP sesuai ketentuan faktur pajak.',
      },
    ],
    relatedGuideSlug: 'panduan-ppn-11-persen-dan-invoice-bisnis',
  },

  'break-even-point': {
    formula: 'BEP (Unit) = Biaya Tetap / (Harga Jual per Unit − Biaya Variabel per Unit)',
    variables: [
      'Biaya Tetap (Fixed Cost): pengeluaran rutin bulanan yang tidak berubah mengikuti volume penjualan (sewa, gaji tetap, utilitas).',
      'Harga Jual per Unit: harga jual rata-rata per 1 produk atau paket layanan.',
      'Biaya Variabel per Unit: biaya langsung per unit (bahan baku, kemasan, komisi penjualan).',
    ],
    example: {
      scenario: 'Usaha katering sehat memiliki biaya tetap Rp12.000.000/bulan, harga per boks Rp40.000, dan biaya variabel Rp20.000/boks.',
      steps: [
        'Hitung margin kontribusi per boks: Rp40.000 − Rp20.000 = Rp20.000.',
        'Bagi biaya tetap dengan margin kontribusi: Rp12.000.000 / Rp20.000 = 600 boks.',
      ],
      result: 'Usaha mencapai titik impas saat menjual 600 boks/bulan (20 boks/hari) atau omzet Rp24.000.000.',
    },
    tips: [
      'Pisahkan dengan jujur gaji pemilik usaha ke dalam biaya tetap agar titik impas mencerminkan kondisi bisnis yang sehat.',
      'Jika margin kontribusi per unit negatif (biaya variabel lebih besar dari harga jual), bisnis tidak akan pernah mencapai BEP.',
      'Gunakan hasil BEP sebagai target minimum bulanan tim penjualan sebelum menghitung target laba.',
    ],
    extraFaqs: [
      {
        question: 'Apakah BEP Unit sama dengan balik modal investasi awal?',
        answer:
          'Berbeda. BEP operasional menghitung titik impas bulanan agar pendapatan menutup biaya berjalan, sedangkan balik modal investasi awal (payback period) menghitung berapa lama akumulasi laba bersih menutup belanja modal (CapEx).',
      },
      {
        question: 'Bagaimana jika harga jual berubah saat promo?',
        answer:
          'Penurunan harga jual memperkecil margin kontribusi per unit sehingga jumlah unit yang harus terjual untuk mencapai BEP akan meningkat.',
      },
    ],
    relatedGuideSlug: 'panduan-bep-dan-arus-kas-usaha',
  },

  'cash-flow-forecast': {
    formula: 'Saldo Kas Akhir = Saldo Kas Awal + Total Arus Kas Masuk − Total Arus Kas Keluar',
    variables: [
      'Saldo Kas Awal: uang tunai dan saldo rekening bank operasional pada awal periode.',
      'Arus Kas Masuk (Cash Inflow): penerimaan aktual dari penjualan tunai, pelunasan piutang, atau pendanaan.',
      'Arus Kas Keluar (Cash Outflow): seluruh pembayaran aktual seperti pembelian stok, gaji, sewa, cicilan, dan pajak.',
    ],
    example: {
      scenario: 'Saldo kas awal Rp50.000.000, estimasi penerimaan bulan ini Rp85.000.000, dan rencana pengeluaran Rp72.000.000.',
      steps: [
        'Hitung arus kas bersih (net cash flow): Rp85.000.000 − Rp72.000.000 = +Rp13.000.000.',
        'Tambahkan ke saldo kas awal: Rp50.000.000 + Rp13.000.000 = Rp63.000.000.',
      ],
      result: 'Proyeksi saldo kas akhir bulan sebesar Rp63.000.000 dengan surplus arus kas Rp13.000.000.',
    },
    tips: [
      'Catat penerimaan berdasarkan tanggal uang benar-benar masuk rekening, bukan tanggal invoice diterbitkan.',
      'Buat minimal tiga skenario proyeksi: pesimis (penjualan turun 20%), realistis, dan optimis.',
      'Masukkan pos pengeluaran tahunan seperti THR, perpanjangan sewa, dan pajak tahunan ke bulan jatuhnya agar tidak kaget.',
    ],
    extraFaqs: [
      {
        question: 'Mengapa bisnis yang untung di laporan laba rugi tetap bisa kehabisan kas?',
        answer:
          'Karena banyak penjualan masih berupa piutang belum dibayar, atau kas terserap besar untuk menumpuk stok persediaan dan melunasi pokok utang.',
      },
      {
        question: 'Berapa bulan ke depan proyeksi arus kas idealnya dibuat?',
        answer:
          'Untuk UMKM, proyeksi 3 sampai 6 bulan ke depan secara bergulir (rolling forecast) sudah cukup efektif mendeteksi potensi defisit lebih awal.',
      },
    ],
    relatedGuideSlug: 'panduan-bep-dan-arus-kas-usaha',
  },

  'percentage-calculator': {
    formula: 'Nilai Persentase = (X / 100) × Y  |  Perubahan (%) = ((Nilai Baru − Nilai Lama) / Nilai Lama) × 100%',
    variables: [
      'X (%): angka persentase yang ingin dihitung dari suatu nilai dasar.',
      'Y (Nilai Dasar): nominal acuan tempat persentase diterapkan.',
      'Nilai Lama & Nilai Baru: dua angka pembanding untuk menghitung persentase kenaikan atau penurunan.',
    ],
    example: {
      scenario: 'Omzet toko naik dari Rp40.000.000 di bulan lalu menjadi Rp50.000.000 di bulan ini.',
      steps: [
        'Hitung selisih omzet: Rp50.000.000 − Rp40.000.000 = Rp10.000.000.',
        'Bagi selisih dengan omzet bulan lalu: Rp10.000.000 / Rp40.000.000 = 0,25.',
        'Kalikan 100%: 0,25 × 100% = 25%.',
      ],
      result: 'Omzet tumbuh sebesar +25% dibandingkan bulan sebelumnya.',
    },
    tips: [
      'Ingat bahwa kenaikan 50% lalu turun 50% tidak kembali ke angka awal (100 → 150 → 75, turun bersih 25%).',
      'Saat membandingkan pertumbuhan, selalu sebutkan basis pembandingnya (month-over-month atau year-over-year).',
      'Bedakan persentase perubahan (%) dengan selisih poin persentase (percentage points / bps).',
    ],
    extraFaqs: [
      {
        question: 'Apa beda persen (%) dengan poin persentase?',
        answer:
          'Jika suku bunga naik dari 5% menjadi 6%, kenaikannya adalah 1 poin persentase, tetapi secara relatif naik sebesar 20% (1 dibagi 5).',
      },
      {
        question: 'Kapan perhitungan persentase paling sering dipakai dalam bisnis?',
        answer:
          'Paling sering digunakan untuk menghitung pertumbuhan penjualan, diskon, komisi, rasio biaya, pajak, serta pencapaian target KPI.',
      },
    ],
  },

  'price-markup-calculator': {
    formula: 'Harga Jual = HPP × (1 + Persen Markup / 100)',
    variables: [
      'HPP (Harga Pokok): total biaya produksi atau harga beli produk per unit.',
      'Persen Markup: persentase kenaikan harga yang ditambahkan di atas HPP.',
      'Laba Kotor per Unit: selisih antara Harga Jual dan HPP.',
    ],
    example: {
      scenario: 'Reseller membeli sepatu seharga Rp200.000 dan menerapkan markup 40%.',
      steps: [
        'Hitung nilai markup: Rp200.000 × 40% = Rp80.000.',
        'Tambahkan ke modal: Rp200.000 + Rp80.000 = Rp280.000.',
        'Cek margin aktual: Rp80.000 / Rp280.000 = 28,57%.',
      ],
      result: 'Harga jual yang ditetapkan adalah Rp280.000 dengan laba kotor Rp80.000 (margin 28,57%).',
    },
    tips: [
      'Setelah mendapat harga jual dari markup, selalu periksa angka margin kotornya agar tidak keliru menganggap markup sama dengan margin.',
      'Bandingkan harga hasil markup dengan harga pasar kompetitor sebelum memublikasikan katalog.',
      'Untuk produk bernilai tambah tinggi atau handmade, pertimbangkan value-based pricing bukan sekadar markup seragam.',
    ],
    extraFaqs: [
      {
        question: 'Berapa markup yang diperlukan untuk mendapatkan margin 30%?',
        answer:
          'Gunakan rumus Markup = Margin / (1 − Margin). Untuk margin 30%, markup yang dibutuhkan adalah 0,30 / 0,70 = 42,86%.',
      },
      {
        question: 'Apakah semua produk di satu toko harus memakai persentase markup yang sama?',
        answer:
          'Tidak harus. Produk cepat laku (fast-moving) bisa memakai markup lebih kompetitif, sedangkan produk khusus atau aksesori pelengkap dapat diberi markup lebih tinggi.',
      },
    ],
    relatedGuideSlug: 'panduan-margin-vs-markup-umkm',
  },

  'compound-interest-calculator': {
    formula: 'Nilai Akhir (A) = P × (1 + r / m)^(m × t) + Kontribusi Berkala Majemuk',
    variables: [
      'P (Modal Awal): jumlah dana awal yang diinvestasikan atau ditabung.',
      'r (Imbal Hasil Tahunan): estimasi tingkat bunga atau return per tahun dalam desimal.',
      'm (Frekuensi Pemajemukan): berapa kali bunga digulung dalam setahun (bulanan = 12, tahunan = 1).',
      't (Jangka Waktu): durasi investasi dalam tahun.',
    ],
    example: {
      scenario: 'Investasi awal Rp20.000.000 dengan imbal hasil majemuk 8% per tahun selama 10 tahun (pemajemukan tahunan).',
      steps: [
        'Hitung faktor pertumbuhan: (1 + 0,08)^10 = 2,1589.',
        'Kalikan dengan modal awal: Rp20.000.000 × 2,1589 = Rp43.178.500.',
      ],
      result: 'Dana Rp20.000.000 tumbuh menjadi sekitar Rp43.178.500 dengan total pertumbuhan bunga Rp23.178.500.',
    },
    tips: [
      'Waktu adalah faktor terkuat dalam bunga majemuk; mulai lebih awal dengan nominal kecil sering mengalahkan nominal besar yang terlambat.',
      'Perhitungkan pajak bunga (seperti PPh final deposito 20% atau SBN 10%) serta biaya pengelolaan agar proyeksi lebih realistis.',
      'Gunakan Rule of 72 (72 dibagi persen return tahunan) untuk memperkirakan cepat berapa tahun dana akan berlipat dua.',
    ],
    extraFaqs: [
      {
        question: 'Apa beda bunga majemuk dengan bunga tunggal?',
        answer:
          'Bunga tunggal hanya menghitung bunga dari modal pokok awal, sedangkan bunga majemuk menambahkan bunga periode sebelumnya ke pokok sehingga pertumbuhan bersifat eksponensial.',
      },
      {
        question: 'Instrumen apa di Indonesia yang memanfaatkan efek compounding?',
        answer:
          'Reksa dana yang hasilnya tidak ditarik, deposito ARO (Automatic Roll Over) bunga + pokok, serta saham dividen yang dividennya diinvestasikan kembali.',
      },
    ],
    relatedGuideSlug: 'strategi-dana-darurat-inflasi-dana-pendidikan',
  },

  'roi-calculator': {
    formula: 'ROI (%) = ((Nilai Akhir / Pendapatan Bersih − Biaya Investasi) / Biaya Investasi) × 100%',
    variables: [
      'Biaya Investasi: total modal awal dan biaya langsung yang dikeluarkan untuk proyek atau kampanye.',
      'Hasil / Nilai Akhir: total pendapatan atau nilai aset yang diperoleh dari investasi tersebut.',
      'Laba Bersih Investasi: selisih antara Hasil dan Biaya Investasi.',
    ],
    example: {
      scenario: 'Kampanye iklan digital senilai Rp10.000.000 menghasilkan laba kotor tambahan Rp16.500.000.',
      steps: [
        'Hitung keuntungan bersih di atas biaya iklan: Rp16.500.000 − Rp10.000.000 = Rp6.500.000.',
        'Bagi dengan biaya investasi: Rp6.500.000 / Rp10.000.000 = 0,65.',
        'Konversi ke persen: 0,65 × 100% = 65%.',
      ],
      result: 'ROI kampanye sebesar +65%, artinya setiap Rp1 yang diinvestasikan menghasilkan laba bersih Rp0,65.',
    },
    tips: [
      'Selalu bandingkan ROI bersama durasi waktunya; ROI 20% dalam 3 bulan jauh lebih menarik daripada ROI 20% dalam 4 tahun.',
      'Masukkan seluruh biaya tersembunyi seperti jasa agensi, produksi konten, dan biaya operasional tim.',
      'Untuk iklan e-commerce, bedakan ROAS (berbasis omzet) dengan ROI (berbasis laba bersih setelah HPP).',
    ],
    extraFaqs: [
      {
        question: 'Apa beda ROI dan ROAS dalam pemasaran digital?',
        answer:
          'ROAS membagi total omzet penjualan dengan biaya iklan tanpa mengurangi HPP, sedangkan ROI memperhitungkan laba bersih setelah seluruh biaya produk dan iklan dikurangkan.',
      },
      {
        question: 'Apakah ROI positif selalu berarti proyek layak dijalankan?',
        answer:
          'Belum tentu. Bandingkan ROI tahunan proyek dengan biaya modal (bunga pinjaman) atau alternatif investasi berisiko rendah seperti SBN.',
      },
    ],
  },

  'net-profit-margin-calculator': {
    formula: 'Net Profit Margin (%) = (Laba Bersih / Total Pendapatan) × 100%',
    variables: [
      'Total Pendapatan: seluruh omzet penjualan bersih setelah retur dan diskon.',
      'Laba Bersih: sisa keuntungan setelah dikurangi HPP, biaya operasional (OpEx), bunga, dan pajak.',
    ],
    example: {
      scenario: 'Usaha retail mencatat omzet bulanan Rp150.000.000, HPP Rp90.000.000, biaya operasional Rp37.500.000, dan pajak Rp3.000.000.',
      steps: [
        'Hitung laba bersih: Rp150.000.000 − Rp90.000.000 − Rp37.500.000 − Rp3.000.000 = Rp19.500.000.',
        'Bagi laba bersih dengan omzet: (Rp19.500.000 / Rp150.000.000) × 100% = 13%.',
      ],
      result: 'Net Profit Margin sebesar 13%, berarti Rp130 dari setiap Rp1.000 penjualan menjadi laba bersih.',
    },
    tips: [
      'Bandingkan Gross Margin dan Net Profit Margin: jika gross tinggi tapi net tipis, masalah utamanya ada pada pembengkakan biaya operasional.',
      'Pantau tren Net Profit Margin per kuartal, bukan hanya satu bulan, agar tidak bias oleh biaya musiman.',
      'Gunakan margin bersih sebagai dasar penentuan pembagian dividen maupun dana ekspansi usaha.',
    ],
    extraFaqs: [
      {
        question: 'Berapa Net Profit Margin yang dianggap baik bagi UMKM?',
        answer:
          'Secara umum, Net Profit Margin 10% dianggap sehat, di atas 20% sangat kuat, sedangkan di bawah 5% menandakan ruang keamanan bisnis sangat tipis terhadap kenaikan biaya.',
      },
      {
        question: 'Apakah penarikan pribadi pemilik (prive) mengurangi laba bersih?',
        answer:
          'Secara akuntansi prive bukan beban operasional sehingga tidak mengurangi laba bersih di laporan laba rugi, tetapi tetap mengurangi kas dan ekuitas usaha.',
      },
    ],
    relatedGuideSlug: 'panduan-margin-vs-markup-umkm',
  },

  'salary-take-home-calculator': {
    formula: 'Take-Home Pay = (Gaji Pokok + Tunjangan) − (PPh 21 + Iuran BPJS + Potongan Lain)',
    variables: [
      'Penghasilan Bruto: gabungan gaji pokok, tunjangan tetap, tunjangan tidak tetap, atau lembur.',
      'Potongan Wajib: iuran BPJS Kesehatan (1% karyawan), BPJS Ketenagakerjaan JHT (2%) & JP (1%), serta PPh 21.',
      'Potongan Lain: cicilan koperasi, kasbon, atau potongan absensi jika ada.',
    ],
    example: {
      scenario: 'Karyawan bergaji bruto Rp10.000.000 dengan total potongan BPJS Rp400.000 dan estimasi PPh 21 Rp250.000.',
      steps: [
        'Jumlahkan seluruh potongan: Rp400.000 + Rp250.000 = Rp650.000.',
        'Kurangkan dari gaji bruto: Rp10.000.000 − Rp650.000 = Rp9.350.000.',
      ],
      result: 'Gaji bersih yang diterima di rekening (Take-Home Pay) adalah Rp9.350.000 per bulan.',
    },
    tips: [
      'Saat menegosiasikan tawaran kerja (offering letter), tanyakan selalu apakah nominal gaji yang disebut bersifat gross atau net.',
      'Periksa apakah tunjangan bersifat tetap atau berbasis kehadiran karena berpengaruh ke perhitungan THR dan pesangon.',
      'Gunakan angka Take-Home Pay (bukan gaji bruto) sebagai dasar menyusun anggaran bulanan dan rasio cicilan utang.',
    ],
    extraFaqs: [
      {
        question: 'Apa beda sistem gaji gross, gross-up, dan net?',
        answer:
          'Pada sistem gross, PPh 21 ditanggung karyawan; pada sistem net, pajak ditanggung perusahaan tanpa menambah slip gaji; pada gross-up, perusahaan memberi tunjangan pajak sebesar PPh 21 terutang.',
      },
      {
        question: 'Berapa persen iuran BPJS yang dipotong dari gaji karyawan?',
        answer:
          'Umumnya 1% untuk BPJS Kesehatan (batas upah Rp12 juta), 2% untuk JHT, dan 1% untuk Jaminan Pensiun (sesuai batas upah JP tahun berjalan).',
      },
    ],
    relatedGuideSlug: 'panduan-pph-21-dan-ptkp-karyawan',
  },

  'savings-goal-calculator': {
    formula: 'Tabungan Bulanan = (Target Dana − Saldo Awal) / Jumlah Bulan (atau dengan faktor bunga simpanan)',
    variables: [
      'Target Dana: total nominal yang ingin dicapai pada tanggal tujuan.',
      'Saldo Awal: dana yang sudah terkumpul saat ini.',
      'Jangka Waktu: jumlah bulan yang tersedia hingga target tercapai.',
    ],
    example: {
      scenario: 'Target dana menikah Rp90.000.000 dalam 24 bulan, saat ini sudah tersedia tabungan Rp18.000.000 (asumsi tanpa bunga).',
      steps: [
        'Hitung kekurangan dana: Rp90.000.000 − Rp18.000.000 = Rp72.000.000.',
        'Bagi dengan durasi 24 bulan: Rp72.000.000 / 24 = Rp3.000.000 per bulan.',
      ],
      result: 'Anda perlu menyisihkan Rp3.000.000 setiap bulan secara rutin selama 2 tahun.',
    },
    tips: [
      'Aktifkan fitur auto-debit di tanggal gajian menuju rekening terpisah agar target tabungan tidak terpakai konsumsi harian.',
      'Jika durasi target di atas 3 tahun, masukkan estimasi inflasi agar daya beli target dana tetap tercukupi.',
      'Pecah target besar menjadi milestone per 6 bulan untuk menjaga konsistensi menabung.',
    ],
    extraFaqs: [
      {
        question: 'Di mana sebaiknya menyimpan dana untuk target jangka pendek (1–2 tahun)?',
        answer:
          'Pilih instrumen rendah risiko dan likuid seperti rekening tabungan berjangka, deposito, atau reksa dana pasar uang.',
      },
      {
        question: 'Berapa persen dari gaji yang ideal dialokasikan untuk tabungan?',
        answer:
          'Prinsip umum 50/30/20 menyarankan minimal 20% penghasilan bersih untuk tabungan, dana darurat, dan investasi.',
      },
    ],
    relatedGuideSlug: 'strategi-dana-darurat-inflasi-dana-pendidikan',
  },

  'flat-installment-calculator': {
    formula: 'Cicilan Bulanan = (Pokok / Tenor) + (Pokok × Bunga Flat Tahunan / 12)',
    variables: [
      'Pokok Pinjaman: total dana pinjaman yang dibiayai setelah dikurangi DP.',
      'Bunga Flat Tahunan: persentase bunga tetap per tahun yang selalu dihitung dari pokok awal.',
      'Tenor: lama angsuran dalam satuan bulan.',
    ],
    example: {
      scenario: 'Kredit motor/multiguna Rp36.000.000 dengan bunga flat 10% per tahun selama 24 bulan.',
      steps: [
        'Hitung pokok per bulan: Rp36.000.000 / 24 = Rp1.500.000.',
        'Hitung bunga flat per bulan: (Rp36.000.000 × 10%) / 12 = Rp300.000.',
        'Jumlahkan keduanya: Rp1.500.000 + Rp300.000 = Rp1.800.000 per bulan.',
      ],
      result: 'Cicilan tetap Rp1.800.000/bulan dengan total bunga selama 2 tahun sebesar Rp7.200.000.',
    },
    tips: [
      'Ingat bahwa bunga flat 10% setara dengan bunga efektif sekitar 18%–19% per tahun.',
      'Selalu bandingkan total pembayaran akhir dengan kalkulator pinjaman anuitas sebelum memilih lembaga pembiayaan.',
      'Tanyakan skema pelunasan dipercepat karena sebagian pinjaman bunga flat tetap membebankan sisa bunga berjalan.',
    ],
    extraFaqs: [
      {
        question: 'Mengapa cicilan bunga flat lebih mahal dari bunga anuitas di persentase yang sama?',
        answer:
          'Karena bunga flat terus dikalikan dengan pokok awal dari bulan pertama hingga terakhir, meskipun pokok pinjaman sebenarnya sudah berkurang setiap kali Anda mencicil.',
      },
      {
        question: 'Apakah bunga flat pernah menguntungkan debitur?',
        answer:
          'Bunga flat unggul dari sisi kesederhanaan perhitungan dan kepastian cicilan tetap pada tenor pendek (6–24 bulan), asalkan besaran suku bunga flat-nya benar-benar rendah.',
      },
    ],
    relatedGuideSlug: 'simulasi-kredit-bunga-anuitas-vs-flat',
  },

  'working-capital-calculator': {
    formula: 'Modal Kerja Bersih (NWC) = Aset Lancar − Liabilitas Lancar  |  Current Ratio = Aset Lancar / Liabilitas Lancar',
    variables: [
      'Aset Lancar: kas, bank, piutang usaha jangka pendek, dan persediaan barang dagang.',
      'Liabilitas Lancar: utang pemasok, utang gaji, utang pajak, dan cicilan jatuh tempo dalam 12 bulan.',
    ],
    example: {
      scenario: 'Sebuah toko distributor memiliki aset lancar Rp240.000.000 dan kewajiban lancar Rp150.000.000.',
      steps: [
        'Hitung modal kerja bersih: Rp240.000.000 − Rp150.000.000 = Rp90.000.000.',
        'Hitung rasio lancar (Current Ratio): Rp240.000.000 / Rp150.000.000 = 1,6x.',
      ],
      result: 'Modal kerja bersih positif Rp90.000.000 dengan Current Ratio 1,6x (likuiditas sehat).',
    },
    tips: [
      'Current Ratio ideal umumnya berkisar antara 1,5x hingga 2,5x tergantung siklus perputaran industri.',
      'Waspadai modal kerja yang terlihat besar tetapi mayoritas tertahan di piutang macet atau stok lama yang sulit terjual.',
      'Percepat penagihan piutang dan negosiasikan termin pembayaran pemasok untuk memperbaiki posisi modal kerja tanpa menambah utang.',
    ],
    extraFaqs: [
      {
        question: 'Apa artinya jika modal kerja bernilai negatif?',
        answer:
          'Modal kerja negatif berarti kewajiban jangka pendek melebihi aset lancar. Kecuali di bisnis ritel tunai berputaran super cepat, kondisi ini merupakan sinyal risiko kesulitan likuiditas.',
      },
      {
        question: 'Apakah aset tetap seperti mesin dan bangunan masuk hitungan modal kerja?',
        answer:
          'Tidak. Modal kerja hanya mencakup aset lancar yang dapat dikonversi menjadi kas dalam waktu kurang dari satu tahun.',
      },
    ],
    relatedGuideSlug: 'panduan-bep-dan-arus-kas-usaha',
  },

  'gross-margin-calculator': {
    formula: 'Gross Margin (%) = ((Pendapatan − HPP) / Pendapatan) × 100%',
    variables: [
      'Pendapatan (Revenue): total penjualan bersih sebelum dikurangi biaya operasional.',
      'HPP (COGS): biaya langsung pengadaan bahan baku, tenaga kerja produksi langsung, dan kemasan.',
    ],
    example: {
      scenario: 'Brand kuliner mencatat omzet Rp80.000.000 dengan total HPP bahan dan kemasan Rp36.000.000.',
      steps: [
        'Hitung laba kotor (Gross Profit): Rp80.000.000 − Rp36.000.000 = Rp44.000.000.',
        'Hitung Gross Margin: (Rp44.000.000 / Rp80.000.000) × 100% = 55%.',
      ],
      result: 'Laba kotor Rp44.000.000 dengan Gross Margin 55% yang tersedia untuk menutup sewa, gaji, dan pemasaran.',
    },
    tips: [
      'Hitung Gross Margin per lini produk untuk menemukan mana produk paling menguntungkan dan mana yang perlu direvisi harganya.',
      'Kenaikan tipis biaya bahan baku 5% dapat memangkas laba bersih cukup besar jika tidak segera disesuaikan.',
      'Gunakan Gross Margin sebagai indikator efisiensi produksi dan kekuatan posisi tawar harga Anda.',
    ],
    extraFaqs: [
      {
        question: 'Apa perbedaan Gross Margin dan Net Profit Margin?',
        answer:
          'Gross Margin hanya mengurangi HPP dari pendapatan, sedangkan Net Profit Margin mengurangi seluruh biaya operasional, pemasaran, bunga, dan pajak.',
      },
      {
        question: 'Apakah biaya iklan masuk dalam HPP saat menghitung Gross Margin?',
        answer:
          'Tidak. Biaya iklan dan pemasaran masuk ke biaya operasional (OpEx), bukan HPP.',
      },
    ],
    relatedGuideSlug: 'panduan-margin-vs-markup-umkm',
  },

  'revenue-projection-calculator': {
    formula: 'Proyeksi Pendapatan Bulan ke-n = Pendapatan Awal × (1 + Tingkat Pertumbuhan)^n',
    variables: [
      'Pendapatan Awal: omzet rata-rata bulanan saat ini sebagai basis perhitungan.',
      'Tingkat Pertumbuhan (%): asumsi kenaikan omzet per periode (bulanan/kuartalan).',
      'Jumlah Periode: rentang waktu proyeksi yang ingin disimulasikan.',
    ],
    example: {
      scenario: 'Omzet awal Rp50.000.000/bulan dengan target pertumbuhan konservatif 5% per bulan selama 6 bulan.',
      steps: [
        'Bulan 1: Rp50.000.000 × 1,05 = Rp52.500.000.',
        'Lanjutkan pemajemukan hingga bulan ke-6: Rp50.000.000 × (1,05)^6 ≈ Rp67.004.782.',
      ],
      result: 'Di bulan ke-6, omzet bulanan diproyeksikan mencapai ±Rp67 juta dengan akumulasi 6 bulan sekitar Rp357 juta.',
    },
    tips: [
      'Gunakan rata-rata data historis 6–12 bulan terakhir agar asumsi pertumbuhan tidak terlalu agresif.',
      'Perhitungkan faktor musiman (seperti lonjakan Ramadan/akhir tahun dan bulan sepi pasca-liburan).',
      'Selaraskan proyeksi pendapatan dengan kapasitas stok, tim operasional, dan anggaran pemasaran.',
    ],
    extraFaqs: [
      {
        question: 'Seberapa sering proyeksi pendapatan perlu diperbarui?',
        answer:
          'Bandingkan proyeksi dengan realisasi aktual setiap akhir bulan (variance analysis) agar strategi promosi dan belanja stok cepat disesuaikan.',
      },
      {
        question: 'Apakah proyeksi omzet bisa langsung dipakai untuk mengajukan modal?',
        answer:
          'Ya, namun investor atau bank umumnya juga meminta proyeksi arus kas, HPP, dan asumsi jumlah pelanggan di balik angka omzet tersebut.',
      },
    ],
  },

  'expense-ratio-calculator': {
    formula: 'Expense Ratio (%) = (Total Biaya Operasional / Total Pendapatan) × 100%',
    variables: [
      'Total Biaya Operasional: seluruh biaya tetap dan penunjang usaha (gaji, sewa, listrik, pemasaran, admin).',
      'Total Pendapatan: total penjualan bersih pada periode yang sama.',
    ],
    example: {
      scenario: 'Bisnis jasa memiliki pendapatan Rp100.000.000 dan total biaya operasional Rp62.000.000 dalam sebulan.',
      steps: [
        'Bagi biaya operasional dengan pendapatan: Rp62.000.000 / Rp100.000.000 = 0,62.',
        'Kalikan 100%: 0,62 × 100% = 62%.',
      ],
      result: 'Expense Ratio sebesar 62%, menyisakan 38% pendapatan sebelum pajak dan bunga.',
    },
    tips: [
      'Pecah rasio biaya per kategori (rasio gaji, rasio sewa, rasio iklan) untuk menemukan pos yang paling boros.',
      'Jika omzet naik tetapi Expense Ratio ikut naik, periksa apakah ada inefisiensi operasional atau biaya iklan yang tidak efektif.',
      'Tetapkan batas pagu persentase anggaran untuk setiap divisi berdasarkan rasio historis yang sehat.',
    ],
    extraFaqs: [
      {
        question: 'Apakah Expense Ratio sama dengan rasio biaya di reksa dana?',
        answer:
          'Konsepnya serupa (mengukur porsi biaya terhadap nilai utama). Di bisnis, rasio ini membandingkan biaya operasional terhadap omzet; di reksa dana, membandingkan biaya manajemen terhadap dana kelolaan (AUM).',
      },
      {
        question: 'Berapa rasio biaya sewa yang ideal untuk usaha F&B atau ritel?',
        answer:
          'Sebagai patokan praktis, banyak pelaku F&B menjaga biaya sewa tempat tidak melebihi 10%–15% dari omzet bulanan.',
      },
    ],
  },

  'tax-inclusive-price-calculator': {
    formula: 'Harga Dasar (DPP) = Harga Termasuk Pajak / (1 + Tarif Pajak)  |  Nilai Pajak = Harga Termasuk Pajak − DPP',
    variables: [
      'Harga Termasuk Pajak: nominal final yang tertera di label harga atau nota pembayaran.',
      'Tarif Pajak (%): persentase pajak yang berlaku (misalnya PPN 11% atau PB1 restoran 10%).',
    ],
    example: {
      scenario: 'Menu paket katering dibanderol Rp555.000 sudah termasuk PPN 11%.',
      steps: [
        'Hitung harga dasar (DPP): Rp555.000 / 1,11 = Rp500.000.',
        'Hitung nilai pajaknya: Rp555.000 − Rp500.000 = Rp55.000.',
      ],
      result: 'Dari total Rp555.000, komponen harga dasar adalah Rp500.000 dan pajaknya Rp55.000.',
    },
    tips: [
      'Selalu gunakan pembagian (1 + tarif pajak), bukan pengurangan langsung tarif persen dari harga akhir.',
      'Untuk restoran/kafe yang mengenakan PB1 10% di harga menu inklusif, ganti tarif pajak ke 10% (pembagi 1,10).',
      'Pisahkan pencatatan nilai pajak dari omzet bersih agar laporan penjualan tidak tampak lebih besar dari realita.',
    ],
    extraFaqs: [
      {
        question: 'Apakah pajak restoran PB1 10% dihitung dengan cara yang sama seperti PPN?',
        answer:
          'Ya, jika harga menu sudah termasuk PB1 10%, harga dasar sebelum pajak dihitung dengan membagi harga menu dengan 1,10.',
      },
      {
        question: 'Bagaimana jika restoran juga mengenakan service charge 5% sebelum pajak?',
        answer:
          'Service charge umumnya ditambahkan lebih dulu ke harga dasar, baru kemudian pajak daerah 10% dihitung dari gabungan harga makanan + service charge.',
      },
    ],
    relatedGuideSlug: 'panduan-ppn-11-persen-dan-invoice-bisnis',
  },

  'profit-calculator': {
    formula: 'Keuntungan Bersih = Total Pendapatan − Total Biaya  |  Margin (%) = (Keuntungan / Pendapatan) × 100%',
    variables: [
      'Total Pendapatan: seluruh hasil penjualan barang atau jasa dalam periode tertentu.',
      'Total Biaya: gabungan modal pokok (HPP) ditambah biaya operasional atau biaya transaksi.',
    ],
    example: {
      scenario: 'Penjualan satu batch produk menghasilkan Rp25.000.000 dengan total biaya modal dan operasional Rp17.500.000.',
      steps: [
        'Hitung laba bersih: Rp25.000.000 − Rp17.500.000 = Rp7.500.000.',
        'Hitung persentase profit terhadap omzet: (Rp7.500.000 / Rp25.000.000) × 100% = 30%.',
      ],
      result: 'Anda memperoleh keuntungan bersih Rp7.500.000 dengan tingkat profitabilitas 30%.',
    },
    tips: [
      'Jangan lupa memasukkan biaya tidak terlihat seperti listrik, internet, paket data, dan ongkos transportasi operasional.',
      'Catat laba secara terpisah per proyek atau per batch agar mudah mengevaluasi pekerjaan mana yang paling menguntungkan.',
      'Sisihkan sebagian profit ke dana cadangan usaha sebelum seluruhnya diambil untuk konsumsi pribadi.',
    ],
    extraFaqs: [
      {
        question: 'Apakah angka omzet besar selalu berarti profit tinggi?',
        answer:
          'Tidak. Banyak usaha dengan omzet ratusan juta memiliki profit sangat kecil karena diskon berlebihan, biaya iklan mahal, atau HPP yang tidak terkontrol.',
      },
      {
        question: 'Kapan sebaiknya mengevaluasi profit bisnis?',
        answer:
          'Minimal lakukan rekap mingguan untuk kas dan evaluasi profit bulanan secara menyeluruh agar kebocoran biaya cepat terdeteksi.',
      },
    ],
    relatedGuideSlug: 'panduan-margin-vs-markup-umkm',
  },

  'loan-affordability-calculator': {
    formula: 'Batas Cicilan Aman = (Penghasilan Bulanan × Rasio DSR Maks) − Cicilan Berjalan',
    variables: [
      'Penghasilan Bersih Bulanan: total pendapatan rutin rumah tangga atau usaha setelah pajak.',
      'Cicilan Berjalan: total angsuran kredit yang sedang aktif saat ini (kendaraan, KTA, kartu kredit).',
      'Rasio DSR Maksimal: persentase batas cicilan sehat (umumnya 30%–35% dari penghasilan).',
    ],
    example: {
      scenario: 'Penghasilan bersih Rp15.000.000/bulan, sudah ada cicilan motor Rp1.000.000/bulan, batas DSR sehat 30%.',
      steps: [
        'Hitung total kapasitas cicilan maksimal: 30% × Rp15.000.000 = Rp4.500.000/bulan.',
        'Kurangi dengan cicilan yang sedang berjalan: Rp4.500.000 − Rp1.000.000 = Rp3.500.000/bulan.',
      ],
      result: 'Sisa ruang cicilan bulanan yang aman untuk pinjaman baru adalah maksimal Rp3.500.000/bulan.',
    },
    tips: [
      'Pertahankan dana darurat minimal 6 bulan pengeluaran sebelum mengambil komitmen kredit jangka panjang seperti KPR.',
      'Jangan memaksakan batas maksimal 40% DSR jika penghasilan Anda bersifat fluktuatif (freelancer/komisi).',
      'Hitung pula potensi biaya tambahan setelah memiliki aset (pajak kendaraan, IPL, perawatan rumah).',
    ],
    extraFaqs: [
      {
        question: 'Apakah limit kartu kredit atau paylater memengaruhi persetujuan bank?',
        answer:
          'Ya, tagihan berjalan dan riwayat pembayaran di SLIK OJK akan dihitung bank sebagai bagian dari kewajiban bulanan saat menilai kelayakan kredit.',
      },
      {
        question: 'Apakah penghasilan pasangan bisa digabungkan (joint income)?',
        answer:
          'Bisa. Untuk KPR, sebagian besar bank memperbolehkan skema joint income suami-istri sehingga plafon pinjaman yang disetujui bisa lebih besar.',
      },
    ],
    relatedGuideSlug: 'simulasi-kredit-bunga-anuitas-vs-flat',
  },

  'payment-due-date-calculator': {
    formula: 'Tanggal Jatuh Tempo = Tanggal Transaksi / Tagihan + Termin Pembayaran (Hari)',
    variables: [
      'Tanggal Mulai: tanggal terbit tagihan, pengiriman barang, atau tanggal kesepakatan kontrak.',
      'Termin (Net Days): jumlah hari kelonggaran pembayaran (umumnya Net 7, Net 14, Net 30, atau Net 60).',
    ],
    example: {
      scenario: 'Pengiriman barang dilakukan pada 18 November 2026 dengan kesepakatan termin pembayaran Net 30.',
      steps: [
        'Mulai hitung dari 18 November 2026.',
        'Tambahkan 30 hari kalender (November memiliki 30 hari: tersisa 12 hari di November + 18 hari di Desember).',
      ],
      result: 'Tanggal jatuh tempo pembayaran tepat pada 18 Desember 2026.',
    },
    tips: [
      'Sepakati sejak awal apakah termin dihitung dari tanggal invoice terbit atau tanggal barang diterima (tukar faktur).',
      'Kirimkan pengingat pembayaran sopan pada H-3 sebelum tanggal jatuh tempo agar tidak terlewat oleh tim finance klien.',
      'Jika tanggal jatuh tempo jatuh pada akhir pekan atau hari libur nasional, tentukan apakah pembayaran dimajukan ke hari kerja sebelumnya.',
    ],
    extraFaqs: [
      {
        question: 'Apa arti istilah Net 30 dalam transaksi bisnis?',
        answer:
          'Net 30 berarti pembeli wajib melunasi tagihan secara penuh paling lambat 30 hari kalender sejak tanggal invoice diterbitkan.',
      },
      {
        question: 'Apa maksud istilah 2/10 Net 30?',
        answer:
          'Artinya pembeli mendapat potongan diskon 2% jika melunasi dalam 10 hari pertama, atau wajib membayar penuh tanpa diskon maksimal pada hari ke-30.',
      },
    ],
    relatedGuideSlug: 'panduan-ppn-11-persen-dan-invoice-bisnis',
  },

  'unit-cost-calculator': {
    formula: 'Unit Cost (HPP per Unit) = (Total Biaya Bahan + Tenaga Kerja Langsung + Overhead Produksi) / Jumlah Unit Diproduksi',
    variables: [
      'Total Biaya Produksi: akumulasi biaya bahan baku, kemasan, ongkir bahan masuk, tenaga kerja, dan overhead produksi.',
      'Jumlah Unit: total produk jadi yang layak jual dari batch produksi tersebut.',
    ],
    example: {
      scenario: 'Produksi 500 botol minuman menghabiskan bahan Rp2.500.000, botol & label Rp1.250.000, dan tenaga kerja + gas Rp750.000.',
      steps: [
        'Jumlahkan seluruh biaya batch: Rp2.500.000 + Rp1.250.000 + Rp750.000 = Rp4.500.000.',
        'Bagi dengan jumlah unit layak jual: Rp4.500.000 / 500 botol = Rp9.000/botol.',
      ],
      result: 'Biaya pokok per unit (Unit Cost) adalah Rp9.000 per botol.',
    },
    tips: [
      'Perhitungkan persentase produk gagal/rusak (waste rate); bagi total biaya hanya dengan unit yang benar-benar layak jual.',
      'Jangan lupakan biaya kecil seperti stiker, bubble wrap, lakban, dan ongkir pembelian bahan dari pemasok.',
      'Bandingkan Unit Cost pada skala produksi kecil vs besar untuk melihat potensi efisiensi skala (economies of scale).',
    ],
    extraFaqs: [
      {
        question: 'Mengapa Unit Cost bisa turun saat volume produksi naik?',
        answer:
          'Karena biaya tetap produksi (seperti sewa dapur/bengkel dan penyusutan mesin) terbagi ke lebih banyak unit, ditambah potensi diskon pembelian grosir bahan baku.',
      },
      {
        question: 'Apakah Unit Cost sama dengan harga jual minimum?',
        answer:
          'Unit Cost adalah batas biaya produksi per unit. Harga jual tetap harus lebih tinggi dari Unit Cost untuk menutup biaya pemasaran, admin, dan target laba.',
      },
    ],
    relatedGuideSlug: 'panduan-safety-stock-dan-reorder-point-umkm',
  },

  'simple-interest-calculator': {
    formula: 'Bunga Tunggal (I) = P × r × t  |  Nilai Akhir = P + I',
    variables: [
      'P (Pokok): jumlah dana pinjaman atau simpanan awal.',
      'r (Suku Bunga Tahunan): persentase bunga per tahun dalam desimal.',
      't (Waktu): jangka waktu dalam satuan tahun (jika bulan, bagi 12).',
    ],
    example: {
      scenario: 'Simpanan deposito non-compounding sebesar Rp50.000.000 dengan bunga tunggal 6% per tahun selama 2 tahun.',
      steps: [
        'Hitung bunga per tahun: Rp50.000.000 × 6% = Rp3.000.000.',
        'Kalikan dengan durasi 2 tahun: Rp3.000.000 × 2 = Rp6.000.000.',
        'Tambahkan ke pokok: Rp50.000.000 + Rp6.000.000 = Rp56.000.000.',
      ],
      result: 'Total bunga kotor Rp6.000.000 dan nilai akhir menjadi Rp56.000.000 (sebelum pajak bunga).',
    },
    tips: [
      'Untuk deposito bank di Indonesia dengan nominal di atas Rp7,5 juta, jangan lupa kurangi bunga kotor dengan PPh Final 20%.',
      'Bunga tunggal cocok untuk simulasi pinjaman jangka pendek, kupon obligasi yang dicairkan rutin, dan edukasi dasar finansial.',
      'Jika bunga tidak dicairkan melainkan diinvestasikan kembali, gunakan kalkulator bunga majemuk.',
    ],
    extraFaqs: [
      {
        question: 'Produk keuangan apa yang menggunakan perhitungan bunga tunggal?',
        answer:
          'Deposito dengan bunga ditransfer ke rekening tiap bulan, kupon obligasi ritel (ORI/SBR) yang dibayar rutin, dan pinjaman jangka pendek antar pihak.',
      },
      {
        question: 'Bagaimana menghitung bunga tunggal jika jangka waktunya hanya 90 hari?',
        answer:
          'Gunakan proporsi hari t = 90 / 365 (atau 90 / 360 tergantung konvensi bank) lalu kalikan dengan Pokok × Suku Bunga Tahunan.',
      },
    ],
  },

  'discount-reverse-calculator': {
    formula: 'Harga Awal = Harga Setelah Diskon / (1 − Persen Diskon / 100)',
    variables: [
      'Harga Setelah Diskon: harga jual akhir yang sudah dipotong promosi.',
      'Persen Diskon: besar potongan persentase yang diberikan.',
      'Harga Awal: harga normal asli sebelum diskon diterapkan.',
    ],
    example: {
      scenario: 'Anda membeli laptop seharga Rp8.400.000 setelah mendapat diskon 30%. Berapa harga aslinya?',
      steps: [
        'Hitung faktor sisa harga: 1 − 0,30 = 0,70.',
        'Bagi harga akhir dengan 0,70: Rp8.400.000 / 0,70 = Rp12.000.000.',
        'Besar penghematan: Rp12.000.000 − Rp8.400.000 = Rp3.600.000.',
      ],
      result: 'Harga asli sebelum diskon adalah Rp12.000.000 dengan total potongan Rp3.600.000.',
    },
    tips: [
      'Sangat berguna untuk seller marketplace yang ingin tahu harga coret (harga katalog) agar setelah promo diskon tetap mencapai target harga jual bersih.',
      'Jangan menambahkan persentase diskon langsung ke harga akhir karena hasilnya akan lebih rendah dari harga awal yang benar.',
      'Pastikan harga katalog tetap wajar dan transparan agar menjaga kepercayaan pelanggan.',
    ],
    extraFaqs: [
      {
        question: 'Mengapa Rp8.400.000 ditambah 30% tidak menghasilkan Rp12.000.000?',
        answer:
          'Karena diskon 30% dihitung dari harga awal yang lebih besar (Rp12 juta), bukan dari harga setelah diskon (Rp8,4 juta).',
      },
      {
        question: 'Bagaimana cara menyusun harga jual agar aman ikut promo diskon 20%?',
        answer:
          'Jika Anda ingin menerima bersih Rp100.000 setelah diskon 20%, masukkan Rp100.000 dan diskon 20% — harga katalog yang perlu dipasang adalah Rp125.000.',
      },
    ],
    relatedGuideSlug: 'panduan-margin-vs-markup-umkm',
  },

  'vat-reverse-calculator': {
    formula: 'DPP = Total Termasuk PPN / (1 + Tarif PPN)  |  PPN = Total − DPP',
    variables: [
      'Total Termasuk PPN: nominal transaksi final yang sudah memuat PPN.',
      'Tarif PPN: standar 11% di Indonesia (pembagi 1,11).',
      'DPP: Dasar Pengenaan Pajak sebelum PPN.',
    ],
    example: {
      scenario: 'Klien mentransfer total Rp22.200.000 yang disepakati sudah termasuk PPN 11%.',
      steps: [
        'Hitung DPP: Rp22.200.000 / 1,11 = Rp20.000.000.',
        'Hitung PPN keluaran: Rp22.200.000 − Rp20.000.000 = Rp2.200.000.',
      ],
      result: 'DPP yang dicatat pada e-Faktur adalah Rp20.000.000 dengan PPN Rp2.200.000.',
    },
    tips: [
      'Gunakan alat ini saat merekonsiliasi pembayaran marketplace atau klien B2B yang memakai skema harga inklusif pajak.',
      'Cek pembulatan Rupiah penuh sesuai aturan penulisan faktur pajak elektronik (e-Faktur / Coretax).',
      'Cocokkan angka DPP dan PPN sebelum menerbitkan faktur agar tidak perlu membuat faktur pengganti.',
    ],
    extraFaqs: [
      {
        question: 'Berapa persen PPN efektif terhadap harga yang sudah termasuk PPN 11%?',
        answer:
          'Porsi PPN terhadap harga inklusif adalah 11 / 111 atau sekitar 9,91% dari total harga final — bukan 11% dari total harga final.',
      },
      {
        question: 'Apakah alat ini bisa digunakan untuk tarif PPN 12% atau negara lain?',
        answer:
          'Bisa, cukup ubah persentase tarif pajak sesuai ketentuan yang berlaku (misalnya 12% akan memakai pembagi 1,12).',
      },
    ],
    relatedGuideSlug: 'panduan-ppn-11-persen-dan-invoice-bisnis',
  },

  'sales-commission-calculator': {
    formula: 'Komisi Penjualan = Total Penjualan × (Tarif Komisi / 100) + Bonus Target (jika ada)',
    variables: [
      'Total Penjualan: nilai transaksi atau omzet yang berhasil ditutup oleh tenaga penjual.',
      'Tarif Komisi (%): persentase insentif yang disepakati perusahaan.',
    ],
    example: {
      scenario: 'Sales executive mencatat penjualan Rp180.000.000 dalam sebulan dengan tarif komisi 3,5%.',
      steps: [
        'Kalikan total penjualan dengan tarif komisi: Rp180.000.000 × 3,5% = Rp6.300.000.',
      ],
      result: 'Komisi yang diperoleh sales tersebut adalah Rp6.300.000 sebelum PPh 21.',
    },
    tips: [
      'Tentukan sejak awal apakah komisi dihitung dari omzet (revenue) atau dari laba kotor (gross profit) agar tim tidak asal memberi diskon besar.',
      'Sebaiknya komisi dicairkan setelah pembayaran klien benar-benar lunas untuk menjaga arus kas perusahaan.',
      'Pertimbangkan skema komisi berjenjang (tiered commission) untuk memotivasi pencapaian di atas kuota bulanan.',
    ],
    extraFaqs: [
      {
        question: 'Apakah komisi penjualan dikenakan PPh 21?',
        answer:
          'Ya, komisi yang diterima karyawan tetap digabungkan dengan penghasilan bulanan sebagai objek PPh 21, sedangkan untuk agen lepas mengikuti ketentuan PPh 21 bukan pegawai.',
      },
      {
        question: 'Bagaimana jika transaksi dibatalkan atau diretur setelah komisi dibayar?',
        answer:
          'Umumnya perusahaan menerapkan klausul clawback atau penyesuaian potongan pada perhitungan komisi periode berikutnya.',
      },
    ],
  },

  'break-even-revenue-calculator': {
    formula: 'BEP Rupiah = Biaya Tetap / Rasio Margin Kontribusi (%)',
    variables: [
      'Biaya Tetap: total pengeluaran rutin bulanan yang tidak bergantung pada jumlah transaksi.',
      'Rasio Margin Kontribusi: persentase pendapatan yang tersisa setelah dikurangi biaya variabel (misalnya 40% atau 0,40).',
    ],
    example: {
      scenario: 'Toko fesyen dengan puluhan jenis SKU memiliki biaya tetap Rp28.000.000/bulan dan rata-rata margin kontribusi 40%.',
      steps: [
        'Ubah rasio margin kontribusi ke desimal: 40% = 0,40.',
        'Bagi biaya tetap dengan rasio tersebut: Rp28.000.000 / 0,40 = Rp70.000.000.',
      ],
      result: 'Toko wajib mencetak omzet minimal Rp70.000.000 per bulan agar tidak merugi.',
    },
    tips: [
      'BEP Rupiah jauh lebih praktis daripada BEP Unit jika bisnis Anda menjual puluhan atau ratusan SKU dengan harga berbeda-beda.',
      'Pastikan rasio margin kontribusi sudah memperhitungkan biaya variabel seperti biaya admin marketplace dan ongkir subsidi.',
      'Pantau pencapaian omzet harian dibandingkan rata-rata BEP Rupiah harian (BEP / 30 hari).',
    ],
    extraFaqs: [
      {
        question: 'Kapan lebih baik memakai BEP Rupiah dibanding BEP Unit?',
        answer:
          'Pakai BEP Rupiah saat Anda memiliki banyak variasi produk/jasa dengan harga berlainan (toko ritel, kafe, minimarket, agensi).',
      },
      {
        question: 'Bagaimana menurunkan angka BEP Rupiah?',
        answer:
          'Anda bisa menekan biaya tetap bulanan atau menaikkan porsi penjualan produk bermargin tinggi sehingga rata-rata rasio margin kontribusi naik.',
      },
    ],
    relatedGuideSlug: 'panduan-bep-dan-arus-kas-usaha',
  },

  'profit-target-calculator': {
    formula: 'Target Penjualan = (Biaya Tetap + Target Laba) / Rasio Margin Kontribusi',
    variables: [
      'Biaya Tetap: seluruh pengeluaran rutin bulanan bisnis.',
      'Target Laba: nominal keuntungan bersih sebelum pajak yang ingin dicapai.',
      'Margin per Unit / Rasio Margin: keuntungan kontribusi per penjualan.',
    ],
    example: {
      scenario: 'Bisnis dengan biaya tetap Rp20.000.000/bulan dan margin kontribusi 50% menargetkan laba Rp15.000.000/bulan.',
      steps: [
        'Jumlahkan biaya tetap dan target laba: Rp20.000.000 + Rp15.000.000 = Rp35.000.000.',
        'Bagi dengan rasio margin 0,50: Rp35.000.000 / 0,50 = Rp70.000.000.',
      ],
      result: 'Untuk membawa pulang laba Rp15 juta/bulan, bisnis perlu membukukan omzet minimal Rp70.000.000.',
    },
    tips: [
      'Turunkan target omzet bulanan menjadi target mingguan dan harian agar lebih mudah dipantau oleh tim.',
      'Periksa apakah kapasitas produksi, stok barang, dan jumlah staf memadai untuk melayani volume target tersebut.',
      'Jika target laba adalah laba setelah pajak, naikkan dulu target laba sebelum pajak dengan membaginya oleh (1 − tarif pajak).',
    ],
    extraFaqs: [
      {
        question: 'Apa beda Profit Target dengan Break-Even Point?',
        answer:
          'Break-Even Point menghitung penjualan minimum saat laba = Rp0, sedangkan Profit Target menghitung penjualan yang dibutuhkan untuk mencapai nominal laba tertentu.',
      },
      {
        question: 'Bagaimana jika target penjualan terasa terlalu tinggi dari kapasitas saat ini?',
        answer:
          'Anda bisa menyesuaikan harga jual, melakukan efisiensi biaya bahan/operasional, atau memecah target menjadi rencana pertumbuhan bertahap tiap kuartal.',
      },
    ],
    relatedGuideSlug: 'panduan-bep-dan-arus-kas-usaha',
  },

  'invoice-tax-breakdown-calculator': {
    formula: 'DPP = Total / (1 + Tarif Pajak)  atau  Total = DPP × (1 + Tarif Pajak)',
    variables: [
      'Subtotal / DPP: nilai dasar barang atau jasa sebelum pajak.',
      'Tarif PPN (%): umumnya 11% sesuai ketentuan Indonesia.',
      'Total Invoice: nilai keseluruhan yang harus dibayarkan klien.',
    ],
    example: {
      scenario: 'Tagihan proyek jasa sebesar Rp33.300.000 perlu dipisahkan menjadi DPP dan PPN 11% untuk pembukuan.',
      steps: [
        'Hitung DPP: Rp33.300.000 / 1,11 = Rp30.000.000.',
        'Hitung PPN 11%: Rp30.000.000 × 11% = Rp3.300.000.',
      ],
      result: 'Rincian invoice: DPP Rp30.000.000, PPN 11% Rp3.300.000, dan Total Rp33.300.000.',
    },
    tips: [
      'Perhatikan juga apakah transaksi jasa terkena pemotongan PPh Pasal 23 sebesar 2% dari DPP (bukan dari total termasuk PPN).',
      'Sertakan rincian DPP dan PPN secara terpisah pada setiap baris ringkasan invoice B2B.',
      'Cocokkan angka rincian ini dengan bukti potong dan faktur pajak sebelum periode pelaporan SPT Masa.',
    ],
    extraFaqs: [
      {
        question: 'Apakah PPh 23 2% dihitung dari nilai sebelum atau sesudah PPN?',
        answer:
          'PPh Pasal 23 atas jasa dihitung sebesar 2% dari DPP (harga sebelum PPN), bukan dari grand total yang sudah ditambah PPN.',
      },
      {
        question: 'Bagaimana perlakuan diskon pada perhitungan pajak invoice?',
        answer:
          'Diskon dagang yang tercantum di invoice dikurangkan terlebih dahulu dari subtotal barang/jasa sebelum PPN 11% dihitung.',
      },
    ],
    relatedGuideSlug: 'panduan-ppn-11-persen-dan-invoice-bisnis',
  },

  'cash-runway-calculator': {
    formula: 'Cash Runway (Bulan) = Saldo Kas Tersedia / Net Burn Rate Bulanan',
    variables: [
      'Saldo Kas Tersedia: total uang tunai likuid di rekening operasional perusahaan saat ini.',
      'Net Burn Rate Bulanan: selisih kas keluar dikurangi kas masuk per bulan (defisit kas bulanan).',
    ],
    example: {
      scenario: 'Startup memiliki saldo kas Rp600.000.000, pengeluaran bulanan Rp110.000.000, dan penerimaan Rp60.000.000.',
      steps: [
        'Hitung Net Burn Rate bulanan: Rp110.000.000 − Rp60.000.000 = Rp50.000.000/bulan.',
        'Bagi saldo kas dengan Net Burn Rate: Rp600.000.000 / Rp50.000.000 = 12 bulan.',
      ],
      result: 'Cash runway perusahaan adalah 12 bulan dengan asumsi pendapatan dan pengeluaran tetap.',
    },
    tips: [
      'Mulailah menyiapkan efisiensi biaya atau penggalangan dana ketika runway tersisa 6–9 bulan, bukan saat kas tinggal 2 bulan.',
      'Bedakan Gross Burn (total pengeluaran bulanan) dengan Net Burn (pengeluaran dikurangi pendapatan aktual).',
      'Jika penerimaan sudah melebihi pengeluaran setiap bulan, bisnis berstatus cash-flow positive (default alive).',
    ],
    extraFaqs: [
      {
        question: 'Berapa lama cash runway yang ideal bagi bisnis rintisan?',
        answer:
          'Banyak praktisi keuangan menyarankan runway minimal 12 hingga 18 bulan agar manajemen punya ruang cukup untuk iterasi produk dan mencapai profitabilitas.',
      },
      {
        question: 'Apa langkah tercepat memperpanjang cash runway?',
        answer:
          'Pangkas biaya tetap non-esensial, hentikan kanal pemasaran ber-ROI negatif, percepat penagihan piutang, dan fokus pada produk bermargin tertinggi.',
      },
    ],
    relatedGuideSlug: 'panduan-bep-dan-arus-kas-usaha',
  },

  'stock-reorder-point-calculator': {
    formula: 'Reorder Point (ROP) = (Rata-rata Penjualan Harian × Lead Time Hari) + Safety Stock',
    variables: [
      'Rata-rata Penjualan Harian: jumlah unit rata-rata yang terjual per hari.',
      'Lead Time (Hari): waktu tunggu sejak PO dikirim hingga stok tiba dan siap dijual.',
      'Safety Stock: jumlah stok penyangga untuk mengantisipasi lonjakan permintaan atau keterlambatan kirim.',
    ],
    example: {
      scenario: 'Produk laku 15 unit/hari, waktu pengiriman pemasok 6 hari, dan safety stock ditetapkan 40 unit.',
      steps: [
        'Hitung konsumsi stok selama lead time: 15 × 6 = 90 unit.',
        'Tambahkan safety stock: 90 + 40 = 130 unit.',
      ],
      result: 'Begitu stok di gudang menyentuh 130 unit, Anda harus segera melakukan pemesanan ulang.',
    },
    tips: [
      'Perbarui angka penjualan harian menjelang musim ramai seperti Ramadan, akhir tahun, atau kampanye payday.',
      'Pisahkan perhitungan ROP untuk setiap SKU terlaris agar tidak salah timing restock.',
      'Hitung lead time secara realistis termasuk proses QC dan pengemasan sebelum barang benar-benar siap tayang.',
    ],
    extraFaqs: [
      {
        question: 'Apakah Reorder Point sama dengan jumlah barang yang harus dipesan?',
        answer:
          'Tidak. ROP memberi tahu KAPAN harus memesan ulang, sedangkan jumlah pesanan ditentukan oleh kebutuhan siklus stok atau Economic Order Quantity (EOQ).',
      },
      {
        question: 'Bagaimana jika pemasok sering terlambat mengirim barang?',
        answer:
          'Perbesar komponen Safety Stock dan masukkan lead time terlama sebagai acuan agar toko tidak mengalami kekosongan stok.',
      },
    ],
    relatedGuideSlug: 'panduan-safety-stock-dan-reorder-point-umkm',
  },

  'gross-profit-target-calculator': {
    formula: 'Target Pendapatan = Target Laba Kotor / (Gross Margin % / 100)',
    variables: [
      'Target Laba Kotor: nominal gross profit yang dibutuhkan untuk menutup biaya operasional dan target laba bersih.',
      'Gross Margin (%): persentase rata-rata margin kotor dari penjualan produk.',
    ],
    example: {
      scenario: 'Anda membutuhkan laba kotor Rp45.000.000 bulan ini dengan rata-rata Gross Margin toko sebesar 30%.',
      steps: [
        'Ubah Gross Margin ke desimal: 30% = 0,30.',
        'Bagi target laba kotor dengan 0,30: Rp45.000.000 / 0,30 = Rp150.000.000.',
      ],
      result: 'Anda perlu mencapai omzet minimal Rp150.000.000 untuk menghasilkan laba kotor Rp45.000.000.',
    },
    tips: [
      'Gunakan target laba kotor untuk mengecek apakah omzet saat ini realistis menutup seluruh anggaran biaya operasional.',
      'Menaikkan Gross Margin beberapa persen lewat negosiasi HPP bisa menurunkan beban target omzet secara signifikan.',
      'Lakukan simulasi terpisah untuk penjualan ritel (margin tinggi) dan grosir (margin lebih tipis).',
    ],
    extraFaqs: [
      {
        question: 'Mengapa menargetkan laba kotor lebih akurat daripada sekadar menargetkan omzet?',
        answer:
          'Karena omzet tinggi dari produk bermargin tipis tidak cukup menutup biaya gaji dan sewa, sedangkan laba kotor menunjukkan dana riil yang tersedia untuk operasional.',
      },
      {
        question: 'Bagaimana jika Gross Margin aktual lebih rendah dari asumsi awal?',
        answer:
          'Omzet yang dibutuhkan akan otomatis meningkat agar nominal laba kotor tetap tercapai.',
      },
    ],
    relatedGuideSlug: 'panduan-margin-vs-markup-umkm',
  },

  'shipping-margin-calculator': {
    formula: 'Laba Bersih Pesanan = Harga Jual − HPP − Biaya Pengiriman & Fulfillment − Biaya Platform',
    variables: [
      'Harga Jual: nominal yang dibayar pembeli per pesanan.',
      'HPP: harga pokok produk beserta kemasan dasar.',
      'Biaya Pengiriman & Fulfillment: subsidi ongkir, biaya packing tambahan (bubble wrap/kardus), dan jasa fulfillment.',
    ],
    example: {
      scenario: 'Produk dijual Rp150.000 dengan HPP Rp85.000, subsidi ongkir Rp15.000, dan biaya kemasan/handling Rp7.000.',
      steps: [
        'Total biaya per pesanan: Rp85.000 + Rp15.000 + Rp7.000 = Rp107.000.',
        'Hitung laba bersih pesanan: Rp150.000 − Rp107.000 = Rp43.000.',
        'Hitung margin setelah ongkir: (Rp43.000 / Rp150.000) × 100% = 28,67%.',
      ],
      result: 'Laba bersih per pesanan adalah Rp43.000 dengan margin aktual 28,67%.',
    },
    tips: [
      'Program "gratis ongkir" bukan berarti ongkir hilang — pastikan biayanya sudah masuk dalam struktur harga jual.',
      'Hitung berat volumetrik paket untuk barang ringan tapi berukuran besar agar tidak terkena selisih ongkir ekspedisi.',
      'Dorong pembelian lebih dari 1 item per checkout (bundling) agar biaya kemasan dan ongkir terbagi ke nilai transaksi lebih besar.',
    ],
    extraFaqs: [
      {
        question: 'Bagaimana cara menyiasati ongkir mahal untuk produk berharga murah?',
        answer:
          'Jual dalam paket bundling (isi 2 atau 3), tetapkan minimal transaksi untuk subsidi ongkir, atau gunakan gudang fulfillment yang lebih dekat dengan kota pembeli utama.',
      },
      {
        question: 'Apakah biaya retur/paket gagal COD perlu diperhitungkan?',
        answer:
          'Sangat perlu. Jika rata-rata rasio gagal kirim COD 5%, tambahkan cadangan biaya retur ke perhitungan margin pengiriman.',
      },
    ],
    relatedGuideSlug: 'panduan-margin-vs-markup-umkm',
  },

  'late-payment-interest-calculator': {
    formula: 'Denda Keterlambatan = Nominal Invoice × (Tarif Bunga / 100) × (Hari Terlambat / Basis Hari)',
    variables: [
      'Nominal Invoice: nilai pokok tagihan yang belum dibayarkan setelah jatuh tempo.',
      'Tarif Bunga / Denda: persentase denda per bulan atau per tahun sesuai klausul kontrak.',
      'Jumlah Hari Terlambat: selisih hari sejak tanggal jatuh tempo hingga tanggal pelunasan.',
    ],
    example: {
      scenario: 'Invoice Rp25.000.000 terlambat dibayar 15 hari dengan klausul denda 2% per bulan (basis 30 hari).',
      steps: [
        'Hitung proporsi bulan keterlambatan: 15 / 30 = 0,5 bulan.',
        'Hitung denda: Rp25.000.000 × 2% × 0,5 = Rp250.000.',
        'Total tagihan baru: Rp25.000.000 + Rp250.000 = Rp25.250.000.',
      ],
      result: 'Denda keterlambatan Rp250.000 sehingga total pelunasan menjadi Rp25.250.000.',
    },
    tips: [
      'Klausul denda keterlambatan hanya kuat diterapkan jika sudah tertulis dan disepakati kedua pihak di kontrak atau PO awal.',
      'Gunakan pendekatan komunikasi profesional terlebih dahulu sebelum menerbitkan debit note denda keterlambatan.',
      'Berikan masa tenggang singkat (grace period 3–5 hari) untuk menjaga hubungan baik dengan klien jangka panjang.',
    ],
    extraFaqs: [
      {
        question: 'Apakah denda keterlambatan pembayaran wajar diterapkan untuk freelancer?',
        answer:
          'Wajar dan umum dilakukan secara profesional, asalkan besaran persentase dan batas waktunya dicantumkan secara transparan di perjanjian kerja sejak awal.',
      },
      {
        question: 'Berapa tarif denda keterlambatan yang lazim di kontrak B2B?',
        answer:
          'Umumnya berkisar antara 0,1% per hari (maksimal 5% dari nilai kontrak) atau 1%–2% per bulan dari nilai tagihan yang tertunggak.',
      },
    ],
    relatedGuideSlug: 'panduan-ppn-11-persen-dan-invoice-bisnis',
  },

  'subscription-pricing-calculator': {
    formula: 'Harga Langganan = Biaya Layanan per Pengguna / (1 − Target Gross Margin)',
    variables: [
      'Biaya per Pengguna: biaya server, dukungan teknis, payment gateway, dan lisensi per pelanggan aktif.',
      'Target Margin (%): persentase margin kotor yang diinginkan (SaaS umumnya 70%–85%).',
    ],
    example: {
      scenario: 'Aplikasi SaaS membutuhkan biaya infrastruktur & support Rp45.000/user/bulan dengan target Gross Margin 75%.',
      steps: [
        'Hitung pembagi margin: 1 − 0,75 = 0,25.',
        'Bagi biaya per user dengan 0,25: Rp45.000 / 0,25 = Rp180.000/bulan.',
      ],
      result: 'Harga paket langganan minimal Rp180.000/bulan (atau Rp179.000/bulan) untuk mencapai margin 75%.',
    },
    tips: [
      'Berikan diskon 15%–20% untuk pembayaran tahunan di muka guna meningkatkan arus kas dan menurunkan churn.',
      'Sediakan 2–3 tingkatan paket (Basic, Pro, Business) agar pelanggan dengan kebutuhan berbeda bisa memilih sesuai nilai yang diperoleh.',
      'Pantau rasio LTV (Lifetime Value) terhadap CAC (Customer Acquisition Cost); idealnya LTV minimal 3x CAC.',
    ],
    extraFaqs: [
      {
        question: 'Mengapa bisnis SaaS umumnya menargetkan Gross Margin di atas 70%?',
        answer:
          'Karena biaya pengembangan produk (R&D) dan akuisisi pelanggan (sales & marketing) di awal sangat besar, sehingga margin kotor tinggi dibutuhkan agar bisnis bisa menguntungkan saat skala membesar.',
      },
      {
        question: 'Apakah biaya payment gateway harus masuk ke biaya per pelanggan?',
        answer:
          'Ya, biaya transaksi transfer virtual account, QRIS, atau kartu kredit (~1%–3% per transaksi) mengurangi margin bersih setiap penagihan.',
      },
    ],
  },

  'safety-stock-calculator': {
    formula: 'Safety Stock = (Penjualan Harian Maks × Lead Time Maks) − (Penjualan Harian Rata-rata × Lead Time Rata-rata)',
    variables: [
      'Penjualan Harian Maks & Rata-rata: puncak penjualan saat ramai dibanding rata-rata harian normal.',
      'Lead Time Maks & Rata-rata: waktu tunggu pengiriman terlama dibanding rata-rata normal pemasok (dalam hari).',
    ],
    example: {
      scenario: 'Penjualan rata-rata 10 unit/hari (maks 18 unit/hari) dengan lead time rata-rata 4 hari (maks 7 hari).',
      steps: [
        'Kebutuhan saat puncak maksimal: 18 × 7 = 126 unit.',
        'Kebutuhan rata-rata normal: 10 × 4 = 40 unit.',
        'Selisih sebagai stok penyangga: 126 − 40 = 86 unit.',
      ],
      result: 'Safety Stock yang disarankan adalah 86 unit untuk melindungi toko dari kehabisan barang.',
    },
    tips: [
      'Terapkan Safety Stock penuh terutama untuk produk best-seller (20% SKU penyumbang 80% pendapatan).',
      'Untuk produk mudah rusak/kedaluwarsa (makanan/minuman), sesuaikan Safety Stock dengan masa simpan (shelf life).',
      'Evaluasi kinerja pemasok setiap kuartal; semakin konsisten lead time pemasok, semakin hemat modal kerja yang tertahan di Safety Stock.',
    ],
    extraFaqs: [
      {
        question: 'Apa risiko menetapkan Safety Stock terlalu besar?',
        answer:
          'Kas usaha akan mengendap terlalu lama di gudang, biaya penyimpanan meningkat, dan risiko barang rusak atau tidak laku ikut naik.',
      },
      {
        question: 'Bagaimana menghitung Safety Stock untuk produk baru tanpa data historis?',
        answer:
          'Gunakan proyeksi konservatif dari produk sejenis atau tetapkan stok penyangga sementara setara 25%–50% kebutuhan selama satu siklus lead time.',
      },
    ],
    relatedGuideSlug: 'panduan-safety-stock-dan-reorder-point-umkm',
  },

  'invoice-due-date-calculator': {
    formula: 'Jatuh Tempo Invoice = Tanggal Terbit Invoice + Termin Pembayaran (Net 7 / 14 / 30 / 45 / 60)',
    variables: [
      'Tanggal Terbit Invoice: tanggal resmi dokumen tagihan dibuat dan dikirimkan ke klien.',
      'Termin Pembayaran: kesepakatan jangka waktu pelunasan dalam satuan hari kalender.',
    ],
    example: {
      scenario: 'Invoice jasa diterbitkan pada 5 November 2026 dengan syarat pembayaran Net 14.',
      steps: [
        'Tambahkan 14 hari kalender sejak 5 November 2026.',
        'Tanggal jatuh tempo jatuh pada 19 November 2026.',
      ],
      result: 'Cantumkan "Jatuh Tempo: 19 November 2026" secara tegas di bagian atas dokumen invoice.',
    },
    tips: [
      'Selalu tulis tanggal jatuh tempo secara eksplisit (misal 19 November 2026), jangan hanya menulis "Net 14" karena klien bisa salah tafsir.',
      'Untuk klien korporasi dengan jadwal pembayaran khusus (misalnya setiap tanggal 15 atau akhir bulan), sesuaikan jadwal kirim invoice agar tidak tertunda satu siklus penuh.',
      'Jadwalkan pengingat otomatis H-3 dan H+1 jika pembayaran belum masuk.',
    ],
    extraFaqs: [
      {
        question: 'Termin berapa hari yang paling umum dipakai freelancer di Indonesia?',
        answer:
          'Sebagian besar freelancer memakai DP 30%–50% di awal proyek dan pelunasan Net 7 atau Net 14 setelah hasil final disetujui.',
      },
      {
        question: 'Kapan hitungan Net 30 dimulai pada transaksi B2B?',
        answer:
          'Pada banyak perusahaan besar, hitungan Net 30 baru dimulai setelah berkas lengkap (invoice, faktur pajak, surat jalan/BAST) diterima pada proses tukar faktur.',
      },
    ],
    relatedGuideSlug: 'panduan-ppn-11-persen-dan-invoice-bisnis',
  },

  'average-order-value-calculator': {
    formula: 'AOV (Average Order Value) = Total Pendapatan / Total Jumlah Pesanan',
    variables: [
      'Total Pendapatan: akumulasi nilai penjualan pada periode tertentu (belum termasuk ongkir jika ingin lebih murni).',
      'Total Jumlah Pesanan: banyaknya transaksi atau checkout yang berhasil terjadi pada periode tersebut.',
    ],
    example: {
      scenario: 'Toko online membukukan omzet Rp60.000.000 dari 240 transaksi sukses dalam sebulan.',
      steps: [
        'Bagi total pendapatan dengan jumlah transaksi: Rp60.000.000 / 240 = Rp250.000.',
      ],
      result: 'Nilai rata-rata per pesanan (AOV) toko Anda adalah Rp250.000 per transaksi.',
    },
    tips: [
      'Pasang syarat minimal belanja (misalnya gratis ongkir atau hadiah kecil di atas Rp300.000) sedikit di atas AOV saat ini untuk mendongkrak nilai keranjang.',
      'Tawarkan paket bundling atau rekomendasi produk pelengkap (cross-sell) di halaman checkout.',
      'Bandingkan AOV dengan biaya akuisisi pelanggan (CAC) agar iklan tetap menguntungkan sejak transaksi pertama.',
    ],
    extraFaqs: [
      {
        question: 'Mengapa menaikkan AOV sering lebih efisien daripada mencari pelanggan baru?',
        answer:
          'Karena Anda tidak perlu mengeluarkan biaya iklan tambahan; setiap kenaikan nilai keranjang langsung meningkatkan pendapatan dan efisiensi biaya pengiriman.',
      },
      {
        question: 'Apakah transaksi besar satu kali (outlier) bisa membuat AOV bias?',
        answer:
          'Bisa. Jika toko Anda melayani ritel dan grosir sekaligus, pisahkan perhitungan AOV keduanya atau cek juga nilai median pesanan.',
      },
    ],
    relatedGuideSlug: 'panduan-safety-stock-dan-reorder-point-umkm',
  },

  'kalkulator-zakat': {
    formula: 'Zakat = 2,5% × Harta/Penghasilan Wajib Zakat (jika ≥ Nisab 85 gram emas)',
    variables: [
      'Nisab: batas minimum kewajiban zakat setara 85 gram emas sesuai harga emas terkini (pedoman BAZNAS).',
      'Zakat Penghasilan: 2,5% dari penghasilan bulanan/tahunan bila akumulasi setahun mencapai nisab.',
      'Zakat Mal: 2,5% dari total harta simpanan bersih (tabungan, emas, investasi) yang telah mencapai haul 1 tahun.',
    ],
    example: {
      scenario: 'Penghasilan bulanan Rp15.000.000 dengan harga emas Rp1.500.000/gram (nisab tahunan Rp127.500.000 atau Rp10.625.000/bulan).',
      steps: [
        'Cek syarat nisab: Rp15.000.000 ≥ Rp10.625.000/bulan (memenuhi syarat wajib zakat).',
        'Hitung zakat 2,5%: 2,5% × Rp15.000.000 = Rp375.000 per bulan.',
      ],
      result: 'Zakat penghasilan yang ditunaikan sebesar Rp375.000 per bulan (atau Rp4.500.000 per tahun).',
    },
    tips: [
      'Perbarui acuan harga emas per gram setiap kali hendak menghitung nisab karena harga emas berfluktuasi.',
      'Untuk zakat mal, kurangi total harta likuid dengan utang jatuh tempo jangka pendek yang wajib segera dibayar.',
      'Simpan Bukti Setor Zakat (BSZ) dari BAZNAS/LAZ resmi karena dapat menjadi pengurang penghasilan kena pajak di SPT Tahunan.',
    ],
    extraFaqs: [
      {
        question: 'Bagaimana jika penghasilan belum mencapai nisab?',
        answer:
          'Anda belum berkewajiban mengeluarkan zakat penghasilan, namun tetap sangat dianjurkan menunaikan infak atau sedekah sesuai kemampuan.',
      },
      {
        question: 'Apakah THR dan bonus tahunan ikut dihitung dalam zakat penghasilan?',
        answer:
          'Ya, bonus dan THR merupakan bagian dari penghasilan yang diterima, sehingga bila total penghasilan setahun mencapai nisab, 2,5% darinya ikut dizakati.',
      },
    ],
    relatedGuideSlug: 'panduan-zakat-penghasilan-dan-zakat-mal',
  },

  'kalkulator-dana-darurat': {
    formula: 'Target Dana Darurat = Pengeluaran Wajib Bulanan × Kelipatan Profil (3x / 6x / 9x / 12x)',
    variables: [
      'Pengeluaran Wajib Bulanan: total biaya hidup esensial (makan, tempat tinggal, utilitas, cicilan, asuransi).',
      'Kelipatan Profil: 3–6x untuk lajang, 6–9x untuk menikah/berkeluarga, dan 9–12x untuk freelancer atau pengusaha.',
    ],
    example: {
      scenario: 'Keluarga dengan 1 anak memiliki pengeluaran wajib Rp8.000.000/bulan dan memilih target ideal 9 bulan.',
      steps: [
        'Kalikan pengeluaran wajib bulanan dengan 9: Rp8.000.000 × 9 = Rp72.000.000.',
        'Jika dana tersedia baru Rp24.000.000, kekurangannya adalah Rp48.000.000.',
      ],
      result: 'Target dana darurat ideal keluarga ini adalah Rp72.000.000.',
    },
    tips: [
      'Pisahkan rekening dana darurat dari rekening belanja harian agar tidak terpakai untuk kebutuhan non-darurat.',
      'Tempatkan di instrumen yang sangat likuid dan minim risiko fluktuasi seperti tabungan terpisah, deposito cair cepat, atau reksa dana pasar uang.',
      'Tinjau ulang target dana darurat setiap kali ada perubahan besar hidup seperti menikah, punya anak, atau mengambil KPR.',
    ],
    extraFaqs: [
      {
        question: 'Kapan dana darurat boleh digunakan?',
        answer:
          'Hanya untuk kondisi mendesak dan tak terduga seperti kehilangan pekerjaan, biaya pengobatan di luar jaminan asuransi, atau perbaikan mendesak rumah/kendaraan kerja.',
      },
      {
        question: 'Apakah dana darurat dihitung dari gaji atau pengeluaran?',
        answer:
          'Selalu hitung dari pengeluaran wajib bulanan, karena tujuan dana darurat adalah menopang biaya hidup saat penghasilan terhenti sementara.',
      },
    ],
    relatedGuideSlug: 'strategi-dana-darurat-inflasi-dana-pendidikan',
  },

  'kalkulator-inflasi': {
    formula: 'Nilai Masa Depan = Nilai Saat Ini × (1 + Inflasi)^Tahun  |  Daya Beli Riil = Nilai Saat Ini / (1 + Inflasi)^Tahun',
    variables: [
      'Nilai Saat Ini: nominal uang atau harga barang/jasa hari ini.',
      'Tingkat Inflasi Tahunan (%): rata-rata kenaikan harga per tahun (inflasi umum Indonesia berkisar 3%–5%, pendidikan 8%–12%).',
      'Jumlah Tahun: durasi waktu ke depan yang disimulasikan.',
    ],
    example: {
      scenario: 'Biaya hidup Rp10.000.000/bulan saat ini diproyeksikan 10 tahun lagi dengan rata-rata inflasi 4% per tahun.',
      steps: [
        'Hitung faktor inflasi: (1 + 0,04)^10 = 1,4802.',
        'Kalikan dengan nilai saat ini: Rp10.000.000 × 1,4802 = Rp14.802.443.',
      ],
      result: 'Untuk mempertahankan gaya hidup yang sama 10 tahun lagi, Anda akan membutuhkan sekitar Rp14,8 juta/bulan.',
    },
    tips: [
      'Gunakan tingkat inflasi yang berbeda sesuai tujuan: 3%–5% untuk biaya hidup umum, dan 8%–12% untuk biaya pendidikan atau kesehatan.',
      'Menyimpan seluruh dana jangka panjang di tabungan biasa berbunga 0,5%–1% membuat daya beli uang tergerus setiap tahun.',
      'Pastikan target imbal hasil investasi jangka panjang berada di atas tingkat inflasi.',
    ],
    extraFaqs: [
      {
        question: 'Mengapa inflasi pribadi sering terasa lebih tinggi dari data inflasi BPS?',
        answer:
          'Karena keranjang belanja BPS mencerminkan rata-rata nasional seluruh masyarakat, sedangkan pengeluaran rumah tangga perkotaan banyak terserap ke pendidikan, perumahan, dan kesehatan yang kenaikan harganya lebih tinggi.',
      },
      {
        question: 'Bagaimana cara melindungi tabungan dari inflasi?',
        answer:
          'Sesuaikan instrumen dengan horizon waktu: reksa dana pasar uang/SBN untuk jangka menengah, serta diversifikasi aset bertumbuh untuk jangka panjang di atas 5 tahun.',
      },
    ],
    relatedGuideSlug: 'strategi-dana-darurat-inflasi-dana-pendidikan',
  },

  'kalkulator-dana-pendidikan': {
    formula: 'Biaya Kuliah Nanti (FV) = Biaya Saat Ini × (1 + Inflasi Pendidikan)^Tahun',
    variables: [
      'Biaya Pendidikan Saat Ini: total estimasi uang pangkal dan biaya kuliah/sekolah berdasarkan tarif hari ini.',
      'Inflasi Pendidikan (%): asumsi kenaikan biaya sekolah/kuliah per tahun (umumnya 8%–10% di Indonesia).',
      'Jangka Waktu (Tahun): sisa tahun hingga anak masuk jenjang pendidikan target.',
    ],
    example: {
      scenario: 'Biaya kuliah saat ini Rp120.000.000, anak masuk kuliah 12 tahun lagi, asumsi inflasi pendidikan 10% per tahun.',
      steps: [
        'Hitung faktor inflasi 12 tahun: (1,10)^12 = 3,1384.',
        'Hitung estimasi biaya kuliah di masa depan: Rp120.000.000 × 3,1384 ≈ Rp376.611.000.',
      ],
      result: 'Estimasi total biaya kuliah 12 tahun mendatang sekitar Rp376,6 juta sehingga perencanaan investasi bulanan harus mengacu ke angka ini.',
    },
    tips: [
      'Mulai menabung sejak anak baru lahir agar beban investasi bulanan terasa ringan berkat durasi compounding yang panjang.',
      'Jangan lupa memasukkan biaya penunjang seperti kos, buku, laptop, dan transportasi jika anak berencana kuliah di luar kota.',
      'Lakukan riset biaya aktual 2–3 sekolah atau universitas target setiap 2 tahun sekali untuk memperbarui proyeksi.',
    ],
    extraFaqs: [
      {
        question: 'Lebih baik menyiapkan dana pendidikan lewat asuransi pendidikan atau investasi mandiri?',
        answer:
          'Banyak perencana keuangan menyarankan memisahkan proteksi (asuransi jiwa murni bagi pencari nafkah) dengan investasi dana pendidikan (SBN, reksa dana, emas) agar hasilnya lebih transparan dan biayanya lebih rendah.',
      },
      {
        question: 'Apa yang harus dilakukan jika anak sudah dekat usia kuliah (kurang dari 3 tahun)?',
        answer:
          'Pindahkan sebagian besar dana yang sudah terkumpul ke instrumen rendah risiko seperti deposito atau reksa dana pasar uang agar nilainya tidak turun mendadak saat dibutuhkan.',
      },
    ],
    relatedGuideSlug: 'strategi-dana-darurat-inflasi-dana-pendidikan',
  },

  'kalkulator-pelunasan-hutang': {
    formula: 'Sisa Pokok Bulan ke-t = Sisa Pokok Sebelumnya − (Cicilan − Bunga Bulan Berjalan)',
    variables: [
      'Total Saldo Utang: sisa pokok kewajiban yang ingin segera dilunasi.',
      'Suku Bunga (%): tingkat bunga tahunan pinjaman atau kartu kredit.',
      'Pembayaran Bulanan: nominal cicilan rutin plus tambahan pembayaran ekstra yang mampu Anda sisihkan.',
    ],
    example: {
      scenario: 'Utang kartu kredit/pinjaman Rp30.000.000 berbunga 18% per tahun (1,5%/bulan). Bandingkan bayar Rp1.500.000/bulan vs Rp2.500.000/bulan.',
      steps: [
        'Dengan bayar Rp1.500.000/bulan: lunas dalam 24 bulan dengan total bunga ±Rp5,94 juta.',
        'Dengan naikkan cicilan ke Rp2.500.000/bulan: lunas dalam 14 bulan dengan total bunga hanya ±Rp3,37 juta.',
      ],
      result: 'Menambah cicilan Rp1 juta/bulan mempercepat bebas utang 10 bulan lebih awal dan menghemat bunga Rp2,57 juta.',
    },
    tips: [
      'Gunakan metode Avalanche (lunasi utang berbunga tertinggi lebih dulu) untuk penghematan bunga terbesar.',
      'Gunakan metode Snowball (lunasi saldo utang terkecil lebih dulu) jika Anda butuh dorongan motivasi cepat.',
      'Hentikan penambahan utang konsumtif baru dan alokasikan bonus/THR sebagian untuk memangkas pokok utang.',
    ],
    extraFaqs: [
      {
        question: 'Mana yang lebih baik: metode Snowball atau Avalanche?',
        answer:
          'Secara matematis Avalanche selalu lebih hemat bunga, sementara Snowball lebih mudah dipertahankan secara psikologis bagi yang punya banyak tagihan kecil. Pilih yang paling bisa Anda jalankan konsisten.',
      },
      {
        question: 'Apakah melunasi utang lebih cepat lebih baik daripada berinvestasi?',
        answer:
          'Jika bunga utang Anda tinggi (misalnya >12%–20% per tahun seperti kartu kredit atau pinjaman konsumtif), melunasi utang hampir selalu memberikan "return pasti" yang lebih tinggi daripada investasi berisiko rendah.',
      },
    ],
    relatedGuideSlug: 'simulasi-kredit-bunga-anuitas-vs-flat',
  },

  'kalkulator-pph-21': {
    formula: 'PKP = Penghasilan Neto Setahun − PTKP  |  PPh 21 = Tarif Progresif Pasal 17 UU HPP (5% – 35%)',
    variables: [
      'Penghasilan Bruto/Neto: gaji pokok dan tunjangan rutin yang diterima karyawan setiap bulan.',
      'Status PTKP: TK/0 (Rp54 jt), K/0 (Rp58,5 jt), K/1 (Rp63 jt), K/2 (Rp67,5 jt), hingga K/3 (Rp72 jt).',
      'Tarif Progresif UU HPP: 5% (s.d. 60 jt), 15% (60–250 jt), 25% (250–500 jt), 30% (500 jt–5 M), 35% (>5 M).',
    ],
    example: {
      scenario: 'Karyawan status TK/0 berpenghasilan neto Rp10.000.000/bulan (Rp120.000.000/tahun) dan memiliki NPWP.',
      steps: [
        'Kurangkan PTKP TK/0: Rp120.000.000 − Rp54.000.000 = PKP Rp66.000.000.',
        'Lapisan 1 (5% × Rp60.000.000) = Rp3.000.000.',
        'Lapisan 2 (15% × Rp6.000.000) = Rp900.000.',
        'Total PPh 21 setahun = Rp3.900.000 (rata-rata Rp325.000/bulan).',
      ],
      result: 'Estimasi PPh 21 terutang adalah Rp3.900.000/tahun atau Rp325.000/bulan.',
    },
    tips: [
      'Simulasi ini menghitung kewajiban pajak tahunan berdasarkan tarif progresif Pasal 17 UU HPP; potongan bulanan Januari–November oleh HR dapat memakai tabel TER lalu direkonsiliasi di Desember.',
      'Pastikan status tanggungan PTKP Anda sudah dilaporkan ke HR sebelum 1 Januari tahun pajak berjalan.',
      'Simpan bukti potong 1721-A1 dari perusahaan untuk pelaporan SPT Tahunan Pribadi sebelum 31 Maret.',
    ],
    extraFaqs: [
      {
        question: 'Apakah biaya jabatan 5% dan iuran pensiun bisa mengurangi PPh 21?',
        answer:
          'Ya, dalam perhitungan resmi akhir tahun, karyawan tetap berhak atas pengurang biaya jabatan sebesar 5% dari penghasilan bruto (maksimal Rp6.000.000/tahun) serta iuran pensiun/JHT yang dibayar sendiri.',
      },
      {
        question: 'Mengapa kalkulator ini memakai tarif progresif UU HPP?',
        answer:
          'Karena total PPh 21 terutang sebenarnya dalam satu tahun pajak tetap ditentukan oleh tarif progresif Pasal 17 UU HPP, sementara skema TER bulanan hanya metode pemotongan sementara sebelum perhitungan akhir Desember.',
      },
    ],
    relatedGuideSlug: 'panduan-pph-21-dan-ptkp-karyawan',
  },

  'kalkulator-thr': {
    formula: 'Masa Kerja ≥ 12 Bulan = 1 × Upah Sebulan  |  Masa Kerja 1–11 Bulan = (Masa Kerja / 12) × Upah Sebulan',
    variables: [
      'Upah Sebulan: Gaji Pokok + Tunjangan Tetap (tidak termasuk tunjangan tidak tetap seperti uang makan harian/lembur).',
      'Masa Kerja: lamanya bekerja terus-menerus di perusahaan dalam satuan bulan.',
    ],
    example: {
      scenario: 'Karyawan memiliki gaji pokok Rp6.000.000 + tunjangan tetap Rp1.200.000 (total Rp7.200.000) dengan masa kerja 8 bulan.',
      steps: [
        'Karena masa kerja kurang dari 12 bulan, gunakan rumus prorata.',
        'Hitung THR: (8 / 12) × Rp7.200.000 = Rp4.800.000.',
      ],
      result: 'Karyawan berhak menerima THR prorata sebesar Rp4.800.000 (sebelum PPh 21).',
    },
    tips: [
      'Sesuai Permenaker No. 6 Tahun 2016, THR wajib dibayarkan penuh (tidak boleh dicicil) paling lambat H-7 hari raya keagamaan.',
      'Pastikan komponen tunjangan tetap (tunjangan jabatan/keluarga tetap) ikut dimasukkan, bukan hanya gaji pokok saja.',
      'Ingat bahwa pembayaran THR menambah penghasilan bruto pada bulan tersebut sehingga potongan PPh 21 di bulan THR biasanya lebih besar.',
    ],
    extraFaqs: [
      {
        question: 'Apakah karyawan kontrak (PKWT) dan masa percobaan (probation) berhak atas THR?',
        answer:
          'Berhak, sepanjang masa kerja terus-menerus telah mencapai minimal 1 bulan sebelum hari raya keagamaan.',
      },
      {
        question: 'Apakah karyawan yang resign sebelum hari raya tetap mendapat THR?',
        answer:
          'Untuk karyawan tetap (PKWTT) yang hubungan kerjanya berakhir dalam 30 hari sebelum hari raya keagamaan tetap berhak atas THR, namun jika mengundurkan diri atas kemauan sendiri haknya mengikuti ketentuan peraturan ketenagakerjaan yang berlaku.',
      },
    ],
    relatedGuideSlug: 'panduan-pesangon-dan-thr-uu-cipta-kerja',
  },

  'kalkulator-pesangon': {
    formula: 'Total Hak PHK = (Pengali Alasan PHK × Uang Pesangon) + UPMK + Uang Penggantian Hak',
    variables: [
      'Upah Sebulan: Gaji Pokok + Tunjangan Tetap terakhir yang diterima karyawan.',
      'Uang Pesangon (UP): 1 s.d. 9 bulan upah sesuai masa kerja (PP No. 35 Tahun 2021).',
      'UPMK: Uang Penghargaan Masa Kerja sebesar 2 s.d. 10 bulan upah bagi masa kerja minimal 3 tahun.',
    ],
    example: {
      scenario: 'Karyawan tetap bergaji pokok + tunjangan tetap Rp10.000.000 dengan masa kerja 6 tahun mengalami PHK karena efisiensi (1x UP + 1x UPMK).',
      steps: [
        'Masa kerja 6 tahun s.d. < 7 tahun mendapat UP dasar = 7 bulan upah (Rp70.000.000).',
        'Masa kerja 6 tahun s.d. < 9 tahun mendapat UPMK = 3 bulan upah (Rp30.000.000).',
        'Total hak dasar sebelum UPH (sisa cuti) = Rp70.000.000 + Rp30.000.000 = Rp100.000.000.',
      ],
      result: 'Estimasi total kompensasi pesangon + UPMK adalah Rp100.000.000 bruto (sebelum PPh 21 Final pesangon).',
    },
    tips: [
      'Pengali Uang Pesangon sangat bergantung pada alasan PHK menurut PP No. 35 Tahun 2021 (misalnya pensiun 1,75x UP, efisiensi menghindari kerugian 0,5x UP, efisiensi bukan karena kerugian 1x UP).',
      'Jangan lupa menghitung Uang Penggantian Hak (UPH) seperti sisa cuti tahunan yang belum diambil dan belum gugur.',
      'Cek pula ketentuan Perjanjian Kerja Bersama (PKB) atau Peraturan Perusahaan jika memberikan nilai lebih tinggi dari batas minimal undang-undang.',
    ],
    extraFaqs: [
      {
        question: 'Berapa tarif pajak PPh 21 Final atas uang pesangon?',
        answer:
          'Pesangon yang dibayar sekaligus dikenakan tarif final berlapis: 0% s.d. Rp50 juta, 5% untuk Rp50–100 juta, 15% untuk Rp100–500 juta, dan 25% di atas Rp500 juta.',
      },
      {
        question: 'Apakah karyawan kontrak (PKWT) mendapat pesangon saat kontrak habis?',
        answer:
          'Karyawan PKWT tidak mendapat pesangon PHK PKWTT, melainkan berhak atas Uang Kompensasi PKWT sebesar (masa kerja / 12) × 1 bulan upah setiap berakhirnya kontrak sesuai PP 35/2021.',
      },
    ],
    relatedGuideSlug: 'panduan-pesangon-dan-thr-uu-cipta-kerja',
  },
};

export function getToolExtraGuide(slug: string): ToolExtraGuide | undefined {
  return toolGuides[slug];
}
