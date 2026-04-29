'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';
import { useState } from 'react';

const LINEAS = [
  { key: 'Línea Adultos', label: 'Adultos', descripcion: 'Preparados con base de Brandy (conservante tradicional). Para el sistema nervioso adulto.' },
  { key: 'Kids & Mamás', label: 'Kids & Mamás', descripcion: 'Línea Sensitive: base de Glicerina Vegetal 0% alcohol. Seguros desde recién nacidos.' },
  { key: 'Línea Mascotas', label: 'Mascotas', descripcion: 'Huellas en Calma: base agua/glicerina, inodoro e insípido. Para cualquier especie.' },
];

export default function PreparadosClient() {
  const [activeLinea, setActiveLinea] = useState<string | null>(null);
  const productosFiltrados = activeLinea ? PRODUCTS.filter(p => p.category === activeLinea) : PRODUCTS;

  return (
    <div className="preparados-page">

      <section className="prep-hero">
        <div className="container">
          <span className="hero-caption">Farmacia Floral Artesanal</span>
          <h1>Preparados Magistrales<br />de Flores de Bach</h1>
          <p className="hero-lead">Cada frasco es un protocolo. Diseñamos fórmulas bajo rigor terapéutico con las 38 esencias originales del Dr. Edward Bach.</p>
        </div>
      </section>

      <section className="que-son-section">
        <div className="container">
          <div className="que-son-grid">
            <div className="que-son-text">
              <span className="section-caption">El Método</span>
              <h2>¿Qué es un Preparado Magistral?</h2>
              <p>No es una infusión ni un suplemento vitamínico. Un preparado magistral de Flores de Bach es una <strong>combinación específica de esencias vibracionales</strong> seleccionadas para abordar un estado emocional concreto.</p>
              <p>La clave es la <strong>combinación y la dosificación</strong>: mientras que un preparado estándar usa 2-3 flores, nuestras fórmulas pueden integrar hasta 7 esencias, potenciando la sinergia entre ellas.</p>
              <p>El proceso de preparación incluye la <strong>dinamización manual</strong> del frasco — una técnica que activa la memoria vibracional de la planta y maximiza su efecto sutil en el campo bio-emocional.</p>
            </div>
            <div className="que-son-visual">
              <div className="bottle-showcase">
                <Image src="/frasco-ambar.png" alt="Frasco gotero ámbar de preparado floral" width={180} height={260} style={{ objectFit: 'contain' }} />
                <div className="bottle-labels">
                  {['Frasco ámbar 30ml', 'Esencias puras originales', 'Dinamización manual', 'Sin conservantes artificiales'].map((l, i) => (
                    <div key={i} className="label-item"><span className="label-dot" /><span>{l}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lineas-section">
        <div className="container">
          <span className="section-caption">Nuestras Líneas</span>
          <h2 className="lineas-title">Fórmulas para cada sistema</h2>
          <div className="lineas-grid">
            {LINEAS.map(linea => (
              <button key={linea.key} className={`linea-card ${activeLinea === linea.key ? 'active' : ''}`} onClick={() => setActiveLinea(prev => prev === linea.key ? null : linea.key)}>
                <h3>{linea.label}</h3>
                <p>{linea.descripcion}</p>
                <span className="linea-action">{activeLinea === linea.key ? 'Mostrando esta línea ↑' : 'Ver preparados →'}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="catalogo-section">
        <div className="container">
          <div className="catalogo-header">
            <span className="section-caption">Catálogo</span>
            <h2>{activeLinea ? activeLinea : 'Todos los Preparados'}<span className="catalogo-count"> · {productosFiltrados.length} fórmulas</span></h2>
          </div>
          <div className="products-grid">
            {productosFiltrados.map(product => {
              const waMsg = encodeURIComponent(`Hola! Quiero consultar sobre el preparado: ${product.title} ($${product.price.toLocaleString('es-AR')})`);
              return (
                <article key={product.id} className="product-card-prep">
                  {product.tag && <div className={`prep-badge ${product.tag === 'Best Seller' ? 'badge-gold' : ''}`}>{product.tag}</div>}
                  <div className="prep-image-box">
                    <Image src={product.image} alt={product.title} width={100} height={150} style={{ objectFit: 'contain' }} />
                  </div>
                  <div className="prep-info">
                    <p className="prep-category">{product.category}</p>
                    <h3 className="prep-name">{product.title}</h3>
                    <p className="prep-desc">{product.shortDesc}</p>
                    <div className="prep-ingredients">
                      {product.ingredients.slice(0, 3).map((ing, i) => <span key={i} className="ing-tag">{ing}</span>)}
                      {product.ingredients.length > 3 && <span className="ing-tag">+{product.ingredients.length - 3}</span>}
                    </div>
                    <div className="prep-footer">
                      <span className="prep-price">${product.price.toLocaleString('es-AR')}</span>
                      <a href={`https://wa.me/5491131671954?text=${waMsg}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-prep">Pedir por WhatsApp</a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="seguridad-section">
        <div className="container">
          <div className="seguridad-box">
            <span className="section-caption text-gold">Seguridad</span>
            <h2>Cada fórmula tiene su versión correcta</h2>
            <p>No vendemos el mismo preparado para todos. Cada línea usa una base conservante diferente según la biología de quien lo toma.</p>
            <div className="seguridad-grid">
              {[
                { quien: 'Adultos', base: 'Brandy', detalle: 'Conservante tradicional. La base clásica del Dr. Bach.' },
                { quien: 'Niños', base: 'Glicerina Vegetal', detalle: 'Sin alcohol. Sabor dulce natural. Seguro desde recién nacidos.' },
                { quien: 'Mascotas', base: 'Agua / Glicerina', detalle: 'Inodoro e insípido. Compatible con cualquier especie.' },
              ].map((item, i) => (
                <div key={i} className="seguridad-item">
                  <h4>{item.quien}</h4>
                  <p className="seg-base">{item.base}</p>
                  <p className="seg-detalle">{item.detalle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="formula-medida-section">
        <div className="container">
          <div className="formula-cta-inner">
            <span className="section-caption">Servicio Premium</span>
            <h2>¿Querés tu fórmula personalizada?</h2>
            <p>Si no sabés cuál elegir o tu situación requiere una combinación específica, la Consultoría 1:1 es el camino.</p>
            <div className="formula-cta-actions">
              <Link href="/consultas" className="btn btn-primary">Ver Consultas</Link>
              <Link href="/reservas" className="btn btn-secondary">Agendar Sesión</Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .preparados-page { padding-bottom: 10rem; }
        .prep-hero { padding: 10rem 0 7rem; background: var(--color-primary); color: white; }
        .hero-caption { display: block; text-transform: uppercase; letter-spacing: 0.4em; font-size: 0.75rem; font-weight: 700; color: var(--color-accent); margin-bottom: 2rem; }
        .prep-hero h1 { font-size: clamp(2.5rem, 7vw, 5rem); color: var(--color-secondary); line-height: 1.05; margin-bottom: 2.5rem; letter-spacing: -0.02em; }
        .hero-lead { font-size: 1.15rem; color: rgba(255,255,255,0.65); font-weight: 300; line-height: 1.8; max-width: 580px; }
        .que-son-section { padding: 10rem 0; border-bottom: 1px solid var(--color-earth-light); }
        .que-son-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 8rem; align-items: center; }
        .section-caption { display: block; text-transform: uppercase; letter-spacing: 0.4em; font-size: 0.7rem; font-weight: 700; color: var(--color-earth); margin-bottom: 2rem; }
        .text-gold { color: var(--color-accent); }
        .que-son-text h2 { font-size: clamp(2rem, 4vw, 2.8rem); margin-bottom: 2rem; font-weight: 400; line-height: 1.15; }
        .que-son-text p { font-size: 1.05rem; color: var(--color-earth); line-height: 1.8; margin-bottom: 1.5rem; font-weight: 300; }
        .que-son-text strong { color: var(--foreground); font-weight: 500; }
        .bottle-showcase { display: flex; flex-direction: column; align-items: center; gap: 3rem; background: var(--color-secondary); padding: 5rem 3rem; border: 1px solid var(--color-earth-light); border-radius: var(--radius); }
        .bottle-labels { display: flex; flex-direction: column; gap: 1rem; width: 100%; }
        .label-item { display: flex; align-items: center; gap: 1rem; font-size: 0.85rem; color: var(--color-earth); }
        .label-dot { width: 6px; height: 6px; background: var(--color-accent); border-radius: 50%; flex-shrink: 0; }
        .lineas-section { padding: 8rem 0; border-bottom: 1px solid var(--color-earth-light); }
        .lineas-title { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 4rem; font-weight: 400; }
        .lineas-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--color-earth-light); border: 1px solid var(--color-earth-light); }
        .linea-card { background: var(--background); padding: 3rem 2.5rem; text-align: left; border: none; cursor: pointer; font-family: var(--font-main); transition: background 0.3s; }
        .linea-card:hover { background: var(--color-secondary); }
        .linea-card.active { background: var(--color-primary); }
        .linea-card h3 { font-size: 1.3rem; margin-bottom: 1rem; font-family: var(--font-serif); transition: color 0.3s; }
        .linea-card.active h3 { color: var(--color-secondary); }
        .linea-card p { font-size: 0.9rem; color: var(--color-earth); line-height: 1.6; margin-bottom: 1.5rem; font-weight: 300; }
        .linea-card.active p { color: rgba(255,255,255,0.6); }
        .linea-action { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-accent); font-weight: 700; }
        .catalogo-section { padding: 8rem 0; border-bottom: 1px solid var(--color-earth-light); }
        .catalogo-header { margin-bottom: 5rem; }
        .catalogo-header h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 400; }
        .catalogo-count { color: var(--color-earth); font-size: 1.5rem; }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2px; background: var(--color-earth-light); border: 1px solid var(--color-earth-light); }
        .product-card-prep { background: var(--background); position: relative; transition: background 0.3s; display: flex; flex-direction: column; }
        .product-card-prep:hover { background: var(--color-secondary); }
        .prep-badge { position: absolute; top: 1rem; left: 1rem; background: var(--color-secondary-dark); color: var(--foreground); padding: 0.2rem 0.7rem; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; border-radius: var(--radius); z-index: 1; }
        .badge-gold { background: var(--color-accent); color: var(--color-primary); }
        .prep-image-box { height: 200px; background: var(--color-secondary); display: flex; align-items: center; justify-content: center; padding: 2rem; border-bottom: 1px solid var(--color-earth-light); }
        .prep-info { padding: 2rem; flex-grow: 1; display: flex; flex-direction: column; }
        .prep-category { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--color-earth); margin-bottom: 0.75rem; }
        .prep-name { font-size: 1.3rem; font-weight: 400; margin-bottom: 0.75rem; color: var(--foreground); font-family: var(--font-serif); }
        .prep-desc { font-size: 0.9rem; color: var(--color-earth); line-height: 1.6; margin-bottom: 1.5rem; font-weight: 300; flex-grow: 1; }
        .prep-ingredients { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem; }
        .ing-tag { font-size: 0.7rem; color: var(--color-earth); border: 1px solid var(--color-earth-light); padding: 0.2rem 0.6rem; border-radius: var(--radius); font-style: italic; }
        .prep-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid var(--color-earth-light); gap: 1rem; }
        .prep-price { font-family: var(--font-serif); font-size: 1.3rem; color: var(--foreground); }
        .btn-prep { padding: 0.6rem 1rem; font-size: 0.72rem; background: #25D366; border-color: #25D366; white-space: nowrap; }
        .btn-prep:hover { background: #1da856; border-color: #1da856; }
        .seguridad-section { padding: 8rem 0; background: var(--color-primary); }
        .seguridad-box { max-width: 900px; margin: 0 auto; text-align: center; }
        .seguridad-box h2 { font-size: clamp(2rem, 4vw, 3rem); color: var(--color-secondary); margin-bottom: 1.5rem; font-weight: 400; }
        .seguridad-box > p { color: rgba(255,255,255,0.6); font-size: 1.1rem; margin-bottom: 4rem; font-weight: 300; line-height: 1.7; }
        .seguridad-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); }
        .seguridad-item { padding: 3rem 2rem; background: rgba(255,255,255,0.03); text-align: center; }
        .seguridad-item h4 { color: var(--color-secondary); font-size: 1.2rem; margin-bottom: 0.75rem; font-weight: 400; }
        .seg-base { color: var(--color-accent); font-size: 0.9rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.75rem; }
        .seg-detalle { color: rgba(255,255,255,0.5); font-size: 0.85rem; line-height: 1.6; font-weight: 300; }
        .formula-medida-section { padding: 10rem 0; }
        .formula-cta-inner { max-width: 700px; text-align: center; margin: 0 auto; }
        .formula-cta-inner h2 { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 1.5rem; font-weight: 400; }
        .formula-cta-inner p { font-size: 1.1rem; color: var(--color-earth); line-height: 1.8; margin-bottom: 3rem; font-weight: 300; }
        .formula-cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        @media (max-width: 900px) {
          .que-son-grid { grid-template-columns: 1fr; gap: 4rem; }
          .lineas-grid { grid-template-columns: 1fr; }
          .seguridad-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) { .products-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
