'use client';

import { PRODUCTS } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const CATEGORIES = [
  { key: 'todos', label: 'Todos' },
  { key: 'Línea Adultos', label: 'Adultos' },
  { key: 'Kids & Mamás', label: 'Kids & Mamás' },
  { key: 'Línea Mascotas', label: 'Mascotas' },
];

export default function TiendaPage() {
  const [activeFilter, setActiveFilter] = useState('todos');

  const filtered = activeFilter === 'todos'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <div className="tienda-page">

      {/* Hero */}
      <section className="shop-hero">
        <div className="container">
          <span className="hero-caption">Farmacia Botánica</span>
          <h1>Boutique de<br />Bienestar Natural</h1>
          <p className="hero-sub">Preparados magistrales artesanales. Formulados bajo protocolo terapéutico.<br />Envío a todo el país.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="shop-filters">
        <div className="container">
          <div className="filter-bar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                className={`filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="shop-grid-section">
        <div className="container">
          <div className="product-count">{filtered.length} preparados</div>
          <div className="product-grid-tienda">
            {filtered.map((product) => (
              <Link key={product.id} href={`/tienda/${product.slug}`} className="product-link-wrapper">
                <article className="product-item-tienda">
                  {product.tag && (
                    <div className={`product-badge ${product.tag === 'Best Seller' ? 'badge-gold' : ''}`}>
                      {product.tag}
                    </div>
                  )}
                  <div className="product-thumb">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={120}
                      height={180}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className="product-content">
                    <p className="product-category">{product.category}</p>
                    <h4>{product.title}</h4>
                    <p className="short-desc">{product.shortDesc}</p>
                    <div className="product-footer">
                      <p className="price">${product.price.toLocaleString('es-AR')}</p>
                      <span className="view-detail-link">Ver detalle →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Formula CTA */}
      <section className="custom-formula-cta">
        <div className="container">
          <div className="custom-box-shop">
            <div className="custom-shop-content">
              <span className="custom-caption">Servicio Premium</span>
              <h2>Fórmula a Medida</h2>
              <p>Una sesión 1:1 donde analizamos tu biografía emocional para crear tu combinación personalizada de las 38 flores.</p>
              <ul className="custom-list">
                <li>Sesión terapéutica de 60 minutos</li>
                <li>Preparado personalizado incluido</li>
                <li>Seguimiento a los 21 días</li>
              </ul>
              <div className="custom-price-row">
                <span className="custom-price">$25.000</span>
                <span className="custom-price-label">/ sesión completa</span>
              </div>
              <Link href="/reservas" className="btn btn-primary">
                Agendar Consultoría
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">I.</div>
              <h4>Esencias Originales</h4>
              <p>Kit completo de 38 esencias puras del Dr. Bach.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">II.</div>
              <h4>Rigor Terapéutico</h4>
              <p>Formación certificada y triple especialización musical-académica.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">III.</div>
              <h4>Envío Protegido</h4>
              <p>Packaging especial que preserva la integridad de las esencias.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">IV.</div>
              <h4>Pago Seguro</h4>
              <p>Mercado Pago y transferencia bancaria.</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .tienda-page {
          padding-top: 0;
        }

        /* Hero */
        .shop-hero {
          padding: 10rem 0 6rem;
          background-color: var(--color-primary);
          color: white;
          text-align: center;
        }
        .hero-caption {
          display: block;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-accent);
          margin-bottom: 2rem;
        }
        .shop-hero h1 {
          font-size: clamp(3rem, 7vw, 5rem);
          color: var(--color-secondary);
          line-height: 1.05;
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
        }
        .hero-sub {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.6);
          font-weight: 300;
          line-height: 1.8;
        }

        /* Filters */
        .shop-filters {
          padding: 3rem 0;
          border-bottom: 1px solid var(--color-earth-light);
          position: sticky;
          top: 72px;
          background: var(--background);
          z-index: 100;
        }
        .filter-bar {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .filter-btn {
          background: transparent;
          border: 1px solid var(--color-earth-light);
          padding: 0.6rem 1.5rem;
          border-radius: var(--radius);
          font-family: var(--font-main);
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          color: var(--color-earth);
          transition: all 0.3s ease;
        }
        .filter-btn:hover {
          border-color: var(--foreground);
          color: var(--foreground);
        }
        .filter-btn.active {
          background: var(--foreground);
          color: var(--background);
          border-color: var(--foreground);
        }

        /* Grid */
        .shop-grid-section {
          padding: 5rem 0;
        }
        .product-count {
          font-size: 0.85rem;
          color: var(--color-earth);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 3rem;
        }
        .product-grid-tienda {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2px;
          background-color: var(--color-earth-light);
          border: 1px solid var(--color-earth-light);
        }
        .product-link-wrapper {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .product-item-tienda {
          background: var(--background);
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .product-item-tienda:hover {
          background: var(--color-secondary);
          transform: scale(1.01);
          z-index: 2;
          box-shadow: var(--shadow-md);
        }
        .product-badge {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          background: var(--color-secondary-dark);
          color: var(--foreground);
          padding: 0.25rem 0.75rem;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          border-radius: var(--radius);
        }
        .badge-gold {
          background: var(--color-accent);
          color: var(--color-primary);
        }
        .product-thumb {
          height: 280px;
          background: var(--color-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
          border-bottom: 1px solid var(--color-earth-light);
          transition: background 0.3s;
        }
        .product-item-tienda:hover .product-thumb {
          background: var(--color-secondary-dark);
        }
        .product-content {
          padding: 2rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .product-category {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--color-earth);
          margin-bottom: 0.75rem;
          font-weight: 500;
        }
        .product-content h4 {
          font-size: 1.4rem;
          margin-bottom: 0.75rem;
          color: var(--foreground);
          font-family: var(--font-serif);
          font-weight: 400;
        }
        .short-desc {
          font-size: 0.9rem;
          color: var(--color-earth);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-weight: 300;
          flex-grow: 1;
        }
        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-earth-light);
        }
        .price {
          font-weight: 500;
          font-size: 1.2rem;
          color: var(--foreground);
          font-family: var(--font-serif);
        }
        .view-detail-link {
          font-size: 0.75rem;
          color: var(--color-earth);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 500;
          transition: color 0.3s;
        }
        .product-item-tienda:hover .view-detail-link {
          color: var(--foreground);
        }

        /* Custom Formula */
        .custom-formula-cta {
          padding: 10rem 0;
          background: var(--color-primary);
        }
        .custom-box-shop {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }
        .custom-caption {
          display: block;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-accent);
          margin-bottom: 2rem;
        }
        .custom-box-shop h2 {
          color: var(--color-secondary);
          font-size: 3.5rem;
          margin-bottom: 2rem;
          line-height: 1.1;
        }
        .custom-box-shop p {
          color: rgba(255,255,255,0.65);
          font-size: 1.15rem;
          line-height: 1.8;
          margin-bottom: 3rem;
          font-weight: 300;
        }
        .custom-list {
          list-style: none;
          margin: 0 0 3rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }
        .custom-list li {
          color: rgba(255,255,255,0.8);
          font-size: 1rem;
          padding-left: 1.5rem;
          position: relative;
        }
        .custom-list li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--color-accent);
        }
        .custom-price-row {
          margin-bottom: 3rem;
        }
        .custom-price {
          font-family: var(--font-serif);
          font-size: 3rem;
          color: var(--color-accent);
          font-weight: 400;
        }
        .custom-price-label {
          color: rgba(255,255,255,0.5);
          font-size: 1rem;
          margin-left: 0.5rem;
        }

        /* Trust */
        .trust-section {
          padding: 8rem 0;
          border-top: 1px solid var(--color-earth-light);
        }
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 4rem;
        }
        .trust-item {
          text-align: center;
        }
        .trust-icon {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--color-accent);
          margin-bottom: 1.5rem;
          opacity: 0.7;
        }
        .trust-item h4 {
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
          color: var(--foreground);
          letter-spacing: 0.02em;
        }
        .trust-item p {
          font-size: 0.9rem;
          color: var(--color-earth);
          font-weight: 300;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .shop-hero { padding: 8rem 0 4rem; }
          .product-grid-tienda { grid-template-columns: repeat(2, 1fr); }
          .filter-bar { gap: 0.5rem; }
          .custom-box-shop h2 { font-size: 2.5rem; }
          .trust-grid { gap: 2.5rem; }
        }
        @media (max-width: 480px) {
          .product-grid-tienda { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
