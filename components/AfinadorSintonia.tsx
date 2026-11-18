'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AmbientSoundEngine, SoundMood } from '@/lib/ambient-audio';

interface CuradorSemitono {
  semitono: string;
  flor: string;
  grupoFloral: string;
  arquetipo: string;
  pregunta: string;
  preparadoNombre: string;
  preparadoSlug: string;
}

const DOCE_CURADORES: CuradorSemitono[] = [
  {
    semitono: 'Do (C)',
    flor: 'Impatiens',
    grupoFloral: 'Soledad · Ritmo acelerado',
    arquetipo: 'El Pulso Veloz que aprende la paciencia',
    pregunta:
      '¿En qué área de tu vida estás apurando un proceso que necesita su propio tiempo de maduración?',
    preparadoNombre: 'Calma Total',
    preparadoSlug: 'calma-total',
  },
  {
    semitono: 'Do# (C#)',
    flor: 'Mimulus',
    grupoFloral: 'Miedo · Temores concretos',
    arquetipo: 'La Sensibilidad que conquista el coraje sereno',
    pregunta:
      '¿Qué paso postergás hoy por miedo a lo que ya conocés o a quedar expuesto?',
    preparadoNombre: 'SOS Rescate',
    preparadoSlug: 'sos-rescate',
  },
  {
    semitono: 'Re (D)',
    flor: 'Clematis',
    grupoFloral: 'Falta de interés en el presente',
    arquetipo: 'El Soñador que encarna sus ideas en la tierra',
    pregunta:
      '¿Qué parte de tu presente estás evitando habitar al refugiarte en el futuro o en la fantasía?',
    preparadoNombre: 'Enfoque & Claridad',
    preparadoSlug: 'enfoque-y-claridad',
  },
  {
    semitono: 'Re# (D#)',
    flor: 'Agrimony',
    grupoFloral: 'Hipersensibilidad a influencias',
    arquetipo: 'La Sonrisa que se permite mostrar su verdad',
    pregunta:
      '¿Qué dolor o incomodidad estás cubriendo con buen humor para evitar un conflicto?',
    preparadoNombre: 'Calma Total',
    preparadoSlug: 'calma-total',
  },
  {
    semitono: 'Mi (E)',
    flor: 'Chicory',
    grupoFloral: 'Preocupación excesiva por los demás',
    arquetipo: 'El Cuidador que aprende el amor sin apego',
    pregunta:
      '¿Dónde estás dando de más esperando inconscientemente retribución o permanencia?',
    preparadoNombre: 'Calma Total',
    preparadoSlug: 'calma-total',
  },
  {
    semitono: 'Fa (F)',
    flor: 'Vervain',
    grupoFloral: 'Preocupación excesiva · Hiperentusiasmo',
    arquetipo: 'El Idealista que descubre la fuerza del reposo',
    pregunta:
      '¿Qué causa o exigencia te mantiene en tensión constante incluso cuando el cuerpo pide descanso?',
    preparadoNombre: 'Descanso Profundo',
    preparadoSlug: 'descanso-profundo',
  },
  {
    semitono: 'Fa# (F#)',
    flor: 'Centaury',
    grupoFloral: 'Hipersensibilidad · Límites',
    arquetipo: 'La Entrega que aprende a decir que no con calma',
    pregunta:
      '¿En qué vínculo cediste tu propia voz para no decepcionar al otro?',
    preparadoNombre: 'Ánimo & Vitalidad',
    preparadoSlug: 'animo-y-vitalidad',
  },
  {
    semitono: 'Sol (G)',
    flor: 'Cerato',
    grupoFloral: 'Incertidumbre · Intuición',
    arquetipo: 'El Buscador que confía en su sabiduría interna',
    pregunta:
      '¿Qué decisión ya sabés en tu interior pero seguís consultando afuera por miedo a equivocarte?',
    preparadoNombre: 'Enfoque & Claridad',
    preparadoSlug: 'enfoque-y-claridad',
  },
  {
    semitono: 'Sol# (G#)',
    flor: 'Scleranthus',
    grupoFloral: 'Incertidumbre · Dualidad',
    arquetipo: 'El Equilibrio entre dos notas opuestas',
    pregunta:
      '¿Entre qué dos caminos oscilás hoy sin animarte a elegir uno con presencia?',
    preparadoNombre: 'Enfoque & Claridad',
    preparadoSlug: 'enfoque-y-claridad',
  },
  {
    semitono: 'La (A)',
    flor: 'Water Violet',
    grupoFloral: 'Soledad · Reserva',
    arquetipo: 'La Presencia Serena que se abre al encuentro',
    pregunta:
      '¿Qué te impide pedir acompañamiento o compartir tu vulnerabilidad con alguien de confianza?',
    preparadoNombre: 'Ánimo & Vitalidad',
    preparadoSlug: 'animo-y-vitalidad',
  },
  {
    semitono: 'La# (A#)',
    flor: 'Gentian',
    grupoFloral: 'Desaliento o desesperación',
    arquetipo: 'La Perseverancia que confía tras el tropiezo',
    pregunta:
      '¿Qué obstáculo reciente interpretaste como un fracaso definitivo en lugar de un ajuste de ritmo?',
    preparadoNombre: 'Ánimo & Vitalidad',
    preparadoSlug: 'animo-y-vitalidad',
  },
  {
    semitono: 'Si (B)',
    flor: 'Rock Rose',
    grupoFloral: 'Miedo · Pánico o parálisis',
    arquetipo: 'La Presencia Íntegra ante la tormenta',
    pregunta:
      '¿Qué situación actual activa en vos una alarma desproporcionada respecto al peligro real?',
    preparadoNombre: 'SOS Rescate',
    preparadoSlug: 'sos-rescate',
  },
];

