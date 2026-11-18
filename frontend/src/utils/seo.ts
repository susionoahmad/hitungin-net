import { onBeforeUnmount, onMounted } from 'vue';
import { siteBrand, siteName, siteUrl } from '@/utils/site';

type SeoOptions = {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  robots?: string;
  lang?: 'id' | 'en';
  alternates?: Array<{ hreflang: string; href: string }>;
  schema?: Record<string, unknown> | Record<string, unknown>[];
};

function setMeta(name: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function setProperty(property: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function removeWrongOgMeta() {
  const ogNames = ['og:title', 'og:description', 'og:image', 'og:site_name', 'og:url', 'og:type', 'og:locale'];
  for (const name of ogNames) {
    document.head.querySelector(`meta[name="${name}"]`)?.remove();
  }
}

function setJsonLd(schema?: Record<string, unknown> | Record<string, unknown>[]) {
  const existing = document.getElementById('page-jsonld');
  if (existing) existing.remove();
  if (!schema) return;
  const script = document.createElement('script');
  script.id = 'page-jsonld';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

export function applySeo(options: SeoOptions) {
  if (typeof document === 'undefined') return;

  const lang = options.lang ?? (window.location.pathname.startsWith('/en') ? 'en' : 'id');
  document.documentElement.lang = lang;

  document.title = options.title;
  removeWrongOgMeta();
  setMeta('description', options.description);
  setMeta('robots', options.robots ?? (lang === 'en' ? 'noindex, follow' : 'index, follow'));

  const ogImage = options.image
    ? new URL(options.image, siteUrl).toString()
    : new URL('/og-image.svg', siteUrl).toString();
  const canonicalUrl = options.canonical || window.location.href;

  setProperty('og:title', options.title);
  setProperty('og:description', options.description);
  setProperty('og:image', ogImage);
  setProperty('og:site_name', siteBrand);
  setProperty('og:url', canonicalUrl);
  setProperty('og:type', options.type ?? 'website');
  setProperty('og:locale', lang === 'en' ? 'en_US' : 'id_ID');

  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', options.title);
  setMeta('twitter:description', options.description);
  setMeta('twitter:image', ogImage);

  if (options.canonical) {
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = options.canonical;
  }

  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((node) => node.remove());
  if (options.alternates && options.alternates.length > 0) {
    for (const alternate of options.alternates) {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = alternate.hreflang;
      link.href = alternate.href;
      document.head.appendChild(link);
    }
  }

  setJsonLd(options.schema);
}

export function useSeo(options: SeoOptions) {
  onMounted(() => {
    applySeo(options);
  });

  onBeforeUnmount(() => {
    const schemaTag = document.getElementById('page-jsonld');
    if (schemaTag) schemaTag.remove();
  });
}

export function createFaqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createWebPageSchema(options: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: options.name,
    description: options.description,
    url: options.url,
    inLanguage: 'id-ID',
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
    },
  };
}

export function createSoftwareAppSchema(options: {
  name: string;
  description: string;
  url: string;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: options.name,
    description: options.description,
    url: options.url,
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: options.category,
    operatingSystem: 'All',
    inLanguage: 'id-ID',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'IDR',
    },
    publisher: {
      '@type': 'Organization',
      name: siteBrand,
      url: siteUrl,
    },
  };
}

export function createArticleSchema(options: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.headline,
    description: options.description,
    url: options.url,
    inLanguage: 'id-ID',
    datePublished: options.datePublished,
    dateModified: options.dateModified,
    author: {
      '@type': 'Organization',
      name: `Tim Editorial ${siteBrand}`,
      url: `${siteUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: siteBrand,
      url: siteUrl,
    },
  };
}
