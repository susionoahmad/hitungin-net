import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';

function parseEnv(content) {
  const entries = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const index = trimmed.indexOf('=');
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, '');
    entries[key] = value;
  }
  return entries;
}

async function loadEnvValue(key) {
  const envFiles = ['.env.production', '.env.local', '.env'];
  for (const file of envFiles) {
    try {
      const raw = await readFile(resolve(process.cwd(), file), 'utf8');
      const parsed = parseEnv(raw);
      if (parsed[key]) return parsed[key];
    } catch {
      // ignore missing env files
    }
  }
  return undefined;
}

const baseUrl =
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  (await loadEnvValue('VITE_SITE_URL')) ||
  'https://example.com';
const baseRoutes = [
  '/',
  '/kalkulator-bisnis-keuangan-online',
  '/tools',
  '/about',
  '/contact',
  '/sitemap',
  '/privacy-policy',
  '/terms-of-service',
  '/disclaimer',
  '/invoice-generator',
  '/loan-calculator',
  '/kalkulator-diskon',
  '/kalkulator-margin',
  '/kalkulator-ppn',
  '/break-even-point',
  '/cash-flow-forecast',
  '/percentage-calculator',
  '/price-markup-calculator',
  '/compound-interest-calculator',
  '/roi-calculator',
  '/net-profit-margin-calculator',
  '/salary-take-home-calculator',
  '/savings-goal-calculator',
  '/flat-installment-calculator',
  '/working-capital-calculator',
  '/gross-margin-calculator',
  '/revenue-projection-calculator',
  '/expense-ratio-calculator',
  '/tax-inclusive-price-calculator',
  '/profit-calculator',
  '/loan-affordability-calculator',
  '/payment-due-date-calculator',
  '/unit-cost-calculator',
  '/simple-interest-calculator',
  '/discount-reverse-calculator',
  '/vat-reverse-calculator',
  '/sales-commission-calculator',
  '/break-even-revenue-calculator',
  '/profit-target-calculator',
  '/late-payment-interest-calculator',
  '/subscription-pricing-calculator',
  '/safety-stock-calculator',
  '/invoice-due-date-calculator',
  '/average-order-value-calculator',
];

const locales = ['id', 'en'];
const routes = [
  ...baseRoutes,
  ...locales.flatMap((locale) =>
    baseRoutes.map((route) => {
      if (route === '/') return `/${locale}`;
      return `/${locale}${route}`;
    }),
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`;

const publicDir = resolve(process.cwd(), 'public');
await mkdir(publicDir, { recursive: true });
await writeFile(resolve(publicDir, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(resolve(publicDir, 'robots.txt'), robots, 'utf8');