interface EstadoMomento {
  id: Exclude<SoundMood, 'ambient'>;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  climaSonoro: string;
  grupoFloral: string;
  esenciaEje: string;
  pregunta: string;
  preparadoNombre: string;
  preparadoSlug: string;
}

const ESTADOS_MOMENTO: EstadoMomento[] = [
  {
    id: 'ruido-mental',
    titulo: 'Ruido / Apuro',
    subtitulo: 'Pensamiento circular',
    descripcion: 'Hiperexigencia, diálogo interno acelerado o dificultad para desconectar.',
    climaSonoro: 'Armónicos graves en Sol abierto · Enraizamiento',
    grupoFloral: 'Falta de interés en el presente / Preocupación',
    esenciaEje: 'White Chestnut + Impatiens',
    pregunta:
      '¿Qué conversación pendiente o exigencia estás intentando resolver en tu mente ahora mismo, cuando en realidad necesita pausa?',
    preparadoNombre: 'Calma Total',
    preparadoSlug: 'calma-total',
  },
  {
    id: 'tension',
    titulo: 'Tensión / Bloqueo',
    subtitulo: 'Cuerpo en alerta',
    descripcion: 'Rigidez en hombros o mandíbula, urgencia interna o sensación de nudo.',
    climaSonoro: 'Acorde cálido en La suspendido · Distensión muscular',
    grupoFloral: 'Miedo / Emergencia del sistema nervioso',
    esenciaEje: 'Rock Rose + Star of Bethlehem + Cherry Plum',
    pregunta:
      '¿De qué situación o responsabilidad sentís que tenés que hacerte cargo en este instante, y qué pasaría si soltaras el control por un minuto?',
    preparadoNombre: 'SOS Rescate',
    preparadoSlug: 'sos-rescate',
  },
  {
    id: 'desanimo',
    titulo: 'Cansancio / Desánimo',
    subtitulo: 'Pulso apagado',
    descripcion: 'Agotamiento emocional, apatía o desconexión temporal con tu deseo.',
    climaSonoro: 'Intervalos abiertos en Fa mayor 7 · Luminosidad serena',
    grupoFloral: 'Desaliento o desesperación',
    esenciaEje: 'Gentian + Mustard + Wild Rose',
    pregunta:
      '¿En qué momento reciente dejaste de escuchar tu propio deseo para priorizar únicamente lo que sentías que "había que hacer"?',
    preparadoNombre: 'Ánimo & Vitalidad',
    preparadoSlug: 'animo-y-vitalidad',
  },
];

