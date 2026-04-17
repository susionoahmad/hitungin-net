import type { Router } from 'vue-router';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim();
const IS_DEV = import.meta.env.DEV;
type GaEventParams = Record<string, string | number | boolean | undefined | null>;

function isValidGa4MeasurementId(value: string | undefined): value is string {
  if (!value) return false;
  if (value === 'G-XXXXXXXXXX') return false;
  return /^G-[A-Z0-9]+$/i.test(value);
}

function initGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };

  window.gtag('js', new Date());
}

function trackPageView(measurementId: string, path: string) {
  if (!window.gtag) return;

  window.gtag('event', 'page_view', {
    send_to: measurementId,
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
    debug_mode: IS_DEV || undefined,
  });
}

function cleanParams(params: GaEventParams) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== null));
}

export function trackGaEvent(eventName: string, params: GaEventParams = {}) {
  if (!isValidGa4MeasurementId(GA_MEASUREMENT_ID) || !window.gtag) return;

  window.gtag('event', eventName, {
    send_to: GA_MEASUREMENT_ID,
    debug_mode: IS_DEV || undefined,
    ...cleanParams(params),
  });
}

export function trackClickEvent(params: {
  click_text: string;
  click_target?: string;
  click_location: string;
  language?: string;
}) {
  trackGaEvent('site_click', {
    event_category: 'engagement',
    ...params,
  });
}

export function trackConversionEvent(eventName: string, params: GaEventParams = {}) {
  trackGaEvent(eventName, {
    event_category: 'conversion',
    conversion: true,
    ...params,
  });
}

export async function initGoogleTracking(router: Router) {
  if (!isValidGa4MeasurementId(GA_MEASUREMENT_ID)) {
    if (IS_DEV) {
      console.info('[GA4] Tracking disabled. Set VITE_GA4_MEASUREMENT_ID to a valid value (example: G-ABC123DEF4).');
    }
    return;
  }

  initGtag();

  router.afterEach((to) => {
    // Delay 1 tick so document.title and URL are finalized after SPA navigation.
    setTimeout(() => {
      trackPageView(GA_MEASUREMENT_ID, to.fullPath);
    }, 0);
  });

  trackPageView(GA_MEASUREMENT_ID, router.currentRoute.value.fullPath);
}
