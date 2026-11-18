import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { tools } from '../src/data/tools.ts';
import { guides } from '../src/data/guides.ts';

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

const baseUrl = (
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  (await loadEnvValue('VITE_SITE_URL')) ||
  'https://kalkulatorin.com'
).replace(/\/+$/, '');

const today = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { path: '/', lastmod: today, priority: '1.0' },
  { path: '/tools', lastmod: today, priority: '0.9' },
  { path: '/panduan', lastmod: today, priority: '0.9' },
  { path: '/glossary', lastmod: today, priority: '0.8' },
  { path: '/kalkulator-bisnis-keuangan-online', lastmod: today, priority: '0.8' },
  { path: '/about', lastmod: today, priority: '0.6' },
  { path: '/contact', lastmod: today, priority: '0.5' },
  { path: '/privacy-policy', lastmod: today, priority: '0.4' },
  { path: '/terms-of-service', lastmod: today, priority: '0.4' },
  { path: '/disclaimer', lastmod: today, priority: '0.4' },
  { path: '/sitemap', lastmod: today, priority: '0.5' },
];

const guideRoutes = guides.map((guide) => ({
  path: `/panduan/${guide.slug}`,
  lastmod: guide.updatedAt || today,
  priority: '0.85',
}));

const toolRoutes = tools.map((tool) => ({
  path: `/${tool.slug}`,
  lastmod: today,
  priority: '0.8',
}));

const allRoutes = [...staticRoutes, ...guideRoutes, ...toolRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (entry) => `  <url>
    <loc>${baseUrl}${entry.path === '/' ? '' : entry.path}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /auth/
Disallow: /check-email
Disallow: /reset-password

Sitemap: ${baseUrl}/sitemap.xml
`;

const publicDir = resolve(process.cwd(), 'public');
await mkdir(publicDir, { recursive: true });
await writeFile(resolve(publicDir, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(resolve(publicDir, 'robots.txt'), robots, 'utf8');

console.log(`Generated sitemap.xml with ${allRoutes.length} canonical URLs and robots.txt`);
