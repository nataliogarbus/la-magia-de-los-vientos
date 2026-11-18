'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AmbientSoundEngine, SoundMood } from '@/lib/ambient-audio';

export interface MapaNatalCalculado {
  nombre: string;
  fechaNacimiento: string;
  edad: number;
  semitono: string;
  florNatal: string;
  arquetipo: string;
  grupoFloral: string;
  cicloActual: string;
  proyectoSentido: string;
  edadesEspejo: string;
  preguntaNatal: string;
}

interface CuradorSemitono {
  semitono: string;
  flor: string;
  grupoFloral: string;
  arquetipo: string;
  pregunta: string;
}

const DOCE_CURADORES: CuradorSemitono[] = [
  {
    semitono: 'Do (C)',
    flor: 'Impatiens',
    grupoFloral: 'Soledad · Ritmo acelerado',
    arquetipo: 'El Pulso Veloz que aprende la paciencia',
    pregunta:
      '¿En qué área de tu vida estás apurando un proceso que necesita su propio tiempo de maduración?',
  },
  {
    semitono: 'Do# (C#)',
    flor: 'Mimulus',
    grupoFloral: 'Miedo · Temores concretos',
    arquetipo: 'La Sensibilidad que conquista el coraje sereno',
    pregunta:
      '¿Qué paso postergás hoy por miedo a lo que ya conocés o a quedar expuesto?',
  },
  {
    semitono: 'Re (D)',
    flor: 'Clematis',
    grupoFloral: 'Falta de interés en el presente',
    arquetipo: 'El Soñador que encarna sus ideas en la tierra',
    pregunta:
      '¿Qué parte de tu presente estás evitando habitar al refugiarte en el futuro o en la fantasía?',
  },
  {
    semitono: 'Re# (D#)',
    flor: 'Agrimony',
    grupoFloral: 'Hipersensibilidad a influencias',
    arquetipo: 'La Sonrisa que se permite mostrar su verdad',
    pregunta:
      '¿Qué dolor o incomodidad estás cubriendo con buen humor para evitar un conflicto?',
  },
  {
    semitono: 'Mi (E)',
    flor: 'Chicory',
    grupoFloral: 'Preocupación excesiva por los demás',
    arquetipo: 'El Cuidador que aprende el amor sin apego',
    pregunta:
      '¿Dónde estás dando de más esperando inconscientemente retribución o permanencia?',
  },
  {
    semitono: 'Fa (F)',
    flor: 'Vervain',
    grupoFloral: 'Preocupación excesiva · Hiperentusiasmo',
    arquetipo: 'El Idealista que descubre la fuerza del reposo',
    pregunta:
      '¿Qué causa o exigencia te mantiene en tensión constante incluso cuando el cuerpo pide descanso?',
  },
  {
    semitono: 'Fa# (F#)',
    flor: 'Centaury',
    grupoFloral: 'Hipersensibilidad · Límites',
    arquetipo: 'La Entrega que aprende a decir que no con calma',
    pregunta:
      '¿En qué vínculo cediste tu propia voz para no decepcionar al otro?',
  },
  {
    semitono: 'Sol (G)',
    flor: 'Cerato',
    grupoFloral: 'Incertidumbre · Intuición',
    arquetipo: 'El Buscador que confía en su sabiduría interna',
    pregunta:
      '¿Qué decisión ya sabés en tu interior pero seguís consultando afuera por miedo a equivocarte?',
  },
  {
    semitono: 'Sol# (G#)',
    flor: 'Scleranthus',
    grupoFloral: 'Incertidumbre · Dualidad',
    arquetipo: 'El Equilibrio entre dos notas opuestas',
    pregunta:
      '¿Entre qué dos caminos oscilás hoy sin animarte a elegir uno con presencia?',
  },
  {
    semitono: 'La (A)',
    flor: 'Water Violet',
    grupoFloral: 'Soledad · Reserva',
    arquetipo: 'La Presencia Serena que se abre al encuentro',
    pregunta:
      '¿Qué te impide pedir acompañamiento o compartir tu vulnerabilidad con alguien de confianza?',
  },
  {
    semitono: 'La# (A#)',
    flor: 'Gentian',
    grupoFloral: 'Desaliento o desesperación',
    arquetipo: 'La Perseverancia que confía tras el tropiezo',
    pregunta:
      '¿Qué obstáculo reciente interpretaste como un fracaso definitivo en lugar de un ajuste de ritmo?',
  },
  {
    semitono: 'Si (B)',
    flor: 'Rock Rose',
    grupoFloral: 'Miedo · Pánico o parálisis',
    arquetipo: 'La Presencia Íntegra ante la tormenta',
    pregunta:
      '¿Qué situación actual activa en vos una alarma desproporcionada respecto al peligro real?',
  },
];

