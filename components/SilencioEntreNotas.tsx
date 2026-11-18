'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AmbientSoundEngine, SoundMood } from '@/lib/ambient-audio';

interface EstadoOption {
  id: Exclude<SoundMood, 'ambient'>;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  climaSonoro: string;
  preguntaIndagacion: string;
  preparadoNombre: string;
  preparadoSlug: string;
  preparadoFormula: string;
}

const ESTADOS: EstadoOption[] = [
  {
    id: 'ruido-mental',
    titulo: 'Ruido mental',
    subtitulo: 'Pensamiento circular',
    descripcion: 'Hiperexigencia, diálogo interno constante o dificultad para aquietar la mente.',
    climaSonoro: 'Armónicos graves en Sol abierto · Enraizamiento y pausa',
    preguntaIndagacion:
      '¿Qué conversación pendiente o exigencia estás intentando resolver en tu mente ahora mismo, cuando en realidad necesita pausa?',
    preparadoNombre: 'Calma Total',
    preparadoSlug: 'calma-total',
    preparadoFormula: 'White Chestnut + Agrimony + Impatiens + Red Chestnut',
  },
  {
    id: 'tension',
    titulo: 'Tensión',
    subtitulo: 'Cuerpo en alerta',
    descripcion: 'Rigidez en hombros o mandíbula, urgencia interna o sensación de sobrecarga.',
    climaSonoro: 'Acorde cálido en La suspendido · Distensión y respiración',
    preguntaIndagacion:
      '¿De qué situación o responsabilidad sentís que tenés que hacerte cargo en este instante, y qué pasaría si soltaras el control por un minuto?',
    preparadoNombre: 'SOS Rescate',
    preparadoSlug: 'sos-rescate',
    preparadoFormula: 'Star of Bethlehem + Rock Rose + Impatiens + Cherry Plum + Clematis',
  },
  {
    id: 'desanimo',
    titulo: 'Desánimo',
    subtitulo: 'Pulso apagado',
    descripcion: 'Cansancio emocional, apatía o desconexión temporal con tu impulso vital.',
    climaSonoro: 'Intervalos abiertos en Fa mayor 7 · Luminosidad serena',
    preguntaIndagacion:
      '¿En qué momento reciente dejaste de escuchar tu propio deseo para priorizar únicamente lo que sentías que "había que hacer"?',
    preparadoNombre: 'Ánimo & Vitalidad',
    preparadoSlug: 'animo-y-vitalidad',
    preparadoFormula: 'Gentian + Gorse + Wild Rose + Mustard',
  },
];

const TOTAL_SECONDS = 60;

