// Dynamic sitemap generation - bypasses Vercel cache issues
export function generateSitemap() {
  const pages = [
    { url: '/', priority: '1.0', freq: 'daily' },
    { url: '/image-tools', priority: '0.9', freq: 'weekly' },
    { url: '/pdf-tools', priority: '0.9', freq: 'weekly' },
    { url: '/file-tools', priority: '0.8', freq: 'weekly' },
    { url: '/settings', priority: '0.5', freq: 'monthly' },
  ];

  const baseUrl = 'https://axiomtools.best';
  const now = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  pages.forEach(page => {
    xml += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.freq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  xml += `</urlset>`;
  return xml;
}
