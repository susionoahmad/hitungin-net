<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { formatRupiah } from '@/utils/currency'
import { detectLocaleFromPath } from '@/utils/locale'
import { trackConversionEvent } from '@/utils/tracking'
import { useAuth } from '@/composables/useAuth'
import { useUsage } from '@/composables/useUsage'
import { useInvoiceHistory, type InvoiceItem, type SavedInvoice } from '@/composables/useInvoiceHistory'
import UpgradeModal from '@/components/common/UpgradeModal.vue'

const { user, profile, isPro, signOut, openAuthModal, signInWithGoogle } = useAuth()
const { checkLimit, getUsageSummary, logUsage } = useUsage()
const { invoices, isLoading: isHistoryLoading, errorMessage: historyError, loadInvoices, saveInvoice } = useInvoiceHistory()

const route = useRoute()
const router = useRouter()
const locale = computed(() => detectLocaleFromPath(route.path))
const isEn = computed(() => locale.value === 'en')

const showUpgradeModal = ref(false)
const isGenerating = ref(false)
const isSaving = ref(false)
const isSigningOut = ref(false)
const shouldSaveAfterAuth = ref(false)
const currentInvoiceId = ref<string | null>(null)
const logoDataUrl = ref<string | null>(null)
const saveFeedback = ref<string | null>(null)
const usageSummary = ref({ used: 0, remaining: 3, limit: 3 })
const accentPalette = ['#2563eb', '#0f766e', '#7c3aed', '#b45309', '#be123c', '#1f2937']

watch(user, async (nextUser) => {
  if (nextUser && shouldSaveAfterAuth.value) {
    shouldSaveAfterAuth.value = false
    await saveCurrentInvoice()
  }
})

