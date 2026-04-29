'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content fade-in-up">
          <div className="logo-container">
            <Image
              src="/logo.png"
              alt="La Magia de los Vientos Logo"
              width={200}
              height={200}
              priority
              className="hero-logo"
            />
          </div>
          <h1 className="hero-title">La Magia de los Vientos</h1>
          <p className="hero-subtitle">
            "Mamá... ¿escuchás la magia del viento?"
          </p>
          <p className="hero-description">
            Un espacio de armonización vibracional que une la música, la energía y la naturaleza.
          </p>
          <div className="hero-actions">
            <Link href="/servicios" className="btn btn-primary">
              Descubrir Servicios
            </Link>
            <Link href="/reservas" className="btn btn-secondary">
              Agendar Sesión
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction / Storytelling */}
      <section className="section-intro container">
        <div className="intro-text">
          <h2>Sanación a través de la frecuencia</h2>
          <p>
            Desde el Conservatorio hasta la terapia holística, mi camino ha sido una búsqueda constante
            de la armonía. Utilizando la vibración de los Handpans, las Flores de Bach y la energía del Reiki,
            creamos un puente hacia tu bienestar interior.
          </p>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="section-pillars container">
        <h2 className="section-title">Nuestros Pilares</h2>
        <div className="pillars-grid">
          {/* Card 1 */}
          <div className="pillar-card">
            <h3>Consultoría Humana</h3>
            <p>Gestión emocional con Flores de Bach y sintonización vibracional con Hangs.</p>
          </div>
          {/* Card 2 */}
          <div className="pillar-card">
            <h3>Bienestar Animal</h3>
            <p>Huellas en Calma. Terapia floral para tus compañeros de vida.</p>
          </div>
          {/* Card 3 */}
          <div className="pillar-card">
            <h3>Armonización de Espacios</h3>
            <p>Limpieza energética y sonora para hogares y oficinas.</p>
          </div>
          {/* Card 4 */}
          <div className="pillar-card premium">
            <h3>Código Vibratorio</h3>
            <p>Una pieza musical única, creada específicamente para tu frecuencia.</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          min-height: 90vh; /* Full screen feel */
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: linear-gradient(135deg, var(--background) 0%, #F5F7F5 100%);
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        /* Decorative Background element */
        .hero::before {
          content: '';
          position: absolute;
          top: -10%;
          right: -5%;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(58, 107, 101, 0.05) 0%, rgba(0,0,0,0) 70%);
          border-radius: 50%;
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
        }

        .logo-container {
          margin-bottom: 2rem;
        }

        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(to right, var(--color-primary), var(--color-earth));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          font-style: italic;
          color: var(--color-earth);
          margin-bottom: 1.5rem;
          font-weight: 300;
        }

        .hero-description {
          font-size: 1.125rem;
          margin-bottom: 2.5rem;
          color: var(--foreground);
          opacity: 0.9;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .section-intro {
          padding: 6rem 1.5rem;
          text-align: center;
          max-width: 800px;
        }

        .section-intro h2 {
          margin-bottom: 1.5rem;
          font-size: 2.5rem;
        }

        .section-intro p {
          font-size: 1.2rem;
          line-height: 1.8;
          color: var(--color-earth);
        }

        .section-pillars {
          padding-bottom: 6rem;
        }

        .section-title {
          text-align: center;
          margin-bottom: 3rem;
          font-size: 2.5rem;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .pillar-card {
          background: white;
          padding: 2rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
          transition: transform 0.3s, box-shadow 0.3s;
          border: 1px solid rgba(0,0,0,0.03);
        }

        .pillar-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .pillar-card h3 {
          margin-bottom: 1rem;
          color: var(--color-primary);
        }

        .pillar-card.premium {
          background: linear-gradient(135deg, white 0%, var(--color-secondary) 100%);
          border-color: var(--color-secondary);
        }

        .fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
