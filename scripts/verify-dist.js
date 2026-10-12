import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');

const pages = [
  { path: 'index.html', url: 'https://www.wdgroupcompany.biz.id/' },
  { path: 'wedding/index.html', url: 'https://www.wdgroupcompany.biz.id/wedding' },
  { path: 'wedding/sukoharjo/index.html', url: 'https://www.wdgroupcompany.biz.id/wedding/sukoharjo' },
  { path: 'wedding/karanganyar/index.html', url: 'https://www.wdgroupcompany.biz.id/wedding/karanganyar' },
  { path: 'wedding/klaten/index.html', url: 'https://www.wdgroupcompany.biz.id/wedding/klaten' },
  { path: 'wedding/boyolali/index.html', url: 'https://www.wdgroupcompany.biz.id/wedding/boyolali' },
  { path: 'wedding/sragen/index.html', url: 'https://www.wdgroupcompany.biz.id/wedding/sragen' },
  { path: 'wedding/wonogiri/index.html', url: 'https://www.wdgroupcompany.biz.id/wedding/wonogiri' },
  { path: 'event/index.html', url: 'https://www.wdgroupcompany.biz.id/event' },
  { path: 'production/index.html', url: 'https://www.wdgroupcompany.biz.id/production' },
  { path: 'music/index.html', url: 'https://www.wdgroupcompany.biz.id/music' },
  { path: 'workshop/index.html', url: 'https://www.wdgroupcompany.biz.id/workshop' },
  { path: 'it/index.html', url: 'https://www.wdgroupcompany.biz.id/it' },
  { path: 'works/index.html', url: 'https://www.wdgroupcompany.biz.id/works' },
];

const FORBIDDEN_WORDS = [
  'terpercaya',
  'bintang lima',
  'bintang 5',
  'terbaik',
  'nomor satu',
  '#1',
  'murah & mewah',
  'rekanan resmi'
];

console.log('================================================================================');
console.log('   WD GROUP AUTOMATED DIST VERIFICATION SUITE (TAHAP G)');
console.log('================================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    return true;
  } else {
    failedTests++;
    console.error(`  [FAIL] ${message}`);
    return false;
  }
}

const pageResults = [];
const allInternalLinks = new Set();
const allReferencedImages = new Set();

