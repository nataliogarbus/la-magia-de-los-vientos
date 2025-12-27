'use client';

export default function ServicesPage() {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Nuestros Servicios</h1>
        <p>Una propuesta integral de bienestar para vos, tus mascotas y tus espacios.</p>
      </header>

      <section className="service-detail" id="consultoria">
        <div className="container service-grid">
          <div className="text-content">
            <h2>Consultoría Humana</h2>
            <h3>Bach + Sonido</h3>
            <p>
              Sesiones personalizadas (presenciales o virtuales) para la gestión emocional.
              El diferencial de nuestro método es la sintonización energética previa mediante
              Handpans (Hangs) y guitarra. Esta inmersión sonora prepara tu campo vibratorio
              para recibir la sabiduría de las Flores de Bach con mayor receptividad.
            </p>
            <ul className="feature-list">
              <li>Entrevista profunda y empática.</li>
              <li>Sintonización con instrumentos en vivo (presencial).</li>
              <li>Preparado floral personalizado.</li>
            </ul>
            <a href="https://wa.me/5491112345678" target="_blank" className="btn btn-secondary margin-top">Consultar</a>
          </div>
          <div className="visual-content placeholder">
            {/* Image Placeholder */}
            <span>Imagen Consultoría</span>
          </div>
        </div>
      </section>

      <section className="service-detail alt-bg" id="animales">
        <div className="container service-grid reverse">
          <div className="text-content">
            <h2>Bienestar Animal</h2>
            <h3>Huellas en Calma</h3>
            <p>
              Nuestros compañeros animales también sienten y absorben las energías del entorno.
              Ofrecemos terapia floral para situaciones de estrés, mudanzas, miedos o duelos.
              Trabajamos a través de una entrevista con el responsable para entender el vínculo
              y la necesidad del animal.
            </p>
            <a href="https://wa.me/5491112345678" target="_blank" className="btn btn-secondary">Consulta por tu mascota</a>
          </div>
          <div className="visual-content placeholder">
            <span>Imagen Mascota</span>
          </div>
        </div>
      </section>

      <section className="service-detail" id="espacios">
        <div className="container service-grid">
          <div className="text-content">
            <h2>Armonización de Espacios</h2>
            <p>
              Limpieza energética y sonora de hogares, oficinas o consultorios.
              Utilizamos frecuencias sonoras, sahumado y técnicas de Reiki para
              restablecer el flujo vital de tus ambientes.
            </p>
            <a href="https://wa.me/5491112345678" target="_blank" className="btn btn-secondary margin-top">Consultar</a>
          </div>
          <div className="visual-content placeholder">
            <span>Imagen Espacios</span>
          </div>
        </div>
      </section>

      <section className="service-detail premium-block" id="codigo">
        <div className="container text-center">
          <h2>El Código Vibratorio</h2>
          <p className="premium-desc">
            Nuestro producto más exclusivo. Una pieza musical única y personalizada,
            creada e interpretada por Eliana basándose en tu propia frecuencia.
            Un audio digital de alta calidad para que uses en tus meditaciones,
            momentos de calma o simplemente para volver a tu eje.
          </p>
          <a href="/multimedia" className="btn btn-primary margin-top">Escuchar Muestras</a>
        </div>
      </section>

      <style jsx>{`
        .page-header {
          background-color: var(--color-primary);
          color: white;
          padding: 6rem 1.5rem;
          text-align: center;
        }

        .page-header h1 {
          color: white;
          margin-bottom: 1rem;
          font-size: 3rem;
        }

        .page-header p {
          font-size: 1.25rem;
          opacity: 0.9;
        }

        .service-detail {
          padding: 5rem 0;
        }

        .service-detail.alt-bg {
          background-color: #F8F6F4;
        }

        .service-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .visual-content.placeholder {
          background-color: var(--color-earth-light);
          height: 300px;
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .service-grid {
            grid-template-columns: 1fr;
          }
          /* Reorder for mobile if needed */
        }

        .premium-block {
          background: linear-gradient(135deg, var(--color-secondary) 0%, #FFF 100%);
          border-top: 1px solid var(--color-secondary-dark);
        }

        .premium-desc {
          max-width: 700px;
          margin: 1.5rem auto;
          font-size: 1.2rem;
        }
        
        .margin-top {
          margin-top: 2rem;
        }
      `}</style>
    </div>
  );
}
