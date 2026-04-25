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
