'use client';

import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';
import SilencioEntreNotas from '@/components/SilencioEntreNotas';
import SobreElianaSection from '@/components/SobreElianaSection';
import ModoEscuchaPlayer from '@/components/ModoEscuchaPlayer';

const CURADURIA_SONORA: Record<string, { clima: string; playlist: string }> = {
  'sos-rescate': {
    clima: 'Respiración lenta · Cello solista y notas sostenidas',
    playlist: 'Adagio para volver al eje (60 BPM)',
  },
  'calma-total': {
    clima: 'Handpan en Re menor · Lluvia suave y armónicos graves',
    playlist: 'Mente en quietud — Piano & Handpan',
  },
  'descanso-profundo': {
    clima: 'Frecuencias bajas cálidas · Silencio espaciado nocturno',
    playlist: 'Nocturno Botánico (432 Hz)',
  },
  'enfoque-y-claridad': {
    clima: 'Guitarra clásica minimalista · Pulso constante y claro',
    playlist: 'Estudio en Sol — Claridad y Presencia',
  },
  'animo-y-vitalidad': {
    clima: 'Acordes abiertos en Fa mayor · Cuerdas luminosas',
    playlist: 'Mañana Serena — Acústico Vital',
  },
};

export default function LabClient() {
  const featuredProducts = PRODUCTS.slice(0, 5);

  return (
    <div className="lab-page">
      {/* Hero Editorial Musical */}
      <section className="lab-hero">
        <div className="container lab-hero-inner">
          <span className="lab-badge">Laboratorio Conceptual · Vista Previa Privada</span>
          <h1>La Escucha como Medicina</h1>
          <p className="lab-subtitle">
            Una propuesta integral que une la sensibilidad musical del Conservatorio, las Flores de Bach y la Biodecodificación Transgeneracional.
          </p>
          <div className="lab-hero-actions">
            <a href="#silencio-entre-notas" className="btn btn-primary">
              Probar Pausa de 60 Segundos
            </a>
            <Link href="/consultas" className="btn btn-outline">
              Ver Sesiones Actuales
            </Link>
          </div>
        </div>
      </section>

      {/* Bloque Interactivo: El Silencio entre Notas */}
      <div id="silencio-entre-notas">
        <SilencioEntreNotas />
      </div>

      {/* Curaduría Sonora por Preparado */}
      <section className="curaduria-section">
        <div className="container">
          <div className="curaduria-header">
            <span className="curaduria-eyebrow">CURADURÍA SONORA POR PREPARADO</span>
            <h2>Cada Fórmula Tiene su Propio Clima Musical</h2>
            <p>
              Sugerencias acústicas curadas para acompañar la toma diaria de tus esencias y potenciar el registro emocional.
            </p>
          </div>

          <div className="curaduria-grid">
            {featuredProducts.map((product) => {
              const sound = CURADURIA_SONORA[product.slug] || {
                clima: 'Instrumental acústico suave',
                playlist: 'Sintonía Floral',
              };

              return (
                <article key={product.id} className="curaduria-card">
                  <div className="card-top">
                    <span className="card-tag">{product.tag || product.category}</span>
                    <span className="card-price">
                      ${product.price.toLocaleString('es-AR')}
                    </span>
                  </div>
                  <h3>{product.title}</h3>
                  <p className="card-desc">{product.shortDesc}</p>

                  <div className="sound-pairing-box">
                    <span className="pairing-label">Clima Musical / Playlist recomendada</span>
                    <p className="pairing-playlist">{sound.playlist}</p>
                    <p className="pairing-clima">{sound.clima}</p>
                  </div>

                  <Link href={`/tienda/${product.slug}`} className="btn btn-outline width-100">
                    Ver Preparado
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Autoridad y Trayectoria de Eliana */}
      <SobreElianaSection showConsultasLink={true} />

      {/* Reproductor Ambiental Flotante (apagado por defecto) */}
      <ModoEscuchaPlayer />

      <style jsx>{`
        .lab-page {
          background-color: var(--background);
        }

        .lab-hero {
          padding: 6.5rem 0 5rem;
          background-color: var(--color-secondary);
          border-bottom: 1px solid var(--color-secondary-dark);
          text-align: center;
        }

        .lab-hero-inner {
          max-width: 760px;
        }

        .lab-badge {
          display: inline-block;
          background-color: var(--color-secondary-dark);
          color: var(--color-primary);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          padding: 0.35rem 0.9rem;
          border-radius: 9999px;
          margin-bottom: 1.5rem;
        }

        .lab-hero h1 {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 6vw, 4rem);
          font-weight: 400;
          color: var(--foreground);
          margin-bottom: 1.25rem;
          line-height: 1.1;
        }

        .lab-subtitle {
          font-size: 1.1rem;
          font-weight: 300;
          color: var(--color-earth);
          line-height: 1.8;
          margin-bottom: 2.25rem;
        }

        .lab-hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        /* Curaduría Sonora */
        .curaduria-section {
          padding: 6rem 0;
        }

        .curaduria-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 3.5rem;
        }

        .curaduria-eyebrow {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.24em;
          color: var(--color-accent-dark);
          margin-bottom: 0.9rem;
        }

        .curaduria-header h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.85rem, 3.6vw, 2.5rem);
          font-weight: 400;
          color: var(--foreground);
          margin-bottom: 0.85rem;
        }

        .curaduria-header p {
          font-size: 1rem;
          color: var(--color-earth);
          font-weight: 300;
          line-height: 1.7;
        }

        .curaduria-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
          gap: 1.5rem;
        }

        .curaduria-card {
          background-color: var(--background);
          border: 1px solid var(--color-earth-light);
          border-radius: var(--radius);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .card-tag {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          background-color: var(--color-secondary-dark);
          color: var(--color-primary);
          padding: 0.25rem 0.7rem;
          border-radius: 9999px;
        }

        .card-price {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--foreground);
        }

        .curaduria-card h3 {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: var(--foreground);
          margin-bottom: 0.5rem;
        }

        .card-desc {
          font-size: 0.92rem;
          color: var(--color-earth);
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .sound-pairing-box {
          background-color: var(--color-secondary);
          border: 1px solid var(--color-secondary-dark);
          border-left: 3px solid var(--color-accent);
          border-radius: var(--radius);
          padding: 0.95rem 1rem;
          margin-top: auto;
          margin-bottom: 1.25rem;
        }

        .pairing-label {
          display: block;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--color-accent-dark);
          margin-bottom: 0.35rem;
        }

        .pairing-playlist {
          font-family: var(--font-serif);
          font-size: 1rem;
          color: var(--foreground);
          margin-bottom: 0.2rem;
        }

        .pairing-clima {
          font-size: 0.82rem;
          color: var(--color-earth);
          line-height: 1.45;
        }
      `}</style>
    </div>
  );
}