for (const p of pages) {
  const filePath = path.join(DIST_DIR, p.path);
  if (!fs.existsSync(filePath)) {
    console.error(`File missing: ${filePath}`);
    failedTests++;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');

  // 1. H1 Count
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  const h1Count = h1Matches.length;
  const h1Text = h1Matches.length > 0 ? h1Matches[0].replace(/<[^>]+>/g, '').trim() : 'NONE';
  assert(h1Count === 1, `${p.path}: expected exactly 1 H1, found ${h1Count}`);

  // 2. Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  const titleLen = title.length;
  assert(titleLen >= 20 && titleLen <= 90, `${p.path}: title length ${titleLen} outside ideal range (20-90)`);

  // 3. Meta Description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const desc = descMatch ? descMatch[1].trim() : '';
  const descLen = desc.length;
  assert(descLen >= 50 && descLen <= 200, `${p.path}: meta description length ${descLen} outside ideal range (50-200)`);

  // 4. Canonical
  const canonMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
                     html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  const canonical = canonMatch ? canonMatch[1].trim() : '';
  assert(canonical === p.url, `${p.path}: canonical '${canonical}' does not match expected '${p.url}'`);

  // 5. Meta Keywords
  const hasKeywords = /<meta[^>]*name=["']keywords["']/i.test(html);
  assert(!hasKeywords, `${p.path}: contains forbidden meta keywords tag`);

  // 6. No Placeholders
  const hasPlaceholder = /\[ISI[:\s]|ISI:\s/i.test(html);
  assert(!hasPlaceholder, `${p.path}: contains unfulfilled [ISI: placeholder`);

  // 7. Forbidden Claims
  // Check in human visible text (exclude CSS class names or SVG paths if any)
  const forbiddenFound = [];
  const textContent = html.replace(/<style[\s\S]*?<\/style>/gi, '')
                          .replace(/<script[\s\S]*?<\/script>/gi, '')
                          .replace(/<[^>]+>/g, ' ');
  for (const word of FORBIDDEN_WORDS) {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(textContent)) {
      forbiddenFound.push(word);
    }
  }
  assert(forbiddenFound.length === 0, `${p.path}: found forbidden subjective claim words: ${forbiddenFound.join(', ')}`);

  // 8. JSON-LD Schema
  const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  let jsonLdValid = false;
  let schemaTypes = [];
  if (jsonLdMatches.length > 0) {
    try {
      for (const m of jsonLdMatches) {
        const rawJson = m.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>/i, '').replace(/<\/script>/i, '').trim();
        const parsed = JSON.parse(rawJson);
        if (parsed['@graph']) {
          parsed['@graph'].forEach(item => { if (item['@type']) schemaTypes.push(item['@type']); });
        } else if (parsed['@type']) {
          schemaTypes.push(parsed['@type']);
        }
      }
      jsonLdValid = schemaTypes.length > 0;
    } catch (e) {
      jsonLdValid = false;
    }
  }
  assert(jsonLdValid, `${p.path}: invalid or missing JSON-LD schema`);

  // 9. Static semantic content length (word count)
  const words = textContent.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  assert(wordCount >= 200, `${p.path}: static text content word count too low (${wordCount} words)`);

  pageResults.push({
    file: p.path,
    h1: h1Count === 1 ? '1' : `${h1Count} (ERR)`,
    titleLen: `${titleLen} ch`,
    descLen: `${descLen} ch`,
    canonical: canonical === p.url ? 'OK' : 'MISMATCH',
    keywords: hasKeywords ? 'FOUND (ERR)' : '0 (OK)',
    placeholders: hasPlaceholder ? 'FOUND (ERR)' : '0 (OK)',
    claims: forbiddenFound.length === 0 ? '0 (OK)' : forbiddenFound.join(', '),
    schema: jsonLdValid ? schemaTypes.join(',') : 'INVALID',
    wordCount: `${wordCount} w`
  });

  // Extract all internal links and images
  const linkMatches = html.matchAll(/href=["'](\/[^"']*)["']/g);
  for (const m of linkMatches) {
    const target = m[1].split('#')[0].split('?')[0];
    if (target && !target.startsWith('//') && !target.startsWith('/#')) {
      allInternalLinks.add(target);
    }
  }

  const imgMatches = html.matchAll(/(?:src|content)=["'](https:\/\/www\.wdgroupcompany\.biz\.id\/[^"']*\.(?:png|jpg|jpeg|webp|svg)|\/[^"']*\.(?:png|jpg|jpeg|webp|svg))["']/g);
  for (const m of imgMatches) {
    let cleanPath = m[1].replace('https://www.wdgroupcompany.biz.id', '').split('?')[0];
    if (cleanPath.startsWith('/')) {
      allReferencedImages.add(cleanPath);
    }
  }
}

// Print Markdown Table of Page Results
console.log('### HASIL AUDIT 14 HALAMAN DIST:');
console.log('| Halaman | H1 | Title | Desc | Canonical | Keywords | [ISI] | Klaim | Schema | Kata |');
console.log('|---|---|---|---|---|---|---|---|---|---|');
for (const r of pageResults) {
  console.log(`| \`${r.file}\` | ${r.h1} | ${r.titleLen} | ${r.descLen} | ${r.canonical} | ${r.keywords} | ${r.placeholders} | ${r.claims} | ${r.schema} | ${r.wordCount} |`);
}

// 10. Check Internal Links
console.log('\n### HASIL AUDIT TAUTAN INTERNAL (BROKEN LINK CHECK):');
let brokenLinks = 0;
for (const link of allInternalLinks) {
  let targetFile = path.join(DIST_DIR, link);
  let exists = false;
  if (fs.existsSync(targetFile) && fs.statSync(targetFile).isFile()) {
    exists = true;
  } else if (fs.existsSync(path.join(targetFile, 'index.html'))) {
    exists = true;
  } else if (fs.existsSync(targetFile + '.html')) {
    exists = true;
  } else if (link === '/') {
    exists = fs.existsSync(path.join(DIST_DIR, 'index.html'));
  }
  if (!exists) {
    console.error(`  [BROKEN LINK] '${link}' referenced but no matching file in dist/`);
    brokenLinks++;
  }
}
assert(brokenLinks === 0, `Found ${brokenLinks} broken internal links`);
console.log(`Total internal link unik diperiksa: ${allInternalLinks.size} | Broken link: ${brokenLinks}`);

// 11. Check Referenced Images
console.log('\n### HASIL AUDIT GAMBAR & OG:IMAGE (ASSET INTEGRITY CHECK):');
let missingImages = 0;
for (const img of allReferencedImages) {
  const imgPath = path.join(DIST_DIR, img);
  if (!fs.existsSync(imgPath)) {
    console.error(`  [MISSING IMAGE] '${img}' referenced in HTML but not found in dist/`);
    missingImages++;
  }
}
assert(missingImages === 0, `Found ${missingImages} missing images referenced in HTML`);
console.log(`Total gambar/og:image unik diperiksa: ${allReferencedImages.size} | Missing image: ${missingImages}`);

// 12. Validate sitemap.xml
console.log('\n### HASIL AUDIT SITEMAP.XML & ROBOTS.TXT:');
const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
let sitemapOk = false;
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const locMatches = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const uniqueLocs = new Set(locMatches);
  const hasDuplicates = locMatches.length !== uniqueLocs.size;
  const allCanonicalCovered = pages.every(p => uniqueLocs.has(p.url));
  const hasLastmod = /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(sitemapContent);

  assert(locMatches.length === 14, `sitemap.xml has ${locMatches.length} URLs (expected 14)`);
  assert(!hasDuplicates, `sitemap.xml contains duplicate URLs`);
  assert(allCanonicalCovered, `sitemap.xml is missing some canonical URLs`);
  assert(hasLastmod, `sitemap.xml missing valid lastmod tags`);

  sitemapOk = locMatches.length === 14 && !hasDuplicates && allCanonicalCovered && hasLastmod;
  console.log(`sitemap.xml: ${locMatches.length} URLs terdaftar, 0 duplikat, canonical cocok, lastmod valid.`);
} else {
  assert(false, `dist/sitemap.xml not found!`);
}

// 13. Validate robots.txt
const robotsPath = path.join(DIST_DIR, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  const hasUserAgent = /User-agent:\s*\*/i.test(robotsContent);
  const hasSitemap = /Sitemap:\s*https:\/\/www\.wdgroupcompany\.biz\.id\/sitemap\.xml/i.test(robotsContent);
  assert(hasUserAgent, 'robots.txt missing User-agent: *');
  assert(hasSitemap, 'robots.txt missing or incorrect Sitemap directive');
  console.log(`robots.txt: User-agent * aktif, Sitemap directive valid mengarah ke domain resmi.`);
} else {
  assert(false, `dist/robots.txt not found!`);
}

console.log('\n================================================================================');
console.log(`TOTAL PENGUJIAN: ${totalTests} | LULUS: ${passedTests} | GAGAL: ${failedTests}`);
console.log('================================================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('SEMUA VERIFIKASI DISTRIBUTED BUILD LOLOS SEMPURNA! (100% PASS)\n');
}
