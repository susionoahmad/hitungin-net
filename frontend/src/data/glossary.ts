export type GlossaryTerm = {
  slug: string;
  term: { id: string; en: string };
  definition: { id: string; en: string };
  category: 'pajak' | 'investasi' | 'bisnis' | 'kredit' | 'personal';
  categoryLabel: { id: string; en: string };
  relatedToolSlug?: string;
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: 'pph-21',
    term: { id: 'PPh 21 (Pajak Penghasilan Pasal 21)', en: 'PPh 21 (Income Tax Article 21)' },
    definition: {
      id: 'Pajak atas penghasilan berupa gaji, upah, honorarium, tunjangan, dan pembayaran lain dengan nama dan dalam bentuk apa pun sehubungan dengan pekerjaan atau jabatan, jasa, dan kegiatan yang dilakukan oleh orang pribadi subjek pajak dalam negeri.',
      en: 'Income tax levied on salaries, wages, honorariums, allowances, and other payments of any form in connection with work, position, services, or activities performed by domestic individual taxpayers in Indonesia.'
    },
    category: 'pajak',
    categoryLabel: { id: 'Pajak', en: 'Tax' },
    relatedToolSlug: 'kalkulator-pph-21'
  },
  {
    slug: 'ppn',
    term: { id: 'PPN (Pajak Pertambahan Nilai)', en: 'PPN (Value Added Tax)' },
    definition: {
      id: 'Pajak yang dikenakan atas setiap pertambahan nilai dari barang atau jasa dalam peredarannya dari produsen ke konsumen. Di Indonesia, tarif standar PPN saat ini adalah 11% sesuai dengan UU Harmonisasi Peraturan Perpajakan (UU HPP).',
      en: 'Tax levied on the value added to goods or services at each stage of production and distribution. In Indonesia, the current standard VAT rate is 11% in accordance with the Tax Harmonization Law (UU HPP).'
    },
    category: 'pajak',
    categoryLabel: { id: 'Pajak', en: 'Tax' },
    relatedToolSlug: 'kalkulator-ppn'
  },
  {
    slug: 'ptkp',
    term: { id: 'PTKP (Penghasilan Tidak Kena Pajak)', en: 'PTKP (Non-Taxable Income)' },
    definition: {
      id: 'Jumlah pendapatan bersih wajib pajak orang pribadi yang dibebaskan dari pengenaan PPh Pasal 21. Batas PTKP ditentukan oleh pemerintah berdasarkan status perkawinan dan jumlah tanggungan keluarga.',
      en: 'The amount of net income of an individual taxpayer that is exempt from Income Tax Article 21. The limit is determined by the government based on marital status and the number of dependents.'
    },
    category: 'pajak',
    categoryLabel: { id: 'Pajak', en: 'Tax' },
    relatedToolSlug: 'kalkulator-pph-21'
  },
  {
    slug: 'invoice',
    term: { id: 'Invoice (Faktur)', en: 'Invoice' },
    definition: {
      id: 'Dokumen tertulis yang dikirimkan oleh penjual kepada pembeli yang berisi rincian barang atau jasa yang telah disediakan, lengkap dengan jumlah nominal tagihan, metode, dan batas waktu pembayaran.',
      en: 'A commercial document issued by a seller to a buyer, indicating the products, quantities, and agreed-upon prices for products or services the seller had provided, including payment terms.'
    },
    category: 'bisnis',
    categoryLabel: { id: 'Bisnis', en: 'Business' },
    relatedToolSlug: 'invoice-generator'
  },
  {
    slug: 'amortisasi',
    term: { id: 'Amortisasi', en: 'Amortization' },
    definition: {
      id: 'Prosedur akuntansi yang digunakan untuk secara bertahap mengurangi nilai biaya perolehan aset tidak berwujud atau melunasi pinjaman melalui serangkaian pembayaran pokok dan bunga secara berkala.',
      en: 'The accounting process of gradually writing down the cost of an intangible asset or paying off a loan over time through regular payments of principal and interest.'
    },
    category: 'kredit',
    categoryLabel: { id: 'Kredit & Pinjaman', en: 'Credit & Loans' },
    relatedToolSlug: 'loan-calculator'
  },
  {
    slug: 'bunga-majemuk',
    term: { id: 'Bunga Majemuk', en: 'Compound Interest' },
    definition: {
      id: 'Bunga yang dihitung berdasarkan akumulasi pokok awal dan akumulasi bunga dari periode sebelumnya. Sering disebut sebagai "bunga berbunga", bunga majemuk mempercepat pertumbuhan investasi seiring berjalannya waktu.',
      en: 'Interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods on a deposit or loan. It accelerates the growth of investment over time.'
    },
    category: 'investasi',
    categoryLabel: { id: 'Investasi', en: 'Investment' },
    relatedToolSlug: 'compound-interest-calculator'
  },
  {
    slug: 'bunga-tunggal',
    term: { id: 'Bunga Tunggal', en: 'Simple Interest' },
    definition: {
      id: 'Metode perhitungan bunga yang hanya didasarkan pada jumlah dana pokok awal investasi atau pinjaman. Nilai bunga konisten di setiap periode dan tidak memperhitungkan akumulasi bunga dari periode sebelumnya.',
      en: 'A quick and easy method of calculating the interest charge on a loan or deposit, determined solely by multiplying the interest rate by the principal amount. It does not compound over periods.'
    },
    category: 'investasi',
    categoryLabel: { id: 'Investasi', en: 'Investment' },
    relatedToolSlug: 'simple-interest-calculator'
  },
  {
    slug: 'roi',
    term: { id: 'ROI (Return on Investment)', en: 'ROI (Return on Investment)' },
    definition: {
      id: 'Rasio finansial yang digunakan untuk mengukur efisiensi atau profitabilitas dari suatu investasi. Dihitung dengan membagi laba bersih yang diperoleh dengan total biaya modal yang diinvestasikan.',
      en: 'A financial metric used to evaluate the efficiency or profitability of an investment or compare the efficiency of several different investments, calculated as net profit divided by total cost.'
    },
    category: 'investasi',
    categoryLabel: { id: 'Investasi', en: 'Investment' },
    relatedToolSlug: 'roi-calculator'
  },
  {
    slug: 'bep',
    term: { id: 'BEP (Break Even Point)', en: 'BEP (Break Even Point)' },
    definition: {
      id: 'Titik di mana total pendapatan usaha sama dengan total biaya yang dikeluarkan untuk operasional (biaya tetap + biaya variabel), sehingga bisnis tidak mengalami kerugian maupun memperoleh keuntungan.',
      en: 'The production level or sales volume at which total revenues equal total expenses (fixed + variable costs), meaning the business makes neither a profit nor a loss.'
    },
    category: 'bisnis',
    categoryLabel: { id: 'Bisnis', en: 'Business' },
    relatedToolSlug: 'break-even-point'
  },
  {
    slug: 'working-capital',
    term: { id: 'Working Capital (Modal Kerja)', en: 'Working Capital' },
    definition: {
      id: 'Selisih antara aset lancar perusahaan (seperti kas, piutang, persediaan) dengan kewajiban lancar (utang jangka pendek). Modal kerja mencerminkan likuiditas operasional yang tersedia untuk menjalankan aktivitas bisnis sehari-hari.',
      en: "The difference between a company's current assets (like cash, accounts receivable, inventory) and its current liabilities (like short-term debt). It represents the operational liquidity available to run daily activities."
    },
    category: 'bisnis',
    categoryLabel: { id: 'Bisnis', en: 'Business' },
    relatedToolSlug: 'working-capital-calculator'
  },
  {
    slug: 'safety-stock',
    term: { id: 'Safety Stock (Stok Pengaman)', en: 'Safety Stock' },
    definition: {
      id: 'Persediaan tambahan yang sengaja disimpan dalam gudang untuk meminimalkan risiko terjadinya kehabisan stok (stockout) akibat fluktuasi permintaan pasar atau keterlambatan pengiriman dari supplier.',
      en: 'An extra level of inventory maintained in a warehouse to mitigate the risk of stockouts caused by fluctuations in market demand or supplier delivery delays.'
    },
    category: 'bisnis',
    categoryLabel: { id: 'Bisnis', en: 'Business' },
    relatedToolSlug: 'safety-stock-calculator'
  },
  {
    slug: 'gross-margin',
    term: { id: 'Gross Margin (Margin Kotor)', en: 'Gross Margin' },
    definition: {
      id: 'Rasio keuangan yang menunjukkan persentase pendapatan penjualan yang tersisa setelah dikurangi Harga Pokok Penjualan (HPP). Metrik ini mengukur tingkat efisiensi produksi inti dari suatu produk.',
      en: 'A financial ratio that shows the percentage of sales revenue remaining after subtracting the Cost of Goods Sold (COGS). It measures the core production efficiency of a product.'
    },
    category: 'bisnis',
    categoryLabel: { id: 'Bisnis', en: 'Business' },
    relatedToolSlug: 'gross-margin-calculator'
  },
  {
    slug: 'net-profit-margin',
    term: { id: 'Net Profit Margin (Margin Laba Bersih)', en: 'Net Profit Margin' },
    definition: {
      id: 'Rasio profitabilitas yang menunjukkan persentase laba bersih yang diperoleh dari total pendapatan setelah dikurangi semua beban operasional, bunga, pajak, dan biaya lainnya.',
      en: 'A profitability ratio showing the percentage of net profit earned from total revenue after subtracting all operating expenses, interest, taxes, and other financial costs.'
    },
    category: 'bisnis',
    categoryLabel: { id: 'Bisnis', en: 'Business' },
    relatedToolSlug: 'net-profit-margin-calculator'
  },
  {
    slug: 'markup',
    term: { id: 'Markup (Kenaikan Harga)', en: 'Markup' },
    definition: {
      id: 'Persentase atau nominal penambahan nilai yang diterapkan di atas harga modal suatu produk untuk menentukan harga jualnya di pasar agar mencakup biaya operasional dan target keuntungan.',
      en: 'The percentage or flat amount added to the cost price of goods to cover overheads and profit, determining its final selling price in the market.'
    },
    category: 'bisnis',
    categoryLabel: { id: 'Bisnis', en: 'Business' },
    relatedToolSlug: 'price-markup-calculator'
  },
  {
    slug: 'take-home-pay',
    term: { id: 'Take Home Pay (Gaji Bersih)', en: 'Take Home Pay' },
    definition: {
      id: 'Jumlah pendapatan bersih yang benar-benar dibawa pulang oleh karyawan setelah gaji kotor dikurangi potongan wajib seperti pajak penghasilan (PPh 21), BPJS Kesehatan, BPJS Ketenagakerjaan, dan potongan internal lainnya.',
      en: 'The net income an employee actually receives after all mandatory deductions (such as PPh 21 income tax, BPJS health insurance, and retirement plans) are subtracted from their gross salary.'
    },
    category: 'personal',
    categoryLabel: { id: 'Keuangan Pribadi', en: 'Personal Finance' },
    relatedToolSlug: 'salary-take-home-calculator'
  },
  {
    slug: 'thr',
    term: { id: 'THR (Tunjangan Hari Raya)', en: 'THR (Holiday Allowance)' },
    definition: {
      id: 'Pendapatan non-upah keagamaan yang wajib dibayarkan oleh pengusaha kepada pekerja menjelang Hari Raya Keagamaan di Indonesia, dengan besaran disesuaikan dengan masa kerja karyawan bersangkutan.',
      en: 'A mandatory religious holiday bonus that employers in Indonesia must pay to their employees prior to major religious festivals, with the amount based on the employee\'s tenure.'
    },
    category: 'personal',
    categoryLabel: { id: 'Keuangan Pribadi', en: 'Personal Finance' },
    relatedToolSlug: 'kalkulator-thr'
  },
  {
    slug: 'pesangon',
    term: { id: 'Pesangon', en: 'Severance Pay' },
    definition: {
      id: 'Kompensasi finansial berupa uang pesangon, uang penghargaan masa kerja, dan uang penggantian hak yang wajib dibayarkan pengusaha kepada pekerja akibat pemutusan hubungan kerja (PHK) sesuai hukum ketenagakerjaan.',
      en: 'Financial compensation paid by an employer to an employee upon termination of employment (layoff), calculated based on years of service and salary components according to labor laws.'
    },
    category: 'personal',
    categoryLabel: { id: 'Keuangan Pribadi', en: 'Personal Finance' },
    relatedToolSlug: 'kalkulator-pesangon'
  },
  {
    slug: 'zakat',
    term: { id: 'Zakat', en: 'Zakat' },
    definition: {
      id: 'Bagian tertentu dari harta (seperti zakat maal atau zakat penghasilan) yang wajib dikeluarkan oleh setiap Muslim untuk diserahkan kepada golongan yang berhak menerima setelah mencapai batas minimum (nisab) dan jangka waktu (haul) tertentu.',
      en: 'A form of alms-giving treated in Islam as a religious obligation, paid on wealth and income once it meets the minimum threshold (nisab) and has been held for a specific period (haul).'
    },
    category: 'personal',
    categoryLabel: { id: 'Keuangan Pribadi', en: 'Personal Finance' },
    relatedToolSlug: 'kalkulator-zakat'
  },
  {
    slug: 'inflasi',
    term: { id: 'Inflasi', en: 'Inflation' },
    definition: {
      id: 'Proses meningkatnya harga-harga barang dan jasa secara umum dan terus menerus dalam jangka waktu tertentu, yang mengakibatkan penurunan nilai mata uang dan daya beli masyarakat.',
      en: 'The rate at which the general level of prices for goods and services is rising, and, subsequently, the purchasing power of currency is falling over a period of time.'
    },
    category: 'investasi',
    categoryLabel: { id: 'Investasi', en: 'Investment' },
    relatedToolSlug: 'kalkulator-inflasi'
  },
  {
    slug: 'dana-darurat',
    term: { id: 'Dana Darurat', en: 'Emergency Fund' },
    definition: {
      id: 'Simpanan likuid yang dialokasikan khusus untuk mengantisipasi kejadian mendadak yang tidak terduga, seperti pemutusan hubungan kerja, tagihan medis darurat, atau kerusakan aset utama.',
      en: 'A liquid savings reserve set aside to cover unexpected financial crises, such as job loss, sudden medical bills, or major household repairs, shielding personal finances from debt.'
    },
    category: 'personal',
    categoryLabel: { id: 'Keuangan Pribadi', en: 'Personal Finance' },
    relatedToolSlug: 'kalkulator-dana-darurat'
  }
];
