import type { Locale } from '@/utils/locale';

type TextMap = Record<Locale, string>;

const texts: Record<string, TextMap> = {
  home: { id: 'Beranda', en: 'Home' },
  allTools: { id: 'Semua Tools', en: 'All Tools' },
  about: { id: 'Tentang', en: 'About' },
  contact: { id: 'Kontak', en: 'Contact' },
  privacy: { id: 'Kebijakan Privasi', en: 'Privacy Policy' },
  terms: { id: 'Ketentuan Layanan', en: 'Terms of Service' },
  disclaimer: { id: 'Disclaimer', en: 'Disclaimer' },
  sitemap: { id: 'Peta Situs', en: 'Sitemap' },
  landingSeo: { id: 'Landing SEO', en: 'SEO Landing' },
  toolsHeading: { id: 'Semua Tools', en: 'All Tools' },
  relatedTools: { id: 'Tools Terkait', en: 'Related Tools' },
  quickNav: { id: 'Navigasi Cepat', en: 'Quick Navigation' },
  searchFriendly: { id: 'Rapi untuk SEO', en: 'SEO Friendly' },
  login: { id: 'Login', en: 'Login' },
  register: { id: 'Buat Akun', en: 'Register' },
};

export function t(key: keyof typeof texts, locale: Locale) {
  return texts[key][locale];
}
