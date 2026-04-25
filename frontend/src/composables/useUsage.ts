import { apiRequest } from '@/data/api'
import { trackConversionEvent } from '@/utils/tracking'

const FREE_DAILY_LIMIT = 3
const GUEST_USAGE_KEY = 'guest_usage_log_dates'

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

function getGuestUsageDates() {
  try {
    const raw = localStorage.getItem(GUEST_USAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string') : []
  } catch {
    return []
  }
}

function setGuestUsageDates(dates: string[]) {
  localStorage.setItem(GUEST_USAGE_KEY, JSON.stringify(dates))
}

export function useUsage() {
  const checkLimit = async (userId: string | undefined) => {
    if (!userId) {
      const today = getToday()
      const usageToday = getGuestUsageDates().filter((date) => date === today).length
      return usageToday < FREE_DAILY_LIMIT
    }

    try {
      const response = await apiRequest<{ used: number; remaining: number; limit: number }>('/api/usage-summary', {
        auth: true,
      })

      return response.used < response.limit
    } catch (error) {
      console.error('[useUsage.checkLimit]', error)
      return true
    }
  }

  const getUsageSummary = async (userId: string | undefined) => {
    if (!userId) {
      const today = getToday()
      const usageToday = getGuestUsageDates().filter((date) => date === today).length
      return {
        used: usageToday,
        remaining: Math.max(0, FREE_DAILY_LIMIT - usageToday),
        limit: FREE_DAILY_LIMIT,
      }
    }

    try {
      return await apiRequest<{ used: number; remaining: number; limit: number }>('/api/usage-summary', {
        auth: true,
      })
    } catch (error) {
      console.error('[useUsage.getUsageSummary]', error)
      return {
        used: 0,
        remaining: FREE_DAILY_LIMIT,
        limit: FREE_DAILY_LIMIT,
      }
    }
  }

  const logUsage = async (userId: string | undefined, action: string) => {
    if (userId) {
      try {
        await apiRequest('/api/usage-logs', {
          method: 'POST',
          auth: true,
          body: { action },
        })
      } catch (error) {
        console.error('[useUsage.logUsage]', error)
      }
    } else {
      const dates = getGuestUsageDates()
      dates.push(getToday())
      setGuestUsageDates(dates)
    }

    trackConversionEvent(action, {
      category: 'usage',
      is_logged_in: !!userId,
    })
  }

  return { checkLimit, getUsageSummary, logUsage }
}
