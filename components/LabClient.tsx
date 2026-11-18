'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PRODUCTS } from '@/lib/products';
import SilencioEntreNotas from '@/components/SilencioEntreNotas';
import SobreElianaSection from '@/components/SobreElianaSection';
import ModoEscuchaPlayer from '@/components/ModoEscuchaPlayer';

const CURADURIA_SONORA: Record<string, { clima: string; playlist: string; nota: string }> = {
  'sos-rescate': {
    clima: 'Respiración lenta · Cello solista y notas sostenidas',
    playlist: 'Adagio para volver al eje (60 BPM)',
    nota: 'Re menor · Calma inmediata',
  },
  'calma-total': {
    clima: 'Handpan en Re menor · Lluvia suave y armónicos graves',
    playlist: 'Mente en quietud — Piano & Handpan',
    nota: 'Sol abierto · Silencio mental',
  },
  'descanso-profundo': {
    clima: 'Frecuencias bajas cálidas · Silencio espaciado nocturno',
    playlist: 'Nocturno Botánico (432 Hz)',
    nota: 'Fa grave · Descanso reparador',
  },
  'enfoque-y-claridad': {
    clima: 'Guitarra clásica minimalista · Pulso constante y claro',
    playlist: 'Estudio en Sol — Claridad y Presencia',
    nota: 'Sol mayor · Foco lúcido',
  },
  'animo-y-vitalidad': {
    clima: 'Acordes abiertos en Fa mayor · Cuerdas luminosas',
    playlist: 'Mañana Serena — Acústico Vital',
    nota: 'Fa mayor 7 · Impulso vital',
  },
};