interface UnifiedResult {
  origen: 'momento' | 'natal';
  tituloResultado: string;
  subtituloResultado: string;
  preguntaIndagacion: string;
  preparadoNombre: string;
  preparadoSlug: string;
  grupoFloral: string;
  esenciaEje: string;
  // Datos técnicos para Vista Terapeuta / Colega
  proyectoSentido?: string;
  edadesEspejo?: string;
  cicloActual?: string;
  semitonoMusical?: string;
}

const TOTAL_SECONDS = 60;

export default function AfinadorSintonia() {
  const [activeTab, setActiveTab] = useState<'momento' | 'natal'>('momento');

  // Estado Tab 1: Momento + Pausa 60s
  const [selectedId, setSelectedId] = useState<EstadoMomento['id'] | null>(null);
  const [phase, setPhase] = useState<'select' | 'running' | 'result'>('select');
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [isPaused, setIsPaused] = useState(false);

  // Estado Tab 2: Flor Natal & Ciclos
  const [birthDate, setBirthDate] = useState('');
  const [natalError, setNatalError] = useState<string | null>(null);

  // Resultado unificado + Vista Colega + Compartir
  const [result, setResult] = useState<UnifiedResult | null>(null);
  const [vistaColega, setVistaColega] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

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
          const estado = ESTADOS_MOMENTO.find((e) => e.id === selectedId);
          if (estado) {
            setResult({
              origen: 'momento',
              tituloResultado: estado.titulo,
              subtituloResultado: estado.climaSonoro,
              preguntaIndagacion: estado.pregunta,
              preparadoNombre: estado.preparadoNombre,
              preparadoSlug: estado.preparadoSlug,
              grupoFloral: estado.grupoFloral,
              esenciaEje: estado.esenciaEje,
              semitonoMusical: estado.climaSonoro,
            });
          }
          setPhase('result');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, isPaused, selectedId]);

  const startPause = (id: EstadoMomento['id']) => {
    setSelectedId(id);
    setSecondsLeft(TOTAL_SECONDS);
    setIsPaused(false);
    setResult(null);
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

  const finishPauseNow = () => {
    engineRef.current?.stop();
    const estado = ESTADOS_MOMENTO.find((e) => e.id === selectedId);
    if (estado) {
      setResult({
        origen: 'momento',
        tituloResultado: estado.titulo,
        subtituloResultado: estado.climaSonoro,
        preguntaIndagacion: estado.pregunta,
        preparadoNombre: estado.preparadoNombre,
        preparadoSlug: estado.preparadoSlug,
        grupoFloral: estado.grupoFloral,
        esenciaEje: estado.esenciaEje,
        semitonoMusical: estado.climaSonoro,
      });
    }
    setPhase('result');
  };

  const handleCalculateNatal = (e: React.FormEvent) => {
    e.preventDefault();
    setNatalError(null);
    if (!birthDate) {
      setNatalError('Ingresá tu fecha de nacimiento para calcular tu sintonía.');
      return;
    }

    const birth = new Date(`${birthDate}T00:00:00`);
    const today = new Date();
    if (Number.isNaN(birth.getTime()) || birth > today) {
      setNatalError('Ingresá una fecha de nacimiento válida.');
      return;
    }

    // Edad actual
    let age = today.getFullYear() - birth.getFullYear();
    const mDiff = today.getMonth() - birth.getMonth();
    if (mDiff < 0 || (mDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    // Índice en los 12 Curadores / 12 Semitonos según mes y día
    const index = (birth.getMonth() + (birth.getDate() > 15 ? 1 : 0)) % 12;
    const curador = DOCE_CURADORES[index];

    // Ventana Proyecto Sentido (9 meses antes del nacimiento)
    const psStart = new Date(birth);
    psStart.setMonth(psStart.getMonth() - 9);
    const fmt = new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric' });
    const proyectoSentido = `${fmt.format(psStart)} — ${fmt.format(birth)} (gestación y nacimiento)`;

    // Ciclo septenio y edades espejo
    const septenio = Math.floor(Math.max(0, age) / 7) + 1;
    const mitadEdad = age >= 2 ? Math.floor(age / 2) : 0;
    const septenioPrevio = Math.max(0, (septenio - 1) * 7);
    const edadesEspejo = `Mitad de vida: ${mitadEdad} años · Inicio de ciclo actual: ${septenioPrevio} años · Próximo hito: ${
      septenio * 7
    } años`;

    engineRef.current?.stop();
    setResult({
      origen: 'natal',
      tituloResultado: `${curador.flor} · ${curador.semitono}`,
      subtituloResultado: curador.arquetipo,
      preguntaIndagacion: curador.pregunta,
      preparadoNombre: curador.preparadoNombre,
      preparadoSlug: curador.preparadoSlug,
      grupoFloral: curador.grupoFloral,
      esenciaEje: curador.flor,
      proyectoSentido,
      edadesEspejo,
      cicloActual: `${age} años (Septenio ${septenio}° de desarrollo)`,
      semitonoMusical: `${curador.semitono} — ${curador.flor}`,
    });
    setPhase('result');
  };

  const resetAll = () => {
    engineRef.current?.stop();
    setPhase('select');
    setSelectedId(null);
    setSecondsLeft(TOTAL_SECONDS);
    setIsPaused(false);
    setResult(null);
    setShareFeedback(null);
  };

  const handleShare = async () => {
    if (!result) return;
    const shareText = `Mi sintonía en La Magia de los Vientos:\n• ${result.tituloResultado}\n• Pregunta para hoy: "${result.preguntaIndagacion}"\n• Preparado sugerido: ${result.preparadoNombre}\n\nDescubrí tu sintonía en lamagiadelosvientos.com.ar`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Mi Sintonía · La Magia de los Vientos',
          text: shareText,
          url: window.location.href,
        });
        setShareFeedback('Compartido');
        return;
      } catch {
        // Si el usuario cancela o falla, caemos al portapapeles
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setShareFeedback('Tarjeta copiada para WhatsApp / Instagram');
      setTimeout(() => setShareFeedback(null), 3000);
    } catch {
      setShareFeedback('No se pudo copiar automáticamente');
    }
  };

  const selectedEstado = ESTADOS_MOMENTO.find((e) => e.id === selectedId) || null;
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
    <section className="afinador-section" aria-labelledby="afinador-titulo">
      <div className="afinador-halo" aria-hidden="true" />
      <div className="container">
        <div className="afinador-shell">
          <div className="afinador-header">
            <span className="afinador-eyebrow">INSTRUMENTO DE SINTONÍA EMOCIONAL</span>
            <h2 id="afinador-titulo">
              Afinador de <em>Sintonía</em>
            </h2>
            <p className="afinador-lead">
              Elegí una puerta de entrada: escuchá cómo suena tu momento presente o calculá tu arquetipo floral natal según los 12 semitonos de Bach.
            </p>
          </div>

          {phase !== 'running' && phase !== 'result' && (
            <div className="tabs-bar" role="tablist" aria-label="Puertas de entrada">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'momento'}
                className={`tab-pill ${activeTab === 'momento' ? 'active' : ''}`}
                onClick={() => setActiveTab('momento')}
              >
                1. Sintonía del Momento
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'natal'}
                className={`tab-pill ${activeTab === 'natal' ? 'active' : ''}`}
                onClick={() => setActiveTab('natal')}
              >
                2. Mi Flor Natal & Ciclos
              </button>
            </div>
          )}

          {/* TAB 1: SINTONÍA DEL MOMENTO */}
          {phase === 'select' && activeTab === 'momento' && (
            <div className="estados-grid">
              {ESTADOS_MOMENTO.map((estado, idx) => (
                <article key={estado.id} className="estado-card">
                  <div className="estado-top">
                    <span className="estado-num">0{idx + 1}</span>
                    <span className="estado-sub">{estado.subtitulo}</span>
                  </div>
                  <h3>{estado.titulo}</h3>
                  <p>{estado.descripcion}</p>

                  <div className="estado-actions">
                    <button
                      type="button"
                      onClick={() => engineRef.current?.playContrastTexture(estado.id)}
                      className="texture-preview-btn"
                    >
                      Escuchar textura (2s)
                    </button>
                    <button
                      type="button"
                      onClick={() => startPause(estado.id)}
                      className="start-pause-btn"
                    >
                      Iniciar pausa de 60s →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* TAB 2: MI FLOR NATAL & CICLOS */}
          {phase === 'select' && activeTab === 'natal' && (
            <form onSubmit={handleCalculateNatal} className="natal-card">
              <h3>Calculá tu Arquetipo Floral Base & Ciclo</h3>
              <p>
                Ingresá tu fecha de nacimiento para asociar tu momento natal con uno de los 12 Curadores de Bach, los 12 semitonos musicales y tu ciclo transgeneracional actual.
              </p>

              <div className="natal-input-row">
                <input
                  type="date"
                  aria-label="Fecha de nacimiento"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                />
                <button type="submit" className="pill-btn-accent">
                  Calcular mi Sintonía
                </button>
              </div>

              {natalError && <p className="natal-error">{natalError}</p>}
            </form>
          )}

          {/* PAUSA DE 60 SEGUNDOS (EL SILENCIO ENTRE NOTAS) */}
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
                <button type="button" onClick={finishPauseNow} className="pill-btn-accent">
                  Ir a la receta editorial
                </button>
                <button type="button" onClick={resetAll} className="pill-btn-light">
                  Volver
                </button>
              </div>
            </div>
          )}

          {/* RESULTADO UNIFICADO + MODO COLEGA + COMPARTIR */}
          {phase === 'result' && result && (
            <div className="receta-editorial" aria-live="polite">
              <div className="receta-top-bar">
                <span className="receta-rx">Rx · Comprender para Sanar</span>
                <label className="colega-toggle">
                  <input
                    type="checkbox"
                    checked={vistaColega}
                    onChange={(e) => setVistaColega(e.target.checked)}
                  />
                  <span>Vista Terapeuta / Colega</span>
                </label>
              </div>

              <div className="receta-title-block">
                <span className="receta-estado">{result.tituloResultado}</span>
                <p className="receta-sub">{result.subtituloResultado}</p>
              </div>

              <blockquote className="receta-question">
                &ldquo;{result.preguntaIndagacion}&rdquo;
              </blockquote>

              {/* Panel técnico Vista Terapeuta / Colega */}
              {vistaColega && (
                <div className="colega-panel">
                  <h4>Datos Técnicos para Sesión</h4>
                  <div className="colega-grid">
                    <div>
                      <span className="colega-label">Grupo Floral</span>
                      <span className="colega-val">{result.grupoFloral}</span>
                    </div>
                    <div>
                      <span className="colega-label">Esencia / Fórmula Eje</span>
                      <span className="colega-val">{result.esenciaEje}</span>
                    </div>
                    {result.cicloActual && (
                      <div>
                        <span className="colega-label">Edad y Ciclo Actual</span>
                        <span className="colega-val">{result.cicloActual}</span>
                      </div>
                    )}
                    {result.proyectoSentido && (
                      <div>
                        <span className="colega-label">Ventana Proyecto Sentido (9m)</span>
                        <span className="colega-val">{result.proyectoSentido}</span>
                      </div>
                    )}
                    {result.edadesEspejo && (
                      <div className="colega-full">
                        <span className="colega-label">Edades Espejo / Aniversario</span>
                        <span className="colega-val">{result.edadesEspejo}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="receta-divider" />

              <div className="receta-footer">
                <div className="receta-prep-info">
                  <span className="receta-kicker">Preparado Floral Sugerido</span>
                  <h3>{result.preparadoNombre}</h3>
                  <p className="receta-formula">Fórmula artesanal · $20.000 ARS</p>
                </div>
                <div className="receta-actions">
                  <Link href={`/tienda/${result.preparadoSlug}`} className="receta-cta">
                    Ver Preparado ($20.000)
                  </Link>
                  <button type="button" onClick={handleShare} className="share-btn">
                    Compartir mi sintonía
                  </button>
                </div>
              </div>

              {shareFeedback && <p className="share-feedback">{shareFeedback}</p>}

              <button type="button" onClick={resetAll} className="receta-reset">
                Realizar otra consulta en el Afinador
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .afinador-section {
          position: relative;
          padding: 5.5rem 0;
          background-color: #2c3a33;
          color: #f6f3ec;
          overflow: hidden;
        }

        .afinador-halo {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 780px;
          height: 780px;
          background: radial-gradient(circle, rgba(184, 151, 104, 0.18) 0%, transparent 65%);
          pointer-events: none;
        }

        .afinador-shell {
          position: relative;
          z-index: 1;
          max-width: 960px;
          margin: 0 auto;
        }

        .afinador-header {
          text-align: center;
          max-width: 660px;
          margin: 0 auto 2.5rem;
        }

        .afinador-eyebrow {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.28em;
          color: #b89768;
          margin-bottom: 1rem;
        }

        .afinador-header h2 {
          font-family: var(--font-serif);
          font-size: clamp(2.1rem, 4.5vw, 3.2rem);
          font-weight: 400;
          color: #f6f3ec;
          margin-bottom: 1rem;
          line-height: 1.15;
        }

        .afinador-header em {
          font-style: italic;
          color: #b89768;
        }

        .afinador-lead {
          font-size: 1.02rem;
          font-weight: 300;
          color: rgba(246, 243, 236, 0.78);
          line-height: 1.8;
        }

        /* Tabs */
        .tabs-bar {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }

        .tab-pill {
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          border: 1px solid rgba(184, 151, 104, 0.4);
          background: rgba(246, 243, 236, 0.04);
          color: rgba(246, 243, 236, 0.8);
          font-family: var(--font-main);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .tab-pill.active {
          background-color: #b89768;
          border-color: #b89768;
          color: #2c3a33;
          font-weight: 700;
        }

        /* Tab 1 Grid */
        .estados-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.35rem;
        }

        .estado-card {
          background: rgba(246, 243, 236, 0.05);
          border: 1px solid rgba(184, 151, 104, 0.32);
          border-radius: 16px;
          padding: 1.85rem 1.55rem;
          display: flex;
          flex-direction: column;
        }

        .estado-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .estado-num {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          color: #b89768;
        }

        .estado-sub {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(246, 243, 236, 0.6);
        }

        .estado-card h3 {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          font-weight: 400;
          color: #f6f3ec;
          margin-bottom: 0.6rem;
        }

        .estado-card p {
          font-size: 0.9rem;
          font-weight: 300;
          color: rgba(246, 243, 236, 0.74);
          line-height: 1.65;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .estado-actions {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .texture-preview-btn {
          background: transparent;
          border: 1px solid rgba(246, 243, 236, 0.25);
          border-radius: 9999px;
          padding: 0.5rem 1rem;
          color: rgba(246, 243, 236, 0.85);
          font-family: var(--font-main);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
        }

        .texture-preview-btn:hover {
          border-color: #b89768;
          color: #b89768;
        }

        .start-pause-btn {
          background-color: #b89768;
          border: none;
          border-radius: 9999px;
          padding: 0.7rem 1rem;
          color: #2c3a33;
          font-family: var(--font-main);
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          cursor: pointer;
        }

        /* Tab 2 Natal Card */
        .natal-card {
          max-width: 620px;
          margin: 0 auto;
          background: rgba(246, 243, 236, 0.06);
          border: 1px solid rgba(184, 151, 104, 0.35);
          border-radius: 16px;
          padding: 2.25rem 2rem;
          text-align: center;
        }

        .natal-card h3 {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: #f6f3ec;
          margin-bottom: 0.75rem;
        }

        .natal-card p {
          font-size: 0.95rem;
          font-weight: 300;
          color: rgba(246, 243, 236, 0.78);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .natal-input-row {
          display: flex;
          gap: 0.85rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .natal-input-row input[type='date'] {
          min-height: 46px;
          padding: 0.65rem 1rem;
          border-radius: 9999px;
          border: 1px solid rgba(184, 151, 104, 0.55);
          background-color: #f6f3ec;
          color: #1d221f;
          font-family: var(--font-main);
          font-size: 0.95rem;
        }

        .natal-error {
          color: #f3c6c6 !important;
          margin-top: 1rem;
          margin-bottom: 0 !important;
          font-size: 0.88rem !important;
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
          33%,
          66% {
            transform: scale(1.16);
            opacity: 1;
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
        }

        .pill-btn-accent {
          background-color: #b89768;
          border: 1px solid #b89768;
          border-radius: 9999px;
          padding: 0.75rem 1.5rem;
          color: #2c3a33;
          font-family: var(--font-main);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          cursor: pointer;
        }

        /* Receta Editorial + Vista Colega */
        .receta-editorial {
          max-width: 740px;
          margin: 0 auto;
          background-color: #f6f3ec;
          color: #1d221f;
          border: 1px solid #b89768;
          border-radius: 16px;
          padding: 2.5rem 2.25rem;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.28);
          text-align: center;
        }

        .receta-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .receta-rx {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #2c3a33;
        }

        .colega-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #2c3a33;
          background: rgba(44, 58, 51, 0.08);
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          cursor: pointer;
        }

        .colega-toggle input {
          accent-color: #2c3a33;
        }

        .receta-title-block {
          margin-bottom: 1.25rem;
        }

        .receta-estado {
          display: inline-block;
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          padding: 0.3rem 0.95rem;
          border-radius: 9999px;
          background-color: rgba(184, 151, 104, 0.22);
          color: #2c3a33;
          font-weight: 700;
          margin-bottom: 0.45rem;
        }

        .receta-sub {
          font-size: 0.9rem;
          color: #7a746e;
        }

        .receta-question {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: clamp(1.28rem, 2.8vw, 1.65rem);
          line-height: 1.5;
          color: #1d221f;
          margin-bottom: 1.5rem;
        }

        .colega-panel {
          background-color: #eae3d5;
          border: 1px solid rgba(44, 58, 51, 0.2);
          border-radius: 12px;
          padding: 1.25rem;
          text-align: left;
          margin-bottom: 1.5rem;
        }

        .colega-panel h4 {
          font-family: var(--font-serif);
          font-size: 1rem;
          color: #2c3a33;
          margin-bottom: 0.85rem;
        }

        .colega-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
        }

        .colega-full {
          grid-column: 1 / -1;
        }

        .colega-label {
          display: block;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #7a746e;
          font-weight: 700;
        }

        .colega-val {
          font-size: 0.88rem;
          color: #1d221f;
        }

        .receta-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #b89768, transparent);
          margin-bottom: 1.5rem;
        }

        .receta-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.25rem;
          text-align: left;
          margin-bottom: 1.25rem;
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
          font-size: 1.45rem;
          color: #2c3a33;
          margin-bottom: 0.2rem;
        }

        .receta-formula {
          font-size: 0.85rem;
          color: #7a746e;
        }

        .receta-actions {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          flex-shrink: 0;
        }

        .receta-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #2c3a33;
          color: #f6f3ec;
          padding: 0.85rem 1.45rem;
          border-radius: 9999px;
          font-size: 0.74rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          white-space: nowrap;
        }

        .share-btn {
          background: transparent;
          border: 1px solid #2c3a33;
          border-radius: 9999px;
          padding: 0.65rem 1.25rem;
          color: #2c3a33;
          font-family: var(--font-main);
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
        }

        .share-feedback {
          font-size: 0.82rem;
          color: #2c3a33;
          font-weight: 500;
          margin-bottom: 0.75rem;
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
          .estados-grid,
          .colega-grid {
            grid-template-columns: 1fr;
          }

          .receta-editorial {
            padding: 2rem 1.35rem;
          }

          .receta-footer {
            flex-direction: column;
            align-items: flex-start;
          }

          .receta-actions,
          .receta-cta,
          .share-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
