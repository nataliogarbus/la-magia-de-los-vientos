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
            Inversión final expresada en Pesos Argentinos. Aceptamos Mercado Pago y Transferencia Bancaria.
          </p>
          <p className="cancel-policy">
            * Política de cancelación: 24hs de anticipación para reprogramar sin cargo.
          </p>
        </div>
      </div>

      <style jsx>{`
        .booking-wrapper {
          max-width: 900px;
          margin: 0 auto;
          padding: 4rem 1rem;
          text-align: center;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: var(--color-primary);
        }

        .booking-intro {
          font-size: 1.2rem;
          margin-bottom: 3rem;
          color: var(--foreground);
        }

        .calendar-container {
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow-md);
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.05);
          margin-bottom: 2rem;
        }

        .calendar-header {
          background-color: var(--color-primary);
          color: white;
          padding: 1.5rem;
        }

        .google-calendar-embed {
          padding: 3rem;
          background-color: #f9f9f9;
        }

        .calendar-placeholder-content {
          border: 2px dashed var(--color-secondary);
          padding: 2rem;
          border-radius: var(--radius);
          background: white;
        }

        .info-block {
          background-color: var(--color-secondary); /**/
          opacity: 0.8;
          padding: 1.5rem;
          border-radius: var(--radius);
          font-size: 0.9rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .contact-alternative {
          margin-bottom: 3rem;
        }
      `}</style>
    </div>
  );
}
