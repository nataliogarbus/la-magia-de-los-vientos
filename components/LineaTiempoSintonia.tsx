'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AmbientSoundEngine, SoundMood } from '@/lib/ambient-audio';

const STORAGE_KEY = 'lamagia_linea_tiempo_v1';
const TOTAL_SECONDS = 60;

interface MapaNatalData {
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

interface ArbolData {
  madre: string;
  padre: string;
  abuelos: string;
  fechasRepeticiones: string;
}

interface PulsoEntry {
  id: string;
  fecha: string;
  estado: string;
  registro: string;
}

interface VibracionalData {
  flores: string;
  musica: string;
  gemas: string;
}

interface TimelineStore {
  activeHito: number;
  completedHitos: number[];
  mapaNatal: MapaNatalData | null;
  arbol: ArbolData;
  selectedEstadoId: Exclude<SoundMood, 'ambient'> | null;
  pulsoEntries: PulsoEntry[];
  vibracional: VibracionalData;
}

const DEFAULT_STORE: TimelineStore = {
  activeHito: 1,
  completedHitos: [],
  mapaNatal: null,
  arbol: { madre: '', padre: '', abuelos: '', fechasRepeticiones: '' },
  selectedEstadoId: null,
  pulsoEntries: [],
  vibracional: { flores: '', musica: '', gemas: '' },
};

const DOCE_CURADORES = [
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
    pregunta: '¿Qué paso postergás hoy por miedo a lo que ya conocés o a quedar expuesto?',
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
    pregunta: '¿Qué dolor o incomodidad estás cubriendo con buen humor para evitar un conflicto?',
  },
  {
    semitono: 'Mi (E)',
    flor: 'Chicory',
    grupoFloral: 'Preocupación excesiva por los demás',
    arquetipo: 'El Cuidador que aprende el amor sin apego',
    pregunta: '¿Dónde estás dando de más esperando inconscientemente retribución o permanencia?',
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
    pregunta: '¿En qué vínculo cediste tu propia voz para no decepcionar al otro?',
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
    pregunta: '¿Entre qué dos caminos oscilás hoy sin animarte a elegir uno con presencia?',
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

export default function LineaTiempoSintonia() {
  const [store, setStore] = useState<TimelineStore>(DEFAULT_STORE);
  const [hydrated, setHydrated] = useState(false);

  // Inputs Hito 01
  const [nombreInput, setNombreInput] = useState('');
  const [fechaInput, setFechaInput] = useState('');
  const [hito1Error, setHito1Error] = useState<string | null>(null);

  // Input Hito 03
  const [registroHoy, setRegistroHoy] = useState('');

  // Estado Hito 04 (Pausa 60s)
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseRunning, setPauseRunning] = useState(false);

  // Hito 05
  const [vistaColega, setVistaColega] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const engineRef = useRef<AmbientSoundEngine | null>(null);

  useEffect(() => {
    engineRef.current = new AmbientSoundEngine();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<TimelineStore>;
        const merged: TimelineStore = {
          activeHito: parsed.activeHito || 1,
          completedHitos: Array.isArray(parsed.completedHitos) ? parsed.completedHitos : [],
          mapaNatal: parsed.mapaNatal || null,
          arbol: { ...DEFAULT_STORE.arbol, ...(parsed.arbol || {}) },
          selectedEstadoId: parsed.selectedEstadoId || null,
          pulsoEntries: Array.isArray(parsed.pulsoEntries) ? parsed.pulsoEntries : [],
          vibracional: { ...DEFAULT_STORE.vibracional, ...(parsed.vibracional || {}) },
        };
        setStore(merged);
        if (merged.mapaNatal) {
          setNombreInput(merged.mapaNatal.nombre === 'Consultante' ? '' : merged.mapaNatal.nombre);
          setFechaInput(merged.mapaNatal.fechaNacimiento);
        }
      }
    } catch {
      // Ignorar si localStorage no está disponible
    }
    setHydrated(true);

    return () => {
      engineRef.current?.stop();
    };
  }, []);

  const updateStore = (next: TimelineStore) => {
    setStore(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignorar
    }
  };

  const markCompleted = (current: number[], hito: number) =>
    current.includes(hito) ? current : [...current, hito];

  useEffect(() => {
    if (!pauseRunning || isPaused) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          engineRef.current?.stop();
          setPauseRunning(false);
          setStore((prevStore) => {
            const next: TimelineStore = {
              ...prevStore,
              completedHitos: markCompleted(prevStore.completedHitos, 4),
              activeHito: 5,
            };
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            } catch {
              // Ignorar
            }
            return next;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [pauseRunning, isPaused]);

  const handleHito1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setHito1Error(null);
    if (!fechaInput) {
      setHito1Error('Ingresá tu fecha de nacimiento para calcular tu Nota Raíz.');
      return;
    }

    const birth = new Date(`${fechaInput}T00:00:00`);
    const today = new Date();
    if (Number.isNaN(birth.getTime()) || birth > today) {
      setHito1Error('Ingresá una fecha de nacimiento válida.');
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
    const proyectoSentido = `${fmt.format(psStart)} — ${fmt.format(birth)}`;

    const septenio = Math.floor(Math.max(0, age) / 7) + 1;
    const mitadEdad = age >= 2 ? Math.floor(age / 2) : 0;
    const septenioPrevio = Math.max(0, (septenio - 1) * 7);
    const edadesEspejo = `Mitad de vida: ${mitadEdad} años · Inicio de ciclo: ${septenioPrevio} años · Próximo hito: ${
      septenio * 7
    } años`;

    const mapaNatal: MapaNatalData = {
      nombre: nombreInput.trim() || 'Consultante',
      fechaNacimiento: fechaInput,
      edad: age,
      semitono: curador.semitono,
      florNatal: curador.flor,
      arquetipo: curador.arquetipo,
      grupoFloral: curador.grupoFloral,
      cicloActual: `${age} años (Septenio ${septenio}°)`,
      proyectoSentido,
      edadesEspejo,
      preguntaNatal: curador.pregunta,
    };

    updateStore({
      ...store,
      mapaNatal,
      completedHitos: markCompleted(store.completedHitos, 1),
      activeHito: 2,
    });
  };

  const handleHito2Next = (markDone: boolean) => {
    updateStore({
      ...store,
      completedHitos: markDone ? markCompleted(store.completedHitos, 2) : store.completedHitos,
      activeHito: 3,
    });
  };

  const handleStartHito4 = (estado: EstadoMomento) => {
    let nextEntries = store.pulsoEntries;
    if (registroHoy.trim()) {
      const entry: PulsoEntry = {
        id: `${Date.now()}`,
        fecha: new Date().toLocaleDateString('es-AR'),
        estado: estado.titulo,
        registro: registroHoy.trim(),
      };
      nextEntries = [entry, ...store.pulsoEntries];
      setRegistroHoy('');
    }

    updateStore({
      ...store,
      selectedEstadoId: estado.id,
      pulsoEntries: nextEntries,
      completedHitos: markCompleted(store.completedHitos, 3),
      activeHito: 4,
    });

    setSecondsLeft(TOTAL_SECONDS);
    setIsPaused(false);
    setPauseRunning(true);
    engineRef.current?.start(estado.id, 0.35);
  };

  const togglePause = () => {
    if (!store.selectedEstadoId) return;
    if (isPaused) {
      engineRef.current?.start(store.selectedEstadoId, 0.35);
      setIsPaused(false);
    } else {
      engineRef.current?.stop();
      setIsPaused(true);
    }
  };

  const finishHito4Now = () => {
    engineRef.current?.stop();
    setPauseRunning(false);
    updateStore({
      ...store,
      completedHitos: markCompleted(store.completedHitos, 4),
      activeHito: 5,
    });
  };

  const handleReset = () => {
    engineRef.current?.stop();
    setPauseRunning(false);
    setSecondsLeft(TOTAL_SECONDS);
    setNombreInput('');
    setFechaInput('');
    setRegistroHoy('');
    updateStore(DEFAULT_STORE);
  };

  const selectedEstado =
    ESTADOS_MOMENTO.find((e) => e.id === store.selectedEstadoId) || null;

  const handleShare = async () => {
    if (!store.mapaNatal || !selectedEstado) return;
    const shareText = `Mi Partitura de Evolución · La Magia de los Vientos:\n• Nota Raíz: ${store.mapaNatal.florNatal} (${store.mapaNatal.semitono})\n• Pulso Presente: ${selectedEstado.titulo}\n• Pregunta para hoy: "${selectedEstado.pregunta}"\n• Esencia de apoyo: ${selectedEstado.esenciaPresente} (${selectedEstado.preparadoNombre})\n\nDescubrí tu línea de tiempo en lamagiadelosvientos.com.ar`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Mi Partitura de Evolución · La Magia de los Vientos',
          text: shareText,
          url: window.location.href,
        });
        setShareFeedback('Plan de 21 días compartido');
        return;
      } catch {
        // Fallback portapapeles
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

  const progressPercent = Math.round((store.completedHitos.length / 5) * 100);
  const circumference = 2 * Math.PI * 76;
  const strokeDashoffset =
    circumference - (((TOTAL_SECONDS - secondsLeft) / TOTAL_SECONDS) * circumference);

  const breathCue =
    secondsLeft % 12 >= 8
      ? 'Inhalá lento, abriendo el pecho...'
      : secondsLeft % 12 >= 4
      ? 'Sostené el silencio entre notas...'
      : 'Exhalá largo y soltá el peso...';

  const getHitoStatus = (num: number): 'completed' | 'active' | 'pending' => {
    if (store.activeHito === num) return 'active';
    if (store.completedHitos.includes(num)) return 'completed';
    return 'pending';
  };

  return (
    <section className="timeline-section" aria-labelledby="partitura-titulo">
      <div className="container timeline-container">
        {/* Cabecera + Barra de Progreso */}
        <header className="timeline-header">
          <span className="timeline-eyebrow">PARTITURA DE EVOLUCIÓN · RECORRIDO PERSONAL</span>
          <h2 id="partitura-titulo">
            Tu Línea de <em>Tiempo</em> y <em>Sintonía</em>
          </h2>
          <p className="timeline-lead">
            Cinco hitos continuos para unir tu historia natal, tu árbol familiar, tu pulso presente y tu bitácora vibracional en este dispositivo.
          </p>

          <div className="progress-panel no-print">
            <div className="progress-meta">
              <span>{progressPercent}% de tu mapa completado</span>
              {store.completedHitos.length > 0 && (
                <button type="button" onClick={handleReset} className="reset-timeline-btn">
                  Reiniciar recorrido
                </button>
              )}
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </header>

        {hydrated && (
          <div className="timeline-track">
            {/* HITO 01: TU NOTA RAÍZ */}
            <div className={`hito-row ${getHitoStatus(1)}`}>
              <div className="hito-node-col">
                <button
                  type="button"
                  onClick={() => updateStore({ ...store, activeHito: 1 })}
                  className="hito-node"
                  aria-label="Ir al Hito 01"
                >
                  {store.completedHitos.includes(1) && store.activeHito !== 1 ? '✓' : '01'}
                </button>
                <div className="hito-line" />
              </div>

              <article className="hito-card">
                <div
                  className="hito-card-head"
                  onClick={() => updateStore({ ...store, activeHito: 1 })}
                >
                  <div>
                    <span className="hito-kicker">Hito 01 · Origen y Ciclos</span>
                    <h3>Tu Nota Raíz</h3>
                  </div>
                  {store.mapaNatal && store.activeHito !== 1 && (
                    <span className="hito-summary-chip">
                      {store.mapaNatal.florNatal} · {store.mapaNatal.semitono}
                    </span>
                  )}
                </div>

                {store.activeHito === 1 ? (
                  <form onSubmit={handleHito1Submit} className="hito-body">
                    <div className="two-col-inputs">
                      <div className="field-box">
                        <label htmlFor="t-nombre">Tu nombre (opcional)</label>
                        <input
                          id="t-nombre"
                          type="text"
                          placeholder="Ej: Sofía"
                          value={nombreInput}
                          onChange={(e) => setNombreInput(e.target.value)}
                        />
                      </div>
                      <div className="field-box">
                        <label htmlFor="t-fecha">
                          Fecha de nacimiento <span className="req">*</span>
                        </label>
                        <input
                          id="t-fecha"
                          type="date"
                          required
                          value={fechaInput}
                          onChange={(e) => setFechaInput(e.target.value)}
                        />
                      </div>
                    </div>

                    {hito1Error && <p className="error-msg">{hito1Error}</p>}

                    <button type="submit" className="btn-sage">
                      Calcular Nota Raíz y continuar →
                    </button>
                  </form>
                ) : (
                  store.mapaNatal && (
                    <div className="natal-collapsed-grid">
                      <div>
                        <span className="mini-label">Arquetipo</span>
                        <span className="mini-val">{store.mapaNatal.arquetipo}</span>
                      </div>
                      <div>
                        <span className="mini-label">Ciclo Actual</span>
                        <span className="mini-val">{store.mapaNatal.cicloActual}</span>
                      </div>
                      <div>
                        <span className="mini-label">Proyecto Sentido (9m)</span>
                        <span className="mini-val">{store.mapaNatal.proyectoSentido}</span>
                      </div>
                      <div>
                        <span className="mini-label">Edades Espejo</span>
                        <span className="mini-val">{store.mapaNatal.edadesEspejo}</span>
                      </div>
                    </div>
                  )
                )}
              </article>
            </div>

            {/* HITO 02: RESONANCIA FAMILIAR */}
            <div className={`hito-row ${getHitoStatus(2)}`}>
              <div className="hito-node-col">
                <button
                  type="button"
                  onClick={() => store.mapaNatal && updateStore({ ...store, activeHito: 2 })}
                  className="hito-node"
                  aria-label="Ir al Hito 02"
                >
                  {store.completedHitos.includes(2) && store.activeHito !== 2 ? '✓' : '02'}
                </button>
                <div className="hito-line" />
              </div>

              <article className="hito-card">
                <div
                  className="hito-card-head"
                  onClick={() => store.mapaNatal && updateStore({ ...store, activeHito: 2 })}
                >
                  <div>
                    <span className="hito-kicker">Hito 02 · Árbol Genealógico</span>
                    <h3>Resonancia Familiar</h3>
                  </div>
                  {store.activeHito !== 2 && (
                    <span className="hito-status-text">
                      {store.completedHitos.includes(2)
                        ? 'Registrado'
                        : store.mapaNatal
                        ? 'Opcional · Tocar para editar'
                        : 'Por descubrir'}
                    </span>
                  )}
                </div>

                {store.activeHito === 2 && (
                  <div className="hito-body">
                    {store.mapaNatal && (
                      <div className="ps-highlight">
                        <strong>Ventana de Proyecto Sentido ({store.mapaNatal.proyectoSentido}):</strong>{' '}
                        ¿Qué vivían tu mamá y tu papá en esos 9 meses previos a tu nacimiento?
                      </div>
                    )}
                    <div className="two-col-inputs">
                      <div className="field-box">
                        <label htmlFor="t-madre">Rama materna (historia, fechas)</label>
                        <input
                          id="t-madre"
                          type="text"
                          placeholder="Ej: Profesión, duelos o vivencias de mamá..."
                          value={store.arbol.madre}
                          onChange={(e) =>
                            updateStore({
                              ...store,
                              arbol: { ...store.arbol, madre: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="field-box">
                        <label htmlFor="t-padre">Rama paterna (historia, fechas)</label>
                        <input
                          id="t-padre"
                          type="text"
                          placeholder="Ej: Profesión, carácter o historia de papá..."
                          value={store.arbol.padre}
                          onChange={(e) =>
                            updateStore({
                              ...store,
                              arbol: { ...store.arbol, padre: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="field-box">
                        <label htmlFor="t-abuelos">Abuelos / Ancestros relevantes</label>
                        <input
                          id="t-abuelos"
                          type="text"
                          placeholder="Migraciones, nombres heredados..."
                          value={store.arbol.abuelos}
                          onChange={(e) =>
                            updateStore({
                              ...store,
                              arbol: { ...store.arbol, abuelos: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="field-box">
                        <label htmlFor="t-rep">Fechas espejo / repeticiones</label>
                        <input
                          id="t-rep"
                          type="text"
                          placeholder="Coincidencias de fechas o edades..."
                          value={store.arbol.fechasRepeticiones}
                          onChange={(e) =>
                            updateStore({
                              ...store,
                              arbol: { ...store.arbol, fechasRepeticiones: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="hito-btn-row">
                      <button
                        type="button"
                        onClick={() => handleHito2Next(true)}
                        className="btn-sage"
                      >
                        Guardar y seguir al Hito 03 →
                      </button>
                      <button
                        type="button"
                        onClick={() => handleHito2Next(false)}
                        className="btn-ghost-dark"
                      >
                        Completar más tarde
                      </button>
                    </div>
                  </div>
                )}
              </article>
            </div>

            {/* HITO 03: TU PULSO PRESENTE */}
            <div className={`hito-row ${getHitoStatus(3)}`}>
              <div className="hito-node-col">
                <button
                  type="button"
                  onClick={() => store.mapaNatal && updateStore({ ...store, activeHito: 3 })}
                  className="hito-node"
                  aria-label="Ir al Hito 03"
                >
                  {store.completedHitos.includes(3) && store.activeHito !== 3 ? '✓' : '03'}
                </button>
                <div className="hito-line" />
              </div>

              <article className="hito-card">
                <div
                  className="hito-card-head"
                  onClick={() => store.mapaNatal && updateStore({ ...store, activeHito: 3 })}
                >
                  <div>
                    <span className="hito-kicker">Hito 03 · Escucha Intuitiva &amp; Bitácora</span>
                    <h3>Tu Pulso Presente</h3>
                  </div>
                  {selectedEstado && store.activeHito !== 3 && (
                    <span className="hito-summary-chip">{selectedEstado.titulo}</span>
                  )}
                </div>

                {store.activeHito === 3 && (
                  <div className="hito-body">
                    <div className="field-box" style={{ marginBottom: '1.25rem' }}>
                      <label htmlFor="t-registro-hoy">
                        ¿Qué síntoma, emoción o deseo querés armonizar hoy? (opcional)
                      </label>
                      <input
                        id="t-registro-hoy"
                        type="text"
                        placeholder="Ej: Tensión en hombros desde la semana pasada / Deseo recuperar calma..."
                        value={registroHoy}
                        onChange={(e) => setRegistroHoy(e.target.value)}
                      />
                    </div>

                    <div className="estados-grid">
                      {ESTADOS_MOMENTO.map((estado) => (
                        <div key={estado.id} className="estado-mini-card">
                          <h4>{estado.titulo}</h4>
                          <p>{estado.descripcion}</p>
                          <div className="estado-mini-actions">
                            <button
                              type="button"
                              onClick={() => engineRef.current?.playContrastTexture(estado.id)}
                              className="btn-texture"
                            >
                              Escuchar textura (2s)
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStartHito4(estado)}
                              className="btn-sage-sm"
                            >
                              Iniciar pausa de 60s →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {store.pulsoEntries.length > 0 && (
                      <div className="pulso-history">
                        <span className="mini-label">Tu historial reciente</span>
                        <ul>
                          {store.pulsoEntries.slice(0, 3).map((item) => (
                            <li key={item.id}>
                              <strong>{item.fecha}</strong> ({item.estado}): {item.registro}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </article>
            </div>

            {/* HITO 04: EL SILENCIO ENTRE NOTAS */}
            <div className={`hito-row ${getHitoStatus(4)}`}>
              <div className="hito-node-col">
                <button
                  type="button"
                  onClick={() => selectedEstado && updateStore({ ...store, activeHito: 4 })}
                  className="hito-node"
                  aria-label="Ir al Hito 04"
                >
                  {store.completedHitos.includes(4) && store.activeHito !== 4 ? '✓' : '04'}
                </button>
                <div className="hito-line" />
              </div>

              <article className={`hito-card ${store.activeHito === 4 ? 'hito-card-dark' : ''}`}>
                <div className="hito-card-head">
                  <div>
                    <span className="hito-kicker">Hito 04 · Pausa Armónica de 60s</span>
                    <h3>El Silencio entre Notas</h3>
                  </div>
                  {store.activeHito !== 4 && (
                    <span className="hito-status-text">
                      {store.completedHitos.includes(4) ? 'Pausa completada' : 'Por descubrir'}
                    </span>
                  )}
                </div>

                {store.activeHito === 4 && selectedEstado && (
                  <div className="breathing-stage" aria-live="polite">
                    <div className={`organic-orb-wrap ${isPaused ? 'paused' : ''}`}>
                      <div className="orb-aura" />
                      <div className="orb-core" />
                      <svg className="orb-svg" viewBox="0 0 170 170" width="200" height="200">
                        <circle
                          cx="85"
                          cy="85"
                          r="76"
                          fill="none"
                          stroke="rgba(246,243,236,0.16)"
                          strokeWidth="2"
                        />
                        <circle
                          cx="85"
                          cy="85"
                          r="76"
                          fill="none"
                          stroke="#B89768"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          transform="rotate(-90 85 85)"
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

                    <div className="hito-btn-row centered">
                      <button type="button" onClick={togglePause} className="pill-btn-light">
                        {isPaused ? 'Reanudar audio' : 'Pausar'}
                      </button>
                      <button type="button" onClick={finishHito4Now} className="pill-btn-bronze">
                        Desbloquear mi Síntesis →
                      </button>
                    </div>
                  </div>
                )}
              </article>
            </div>

            {/* HITO 05: TU SÍNTESIS, BITÁCORA VIBRACIONAL Y COMUNIDAD */}
            <div className={`hito-row ${getHitoStatus(5)}`}>
              <div className="hito-node-col">
                <button
                  type="button"
                  onClick={() =>
                    store.completedHitos.includes(4) && updateStore({ ...store, activeHito: 5 })
                  }
                  className="hito-node"
                  aria-label="Ir al Hito 05"
                >
                  05
                </button>
              </div>

              <article className="hito-card">
                <div className="hito-card-head">
                  <div>
                    <span className="hito-kicker">Hito 05 · Integración &amp; Acompañamiento</span>
                    <h3>Tu Síntesis, Bitácora Vibracional y Comunidad</h3>
                  </div>
                </div>

                {store.activeHito === 5 && store.mapaNatal && selectedEstado && (
                  <div className="hito-body">
                    <div className="sintesis-top-bar no-print">
                      <span className="sintesis-chip">
                        {store.mapaNatal.florNatal} ({store.mapaNatal.semitono}) + {selectedEstado.titulo}
                      </span>
                      <label className="colega-toggle">
                        <input
                          type="checkbox"
                          checked={vistaColega}
                          onChange={(e) => setVistaColega(e.target.checked)}
                        />
                        <span>Vista Terapeuta / Colega</span>
                      </label>
                    </div>

                    <blockquote className="sintesis-question">
                      &ldquo;{selectedEstado.pregunta}&rdquo;
                    </blockquote>
                    <p className="sintesis-natal-q">
                      <strong>Pregunta de tu ciclo ({store.mapaNatal.cicloActual}):</strong>{' '}
                      {store.mapaNatal.preguntaNatal}
                    </p>

                    {vistaColega && (
                      <div className="colega-panel">
                        <div className="colega-grid">
                          <div>
                            <span className="mini-label">Grupo Floral Natal</span>
                            <span className="mini-val">
                              {store.mapaNatal.florNatal} ({store.mapaNatal.grupoFloral})
                            </span>
                          </div>
                          <div>
                            <span className="mini-label">Grupo Presente</span>
                            <span className="mini-val">{selectedEstado.grupoFloral}</span>
                          </div>
                          <div>
                            <span className="mini-label">Proyecto Sentido (9m)</span>
                            <span className="mini-val">{store.mapaNatal.proyectoSentido}</span>
                          </div>
                          <div>
                            <span className="mini-label">Edades Espejo</span>
                            <span className="mini-val">{store.mapaNatal.edadesEspejo}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Nota Botánica Sutil (sin precios) */}
                    <div className="nota-botanica-box">
                      <span className="mini-label">Nota Botánica &amp; Vibracional</span>
                      <p>
                        Para acompañar esta frecuencia, la tradición floral trabaja con la esencia de{' '}
                        <strong>{selectedEstado.esenciaPresente}</strong> (en diálogo con tu flor natal{' '}
                        <strong>{store.mapaNatal.florNatal}</strong>), base de la fórmula{' '}
                        <strong>{selectedEstado.preparadoNombre}</strong>.
                      </p>
                      <Link href={`/tienda/${selectedEstado.preparadoSlug}`} className="nota-link">
                        Conocer más sobre esta esencia →
                      </Link>
                    </div>

                    {/* Bitácora Vibracional de 21 días */}
                    <div className="vibracional-box">
                      <h4>Bitácora Vibracional (21 Días)</h4>
                      <div className="two-col-inputs">
                        <div className="field-box">
                          <label htmlFor="v-flores">Flores / Esencias en uso</label>
                          <input
                            id="v-flores"
                            type="text"
                            placeholder="Ej: Calma Total / White Chestnut..."
                            value={store.vibracional.flores}
                            onChange={(e) =>
                              updateStore({
                                ...store,
                                vibracional: { ...store.vibracional, flores: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="field-box">
                          <label htmlFor="v-musica">Atmósferas / Piezas musicales</label>
                          <input
                            id="v-musica"
                            type="text"
                            placeholder="Ej: Handpan en Re menor..."
                            value={store.vibracional.musica}
                            onChange={(e) =>
                              updateStore({
                                ...store,
                                vibracional: { ...store.vibracional, musica: e.target.value },
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="field-box" style={{ marginTop: '0.75rem' }}>
                        <label htmlFor="v-gemas">Gemas y prácticas corporales</label>
                        <input
                          id="v-gemas"
                          type="text"
                          placeholder="Ej: Amatista, respiración 4-4-4..."
                          value={store.vibracional.gemas}
                          onChange={(e) =>
                            updateStore({
                              ...store,
                              vibracional: { ...store.vibracional, gemas: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* Acciones Freemium + PDF */}
                    <div className="hito5-actions no-print">
                      <a
                        href={`https://wa.me/5491149143734?text=${encodeURIComponent(
                          `Hola Eliana! Soy ${store.mapaNatal.nombre}. Completé mi Partitura de Evolución (${store.mapaNatal.florNatal} + ${selectedEstado.titulo}) y quiero sumarme gratis a la Comunidad de WhatsApp.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-sage"
                      >
                        Sumarme a la Comunidad de WhatsApp
                      </a>
                      <button type="button" onClick={handleShare} className="btn-ghost-dark">
                        Guardar Plan de 21 Días
                      </button>
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="btn-ghost-dark"
                      >
                        Exportar / Imprimir mi Línea de Tiempo (PDF)
                      </button>
                    </div>
                    {shareFeedback && <p className="share-feedback">{shareFeedback}</p>}
                  </div>
                )}
              </article>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .timeline-section {
          padding: 5.5rem 0;
          background-color: #f6f3ec;
          color: #1d221f;
        }

        .timeline-container {
          max-width: 920px;
        }

        .timeline-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 3.25rem;
        }

        .timeline-eyebrow {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.26em;
          color: #b89768;
          margin-bottom: 0.9rem;
        }

        .timeline-header h2 {
          font-family: var(--font-serif);
          font-size: clamp(2.1rem, 4.5vw, 3.1rem);
          font-weight: 400;
          color: #1d221f;
          margin-bottom: 0.9rem;
        }

        .timeline-header em {
          font-style: italic;
          color: #2c3a33;
        }

        .timeline-lead {
          font-size: 1rem;
          font-weight: 300;
          color: #5c5852;
          line-height: 1.75;
          margin-bottom: 1.75rem;
        }

        .progress-panel {
          background-color: #ffffff;
          border: 1px solid rgba(184, 151, 104, 0.35);
          border-radius: 12px;
          padding: 0.9rem 1.25rem;
        }

        .progress-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.78rem;
          font-weight: 600;
          color: #2c3a33;
          margin-bottom: 0.55rem;
        }

        .reset-timeline-btn {
          background: none;
          border: none;
          color: #7a746e;
          text-decoration: underline;
          font-size: 0.75rem;
          cursor: pointer;
        }

        .progress-bar-bg {
          width: 100%;
          height: 6px;
          background-color: #eae3d5;
          border-radius: 9999px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #2c3a33, #b89768);
          transition: width 0.4s ease;
        }

        /* Vertical Track */
        .timeline-track {
          display: flex;
          flex-direction: column;
        }

        .hito-row {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 1.25rem;
        }

        .hito-node-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hito-node {
          width: 44px;
          height: 44px;
          border-radius: 9999px;
          border: 2px solid rgba(44, 58, 51, 0.25);
          background-color: #f6f3ec;
          color: #7a746e;
          font-family: var(--font-serif);
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }

        .hito-row.completed .hito-node {
          background-color: #2c3a33;
          border-color: #2c3a33;
          color: #f6f3ec;
        }

        .hito-row.active .hito-node {
          background-color: #b89768;
          border-color: #2c3a33;
          color: #2c3a33;
          font-weight: 700;
          box-shadow: 0 0 0 5px rgba(184, 151, 104, 0.22);
        }

        .hito-line {
          width: 2px;
          flex: 1;
          min-height: 24px;
          background: linear-gradient(180deg, #b89768 0%, rgba(44, 58, 51, 0.18) 100%);
          margin: 0.4rem 0;
        }

        .hito-card {
          background-color: #ffffff;
          border: 1px solid rgba(184, 151, 104, 0.35);
          border-radius: 16px;
          padding: 1.5rem 1.75rem;
          margin-bottom: 1.5rem;
          box-shadow: var(--shadow-sm);
        }

        .hito-row.pending .hito-card {
          opacity: 0.72;
          background-color: rgba(255, 255, 255, 0.6);
        }

        .hito-card-dark {
          background-color: #2c3a33;
          color: #f6f3ec;
          border-color: #b89768;
        }

        .hito-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          cursor: pointer;
        }

        .hito-kicker {
          display: block;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #b89768;
          margin-bottom: 0.2rem;
        }

        .hito-card-head h3 {
          font-family: var(--font-serif);
          font-size: 1.38rem;
          font-weight: 400;
          color: inherit;
        }

        .hito-summary-chip {
          font-size: 0.74rem;
          font-weight: 600;
          background-color: #eae3d5;
          color: #2c3a33;
          padding: 0.3rem 0.85rem;
          border-radius: 9999px;
        }

        .hito-status-text {
          font-size: 0.76rem;
          color: #7a746e;
        }

        .hito-body {
          margin-top: 1.35rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(184, 151, 104, 0.25);
        }

        .two-col-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.15rem;
        }

        .field-box {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .field-box label {
          font-size: 0.82rem;
          font-weight: 500;
          color: #2c3a33;
        }

        .req {
          color: #b89768;
        }

        .field-box input {
          min-height: 44px;
          padding: 0.6rem 0.85rem;
          border-radius: 8px;
          border: 1px solid rgba(184, 151, 104, 0.45);
          background-color: #f6f3ec;
          color: #1d221f;
          font-family: var(--font-main);
          font-size: 0.92rem;
        }

        .natal-collapsed-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 0.75rem;
          margin-top: 1rem;
          padding-top: 0.9rem;
          border-top: 1px solid rgba(184, 151, 104, 0.2);
        }

        .mini-label {
          display: block;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #b89768;
          font-weight: 700;
          margin-bottom: 0.15rem;
        }

        .mini-val {
          font-size: 0.86rem;
          color: #1d221f;
        }

        .ps-highlight {
          background-color: #eae3d5;
          border-left: 3px solid #b89768;
          padding: 0.85rem 1rem;
          border-radius: 8px;
          font-size: 0.88rem;
          margin-bottom: 1.15rem;
          line-height: 1.55;
        }

        .hito-btn-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .hito-btn-row.centered {
          justify-content: center;
        }

        .btn-sage {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #2c3a33;
          color: #f6f3ec;
          border: none;
          border-radius: 9999px;
          padding: 0.8rem 1.5rem;
          font-family: var(--font-main);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          cursor: pointer;
        }

        .btn-ghost-dark {
          background: transparent;
          border: 1px solid rgba(44, 58, 51, 0.35);
          border-radius: 9999px;
          padding: 0.75rem 1.35rem;
          color: #2c3a33;
          font-family: var(--font-main);
          font-size: 0.74rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
        }

        /* Hito 03 */
        .estados-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .estado-mini-card {
          background-color: #f6f3ec;
          border: 1px solid rgba(184, 151, 104, 0.38);
          border-radius: 12px;
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
        }

        .estado-mini-card h4 {
          font-family: var(--font-serif);
          font-size: 1.18rem;
          color: #2c3a33;
          margin-bottom: 0.4rem;
        }

        .estado-mini-card p {
          font-size: 0.84rem;
          color: #5c5852;
          line-height: 1.5;
          margin-bottom: 1rem;
          flex: 1;
        }

        .estado-mini-actions {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .btn-texture {
          background: transparent;
          border: 1px solid rgba(44, 58, 51, 0.3);
          border-radius: 9999px;
          padding: 0.45rem 0.75rem;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #2c3a33;
          cursor: pointer;
        }

        .btn-sage-sm {
          background-color: #2c3a33;
          border: none;
          border-radius: 9999px;
          padding: 0.6rem 0.85rem;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #f6f3ec;
          cursor: pointer;
        }

        .pulso-history {
          margin-top: 1.25rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(184, 151, 104, 0.25);
        }

        .pulso-history ul {
          list-style: none;
          font-size: 0.85rem;
          color: #4f4b45;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        /* Hito 04 Breathing */
        .breathing-stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1.75rem 0 0.5rem;
        }

        .organic-orb-wrap {
          position: relative;
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .orb-aura {
          position: absolute;
          width: 140px;
          height: 140px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(184, 151, 104, 0.38) 0%, rgba(184, 151, 104, 0.05) 70%);
          animation: breathCycle 12s ease-in-out infinite;
        }

        .orb-core {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 9999px;
          border: 1px solid rgba(184, 151, 104, 0.55);
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

        .orb-svg {
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
          font-size: 2.2rem;
          color: #f6f3ec;
          line-height: 1;
        }

        .orb-state {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #b89768;
          margin-top: 0.3rem;
        }

        .poetic-breath {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.3rem;
          color: #f6f3ec;
          margin-bottom: 0.35rem;
        }

        .mood-caption {
          font-size: 0.82rem;
          color: rgba(246, 243, 236, 0.65);
          margin-bottom: 1.5rem;
        }

        .pill-btn-light {
          background: transparent;
          border: 1px solid rgba(246, 243, 236, 0.35);
          border-radius: 9999px;
          padding: 0.6rem 1.25rem;
          color: #f6f3ec;
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
        }

        .pill-btn-bronze {
          background-color: #b89768;
          border: none;
          border-radius: 9999px;
          padding: 0.7rem 1.4rem;
          color: #2c3a33;
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
        }

        /* Hito 05 */
        .sintesis-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .sintesis-chip {
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          background-color: rgba(184, 151, 104, 0.22);
          color: #2c3a33;
          padding: 0.35rem 0.9rem;
          border-radius: 9999px;
        }

        .colega-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #2c3a33;
          background: #eae3d5;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          cursor: pointer;
        }

        .sintesis-question {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.38rem;
          line-height: 1.5;
          color: #1d221f;
          margin-bottom: 0.85rem;
        }

        .sintesis-natal-q {
          font-size: 0.9rem;
          color: #5c5852;
          margin-bottom: 1.25rem;
          line-height: 1.6;
        }

        .colega-panel {
          background-color: #eae3d5;
          border-radius: 10px;
          padding: 1rem 1.15rem;
          margin-bottom: 1.25rem;
        }

        .colega-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
        }

        .nota-botanica-box {
          background-color: #eae3d5;
          border-left: 3px solid #b89768;
          border-radius: 10px;
          padding: 1.1rem 1.25rem;
          margin-bottom: 1.25rem;
        }

        .nota-botanica-box p {
          font-size: 0.92rem;
          line-height: 1.6;
          margin-bottom: 0.5rem;
        }

        .nota-link {
          font-size: 0.78rem;
          font-weight: 600;
          color: #2c3a33;
          text-decoration: underline;
        }

        .vibracional-box {
          background-color: #f6f3ec;
          border: 1px solid rgba(184, 151, 104, 0.35);
          border-radius: 12px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .vibracional-box h4 {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: #2c3a33;
          margin-bottom: 0.9rem;
        }

        .hito5-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .share-feedback {
          font-size: 0.82rem;
          color: #2c3a33;
          font-weight: 500;
          margin-top: 0.75rem;
        }

        .error-msg {
          color: #8b2e2e;
          font-size: 0.85rem;
          margin-bottom: 0.85rem;
        }

        @media (max-width: 768px) {
          .hito-row {
            grid-template-columns: 36px 1fr;
            gap: 0.75rem;
          }

          .hito-node {
            width: 36px;
            height: 36px;
            font-size: 0.85rem;
          }

          .two-col-inputs,
          .estados-grid,
          .colega-grid {
            grid-template-columns: 1fr;
          }

          .hito-card {
            padding: 1.25rem;
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
        }
      `}</style>
    </section>
  );
}
