import { ref } from 'vue'
import { apiRequest, getStoredApiToken, setStoredApiToken } from '@/data/api'

type AuthUser = {
  id: string
  name: string | null
  email: string
}

type AuthProfile = AuthUser & {
  plan: string
  role: string
  created_at: string | null
}

type CredentialPayload = {
  email: string
  password: string
  name?: string | null
}

type ForgotPasswordResponse = {
  message: string
  reset_token?: string | null
  reset_url?: string | null
}

const user = ref<AuthUser | null>(null)
const profile = ref<AuthProfile | null>(null)
const isInitialized = ref(false)
let initializePromise: Promise<void> | null = null

// Global Auth Modal State
const showAuthModal = ref(false)
const authModalMode = ref<'login' | 'register' | 'forgot' | 'reset'>('login')
const authInitialEmail = ref('')
const authInitialResetToken = ref('')

function clearAuthState() {
  user.value = null
  profile.value = null
  setStoredApiToken(null)
}

function applyProfile(nextProfile: AuthProfile | null) {
  profile.value = nextProfile
  user.value = nextProfile
    ? {
        id: nextProfile.id,
        name: nextProfile.name,
        email: nextProfile.email,
      }
    : null
}

async function fetchProfile() {
  const response = await apiRequest<{ user: AuthProfile }>('/api/me', {
    auth: true,
  })

  applyProfile(response.user)
}

async function initializeAuth() {
  if (!getStoredApiToken()) {
    isInitialized.value = true
    applyProfile(null)
    return
  }

  try {
    await fetchProfile()
  } catch (error) {
    console.error('[useAuth.initializeAuth]', error)
    clearAuthState()
  } finally {
    isInitialized.value = true
  }
}

async function ensureInitialized() {
  if (isInitialized.value) return

  if (!initializePromise) {
    initializePromise = initializeAuth().finally(() => {
      initializePromise = null
    })
  }

  await initializePromise
}

async function hydrateFromToken(token: string) {
  setStoredApiToken(token)

  try {
    await fetchProfile()
    isInitialized.value = true
    return profile.value
  } catch (error) {
    clearAuthState()
    throw error
  }
}

async function authenticate(mode: 'login' | 'register', payload: CredentialPayload) {
  const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
  const response = await apiRequest<{ token: string; user: AuthProfile }>(endpoint, {
    method: 'POST',
    body: {
      ...(payload.name ? { name: payload.name } : {}),
      email: payload.email,
      password: payload.password,
    },
  })

  setStoredApiToken(response.token)
  applyProfile(response.user)
  isInitialized.value = true

  return response.user
}

export function useAuth() {
  void ensureInitialized()

  const signInWithCredentials = async (payload: CredentialPayload) => authenticate('login', payload)
  const registerWithCredentials = async (payload: CredentialPayload) => authenticate('register', payload)

  const requestPasswordReset = async (email: string) => apiRequest<ForgotPasswordResponse>('/api/auth/forgot-password', {
    method: 'POST',
    body: { email },
  })

  const resetPassword = async (payload: { email: string; token: string; password: string }) => apiRequest<{ message: string }>('/api/auth/reset-password', {
    method: 'POST',
    body: payload,
  })

  const signOut = async () => {
    try {
      if (getStoredApiToken()) {
        await apiRequest('/api/auth/logout', {
          method: 'POST',
          auth: true,
        })
      }
    } finally {
      clearAuthState()
      isInitialized.value = true
    }
  }

  const isPro = () => profile.value?.plan === 'pro'
  const isAdmin = () => profile.value?.role === 'admin'
  
  const signInWithGoogle = () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, '')
    const nextPath = window.location.pathname + window.location.search
    window.location.href = `${apiBaseUrl}/auth/google/redirect?next=${encodeURIComponent(nextPath)}`
  }

  const openAuthModal = (mode: 'login' | 'register' | 'forgot' | 'reset' = 'login') => {
    authModalMode.value = mode
    showAuthModal.value = true
  }

  const closeAuthModal = () => {
    showAuthModal.value = false
  }

  return {
    user,
    profile,
    isInitialized,
    showAuthModal,
    authModalMode,
    authInitialEmail,
    authInitialResetToken,
    openAuthModal,
    closeAuthModal,
    signInWithCredentials,
    registerWithCredentials,
    requestPasswordReset,
    resetPassword,
    hydrateFromToken,
    signOut,
    isPro,
    isAdmin,
    signInWithGoogle,
  }
}
