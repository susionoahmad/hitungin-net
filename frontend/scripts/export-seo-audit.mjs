import { mkdirSync, writeFileSync } from 'node:fs';
import { EN_SEO_BLUEPRINTS, tools } from '../src/data/tools.ts';
import { resolveToolPresentation } from '../src/data/tools.ts';

const rows = [];

for (const tool of tools) {
  const en = resolveToolPresentation(tool, 'en');
  const intent = EN_SEO_BLUEPRINTS[tool.slug]?.intent ?? 'n/a';
  const title = en.seoTitle ?? '';
  const description = en.seoDescription ?? '';
  const titleLength = title.length;
  const descriptionLength = description.length;

  rows.push({
    slug: tool.slug,
    intent,
    path_en: `/en/${tool.slug}`,
    seoTitle_en: title,
    seoTitle_length: titleLength,
    seoTitle_status: titleLength <= 70 ? 'OK' : 'TOO_LONG',
    seoDescription_en: description,
    seoDescription_length: descriptionLength,
    seoDescription_status:
      descriptionLength >= 140 && descriptionLength <= 160 ? 'OK' : descriptionLength < 140 ? 'TOO_SHORT' : 'TOO_LONG',
  });
}

rows.sort((a, b) => a.slug.localeCompare(b.slug));

const headers = [
  'slug',
  'intent',
  'path_en',
  'seoTitle_en',
  'seoTitle_length',
  'seoTitle_status',
  'seoDescription_en',
  'seoDescription_length',
  'seoDescription_status',
];

function csvEscape(value) {
  const text = String(value ?? '');
  if (text.includes('"') || text.includes(',') || text.includes('\n')) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

const csv = [headers.join(',')]
  .concat(rows.map((row) => headers.map((header) => csvEscape(row[header])).join(',')))
  .join('\n');

mkdirSync('reports', { recursive: true });
writeFileSync('reports/seo-audit-en.csv', csv, 'utf8');

const tooLongTitles = rows.filter((row) => row.seoTitle_status !== 'OK').length;
const badDescriptions = rows.filter((row) => row.seoDescription_status !== 'OK').length;

console.log(`Generated reports/seo-audit-en.csv (${rows.length} rows)`);
console.log(`Title issues: ${tooLongTitles}`);
console.log(`Description issues: ${badDescriptions}`);
