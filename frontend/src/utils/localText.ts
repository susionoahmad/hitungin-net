import type { Locale } from '@/utils/locale';

type TextMap = Record<Locale, string>;

const texts: Record<string, TextMap> = {
  home: { id: 'Beranda', en: 'Home' },
  allTools: { id: 'Semua Kalkulator', en: 'All Calculators' },
  guides: { id: 'Panduan', en: 'Guides' },
  about: { id: 'Tentang Kami', en: 'About' },
  contact: { id: 'Kontak', en: 'Contact' },
  privacy: { id: 'Kebijakan Privasi', en: 'Privacy Policy' },
  terms: { id: 'Ketentuan Layanan', en: 'Terms of Service' },
  disclaimer: { id: 'Disclaimer', en: 'Disclaimer' },
  glossary: { id: 'Kamus Finansial', en: 'Glossary' },
  sitemap: { id: 'Peta Situs', en: 'Sitemap' },
  landingSeo: { id: 'Panduan Bisnis', en: 'Business Directory' },
  toolsHeading: { id: 'Semua Kalkulator', en: 'All Calculators' },
  relatedTools: { id: 'Kalkulator Terkait', en: 'Related Calculators' },
  quickNav: { id: 'Navigasi Cepat', en: 'Quick Navigation' },
  searchFriendly: { id: 'Akurat & Terstruktur', en: 'Accurate & Structured' },
  login: { id: 'Login', en: 'Login' },
  register: { id: 'Buat Akun', en: 'Register' },
};

export function t(key: keyof typeof texts, locale: Locale) {
  return texts[key][locale];
}
