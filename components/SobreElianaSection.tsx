'use client';

import Link from 'next/link';

interface SobreElianaSectionProps {
  showConsultasLink?: boolean;
}

const PILARES = [
  {
    titulo: 'Formación Académica Musical',
    descripcion:
      'Egresada con 3 títulos del Conservatorio de Música de San Martín (escucha activa y sensibilidad vibracional).',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    titulo: 'Biodecodificación Transgeneracional',
    descripcion:
      'Acompañamiento emocional y lectura del árbol familiar bajo el método "Comprender para Sanar".',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22v-7" />
        <path d="M12 15c-4 0-6-3-6-6a6 6 0 0 1 12 0c0 3-2 6-6 6Z" />
        <path d="M9 10c1-1.5 5-1.5 6 0" />
      </svg>
    ),
  },
  {
    titulo: 'Terapias Florales y Vibracionales',
    descripcion:
      'Certificación en Sistema Floral de Bach, Gemoterapia y práctica de Yoga.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3c2.5 3.5 4 6.5 4 9a4 4 0 0 1-8 0c0-2.5 1.5-5.5 4-9Z" />
        <path d="M5 13c2.5 0 4.5 1.5 5 3.5" />
        <path d="M19 13c-2.5 0-4.5 1.5-5 3.5" />
        <path d="M12 16v5" />
      </svg>
    ),
  },
  {
    titulo: 'Conciencia Corporal y Sistema Nervioso',
    descripcion:
      'Comprensión vivencial de la relación entre emociones, sistema nervioso y tensión muscular.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12c1.5-2 2.5 2 4 0s2.5 2 4 0" />
      </svg>
    ),
  },
];

const WHATSAPP_TRAYECTORIA_URL =
  'https://wa.me/5491149143734?text=Hola%20Eliana%2C%20conoc%C3%AD%20tu%20trayectoria%20en%20la%20web%20y%20me%20gustar%C3%ADa%20consultar%20por%20una%20sesi%C3%B3n.';

