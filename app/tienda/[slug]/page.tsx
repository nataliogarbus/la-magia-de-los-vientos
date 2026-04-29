import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/products';
import ProductDetailClient from '@/components/ProductDetailClient';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.title} — Preparado de Flores de Bach`,
    description: `${product.shortDesc} Esencias: ${product.ingredients.join(', ')}. ${product.usage}`,
    alternates: { canonical: `https://lamagiadelosvientos.com.ar/tienda/${product.slug}` },
    openGraph: {
      title: `${product.title} | La Magia de los Vientos`,
      description: product.shortDesc,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.fullDesc,
    "image": `https://lamagiadelosvientos.com.ar${product.image}`,
    "brand": { "@type": "Brand", "name": "La Magia de los Vientos" },
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "url": `https://lamagiadelosvientos.com.ar/tienda/${product.slug}`,
      "price": product.price.toString(),
      "priceCurrency": "ARS",
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "La Magia de los Vientos" }
    }
  };

  const related = PRODUCTS.filter((p) => p.category === product.category && p.slug !== slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}