export default function SilencioEntreNotas() {
  const [selectedId, setSelectedId] = useState<EstadoOption['id'] | null>(null);
  const [phase, setPhase] = useState<'select' | 'running' | 'complete'>('select');
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [isPaused, setIsPaused] = useState(false);

  const engineRef = useRef<AmbientSoundEngine | null>(null);

  useEffect(() => {
    engineRef.current = new AmbientSoundEngine();
    return () => {
      engineRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    if (phase !== 'running' || isPaused) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          engineRef.current?.stop();
          setPhase('complete');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, isPaused]);

  const selectedEstado = ESTADOS.find((e) => e.id === selectedId) || null;

  const startPause = (id: EstadoOption['id']) => {
    setSelectedId(id);
    setSecondsLeft(TOTAL_SECONDS);
    setIsPaused(false);
    setPhase('running');
    engineRef.current?.start(id, 0.35);
  };

  const togglePause = () => {
    if (!selectedId) return;
    if (isPaused) {
      engineRef.current?.start(selectedId, 0.35);
      setIsPaused(false);
    } else {
      engineRef.current?.stop();
      setIsPaused(true);
    }
  };

  const completeNow = () => {
    engineRef.current?.stop();
    setPhase('complete');
  };

  const resetModule = () => {
    engineRef.current?.stop();
    setPhase('select');
    setSelectedId(null);
    setSecondsLeft(TOTAL_SECONDS);
    setIsPaused(false);
  };

  const progress = ((TOTAL_SECONDS - secondsLeft) / TOTAL_SECONDS) * 100;
  const circumference = 2 * Math.PI * 82;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const breathCue =
    secondsLeft % 12 >= 8
      ? 'Inhalá lento, abriendo el pecho...'
      : secondsLeft % 12 >= 4
      ? 'Sostené el silencio entre notas...'
      : 'Exhalá largo y soltá el peso...';

  return (
    <section className="silencio-section" aria-labelledby="silencio-titulo">
      <div className="silencio-halo" aria-hidden="true" />
      <div className="container">
        <div className="silencio-sanctuary">
          <div className="silencio-header">
            <span className="silencio-eyebrow">PAUSA SENSORIAL · 60 SEGUNDOS</span>
            <h2 id="silencio-titulo">
              El <em>Silencio</em> entre Notas
            </h2>
            <p className="silencio-lead">
              Antes de buscar respuestas afuera, escuchá cómo suena tu cuerpo hoy. Elegí tu estado actual para iniciar una pausa acústica de un minuto.
            </p>
          </div>

          {phase === 'select' && (
            <div className="estados-grid">
              {ESTADOS.map((estado, idx) => (
                <button
                  key={estado.id}
                  type="button"
                  onClick={() => startPause(estado.id)}
                  className="estado-card"
                >
                  <div className="estado-top">
                    <span className="estado-num">0{idx + 1}</span>
                    <span className="estado-sub">{estado.subtitulo}</span>
                  </div>
                  <h3>{estado.titulo}</h3>
                  <p>{estado.descripcion}</p>
                  <span className="estado-action">Iniciar pausa de 60s →</span>
                </button>
              ))}
            </div>
          )}

          {phase === 'running' && selectedEstado && (
            <div className="breathing-stage" aria-live="polite">
              <div className={`organic-orb-wrap ${isPaused ? 'paused' : ''}`}>
                <div className="orb-aura" />
                <div className="orb-core" />
                <svg className="orb-progress-svg" viewBox="0 0 180 180" width="220" height="220">
                  <circle
                    cx="90"
                    cy="90"
                    r="82"
                    fill="none"
                    stroke="rgba(246, 243, 236, 0.14)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="90"
                    cy="90"
                    r="82"
                    fill="none"
                    stroke="#B89768"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 90 90)"
                  />
                </svg>
                <div className="orb-readout">
                  <span className="orb-time">
                    0:{secondsLeft.toString().padStart(2, '0')}
                  </span>
                  <span className="orb-state">{selectedEstado.titulo}</span>
                </div>
              </div>

              <p className="poetic-breath">
                {isPaused ? 'En quietud voluntaria' : breathCue}
              </p>
              <p className="mood-caption">{selectedEstado.climaSonoro}</p>

              <div className="timer-controls">
                <button type="button" onClick={togglePause} className="pill-btn-light">
                  {isPaused ? 'Reanudar' : 'Pausar'}
                </button>
                <button type="button" onClick={completeNow} className="pill-btn-accent">
                  Ir a la receta editorial
                </button>
                <button type="button" onClick={resetModule} className="pill-btn-light">
                  Cambiar estado
                </button>
              </div>
            </div>
          )}

          {phase === 'complete' && selectedEstado && (
            <div className="receta-editorial" aria-live="polite">
              <div className="receta-header">
                <span className="receta-rx">Rx · Comprender para Sanar</span>
                <span className="receta-estado">{selectedEstado.titulo}</span>
              </div>

              <blockquote className="receta-question">
                &ldquo;{selectedEstado.preguntaIndagacion}&rdquo;
              </blockquote>

              <div className="receta-divider" />

              <div className="receta-footer">
                <div className="receta-prep-info">
                  <span className="receta-kicker">Preparado Floral Sugerido</span>
                  <h3>{selectedEstado.preparadoNombre}</h3>
                  <p className="receta-formula">{selectedEstado.preparadoFormula}</p>
                </div>
                <Link
                  href={`/tienda/${selectedEstado.preparadoSlug}`}
                  className="receta-cta"
                >
                  Explorar Fórmula ($20.000)
                </Link>
              </div>

              <button type="button" onClick={resetModule} className="receta-reset">
                Realizar otra pausa sonora
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .silencio-section {
          position: relative;
          padding: 5.5rem 0;
          background-color: #2c3a33;
          color: #f6f3ec;
          overflow: hidden;
        }

        .silencio-halo {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 780px;
          height: 780px;
          background: radial-gradient(circle, rgba(184, 151, 104, 0.16) 0%, transparent 65%);
          pointer-events: none;
        }

        .silencio-sanctuary {
          position: relative;
          z-index: 1;
          max-width: 960px;
          margin: 0 auto;
        }

        .silencio-header {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 3.25rem;
        }

        .silencio-eyebrow {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.28em;
          color: #b89768;
          margin-bottom: 1rem;
        }

        .silencio-header h2 {
          font-family: var(--font-serif);
          font-size: clamp(2.1rem, 4.5vw, 3.2rem);
          font-weight: 400;
          color: #f6f3ec;
          margin-bottom: 1rem;
          line-height: 1.15;
        }

        .silencio-header em {
          font-style: italic;
          color: #b89768;
        }

        .silencio-lead {
          font-size: 1.02rem;
          font-weight: 300;
          color: rgba(246, 243, 236, 0.78);
          line-height: 1.8;
        }

        .estados-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.35rem;
        }

        .estado-card {
          text-align: left;
          background: rgba(246, 243, 236, 0.04);
          border: 1px solid rgba(184, 151, 104, 0.3);
          border-radius: 16px;
          padding: 2rem 1.65rem;
          color: #f6f3ec;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .estado-card:hover {
          background: rgba(246, 243, 236, 0.09);
          border-color: #b89768;
          transform: translateY(-4px);
        }

        .estado-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.15rem;
        }

        .estado-num {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          color: #b89768;
        }

        .estado-sub {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: rgba(246, 243, 236, 0.6);
        }

        .estado-card h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 400;
          color: #f6f3ec;
          margin-bottom: 0.65rem;
        }

        .estado-card p {
          font-size: 0.92rem;
          font-weight: 300;
          color: rgba(246, 243, 236, 0.72);
          line-height: 1.65;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .estado-action {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #b89768;
          font-weight: 600;
        }

        /* Breathing Stage */
        .breathing-stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1rem 0 0.5rem;
        }

        .organic-orb-wrap {
          position: relative;
          width: 220px;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.75rem;
        }

        .orb-aura {
          position: absolute;
          width: 150px;
          height: 150px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(184, 151, 104, 0.38) 0%, rgba(184, 151, 104, 0.05) 70%);
          animation: breathCycle 12s ease-in-out infinite;
        }

        .orb-core {
          position: absolute;
          width: 112px;
          height: 112px;
          border-radius: 9999px;
          border: 1px solid rgba(184, 151, 104, 0.55);
          background: rgba(246, 243, 236, 0.05);
          animation: breathCycle 12s ease-in-out infinite;
        }

        .organic-orb-wrap.paused .orb-aura,
        .organic-orb-wrap.paused .orb-core {
          animation-play-state: paused;
        }

        @keyframes breathCycle {
          0%,
          100% {
            transform: scale(0.86);
            opacity: 0.75;
          }
          33% {
            transform: scale(1.16);
            opacity: 1;
          }
          66% {
            transform: scale(1.16);
            opacity: 0.95;
          }
        }

        .orb-progress-svg {
          position: relative;
          z-index: 2;
        }

        .orb-readout {
          position: absolute;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .orb-time {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          color: #f6f3ec;
          line-height: 1;
        }

        .orb-state {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #b89768;
          margin-top: 0.35rem;
        }

        .poetic-breath {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.45rem;
          color: #f6f3ec;
          margin-bottom: 0.45rem;
        }

        .mood-caption {
          font-size: 0.85rem;
          color: rgba(246, 243, 236, 0.62);
          margin-bottom: 2rem;
        }

        .timer-controls {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .pill-btn-light {
          background: transparent;
          border: 1px solid rgba(246, 243, 236, 0.32);
          border-radius: 9999px;
          padding: 0.65rem 1.35rem;
          color: #f6f3ec;
          font-family: var(--font-main);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .pill-btn-light:hover {
          border-color: #b89768;
          color: #b89768;
        }

        .pill-btn-accent {
          background-color: #b89768;
          border: 1px solid #b89768;
          border-radius: 9999px;
          padding: 0.65rem 1.45rem;
          color: #2c3a33;
          font-family: var(--font-main);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          cursor: pointer;
          transition: transform 0.25s ease;
        }

        .pill-btn-accent:hover {
          transform: translateY(-2px);
        }

        /* Receta Editorial */
        .receta-editorial {
          max-width: 700px;
          margin: 0 auto;
          background-color: #f6f3ec;
          color: #1d221f;
          border: 1px solid #b89768;
          border-radius: 16px;
          padding: 2.5rem 2.25rem;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.28);
          text-align: center;
        }

        .receta-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
        }

        .receta-rx {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #2c3a33;
        }

        .receta-estado {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          padding: 0.25rem 0.8rem;
          border-radius: 9999px;
          background-color: rgba(184, 151, 104, 0.2);
          color: #2c3a33;
          font-weight: 600;
        }

        .receta-question {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: clamp(1.3rem, 3vw, 1.7rem);
          line-height: 1.5;
          color: #1d221f;
          margin-bottom: 1.75rem;
        }

        .receta-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #b89768, transparent);
          margin-bottom: 1.75rem;
        }

        .receta-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.25rem;
          text-align: left;
          margin-bottom: 1.5rem;
        }

        .receta-kicker {
          display: block;
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #b89768;
          font-weight: 700;
          margin-bottom: 0.3rem;
        }

        .receta-prep-info h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: #2c3a33;
          margin-bottom: 0.25rem;
        }

        .receta-formula {
          font-size: 0.85rem;
          color: #7a746e;
        }

        .receta-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #2c3a33;
          color: #f6f3ec;
          padding: 0.9rem 1.6rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          white-space: nowrap;
          transition: transform 0.25s ease;
        }

        .receta-cta:hover {
          transform: translateY(-2px);
        }

        .receta-reset {
          background: none;
          border: none;
          font-family: var(--font-main);
          font-size: 0.82rem;
          color: #7a746e;
          text-decoration: underline;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .estados-grid {
            grid-template-columns: 1fr;
          }

          .receta-editorial {
            padding: 2rem 1.35rem;
          }

          .receta-footer {
            flex-direction: column;
            align-items: flex-start;
          }

          .receta-cta {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
