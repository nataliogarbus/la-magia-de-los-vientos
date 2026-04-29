'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PRODUCTS = [
  { id: 'sos', name: 'SOS Rescate', icon: 'SR', price: '$18.900' },
  { id: 'calma', name: 'Calma Total', icon: 'CT', price: '$18.900' },
  { id: 'sueño', name: 'Descanso Profundo', icon: 'DP', price: '$18.900' },
  { id: 'foco', name: 'Enfoque & Claridad', icon: 'EC', price: '$18.900' },
  { id: 'animo', name: 'Ánimo & Vitalidad', icon: 'AV', price: '$18.900' },
  { id: 'custom', name: 'Fórmula a Medida', icon: 'FM', price: '$25.000' },
];

export default function ProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="carousel-outer section-padding">
      <div className="container">
        <div className="carousel-header">
          <h2 className="section-title text-left">Nuestros Preparados</h2>
          <div className="carousel-controls">
            <button onClick={scrollLeft} aria-label="Anterior">←</button>
            <button onClick={scrollRight} aria-label="Siguiente">→</button>
          </div>
        </div>
        
        <div className="carousel-container" ref={scrollRef}>
          {PRODUCTS.map((prod) => (
            <div 
              key={prod.id} 
              className={`carousel-card card-${prod.id}`}
            >
              <div className="card-viz">
                <Image 
                  src="/frasco-ambar.png" 
                  alt={prod.name} 
                  fill
                  style={{ objectFit: 'cover' }} 
                />
              </div>
              <div className="card-info">
                <h3>{prod.name}</h3>
                <p className="price">{prod.price}</p>
                <div className="card-badges">
                  <span className="badge">ADULTOS</span>
                  <span className="badge">KIDS & MAMÁS</span>
                </div>
                <Link href="/tienda" className="btn-card">Ver detalles</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .carousel-outer {
          background: transparent;
          padding: 0;
          margin-top: -120px; /* Montaje sobre el hero */
          position: relative;
          z-index: 10;
        }
        .carousel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .carousel-header h2 {
           color: white; /* Contraste sobre el banner */
           font-size: 1.8rem;
           text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .carousel-controls {
          display: flex;
          gap: 0.8rem;
        }
        .carousel-controls button {
          background: rgba(255,255,255,0.9);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          color: var(--color-primary);
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-sm);
        }
        .carousel-controls button:hover {
          background: white;
          transform: scale(1.1);
        }

        .carousel-container {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          padding: 1rem 0.5rem 4rem;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .carousel-container::-webkit-scrollbar {
          display: none;
        }

        .carousel-card {
          flex: 0 0 280px; /* Más compacto */
          scroll-snap-align: start;
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow-md);
          border: 1px solid rgba(0,0,0,0.03);
          overflow: hidden;
          transition: all 0.4s ease;
        }
        .carousel-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }

        .card-viz {
          height: 200px; /* Altura reducida */
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-secondary);
          position: relative; /* Necesario para Image fill */
          overflow: hidden;
        }

        .card-info {
          padding: 1.5rem;
          text-align: center;
        }
        .card-info h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          margin-bottom: 0.8rem;
          color: var(--color-primary);
          letter-spacing: -0.01em;
        }
        .price {
          font-family: var(--font-main);
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--color-accent-dark);
          margin-bottom: 1.5rem;
        }
        .card-badges {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        .badge {
          font-family: var(--font-main);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          background: transparent;
          border: 1px solid var(--color-earth-light);
          padding: 0.4rem 0.8rem;
          color: var(--color-earth);
          border-radius: 99px;
        }
        .btn-card {
          display: inline-block;
          text-decoration: none;
          color: var(--color-primary);
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.5rem 0;
          border-bottom: 2px solid var(--color-accent);
          transition: all 0.3s ease;
        }
        .btn-card:hover {
          color: var(--color-accent-dark);
          letter-spacing: 0.15em;
        }
      `}</style>
    </div>
  );
}
