'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';

type Props = {
  product: Product;
  related: Product[];
};

export default function ProductDetailClient({ product, related }: Props) {
  const waMessage = encodeURIComponent(`Hola! Quiero consultar por el preparado: ${product.title} ($${product.price.toLocaleString('es-AR')})`);
  const waLink = `https://wa.me/5491131671954?text=${waMessage}`;

  return (
    <div className="product-detail-page">

      <div className="breadcrumb container">
        <Link href="/">Inicio</Link>
        <span> / </span>
        <Link href="/preparados">Preparados</Link>
        <span> / </span>
        <span>{product.title}</span>
      </div>

      <section className="product-main container">
        <div className="product-gallery">
          <div className="main-image-box">
            {product.tag && (
              <div className={`gallery-badge ${product.tag === 'Best Seller' ? 'badge-gold' : ''}`}>
                {product.tag}
              </div>
            )}
            <Image
              src={product.image}
              alt={`${product.title} — Preparado de Flores de Bach`}
              width={300}
              height={420}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <p className="gallery-caption">Frasco gotero ámbar de 30ml · Conservante natural</p>
        </div>

        <div className="product-info">
          <p className="info-category">{product.category}</p>
          <h1 className="product-title">{product.title}</h1>
          <p className="product-lead">{product.shortDesc}</p>

          <div className="price-block">
            <span className="price-main">${product.price.toLocaleString('es-AR')}</span>
            <span className="price-note">· Frasco 30ml · Envío a todo el país</span>
          </div>

          <div className="cta-block">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-wa">
              Consultar por WhatsApp
            </a>
            <Link href="/reservas" className="btn btn-secondary">
              Agendar Sesión Personalizada
            </Link>
          </div>

          <div className="product-divider" />

          <div className="product-description">
            <h2>Sobre este preparado</h2>
            <p>{product.fullDesc}</p>
          </div>

          <div className="product-divider" />

          <div className="product-benefits">
            <h2>Beneficios</h2>
            <ul>
              {product.benefits.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>

          <div className="product-divider" />

          <div className="product-ingredients">
            <h2>Esencias activas</h2>
            <div className="ingredients-list">
              {product.ingredients.map((ing, i) => (
                <span key={i} className="ingredient-tag">{ing}</span>
              ))}
            </div>
          </div>

          <div className="product-divider" />

          <div className="product-usage">
            <h2>Modo de uso</h2>
            <p>{product.usage}</p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="related-section">
          <div className="container">
            <h2 className="related-title">De la misma línea</h2>
            <div className="related-grid">
              {related.map(p => (
                <Link key={p.id} href={`/tienda/${p.slug}`} className="related-card">
                  <div className="related-thumb">
                    <Image src={p.image} alt={p.title} width={80} height={120} style={{ objectFit: 'contain' }} />
                  </div>
                  <div className="related-info">
                    <h3>{p.title}</h3>
                    <p>{p.shortDesc}</p>
                    <span className="related-price">${p.price.toLocaleString('es-AR')}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        .product-detail-page { padding-bottom: 10rem; }
        .breadcrumb { padding: 2rem 1.5rem; font-size: 0.8rem; color: var(--color-earth); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 2rem; }
        .breadcrumb a { color: var(--color-earth); transition: color 0.2s; }
        .breadcrumb a:hover { color: var(--foreground); }
        .breadcrumb span { margin: 0 0.5rem; }
        .product-main { display: grid; grid-template-columns: 1fr 1.2fr; gap: 8rem; padding-top: 4rem; padding-bottom: 8rem; align-items: start; }
        .product-gallery { position: sticky; top: 120px; }
        .main-image-box { background: var(--color-secondary); border: 1px solid var(--color-earth-light); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; padding: 5rem 3rem; position: relative; min-height: 500px; }
        .gallery-badge { position: absolute; top: 1.5rem; left: 1.5rem; background: var(--color-secondary-dark); color: var(--foreground); padding: 0.3rem 0.9rem; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; border-radius: var(--radius); }
        .badge-gold { background: var(--color-accent); color: var(--color-primary); }
        .gallery-caption { text-align: center; font-size: 0.78rem; color: var(--color-earth); margin-top: 1.5rem; text-transform: uppercase; letter-spacing: 0.15em; }
        .info-category { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.3em; color: var(--color-earth); margin-bottom: 1rem; font-weight: 500; }
        .product-title { font-size: clamp(2.5rem, 5vw, 3.5rem); color: var(--foreground); margin-bottom: 1.5rem; font-weight: 400; line-height: 1.1; }
        .product-lead { font-size: 1.2rem; color: var(--color-earth); line-height: 1.7; margin-bottom: 2.5rem; font-weight: 300; }
        .price-block { margin-bottom: 2.5rem; display: flex; align-items: baseline; gap: 1rem; flex-wrap: wrap; }
        .price-main { font-family: var(--font-serif); font-size: 2.5rem; color: var(--foreground); font-weight: 400; }
        .price-note { font-size: 0.85rem; color: var(--color-earth); font-weight: 300; }
        .cta-block { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 3rem; }
        .btn-wa { background: #25D366 !important; border-color: #25D366 !important; justify-content: center; color: white !important; }
        .btn-wa:hover { background: #1da856 !important; border-color: #1da856 !important; }
        .product-divider { height: 1px; background: var(--color-earth-light); margin: 2.5rem 0; }
        .product-description h2, .product-benefits h2, .product-ingredients h2, .product-usage h2 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.3em; color: var(--color-earth); font-family: var(--font-main); font-weight: 700; margin-bottom: 1.25rem; }
        .product-description p, .product-usage p { color: var(--foreground); font-size: 1rem; line-height: 1.8; font-weight: 300; }
        .product-benefits ul { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
        .product-benefits li { padding-left: 1.5rem; position: relative; font-size: 1rem; color: var(--foreground); font-weight: 300; line-height: 1.6; }
        .product-benefits li::before { content: '—'; position: absolute; left: 0; color: var(--color-accent); }
        .ingredients-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .ingredient-tag { background: var(--color-secondary); border: 1px solid var(--color-earth-light); padding: 0.4rem 1rem; border-radius: var(--radius); font-size: 0.85rem; color: var(--color-earth); font-style: italic; }
        .related-section { padding: 6rem 0; border-top: 1px solid var(--color-earth-light); background: var(--color-secondary); }
        .related-title { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.3em; color: var(--color-earth); font-family: var(--font-main); font-weight: 700; margin-bottom: 3rem; }
        .related-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2px; background: var(--color-earth-light); border: 1px solid var(--color-earth-light); }
        .related-card { background: var(--background); display: flex; gap: 1.5rem; padding: 2rem; text-decoration: none; color: inherit; transition: background 0.3s; }
        .related-card:hover { background: var(--color-secondary-dark); }
        .related-thumb { flex-shrink: 0; background: var(--color-secondary); padding: 1rem; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; width: 80px; height: 110px; }
        .related-info h3 { font-size: 1.1rem; font-weight: 400; margin-bottom: 0.5rem; color: var(--foreground); font-family: var(--font-serif); }
        .related-info p { font-size: 0.85rem; color: var(--color-earth); line-height: 1.5; margin-bottom: 0.75rem; font-weight: 300; }
        .related-price { font-family: var(--font-serif); font-size: 1rem; color: var(--foreground); }
        @media (max-width: 900px) {
          .product-main { grid-template-columns: 1fr; gap: 4rem; }
          .product-gallery { position: static; }
          .main-image-box { min-height: 350px; }
        }
        @media (max-width: 600px) {
          .related-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
