'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedCategories() {
  return (
    <section className="featured-categories container section-padding">
      <div className="categories-grid">
        <Link href="/tienda?cat=personalizada" className="cat-card cat-primary">
          <div className="cat-content">
            <span className="cat-badge">Servicio Premium</span>
            <h3>Consultoría <br/>Personalizada</h3>
            <p>Sesión 1:1 para crear tu mezcla única.</p>
            <span className="cat-link">Ver más →</span>
          </div>
          <div className="cat-image">
            <div className="cat-overlay"></div>
            {/* Aquí iría una imagen de una sesión o flores */}
          </div>
        </Link>

        <Link href="/tienda?cat=kits" className="cat-card cat-secondary">
          <div className="cat-content">
            <span className="cat-badge">Kits de Inicio</span>
            <h3>Bienestar Integral <br/>en Cuotas</h3>
            <p>Llevá el laboratorio a tu casa con 3 cuotas sin interés.</p>
            <span className="cat-link">Comprar ahora →</span>
          </div>
          <div className="cat-image secondary">
            <div className="cat-overlay"></div>
            {/* Aquí iría una imagen de los kits */}
          </div>
        </Link>
      </div>

      <style jsx>{`
        .featured-categories {
          padding: 4rem 2rem;
        }
        .categories-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .cat-card {
          position: relative;
          height: 220px;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .cat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .cat-primary { background: #FF7733; } /* Naranja suave o color de la marca */
        .cat-secondary { background: #556677; } /* Un tono más sobrio */

        /* Estética inspirada en MeLi: Un lado con texto, otro con imagen/placeholder */
        .cat-content {
          flex: 1;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 2;
          color: white;
        }
        .cat-badge {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 700;
          margin-bottom: 0.5rem;
          opacity: 0.9;
        }
        .cat-content h3 {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }
        .cat-content p {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 1.5rem;
        }
        .cat-link {
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
        }

        .cat-image {
          flex: 0.8;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(0,0,0,0.2));
          position: relative;
        }
        .cat-image.secondary {
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(0,0,0,0.3));
        }
        .cat-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('/pattern-botany.png'); /* Opcional: un pattern botánico sutil */
          opacity: 0.1;
        }

        @media (max-width: 768px) {
          .categories-grid {
            grid-template-columns: 1fr;
          }
          .cat-card {
            height: 180px;
          }
        }
      `}</style>
    </section>
  );
}