const ui = computed(() => (isEn.value
  ? {
      customerName: 'Customer Name',
      customerPlaceholder: 'Customer name',
      invoiceNumber: 'Invoice Number',
      taxRate: 'VAT (%)',
      addItem: 'Add Item',
      exportPdf: 'Download PDF',
      saveInvoice: 'Save Invoice',
      saveAndUpdate: 'Update Invoice',
      summary: 'Summary',
      subtotal: 'Subtotal',
      tax: 'VAT',
      total: 'Total',
      note: 'Visitors can generate and download three invoices per day. Sign in to save history on the Laravel backend, then upgrade to PRO for unlimited exports and logo branding.',
      itemPlaceholder: 'Item name',
      qtyPlaceholder: 'Qty',
      pricePlaceholder: 'Price',
      remove: 'Remove',
      defaultItemName: 'Service / Product 1',
      pdfTitle: 'Invoice',
      pdfNumber: 'Number',
      pdfCustomer: 'Customer',
      pdfDate: 'Date',
      pdfItem: 'Item',
      pdfPrice: 'Price',
      pdfSubtotal: 'Subtotal',
      pdfTotal: 'Total',
      pdfDueDate: 'Due Date',
      pdfTerms: 'Terms',
      businessTitle: 'Business Details',
      businessName: 'Business Name',
      businessEmail: 'Business Email',
      businessPhone: 'Business Phone',
      businessAddress: 'Business Address',
      dueDate: 'Due Date',
      paymentTerms: 'Payment Terms',
      accentColor: 'Brand Accent',
      dueDatePlaceholder: '2026-05-15',
      paymentTermsPlaceholder: 'Net 14 days',
      businessNamePlaceholder: 'Studio Rapi Nusantara',
      businessEmailPlaceholder: 'billing@brand.com',
      businessPhonePlaceholder: '+62 812 0000 0000',
      businessAddressPlaceholder: 'Jl. Contoh No. 88, Jakarta',
      fileSuffix: 'invoice',
      historyTitle: 'Invoice History',
      historyEmpty: 'No saved invoices yet. Sign in, then save your best invoice templates here.',
      edit: 'Edit',
      reExport: 'Re-export PDF',
      savedAt: 'Saved',
      logoTitle: 'Brand Logo',
      logoHelpFree: 'PRO feature for watermark-free branding on exported PDFs.',
      logoHelpPro: 'Upload a PNG or JPG logo to place it on the PDF header.',
      logoPreview: 'Logo Preview',
      removeLogo: 'Remove Logo',
      login: 'Sign In',
      logout: 'Log Out',
      userGreeting: 'Signed in as',
      freeUsage: 'Free exports left today',
      freeUsageFormat: 'Remaining {remaining} of {limit}',
      loadingHistory: 'Loading invoice history...',
      saving: 'Saving...',
      processing: 'Processing...',
      saveHint: 'Save once, edit later, and re-export when the client changes something at 11 PM.',
      saveFirst: 'Sign in first to save invoice history.',
      saveSuccess: 'Invoice saved.',
      updateSuccess: 'Invoice updated.',
      resetSuccess: 'Draft reset.',
      logoutSuccess: 'Signed out.',
      logoutError: 'Sign out failed.',
      exportError: 'PDF export failed.',
      saveError: 'Invoice could not be saved.',
      loadHistory: 'Select a saved invoice to edit or re-export.',
      historyError: 'Invoice history could not be loaded from the API server.',
      register: 'Create Account',
    }
  : {
      customerName: 'Nama Customer',
      customerPlaceholder: 'Nama customer',
      invoiceNumber: 'Nomor Invoice',
      taxRate: 'PPN (%)',
      addItem: 'Tambah Item',
      exportPdf: 'Download PDF',
      saveInvoice: 'Simpan Invoice',
      saveAndUpdate: 'Update Invoice',
      summary: 'Ringkasan',
      subtotal: 'Subtotal',
      tax: 'PPN',
      total: 'Total',
      note: 'Visitor bisa generate dan download tiga invoice per hari. Login untuk simpan history ke backend Laravel, lalu upgrade ke PRO untuk export tanpa batas dan branding logo.',
      itemPlaceholder: 'Nama item',
      qtyPlaceholder: 'Qty',
      pricePlaceholder: 'Harga',
      remove: 'Hapus',
      defaultItemName: 'Layanan / Produk 1',
      pdfTitle: 'Invoice',
      pdfNumber: 'Nomor',
      pdfCustomer: 'Customer',
      pdfDate: 'Tanggal',
      pdfItem: 'Item',
      pdfPrice: 'Harga',
      pdfSubtotal: 'Subtotal',
      pdfTotal: 'Total',
      pdfDueDate: 'Jatuh Tempo',
      pdfTerms: 'Termin',
      businessTitle: 'Detail Bisnis',
      businessName: 'Nama Bisnis',
      businessEmail: 'Email Bisnis',
      businessPhone: 'Telepon Bisnis',
      businessAddress: 'Alamat Bisnis',
      dueDate: 'Jatuh Tempo',
      paymentTerms: 'Termin Pembayaran',
      accentColor: 'Aksen Brand',
      dueDatePlaceholder: '2026-05-15',
      paymentTermsPlaceholder: 'Net 14 hari',
      businessNamePlaceholder: 'Studio Rapi Nusantara',
      businessEmailPlaceholder: 'billing@brand.com',
      businessPhonePlaceholder: '+62 812 0000 0000',
      businessAddressPlaceholder: 'Jl. Contoh No. 88, Jakarta',
      fileSuffix: 'invoice',
      historyTitle: 'History Invoice',
      historyEmpty: 'Belum ada invoice tersimpan. Login lalu simpan invoice terbaik Anda di sini.',
      edit: 'Edit',
      reExport: 'Export Ulang PDF',
      savedAt: 'Disimpan',
      logoTitle: 'Brand Logo',
      logoHelpFree: 'Fitur PRO untuk branding tanpa watermark di PDF export.',
      logoHelpPro: 'Upload logo PNG atau JPG untuk ditaruh di header PDF.',
      logoPreview: 'Preview Logo',
      removeLogo: 'Hapus Logo',
      login: 'Login',
      logout: 'Logout',
      userGreeting: 'Login sebagai',
      freeUsage: 'Sisa export gratis hari ini',
      freeUsageFormat: 'Tersisa {remaining} dari {limit}',
      loadingHistory: 'Memuat history invoice...',
      saving: 'Menyimpan...',
      processing: 'Memproses...',
      saveHint: 'Simpan sekali, edit lagi nanti, lalu export ulang saat client mendadak revisi jam 11 malam.',
      saveFirst: 'Login dulu untuk simpan history invoice.',
      saveSuccess: 'Invoice berhasil disimpan.',
      updateSuccess: 'Invoice berhasil diupdate.',
      resetSuccess: 'Draft direset.',
      logoutSuccess: 'Berhasil logout.',
      logoutError: 'Logout gagal.',
      exportError: 'Export PDF gagal.',
      saveError: 'Invoice gagal disimpan.',
      loadHistory: 'Pilih invoice tersimpan untuk edit atau export ulang.',
      historyError: 'History invoice gagal dimuat dari server API.',
      register: 'Buat Akun',
    }))

function createInvoiceNumber() {
  return `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`
}

function createDefaultDueDate() {
  const date = new Date()
  date.setDate(date.getDate() + 14)
  return date.toISOString().slice(0, 10)
}

