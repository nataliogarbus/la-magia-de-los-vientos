'use client';

const WHATSAPP_RESERVA_URL =
  'https://wa.me/5491149143734?text=Hola%20Eliana%2C%20quisiera%20consultar%20disponibilidad%20para%20reservar%20una%20sesi%C3%B3n.';

export default function BookingPage() {
  return (
    <main className="reservas-page">
      <div className="container reservas-container">
        <header className="reservas-header">
          <span className="reservas-badge">Turnos Personalizados · Online y Presencial</span>
          <h1>Reserva tu Sesión</h1>
          <p className="reservas-intro">
            Coordinamos cada encuentro de manera personalizada para asegurarnos de encontrar el día y horario que mejor se adapte a tu momento. Escribile directamente a Eliana por WhatsApp para consultar disponibilidad.
          </p>
        </header>

        <section className="reservas-cta-card">
          <h2>Coordinación Directa por WhatsApp</h2>
          <p className="reservas-phone">WhatsApp de Eliana: +54 9 11 4914-3734</p>
          <a
            href={WHATSAPP_RESERVA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Consultar Disponibilidad por WhatsApp
          </a>
        </section>

        <section className="proceso-section">
          <h2>¿Cómo funciona el proceso de admisión?</h2>
          <div className="proceso-grid">
            <article className="proceso-step">
              <span className="step-num">01</span>
              <h3>Coordinación</h3>
              <p>
                Acordás día, horario y modalidad (presencial u online) directamente con Eliana por WhatsApp.
              </p>
            </article>
            <article className="proceso-step">
              <span className="step-num">02</span>
              <h3>Consentimiento</h3>
              <p>
                Recibís el enlace privado para completar y firmar el Consentimiento Informado y Encuadre Ético.
              </p>
            </article>
            <article className="proceso-step">
              <span className="step-num">03</span>
              <h3>Cuestionario Inicial</h3>
              <p>
                Completás tu Cuestionario Inicial al menos 48 horas antes de la sesión para aprovechar al máximo el encuentro.
              </p>
            </article>
          </div>
        </section>

        <div className="info-block">
          <h3>Información Importante</h3>
          <p>
            Inversión expresada en Pesos Argentinos. Aceptamos{' '}
            <strong>Mercado Pago y Transferencia Bancaria</strong>. Ante cualquier reprogramación, te pedimos avisar con al menos 24 horas de anticipación.
          </p>
        </div>
      </div>

      <style jsx>{`
        .reservas-page {
          padding: 4.5rem 0 6rem;
          background-color: var(--background);
        }

        .reservas-container {
          max-width: 820px;
        }

        .reservas-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .reservas-badge {
          display: inline-block;
          background-color: var(--color-secondary-dark);
          color: var(--color-primary);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          padding: 0.35rem 0.9rem;
          border-radius: 9999px;
          margin-bottom: 1.25rem;
        }

        .reservas-header h1 {
          font-family: var(--font-serif);
          font-size: clamp(2.1rem, 5vw, 3.2rem);
          font-weight: 400;
          color: var(--foreground);
          margin-bottom: 1rem;
        }

        .reservas-intro {
          font-size: 1.05rem;
          color: var(--color-earth);
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.75;
        }

        .reservas-cta-card {
          background-color: var(--color-primary);
          color: var(--color-secondary);
          border-radius: var(--radius);
          padding: 2.75rem 1.75rem;
          text-align: center;
          margin-bottom: 3.5rem;
          box-shadow: var(--shadow-md);
        }

        .reservas-cta-card h2 {
          font-family: var(--font-serif);
          font-size: 1.7rem;
          color: var(--color-secondary);
          margin-bottom: 0.65rem;
        }

        .reservas-phone {
          font-size: 1rem;
          color: var(--color-accent);
          font-weight: 500;
          margin-bottom: 1.75rem;
          letter-spacing: 0.04em;
        }

        .reservas-cta-card .btn-primary {
          background-color: var(--color-secondary);
          color: var(--color-primary);
        }

        .reservas-cta-card .btn-primary:hover {
          background-color: var(--color-accent);
          color: var(--color-primary);
        }

        .proceso-section {
          margin-bottom: 3rem;
        }

        .proceso-section h2 {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          text-align: center;
          color: var(--foreground);
          margin-bottom: 2rem;
        }

        .proceso-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .proceso-step {
          background-color: var(--color-secondary);
          border: 1px solid var(--color-earth-light);
          border-top: 2px solid var(--color-accent);
          border-radius: var(--radius);
          padding: 1.5rem 1.25rem;
        }

        .step-num {
          display: block;
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: var(--color-accent-dark);
          margin-bottom: 0.5rem;
        }

        .proceso-step h3 {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .proceso-step p {
          font-size: 0.9rem;
          color: var(--color-earth);
          line-height: 1.65;
        }

        .info-block {
          background-color: var(--color-secondary);
          border: 1px solid var(--color-secondary-dark);
          border-radius: var(--radius);
          padding: 1.75rem;
          text-align: center;
        }

        .info-block h3 {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--color-primary);
          margin-bottom: 0.65rem;
        }

        .info-block p {
          font-size: 0.94rem;
          color: var(--foreground);
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .proceso-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
