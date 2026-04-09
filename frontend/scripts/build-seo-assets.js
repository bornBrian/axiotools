const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const guidesDir = path.join(publicDir, 'guides');
const siteBase = 'https://axiomtools.best';

const baseRoutes = [
  '/',
  '/image-tools',
  '/pdf-tools',
  '/file-tools',
  '/settings',
  '/guides/',
];

const today = new Date().toISOString().slice(0, 10);

const toPublicUrl = (value) => `${siteBase}${value}`;

const ensureTrailingSlash = (urlPath) => (urlPath.endsWith('/') ? urlPath : `${urlPath}/`);

const collectGuideRoutes = () => {
  if (!fs.existsSync(guidesDir)) return [];

  return fs
    .readdirSync(guidesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const indexFile = path.join(guidesDir, entry.name, 'index.html');
      if (!fs.existsSync(indexFile)) return null;
      return ensureTrailingSlash(`/guides/${entry.name}`);
    })
    .filter(Boolean)
    .sort();
};

const writeSitemapXml = (routes) => {
  const rows = routes
    .map((route) => {
      const priority = route === '/' ? '1.0' : route === '/guides/' ? '0.9' : '0.8';
      const changefreq = route === '/' ? 'daily' : route === '/guides/' ? 'daily' : 'weekly';
      return `  <url>\n    <loc>${toPublicUrl(route)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`;
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
};

const writeSitemapTxt = (routes) => {
  const lines = routes.map((route) => toPublicUrl(route));
  fs.writeFileSync(path.join(publicDir, 'sitemap.txt'), `${lines.join('\n')}\n`, 'utf8');
};

const run = () => {
  const guideRoutes = collectGuideRoutes();
  const allRoutes = [...new Set([...baseRoutes, ...guideRoutes])];

  writeSitemapXml(allRoutes);
  writeSitemapTxt(allRoutes);

  console.log(`SEO assets generated: ${guideRoutes.length} guide routes indexed.`);
};

run();