export default function LabClient() {
  const [ambientActive, setAmbientActive] = useState(false);
  const featuredProducts = PRODUCTS.slice(0, 5);

  return (
    <div className="lab-page">
      {/* Hero Editorial Sensorial */}
      <section className="lab-hero">
        <div className="hero-halo-top" aria-hidden="true" />
        <div className="hero-halo-bottom" aria-hidden="true" />

        <div className="container lab-hero-grid">
          <div className="lab-hero-copy">
            <span className="lab-eyebrow">LABORATORIO SENSORIAL · VISTA PREVIA</span>
            <h1>
              La <em>Escucha</em> como <em>Medicina</em>
            </h1>
            <p className="lab-subtitle">
              Una experiencia donde la formación académica del Conservatorio, las Flores de Bach y la Biodecodificación Transgeneracional dialogan en un mismo pulso.
            </p>
            <div className="lab-hero-actions">
              <a href="#silencio-entre-notas" className="pill-cta-primary">
                Iniciar Pausa de 60 Segundos
              </a>
              <Link href="/consultas" className="pill-cta-outline">
                Explorar Sesiones
              </Link>
            </div>
          </div>

          {/* Elemento visual central animado: anillos armónicos */}
          <div className="hero-resonance-col" aria-hidden="true">
            <div className={`resonance-stage ${ambientActive ? 'active' : ''}`}>
              <svg className="resonance-svg" viewBox="0 0 320 320" width="320" height="320">
                <circle className="ring ring-1" cx="160" cy="160" r="52" />
                <circle className="ring ring-2" cx="160" cy="160" r="88" />
                <circle className="ring ring-3" cx="160" cy="160" r="124" />
                <circle className="ring ring-4" cx="160" cy="160" r="152" />
              </svg>
              <div className="resonance-core">
                <span className="core-symbol">♪</span>
                <span className="core-caption">
                  {ambientActive ? 'Frecuencia Activa' : 'Resonancia'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloque Inmersivo: El Silencio entre Notas */}
      <div id="silencio-entre-notas">
        <SilencioEntreNotas />
      </div>

      {/* Bento Grid: Curaduría Musical & Preparados */}
      <section className="bento-section">
        <div className="container">
          <div className="bento-header">
            <span className="bento-eyebrow">BENTO BOTÁNICO & SONORO</span>
            <h2>
              Conservatorio, Biodecodificación y <em>Flores de Bach</em>
            </h2>
            <p>
              Cada preparado magistral ($20.000 ARS) se acompaña de una curaduría musical diseñada para sostener tu estado emocional durante los 21 días de toma.
            </p>
          </div>

          <div className="bento-grid">
            {/* Tarjeta Manifiesto / Unión de disciplinas (Span 7) */}
            <article className="bento-card bento-manifesto">
              <div className="bento-card-top">
                <span className="bento-chip">Método Integrativo</span>
                <svg className="staff-svg" viewBox="0 0 120 28" width="96" height="22" fill="none" aria-hidden="true">
                  <path d="M2 7h116M2 14h116M2 21h116" stroke="rgba(184,151,104,0.45)" strokeWidth="1" />
                  <circle cx="28" cy="14" r="3.5" fill="#B89768" />
                  <circle cx="62" cy="7" r="3.5" fill="#F6F3EC" />
                  <circle cx="94" cy="21" r="3.5" fill="#B89768" />
                </svg>
              </div>
              <h3>De la partitura al sistema nervioso</h3>
              <p>
                Así como una obra necesita silencios para cobrar sentido, el cuerpo expresa en tensión lo que aún no pudo ponerse en palabras. Combinamos escucha clínica, esencias florales y clima sonoro.
              </p>
              <div className="manifesto-pillars">
                <span>Conservatorio de San Martín</span>
                <span>Comprender para Sanar</span>
                <span>38 Esencias de Bach</span>
              </div>
            </article>

            {/* Tarjeta 1: SOS Rescate (Span 5) */}
            {featuredProducts[0] && (
              <article className="bento-card bento-sage">
                <div className="bento-card-top">
                  <span className="bento-chip light">{CURADURIA_SONORA['sos-rescate'].nota}</span>
                  <span className="bento-price">$20.000</span>
                </div>
                <h3>{featuredProducts[0].title}</h3>
                <p>{featuredProducts[0].shortDesc}</p>
                <div className="sound-box dark">
                  <span className="sound-box-label">Clima Musical</span>
                  <p className="sound-box-title">{CURADURIA_SONORA['sos-rescate'].playlist}</p>
                  <p className="sound-box-sub">{CURADURIA_SONORA['sos-rescate'].clima}</p>
                </div>
                <Link href={`/tienda/${featuredProducts[0].slug}`} className="bento-link light">
                  Ver Preparado →
                </Link>
              </article>
            )}

            {/* Tarjeta 2, 3, 4, 5 en fila equilibrada */}
            {featuredProducts.slice(1).map((product, index) => {
              const sound = CURADURIA_SONORA[product.slug] || {
                clima: 'Instrumental acústico suave',
                playlist: 'Sintonía Floral',
                nota: 'Armonía',
              };
              const spanClass = index === 0 || index === 3 ? 'bento-wide' : 'bento-compact';

              return (
                <article key={product.id} className={`bento-card bento-cream ${spanClass}`}>
                  <div className="bento-card-top">
                    <span className="bento-chip">{sound.nota}</span>
                    <span className="bento-price">${product.price.toLocaleString('es-AR')}</span>
                  </div>
                  <h3>{product.title}</h3>
                  <p>{product.shortDesc}</p>

                  <div className="sound-box">
                    <span className="sound-box-label">Playlist recomendada</span>
                    <p className="sound-box-title">{sound.playlist}</p>
                    <p className="sound-box-sub">{sound.clima}</p>
                  </div>

                  <Link href={`/tienda/${product.slug}`} className="bento-link">
                    Ver Preparado →
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Autoridad y Trayectoria de Eliana */}
      <SobreElianaSection showConsultasLink={true} />

      {/* Cápsula Sonora Flotante */}
      <ModoEscuchaPlayer onPlayingChange={setAmbientActive} />

      <style jsx>{`
        .lab-page {
          background-color: #f6f3ec;
          color: #1d221f;
        }

        /* Hero Editorial */
        .lab-hero {
          position: relative;
          padding: 6rem 0 5.5rem;
          background-color: #f6f3ec;
          overflow: hidden;
          border-bottom: 1px solid rgba(184, 151, 104, 0.25);
        }

        .hero-halo-top {
          position: absolute;
          top: -180px;
          right: -100px;
          width: 540px;
          height: 540px;
          background: radial-gradient(circle, rgba(184, 151, 104, 0.2) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-halo-bottom {
          position: absolute;
          bottom: -200px;
          left: -120px;
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, rgba(44, 58, 51, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .lab-hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3rem;
          align-items: center;
        }

        .lab-eyebrow {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.26em;
          color: #b89768;
          margin-bottom: 1.25rem;
        }

        .lab-hero-copy h1 {
          font-family: var(--font-serif);
          font-size: clamp(2.8rem, 6.2vw, 4.9rem);
          font-weight: 400;
          line-height: 1.04;
          color: #1d221f;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .lab-hero-copy em {
          font-style: italic;
          color: #2c3a33;
        }

        .lab-subtitle {
          font-size: 1.08rem;
          font-weight: 300;
          color: #5c5852;
          line-height: 1.8;
          max-width: 540px;
          margin-bottom: 2.25rem;
        }

        .lab-hero-actions {
          display: flex;
          gap: 0.9rem;
          flex-wrap: wrap;
        }

        .pill-cta-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #2c3a33;
          color: #f6f3ec;
          padding: 0.95rem 1.85rem;
          border-radius: 9999px;
          font-size: 0.76rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .pill-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(44, 58, 51, 0.2);
        }

        .pill-cta-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          color: #2c3a33;
          border: 1px solid rgba(44, 58, 51, 0.35);
          padding: 0.95rem 1.85rem;
          border-radius: 9999px;
          font-size: 0.76rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          transition: all 0.25s ease;
        }

        .pill-cta-outline:hover {
          border-color: #b89768;
          background-color: rgba(184, 151, 104, 0.1);
          transform: translateY(-2px);
        }

        /* Anillos Armónicos */
        .hero-resonance-col {
          display: flex;
          justify-content: center;
        }

        .resonance-stage {
          position: relative;
          width: 320px;
          height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .resonance-svg {
          position: absolute;
          inset: 0;
        }

        .ring {
          fill: none;
          stroke: #b89768;
          transform-origin: center;
        }

        .ring-1 {
          stroke-width: 1.5;
          opacity: 0.55;
          animation: ripplePulse 6s ease-in-out infinite;
        }

        .ring-2 {
          stroke-width: 1.1;
          opacity: 0.38;
          animation: ripplePulse 6s ease-in-out 1s infinite;
        }

        .ring-3 {
          stroke-width: 0.9;
          opacity: 0.24;
          animation: ripplePulse 6s ease-in-out 2s infinite;
        }

        .ring-4 {
          stroke-width: 0.75;
          stroke-dasharray: 4 6;
          opacity: 0.28;
          animation: slowSpin 36s linear infinite;
        }

        .resonance-stage.active .ring-1,
        .resonance-stage.active .ring-2,
        .resonance-stage.active .ring-3 {
          animation-duration: 2.8s;
          stroke: #2c3a33;
        }

        @keyframes ripplePulse {
          0%,
          100% {
            transform: scale(0.96);
            opacity: 0.25;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.65;
          }
        }

        @keyframes slowSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .resonance-core {
          position: relative;
          z-index: 2;
          width: 96px;
          height: 96px;
          border-radius: 9999px;
          background-color: #2c3a33;
          color: #f6f3ec;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 45px rgba(44, 58, 51, 0.22);
          transition: transform 0.4s ease, background-color 0.4s ease;
        }

        .resonance-stage.active .resonance-core {
          background-color: #b89768;
          color: #2c3a33;
          transform: scale(1.08);
        }

        .core-symbol {
          font-family: var(--font-serif);
          font-size: 1.65rem;
          line-height: 1;
        }

        .core-caption {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin-top: 0.25rem;
          opacity: 0.85;
        }

        /* Bento Grid */
        .bento-section {
          padding: 6.5rem 0;
          background-color: #f6f3ec;
        }

        .bento-header {
          text-align: center;
          max-width: 660px;
          margin: 0 auto 3.75rem;
        }

        .bento-eyebrow {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.26em;
          color: #b89768;
          margin-bottom: 0.9rem;
        }

        .bento-header h2 {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 2.9rem);
          font-weight: 400;
          color: #1d221f;
          margin-bottom: 1rem;
        }

        .bento-header em {
          font-style: italic;
          color: #2c3a33;
        }

        .bento-header p {
          font-size: 1rem;
          font-weight: 300;
          color: #5c5852;
          line-height: 1.75;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1.35rem;
        }

        .bento-card {
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .bento-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 48px rgba(44, 58, 51, 0.1);
        }

        .bento-manifesto {
          grid-column: span 7;
          background-color: #2c3a33;
          color: #f6f3ec;
          border: 1px solid rgba(184, 151, 104, 0.35);
        }

        .bento-sage {
          grid-column: span 5;
          background-color: #2c3a33;
          color: #f6f3ec;
          border: 1px solid rgba(184, 151, 104, 0.35);
        }

        .bento-cream {
          background-color: #ffffff;
          border: 1px solid rgba(184, 151, 104, 0.35);
        }

        .bento-wide {
          grid-column: span 7;
        }

        .bento-compact {
          grid-column: span 5;
        }

        .bento-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .bento-chip {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          padding: 0.3rem 0.8rem;
          border-radius: 9999px;
          background-color: rgba(184, 151, 104, 0.16);
          color: #2c3a33;
        }

        .bento-manifesto .bento-chip,
        .bento-chip.light {
          background-color: rgba(184, 151, 104, 0.22);
          color: #f6f3ec;
        }

        .bento-price {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: inherit;
        }

        .bento-card h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 400;
          color: inherit;
          margin-bottom: 0.65rem;
        }

        .bento-card > p {
          font-size: 0.95rem;
          font-weight: 300;
          line-height: 1.7;
          opacity: 0.82;
          margin-bottom: 1.35rem;
        }

        .manifesto-pillars {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-top: auto;
        }

        .manifesto-pillars span {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.4rem 0.85rem;
          border-radius: 9999px;
          border: 1px solid rgba(246, 243, 236, 0.25);
          color: #f6f3ec;
        }

        .sound-box {
          background-color: #f6f3ec;
          border-left: 3px solid #b89768;
          border-radius: 8px;
          padding: 0.9rem 1rem;
          margin-top: auto;
          margin-bottom: 1.25rem;
        }

        .sound-box.dark {
          background-color: rgba(246, 243, 236, 0.07);
        }

        .sound-box-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #b89768;
          margin-bottom: 0.25rem;
        }

        .sound-box-title {
          font-family: var(--font-serif);
          font-size: 1.02rem;
          margin-bottom: 0.15rem;
        }

        .sound-box-sub {
          font-size: 0.8rem;
          opacity: 0.72;
        }

        .bento-link {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #2c3a33;
          align-self: flex-start;
        }

        .bento-link.light {
          color: #b89768;
        }

        @media (max-width: 900px) {
          .lab-hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .lab-subtitle {
            margin-left: auto;
            margin-right: auto;
          }

          .lab-hero-actions {
            justify-content: center;
          }

          .bento-manifesto,
          .bento-sage,
          .bento-wide,
          .bento-compact {
            grid-column: span 12;
          }
        }
      `}</style>
    </div>
  );
}