const paymentTermOptions = computed(() => [
  { label: 'COD', days: 0 },
  { label: '7 Hari', days: 7, labelEn: '7 Days' },
  { label: '14 Hari', days: 14, labelEn: '14 Days' },
  { label: '30 Hari', days: 30, labelEn: '30 Days' },
  { label: '60 Hari', days: 60, labelEn: '60 Days' },
])

function applyPaymentTerm(days: number) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  form.dueDate = date.toISOString().slice(0, 10)
  
  if (days === 0) {
    form.paymentTerms = isEn.value ? 'Cash on Delivery' : 'Tunai Saat Diterima (COD)'
  } else {
    form.paymentTerms = isEn.value ? `Net ${days} days` : `Net ${days} hari`
  }
}

const form = reactive({
  invoiceNumber: createInvoiceNumber(),
  customerName: '',
  taxRate: 11,
  businessName: 'ToolKeuangan Studio',
  businessEmail: 'billing@toolkeuangan.com',
  businessPhone: '+62 812 3456 7890',
  businessAddress: 'Jakarta, Indonesia',
  dueDate: createDefaultDueDate(),
  paymentTerms: isEn.value ? 'Net 14 days' : 'Net 14 hari',
  accentColor: accentPalette[0],
  items: [
    { name: ui.value.defaultItemName, qty: 1, price: 150000 },
  ] as InvoiceItem[],
})

const subtotal = computed(() =>
  form.items.reduce((total, item) => total + Math.max(0, item.qty) * Math.max(0, item.price), 0),
)
const taxAmount = computed(() => subtotal.value * (Math.max(0, form.taxRate) / 100))
const total = computed(() => subtotal.value + taxAmount.value)
const activePlan = computed(() => (isPro() ? 'PRO' : 'FREE'))
const usageSummaryLabel = computed(() => ui.value.freeUsageFormat
  .replace('{remaining}', String(usageSummary.value.remaining))
  .replace('{limit}', String(usageSummary.value.limit)))

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '')
  const parsed = normalized.length === 3
    ? normalized.split('').map((char) => char + char).join('')
    : normalized

  const value = Number.parseInt(parsed, 16)

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  }
}

function lightenColor(hex: string, amount: number) {
  const { r, g, b } = hexToRgb(hex)
  const mix = (channel: number) => Math.round(channel + (255 - channel) * amount)
  return { r: mix(r), g: mix(g), b: mix(b) }
}

function getImageFormat(dataUrl: string) {
  if (dataUrl.startsWith('data:image/png')) return 'PNG'
  if (dataUrl.startsWith('data:image/jpeg')) return 'JPEG'
  return 'PNG'
}

function formatPdfCurrency(value: number) {
  return formatRupiah(Math.max(0, value))
}

async function refreshUsage() {
  usageSummary.value = await getUsageSummary(user.value?.id)
}


watch(
  () => user.value?.id,
  async (userId) => {
    currentInvoiceId.value = null
    saveFeedback.value = null
    await Promise.all([refreshUsage(), loadInvoices(userId)])
  },
  { immediate: true },
)

function addItem() {
  form.items.push({ name: ui.value.defaultItemName, qty: 1, price: 0 })
}

function removeItem(index: number) {
  if (form.items.length === 1) return
  form.items.splice(index, 1)
}

function loadInvoiceIntoForm(invoice: SavedInvoice) {
  currentInvoiceId.value = invoice.id
  form.invoiceNumber = invoice.invoiceNumber
  form.customerName = invoice.clientName
  form.taxRate = invoice.taxRate
  form.businessName = invoice.businessName
  form.businessEmail = invoice.businessEmail
  form.businessPhone = invoice.businessPhone
  form.businessAddress = invoice.businessAddress
  form.dueDate = invoice.dueDate
  form.paymentTerms = invoice.paymentTerms
  form.accentColor = invoice.accentColor
  form.items = invoice.items.length > 0
    ? invoice.items.map((item) => ({ ...item }))
    : [{ name: ui.value.defaultItemName, qty: 1, price: 0 }]
  logoDataUrl.value = invoice.logoDataUrl
  saveFeedback.value = ui.value.loadHistory
}

function resetInvoice() {
  currentInvoiceId.value = null
  form.invoiceNumber = createInvoiceNumber()
  form.customerName = ''
  form.taxRate = 11
  form.businessName = 'ToolKeuangan Studio'
  form.businessEmail = 'billing@toolkeuangan.com'
  form.businessPhone = '+62 812 3456 7890'
  form.businessAddress = 'Jakarta, Indonesia'
  form.dueDate = createDefaultDueDate()
  form.paymentTerms = isEn.value ? 'Net 14 days' : 'Net 14 hari'
  form.accentColor = accentPalette[0]
  form.items = [{ name: ui.value.defaultItemName, qty: 1, price: 150000 }]
  logoDataUrl.value = null
  saveFeedback.value = ui.value.resetSuccess
}

