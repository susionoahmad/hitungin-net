export type Locale = 'id' | 'en';

export const supportedLocales: Locale[] = ['id', 'en'];

export function normalizeLocale(value: unknown): Locale {
  return value === 'en' ? 'en' : 'id';
}

export function detectLocaleFromPath(path: string): Locale {
  const first = path.split('/').filter(Boolean)[0];
  return normalizeLocale(first);
}

export function stripLocalePrefix(path: string) {
  const match = path.match(/^\/(id|en)(?=\/|$)/);
  if (!match) return path;
  const stripped = path.slice(match[0].length);
  return stripped === '' ? '/' : stripped;
}

export function buildLocalePath(path: string, locale: Locale) {
  const base = stripLocalePrefix(path);
  if (base === '/') return `/${locale}`;
  return `/${locale}${base}`;
}

export function switchLocalePath(path: string, locale: Locale) {
  return buildLocalePath(path, locale);
}

export function localeDisplayName(locale: Locale) {
  return locale === 'en' ? 'English' : 'Bahasa Indonesia';
}
