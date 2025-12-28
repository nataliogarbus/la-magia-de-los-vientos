'use client';

import Image from 'next/image';

export default function ServicesPage() {
  return (
    <div className="page-container">
      <header className="page-header">
        <div className="header-content container">
          <h1>Nuestros Servicios</h1>
          <p>Una propuesta integral de bienestar para vos, tus mascotas y tus espacios.</p>
        </div>
      </header>

      <section className="service-detail" id="consultoria">
        <div className="container service-grid">
          <div className="text-content">
            <h2>Consultoría Humana</h2>
            <h3>Bach + Sonido</h3>
            <p>
              Sesiones personalizadas (presenciales o virtuales) para la gestión emocional.
              El diferencial de nuestro método es la sintonización energética previa
              mediante Handpans y guitarra. Esta inmersión sonora prepara tu
              campo vibratorio para recibir la sabiduría de las Flores de Bach con mayor
              receptividad.
            </p>
            <ul className="feature-list">
              <li>Entrevista profunda y empática.</li>
              <li>Sintonización con instrumentos en vivo (presencial).</li>
              <li>Preparado floral personalizado incluido.</li>
            </ul>

            <div className="pricing-card">
              <div className="price-row">
                <span className="label">Sesión Individual:</span>
                <span className="value">$50.000</span>
              </div>
              <div className="price-row highlight">
                <span className="label">Plan Sintonía (3 Meses):</span>
                <div className="price-stack">
                  <span className="value">$120.000</span>
                  <span className="badge-save">Ahorrás $30.000</span>
                </div>
              </div>
            </div>

            <div className="actions">
              <a href="/reservas" className="btn btn-secondary">Agendar Sesión</a>
              <a href="https://wa.me/5491131671954?text=Hola,%20me%20interesa%20el%20Plan%20Sintonia" target="_blank" className="btn btn-primary">Iniciar Plan Trimestral</a>
            </div>
          </div>
          <div className="visual-content artistic-gradient-1">
            {/* Pending Image Generation: Handpan/Floral Composition */}
            <span className="visual-label">Sintonía Humana</span>
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

            <div className="pricing-card">
              <div className="price-row">
                <span className="label">Sesión Individual:</span>
                <span className="value">$40.000</span>
              </div>
              <div className="price-row highlight">
                <span className="label">Plan Sintonía (3 Meses):</span>
                <div className="price-stack">
                  <span className="value">$96.000</span>
                  <span className="badge-save">Ahorrás $24.000</span>
                </div>
              </div>
            </div>

            <div className="actions">
              <a href="/reservas" className="btn btn-secondary">Agendar Sesión</a>
              <a href="https://wa.me/5491131671954?text=Hola,%20me%20interesa%20Huellas%20en%20Calma" target="_blank" className="btn btn-primary">Iniciar Plan Trimestral</a>
            </div>
          </div>
          <div className="visual-content artistic-gradient-2">
            {/* Pending Image Generation: Sleeping Pet */}
            <span className="visual-label">Huellas en Calma</span>
          </div>
        </div>
      </section>

      <section className="service-detail" id="espacios">
        <div className="container service-grid">
          <div className="text-content">
            <h2>Armonización</h2>
            <h3>Alineación vibracional de espacios</h3>
            <p>
              Nuestros hogares y lugares de trabajo son extensiones de nuestro propio campo energético.
              Realizamos una limpieza profunda utilizando frecuencias sonoras y sahumado
              para restablecer el equilibrio y la armonía.
            </p>

            <div className="pricing-card">
              <div className="price-row">
                <span className="label">Sesión Individual:</span>
                <span className="value">$70.000</span>
              </div>
              <div className="price-row highlight">
                <span className="label">Plan Sintonía (3 Meses):</span>
                <div className="price-stack">
                  <span className="value">$180.000</span>
                  <span className="badge-save">Ahorrás $30.000</span>
                </div>
              </div>
            </div>

            <div className="actions">
              <a href="https://wa.me/5491131671954?text=Hola,%20me%20interesa%20una%20sesion%20de%20Espacios" target="_blank" className="btn btn-secondary">Consultar</a>
              <a href="https://wa.me/5491131671954?text=Hola,%20me%20interesa%20el%20Plan%20de%20Espacios" target="_blank" className="btn btn-primary">Iniciar Plan Trimestral</a>
            </div>
          </div>
          <div className="visual-content image-container">
            <Image
              src="/espacios_zen_1766922673947.png"
              alt="Armonización de Espacios Zen"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-image"
            />
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

          <div className="pricing-card centered">
            <div className="price-row">
              <span className="label">Inversión:</span>
              <span className="value">Consultar presupuesto personalizado</span>
            </div>
          </div>

          <a href="/multimedia" className="btn btn-primary margin-top">Escuchar Muestras</a>
        </div>
      </section>

      <style jsx>{`
        .page-header {
          background-color: var(--color-primary);
          color: white;
          padding: 6rem 0;
          text-align: center;
          background-image: url('/hero-bg.png'); /* Reuse hero bg with overlay if possible, or just color */
          background-size: cover;
          background-position: center;
          position: relative;
        }
        
        .page-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(44, 62, 61, 0.85); /* Overlay */
            z-index: 1;
        }

        .header-content {
            position: relative;
            z-index: 2;
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
          padding: 6rem 0;
        }

        .service-detail.alt-bg {
          background-color: #FDFDFB; /* Warm white */
        }

        .service-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        
        .service-grid.reverse .text-content {
            order: 2;
        }
        .service-grid.reverse .visual-content {
            order: 1;
        }

        .text-content h2 {
            font-size: 2.2rem;
            margin-bottom: 0.5rem;
        }
        
        .text-content h3 {
            font-size: 1.2rem;
            color: var(--color-earth);
            font-weight: 400;
            margin-bottom: 1.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .feature-list {
            margin: 1.5rem 0;
            padding-left: 1.2rem;
            color: var(--foreground);
        }
        
        .feature-list li {
            margin-bottom: 0.5rem;
        }

        /* Visuals */
        .visual-content {
          height: 400px;
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: var(--shadow-md);
          overflow: hidden;
        }

        .artistic-gradient-1 {
            background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
            /* Placeholder gradient until image is ready */
        }
        
        .artistic-gradient-2 {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        
        .visual-label {
            color: white;
            font-size: 1.5rem;
            font-weight: 600;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
            opacity: 0.9;
        }

        .rounded-image {
            border-radius: var(--radius);
        }

        /* Pricing Card */
        .pricing-card {
            background: white;
            border: 1px solid rgba(0,0,0,0.05);
            padding: 1.5rem;
            border-radius: var(--radius);
            margin: 2rem 0;
            box-shadow: var(--shadow-sm);
        }
        
        .pricing-card.centered {
            max-width: 500px;
            margin: 2rem auto;
        }

        .price-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 0;
        }
        
        .price-row.highlight {
            border-top: 1px solid rgba(0,0,0,0.05);
            padding-top: 1rem;
            margin-top: 0.5rem;
        }
        
        .label {
            font-weight: 500;
            color: var(--foreground);
        }
        
        .value {
            font-weight: 700;
            color: var(--color-primary);
            font-size: 1.1rem;
        }
        
        .price-stack {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
        
        .badge-save {
            background-color: var(--color-secondary);
            font-size: 0.75rem;
            padding: 0.2rem 0.6rem;
            border-radius: 999px;
            color: var(--foreground);
            font-weight: 600;
            margin-top: 0.25rem;
        }

        .actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .service-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .service-grid.reverse .text-content { order: 0; }
          .service-grid.reverse .visual-content { order: 1; }
        }

        .premium-block {
          background: linear-gradient(135deg, var(--color-secondary) 0%, #FFF 100%);
          border-top: 1px solid var(--color-secondary-dark);
          padding: 6rem 0;
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