function handleReset() {
  resetInvoice()
}



function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Unable to read logo file.'))
    reader.readAsDataURL(file)
  })
}

async function handleLogoChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''

  if (!file) return

  if (!isPro()) {
    showUpgradeModal.value = true
    return
  }

  logoDataUrl.value = await readFileAsDataUrl(file)
  trackConversionEvent('logo_added', { tool: 'invoice-generator' })
}

function removeLogo() {
  logoDataUrl.value = null
}

async function renderPdf(skipLimit = false) {
  // If the invoice is already saved, we allow free re-renders/downloads
  const isExistingInvoice = !!currentInvoiceId.value
  const shouldSkipLimit = skipLimit || isExistingInvoice

  if (!shouldSkipLimit) {
    const canGenerate = await checkLimit(user.value?.id)
    if (!canGenerate && !isPro()) {
      showUpgradeModal.value = true
      trackConversionEvent('hit_limit', { tool: 'invoice-generator' })
      return
    }
  }

  isGenerating.value = true

  try {
    const { default: jsPDF } = await import('jspdf')
    const pdf = new jsPDF()
    const proUser = isPro()
    const hasLogo = proUser && !!logoDataUrl.value
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const left = 16
    const right = pageWidth - 16
    const contentWidth = right - left
    const headerColor = proUser ? hexToRgb(form.accentColor) : { r: 15, g: 23, b: 42 }
    const accentLight = lightenColor(form.accentColor, 0.85)
    const issueDate = new Date().toLocaleDateString(isEn.value ? 'en-US' : 'id-ID')
    const dueDate = form.dueDate ? new Date(form.dueDate).toLocaleDateString(isEn.value ? 'en-US' : 'id-ID') : '-'
    const tableTop = 108
    const tableBottomLimit = pageHeight - 78
    const qtyX = left + 108
    const priceX = left + 132
    const amountX = right - 2

    pdf.setFillColor(headerColor.r, headerColor.g, headerColor.b)
    pdf.roundedRect(left, 12, contentWidth, 36, 4, 4, 'F')

    if (hasLogo && logoDataUrl.value) {
      try {
        const img = new Image()
        img.src = logoDataUrl.value
        await new Promise((resolve) => {
          img.onload = resolve
          img.onerror = resolve
        })

        if (img.complete && img.naturalWidth > 0) {
          const ratio = img.naturalWidth / img.naturalHeight
          const maxW = 40
          const maxH = 20
          let finalW = maxH * ratio
          let finalH = maxH

          if (finalW > maxW) {
            finalW = maxW
            finalH = maxW / ratio
          }

          // Center logo vertically in the header area
          const logoY = 12 + (36 - finalH) / 2
          pdf.addImage(logoDataUrl.value, getImageFormat(logoDataUrl.value), left + 4, logoY, finalW, finalH)
        }
      } catch (error) {
        console.error('[InvoiceGeneratorTool.renderPdf] Logo error:', error)
      }
    }

    pdf.setTextColor(255, 255, 255)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(21)
    pdf.text(ui.value.pdfTitle.toUpperCase(), hasLogo ? left + 28 : left + 4, 26)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(10)
    pdf.text(form.businessName || 'Business', hasLogo ? left + 28 : left + 4, 33)
    pdf.setFontSize(8)
    pdf.text(activePlan.value, hasLogo ? left + 28 : left + 4, 39)

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(11)
    pdf.text(form.invoiceNumber, right - 4, 25, { align: 'right' })
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(9)
    pdf.text(issueDate, right - 4, 32, { align: 'right' })
    pdf.text(form.customerName || '-', right - 4, 38, { align: 'right' })

    pdf.setFillColor(accentLight.r, accentLight.g, accentLight.b)
    pdf.roundedRect(left, 56, contentWidth, 26, 3, 3, 'F')
    pdf.setTextColor(headerColor.r, headerColor.g, headerColor.b)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(8)
    pdf.text(ui.value.businessName.toUpperCase(), left + 4, 63)
    pdf.text(ui.value.pdfCustomer.toUpperCase(), left + 106, 63)
    pdf.text(ui.value.pdfDate.toUpperCase(), left + 4, 75)
    pdf.text(ui.value.pdfDueDate.toUpperCase(), left + 106, 75)

    pdf.setTextColor(15, 23, 42)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(10)
    pdf.text(form.businessName || '-', left + 4, 69)
    pdf.text(form.customerName || '-', left + 106, 69)
    pdf.text(issueDate, left + 4, 80)
    pdf.text(dueDate, left + 106, 80)

    pdf.setTextColor(71, 85, 105)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(9)
    const businessMeta = [form.businessEmail, form.businessPhone, form.businessAddress].filter(Boolean)
    pdf.text(businessMeta.join('  |  ') || '-', left, 94)
    pdf.text(`${ui.value.pdfTerms}: ${form.paymentTerms || '-'}`, left, 100)
    pdf.text(`${ui.value.pdfNumber}: ${form.invoiceNumber}`, right, 100, { align: 'right' })

    pdf.setFillColor(241, 245, 249)
    pdf.roundedRect(left, tableTop, contentWidth, 10, 3, 3, 'F')
    pdf.setTextColor(51, 65, 85)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(9)
    pdf.text(ui.value.pdfItem, left + 4, tableTop + 6.5)
    pdf.text('QTY', qtyX, tableTop + 6.5)
    pdf.text(ui.value.pdfPrice.toUpperCase(), priceX, tableTop + 6.5)
    pdf.text(ui.value.pdfSubtotal.toUpperCase(), amountX, tableTop + 6.5, { align: 'right' })

    let y = tableTop + 17

    form.items.forEach((item, index) => {
      const lineSubtotal = Math.max(0, item.qty) * Math.max(0, item.price)
      const itemLines = pdf.splitTextToSize(item.name || '-', 86)
      const rowHeight = Math.max(10, itemLines.length * 5 + 4)

      if (y + rowHeight > tableBottomLimit) {
        pdf.addPage()
        y = 24
        pdf.setFillColor(241, 245, 249)
        pdf.roundedRect(left, y, contentWidth, 10, 3, 3, 'F')
        pdf.setTextColor(51, 65, 85)
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(9)
        pdf.text(ui.value.pdfItem, left + 4, y + 6.5)
        pdf.text('QTY', qtyX, y + 6.5)
        pdf.text(ui.value.pdfPrice.toUpperCase(), priceX, y + 6.5)
        pdf.text(ui.value.pdfSubtotal.toUpperCase(), amountX, y + 6.5, { align: 'right' })
        y += 17
      }

      if (index % 2 === 0) {
        pdf.setFillColor(248, 250, 252)
        pdf.roundedRect(left, y - 5, contentWidth, rowHeight, 2, 2, 'F')
      }

      pdf.setTextColor(15, 23, 42)
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(10)
      pdf.text(itemLines, left + 4, y)
      pdf.text(String(Math.max(0, item.qty)), qtyX, y)
      pdf.text(formatPdfCurrency(item.price), priceX, y)
      pdf.text(formatPdfCurrency(lineSubtotal), amountX, y, { align: 'right' })
      y += rowHeight
    })

    const summaryY = Math.max(y + 10, pageHeight - 66)
    const summaryX = right - 82

    pdf.setTextColor(71, 85, 105)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(10)
    pdf.text(ui.value.pdfSubtotal, summaryX, summaryY)
    pdf.text(formatPdfCurrency(subtotal.value), right, summaryY, { align: 'right' })
    pdf.text(`${ui.value.tax} (${form.taxRate}%)`, summaryX, summaryY + 8)
    pdf.text(formatPdfCurrency(taxAmount.value), right, summaryY + 8, { align: 'right' })

    pdf.setFillColor(headerColor.r, headerColor.g, headerColor.b)
    pdf.roundedRect(summaryX - 4, summaryY + 14, right - summaryX + 4, 14, 3, 3, 'F')
    pdf.setTextColor(255, 255, 255)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(11)
    pdf.text(ui.value.pdfTotal, summaryX, summaryY + 23)
    pdf.text(formatPdfCurrency(total.value), right - 3, summaryY + 23, { align: 'right' })

    pdf.setTextColor(100, 116, 139)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8)
    pdf.text(form.businessName || 'Business', left, pageHeight - 16)
    pdf.text(form.paymentTerms || '-', left, pageHeight - 11)

    if (!proUser) {
      pdf.setTextColor(148, 163, 184)
      pdf.text('Generated by ToolKeuangan.com Free Version', right, pageHeight - 16, { align: 'right' })
    }

    pdf.save(`${form.invoiceNumber}-${ui.value.fileSuffix}.pdf`)

    trackConversionEvent('invoice_generated', {
      tool: 'invoice-generator',
      plan: profile.value?.plan ?? 'free',
      currency: 'IDR',
      value: total.value,
    })

    if (!shouldSkipLimit) {
      await logUsage(user.value?.id, 'generate_invoice')
      await refreshUsage()
    }
    saveFeedback.value = null
  } catch (error) {
    console.error('[InvoiceGeneratorTool.renderPdf]', error)
    saveFeedback.value = error instanceof Error ? `${ui.value.exportError} ${error.message}` : ui.value.exportError
  } finally {
    isGenerating.value = false
  }
}

