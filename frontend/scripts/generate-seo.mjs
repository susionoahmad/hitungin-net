import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { tools } from '../src/data/tools.ts';

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
  'https://kalkulatorin.com';

const staticRoutes = [
  '/',
  '/kalkulator-bisnis-keuangan-online',
  '/tools',
  '/about',
  '/contact',
  '/sitemap',
  '/privacy-policy',
  '/terms-of-service',
  '/disclaimer',
  '/glossary',
];

const toolRoutes = tools.map((tool) => `/${tool.slug}`);

// Default Indonesian routes (no /id/ prefix)
const idRoutes = [
  ...staticRoutes,
  ...toolRoutes,
];

// English routes (/en prefix)
const enRoutes = [
  ...staticRoutes.map((route) => (route === '/' ? '/en' : `/en${route}`)),
  ...tools.map((tool) => `/en/${tool.slug}`),
];

const allRoutes = [...idRoutes, ...enRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route === '/' ? '' : route}</loc>
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

console.log(`Generated sitemap.xml with ${allRoutes.length} URLs and robots.txt`);

