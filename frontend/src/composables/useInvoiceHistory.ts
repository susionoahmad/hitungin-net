import { ref } from 'vue'
import { apiRequest } from '@/data/api'

export type InvoiceItem = {
  name: string
  qty: number
  price: number
}

export type InvoicePayload = {
  id?: string
  invoiceNumber: string
  clientName: string
  taxRate: number
  businessName: string
  businessEmail: string
  businessPhone: string
  businessAddress: string
  dueDate: string
  paymentTerms: string
  accentColor: string
  items: InvoiceItem[]
  subtotal: number
  total: number
  logoDataUrl: string | null
}

export type SavedInvoice = {
  id: string
  invoiceNumber: string
  clientName: string
  taxRate: number
  businessName: string
  businessEmail: string
  businessPhone: string
  businessAddress: string
  dueDate: string
  paymentTerms: string
  accentColor: string
  items: InvoiceItem[]
  subtotal: number
  total: number
  logoDataUrl: string | null
  createdAt: string
}

type InvoiceRow = {
  id: string
  client_name: string | null
  invoice_number: string | null
  tax_rate: number | null
  business_name: string | null
  business_email: string | null
  business_phone: string | null
  business_address: string | null
  due_date: string | null
  payment_terms: string | null
  accent_color: string | null
  subtotal: number | null
  total: number | null
  logo_data_url: string | null
  items: unknown
  created_at: string
}

function normalizeItems(value: unknown) {
  if (!Array.isArray(value)) return []

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null

      const candidate = item as Record<string, unknown>

      return {
        name: typeof candidate.name === 'string' ? candidate.name : '',
        qty: typeof candidate.qty === 'number' ? candidate.qty : Number(candidate.qty) || 0,
        price: typeof candidate.price === 'number' ? candidate.price : Number(candidate.price) || 0,
      }
    })
    .filter((item): item is InvoiceItem => item !== null)
}

function mapInvoiceRow(row: InvoiceRow): SavedInvoice {
  return {
    id: row.id,
    invoiceNumber: row.invoice_number ?? 'INV',
    clientName: row.client_name ?? '',
    taxRate: row.tax_rate ?? 11,
    businessName: row.business_name ?? '',
    businessEmail: row.business_email ?? '',
    businessPhone: row.business_phone ?? '',
    businessAddress: row.business_address ?? '',
    dueDate: row.due_date ?? '',
    paymentTerms: row.payment_terms ?? '',
    accentColor: row.accent_color ?? '#2563eb',
    items: normalizeItems(row.items),
    subtotal: row.subtotal ?? 0,
    total: row.total ?? 0,
    logoDataUrl: row.logo_data_url,
    createdAt: row.created_at,
  }
}

export function useInvoiceHistory() {
  const invoices = ref<SavedInvoice[]>([])
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)

  const loadInvoices = async (userId: string | undefined) => {
    invoices.value = []
    errorMessage.value = null

    if (!userId) return

    isLoading.value = true

    try {
      const response = await apiRequest<{ data: InvoiceRow[] }>('/api/invoices', {
        auth: true,
      })

      invoices.value = (response.data ?? []).map(mapInvoiceRow)
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Gagal memuat invoice.'
    } finally {
      isLoading.value = false
    }
  }

  const saveInvoice = async (userId: string, payload: InvoicePayload) => {
    errorMessage.value = null

    const row = {
      client_name: payload.clientName,
      invoice_number: payload.invoiceNumber,
      tax_rate: payload.taxRate,
      business_name: payload.businessName,
      business_email: payload.businessEmail,
      business_phone: payload.businessPhone,
      business_address: payload.businessAddress,
      due_date: payload.dueDate || null,
      payment_terms: payload.paymentTerms,
      accent_color: payload.accentColor,
      subtotal: payload.subtotal,
      total: payload.total,
      logo_data_url: payload.logoDataUrl,
      items: payload.items,
    }

    try {
      const response = await apiRequest<{ data: InvoiceRow }>(
        payload.id ? `/api/invoices/${payload.id}` : '/api/invoices',
        {
          method: payload.id ? 'PUT' : 'POST',
          auth: true,
          body: row,
        },
      )

      const mapped = mapInvoiceRow(response.data)
      const next = invoices.value.filter((invoice) => invoice.id !== mapped.id)
      invoices.value = [mapped, ...next].slice(0, 12)

      return mapped
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Gagal menyimpan invoice.'
      return null
    }
  }

  return {
    invoices,
    isLoading,
    errorMessage,
    loadInvoices,
    saveInvoice,
  }
}
