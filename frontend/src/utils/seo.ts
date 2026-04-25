import { onBeforeUnmount, onMounted } from 'vue';
import { siteName, siteUrl } from '@/utils/site';

type SeoOptions = {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
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
  document.title = options.title;
  setMeta('description', options.description);
  setMeta('og:title', options.title);
  setMeta('og:description', options.description);
  const ogImage = options.image ? new URL(options.image, siteUrl).toString() : new URL('/og-image.svg', siteUrl).toString();
  setMeta('og:image', ogImage);
  setMeta('og:site_name', siteName);
  setMeta('og:url', options.canonical || window.location.href);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', options.title);
  setMeta('twitter:description', options.description);
  setMeta('twitter:image', ogImage);
  setProperty('og:type', 'website');
  if (options.canonical) {
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = options.canonical;
  }
  document
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((node) => node.remove());
  if (options.alternates) {
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
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
    },
  };
}
