'use client';

import { useEffect, useState } from 'react';
import { LIBRETA_STORAGE_KEY, MapaNatalCalculado } from '@/components/AfinadorSintonia';

interface SintomaEntry {
  id: string;
  fecha: string;
  manifestacion: string;
  comprension: string;
  deseo: string;
}

interface LibretaData {
  mapaNatal?: MapaNatalCalculado & { estadoReciente?: string };
  arbol: {
    madre: string;
    padre: string;
    abuelos: string;
    fechasRepeticiones: string;
  };
  sintomas: SintomaEntry[];
  vibracional: {
    floresEnUso: string;
    musicaApoyo: string;
    gemasRituales: string;
  };
}

const DEFAULT_LIBRETA: LibretaData = {
  arbol: {
    madre: '',
    padre: '',
    abuelos: '',
    fechasRepeticiones: '',
  },
  sintomas: [],
  vibracional: {
    floresEnUso: '',
    musicaApoyo: '',
    gemasRituales: '',
  },
};

export default function LibretaEvolucion() {
  const [libreta, setLibreta] = useState<LibretaData>(DEFAULT_LIBRETA);
  const [loaded, setLoaded] = useState(false);

  // Formulario de nueva entrada en Bloque 3
  const [nuevaFecha, setNuevaFecha] = useState(() => new Date().toISOString().slice(0, 10));
  const [nuevaManif, setNuevaManif] = useState('');
  const [nuevaComp, setNuevaComp] = useState('');
  const [nuevoDeseo, setNuevoDeseo] = useState('');

  const loadFromStorage = () => {
    try {
      const raw = localStorage.getItem(LIBRETA_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<LibretaData>;
        setLibreta({
          mapaNatal: parsed.mapaNatal,
          arbol: { ...DEFAULT_LIBRETA.arbol, ...(parsed.arbol || {}) },
          sintomas: Array.isArray(parsed.sintomas) ? parsed.sintomas : [],
          vibracional: { ...DEFAULT_LIBRETA.vibracional, ...(parsed.vibracional || {}) },
        });
      }
    } catch {
      // Ignorar si localStorage no está disponible
    }
    setLoaded(true);
  };

  useEffect(() => {
    loadFromStorage();
    const handler = () => loadFromStorage();
    window.addEventListener('lamagia:libreta-updated', handler);
    return () => window.removeEventListener('lamagia:libreta-updated', handler);
  }, []);

  const saveLibreta = (next: LibretaData) => {
    setLibreta(next);
    try {
      localStorage.setItem(LIBRETA_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignorar
    }
  };

  const handleAddSintoma = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaManif.trim()) return;

    const entry: SintomaEntry = {
      id: `${Date.now()}`,
      fecha: nuevaFecha || new Date().toISOString().slice(0, 10),
      manifestacion: nuevaManif.trim(),
      comprension: nuevaComp.trim(),
      deseo: nuevoDeseo.trim(),
    };

    saveLibreta({
      ...libreta,
      sintomas: [entry, ...libreta.sintomas],
    });
    setNuevaManif('');
    setNuevaComp('');
    setNuevoDeseo('');
  };

  const handleRemoveSintoma = (id: string) => {
    saveLibreta({
      ...libreta,
      sintomas: libreta.sintomas.filter((s) => s.id !== id),
    });
  };

  return (
    <section
      id="libreta-evolucion"
      className="libreta-section"
      aria-labelledby="libreta-titulo"
    >
      <div className="container libreta-container">
        <header className="libreta-header">
          <span className="libreta-eyebrow">ESPACIO PRIVADO EN TU NAVEGADOR</span>
          <h2 id="libreta-titulo">
            Libreta Personal de <em>Sintonía y Evolución</em>
          </h2>
          <p className="libreta-lead">
            Tus notas se guardan únicamente en este dispositivo. Podés imprimir o guardar tu libreta en PDF para traerla a consulta si decidís agendar una sesión.
          </p>
          <div className="libreta-top-actions no-print">
            <button
              type="button"
              onClick={() => window.print()}
              className="btn-print-libreta"
            >
              Imprimir / Guardar Libreta en PDF
            </button>
          </div>
        </header>

        {loaded && (
          <div className="libreta-grid">
            {/* BLOQUE 1: MI MAPA NATAL & CICLOS */}
            <article className="libreta-card libreta-card-sage">
              <div className="card-head">
                <span className="block-num">01</span>
                <h3>Mi Mapa Natal &amp; Ciclos</h3>
              </div>

              {libreta.mapaNatal ? (
                <div className="mapa-grid">
                  <div>
                    <span className="m-label">Nombre</span>
                    <span className="m-val">{libreta.mapaNatal.nombre}</span>
                  </div>
                  <div>
                    <span className="m-label">Arquetipo &amp; Semitono</span>
                    <span className="m-val">
                      {libreta.mapaNatal.florNatal} · {libreta.mapaNatal.semitono}
                    </span>
                  </div>
                  <div>
                    <span className="m-label">Ciclo Actual</span>
                    <span className="m-val">{libreta.mapaNatal.cicloActual}</span>
                  </div>
                  <div>
                    <span className="m-label">Proyecto Sentido (9m)</span>
                    <span className="m-val">{libreta.mapaNatal.proyectoSentido}</span>
                  </div>
                  <div className="mapa-full">
                    <span className="m-label">Edades Espejo / Aniversario</span>
                    <span className="m-val">{libreta.mapaNatal.edadesEspejo}</span>
                  </div>
                </div>
              ) : (
                <p className="empty-hint">
                  Completá el Paso 1 del Afinador arriba para calcular y guardar automáticamente tu Mapa Natal y tus ciclos.
                </p>
              )}
            </article>

            {/* BLOQUE 2: ÁRBOL GENEALÓGICO & HISTORIAL FAMILIAR */}
            <article className="libreta-card">
              <div className="card-head">
                <span className="block-num">02</span>
                <h3>Árbol Genealógico &amp; Historial Familiar</h3>
              </div>
              <div className="fields-stack">
                <div className="field-group">
                  <label htmlFor="arbol-madre">Madre / Rama materna (nombre, fechas, historia)</label>
                  <input
                    id="arbol-madre"
                    type="text"
                    placeholder="Ej: Nacimiento, profesión, eventos significativos..."
                    value={libreta.arbol.madre}
                    onChange={(e) =>
                      saveLibreta({
                        ...libreta,
                        arbol: { ...libreta.arbol, madre: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="arbol-padre">Padre / Rama paterna (nombre, fechas, historia)</label>
                  <input
                    id="arbol-padre"
                    type="text"
                    placeholder="Ej: Nacimiento, profesión, eventos significativos..."
                    value={libreta.arbol.padre}
                    onChange={(e) =>
                      saveLibreta({
                        ...libreta,
                        arbol: { ...libreta.arbol, padre: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="arbol-abuelos">Abuelos / Ancestros relevantes</label>
                  <textarea
                    id="arbol-abuelos"
                    rows={2}
                    placeholder="Migraciones, duelos no resueltos, nombres repetidos..."
                    value={libreta.arbol.abuelos}
                    onChange={(e) =>
                      saveLibreta({
                        ...libreta,
                        arbol: { ...libreta.arbol, abuelos: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="arbol-fechas">Fechas clave y repeticiones familiares</label>
                  <textarea
                    id="arbol-fechas"
                    rows={2}
                    placeholder="Coincidencias de fechas, edades de quiebre o mandatos familiares..."
                    value={libreta.arbol.fechasRepeticiones}
                    onChange={(e) =>
                      saveLibreta({
                        ...libreta,
                        arbol: { ...libreta.arbol, fechasRepeticiones: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </article>

            {/* BLOQUE 3: REGISTRO DE SÍNTOMAS, EMOCIONES Y DESEOS */}
            <article className="libreta-card">
              <div className="card-head">
                <span className="block-num">03</span>
                <h3>Registro de Síntomas, Emociones y Deseos</h3>
              </div>

              <form onSubmit={handleAddSintoma} className="sintoma-form no-print">
                <div className="sintoma-row">
                  <input
                    type="date"
                    aria-label="Fecha del registro"
                    value={nuevaFecha}
                    onChange={(e) => setNuevaFecha(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Manifestación física o emocional *"
                    value={nuevaManif}
                    onChange={(e) => setNuevaManif(e.target.value)}
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Comprensión asociada (¿qué situación lo detonó?)"
                  value={nuevaComp}
                  onChange={(e) => setNuevaComp(e.target.value)}
                />
                <div className="sintoma-submit-row">
                  <input
                    type="text"
                    placeholder="Deseo o intención para transformar"
                    value={nuevoDeseo}
                    onChange={(e) => setNuevoDeseo(e.target.value)}
                  />
                  <button type="submit" className="btn-add-entry">
                    Agregar entrada
                  </button>
                </div>
              </form>

              {libreta.sintomas.length > 0 ? (
                <ul className="sintomas-list">
                  {libreta.sintomas.map((item) => (
                    <li key={item.id} className="sintoma-item">
                      <div className="sintoma-item-top">
                        <span className="sintoma-date">{item.fecha}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSintoma(item.id)}
                          className="remove-entry no-print"
                        >
                          Quitar
                        </button>
                      </div>
                      <p className="sintoma-manif">{item.manifestacion}</p>
                      {item.comprension && (
                        <p className="sintoma-meta">
                          <strong>Comprensión:</strong> {item.comprension}
                        </p>
                      )}
                      {item.deseo && (
                        <p className="sintoma-meta">
                          <strong>Deseo / Intención:</strong> {item.deseo}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-hint">
                  Todavía no registraste entradas. Usá este diario para notar cómo responde tu cuerpo.
                </p>
              )}
            </article>

            {/* BLOQUE 4: BITÁCORA VIBRACIONAL */}
            <article className="libreta-card">
              <div className="card-head">
                <span className="block-num">04</span>
                <h3>Bitácora Vibracional (Flores, Música y Gemas)</h3>
              </div>
              <div className="fields-stack">
                <div className="field-group">
                  <label htmlFor="vib-flores">Esencias florales en uso</label>
                  <input
                    id="vib-flores"
                    type="text"
                    placeholder="Ej: Calma Total / White Chestnut + Impatiens"
                    value={libreta.vibracional.floresEnUso}
                    onChange={(e) =>
                      saveLibreta({
                        ...libreta,
                        vibracional: { ...libreta.vibracional, floresEnUso: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="vib-musica">Atmósferas y piezas musicales de apoyo</label>
                  <input
                    id="vib-musica"
                    type="text"
                    placeholder="Ej: Handpan en Re menor, Adagio 60 BPM..."
                    value={libreta.vibracional.musicaApoyo}
                    onChange={(e) =>
                      saveLibreta({
                        ...libreta,
                        vibracional: { ...libreta.vibracional, musicaApoyo: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="vib-gemas">Gemas y prácticas corporales / respiración</label>
                  <textarea
                    id="vib-gemas"
                    rows={2}
                    placeholder="Ej: Amatista, respiración 4-4-4 antes de dormir..."
                    value={libreta.vibracional.gemasRituales}
                    onChange={(e) =>
                      saveLibreta({
                        ...libreta,
                        vibracional: { ...libreta.vibracional, gemasRituales: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </article>
          </div>
        )}
      </div>

      <style jsx>{`
        .libreta-section {
          padding: 6rem 0;
          background-color: #f6f3ec;
          border-top: 1px solid rgba(184, 151, 104, 0.28);
        }

        .libreta-container {
          max-width: 1020px;
        }

        .libreta-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 3.25rem;
        }

        .libreta-eyebrow {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.26em;
          color: #b89768;
          margin-bottom: 0.9rem;
        }

        .libreta-header h2 {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 2.85rem);
          font-weight: 400;
          color: #1d221f;
          margin-bottom: 0.9rem;
        }

        .libreta-header em {
          font-style: italic;
          color: #2c3a33;
        }

        .libreta-lead {
          font-size: 0.98rem;
          font-weight: 300;
          color: #5c5852;
          line-height: 1.75;
          margin-bottom: 1.5rem;
        }

        .btn-print-libreta {
          background-color: #2c3a33;
          color: #f6f3ec;
          border: none;
          border-radius: 9999px;
          padding: 0.85rem 1.75rem;
          font-family: var(--font-main);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          cursor: pointer;
        }

        .libreta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .libreta-card {
          background-color: #ffffff;
          border: 1px solid rgba(184, 151, 104, 0.35);
          border-radius: 16px;
          padding: 1.85rem;
        }

        .libreta-card-sage {
          background-color: #2c3a33;
          color: #f6f3ec;
        }

        .card-head {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1.35rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid rgba(184, 151, 104, 0.3);
        }

        .block-num {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: #b89768;
        }

        .card-head h3 {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 400;
          color: inherit;
        }

        .mapa-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .mapa-full {
          grid-column: 1 / -1;
        }

        .m-label {
          display: block;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #b89768;
          font-weight: 700;
          margin-bottom: 0.2rem;
        }

        .m-val {
          font-size: 0.9rem;
          color: #f6f3ec;
          line-height: 1.45;
        }

        .empty-hint {
          font-size: 0.9rem;
          opacity: 0.78;
          line-height: 1.6;
        }

        .fields-stack {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .field-group label {
          font-size: 0.82rem;
          font-weight: 500;
          color: #2c3a33;
        }

        input[type='text'],
        input[type='date'],
        textarea {
          width: 100%;
          padding: 0.65rem 0.85rem;
          border-radius: 8px;
          border: 1px solid rgba(184, 151, 104, 0.4);
          background-color: #f6f3ec;
          color: #1d221f;
          font-family: var(--font-main);
          font-size: 0.9rem;
          font-weight: 300;
        }

        .sintoma-form {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 1.25rem;
        }

        .sintoma-row,
        .sintoma-submit-row {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 0.6rem;
        }

        .btn-add-entry {
          background-color: #2c3a33;
          color: #f6f3ec;
          border: none;
          border-radius: 8px;
          padding: 0.65rem 1rem;
          font-family: var(--font-main);
          font-size: 0.76rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
        }

        .sintomas-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 290px;
          overflow-y: auto;
        }

        .sintoma-item {
          background-color: #f6f3ec;
          border-left: 3px solid #b89768;
          border-radius: 8px;
          padding: 0.85rem 1rem;
        }

        .sintoma-item-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.35rem;
        }

        .sintoma-date {
          font-size: 0.72rem;
          font-weight: 700;
          color: #2c3a33;
        }

        .remove-entry {
          background: none;
          border: none;
          font-size: 0.72rem;
          color: #7a746e;
          text-decoration: underline;
          cursor: pointer;
        }

        .sintoma-manif {
          font-size: 0.92rem;
          font-weight: 500;
          color: #1d221f;
          margin-bottom: 0.25rem;
        }

        .sintoma-meta {
          font-size: 0.82rem;
          color: #5c5852;
        }

        @media (max-width: 860px) {
          .libreta-grid,
          .mapa-grid,
          .sintoma-row,
          .sintoma-submit-row {
            grid-template-columns: 1fr;
          }
        }

        @media print {
          :global(nav.navbar),
          :global(footer),
          :global(.whatsapp-float),
          :global(.capsula-wrap),
          .no-print {
            display: none !important;
          }

          .libreta-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
