import type { Router } from 'vue-router';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim();
const GSC_VERIFICATION_TOKEN = import.meta.env.VITE_GSC_VERIFICATION_TOKEN?.trim();

function injectGoogleTagScript(measurementId: string) {
  const scriptId = 'ga4-gtag-script';
  if (document.getElementById(scriptId)) return;

  const script = document.createElement('script');
  script.id = scriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

function initGtag(measurementId: string) {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });
}

function trackPageView(path: string) {
  if (!window.gtag || !GA_MEASUREMENT_ID) return;
  window.gtag('event', 'page_view', {
    page_location: window.location.href,
    page_path: path,
    page_title: document.title,
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

export function initGoogleTracking(router: Router) {
  if (GSC_VERIFICATION_TOKEN) {
    setGoogleSiteVerificationToken(GSC_VERIFICATION_TOKEN);
  }

  if (!GA_MEASUREMENT_ID) return;

  injectGoogleTagScript(GA_MEASUREMENT_ID);
  initGtag(GA_MEASUREMENT_ID);

  router.afterEach((to) => {
    trackPageView(to.fullPath);
  });

  trackPageView(router.currentRoute.value.fullPath);
}
