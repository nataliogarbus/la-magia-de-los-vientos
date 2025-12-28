'use client';

export default function BookingPage() {
  return (
    <div className="page-container container">
      <div className="booking-wrapper">
        <h1>Reserva tu Sesión</h1>
        <p className="booking-intro">
          Para coordinar un turno o consultar por nuestros servicios,
          por favor envíanos un mensaje directo. Te responderemos a la brevedad
          para encontrar el mejor horario.
        </p>

        <div className="booking-options-calendar">
          <div className="calendar-container">
            <div className="calendar-header">
              <h2>Agenda tu Sesión</h2>
              <p>Seleccioná el día y horario que mejor te convenga en nuestra agenda de turnos.</p>
            </div>

            {/* Google Calendar Embed Placeholder */}
            <div className="google-calendar-embed">
              <div className="calendar-placeholder-content">
                <h3>📅 Google Calendar</h3>
                <p>Aquí se cargará el widget de turnos.</p>
                <a
                  href="https://calendar.google.com/calendar/u/0/appointments/schedules/YOUR_SCHEDULE_ID"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Ver disponibilidad de sesiones
                </a>
              </div>
            </div>
          </div>

          <div className="contact-alternative">
            <p>¿Preferís coordinar por chat?</p>
            <a href="https://wa.me/5491112345678" className="btn btn-secondary btn-sm">Consultar por WhatsApp</a>
          </div>
        </div>

        <div className="info-block">
          <h3>Información Importante</h3>
          <p>
            Los planes de suscripción garantizan la continuidad de la sintonía vibracional y el suministro de fórmulas florales durante todo el trimestre.
            Inversión final expresada en Pesos Argentinos. Aceptamos <strong>Mercado Pago y Transferencia Bancaria</strong>.
          </p>
        </div>
      </div>

      <style jsx>{`
        .booking-wrapper {
          max-width: 900px;
          margin: 0 auto;
          padding: 6rem 1rem;
          text-align: center;
        }

        h1 {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          color: var(--color-primary);
        }

        .booking-intro {
          font-size: 1.25rem;
          margin-bottom: 4rem;
          color: var(--foreground);
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .calendar-container {
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow-md);
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.05);
          margin-bottom: 3rem;
        }

        .calendar-header {
          background-color: var(--color-primary);
          color: white;
          padding: 2rem;
        }
        
        .calendar-header h2 {
            color: white;
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
        }

        .google-calendar-embed {
          padding: 4rem 2rem;
          background-color: #FDFDFB;
        }

        .calendar-placeholder-content {
          border: 2px dashed var(--color-secondary-dark);
          padding: 3rem;
          border-radius: var(--radius);
          background: white;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .calendar-placeholder-content h3 {
            color: var(--color-earth);
            margin-bottom: 1rem;
        }
        
        .calendar-placeholder-content p {
            margin-bottom: 2rem;
            color: var(--foreground);
        }

        .info-block {
          background-color: rgba(232, 211, 211, 0.3); /* Transparent secondary */
          padding: 2rem;
          border-radius: var(--radius);
          font-size: 1rem;
          max-width: 700px;
          margin: 0 auto;
          border: 1px solid var(--color-secondary);
        }
        
        .info-block h3 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            color: var(--color-primary);
        }
        
        .cancel-policy {
            margin-top: 1rem;
            font-size: 0.9rem;
            font-style: italic;
            opacity: 0.8;
        }
        
        .contact-alternative {
          margin-bottom: 4rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(0,0,0,0.05);
        }
        
        .contact-alternative p {
            margin-bottom: 1rem;
            font-size: 1.1rem;
            font-weight: 500;
        }
      `}</style>
    </div>
  );
}