async function handleSignOut() {
  isSigningOut.value = true
  try {
    await signOut()
    invoices.value = []
    currentInvoiceId.value = null
  } finally {
    isSigningOut.value = false
  }
}

async function saveCurrentInvoice() {
  saveFeedback.value = null
  const isUpdate = !!currentInvoiceId.value

  if (!user.value?.id) {
    saveFeedback.value = ui.value.saveFirst
    shouldSaveAfterAuth.value = true
    trackConversionEvent('save_invoice_login_prompt', { tool: 'invoice-generator' })
    openAuthModal('login')
    return
  }

  // Enforcement: Only check limit if it's a NEW invoice and NOT a pro user
  if (!isUpdate && !isPro()) {
    const canSave = await checkLimit(user.value.id)
    if (!canSave) {
      showUpgradeModal.value = true
      return
    }
  }

  isSaving.value = true

  try {
    const saved = await saveInvoice(user.value.id, {
      id: currentInvoiceId.value ?? undefined,
      invoiceNumber: form.invoiceNumber,
      clientName: form.customerName,
      taxRate: form.taxRate,
      businessName: form.businessName,
      businessEmail: form.businessEmail,
      businessPhone: form.businessPhone,
      businessAddress: form.businessAddress,
      dueDate: form.dueDate,
      paymentTerms: form.paymentTerms,
      accentColor: form.accentColor,
      items: form.items.map((item) => ({ ...item })),
      subtotal: subtotal.value,
      total: total.value,
      logoDataUrl: logoDataUrl.value,
    })

    if (!saved) {
      saveFeedback.value = historyError.value ? `${ui.value.saveError} ${historyError.value}` : ui.value.saveError
      return
    }

    currentInvoiceId.value = saved.id
    saveFeedback.value = isUpdate ? ui.value.updateSuccess : ui.value.saveSuccess
    
    // Log usage if it was a NEW save
    if (!isUpdate && !isPro()) {
      await logUsage(user.value.id, 'save_invoice')
      await refreshUsage()
    }

    trackConversionEvent('invoice_saved', {
      tool: 'invoice-generator',
      plan: profile.value?.plan ?? 'free',
    })
  } catch (error) {
    console.error('[InvoiceGeneratorTool.saveCurrentInvoice]', error)
    saveFeedback.value = error instanceof Error ? `${ui.value.saveError} ${error.message}` : ui.value.saveError
  } finally {
    isSaving.value = false
  }
}

