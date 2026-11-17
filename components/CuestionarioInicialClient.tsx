'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface CuestionarioState {
  // Paso 1
  nombreCompleto: string;
  dni: string;
  fechaNacimiento: string;
  edad: string;
  lugarNacimiento: string;
  lugarResidencia: string;
  ocupacion: string;
  telefono: string;
  email: string;
  // Paso 2
  temaPrincipal: string;
  origenTema: string;
  sintomasFisicos: string;
  diagnosticoMedico: string;
  lineaTiempo: string;
  // Paso 3
  familiaOrigen: string;
  dinamicaFamiliar: string;
  gestacionNacimiento: string;
  vinculoPadresActual: string;
  vinculoPadresInfancia: string;
  // Paso 4
  logrosSignificativos: string;
  duelosPendientes: string;
  mayoresMiedos: string;
}

interface SubmittedCuestionario extends CuestionarioState {
  timestampArgentina: string;
}

const STEPS = [
  { id: 1, title: 'Datos Personales' },
  { id: 2, title: 'Motivo, Síntomas y Línea del Tiempo' },
  { id: 3, title: 'Historia Familiar y Vínculos' },
  { id: 4, title: 'Logros, Duelos y Miedos' },
];

export default function CuestionarioInicialClient() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedCuestionario | null>(null);

  const [form, setForm] = useState<CuestionarioState>({
    nombreCompleto: '',
    dni: '',
    fechaNacimiento: '',
    edad: '',
    lugarNacimiento: '',
    lugarResidencia: '',
    ocupacion: '',
    telefono: '',
    email: '',
    temaPrincipal: '',
    origenTema: '',
    sintomasFisicos: '',
    diagnosticoMedico: '',
    lineaTiempo: '',
    familiaOrigen: '',
    dinamicaFamiliar: '',
    gestacionNacimiento: '',
    vinculoPadresActual: '',
    vinculoPadresInfancia: '',
    logrosSignificativos: '',
    duelosPendientes: '',
    mayoresMiedos: '',
  });

  useEffect(() => {
    const nombre = searchParams.get('nombre') || '';
    const dni = searchParams.get('dni') || '';
    const email = searchParams.get('email') || '';
    const telefono = searchParams.get('telefono') || '';

    if (nombre || dni || email || telefono) {
      setForm((prev) => ({
        ...prev,
        nombreCompleto: prev.nombreCompleto || nombre,
        dni: prev.dni || dni,
        email: prev.email || email,
        telefono: prev.telefono || telefono,
      }));
    }
  }, [searchParams]);

  const handleDateChange = (dateVal: string) => {
    let computedEdad = form.edad;
    if (dateVal) {
      const birth = new Date(`${dateVal}T00:00:00`);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      if (age > 0 && age < 120) {
        computedEdad = String(age);
      }
    }
    setForm({ ...form, fechaNacimiento: dateVal, edad: computedEdad });
  };

  const validateStep = (targetStep: number): string | null => {
    if (targetStep === 1) {
      if (
        !form.nombreCompleto.trim() ||
        !form.dni.trim() ||
        !form.fechaNacimiento.trim() ||
        !form.edad.trim() ||
        !form.lugarNacimiento.trim() ||
        !form.lugarResidencia.trim() ||
        !form.ocupacion.trim() ||
        !form.telefono.trim() ||
        !form.email.trim()
      ) {
        return 'Por favor, completá todos los datos personales obligatorios.';
      }
      if (Number(form.edad) < 14) {
        return 'Este acompañamiento está habilitado para personas mayores de 14 años.';
      }
    }

    if (targetStep === 2) {
      if (!form.temaPrincipal.trim() || !form.origenTema.trim()) {
        return 'Por favor, completá el tema principal a trabajar y desde cuándo está presente.';
      }
    }

    return null;
  };

  const handleNext = () => {
    const err = validateStep(step);
    if (err) {
      setErrorMsg(err);
      return;
    }
    setErrorMsg(null);
    setStep((prev) => Math.min(4, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setErrorMsg(null);
    setStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err1 = validateStep(1);
    if (err1) {
      setErrorMsg(err1);
      setStep(1);
      return;
    }
    const err2 = validateStep(2);
    if (err2) {
      setErrorMsg(err2);
      setStep(2);
      return;
    }

    setErrorMsg(null);
    setSubmitting(true);
    try {
      const response = await fetch('/api/cuestionario-inicial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setErrorMsg(data.error || 'No se pudo enviar el cuestionario. Intentá nuevamente.');
        return;
      }

      setSubmittedData({
        ...form,
        timestampArgentina: data.timestampArgentina || '',
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setErrorMsg('No se pudo conectar con el servidor. Verificá tu conexión e intentá nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const progressPercent = (step / STEPS.length) * 100;

  return (
    <main className="cuestionario-page">
      <div className="container cuestionario-container">
        <header className="cuestionario-header">
          <span className="cuestionario-badge">Paso 2 de 2 · Confidencial</span>
          <h1>Cuestionario Inicial</h1>
          <p className="cuestionario-intro">
            Hola: este cuestionario me permitirá conocer mejor tu historia antes de nuestro encuentro y aprovechar al máximo el tiempo de sesión. Tómate un momento tranquilo para responder con total sinceridad; toda la información es estrictamente confidencial. Por favor, envíamelo completo al menos 48 horas antes de vernos.
          </p>
        </header>

        {submittedData ? (
          <section className="confirmation-card" aria-live="polite">
            <div className="confirmation-header">
              <span className="confirmation-badge">Admisión Completada</span>
              <h2>¡Documentación Recibida, {submittedData.nombreCompleto}!</h2>
              <p>
                Tu Cuestionario Inicial fue registrado con éxito. <strong>Eliana ya recibió automáticamente toda la documentación en su sistema</strong> y no necesitás realizar ningún envío adicional.
              </p>
            </div>

            <div className="confirmation-actions no-print">
              <button
                type="button"
                onClick={() => window.print()}
                className="pdf-optional-btn"
              >
                Imprimir / Guardar copia en PDF (Opcional)
              </button>
            </div>

            <div className="summary-box">
              <h3>Resumen del Cuestionario Inicial</h3>

              <div className="summary-block">
                <h4>1. Datos Personales</h4>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-label">Nombre y apellido</span>
                    <span className="summary-value">{submittedData.nombreCompleto}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">DNI</span>
                    <span className="summary-value">{submittedData.dni}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Fecha de nacimiento y edad</span>
                    <span className="summary-value">
                      {submittedData.fechaNacimiento} ({submittedData.edad} años)
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Lugar de nacimiento / Residencia</span>
                    <span className="summary-value">
                      {submittedData.lugarNacimiento} · Hoy: {submittedData.lugarResidencia}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Ocupación</span>
                    <span className="summary-value">{submittedData.ocupacion}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Contacto</span>
                    <span className="summary-value">
                      {submittedData.telefono} · {submittedData.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="summary-block">
                <h4>2 y 3. Tema a Trabajar y Síntomas Físicos</h4>
                <p className="summary-paragraph">
                  <strong>Tema principal:</strong> {submittedData.temaPrincipal}
                </p>
                <p className="summary-paragraph">
                  <strong>Inicio y detonante:</strong> {submittedData.origenTema}
                </p>
                {submittedData.sintomasFisicos && (
                  <p className="summary-paragraph">
                    <strong>Síntomas físicos:</strong> {submittedData.sintomasFisicos}
                  </p>
                )}
                {submittedData.diagnosticoMedico && (
                  <p className="summary-paragraph">
                    <strong>Diagnóstico / estudios previos:</strong> {submittedData.diagnosticoMedico}
                  </p>
                )}
              </div>

              {(submittedData.familiaOrigen ||
                submittedData.dinamicaFamiliar ||
                submittedData.gestacionNacimiento ||
                submittedData.vinculoPadresActual ||
                submittedData.vinculoPadresInfancia) && (
                <div className="summary-block">
                  <h4>5 y 6. Historia Familiar y Vínculos Parentales</h4>
                  {submittedData.familiaOrigen && (
                    <p className="summary-paragraph">
                      <strong>Familia de origen:</strong> {submittedData.familiaOrigen}
                    </p>
                  )}
                  {submittedData.dinamicaFamiliar && (
                    <p className="summary-paragraph">
                      <strong>Dinámica familiar:</strong> {submittedData.dinamicaFamiliar}
                    </p>
                  )}
                  {submittedData.gestacionNacimiento && (
                    <p className="summary-paragraph">
                      <strong>Gestación y nacimiento:</strong> {submittedData.gestacionNacimiento}
                    </p>
                  )}
                  {submittedData.vinculoPadresActual && (
                    <p className="summary-paragraph">
                      <strong>Vínculo con padres:</strong> {submittedData.vinculoPadresActual}
                    </p>
                  )}
                  {submittedData.vinculoPadresInfancia && (
                    <p className="summary-paragraph">
                      <strong>Relación en la infancia:</strong> {submittedData.vinculoPadresInfancia}
                    </p>
                  )}
                </div>
              )}

              {(submittedData.logrosSignificativos ||
                submittedData.duelosPendientes ||
                submittedData.mayoresMiedos ||
                submittedData.lineaTiempo) && (
                <div className="summary-block">
                  <h4>4, 7 y 8. Logros, Duelos, Miedos y Línea del Tiempo</h4>
                  {submittedData.logrosSignificativos && (
                    <p className="summary-paragraph">
                      <strong>Logros significativos:</strong> {submittedData.logrosSignificativos}
                    </p>
                  )}
                  {submittedData.duelosPendientes && (
                    <p className="summary-paragraph">
                      <strong>Duelos o pérdidas pendientes:</strong> {submittedData.duelosPendientes}
                    </p>
                  )}
                  {submittedData.mayoresMiedos && (
                    <p className="summary-paragraph">
                      <strong>Mayores miedos:</strong> {submittedData.mayoresMiedos}
                    </p>
                  )}
                  {submittedData.lineaTiempo && (
                    <p className="summary-paragraph">
                      <strong>Línea del tiempo por edades:</strong> {submittedData.lineaTiempo}
                    </p>
                  )}
                </div>
              )}

              {submittedData.timestampArgentina && (
                <p className="timestamp-note">
                  Enviado el {submittedData.timestampArgentina} (Hora Argentina)
                </p>
              )}
            </div>
          </section>
        ) : (
          <form onSubmit={handleSubmit} className="stepper-form" noValidate>
            {/* Indicador de progreso */}
            <div className="stepper-progress">
              <div className="stepper-meta">
                <span className="stepper-step-count">
                  Paso {step} de {STEPS.length}
                </span>
                <span className="stepper-step-name">{STEPS[step - 1].title}</span>
              </div>
              <div className="progress-track" aria-hidden="true">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="stepper-dots">
                {STEPS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      if (s.id < step) {
                        setErrorMsg(null);
                        setStep(s.id);
                      }
                    }}
                    className={`step-pill ${step === s.id ? 'active' : ''} ${
                      s.id < step ? 'completed' : ''
                    }`}
                    disabled={s.id > step}
                  >
                    {s.id}. {s.title.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* PASO 1 */}
            {step === 1 && (
              <section className="form-section">
                <div className="section-heading">
                  <span className="section-number">01</span>
                  <div>
                    <h2>Datos Personales</h2>
                    <p className="section-desc">
                      Usaremos tu DNI para vincular este Cuestionario Inicial con tu Consentimiento Informado.
                    </p>
                  </div>
                </div>

                <div className="fields-grid">
                  <div className="field-group field-full">
                    <label htmlFor="nombreCompleto">
                      Nombre y apellido <span className="req">*</span>
                    </label>
                    <input
                      id="nombreCompleto"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Ej: María Laura Fernández"
                      value={form.nombreCompleto}
                      onChange={(e) => setForm({ ...form, nombreCompleto: e.target.value })}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="dni">
                      DNI <span className="req">*</span>
                    </label>
                    <input
                      id="dni"
                      type="text"
                      required
                      inputMode="numeric"
                      placeholder="Ej: 34.567.890"
                      value={form.dni}
                      onChange={(e) => setForm({ ...form, dni: e.target.value })}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="fechaNacimiento">
                      Fecha de nacimiento <span className="req">*</span>
                    </label>
                    <input
                      id="fechaNacimiento"
                      type="date"
                      required
                      value={form.fechaNacimiento}
                      onChange={(e) => handleDateChange(e.target.value)}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="edad">
                      Edad actual <span className="req">*</span>
                    </label>
                    <input
                      id="edad"
                      type="number"
                      min={14}
                      max={110}
                      required
                      placeholder="Ej: 36"
                      value={form.edad}
                      onChange={(e) => setForm({ ...form, edad: e.target.value })}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="ocupacion">
                      Ocupación / profesión <span className="req">*</span>
                    </label>
                    <input
                      id="ocupacion"
                      type="text"
                      required
                      placeholder="Ej: Docente, diseñadora, comerciante..."
                      value={form.ocupacion}
                      onChange={(e) => setForm({ ...form, ocupacion: e.target.value })}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="lugarNacimiento">
                      Lugar de nacimiento <span className="req">*</span>
                    </label>
                    <input
                      id="lugarNacimiento"
                      type="text"
                      required
                      placeholder="Ciudad / Provincia / País"
                      value={form.lugarNacimiento}
                      onChange={(e) => setForm({ ...form, lugarNacimiento: e.target.value })}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="lugarResidencia">
                      Lugar donde vives hoy <span className="req">*</span>
                    </label>
                    <input
                      id="lugarResidencia"
                      type="text"
                      required
                      placeholder="Ciudad / Provincia"
                      value={form.lugarResidencia}
                      onChange={(e) => setForm({ ...form, lugarResidencia: e.target.value })}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="telefono">
                      Teléfono / WhatsApp <span className="req">*</span>
                    </label>
                    <input
                      id="telefono"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="Ej: +54 9 11 1234-5678"
                      value={form.telefono}
                      onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="email">
                      Correo electrónico <span className="req">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="nombre@ejemplo.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* PASO 2 */}
            {step === 2 && (
              <section className="form-section">
                <div className="section-heading">
                  <span className="section-number">02</span>
                  <div>
                    <h2>Motivo, Síntomas y Línea del Tiempo</h2>
                    <p className="section-desc">
                      Contame qué te trae a consulta y los hitos clave de tu historia.
                    </p>
                  </div>
                </div>

                <div className="subsection-card">
                  <h3>Sección 2 — Tema a Trabajar</h3>
                  <div className="fields-stack">
                    <div className="field-group">
                      <label htmlFor="temaPrincipal">
                        ¿Cuál es el principal tema, conflicto o situación que deseas abordar?{' '}
                        <span className="req">*</span>
                      </label>
                      <textarea
                        id="temaPrincipal"
                        rows={4}
                        required
                        placeholder="Escribí con tus palabras qué situación querés trabajar en la sesión."
                        value={form.temaPrincipal}
                        onChange={(e) => setForm({ ...form, temaPrincipal: e.target.value })}
                      />
                    </div>

                    <div className="field-group">
                      <label htmlFor="origenTema">
                        ¿Desde cuándo está presente y qué crees que lo pudo haber detonado?{' '}
                        <span className="req">*</span>
                      </label>
                      <textarea
                        id="origenTema"
                        rows={4}
                        required
                        placeholder="Recordá si comenzó luego de algún evento, cambio, pérdida o etapa puntual."
                        value={form.origenTema}
                        onChange={(e) => setForm({ ...form, origenTema: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="subsection-card">
                  <h3>Sección 3 — Síntomas Físicos <span className="opt">(Opcional)</span></h3>
                  <div className="fields-stack">
                    <div className="field-group">
                      <label htmlFor="sintomasFisicos">
                        ¿Presentas algún síntoma físico, dolor o malestar actualmente?
                      </label>
                      <textarea
                        id="sintomasFisicos"
                        rows={3}
                        placeholder="Por ejemplo: dolores de cabeza, contracturas, problemas digestivos, insomnio..."
                        value={form.sintomasFisicos}
                        onChange={(e) => setForm({ ...form, sintomasFisicos: e.target.value })}
                      />
                    </div>

                    <div className="field-group">
                      <label htmlFor="diagnosticoMedico">
                        ¿Cuentas con un diagnóstico médico o estudios previos relacionados?
                      </label>
                      <textarea
                        id="diagnosticoMedico"
                        rows={3}
                        placeholder="Si tenés algún diagnóstico o seguimiento médico, podés detallarlo aquí."
                        value={form.diagnosticoMedico}
                        onChange={(e) => setForm({ ...form, diagnosticoMedico: e.target.value })}
                      />
                      <p className="field-note">
                        Este acompañamiento es complementario y no sustituye la consulta, el diagnóstico ni el tratamiento médico o psicológico.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="subsection-card">
                  <h3>Sección 8 — Línea del Tiempo (Eventos Importantes por Edad)</h3>
                  <div className="field-group">
                    <label htmlFor="lineaTiempo">
                      Haz un breve repaso de tu vida indicando a qué edad ocurrieron los eventos más importantes o difíciles para ti (mudanzas, enfermedades, accidentes, separaciones, nacimientos, pérdidas o cambios grandes).
                    </label>
                    <textarea
                      id="lineaTiempo"
                      rows={6}
                      placeholder={`Ej:\n- 4 años: nacimiento de mi hermano / mudanza\n- 11 años: separación de mis padres\n- 19 años: cambio de ciudad / inicio universitario\n- 28 años: duelo o ruptura significativa`}
                      value={form.lineaTiempo}
                      onChange={(e) => setForm({ ...form, lineaTiempo: e.target.value })}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* PASO 3 */}
            {step === 3 && (
              <section className="form-section">
                <div className="section-heading">
                  <span className="section-number">03</span>
                  <div>
                    <h2>Historia Familiar y Vínculos Parentales</h2>
                    <p className="section-desc">
                      Comprender tu sistema familiar nos ayuda a leer el contexto de tus emociones.
                    </p>
                  </div>
                </div>

                <div className="subsection-card">
                  <h3>Sección 5 — Información Familiar y Etapa Temprana</h3>
                  <div className="fields-stack">
                    <div className="field-group">
                      <label htmlFor="familiaOrigen">
                        ¿Cómo está compuesta tu familia de origen? (Hermanos, lugar que ocupas, pérdidas previas si las conoces).
                      </label>
                      <textarea
                        id="familiaOrigen"
                        rows={3}
                        placeholder="Ej: Soy la mayor de 3 hermanos; hubo una pérdida gestacional previa..."
                        value={form.familiaOrigen}
                        onChange={(e) => setForm({ ...form, familiaOrigen: e.target.value })}
                      />
                    </div>

                    <div className="field-group">
                      <label htmlFor="dinamicaFamiliar">
                        ¿Cómo describirías la dinámica familiar durante tu infancia y adolescencia?
                      </label>
                      <textarea
                        id="dinamicaFamiliar"
                        rows={3}
                        placeholder="Ambiente emocional en casa, roles, exigencias, silencios o contención."
                        value={form.dinamicaFamiliar}
                        onChange={(e) => setForm({ ...form, dinamicaFamiliar: e.target.value })}
                      />
                    </div>

                    <div className="field-group">
                      <label htmlFor="gestacionNacimiento">
                        ¿Sabes algún dato sobre cómo fue tu gestación y/o nacimiento?
                      </label>
                      <textarea
                        id="gestacionNacimiento"
                        rows={3}
                        placeholder="Si tu embarazo fue buscado, si hubo estrés en tu mamá, parto natural o cesárea, etc."
                        value={form.gestacionNacimiento}
                        onChange={(e) => setForm({ ...form, gestacionNacimiento: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="subsection-card">
                  <h3>Sección 6 — Relación con tus Padres o Figuras Parentales</h3>
                  <div className="fields-stack">
                    <div className="field-group">
                      <label htmlFor="vinculoPadresActual">
                        ¿Cómo es/fue tu vínculo con tu mamá y con tu papá (o quienes cumplieron ese rol)?
                      </label>
                      <textarea
                        id="vinculoPadresActual"
                        rows={3}
                        placeholder="Contame cómo sentís hoy el vínculo con cada uno."
                        value={form.vinculoPadresActual}
                        onChange={(e) => setForm({ ...form, vinculoPadresActual: e.target.value })}
                      />
                    </div>

                    <div className="field-group">
                      <label htmlFor="vinculoPadresInfancia">
                        ¿Cómo era esa relación cuando eras niña/o?
                      </label>
                      <textarea
                        id="vinculoPadresInfancia"
                        rows={3}
                        placeholder="Cercanía, distancia, figuras de autoridad o cuidado."
                        value={form.vinculoPadresInfancia}
                        onChange={(e) => setForm({ ...form, vinculoPadresInfancia: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* PASO 4 */}
            {step === 4 && (
              <section className="form-section">
                <div className="section-heading">
                  <span className="section-number">04</span>
                  <div>
                    <h2>Logros, Duelos y Miedos</h2>
                    <p className="section-desc">
                      Último paso para cerrar tu mapa previo antes de la sesión.
                    </p>
                  </div>
                </div>

                <div className="subsection-card">
                  <h3>Sección 4 — Logros y Duelos</h3>
                  <div className="fields-stack">
                    <div className="field-group">
                      <label htmlFor="logrosSignificativos">
                        ¿Cuáles sientes que han sido tus logros más significativos en tu vida hasta hoy?
                      </label>
                      <textarea
                        id="logrosSignificativos"
                        rows={3}
                        placeholder="Personales, laborales, emocionales o vinculares."
                        value={form.logrosSignificativos}
                        onChange={(e) => setForm({ ...form, logrosSignificativos: e.target.value })}
                      />
                    </div>

                    <div className="field-group">
                      <label htmlFor="duelosPendientes">
                        ¿Sientes que hay algún duelo pendiente o pérdida no resuelta en tu vida? (pérdida de un ser querido, ruptura, trabajo, proyecto o mudanza).
                      </label>
                      <textarea
                        id="duelosPendientes"
                        rows={3}
                        placeholder="Si percibís alguna despedida o cierre pendiente, podés compartirlo aquí."
                        value={form.duelosPendientes}
                        onChange={(e) => setForm({ ...form, duelosPendientes: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="subsection-card">
                  <h3>Sección 7 — Miedos</h3>
                  <div className="field-group">
                    <label htmlFor="mayoresMiedos">
                      ¿Cuáles son tus mayores miedos hoy o qué situaciones sientes que limitan tu bienestar?
                    </label>
                    <textarea
                      id="mayoresMiedos"
                      rows={4}
                      placeholder="Miedos concretos, temores recurrentes o bloqueos actuales."
                      value={form.mayoresMiedos}
                      onChange={(e) => setForm({ ...form, mayoresMiedos: e.target.value })}
                    />
                  </div>
                </div>
              </section>
            )}

            {errorMsg && (
              <div className="error-banner" role="alert">
                {errorMsg}
              </div>
            )}

            <div className="stepper-actions">
              {step > 1 ? (
                <button type="button" onClick={handlePrev} className="btn btn-secondary">
                  Anterior
                </button>
              ) : (
                <div />
              )}

              {step < STEPS.length ? (
                <button type="button" onClick={handleNext} className="btn btn-primary">
                  Continuar al Paso {step + 1}
                </button>
              ) : (
                <button type="submit" disabled={submitting} className="btn btn-primary">
                  {submitting ? 'Enviando cuestionario...' : 'Enviar Cuestionario Inicial'}
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      <style jsx>{`
        .cuestionario-page {
          background-color: var(--background);
          padding: 3.5rem 0 6rem;
        }

        .cuestionario-container {
          max-width: 780px;
        }

        .cuestionario-header {
          text-align: center;
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--color-earth-light);
        }

        .cuestionario-badge {
          display: inline-block;
          background-color: var(--color-secondary-dark);
          color: var(--color-primary);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          padding: 0.35rem 0.9rem;
          border-radius: 9999px;
          margin-bottom: 1.25rem;
        }

        .cuestionario-header h1 {
          font-family: var(--font-serif);
          font-size: clamp(1.9rem, 5vw, 2.85rem);
          font-weight: 400;
          color: var(--foreground);
          margin-bottom: 1rem;
        }

        .cuestionario-intro {
          color: var(--color-earth);
          font-size: 0.98rem;
          font-weight: 300;
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.75;
        }

        .stepper-progress {
          background-color: var(--color-secondary);
          border: 1px solid var(--color-secondary-dark);
          border-radius: var(--radius);
          padding: 1.15rem 1.25rem;
          margin-bottom: 1.75rem;
        }

        .stepper-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.65rem;
          flex-wrap: wrap;
        }

        .stepper-step-count {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--color-primary);
        }

        .stepper-step-name {
          font-family: var(--font-serif);
          font-size: 1rem;
          color: var(--foreground);
        }

        .progress-track {
          width: 100%;
          height: 4px;
          background-color: var(--color-earth-light);
          border-radius: 9999px;
          overflow: hidden;
          margin-bottom: 0.85rem;
        }

        .progress-fill {
          height: 100%;
          background-color: var(--color-primary);
          transition: width 0.35s ease;
        }

        .stepper-dots {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.4rem;
        }

        .step-pill {
          background: transparent;
          border: 1px solid var(--color-earth-light);
          border-radius: var(--radius);
          padding: 0.4rem 0.25rem;
          font-family: var(--font-main);
          font-size: 0.72rem;
          color: var(--color-earth);
          cursor: default;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .step-pill.active {
          border-color: var(--color-primary);
          background-color: var(--color-primary);
          color: var(--color-secondary);
          font-weight: 500;
        }

        .step-pill.completed {
          border-color: var(--color-primary);
          color: var(--color-primary);
          cursor: pointer;
        }

        .form-section {
          background-color: var(--background);
          border: 1px solid var(--color-earth-light);
          border-radius: var(--radius);
          padding: 1.75rem 1.25rem;
          box-shadow: var(--shadow-sm);
        }

        .section-heading {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.75rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--color-secondary-dark);
        }

        .section-number {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--color-accent-dark);
          line-height: 1.2;
          flex-shrink: 0;
        }

        .section-heading h2 {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          font-weight: 400;
          color: var(--color-primary);
          margin-bottom: 0.25rem;
        }

        .section-desc {
          font-size: 0.9rem;
          color: var(--color-earth);
          line-height: 1.5;
        }

        .fields-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        .fields-stack {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        label {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--foreground);
          line-height: 1.45;
        }

        .req {
          color: var(--color-accent-dark);
        }

        .opt {
          font-weight: 300;
          color: var(--color-earth);
          font-size: 0.85rem;
        }

        input[type='text'],
        input[type='email'],
        input[type='tel'],
        input[type='date'],
        input[type='number'],
        textarea {
          width: 100%;
          min-height: 46px;
          padding: 0.75rem 0.9rem;
          font-family: var(--font-main);
          font-size: 1rem;
          font-weight: 300;
          color: var(--foreground);
          background-color: var(--color-secondary);
          border: 1px solid var(--color-earth-light);
          border-radius: var(--radius);
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        textarea {
          min-height: 100px;
          resize: vertical;
          line-height: 1.65;
        }

        input:focus,
        textarea:focus {
          outline: none;
          border-color: var(--color-primary);
          background-color: var(--background);
        }

        .field-note {
          font-size: 0.82rem;
          color: var(--color-earth);
          font-style: italic;
          line-height: 1.5;
          margin-top: 0.25rem;
        }

        .subsection-card {
          background-color: var(--color-secondary);
          border: 1px solid var(--color-secondary-dark);
          border-radius: var(--radius);
          padding: 1.25rem;
          margin-bottom: 1.25rem;
        }

        .subsection-card:last-child {
          margin-bottom: 0;
        }

        .subsection-card h3 {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--color-primary);
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--color-earth-light);
        }

        .error-banner {
          margin-top: 1.25rem;
          padding: 0.9rem 1rem;
          background-color: #fdf2f2;
          border: 1px solid #e5b8b8;
          color: #7c2d2d;
          border-radius: var(--radius);
          font-size: 0.9rem;
        }

        .stepper-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-top: 1.75rem;
        }

        /* Confirmación */
        .confirmation-card {
          background-color: var(--background);
          border: 1px solid var(--color-earth-light);
          border-radius: var(--radius);
          padding: 2rem 1.5rem;
          box-shadow: var(--shadow-md);
        }

        .confirmation-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .confirmation-badge {
          display: inline-block;
          background-color: var(--color-primary);
          color: var(--color-secondary);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          padding: 0.35rem 0.9rem;
          border-radius: 9999px;
          margin-bottom: 1rem;
        }

        .confirmation-header h2 {
          font-family: var(--font-serif);
          font-size: 1.9rem;
          color: var(--color-primary);
          margin-bottom: 0.75rem;
        }

        .confirmation-header p {
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .confirmation-actions {
          display: flex;
          justify-content: center;
          margin-bottom: 1.75rem;
        }

        .pdf-optional-btn {
          background: none;
          border: none;
          font-family: var(--font-main);
          font-size: 0.84rem;
          color: var(--color-earth);
          text-decoration: underline;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
        }

        .pdf-optional-btn:hover {
          color: var(--foreground);
        }

        .summary-box {
          background-color: var(--color-secondary);
          border: 1px solid var(--color-secondary-dark);
          border-radius: var(--radius);
          padding: 1.5rem;
        }

        .summary-box h3 {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--color-primary);
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--color-earth-light);
        }

        .summary-block {
          margin-bottom: 1.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--color-earth-light);
        }

        .summary-block:last-of-type {
          border-bottom: none;
          margin-bottom: 0.5rem;
          padding-bottom: 0;
        }

        .summary-block h4 {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          color: var(--color-primary);
          margin-bottom: 0.75rem;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.85rem;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .summary-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-earth);
          font-weight: 600;
        }

        .summary-value {
          font-size: 0.94rem;
          color: var(--foreground);
        }

        .summary-paragraph {
          font-size: 0.92rem;
          color: var(--foreground);
          line-height: 1.65;
          margin-bottom: 0.65rem;
          white-space: pre-line;
        }

        .timestamp-note {
          font-size: 0.8rem;
          color: var(--color-earth);
          margin-top: 1rem;
        }

        @media (min-width: 640px) {
          .form-section {
            padding: 2.25rem 2.5rem;
          }

          .fields-grid {
            grid-template-columns: 1fr 1fr;
          }

          .field-full {
            grid-column: 1 / -1;
          }

          .summary-grid {
            grid-template-columns: 1fr 1fr;
          }

          .confirmation-card {
            padding: 2.75rem 2.5rem;
          }
        }

        @media print {
          :global(nav.navbar),
          :global(footer),
          :global(.whatsapp-float),
          .no-print {
            display: none !important;
          }

          .cuestionario-page {
            padding: 0;
          }

          .confirmation-card {
            border: none;
            box-shadow: none;
            padding: 0;
          }
        }
      `}</style>
    </main>
  );
}