export default function SobreElianaSection({
  showConsultasLink = true,
}: SobreElianaSectionProps) {
  return (
    <section className="sobre-eliana-section" aria-labelledby="sobre-eliana-titulo">
      <div className="container">
        <div className="eliana-editorial-grid">
          {/* Marco editorial para retrato */}
          <div className="eliana-portrait-col">
            <div className="portrait-frame">
              <div className="portrait-inner">
                <span className="portrait-monogram" aria-hidden="true">E</span>
                <p className="portrait-name">Eliana</p>
                <p className="portrait-role">
                  Acompañamiento en Biodecodificación y Terapias Complementarias
                </p>
                <span className="portrait-hint">Espacio reservado para retrato</span>
              </div>
              <div className="portrait-credential-tag">
                Conservatorio de San Martín · 3 Títulos
              </div>
            </div>
          </div>

          {/* Relato principal */}
          <div className="eliana-story-col">
            <span className="eliana-eyebrow">TRAYECTORIA Y ENFOQUE INTEGRATIVO</span>
            <h2 id="sobre-eliana-titulo" className="eliana-title">
              Una mirada que une la sensibilidad artística, el cuerpo y la historia emocional
            </h2>

            <div className="eliana-paragraphs">
              <p>
                <strong>La base musical y la escucha profunda:</strong> Egresada del Conservatorio de Música de San Martín con 3 títulos académicos, Eliana desarrolló durante años una escucha fina, empática y atenta a los ritmos y silencios de cada persona. Esa formación artística es el cimiento de su forma de acompañar.
              </p>
              <p>
                <strong>Camino holístico y transgeneracional:</strong> Su búsqueda por comprender el bienestar integral la llevó a certificarse en Flores de Bach, Gemoterapia y Yoga, integrando herramientas vibracionales y corporales con su formación en Biodecodificación Transgeneracional (Método &ldquo;Comprender para Sanar&rdquo;).
              </p>
              <p>
                <strong>Comprensión vivencial del cuerpo:</strong> A partir de un recorrido personal profundo y años de estudio autodidacta sobre el sistema muscular y nervioso, aporta una lectura sensible sobre cómo las tensiones y emociones no expresadas se manifiestan en el plano físico, acompañando siempre de forma respetuosa y complementaria a los tratamientos médicos.
              </p>
            </div>
          </div>
        </div>

        {/* Grid de 4 Pilares / Credenciales */}
        <div className="pilares-grid">
          {PILARES.map((pilar) => (
            <article key={pilar.titulo} className="pilar-card">
              <div className="pilar-icon">{pilar.icon}</div>
              <h3>{pilar.titulo}</h3>
              <p>{pilar.descripcion}</p>
            </article>
          ))}
        </div>

        {/* CTA sutil al pie */}
        <div className="eliana-cta-row">
          <a
            href={WHATSAPP_TRAYECTORIA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Consultar con Eliana
          </a>
          {showConsultasLink && (
            <Link href="/consultas" className="btn btn-outline">
              Ver Sesiones y Enfoque
            </Link>
          )}
        </div>
      </div>

      <style jsx>{`
        .sobre-eliana-section {
          padding: 7rem 0;
          background-color: var(--color-secondary);
          border-top: 1px solid var(--color-secondary-dark);
          border-bottom: 1px solid var(--color-secondary-dark);
        }

        .eliana-editorial-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 4.5rem;
          align-items: center;
          margin-bottom: 4.5rem;
        }

        .portrait-frame {
          position: relative;
          aspect-ratio: 4 / 5;
          background-color: var(--background);
          border: 1px solid var(--color-earth-light);
          border-radius: var(--radius);
          padding: 1.5rem;
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .portrait-inner {
          width: 100%;
          height: 100%;
          border: 1px solid rgba(197, 160, 89, 0.45);
          border-radius: var(--radius);
          background: linear-gradient(160deg, var(--color-secondary) 0%, var(--color-secondary-dark) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
        }

        .portrait-monogram {
          font-family: var(--font-serif);
          font-size: 4rem;
          line-height: 1;
          color: var(--color-primary);
          margin-bottom: 1rem;
          font-weight: 400;
        }

        .portrait-name {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: var(--foreground);
          margin-bottom: 0.45rem;
        }

        .portrait-role {
          font-size: 0.88rem;
          color: var(--color-earth);
          line-height: 1.55;
          max-width: 240px;
          margin-bottom: 1.5rem;
        }

        .portrait-hint {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--color-earth);
          opacity: 0.7;
          border-top: 1px solid var(--color-earth-light);
          padding-top: 0.75rem;
        }

        .portrait-credential-tag {
          position: absolute;
          bottom: -14px;
          right: 1.5rem;
          background-color: var(--color-primary);
          color: var(--color-secondary);
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          padding: 0.5rem 1rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
        }

        .eliana-eyebrow {
          display: block;
          font-family: var(--font-main);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--color-accent-dark);
          margin-bottom: 1.15rem;
        }

        .eliana-title {
          font-family: var(--font-serif);
          font-size: clamp(1.85rem, 3.6vw, 2.55rem);
          font-weight: 400;
          line-height: 1.2;
          color: var(--foreground);
          margin-bottom: 2rem;
        }

        .eliana-paragraphs {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .eliana-paragraphs p {
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.8;
          color: var(--foreground);
        }

        .eliana-paragraphs strong {
          font-weight: 500;
          color: var(--color-primary);
        }

        .pilares-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 3.5rem;
        }

        .pilar-card {
          background-color: var(--background);
          border: 1px solid var(--color-earth-light);
          border-top: 2px solid var(--color-accent);
          border-radius: var(--radius);
          padding: 1.75rem 1.5rem;
          box-shadow: var(--shadow-sm);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .pilar-card:hover {
          transform: translateY(-4px);
          border-color: var(--color-primary);
        }

        .pilar-icon {
          color: var(--color-primary);
          margin-bottom: 1rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius);
          background-color: var(--color-secondary);
          border: 1px solid var(--color-secondary-dark);
        }

        .pilar-card h3 {
          font-family: var(--font-serif);
          font-size: 1.12rem;
          font-weight: 400;
          color: var(--foreground);
          margin-bottom: 0.65rem;
          line-height: 1.3;
        }

        .pilar-card p {
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.65;
          color: var(--color-earth);
        }

        .eliana-cta-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 960px) {
          .eliana-editorial-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .portrait-frame {
            max-width: 360px;
            margin: 0 auto;
          }

          .pilares-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .sobre-eliana-section {
            padding: 4.5rem 0;
          }

          .pilares-grid {
            grid-template-columns: 1fr;
          }

          .eliana-cta-row {
            flex-direction: column;
          }

          .eliana-cta-row .btn {
            width: 100%;
          }

          .portrait-credential-tag {
            right: auto;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
            font-size: 0.65rem;
          }
        }
      `}</style>
    </section>
  );
}
