'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AmbientSoundEngine, SoundMood } from '@/lib/ambient-audio';

interface EstadoOption {
  id: Exclude<SoundMood, 'ambient'>;
  titulo: string;
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
    descripcion: 'Pensamiento circular, hiperexigencia o dificultad para desconectar.',
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
    descripcion: 'Rigidez en hombros o cuello, estado de alerta o sensación de urgencia.',
    climaSonoro: 'Acorde cálido en La suspendido · Distensión muscular y respiración',
    preguntaIndagacion:
      '¿De qué situación o responsabilidad sentís que tenés que hacerte cargo en este instante, y qué pasaría si soltaras el control por un minuto?',
    preparadoNombre: 'SOS Rescate',
    preparadoSlug: 'sos-rescate',
    preparadoFormula: 'Star of Bethlehem + Rock Rose + Impatiens + Cherry Plum + Clematis',
  },
  {
    id: 'desanimo',
    titulo: 'Desánimo',
    descripcion: 'Cansancio emocional, apatía o pérdida temporal de impulso vital.',
    climaSonoro: 'Intervalos abiertos en Fa mayor 7 · Apertura y calidez serena',
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
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const breathCue =
    secondsLeft % 12 >= 8
      ? 'Inhalá lento por la nariz...'
      : secondsLeft % 12 >= 4
      ? 'Sostené el aire con suavidad...'
      : 'Exhalá despacio y soltá los hombros...';

  return (
    <section className="silencio-section" aria-labelledby="silencio-titulo">
      <div className="container">
        <div className="silencio-card">
          <div className="silencio-header">
            <span className="silencio-eyebrow">EXPERIENCIA INTERACTIVA · 60 SEGUNDOS</span>
            <h2 id="silencio-titulo">El Silencio entre Notas</h2>
            <p className="silencio-lead">
              Elegí cómo se siente tu sistema nervioso hoy. Regalate una pausa sonora de un minuto antes de pasar a la palabra.
            </p>
          </div>

          {phase === 'select' && (
            <div className="estados-grid">
              {ESTADOS.map((estado) => (
                <button
                  key={estado.id}
                  type="button"
                  onClick={() => startPause(estado.id)}
                  className="estado-btn"
                >
                  <span className="estado-tag">Pausa de 60s</span>
                  <h3>{estado.titulo}</h3>
                  <p>{estado.descripcion}</p>
                  <span className="estado-cta">Iniciar escucha →</span>
                </button>
              ))}
            </div>
          )}

          {phase === 'running' && selectedEstado && (
            <div className="timer-stage" aria-live="polite">
              <div className="timer-ring-wrap">
                <svg className="timer-svg" viewBox="0 0 128 128" width="160" height="160">
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    fill="none"
                    stroke="rgba(255,255,255,0.16)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 64 64)"
                  />
                </svg>
                <div className="timer-readout">
                  <span className="timer-seconds">
                    0:{secondsLeft.toString().padStart(2, '0')}
                  </span>
                  <span className="timer-state-name">{selectedEstado.titulo}</span>
                </div>
              </div>

              <p className="breath-cue">{isPaused ? 'Pausa en silencio' : breathCue}</p>
              <p className="sound-mood-caption">{selectedEstado.climaSonoro}</p>

              <div className="timer-controls">
                <button type="button" onClick={togglePause} className="btn-ghost-light">
                  {isPaused ? 'Reanudar audio' : 'Pausar'}
                </button>
                <button type="button" onClick={completeNow} className="btn-ghost-light">
                  Ir a la reflexión
                </button>
                <button type="button" onClick={resetModule} className="btn-ghost-light">
                  Cambiar estado
                </button>
              </div>
            </div>
          )}

          {phase === 'complete' && selectedEstado && (
            <div className="reflection-stage" aria-live="polite">
              <span className="reflection-badge">Enfoque &ldquo;Comprender para Sanar&rdquo;</span>
              <blockquote className="reflection-question">
                &ldquo;{selectedEstado.preguntaIndagacion}&rdquo;
              </blockquote>

              <div className="suggested-prep-box">
                <div>
                  <span className="prep-kicker">Preparado floral sugerido · {selectedEstado.titulo}</span>
                  <h3>{selectedEstado.preparadoNombre}</h3>
                  <p className="prep-formula">{selectedEstado.preparadoFormula}</p>
                </div>
                <div className="prep-actions">
                  <Link
                    href={`/tienda/${selectedEstado.preparadoSlug}`}
                    className="btn-accent-solid"
                  >
                    Ver Preparado ($20.000)
                  </Link>
                </div>
              </div>

              <button type="button" onClick={resetModule} className="reset-link">
                Realizar otra pausa sonora
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .silencio-section {
          padding: 5.5rem 0;
          background-color: var(--background);
        }

        .silencio-card {
          background-color: var(--color-primary);
          color: var(--color-secondary);
          border-radius: var(--radius);
          padding: 3.5rem 2.5rem;
          box-shadow: var(--shadow-md);
        }

        .silencio-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 2.75rem;
        }

        .silencio-eyebrow {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--color-accent);
          margin-bottom: 0.9rem;
        }

        .silencio-header h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.9rem, 4vw, 2.75rem);
          font-weight: 400;
          color: var(--color-secondary);
          margin-bottom: 0.9rem;
        }

        .silencio-lead {
          font-size: 1rem;
          font-weight: 300;
          color: rgba(250, 250, 248, 0.78);
          line-height: 1.75;
        }

        .estados-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .estado-btn {
          text-align: left;
          background-color: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(250, 250, 248, 0.18);
          border-radius: var(--radius);
          padding: 1.75rem 1.5rem;
          color: var(--color-secondary);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: all 0.25s ease;
        }

        .estado-btn:hover {
          background-color: rgba(255, 255, 255, 0.09);
          border-color: var(--color-accent);
          transform: translateY(-3px);
        }

        .estado-tag {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--color-accent);
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .estado-btn h3 {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 400;
          color: var(--color-secondary);
          margin-bottom: 0.6rem;
        }

        .estado-btn p {
          font-size: 0.9rem;
          font-weight: 300;
          color: rgba(250, 250, 248, 0.72);
          line-height: 1.6;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .estado-cta {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--color-accent);
          font-weight: 500;
        }

        /* Timer Stage */
        .timer-stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1rem 0;
        }

        .timer-ring-wrap {
          position: relative;
          width: 160px;
          height: 160px;
          margin-bottom: 1.5rem;
        }

        .timer-svg {
          display: block;
        }

        .timer-readout {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .timer-seconds {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          color: var(--color-secondary);
          line-height: 1.1;
        }

        .timer-state-name {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--color-accent);
          margin-top: 0.25rem;
        }

        .breath-cue {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: var(--color-secondary);
          margin-bottom: 0.45rem;
        }

        .sound-mood-caption {
          font-size: 0.85rem;
          color: rgba(250, 250, 248, 0.65);
          margin-bottom: 2rem;
        }

        .timer-controls {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-ghost-light {
          background: transparent;
          border: 1px solid rgba(250, 250, 248, 0.3);
          border-radius: var(--radius);
          padding: 0.6rem 1.15rem;
          color: var(--color-secondary);
          font-family: var(--font-main);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-ghost-light:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }

        /* Reflection Stage */
        .reflection-stage {
          max-width: 680px;
          margin: 0 auto;
          text-align: center;
        }

        .reflection-badge {
          display: inline-block;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--color-accent);
          font-weight: 700;
          margin-bottom: 1.25rem;
        }

        .reflection-question {
          font-family: var(--font-serif);
          font-size: clamp(1.3rem, 3vw, 1.75rem);
          line-height: 1.45;
          color: var(--color-secondary);
          margin-bottom: 2.25rem;
        }

        .suggested-prep-box {
          background-color: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(197, 160, 89, 0.45);
          border-radius: var(--radius);
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.25rem;
          text-align: left;
          margin-bottom: 1.5rem;
        }

        .prep-kicker {
          display: block;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--color-accent);
          margin-bottom: 0.35rem;
        }

        .suggested-prep-box h3 {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--color-secondary);
          margin-bottom: 0.25rem;
        }

        .prep-formula {
          font-size: 0.85rem;
          color: rgba(250, 250, 248, 0.7);
        }

        .btn-accent-solid {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-accent);
          color: var(--color-primary);
          padding: 0.85rem 1.5rem;
          border-radius: var(--radius);
          font-size: 0.76rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          white-space: nowrap;
        }

        .reset-link {
          background: none;
          border: none;
          color: rgba(250, 250, 248, 0.7);
          text-decoration: underline;
          font-family: var(--font-main);
          font-size: 0.85rem;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .silencio-card {
            padding: 2.25rem 1.25rem;
          }

          .estados-grid {
            grid-template-columns: 1fr;
          }

          .suggested-prep-box {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
