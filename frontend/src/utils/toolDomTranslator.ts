const ID_TO_EN_MAP: Record<string, string> = {
  'Nama Customer': 'Customer Name',
  'Nomor Invoice': 'Invoice Number',
  'Tambah Item': 'Add Item',
  Ringkasan: 'Summary',
  Hapus: 'Remove',
  'Layanan / Produk 1': 'Service / Product 1',
  'Modal Awal': 'Initial Capital',
  'Bunga per Tahun (%)': 'Annual Interest (%)',
  'Total Bunga': 'Total Interest',
  Bulan: 'Month',
  'Bulan 1': 'Month 1',
  'Bulan 2': 'Month 2',
  'Bulan 3': 'Month 3',
  'Harga Awal': 'Original Price',
  'Diskon (%)': 'Discount (%)',
  'Nominal Diskon': 'Discount Amount',
  'Harga Setelah Diskon': 'Price After Discount',
  'Pembakaran Kas Bulanan': 'Monthly Cash Burn',
  'Biaya Tetap': 'Fixed Cost',
  'Omzet Impas': 'Break-Even Revenue',
  'Tanggal Invoice': 'Invoice Date',
  'Tanggal Jatuh Tempo': 'Due Date',
  'Target Gross Profit': 'Gross Profit Target',
  'Total Biaya': 'Total Cost',
  'Harga per Unit': 'Price per Unit',
  'Unit per Bulan': 'Units per Month',
  'Periode (bulan)': 'Period (months)',
  'Proyeksi Pendapatan': 'Revenue Projection',
  'Biaya Variabel / Unit': 'Variable Cost / Unit',
  'Harga Jual / Unit': 'Selling Price / Unit',
  'Omzet BEP': 'Break-Even Revenue',
  'Biaya Operasional': 'Operating Cost',
  'Biaya Lain': 'Other Cost',
  'Laba Bersih': 'Net Profit',
  'Harga Modal': 'Cost Price',
  'Harga Jual': 'Selling Price',
  'Biaya Investasi': 'Investment Cost',
  'Pajak (%)': 'Tax (%)',
  Pajak: 'Tax',
  'Biaya terhadap Revenue (%)': 'Cost to Revenue (%)',
  'Pokok Pinjaman': 'Loan Principal',
  'Cicilan / Bulan': 'Monthly Installment',
  'Bunga per Bulan': 'Monthly Interest',
  Bunga: 'Interest',
  Pokok: 'Principal',
  Sisa: 'Remaining Balance',
  'Total Pendapatan': 'Total Revenue',
  Pendapatan: 'Revenue',
  'Komisi (%)': 'Commission (%)',
  'Total Komisi': 'Total Commission',
  'Penghasilan Bulanan': 'Monthly Income',
  'Sisa untuk Pinjaman': 'Available for Loan',
  'Kebutuhan Modal Kerja': 'Working Capital Needed',
  'Harga Dasar': 'Base Price',
  'Harga Termasuk Pajak': 'Price Including Tax',
  'Target Tabungan': 'Savings Target',
  'Setoran Bulanan': 'Monthly Deposit',
  'Target Akhir': 'Final Target',
  'Stok Pengaman': 'Safety Stock',
  'Nominal sudah termasuk PPN': 'Amount already includes VAT',
  PPN: 'VAT',
  'Nama item': 'Item name',
  Harga: 'Price',
  Tanggal: 'Date',
  'Zakat Profesi': 'Profession Zakat',
  'Zakat Emas': 'Gold Zakat',
  'Penghasilan Lainnya (Opsional)': 'Other Income (Optional)',
  'Harga Emas Hari Ini (per gram)': 'Current Gold Price (per gram)',
  'Total Berat Emas (gram)': 'Total Gold Weight (grams)',
  'Total Zakat yang Harus Dibayar': 'Total Zakat Payable',
  '* Nominal belum mencapai Nisab (batas minimum wajib zakat).': '* Amount has not reached Nisab (minimum zakat threshold).',
  '* Perhitungan berdasarkan tarif zakat 2.5%.': '* Calculation based on 2.5% zakat rate.',
  'Gaji Bulanan (Net/Bruto)': 'Monthly Salary (Net/Gross)',
  'Pendapatan Lainnya (Bulanan)': 'Other Income (Monthly)',
  'Status Marital (PTKP)': 'Marital Status (PTKP)',
  'TK/0 (Lajang)': 'TK/0 (Single)',
  'K/0 (Menikah, 0 Anak)': 'K/0 (Married, 0 Children)',
  'K/1 (Menikah, 1 Anak)': 'K/1 (Married, 1 Child)',
  'K/2 (Menikah, 2 Anak)': 'K/2 (Married, 2 Children)',
  'K/3 (Menikah, 3 Anak)': 'K/3 (Married, 3 Children)',
  'Memiliki NPWP': 'Have NPWP (Tax ID)',
  'Estimasi PPh 21': 'Estimated Income Tax (PPh 21)',
  'Pajak Per Bulan': 'Tax Per Month',
  'Pajak Per Tahun': 'Tax Per Year',
  'Penghasilan Bruto (Tahunan)': 'Gross Income (Annual)',
  'Penghasilan Kena Pajak (PKP)': 'Taxable Income (PKP)',
  'Contoh: 10000000': 'Example: 10,000,000',
  'Catatan:': 'Note:',
  'Perhitungan ini menggunakan tarif progresif UU HPP terbaru dan PTKP standar. Hasil bisa berbeda tergantung tunjangan lainnya (BPJS, JKK, JKM, dll).': 'This calculation uses the latest UU HPP progressive rates and standard PTKP. Results may vary depending on other benefits (BPJS, JKK, JKM, etc.).',
  'Gaji Bulanan (Gaji Pokok + Tunjangan Tetap)': 'Monthly Salary (Base Salary + Fixed Allowances)',
  'Masa Kerja (Bulan)': 'Tenure (Months)',
  '0 Bulan': '0 Months',
  '24+ Bulan': '24+ Months',
  'Estimasi THR Anda': 'Your Estimated THR',
  'Nominal THR yang diterima:': 'THR amount received:',
  'Status Masa Kerja': 'Tenure Status',
  'Penuh (>= 12 Bulan)': 'Full (>= 12 Months)',
  'Proposional (Prorata)': 'Proportional (Prorated)',
  'Rumus Digunakan': 'Formula Used',
  '1 x Gaji': '1 x Salary',
  'Sesuai Permenaker No. 6 Tahun 2016, pekerja dengan masa kerja minimal 1 bulan berhak mendapatkan THR secara proporsional.': 'In accordance with Permenaker No. 6 of 2016, workers with a minimum tenure of 1 month are entitled to THR proportionally.',
  'Masa Kerja (Tahun)': 'Tenure (Years)',
  'Alasan Berhenti Kerja': 'Reason for Leaving',
  'PHK (Efisiensi/Lainnya)': 'Layoff (Efficiency/Other)',
  Pensiun: 'Retirement',
  'Mengundurkan Diri (Resign)': 'Resignation',
  'Estimasi Pesangon': 'Estimated Severance Pay',
  'Uang Pesangon (UP)': 'Severance Pay (UP)',
  'Uang Penghargaan (UPMK)': 'Service Recognition (UPMK)',
  'Total Estimasi': 'Total Estimation',
  'Perhitungan ini merupakan estimasi dasar berdasarkan PP 35/2021. Hasil akhir bisa berbeda tergantung kebijakan perusahaan, sisa cuti (UPH), dan peraturan perusahaan lainnya.': 'This calculation is a basic estimate based on PP 35/2021. Final results may vary depending on company policy, remaining leave (UPH), and other company regulations.',
  'Pengeluaran Bulanan': 'Monthly Expenses',
  'Status Kehidupan': 'Life Status',
  'Single (Lajang)': 'Single',
  'Menikah (Tanpa Anak)': 'Married (No Children)',
  'Menikah (Dengan Anak)': 'Married (With Children)',
  'Rekomendasi (Bulan)': 'Recommendation (Months)',
  'Bulan Pengeluaran': 'Months of Expenses',
  'Target Dana Darurat': 'Emergency Fund Target',
  'Kenapa jumlahnya berbeda?': 'Why are the amounts different?',
  'Cukup 3-6 bulan pengeluaran karena risiko tanggungan lebih rendah.': '3-6 months of expenses is sufficient because the dependency risk is lower.',
  'Disarankan 6-9 bulan untuk menjaga stabilitas keluarga.': '6-9 months is suggested to maintain family stability.',
  'Minimal 9-12 bulan karena kebutuhan darurat anak biasanya lebih mendesak.': 'Minimum 9-12 months because children\'s emergency needs are usually more urgent.',
  'Nilai Uang Saat Ini': 'Current Value of Money',
  'Inflasi Tahunan (%)': 'Annual Inflation (%)',
  'Jangka Waktu (Tahun)': 'Time Period (Years)',
  'Nilai di Masa Depan': 'Future Value',
  'Kenaikan Biaya Hidup': 'Cost of Living Increase',
  'Tanpa investasi yang mengimbangi inflasi, nilai kekayaan Anda akan terus menurun. Inflasi rata-rata di Indonesia biasanya berkisar antara 3% - 6% per tahun.': 'Without investment that offsets inflation, the value of your wealth will continue to decline. Average inflation in Indonesia usually ranges between 3% - 6% per year.',
  'Biaya Sekolah Saat Ini': 'Current School Cost',
  'Tahun Sampai Mulai (Tahun)': 'Years Until Start (Years)',
  'Inflasi Biaya Sekolah (% / tahun)': 'Education Inflation (% / year)',
  'Target Return Investasi (% / tahun)': 'Investment Return Target (% / year)',
  'Estimasi Biaya Masa Depan': 'Estimated Future Cost',
  'Tabungan Bulanan Diperlukan': 'Monthly Savings Needed',
  'Sisihkan setiap bulan ke instrumen investasi.': 'Set aside every month in an investment instrument.',
  'Informasi:': 'Information:',
  'Inflasi biaya pendidikan di Indonesia biasanya cukup tinggi, rata-rata berkisar antara 10% - 15% per tahun. Pastikan target return investasi Anda realistis (misal: Reksa Dana Saham 10-12%, Obligasi 6-8%).': 'Education inflation in Indonesia is usually quite high, averaging between 10% - 15% per year. Ensure your investment return target is realistic (e.g., Equity Mutual Funds 10-12%, Bonds 6-8%).',
  'Total Sisa Hutang': 'Total Remaining Debt',
  'Peringatan:': 'Warning:',
  'Cicilan bulanan Anda lebih kecil dari bunga berjalan. Hutang Anda tidak akan pernah lunas jika cicilan tidak ditambah.': 'Your monthly installment is smaller than the current interest. Your debt will never be paid off unless the installment is increased.',
  'Waktu Pelunasan': 'Payoff Time',
  'Total Bunga Dibayar': 'Total Interest Paid',
  'Total biaya bunga yang dibayarkan selama periode pelunasan.': 'Total interest cost paid during the payoff period.',
  'Tips:': 'Tips:',
  'Gunakan metode Debt Avalanche (bayar hutang bunga tertinggi dulu) atau Debt Snowball (bayar hutang terkecil dulu) untuk mempercepat proses pelunasan.': 'Use the Debt Avalanche method (pay off highest interest debt first) or Debt Snowball (pay off smallest debt first) to speed up the payoff process.',
  'hari ini setara dengan': 'today is equivalent to',
  'tahun lagi': 'years later',
  'Sekitar': 'About',
  'tahun sampai lunas.': 'years until paid off.',
  'Total biaya yang dibutuhkan pada tahun ke-': 'Total cost required in year ',
  Tahun: 'Year',
  Hari: 'Day',
  Minggu: 'Week',
  Lunas: 'Paid Off',
  'Pilih...': 'Select...',
  'Sesuai': 'As per',
};