async function reExportInvoice(invoice: SavedInvoice) {
  loadInvoiceIntoForm(invoice)
  await renderPdf(true)
}
</script>

<template>
  <div class="glass-panel p-5 sm:p-6">
    <div class="mb-6 flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950/60">
      <div class="min-w-0">
        <p class="text-sm text-slate-600 dark:text-slate-300">{{ ui.note }}</p>
        <p class="mt-2 text-sm text-brand-600 dark:text-brand-200">{{ ui.freeUsage }}: {{ usageSummaryLabel }}</p>
        <p v-if="user" class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ ui.userGreeting }} <span class="text-slate-900 dark:text-white">{{ profile?.email || user.email }}</span> • {{ activePlan }}</p>
      </div>

      <div class="flex flex-wrap gap-2">
        <button type="button" class="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:text-slate-100 dark:hover:bg-white/5" @click="handleReset">
          New
        </button>
        <button v-if="!user" type="button" class="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400" @click="openAuthModal('login')">
          {{ ui.login }}
        </button>
        <button v-if="!user" type="button" class="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/5" @click="openAuthModal('register')">
          {{ ui.register }}
        </button>
        <button v-else type="button" class="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/5 disabled:opacity-50" :disabled="isSigningOut" @click="handleSignOut">
          {{ isSigningOut ? ui.processing : ui.logout }}
        </button>
      </div>
    </div>

    <div class="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
      <div class="min-w-0">
        <div class="grid gap-4 md:grid-cols-2">
          <label class="block">
            <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ ui.customerName }}</span>
            <input v-model="form.customerName" type="text" class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:focus:border-brand-400" :placeholder="ui.customerPlaceholder" />
          </label>
          <label class="block">
            <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ ui.invoiceNumber }}</span>
            <input v-model="form.invoiceNumber" type="text" class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:focus:border-brand-400" />
          </label>
        </div>

        <div class="mt-4 grid gap-4 md:grid-cols-2">
          <label class="block">
            <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ ui.businessName }}</span>
            <input v-model="form.businessName" type="text" class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:focus:border-brand-400" :placeholder="ui.businessNamePlaceholder" />
          </label>
          <label class="block">
            <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ ui.businessEmail }}</span>
            <input v-model="form.businessEmail" type="email" class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:focus:border-brand-400" :placeholder="ui.businessEmailPlaceholder" />
          </label>
          <label class="block">
            <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ ui.businessPhone }}</span>
            <input v-model="form.businessPhone" type="text" class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:focus:border-brand-400" :placeholder="ui.businessPhonePlaceholder" />
          </label>
          <label class="block">
            <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ ui.businessAddress }}</span>
            <input v-model="form.businessAddress" type="text" class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:focus:border-brand-400" :placeholder="ui.businessAddressPlaceholder" />
          </label>
        </div>

        <div class="mt-4 grid gap-4 md:grid-cols-3">
          <label class="block">
            <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ ui.taxRate }}</span>
            <div class="relative mt-2">
              <input v-model.number="form.taxRate" type="number" min="0" step="0.1" class="w-full rounded-xl border border-slate-200 bg-white pl-4 pr-10 py-3 text-slate-900 outline-none transition-all dark:border-white/10 dark:bg-slate-900/70 dark:text-white" :style="{ borderColor: form.accentColor + '20' }" />
              <span class="absolute right-4 top-3.5 text-slate-400 font-medium">%</span>
            </div>
          </label>
          <label class="block">
            <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ ui.dueDate }}</span>
            <input v-model="form.dueDate" type="date" class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all dark:border-white/10 dark:bg-slate-900/70 dark:text-white" :style="{ borderColor: form.accentColor + '20' }" />
          </label>
          <label class="block">
            <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ ui.paymentTerms }}</span>
            <input v-model="form.paymentTerms" type="text" class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all dark:border-white/10 dark:bg-slate-900/70 dark:text-white" :placeholder="ui.paymentTermsPlaceholder" :style="{ borderColor: form.accentColor + '20' }" />
            
            <div class="mt-2 flex flex-wrap gap-2">
              <button
                v-for="term in paymentTermOptions"
                :key="term.days"
                type="button"
                class="rounded-lg bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:bg-brand-500/20 hover:text-brand-300"
                @click="applyPaymentTerm(term.days)"
              >
                {{ isEn ? (term.labelEn || term.label) : term.label }}
              </button>
            </div>
          </label>
        </div>

        <div class="mt-4 grid gap-6 md:grid-cols-[1fr_auto]">
          <div class="space-y-4">
            <label class="block">
              <span class="text-sm font-medium text-slate-300">{{ ui.logoTitle }}</span>
              <div class="mt-2 flex items-center gap-4">
                <div v-if="logoDataUrl" class="relative group h-20 w-20 overflow-hidden rounded-xl border border-white/10 bg-slate-900/70 p-2">
                  <img :src="logoDataUrl" class="h-full w-full object-contain" alt="Logo Preview" />
                  <button type="button" class="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100" @click="removeLogo">
                    <span class="text-[10px] font-bold text-white uppercase">{{ ui.removeLogo }}</span>
                  </button>
                </div>
                <div class="flex-1">
                  <input type="file" accept="image/png,image/jpeg" class="block w-full rounded-xl border border-dashed border-white/20 bg-slate-900/70 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-500 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-400 cursor-pointer" @change="handleLogoChange" />
                  <span class="mt-2 block text-xs text-slate-400">{{ isPro() ? ui.logoHelpPro : ui.logoHelpFree }}</span>
                </div>
              </div>
            </label>
          </div>

          <div class="flex flex-col">
            <span class="text-sm font-medium text-slate-300">{{ ui.accentColor }}</span>
            <div class="mt-2 grid grid-cols-3 gap-2">
              <button
                v-for="color in accentPalette"
                :key="color"
                type="button"
                class="h-10 w-10 rounded-lg border-2 transition-all hover:scale-110"
                :class="form.accentColor === color ? 'border-white ring-2 ring-white/20' : 'border-white/10'"
                :style="{ backgroundColor: color }"
                @click="form.accentColor = color"
              />
            </div>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap gap-3">
          <button type="button" class="rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-400" @click="addItem">
            {{ ui.addItem }}
          </button>
          <button type="button" class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-50" :disabled="isGenerating" @click="renderPdf()">
            <span v-if="isGenerating" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
            {{ isGenerating ? ui.processing : ui.exportPdf }}
          </button>
          <button type="button" class="rounded-xl border border-brand-500/30 bg-brand-500/10 px-4 py-3 text-sm font-semibold text-brand-100 hover:bg-brand-500/20 disabled:opacity-50" :disabled="isSaving" @click="saveCurrentInvoice">
            {{ isSaving ? ui.saving : (currentInvoiceId ? ui.saveAndUpdate : ui.saveInvoice) }}
          </button>
        </div>

        <p v-if="saveFeedback" class="mt-3 text-sm text-brand-200">{{ saveFeedback }}</p>

        <div class="mt-6 space-y-4">
          <div v-for="(item, index) in form.items" :key="index" class="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900/60 md:grid-cols-2 xl:grid-cols-[minmax(0,1.4fr)_110px_minmax(0,0.7fr)_auto]">
            <input v-model="item.name" type="text" class="min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none dark:border-white/10 dark:bg-slate-950 dark:text-white" :placeholder="ui.itemPlaceholder" />
            <input v-model.number="item.qty" type="number" min="1" class="min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none dark:border-white/10 dark:bg-slate-950 dark:text-white" :placeholder="ui.qtyPlaceholder" />
            <input v-model.number="item.price" type="number" min="0" class="min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none dark:border-white/10 dark:bg-slate-950 dark:text-white md:col-span-2 xl:col-span-1" :placeholder="ui.pricePlaceholder" />
            <button type="button" class="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-500/20 dark:text-red-200 md:col-span-2 xl:col-span-1" @click="removeItem(index)">
              {{ ui.remove }}
            </button>
          </div>
        </div>
      </div>

      <aside class="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{{ ui.summary }}</p>
        <div class="mt-5 space-y-3 text-sm">
          <div class="flex items-center justify-between gap-4">
            <span class="text-slate-400">{{ ui.subtotal }}</span>
            <span class="font-semibold text-white">{{ formatRupiah(subtotal) }}</span>
          </div>
          <div class="flex items-center justify-between gap-4">
            <span class="text-slate-400">{{ ui.tax }}</span>
            <span class="font-semibold text-white">{{ formatRupiah(taxAmount) }}</span>
          </div>
          <div class="flex items-center justify-between gap-4">
            <span class="text-slate-400">{{ ui.paymentTerms }}</span>
            <span class="font-semibold text-white">{{ form.paymentTerms || '-' }}</span>
          </div>
          <div class="flex items-center justify-between gap-4">
            <span class="text-slate-400">{{ ui.dueDate }}</span>
            <span class="font-semibold text-white">{{ form.dueDate || '-' }}</span>
          </div>
          <div class="flex items-center justify-between gap-4 border-t border-white/10 pt-3 text-base">
            <span class="font-semibold text-white">{{ ui.total }}</span>
            <span class="font-bold text-brand-300">{{ formatRupiah(total) }}</span>
          </div>
        </div>

        <div class="mt-6 rounded-2xl bg-brand-500/10 p-4 text-sm leading-7 text-brand-100">
          {{ ui.saveHint }}
        </div>
      </aside>
    </div>

    <section class="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-5">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{{ ui.historyTitle }}</p>
          <p class="mt-2 text-sm text-slate-300">{{ ui.loadHistory }}</p>
        </div>
        <button v-if="!user" type="button" class="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/5" @click="openAuthModal('login')">
          {{ ui.login }}
        </button>
      </div>

      <p v-if="historyError" class="mt-4 text-sm text-red-300">{{ ui.historyError }} {{ historyError }}</p>
      <p v-else-if="!user && !isHistoryLoading" class="mt-4 text-sm text-slate-300">{{ ui.historyEmpty }}</p>
      <p v-else-if="isHistoryLoading" class="mt-4 text-sm text-slate-300">{{ ui.loadingHistory }}</p>

      <div v-else-if="invoices.length" class="mt-5 grid gap-3">
        <div v-for="invoice in invoices" :key="invoice.id" class="grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div class="min-w-0">
            <p class="truncate text-sm font-semibold text-white">{{ invoice.invoiceNumber }} - {{ invoice.clientName || 'Client' }}</p>
            <p class="mt-1 text-sm text-slate-300">{{ ui.savedAt }}: {{ new Date(invoice.createdAt).toLocaleString(isEn ? 'en-US' : 'id-ID') }}</p>
            <p class="mt-1 text-sm text-brand-200">{{ formatRupiah(invoice.total) }}</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button type="button" class="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-white/5" @click="loadInvoiceIntoForm(invoice)">
              {{ ui.edit }}
            </button>
            <button type="button" class="rounded-xl border border-brand-500/30 bg-brand-500/10 px-3 py-2 text-sm font-semibold text-brand-100 hover:bg-brand-500/20" @click="reExportInvoice(invoice)">
              {{ ui.reExport }}
            </button>
          </div>
        </div>
      </div>
      <p v-else-if="user" class="mt-4 text-sm text-slate-300">{{ ui.historyEmpty }}</p>
    </section>

    <UpgradeModal v-if="showUpgradeModal" @close="showUpgradeModal = false" />
  </div>
</template>


