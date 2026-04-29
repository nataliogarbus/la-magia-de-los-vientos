import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://lamagiadelosvientos.com.ar';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/consultas`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/preparados`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/tienda`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/reservas`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const productPages: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${base}/tienda/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...productPages];
}