const orderedPairs = Object.entries(ID_TO_EN_MAP).sort((a, b) => b[0].length - a[0].length);

const originalTextMap = new WeakMap<Text, string>();
const originalAttrMap = new WeakMap<Element, Map<string, string | null>>();

function translateValue(input: string) {
  let output = input;
  for (const [id, en] of orderedPairs) {
    output = output.split(id).join(en);
  }
  return output;
}

function processTextNode(node: Text, enabled: boolean) {
  if (!originalTextMap.has(node)) {
    originalTextMap.set(node, node.textContent ?? '');
  }
  const source = originalTextMap.get(node) ?? '';
  node.textContent = enabled ? translateValue(source) : source;
}

function processElementAttributes(el: Element, enabled: boolean) {
  const attributes = ['placeholder', 'title', 'aria-label'];
  let original = originalAttrMap.get(el);
  if (!original) {
    original = new Map<string, string | null>();
    originalAttrMap.set(el, original);
  }

  for (const attr of attributes) {
    if (!original.has(attr)) {
      original.set(attr, el.getAttribute(attr));
    }
    const source = original.get(attr);
    if (source == null) {
      el.removeAttribute(attr);
      continue;
    }
    el.setAttribute(attr, enabled ? translateValue(source) : source);
  }
}

function processSubtree(root: Node, enabled: boolean) {
  if (root.nodeType === Node.TEXT_NODE) {
    processTextNode(root as Text, enabled);
    return;
  }

  if (root.nodeType === Node.ELEMENT_NODE) {
    processElementAttributes(root as Element, enabled);
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let current: Node | null = walker.currentNode;
  while (current) {
    if (current.nodeType === Node.TEXT_NODE) {
      processTextNode(current as Text, enabled);
    } else if (current.nodeType === Node.ELEMENT_NODE) {
      processElementAttributes(current as Element, enabled);
    }
    current = walker.nextNode();
  }
}

export function createToolDomTranslator() {
  let observer: MutationObserver | null = null;
  let host: HTMLElement | null = null;
  let enabled = false;

  const apply = (root?: Node) => {
    if (!host) return;
    processSubtree(root ?? host, enabled);
  };

  const disconnect = () => {
    observer?.disconnect();
    observer = null;
  };

  const attach = (nextHost: HTMLElement | null, nextEnabled: boolean) => {
    host = nextHost;
    enabled = nextEnabled;

    disconnect();
    apply();

    if (!host) return;

    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => apply(node));
      }
    });

    observer.observe(host, {
      subtree: true,
      childList: true,
    });
  };

  return {
    attach,
    disconnect,
  };
}
