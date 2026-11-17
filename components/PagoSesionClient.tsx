'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Paso1Data {
  nombreCompleto: string;
  dni: string;
  fechaNacimiento?: string;
  email: string;
  telefono: string;
}

const SEPA_FIELDS = [
  { id: 'titular', label: 'Titular', value: 'Eliana Andrea Morganti' },
  { id: 'iban', label: 'IBAN', value: 'MT22CFTE28004000000000007110248' },
  { id: 'bic', label: 'BIC / SWIFT', value: 'CFTEMTM1XXX' },
  { id: 'tipo', label: 'Tipo de cuenta', value: 'Virtual IBAN' },
  {
    id: 'banco',
    label: 'Banco y dirección',
    value:
      "OPENPAYD FINANCIAL SERVICES MALTA LTD, Floor 3, 137 Spinola Road, St. Julian's, STJ 3011, Eastern Region, MT",
  },
];

export default function PagoSesionClient() {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [paso1, setPaso1] = useState<Paso1Data | null>(null);

  const [ubicacion, setUbicacion] = useState<'europa' | 'argentina'>('europa');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [referencia, setReferencia] = useState('');
  const [comprobanteBase64, setComprobanteBase64] = useState('');
  const [comprobanteNombre, setComprobanteNombre] = useState('');
  const [comprobanteMime, setComprobanteMime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploadedOk, setUploadedOk] = useState(false);

  useEffect(() => {
    let isValid = false;
    try {
      const raw1 = sessionStorage.getItem('lamagia_admision_paso1');
      const raw2 = sessionStorage.getItem('lamagia_admision_paso2');
      if (raw1 && raw2) {
        const parsed1 = JSON.parse(raw1) as Partial<Paso1Data>;
        const parsed2 = JSON.parse(raw2) as { completedAt?: string };
        if (
          parsed1.nombreCompleto &&
          parsed1.dni &&
          parsed1.email &&
          parsed1.telefono &&
          parsed2.completedAt
        ) {
          isValid = true;
          setPaso1({
            nombreCompleto: parsed1.nombreCompleto,
            dni: parsed1.dni,
            fechaNacimiento: parsed1.fechaNacimiento,
            email: parsed1.email,
            telefono: parsed1.telefono,
          });
        }
      }
    } catch {
      isValid = false;
    }

    setAuthorized(isValid);
    setChecking(false);
  }, []);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 2000);
    } catch {
      // Fallback silencioso si clipboard está bloqueado
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setComprobanteBase64('');
      setComprobanteNombre('');
      setComprobanteMime('');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('El comprobante supera el máximo permitido de 5 MB.');
      e.target.value = '';
      return;
    }

    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setErrorMsg('Formato no permitido. Subí un archivo PDF, JPG, PNG o WEBP.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setComprobanteBase64(result);
      setComprobanteNombre(file.name);
      setComprobanteMime(file.type);
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadComprobante = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paso1) return;

    if (!comprobanteBase64) {
      setErrorMsg('Seleccioná primero el archivo del comprobante (PDF, JPG o PNG).');
      return;
    }

    setErrorMsg(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/comprobante-pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreCompleto: paso1.nombreCompleto,
          dni: paso1.dni,
          email: paso1.email,
          telefono: paso1.telefono,
          modalidadPago:
            ubicacion === 'europa'
              ? 'Exterior / Europa (SEPA EUR)'
              : 'Argentina (ARS)',
          referencia,
          comprobanteBase64,
          comprobanteNombre,
          comprobanteMime,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMsg(data.error || 'No se pudo enviar el comprobante. Intentá nuevamente.');
        return;
      }

      setUploadedOk(true);
    } catch {
      setErrorMsg('No se pudo conectar con el servidor. Verificá tu conexión e intentá nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappComprobanteUrl = paso1
    ? `https://wa.me/5491149143734?text=${encodeURIComponent(
        `Hola Eliana, completé los 3 pasos de admisión (${paso1.nombreCompleto} - DNI ${paso1.dni}) y te envío mi comprobante de pago / consulto por el alias local.`
      )}`
    : 'https://wa.me/5491149143734?text=Hola%20Eliana%2C%20te%20consulto%20por%20los%20datos%20de%20pago%20de%20mi%20sesi%C3%B3n.';

  return (
    <main className="pago-page">
      <div className="container pago-container">
        <header className="pago-header">
          <span className="pago-badge">Paso 3 de 3 · Acceso Protegido</span>
          <h1>Pago y Confirmación de Turno</h1>
        </header>

        {checking ? (
          <section className="pago-card centered">
            <p className="muted-text">Verificando tu progreso de admisión...</p>
          </section>
        ) : !authorized ? (
          <section className="pago-card centered" aria-live="polite">
            <span className="lock-badge">Acceso Restringido</span>
            <h2>Completá primero los Pasos 1 y 2</h2>
            <p className="blocked-desc">
              Por privacidad y protocolo terapéutico, los datos de pago se habilitan únicamente después de haber firmado el <strong>Consentimiento Informado (Paso 1)</strong> y enviado el <strong>Cuestionario Inicial (Paso 2)</strong>.
            </p>
            <Link href="/consentimiento" className="btn btn-primary">
              Iniciar Admisión en el Paso 1
            </Link>
          </section>
        ) : (
          <div className="pago-content">
            <div className="consultante-strip">
              <span>
                Consultante: <strong>{paso1?.nombreCompleto}</strong> · DNI{' '}
                <strong>{paso1?.dni}</strong>
              </span>
              <span className="status-pill">Pasos 1 y 2 completados</span>
            </div>

            {/* Selector por ubicación */}
            <section className="pago-card">
              <h2 className="card-title">Seleccioná tu modalidad de transferencia</h2>
              <div className="location-tabs" role="tablist" aria-label="Ubicación para pago">
                <button
                  type="button"
                  role="tab"
                  aria-selected={ubicacion === 'europa'}
                  className={`tab-btn ${ubicacion === 'europa' ? 'active' : ''}`}
                  onClick={() => setUbicacion('europa')}
                >
                  Exterior / Europa (EUR - SEPA)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={ubicacion === 'argentina'}
                  className={`tab-btn ${ubicacion === 'argentina' ? 'active' : ''}`}
                  onClick={() => setUbicacion('argentina')}
                >
                  Argentina (Pesos ARS)
                </button>
              </div>

              {ubicacion === 'europa' ? (
                <div className="sepa-panel">
                  <div className="sepa-list">
                    {SEPA_FIELDS.map((item) => (
                      <div key={item.id} className="sepa-row">
                        <div className="sepa-info">
                          <span className="sepa-label">{item.label}</span>
                          <span className="sepa-value">{item.value}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(item.id, item.value)}
                          className="copy-btn"
                        >
                          {copiedId === item.id ? 'Copiado' : 'Copiar'}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="sepa-warning">
                    <strong>Importante:</strong> En la referencia/concepto de la transferencia indicá{' '}
                    <strong>&ldquo;Sesión + tu Nombre y Apellido&rdquo;</strong>.
                  </div>
                </div>
              ) : (
                <div className="ars-panel">
                  <h3>Transferencia o Mercado Pago en Argentina (ARS)</h3>
                  <p>
                    Para abonar en Pesos Argentinos, solicitanos el alias local actualizado directamente por WhatsApp al confirmar tu día y horario de sesión.
                  </p>
                  <a
                    href={whatsappComprobanteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    Solicitar Alias por WhatsApp (+54 9 11 4914-3734)
                  </a>
                </div>
              )}
            </section>

            {/* Subida de comprobante */}
            <section className="pago-card">
              <h2 className="card-title">Subir Comprobante de Pago (Opcional en este momento)</h2>
              {uploadedOk ? (
                <div className="upload-success" aria-live="polite">
                  <h3>¡Comprobante recibido con éxito!</h3>
                  <p>
                    Eliana ya recibió tu comprobante en su sistema y te confirmará el turno a la brevedad.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleUploadComprobante} className="upload-form">
                  <div className="field-group">
                    <label htmlFor="referenciaPago">
                      Número de operación o referencia (opcional)
                    </label>
                    <input
                      id="referenciaPago"
                      type="text"
                      placeholder={`Ej: Sesión ${paso1?.nombreCompleto || ''}`}
                      value={referencia}
                      onChange={(e) => setReferencia(e.target.value)}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="comprobanteFile">
                      Adjuntar comprobante (PDF, JPG, PNG · máx. 5 MB)
                    </label>
                    <input
                      id="comprobanteFile"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.webp"
                      onChange={handleFileChange}
                    />
                    {comprobanteNombre && (
                      <p className="file-selected">
                        Archivo listo: <strong>{comprobanteNombre}</strong>
                      </p>
                    )}
                  </div>

                  {errorMsg && (
                    <div className="error-banner" role="alert">
                      {errorMsg}
                    </div>
                  )}

                  <div className="upload-actions">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary"
                    >
                      {submitting ? 'Enviando comprobante...' : 'Enviar Comprobante'}
                    </button>
                    <a
                      href={whatsappComprobanteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wa-secondary-link"
                    >
                      O enviarlo más tarde por WhatsApp (+54 9 11 4914-3734)
                    </a>
                  </div>
                </form>
              )}
            </section>

            <p className="encuadre-nota">
              El turno queda confirmado una vez recibido el comprobante. Reprogramaciones con al menos 24 hs de anticipación.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .pago-page {
          background-color: var(--background);
          padding: 3.5rem 0 6rem;
        }

        .pago-container {
          max-width: 780px;
        }

        .pago-header {
          text-align: center;
          margin-bottom: 2.5rem;
          padding-bottom: 1.75rem;
          border-bottom: 1px solid var(--color-earth-light);
        }

        .pago-badge {
          display: inline-block;
          background-color: var(--color-secondary-dark);
          color: var(--color-primary);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          padding: 0.35rem 0.9rem;
          border-radius: 9999px;
          margin-bottom: 1rem;
        }

        .pago-header h1 {
          font-family: var(--font-serif);
          font-size: clamp(1.9rem, 5vw, 2.85rem);
          font-weight: 400;
          color: var(--foreground);
        }

        .pago-content {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .consultante-strip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          background-color: var(--color-secondary);
          border: 1px solid var(--color-secondary-dark);
          border-radius: var(--radius);
          padding: 0.9rem 1.25rem;
          font-size: 0.92rem;
        }

        .status-pill {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 700;
          color: var(--color-primary);
          background-color: var(--color-secondary-dark);
          padding: 0.25rem 0.7rem;
          border-radius: 9999px;
        }

        .pago-card {
          background-color: var(--background);
          border: 1px solid var(--color-earth-light);
          border-radius: var(--radius);
          padding: 1.75rem 1.35rem;
          box-shadow: var(--shadow-sm);
        }

        .pago-card.centered {
          text-align: center;
          padding: 3rem 1.5rem;
        }

        .lock-badge {
          display: inline-block;
          background-color: var(--color-primary);
          color: var(--color-secondary);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          padding: 0.35rem 0.9rem;
          border-radius: 9999px;
          margin-bottom: 1rem;
        }

        .blocked-desc {
          max-width: 520px;
          margin: 0.85rem auto 1.75rem;
          color: var(--color-earth);
          line-height: 1.7;
        }

        .muted-text {
          color: var(--color-earth);
        }

        .card-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: var(--color-primary);
          margin-bottom: 1.25rem;
        }

        .location-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.65rem;
          margin-bottom: 1.5rem;
        }

        .tab-btn {
          min-height: 46px;
          padding: 0.65rem 0.85rem;
          font-family: var(--font-main);
          font-size: 0.82rem;
          font-weight: 500;
          border-radius: var(--radius);
          border: 1px solid var(--color-earth-light);
          background-color: var(--color-secondary);
          color: var(--foreground);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab-btn.active {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
          color: var(--color-secondary);
        }

        .sepa-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .sepa-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1rem;
          background-color: var(--color-secondary);
          border: 1px solid var(--color-secondary-dark);
          border-radius: var(--radius);
        }

        .sepa-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          min-width: 0;
        }

        .sepa-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-earth);
          font-weight: 600;
        }

        .sepa-value {
          font-size: 0.94rem;
          color: var(--foreground);
          word-break: break-word;
          font-weight: 400;
        }

        .copy-btn {
          flex-shrink: 0;
          padding: 0.4rem 0.85rem;
          font-family: var(--font-main);
          font-size: 0.74rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border: 1px solid var(--color-primary);
          border-radius: var(--radius);
          background-color: transparent;
          color: var(--color-primary);
          cursor: pointer;
        }

        .copy-btn:hover {
          background-color: var(--color-primary);
          color: var(--color-secondary);
        }

        .sepa-warning {
          background-color: rgba(197, 160, 89, 0.12);
          border: 1px solid var(--color-accent);
          border-radius: var(--radius);
          padding: 0.9rem 1rem;
          font-size: 0.9rem;
          color: var(--foreground);
          line-height: 1.55;
        }

        .ars-panel {
          background-color: var(--color-secondary);
          border: 1px solid var(--color-secondary-dark);
          border-radius: var(--radius);
          padding: 1.5rem;
          text-align: center;
        }

        .ars-panel h3 {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--color-primary);
          margin-bottom: 0.6rem;
        }

        .ars-panel p {
          font-size: 0.94rem;
          color: var(--foreground);
          line-height: 1.65;
          max-width: 520px;
          margin: 0 auto 1.25rem;
        }

        .upload-form {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .field-group label {
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--foreground);
        }

        .field-group input[type='text'] {
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
        }

        .file-selected {
          font-size: 0.85rem;
          color: var(--color-primary);
        }

        .error-banner {
          padding: 0.85rem 1rem;
          background-color: #fdf2f2;
          border: 1px solid #e5b8b8;
          color: #7c2d2d;
          border-radius: var(--radius);
          font-size: 0.9rem;
        }

        .upload-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.85rem;
          margin-top: 0.25rem;
        }

        .upload-actions .btn {
          width: 100%;
        }

        .wa-secondary-link {
          font-size: 0.84rem;
          color: var(--color-earth);
          text-decoration: underline;
        }

        .wa-secondary-link:hover {
          color: var(--foreground);
        }

        .upload-success {
          background-color: var(--color-secondary);
          border: 1px solid var(--color-primary);
          border-radius: var(--radius);
          padding: 1.5rem;
          text-align: center;
        }

        .upload-success h3 {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .encuadre-nota {
          text-align: center;
          font-size: 0.86rem;
          color: var(--color-earth);
          line-height: 1.6;
          font-style: italic;
        }

        @media (max-width: 560px) {
          .location-tabs {
            grid-template-columns: 1fr;
          }

          .sepa-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .copy-btn {
            align-self: flex-end;
          }
        }
      `}</style>
    </main>
  );
}
