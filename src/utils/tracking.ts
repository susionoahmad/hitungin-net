import type { Router } from 'vue-router';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim();
const GSC_VERIFICATION_TOKEN = import.meta.env.VITE_GSC_VERIFICATION_TOKEN?.trim();
const IS_DEV = import.meta.env.DEV;

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

function setGoogleSiteVerificationToken(token: string) {
  let tag = document.head.querySelector<HTMLMetaElement>('meta[name="google-site-verification"]');
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = 'google-site-verification';
    document.head.appendChild(tag);
  }
  tag.content = token;
}

export async function initGoogleTracking(router: Router) {
  if (GSC_VERIFICATION_TOKEN) {
    setGoogleSiteVerificationToken(GSC_VERIFICATION_TOKEN);
  }

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
