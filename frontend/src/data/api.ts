const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL

if (!rawApiBaseUrl) {
  throw new Error('Missing VITE_API_BASE_URL')
}

const API_TOKEN_KEY = 'toolkeuangan_api_token'

export function getApiBaseUrl() {
  return rawApiBaseUrl.replace(/\/+$/, '')
}

export function getStoredApiToken() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(API_TOKEN_KEY)
}

export function setStoredApiToken(token: string | null) {
  if (typeof window === 'undefined') return

  if (!token) {
    window.localStorage.removeItem(API_TOKEN_KEY)
    return
  }

  window.localStorage.setItem(API_TOKEN_KEY, token)
}

type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  auth?: boolean
  body?: any
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { auth = false, headers, body, ...rest } = options
  const token = auth ? getStoredApiToken() : null

  const isJson = body && typeof body === 'object' && !(body instanceof FormData)
  const finalBody = isJson ? JSON.stringify(body) : body

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...rest,
    headers: {
      Accept: 'application/json',
      ...(isJson ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: finalBody,
  })

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json')
    ? await response.json() as Record<string, unknown>
    : null

  if (!response.ok) {
    const validationErrors = payload?.errors
    const firstValidationMessage = validationErrors && typeof validationErrors === 'object'
      ? Object.values(validationErrors)
          .flatMap((value) => Array.isArray(value) ? value : [])
          .find((value): value is string => typeof value === 'string')
      : null

    const message = firstValidationMessage
      ?? (typeof payload?.message === 'string' ? payload.message : null)
      ?? 'Request to API failed.'

    throw new Error(message)
  }

  return payload as T
}
