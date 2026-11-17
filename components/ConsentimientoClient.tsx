'use client';

import { useEffect, useRef, useState } from 'react';

interface FormState {
  nombreCompleto: string;
  dni: string;
  fechaNacimiento: string;
  email: string;
  telefono: string;
  tratamientoActual: '' | 'Sí' | 'No';
  observaciones: string;
  aceptaTerminos: boolean;
  aclaracion: string;
}

interface SubmittedRecord extends FormState {
  fechaFirma: string;
  firmaBase64: string;
  timestampArgentina: string;
}

function getArgentinaDateString(): string {
  return new Intl.DateTimeFormat('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());
}

export default function ConsentimientoClient() {
  const [form, setForm] = useState<FormState>({
    nombreCompleto: '',
    dni: '',
    fechaNacimiento: '',
    email: '',
    telefono: '',
    tratamientoActual: '',
    observaciones: '',
    aceptaTerminos: false,
    aclaracion: '',
  });

  const [fechaActual, setFechaActual] = useState<string>('');
  const [hasSignature, setHasSignature] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedRecord | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    setFechaActual(getArgentinaDateString());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = '#1A1918';
      }
    };

    setupCanvas();
  }, [submittedData]);

  const getPointerPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.setPointerCapture(e.pointerId);
    const { x, y } = getPointerPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    isDrawingRef.current = true;
    setErrorMsg(null);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPointerPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    if (!hasSignature) {
      setHasSignature(true);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
    isDrawingRef.current = false;
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!form.tratamientoActual) {
      setErrorMsg('Por favor, indicá si te encontrás bajo tratamiento médico, psicológico o psiquiátrico actual.');
      return;
    }

    if (!form.aceptaTerminos) {
      setErrorMsg('Debés aceptar los términos del Consentimiento Informado para continuar.');
      return;
    }

    if (!hasSignature || !canvasRef.current) {
      setErrorMsg('Por favor, realizá tu firma manuscrita en el recuadro antes de enviar.');
      return;
    }

    const firmaBase64 = canvasRef.current.toDataURL('image/png');
    const fechaFirma = fechaActual || getArgentinaDateString();

    setSubmitting(true);
    try {
      const response = await fetch('/api/consentimiento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          fechaFirma,
          firmaBase64,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        setErrorMsg(data.error || 'Ocurrió un error al registrar el consentimiento. Intentá nuevamente.');
        return;
      }

      setSubmittedData({
        ...form,
        fechaFirma,
        firmaBase64,
        timestampArgentina: data.timestampArgentina || fechaFirma,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setErrorMsg('No se pudo conectar con el servidor. Verificá tu conexión e intentá nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUrl = submittedData
    ? `https://wa.me/5491131671954?text=${encodeURIComponent(
        `Hola Eliana, completé y firmé el Consentimiento Informado.\n\nNombre: ${submittedData.nombreCompleto}\nDNI: ${submittedData.dni}\nFecha: ${submittedData.fechaFirma}`
      )}`
    : '';

  return (
    <main className="consent-page">
      <div className="container consent-container">
        <header className="consent-header">
          <span className="consent-badge">Documento Privado · Uso Terapéutico</span>
          <h1>Consentimiento Informado</h1>
          <p className="consent-subtitle">
            La Magia de los Vientos · Eliana — Acompañamiento en Biodecodificación y Terapias Complementarias
          </p>
        </header>

        {submittedData ? (
          <section className="confirmation-card" aria-live="polite">
            <div className="confirmation-header">
              <span className="confirmation-badge">Registro Confirmado</span>
              <h2>Consentimiento Firmado con Éxito</h2>
              <p>
                Gracias, <strong>{submittedData.nombreCompleto}</strong>. Tu declaración de conformidad quedó registrada correctamente. Podés guardar una copia en PDF y avisar a Eliana por WhatsApp.
              </p>
            </div>

            <div className="summary-box">
              <h3>Constancia del Documento</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">Consultante</span>
                  <span className="summary-value">{submittedData.nombreCompleto}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">DNI / Documento</span>
                  <span className="summary-value">{submittedData.dni}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Fecha de nacimiento</span>
                  <span className="summary-value">{submittedData.fechaNacimiento}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Correo electrónico</span>
                  <span className="summary-value">{submittedData.email}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Teléfono / WhatsApp</span>
                  <span className="summary-value">{submittedData.telefono}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Tratamiento médico / psicológico actual</span>
                  <span className="summary-value">{submittedData.tratamientoActual}</span>
                </div>
                {submittedData.observaciones && (
                  <div className="summary-item summary-item-full">
                    <span className="summary-label">Motivo de consulta / Observaciones</span>
                    <span className="summary-value">{submittedData.observaciones}</span>
                  </div>
                )}
                <div className="summary-item">
                  <span className="summary-label">Aclaración</span>
                  <span className="summary-value">{submittedData.aclaracion}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Fecha y hora de firma (AR)</span>
                  <span className="summary-value">{submittedData.timestampArgentina}</span>
                </div>
              </div>

              <div className="signature-preview">
                <span className="summary-label">Firma Digital Registrada</span>
                <div className="signature-preview-frame">
                  <img
                    src={submittedData.firmaBase64}
                    alt={`Firma de ${submittedData.nombreCompleto}`}
                  />
                </div>
              </div>

              <p className="legal-print-note">
                El/La consultante declaró haber leído, comprendido y aceptado en su totalidad los términos del Consentimiento Informado y Descargo de Responsabilidad de La Magia de los Vientos (Ley N° 25.326).
              </p>
            </div>

            <div className="confirmation-actions no-print">
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-outline"
              >
                Imprimir / Guardar copia en PDF
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Avisar a Eliana por WhatsApp
              </a>
            </div>
          </section>
        ) : (
          <form onSubmit={handleSubmit} className="consent-form" noValidate>
            {/* SECCIÓN 1 */}
            <section className="form-section">
              <div className="section-heading">
                <span className="section-number">01</span>
                <div>
                  <h2>Datos de Identificación del Consultante</h2>
                  <p className="section-desc">
                    Completá tus datos personales para confeccionar tu ficha de acompañamiento.
                  </p>
                </div>
              </div>

              <div className="fields-grid">
                <div className="field-group field-full">
                  <label htmlFor="nombreCompleto">
                    Nombre y Apellido completo <span className="req">*</span>
                  </label>
                  <input
                    id="nombreCompleto"
                    name="nombreCompleto"
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
                    DNI / Documento de Identidad <span className="req">*</span>
                  </label>
                  <input
                    id="dni"
                    name="dni"
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
                    name="fechaNacimiento"
                    type="date"
                    required
                    value={form.fechaNacimiento}
                    onChange={(e) => setForm({ ...form, fechaNacimiento: e.target.value })}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="email">
                    Correo electrónico <span className="req">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="nombre@ejemplo.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="telefono">
                    Teléfono / WhatsApp de contacto <span className="req">*</span>
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="Ej: +54 9 11 1234-5678"
                    value={form.telefono}
                    onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  />
                </div>

                <div className="field-group field-full">
                  <span className="field-label-text">
                    ¿Te encontrás bajo tratamiento médico, psicológico o psiquiátrico actual?{' '}
                    <span className="req">*</span>
                  </span>
                  <div className="radio-group" role="radiogroup" aria-label="Tratamiento actual">
                    <label className={`radio-card ${form.tratamientoActual === 'Sí' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="tratamientoActual"
                        value="Sí"
                        required
                        checked={form.tratamientoActual === 'Sí'}
                        onChange={() => setForm({ ...form, tratamientoActual: 'Sí' })}
                      />
                      <span>Sí</span>
                    </label>
                    <label className={`radio-card ${form.tratamientoActual === 'No' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="tratamientoActual"
                        value="No"
                        required
                        checked={form.tratamientoActual === 'No'}
                        onChange={() => setForm({ ...form, tratamientoActual: 'No' })}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="field-group field-full">
                  <label htmlFor="observaciones">
                    Motivo principal de consulta / Observaciones de salud{' '}
                    <span className="opt">(Opcional)</span>
                  </label>
                  <textarea
                    id="observaciones"
                    name="observaciones"
                    rows={4}
                    placeholder="Podés compartir brevemente qué te motiva a iniciar este acompañamiento o cualquier información relevante."
                    value={form.observaciones}
                    onChange={(e) => setForm({ ...form, observaciones: e.target.value })}
                  />
                </div>
              </div>
            </section>

            {/* SECCIÓN 2 */}
            <section className="form-section">
              <div className="section-heading">
                <span className="section-number">02</span>
                <div>
                  <h2>Condiciones del Acompañamiento y Marco Legal</h2>
                  <p className="section-desc">
                    Te pedimos leer atentamente cada punto antes de prestar tu conformidad.
                  </p>
                </div>
              </div>

              <div className="legal-cards">
                <article className="legal-card">
                  <h3>Naturaleza del Acompañamiento Integrativo</h3>
                  <p>
                    El presente espacio ofrece sesiones de acompañamiento en Biodecodificación, pudiendo integrar de manera complementaria otras herramientas orientadas al bienestar emocional y energético, tales como Terapia Floral (Flores de Bach / esencias florales), ejercicios de toma de consciencia, armonización y recursos de autoconocimiento. Estas prácticas tienen como finalidad explorar la posible relación entre los conflictos emocionales, las creencias limitantes y los síntomas físicos o situaciones de vida, promoviendo el bienestar integral.
                  </p>
                </article>

                <article className="legal-card">
                  <h3>Alcance y Exclusión de Acto Médico o Psicológico</h3>
                  <ul>
                    <li>
                      Ninguna de las disciplinas aplicadas en este espacio (biodecodificación, terapia floral u otras herramientas complementarias) constituye un acto médico, psicológico, psiquiátrico ni nutricional, ni reemplaza la consulta, el diagnóstico, el tratamiento o el seguimiento de profesionales de la salud matriculados.
                    </li>
                    <li>
                      La terapeuta no realiza diagnósticos clínicos, ni prescribe, modifica o suspende medicamentos, tratamientos médicos, terapias psicológicas o indicaciones quirúrgicas.
                    </li>
                    <li>
                      Los preparados florales (Flores de Bach) son complementos vibracionales de acompañamiento emocional que no contienen principios activos farmacológicos ni sustituyen medicación alopática.
                    </li>
                    <li>
                      Ante cualquier síntoma físico, dolencia o malestar emocional agudo, es responsabilidad del/de la consultante acudir a un profesional de la salud habilitado y mantener sus tratamientos vigentes.
                    </li>
                  </ul>
                </article>

                <article className="legal-card">
                  <h3>Implicancias del Proceso y Responsabilidad Personal</h3>
                  <ul>
                    <li>
                      El/La consultante participa de manera libre, consciente y voluntaria, asumiendo plena responsabilidad sobre su salud física, mental y emocional, así como sobre las decisiones personales o terapéuticas que tome antes, durante y después de las sesiones.
                    </li>
                    <li>
                      El trabajo de indagación emocional puede movilizar recuerdos, emociones intensas o reflexiones profundas; el/la consultante comprende la naturaleza de este proceso y asume su propio tránsito personal.
                    </li>
                    <li>
                      Los resultados del acompañamiento son individuales y subjetivos, por lo que no se garantizan curaciones ni resultados médicos específicos.
                    </li>
                  </ul>
                </article>

                <article className="legal-card">
                  <h3>Confidencialidad y Protección de Datos Personales</h3>
                  <p>
                    Toda la información compartida en este documento y durante las sesiones será tratada bajo estricta reserva y confidencialidad por parte de la terapeuta, conforme a la normativa vigente de protección de datos personales (Ley N° 25.326). Esta reserva solo podrá ser relevada ante riesgo grave e inminente para la integridad física del/de la consultante o de terceros, o por requerimiento judicial expreso.
                  </p>
                </article>

                <article className="legal-card">
                  <h3>Modalidad, Cancelaciones y Uso del Material</h3>
                  <ul>
                    <li>
                      Las sesiones se realizan bajo modalidad acordada (virtual/presencial) y tienen una duración estimada según el arancel o programa convenido.
                    </li>
                    <li>
                      Las cancelaciones o reprogramaciones deberán informarse con antelación prudencial según el acuerdo previo de atención.
                    </li>
                    <li>
                      Queda prohibida la grabación, reproducción o difusión total o parcial de las sesiones sin el consentimiento previo y expreso de ambas partes.
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            {/* SECCIÓN 3 */}
            <section className="form-section">
              <div className="section-heading">
                <span className="section-number">03</span>
                <div>
                  <h2>Declaración de Conformidad y Firma Digital</h2>
                  <p className="section-desc">
                    Confirmá tu lectura y firmá de manera manuscrita en el recuadro inferior.
                  </p>
                </div>
              </div>

              <div className="declaration-box">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.aceptaTerminos}
                    onChange={(e) => setForm({ ...form, aceptaTerminos: e.target.checked })}
                    required
                  />
                  <span>
                    He leído, comprendido y acepto en su totalidad los términos del Consentimiento Informado y Descargo de Responsabilidad aquí detallados. Declaro que los datos ingresados son verídicos y que inicio este proceso de acompañamiento de manera libre y voluntaria.
                  </span>
                </label>
              </div>

              <div className="signature-block">
                <div className="signature-top">
                  <span className="field-label-text">
                    Firma manuscrita (dedo o mouse) <span className="req">*</span>
                  </span>
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="clear-sig-btn"
                  >
                    Limpiar firma
                  </button>
                </div>
                <div className="canvas-wrapper">
                  <canvas
                    ref={canvasRef}
                    className="signature-canvas"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                  />
                  {!hasSignature && (
                    <span className="canvas-placeholder">Firmá aquí dentro del recuadro</span>
                  )}
                </div>
              </div>

              <div className="fields-grid">
                <div className="field-group">
                  <label htmlFor="aclaracion">
                    Aclaración (Nombre y Apellido) <span className="req">*</span>
                  </label>
                  <input
                    id="aclaracion"
                    name="aclaracion"
                    type="text"
                    required
                    placeholder="Escribí tu nombre y apellido"
                    value={form.aclaracion}
                    onChange={(e) => setForm({ ...form, aclaracion: e.target.value })}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="fechaActual">Fecha (Argentina)</label>
                  <input
                    id="fechaActual"
                    name="fechaActual"
                    type="text"
                    readOnly
                    value={fechaActual}
                    className="readonly-input"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="error-banner" role="alert">
                  {errorMsg}
                </div>
              )}

              <div className="submit-row">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary width-100"
                >
                  {submitting ? 'Registrando consentimiento...' : 'Firmar y Enviar Consentimiento'}
                </button>
              </div>
            </section>
          </form>
        )}
      </div>

      <style jsx>{`
        .consent-page {
          background-color: var(--background);
          padding: 3.5rem 0 6rem;
        }

        .consent-container {
          max-width: 780px;
        }

        .consent-header {
          text-align: center;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--color-earth-light);
        }

        .consent-badge {
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

        .consent-header h1 {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 400;
          color: var(--foreground);
          margin-bottom: 0.75rem;
        }

        .consent-subtitle {
          color: var(--color-earth);
          font-size: 0.98rem;
          font-weight: 300;
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .consent-form {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
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

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        label,
        .field-label-text {
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--foreground);
          line-height: 1.4;
        }

        .req {
          color: var(--color-accent-dark);
        }

        .opt {
          font-weight: 300;
          color: var(--color-earth);
          font-size: 0.82rem;
        }

        input[type='text'],
        input[type='email'],
        input[type='tel'],
        input[type='date'],
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
          min-height: 110px;
          resize: vertical;
          line-height: 1.6;
        }

        input:focus,
        textarea:focus {
          outline: none;
          border-color: var(--color-primary);
          background-color: var(--background);
        }

        .readonly-input {
          background-color: var(--color-secondary-dark) !important;
          color: var(--color-earth) !important;
          cursor: default;
        }

        .radio-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-top: 0.2rem;
        }

        .radio-card {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          min-height: 46px;
          padding: 0.7rem 1rem;
          background-color: var(--color-secondary);
          border: 1px solid var(--color-earth-light);
          border-radius: var(--radius);
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 400;
        }

        .radio-card.selected {
          border-color: var(--color-primary);
          background-color: rgba(27, 39, 28, 0.05);
          color: var(--color-primary);
          font-weight: 500;
        }

        .radio-card input {
          accent-color: var(--color-primary);
          width: 18px;
          height: 18px;
        }

        /* Sección 2: Tarjetas legales */
        .legal-cards {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .legal-card {
          background-color: var(--color-secondary);
          border: 1px solid var(--color-secondary-dark);
          border-left: 3px solid var(--color-primary);
          border-radius: var(--radius);
          padding: 1.25rem;
        }

        .legal-card h3 {
          font-family: var(--font-serif);
          font-size: 1.12rem;
          font-weight: 400;
          color: var(--color-primary);
          margin-bottom: 0.65rem;
        }

        .legal-card p,
        .legal-card li {
          font-size: 0.92rem;
          color: var(--foreground);
          line-height: 1.7;
          font-weight: 300;
        }

        .legal-card ul {
          padding-left: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        /* Sección 3: Declaración y firma */
        .declaration-box {
          background-color: var(--color-secondary);
          border: 1px solid var(--color-earth-light);
          border-radius: var(--radius);
          padding: 1.15rem;
          margin-bottom: 1.75rem;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          cursor: pointer;
          font-size: 0.92rem;
          font-weight: 300;
          line-height: 1.65;
          color: var(--foreground);
        }

        .checkbox-label input[type='checkbox'] {
          margin-top: 0.25rem;
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          accent-color: var(--color-primary);
          cursor: pointer;
        }

        .signature-block {
          margin-bottom: 1.5rem;
        }

        .signature-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .clear-sig-btn {
          background: transparent;
          border: 1px solid var(--color-earth-light);
          border-radius: var(--radius);
          padding: 0.35rem 0.75rem;
          font-family: var(--font-main);
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-earth);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .clear-sig-btn:hover {
          border-color: var(--foreground);
          color: var(--foreground);
        }

        .canvas-wrapper {
          position: relative;
          width: 100%;
          height: 180px;
          background-color: var(--color-secondary);
          border: 1px dashed var(--color-earth);
          border-radius: var(--radius);
          overflow: hidden;
        }

        .signature-canvas {
          width: 100%;
          height: 100%;
          display: block;
          touch-action: none;
          cursor: crosshair;
        }

        .canvas-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          font-size: 0.88rem;
          color: var(--color-earth);
          opacity: 0.75;
        }

        .error-banner {
          margin-top: 1.25rem;
          padding: 0.9rem 1rem;
          background-color: #fdf2f2;
          border: 1px solid #e5b8b8;
          color: #7c2d2d;
          border-radius: var(--radius);
          font-size: 0.9rem;
          font-weight: 400;
        }

        .submit-row {
          margin-top: 1.75rem;
        }

        .submit-row .btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        /* Pantalla de Confirmación */
        .confirmation-card {
          background-color: var(--background);
          border: 1px solid var(--color-earth-light);
          border-radius: var(--radius);
          padding: 2rem 1.5rem;
          box-shadow: var(--shadow-md);
        }

        .confirmation-header {
          text-align: center;
          margin-bottom: 2rem;
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
          color: var(--foreground);
          font-size: 0.98rem;
          max-width: 560px;
          margin: 0 auto;
        }

        .summary-box {
          background-color: var(--color-secondary);
          border: 1px solid var(--color-secondary-dark);
          border-radius: var(--radius);
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .summary-box h3 {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--color-primary);
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--color-earth-light);
        }

        .summary-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .summary-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-earth);
          font-weight: 600;
        }

        .summary-value {
          font-size: 0.95rem;
          color: var(--foreground);
          font-weight: 400;
        }

        .signature-preview {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .signature-preview-frame {
          background-color: var(--background);
          border: 1px solid var(--color-earth-light);
          border-radius: var(--radius);
          padding: 0.75rem;
          max-width: 320px;
        }

        .signature-preview-frame img {
          width: 100%;
          height: auto;
          max-height: 120px;
          object-fit: contain;
          display: block;
        }

        .legal-print-note {
          font-size: 0.82rem;
          color: var(--color-earth);
          line-height: 1.55;
          border-top: 1px solid var(--color-earth-light);
          padding-top: 0.9rem;
        }

        .confirmation-actions {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
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

          .summary-item-full {
            grid-column: 1 / -1;
          }

          .confirmation-actions {
            flex-direction: row;
            justify-content: center;
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

          .consent-page {
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