interface EstadoMomento {
  id: Exclude<SoundMood, 'ambient'>;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  climaSonoro: string;
  grupoFloral: string;
  esenciaPresente: string;
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
    esenciaPresente: 'White Chestnut + Impatiens',
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
    esenciaPresente: 'Rock Rose + Star of Bethlehem + Cherry Plum',
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
    esenciaPresente: 'Gentian + Mustard + Wild Rose',
    pregunta:
      '¿En qué momento reciente dejaste de escuchar tu propio deseo para priorizar únicamente lo que sentías que "había que hacer"?',
    preparadoNombre: 'Ánimo & Vitalidad',
    preparadoSlug: 'animo-y-vitalidad',
  },
];

const TOTAL_SECONDS = 60;
export const LIBRETA_STORAGE_KEY = 'lamagia_libreta_v1';

export default function AfinadorSintonia() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Paso 1: Natal
  const [nombre, setNombre] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [step1Error, setStep1Error] = useState<string | null>(null);
  const [mapaNatal, setMapaNatal] = useState<MapaNatalCalculado | null>(null);

  // Paso 2 & 3: Momento presente + Pausa 60s + Lectura integrada
  const [selectedEstado, setSelectedEstado] = useState<EstadoMomento | null>(null);
  const [pausePhase, setPausePhase] = useState<'running' | 'complete'>('running');
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [isPaused, setIsPaused] = useState(false);

  const [vistaColega, setVistaColega] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const engineRef = useRef<AmbientSoundEngine | null>(null);

  useEffect(() => {
    engineRef.current = new AmbientSoundEngine();
    return () => {
      engineRef.current?.stop();
    };
  }, []);

  const persistMapaToLibreta = (mapa: MapaNatalCalculado, estado?: EstadoMomento) => {
    try {
      const existingRaw = localStorage.getItem(LIBRETA_STORAGE_KEY);
      const existing = existingRaw ? JSON.parse(existingRaw) : {};
      const updated = {
        ...existing,
        mapaNatal: {
          ...mapa,
          estadoReciente: estado ? estado.titulo : existing?.mapaNatal?.estadoReciente || '',
          actualizadoEn: new Date().toISOString(),
        },
      };
      localStorage.setItem(LIBRETA_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('lamagia:libreta-updated'));
    } catch {
      // Ignorar si localStorage no está disponible
    }
  };

  useEffect(() => {
    if (step !== 3 || pausePhase !== 'running' || isPaused) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          engineRef.current?.stop();
          setPausePhase('complete');
          if (mapaNatal && selectedEstado) {
            persistMapaToLibreta(mapaNatal, selectedEstado);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step, pausePhase, isPaused, mapaNatal, selectedEstado]);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep1Error(null);
    if (!birthDate) {
      setStep1Error('Ingresá tu fecha de nacimiento para calcular tu mapa natal.');
      return;
    }

    const birth = new Date(`${birthDate}T00:00:00`);
    const today = new Date();
    if (Number.isNaN(birth.getTime()) || birth > today) {
      setStep1Error('Ingresá una fecha de nacimiento válida.');
      return;
    }

    let age = today.getFullYear() - birth.getFullYear();
    const mDiff = today.getMonth() - birth.getMonth();
    if (mDiff < 0 || (mDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    const index = (birth.getMonth() + (birth.getDate() > 15 ? 1 : 0)) % 12;
    const curador = DOCE_CURADORES[index];

    const psStart = new Date(birth);
    psStart.setMonth(psStart.getMonth() - 9);
    const fmt = new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric' });
    const proyectoSentido = `${fmt.format(psStart)} — ${fmt.format(birth)} (gestación y nacimiento)`;

    const septenio = Math.floor(Math.max(0, age) / 7) + 1;
    const mitadEdad = age >= 2 ? Math.floor(age / 2) : 0;
    const septenioPrevio = Math.max(0, (septenio - 1) * 7);
    const edadesEspejo = `Mitad de vida: ${mitadEdad} años · Inicio de ciclo: ${septenioPrevio} años · Próximo hito: ${
      septenio * 7
    } años`;

    const calculated: MapaNatalCalculado = {
      nombre: nombre.trim() || 'Consultante',
      fechaNacimiento: birthDate,
      edad: age,
      semitono: curador.semitono,
      florNatal: curador.flor,
      arquetipo: curador.arquetipo,
      grupoFloral: curador.grupoFloral,
      cicloActual: `${age} años (Septenio ${septenio}° de desarrollo)`,
      proyectoSentido,
      edadesEspejo,
      preguntaNatal: curador.pregunta,
    };

    setMapaNatal(calculated);
    persistMapaToLibreta(calculated);
    setStep(2);
  };

  const startStep3 = (estado: EstadoMomento) => {
    setSelectedEstado(estado);
    setSecondsLeft(TOTAL_SECONDS);
    setIsPaused(false);
    setPausePhase('running');
    setStep(3);
    engineRef.current?.start(estado.id, 0.35);
  };

  const togglePause = () => {
    if (!selectedEstado) return;
    if (isPaused) {
      engineRef.current?.start(selectedEstado.id, 0.35);
      setIsPaused(false);
    } else {
      engineRef.current?.stop();
      setIsPaused(true);
    }
  };

  const finishPauseNow = () => {
    engineRef.current?.stop();
    setPausePhase('complete');
    if (mapaNatal && selectedEstado) {
      persistMapaToLibreta(mapaNatal, selectedEstado);
    }
  };

  const resetFlow = () => {
    engineRef.current?.stop();
    setStep(1);
    setSelectedEstado(null);
    setPausePhase('running');
    setSecondsLeft(TOTAL_SECONDS);
    setIsPaused(false);
    setShareFeedback(null);
  };

  const handleShare = async () => {
    if (!mapaNatal || !selectedEstado) return;
    const shareText = `Mi Lectura Integrada · La Magia de los Vientos:\n• Arquetipo Natal: ${mapaNatal.florNatal} (${mapaNatal.semitono})\n• Momento Presente: ${selectedEstado.titulo}\n• Pregunta para hoy: "${selectedEstado.pregunta}"\n• Esencia de apoyo: ${selectedEstado.esenciaPresente} (${selectedEstado.preparadoNombre})\n\nDescubrí tu sintonía en lamagiadelosvientos.com.ar`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Mi Sintonía · La Magia de los Vientos',
          text: shareText,
          url: window.location.href,
        });
        setShareFeedback('Plan de 21 días compartido');
        return;
      } catch {
        // Fallback a portapapeles
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setShareFeedback('Plan de 21 días copiado para guardar o compartir');
      setTimeout(() => setShareFeedback(null), 3500);
    } catch {
      setShareFeedback('No se pudo copiar automáticamente');
    }
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
    <section className="afinador-section" aria-labelledby="afinador-titulo">
      <div className="afinador-halo" aria-hidden="true" />
      <div className="container">
        <div className="afinador-shell">
          <div className="afinador-header">
            <span className="afinador-eyebrow">CAMINO GUIADO EN 3 PASOS</span>
            <h2 id="afinador-titulo">
              Afinador de <em>Sintonía</em>
            </h2>
            <p className="afinador-lead">
              Un recorrido lineal para cruzar tu historia natal con tu momento presente y guardar tu lectura en tu libreta personal.
            </p>
          </div>

          {/* Indicador lineal de 3 pasos */}
          <div className="linear-steps" aria-label="Progreso del afinador">
            <div className={`linear-step ${step === 1 ? 'active' : step > 1 ? 'done' : ''}`}>
              <span>01</span> Tu Mapa Natal
            </div>
            <div className={`linear-step ${step === 2 ? 'active' : step > 2 ? 'done' : ''}`}>
              <span>02</span> Momento Presente
            </div>
            <div className={`linear-step ${step === 3 ? 'active' : ''}`}>
              <span>03</span> Silencio &amp; Lectura
            </div>
          </div>

          {/* PASO 1: FECHA DE NACIMIENTO + NOMBRE OPCIONAL */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="step1-card">
              <h3>Paso 1 · Tu Arquetipo Floral Natal &amp; Ciclo</h3>
              <p>
                Calculamos tu tonalidad musical base (12 semitonos / 12 Curadores de Bach), tu ciclo biológico actual y tu ventana de Proyecto Sentido.
              </p>

              <div className="step1-fields">
                <div className="field-col">
                  <label htmlFor="afinador-nombre">Tu nombre (opcional)</label>
                  <input
                    id="afinador-nombre"
                    type="text"
                    placeholder="Ej: Sofía"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="field-col">
                  <label htmlFor="afinador-fecha">
                    Fecha de nacimiento <span className="req">*</span>
                  </label>
                  <input
                    id="afinador-fecha"
                    type="date"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
              </div>

              {step1Error && <p className="step-error">{step1Error}</p>}

              <button type="submit" className="pill-btn-accent">
                Continuar al Paso 2 →
              </button>
            </form>
          )}

          {/* PASO 2: MICRO-TEXTURAS + ESTADO PRESENTE */}
          {step === 2 && mapaNatal && (
            <div>
              <div className="natal-summary-strip">
                <div>
                  <span className="strip-kicker">Tu Arquetipo Natal</span>
                  <p className="strip-main">
                    <strong>{mapaNatal.florNatal}</strong> · {mapaNatal.semitono} · {mapaNatal.cicloActual}
                  </p>
                </div>
                <button type="button" onClick={() => setStep(1)} className="strip-edit-btn">
                  Editar fecha
                </button>
              </div>

              <div className="step2-intro">
                <h3>Paso 2 · ¿Cómo suena tu momento presente?</h3>
                <p>
                  Podés escuchar primero una micro-textura sonora de contraste (2s) y luego elegir tu estado para iniciar la pausa armónica de 60 segundos.
                </p>
              </div>

              <div className="estados-grid">
                {ESTADOS_MOMENTO.map((estado, idx) => (
                  <article key={estado.id} className="estado-card">
                    <div className="estado-top">
                      <span className="estado-num">0{idx + 1}</span>
                      <span className="estado-sub">{estado.subtitulo}</span>
                    </div>
                    <h4>{estado.titulo}</h4>
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
                        onClick={() => startStep3(estado)}
                        className="start-pause-btn"
                      >
                        Iniciar pausa de 60s →
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* PASO 3A: PAUSA DE 60 SEGUNDOS */}
          {step === 3 && pausePhase === 'running' && selectedEstado && (
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
                  Ir a mi lectura integrada
                </button>
                <button type="button" onClick={() => { engineRef.current?.stop(); setStep(2); }} className="pill-btn-light">
                  Cambiar estado
                </button>
              </div>
            </div>
          )}

          {/* PASO 3B: LECTURA ÚNICA INTEGRADA */}
          {step === 3 && pausePhase === 'complete' && mapaNatal && selectedEstado && (
            <div className="receta-editorial" aria-live="polite">
              <div className="receta-top-bar">
                <span className="receta-rx">Lectura Integrada · Comprender para Sanar</span>
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
                <span className="receta-estado">
                  {mapaNatal.florNatal} ({mapaNatal.semitono}) + {selectedEstado.titulo}
                </span>
                <p className="receta-sub">
                  {mapaNatal.nombre}: tu arquetipo natal (<em>{mapaNatal.arquetipo}</em>) hoy atraviesa un momento de{' '}
                  <strong>{selectedEstado.titulo.toLowerCase()}</strong>.
                </p>
              </div>

              <blockquote className="receta-question">
                &ldquo;{selectedEstado.pregunta}&rdquo;
              </blockquote>
              <p className="natal-secondary-question">
                <strong>Pregunta de tu ciclo natal ({mapaNatal.cicloActual}):</strong> {mapaNatal.preguntaNatal}
              </p>

              {vistaColega && (
                <div className="colega-panel">
                  <h4>Datos Técnicos para Sesión</h4>
                  <div className="colega-grid">
                    <div>
                      <span className="colega-label">Arquetipo &amp; Grupo Natal</span>
                      <span className="colega-val">
                        {mapaNatal.florNatal} ({mapaNatal.grupoFloral})
                      </span>
                    </div>
                    <div>
                      <span className="colega-label">Grupo Momento Presente</span>
                      <span className="colega-val">{selectedEstado.grupoFloral}</span>
                    </div>
                    <div>
                      <span className="colega-label">Ventana Proyecto Sentido (9m)</span>
                      <span className="colega-val">{mapaNatal.proyectoSentido}</span>
                    </div>
                    <div>
                      <span className="colega-label">Edades Espejo / Aniversario</span>
                      <span className="colega-val">{mapaNatal.edadesEspejo}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="receta-divider" />

              <div className="nota-botanica-box">
                <span className="receta-kicker">Nota Botánica &amp; Vibracional</span>
                <p className="nota-botanica-text">
                  Para acompañar esta frecuencia, la tradición floral trabaja con la esencia de{' '}
                  <strong>{selectedEstado.esenciaPresente}</strong> (en diálogo con tu flor natal{' '}
                  <strong>{mapaNatal.florNatal}</strong>), base de la fórmula{' '}
                  <strong>{selectedEstado.preparadoNombre}</strong>.
                </p>
                <Link href={`/tienda/${selectedEstado.preparadoSlug}`} className="nota-botanica-link">
                  Conocer más sobre esta esencia →
                </Link>
              </div>

              <div className="freemium-cta-block">
                <p className="freemium-desc">
                  Tu mapa ya quedó guardado abajo en tu <strong>Libreta Personal de Sintonía</strong>. Sumate gratis a la{' '}
                  <strong>Comunidad de WhatsApp de La Magia de los Vientos</strong> para recibir pausas sonoras y reflexiones semanales.
                </p>
                <div className="freemium-actions">
                  <a
                    href={`https://wa.me/5491149143734?text=${encodeURIComponent(
                      `Hola Eliana! Soy ${mapaNatal.nombre}. Hice mi sintonía (${mapaNatal.florNatal} + ${selectedEstado.titulo}) y quiero sumarme gratis a la Comunidad de WhatsApp.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="receta-cta"
                  >
                    Sumarme a la Comunidad de WhatsApp
                  </a>
                  <button type="button" onClick={handleShare} className="share-btn">
                    Guardar Plan de 21 Días
                  </button>
                  <a href="#libreta-evolucion" className="share-btn">
                    Ir a mi Libreta ↓
                  </a>
                </div>
              </div>

              {shareFeedback && <p className="share-feedback">{shareFeedback}</p>}

              <button type="button" onClick={resetFlow} className="receta-reset">
                Realizar una nueva lectura
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
          margin: 0 auto 2.25rem;
        }

        .afinador-eyebrow {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.28em;
          color: #b89768;
          margin-bottom: 0.9rem;
        }

        .afinador-header h2 {
          font-family: var(--font-serif);
          font-size: clamp(2.1rem, 4.5vw, 3.2rem);
          font-weight: 400;
          color: #f6f3ec;
          margin-bottom: 0.9rem;
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

        .linear-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.65rem;
          margin-bottom: 2.25rem;
        }

        .linear-step {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.65rem 0.75rem;
          border-radius: 9999px;
          border: 1px solid rgba(246, 243, 236, 0.18);
          font-size: 0.76rem;
          color: rgba(246, 243, 236, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .linear-step span {
          font-family: var(--font-serif);
          color: #b89768;
        }

        .linear-step.active {
          border-color: #b89768;
          background: rgba(184, 151, 104, 0.18);
          color: #f6f3ec;
          font-weight: 600;
        }

        .linear-step.done {
          border-color: rgba(184, 151, 104, 0.45);
          color: rgba(246, 243, 236, 0.85);
        }

        /* Paso 1 */
        .step1-card {
          max-width: 680px;
          margin: 0 auto;
          background: rgba(246, 243, 236, 0.06);
          border: 1px solid rgba(184, 151, 104, 0.35);
          border-radius: 16px;
          padding: 2.25rem 2rem;
          text-align: center;
        }

        .step1-card h3 {
          font-family: var(--font-serif);
          font-size: 1.65rem;
          color: #f6f3ec;
          margin-bottom: 0.7rem;
        }

        .step1-card > p {
          font-size: 0.95rem;
          font-weight: 300;
          color: rgba(246, 243, 236, 0.78);
          line-height: 1.7;
          margin-bottom: 1.75rem;
        }

        .step1-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          text-align: left;
          margin-bottom: 1.5rem;
        }

        .field-col {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .field-col label {
          font-size: 0.82rem;
          color: rgba(246, 243, 236, 0.9);
          font-weight: 500;
        }

        .req {
          color: #b89768;
        }

        .field-col input {
          min-height: 46px;
          padding: 0.65rem 1rem;
          border-radius: 10px;
          border: 1px solid rgba(184, 151, 104, 0.55);
          background-color: #f6f3ec;
          color: #1d221f;
          font-family: var(--font-main);
          font-size: 0.95rem;
        }

        .step-error {
          color: #f3c6c6;
          font-size: 0.88rem;
          margin-bottom: 1rem;
        }

        /* Paso 2 */
        .natal-summary-strip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          background: rgba(246, 243, 236, 0.08);
          border: 1px solid rgba(184, 151, 104, 0.4);
          border-radius: 12px;
          padding: 0.9rem 1.25rem;
          margin-bottom: 1.75rem;
        }

        .strip-kicker {
          display: block;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #b89768;
          font-weight: 700;
        }

        .strip-main {
          font-size: 0.95rem;
          color: #f6f3ec;
        }

        .strip-edit-btn {
          background: none;
          border: 1px solid rgba(246, 243, 236, 0.3);
          border-radius: 9999px;
          padding: 0.35rem 0.9rem;
          color: #f6f3ec;
          font-size: 0.72rem;
          cursor: pointer;
        }

        .step2-intro {
          text-align: center;
          max-width: 620px;
          margin: 0 auto 2rem;
        }

        .step2-intro h3 {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: #f6f3ec;
          margin-bottom: 0.5rem;
        }

        .step2-intro p {
          font-size: 0.94rem;
          color: rgba(246, 243, 236, 0.76);
        }

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

        .estado-card h4 {
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

        /* Paso 3A: Breathing */
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
          padding: 0.8rem 1.6rem;
          color: #2c3a33;
          font-family: var(--font-main);
          font-size: 0.76rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          cursor: pointer;
        }

        /* Paso 3B: Resultado Integrado */
        .receta-editorial {
          max-width: 760px;
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
          margin-bottom: 0.55rem;
        }

        .receta-sub {
          font-size: 0.96rem;
          color: #4f4b45;
          line-height: 1.6;
        }

        .receta-question {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: clamp(1.28rem, 2.8vw, 1.65rem);
          line-height: 1.5;
          color: #1d221f;
          margin-bottom: 1rem;
        }

        .natal-secondary-question {
          font-size: 0.9rem;
          color: #5c5852;
          margin-bottom: 1.5rem;
          line-height: 1.6;
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

        .nota-botanica-box {
          background-color: #eae3d5;
          border-left: 3px solid #b89768;
          border-radius: 10px;
          padding: 1.25rem 1.35rem;
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

        .nota-botanica-text {
          font-size: 0.96rem;
          line-height: 1.65;
          color: #1d221f;
          margin-bottom: 0.65rem;
        }

        .nota-botanica-link {
          font-size: 0.78rem;
          font-weight: 600;
          color: #2c3a33;
          text-decoration: underline;
        }

        .freemium-cta-block {
          margin-bottom: 1.25rem;
        }

        .freemium-desc {
          font-size: 0.92rem;
          color: #5c5852;
          line-height: 1.65;
          max-width: 580px;
          margin: 0 auto 1.25rem;
        }

        .freemium-actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
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
          .linear-steps,
          .step1-fields,
          .estados-grid,
          .colega-grid {
            grid-template-columns: 1fr;
          }

          .receta-editorial {
            padding: 2rem 1.35rem;
          }
        }
      `}</style>
    </section>
  );
}
