'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PRODUCTS } from '@/lib/products';
import LineaTiempoSintonia from '@/components/LineaTiempoSintonia';
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
      {/* 1. Hero Editorial Dividido (2 columnas) con Fotografía Real + Anillos SVG */}
      <section className="lab-hero">
        <div className="hero-halo-top" aria-hidden="true" />
        <div className="hero-halo-bottom" aria-hidden="true" />

        <div className="container lab-hero-grid">
          <div className="lab-hero-copy">
            <span className="lab-eyebrow">COMPRENDER PARA SANAR · ESCUCHA ACTIVA</span>
            <h1>
              Donde el <em>silencio</em> da sentido a la <em>música</em>
            </h1>
            <p className="lab-subtitle">
              Así como cada nota necesita una pausa para resonar, comprender lo que nos pasa empieza por detener el ruido cotidiano y escuchar con calma lo que nuestra historia intenta decir.
            </p>
            <div className="lab-hero-actions">
              <a href="#afinador-sintonia" className="pill-cta-primary">
                Abrir Afinador de Sintonía
              </a>
              <Link href="/consultas" className="pill-cta-outline">
                Explorar Sesiones
              </Link>
            </div>
          </div>

          {/* Fotografía real en arco orgánico + anillos concéntricos SVG */}
          <div className="hero-visual-col">
            <div className={`arch-frame-wrap ${ambientActive ? 'active' : ''}`}>
              <svg
                className="arch-rings-svg"
                viewBox="0 0 380 440"
                width="380"
                height="440"
                aria-hidden="true"
              >
                <circle className="ring ring-1" cx="190" cy="210" r="140" />
                <circle className="ring ring-2" cx="190" cy="210" r="168" />
                <circle className="ring ring-3" cx="190" cy="210" r="186" />
              </svg>

              <div className="arch-photo-frame">
                <Image
                  src="/hero-bg.png"
                  alt="Handpan y armonización sonora en la naturaleza — La Magia de los Vientos"
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 900px) 90vw, 400px"
                />
                <div className="arch-photo-scrim" />
                <div className="arch-status-pill">
                  <span className="status-dot" />
                  <span>{ambientActive ? 'Frecuencia Activa' : 'Resonancia · 432 Hz'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Línea de Tiempo Progresiva (Partitura de Evolución) */}
      <div id="afinador-sintonia">
        <LineaTiempoSintonia />
      </div>

      {/* 3. Bento Grid: Curaduría Sonora con Imágenes Reales de Preparados */}
      <section className="bento-section">
        <div className="container">
          <div className="bento-header">
            <span className="bento-eyebrow">BENTO BOTÁNICO & SONORO</span>
            <h2>
              Conservatorio, Biodecodificación y <em>Flores de Bach</em>
            </h2>
            <p>
              Cada fórmula floral se acompaña de una curaduría musical sugerida para sostener tus 21 días de sintonía y escucha consciente.
            </p>
          </div>

          <div className="bento-grid">
            {/* Tarjeta Manifiesto */}
            <article className="bento-card bento-manifesto">
              <div className="bento-card-top">
                <span className="bento-chip light">Método Integrativo</span>
                <svg
                  className="staff-svg"
                  viewBox="0 0 120 28"
                  width="96"
                  height="22"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 7h116M2 14h116M2 21h116"
                    stroke="rgba(184,151,104,0.5)"
                    strokeWidth="1"
                  />
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

            {/* Tarjeta 1: SOS Rescate con imagen real */}
            {featuredProducts[0] && (
              <article className="bento-card bento-sage">
                <div className="bento-card-top">
                  <span className="bento-chip light">
                    {CURADURIA_SONORA['sos-rescate'].nota}
                  </span>
                </div>

                <div className="product-thumb-row">
                  <div className="product-thumb dark">
                    <Image
                      src={featuredProducts[0].image}
                      alt={featuredProducts[0].title}
                      width={76}
                      height={76}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div>
                    <h3>{featuredProducts[0].title}</h3>
                    <p className="product-short">{featuredProducts[0].shortDesc}</p>
                  </div>
                </div>

                <div className="sound-box dark">
                  <span className="sound-box-label">Clima Musical</span>
                  <p className="sound-box-title">{CURADURIA_SONORA['sos-rescate'].playlist}</p>
                  <p className="sound-box-sub">{CURADURIA_SONORA['sos-rescate'].clima}</p>
                </div>
                <Link href={`/tienda/${featuredProducts[0].slug}`} className="bento-link light">
                  Conocer más sobre esta esencia →
                </Link>
              </article>
            )}

            {/* Tarjetas 2 a 5 con imágenes reales */}
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
                  </div>

                  <div className="product-thumb-row">
                    <div className="product-thumb">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={76}
                        height={76}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h3>{product.title}</h3>
                      <p className="product-short">{product.shortDesc}</p>
                    </div>
                  </div>

                  <div className="sound-box">
                    <span className="sound-box-label">Playlist recomendada</span>
                    <p className="sound-box-title">{sound.playlist}</p>
                    <p className="sound-box-sub">{sound.clima}</p>
                  </div>

                  <Link href={`/tienda/${product.slug}`} className="bento-link">
                    Conocer más sobre esta esencia →
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Sección Sobre Eliana & Método Musical (Verde Salvia + Fotografía Real) */}
      <section className="eliana-metodo-section" aria-labelledby="eliana-metodo-titulo">
        <div className="container eliana-metodo-grid">
          <div className="eliana-photo-col">
            <div className="eliana-photo-card">
              <Image
                src="/ritual-background.png"
                alt="Espacio terapéutico y ritual botánico de Eliana — La Magia de los Vientos"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 900px) 100vw, 480px"
              />
              <div className="eliana-photo-caption">
                <span>Conservatorio de Música de San Martín · 3 Títulos</span>
              </div>
            </div>
          </div>

          <div className="eliana-sage-card">
            <span className="sage-eyebrow">SOBRE ELIANA & MÉTODO MUSICAL</span>
            <h2 id="eliana-metodo-titulo">
              Escucha Activa, <em>Silencio</em> y Comprensión Emocional
            </h2>
            <p>
              Egresada del <strong>Conservatorio de Música de San Martín</strong> con 3 títulos académicos, Eliana trasladó la escucha fina de la música al acompañamiento terapéutico: atender tanto lo que se dice como los silencios y tensiones del cuerpo.
            </p>
            <p>
              Su metodología integra <strong>El Silencio entre Notas</strong> con el enfoque de <strong>Biodecodificación Transgeneracional (&ldquo;Comprender para Sanar&rdquo;)</strong>, Terapia Floral de Bach, Gemoterapia y Yoga, acompañando de forma respetuosa y complementaria.
            </p>

            <div className="sage-pillars">
              <span>Conservatorio de San Martín</span>
              <span>Escucha Activa</span>
              <span>El Silencio entre Notas</span>
              <span>Comprender para Sanar</span>
            </div>

            <div className="sage-actions">
              <a
                href="https://wa.me/5491149143734?text=Hola%20Eliana%2C%20conoc%C3%AD%20tu%20enfoque%20musical%20y%20terap%C3%A9utico%20y%20me%20gustar%C3%ADa%20consultar%20por%20una%20sesi%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
                className="pill-cta-bronze"
              >
                Consultar con Eliana
              </a>
              <Link href="/consultas" className="pill-cta-ivory-outline">
                Ver Sesiones
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cápsula Sonora Flotante */}
      <ModoEscuchaPlayer onPlayingChange={setAmbientActive} />

      <style jsx>{`
        .lab-page {
          background-color: #f6f3ec;
          color: #1d221f;
        }

        /* 1. Hero Dividido */
        .lab-hero {
          position: relative;
          padding: 5rem 0 5.5rem;
          background-color: #f6f3ec;
          overflow: hidden;
          border-bottom: 1px solid rgba(184, 151, 104, 0.28);
        }

        .hero-halo-top {
          position: absolute;
          top: -160px;
          right: -80px;
          width: 540px;
          height: 540px;
          background: radial-gradient(circle, rgba(184, 151, 104, 0.22) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-halo-bottom {
          position: absolute;
          bottom: -180px;
          left: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(44, 58, 51, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .lab-hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3.5rem;
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
          font-size: clamp(2.8rem, 6vw, 4.8rem);
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
          box-shadow: 0 12px 28px rgba(44, 58, 51, 0.22);
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
          background-color: rgba(184, 151, 104, 0.12);
          transform: translateY(-2px);
        }

        /* Arco Orgánico con Foto Real + Anillos SVG */
        .hero-visual-col {
          display: flex;
          justify-content: center;
        }

        .arch-frame-wrap {
          position: relative;
          width: 360px;
          height: 430px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .arch-rings-svg {
          position: absolute;
          inset: -10px;
          width: calc(100% + 20px);
          height: calc(100% + 20px);
          pointer-events: none;
          z-index: 2;
        }

        .ring {
          fill: none;
          stroke: #b89768;
          transform-origin: center;
        }

        .ring-1 {
          stroke-width: 1.4;
          opacity: 0.55;
          animation: ripplePulse 6s ease-in-out infinite;
        }

        .ring-2 {
          stroke-width: 1;
          opacity: 0.38;
          animation: ripplePulse 6s ease-in-out 1s infinite;
        }

        .ring-3 {
          stroke-width: 0.8;
          stroke-dasharray: 4 7;
          opacity: 0.35;
          animation: slowSpin 38s linear infinite;
        }

        .arch-frame-wrap.active .ring-1,
        .arch-frame-wrap.active .ring-2 {
          animation-duration: 2.6s;
          stroke: #2c3a33;
          opacity: 0.75;
        }

        @keyframes ripplePulse {
          0%,
          100% {
            transform: scale(0.97);
            opacity: 0.28;
          }
          50% {
            transform: scale(1.04);
            opacity: 0.7;
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

        .arch-photo-frame {
          position: relative;
          width: 310px;
          height: 390px;
          border-radius: 9999px 9999px 24px 24px;
          overflow: hidden;
          border: 2px solid rgba(184, 151, 104, 0.55);
          box-shadow: 0 28px 60px rgba(44, 58, 51, 0.18);
          background-color: #eae3d5;
          z-index: 1;
        }

        .arch-photo-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 55%, rgba(44, 58, 51, 0.55) 100%);
        }

        .arch-status-pill {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(246, 243, 236, 0.88);
          backdrop-filter: blur(10px);
          color: #1d221f;
          padding: 0.35rem 0.9rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 9999px;
          background-color: #b89768;
        }

        .arch-frame-wrap.active .status-dot {
          background-color: #2c3a33;
        }

        /* 3. Bento Grid */
        .bento-section {
          padding: 6.5rem 0;
          background-color: #eae3d5;
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
          color: #2c3a33;
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
          color: #4f4b45;
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
          box-shadow: 0 22px 48px rgba(44, 58, 51, 0.12);
        }

        .bento-manifesto {
          grid-column: span 7;
          background-color: #2c3a33;
          color: #f6f3ec;
          border: 1px solid rgba(184, 151, 104, 0.4);
        }

        .bento-sage {
          grid-column: span 5;
          background-color: #2c3a33;
          color: #f6f3ec;
          border: 1px solid rgba(184, 151, 104, 0.4);
        }

        .bento-cream {
          background-color: #f6f3ec;
          color: #1d221f;
          border: 1px solid rgba(184, 151, 104, 0.4);
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
          background-color: rgba(44, 58, 51, 0.1);
          color: #2c3a33;
        }

        .bento-chip.light {
          background-color: rgba(184, 151, 104, 0.22);
          color: #f6f3ec;
        }

        .bento-price {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: inherit;
        }

        .bento-manifesto h3 {
          font-family: var(--font-serif);
          font-size: 1.65rem;
          font-weight: 400;
          color: #f6f3ec;
          margin-bottom: 0.75rem;
        }

        .bento-manifesto > p {
          font-size: 0.98rem;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(246, 243, 236, 0.82);
          margin-bottom: 1.5rem;
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

        .product-thumb-row {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          margin-bottom: 1.35rem;
        }

        .product-thumb {
          width: 82px;
          height: 82px;
          flex-shrink: 0;
          border-radius: 12px;
          background-color: #ffffff;
          border: 1px solid rgba(184, 151, 104, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.35rem;
        }

        .product-thumb.dark {
          background-color: rgba(246, 243, 236, 0.1);
          border-color: rgba(184, 151, 104, 0.4);
        }

        .product-thumb-row h3 {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          font-weight: 400;
          color: inherit;
          margin-bottom: 0.3rem;
        }

        .product-short {
          font-size: 0.88rem;
          font-weight: 300;
          line-height: 1.55;
          opacity: 0.82;
        }

        .sound-box {
          background-color: #ffffff;
          border-left: 3px solid #b89768;
          border-radius: 8px;
          padding: 0.9rem 1rem;
          margin-top: auto;
          margin-bottom: 1.25rem;
        }

        .sound-box.dark {
          background-color: rgba(246, 243, 236, 0.08);
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
          opacity: 0.75;
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

        /* 4. Sobre Eliana & Método Musical */
        .eliana-metodo-section {
          padding: 6.5rem 0;
          background-color: #f6f3ec;
        }

        .eliana-metodo-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 2.5rem;
          align-items: stretch;
        }

        .eliana-photo-card {
          position: relative;
          min-height: 440px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(184, 151, 104, 0.45);
          box-shadow: 0 24px 54px rgba(44, 58, 51, 0.14);
        }

        .eliana-photo-caption {
          position: absolute;
          bottom: 1.25rem;
          left: 1.25rem;
          right: 1.25rem;
          background: rgba(44, 58, 51, 0.88);
          backdrop-filter: blur(8px);
          color: #f6f3ec;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          font-size: 0.76rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          text-align: center;
        }

        .eliana-sage-card {
          background-color: #2c3a33;
          color: #f6f3ec;
          border-radius: 20px;
          padding: 3rem 2.75rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0 24px 54px rgba(44, 58, 51, 0.16);
        }

        .sage-eyebrow {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.24em;
          color: #b89768;
          margin-bottom: 1rem;
        }

        .eliana-sage-card h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.9rem, 3.4vw, 2.55rem);
          font-weight: 400;
          color: #f6f3ec;
          line-height: 1.18;
          margin-bottom: 1.5rem;
        }

        .eliana-sage-card em {
          font-style: italic;
          color: #b89768;
        }

        .eliana-sage-card p {
          font-size: 0.98rem;
          font-weight: 300;
          color: rgba(246, 243, 236, 0.84);
          line-height: 1.8;
          margin-bottom: 1.1rem;
        }

        .eliana-sage-card strong {
          color: #f6f3ec;
          font-weight: 500;
        }

        .sage-pillars {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin: 1rem 0 2rem;
        }

        .sage-pillars span {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.38rem 0.85rem;
          border-radius: 9999px;
          border: 1px solid rgba(184, 151, 104, 0.45);
          color: #b89768;
        }

        .sage-actions {
          display: flex;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .pill-cta-bronze {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #b89768;
          color: #2c3a33;
          padding: 0.9rem 1.7rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          transition: transform 0.25s ease;
        }

        .pill-cta-bronze:hover {
          transform: translateY(-2px);
        }

        .pill-cta-ivory-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(246, 243, 236, 0.35);
          color: #f6f3ec;
          padding: 0.9rem 1.7rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          transition: border-color 0.25s ease;
        }

        .pill-cta-ivory-outline:hover {
          border-color: #b89768;
        }

        @media (max-width: 900px) {
          .lab-hero-grid,
          .eliana-metodo-grid {
            grid-template-columns: 1fr;
          }

          .lab-hero-copy {
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

          .eliana-photo-card {
            min-height: 320px;
          }

          .eliana-sage-card {
            padding: 2.25rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
