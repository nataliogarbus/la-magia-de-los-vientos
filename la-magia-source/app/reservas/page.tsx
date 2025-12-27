'use client';

export default function BookingPage() {
    return (
        <div className="page-container container">
            <div className="booking-wrapper">
                <h1>Reserva tu Sesión</h1>
                <p className="booking-intro">
                    Para coordinar un turno o consultar por nuestros servicios,
                    por favor envíanos un mensaje directo. Te responderemos a la brevedad
                    para encontrar el mejor horario para vos.
                </p>

                <div className="booking-options">
                    <div className="option-card">
                        <h3>Consultas Rápidas</h3>
                        <p>¿Tenés dudas sobre qué terapia es para vos?</p>
                        <a
                            href="https://wa.me/5491100000000?text=Hola,%20quisiera%20más%20información%20sobre..."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                        >
                            Consultar por WhatsApp
                        </a>
                    </div>

                    <div className="option-card highlight">
                        <h3>Agendar Turno</h3>
                        <p>Consultorio presencial o encuentro virtual.</p>
                        <a
                            href="https://wa.me/5491100000000?text=Hola,%20quisiera%20agendar%20un%20turno..."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-lg"
                        >
                            Reservar Ahora
                        </a>
                    </div>
                </div>

                <div className="info-block">
                    <h4>Pagos y Cancelaciones</h4>
                    <p>
                        Aceptamos Mercado Pago y Transferencia Bancaria.
                        Las cancelaciones deben realizarse con 24hs de anticipación.
                    </p>
                </div>
            </div>

            <style jsx>{`
        .booking-wrapper {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 1rem;
          text-align: center;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .booking-intro {
          font-size: 1.2rem;
          margin-bottom: 3rem;
          color: var(--foreground);
        }

        .booking-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .option-card {
          padding: 2rem;
          border-radius: var(--radius);
          border: 1px solid #eee;
          background: white;
          transition: transform 0.2s;
        }

        .option-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .option-card.highlight {
          border-color: var(--color-primary);
          background-color: #FDFDFB;
          box-shadow: var(--shadow-md);
        }

        .option-card h3 {
          margin-bottom: 0.5rem;
          color: var(--color-primary);
        }

        .option-card p {
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .btn-outline {
          border: 2px solid var(--color-primary);
          color: var(--color-primary);
          background: transparent;
        }

        .btn-outline:hover {
          background: var(--color-primary);
          color: white;
        }

        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }

        .info-block {
          background-color: var(--color-secondary);
          opacity: 0.8;
          padding: 1.5rem;
          border-radius: var(--radius);
          font-size: 0.9rem;
        }

        @media (max-width: 600px) {
          .booking-options {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
