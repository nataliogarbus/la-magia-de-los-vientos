'use client';

import Image from 'next/image';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import LeadMagnet from '@/components/LeadMagnet';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <Image
            src="/hero-bg.png"
            alt="Hero Background - Handpan in Nature"
            fill
            priority
            style={{ objectFit: 'cover' }}
            quality={90}
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content fade-in-up">
          <h1 className="hero-title">La Magia de los Vientos</h1>
          <p className="hero-subtitle">
            Centro de Armonización Vibracional
          </p>
          <p className="hero-description">
            Una metodología avanzada que integra la física del sonido y la terapia floral para el equilibrio integral.
          </p>
          <div className="hero-actions">
            <Link href="#metodologia" className="btn btn-primary">
              Explorar el Método
            </Link>
            <Link href="/reservas" className="btn btn-secondary">
              Agendar Sesión
            </Link>
          </div>
        </div>
      </section>

      {/* Methodology / Institutional Authority Section (Formerly About) */}
      <section id="metodologia" className="about-preview section-padding">
        <div className="container">
          <div className="about-content">
            <h2 className="section-title">Nuestra Metodología</h2>
            <p className="about-text">
              En <strong>La Magia de los Vientos</strong>, no entendemos el bienestar como una abstracción, sino como un proceso biológico y físico medible.
            </p>
            <p className="about-text">
              Nuestra propuesta se fundamenta en una <strong>sólida formación académica de grado</strong> con especializaciones en instrumentación y pedagogía musical. Esta base técnica nos permite aplicar la <strong>Frecuencia Sonora</strong> como una herramienta de precisión para la estabilidad del sistema nervioso.
            </p>
            <p className="about-text">
              Integramos la física de los armónicos (Handpan) con la <strong>Terapia Floral de Precisión</strong>, creando una sinergia metodológica que aborda tanto el bloqueo vibracional como el desequilibrio emocional.
            </p>
            <div className="text-center mt-4">
              <Link href="/servicios" className="btn btn-outline">
                Conocer nuestros Protocolos de Armonización
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .about-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        .about-text {
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--foreground);
        }
        .mt-4 { margin-top: 2rem; }
      `}</style>
    </div >
      </section >

    {/* Science & Well-being (Blog Feed) */ }
    < section className = "science-section section-padding bg-light" >
      <div className="container">
        <h2 className="section-title text-center">Ciencia y Bienestar</h2>
        <p className="section-subtitle text-center mb-5">
          Artículos para entender la biología de la sintonía personal.
        </p>

        <div className="blog-grid-home">
          {/* We manually link the key pillars to ensure authority appearance */}
          <article className="blog-card-home">
            <h3>Disonancia y Armonía</h3>
            <p>Cómo el estrés altera tu frecuencia física y cómo el sonido la resetea.</p>
            <Link href="/blog/disonancia-y-armonia" className="read-more">Leer artículo &rarr;</Link>
          </article>
          <article className="blog-card-home">
            <h3>Entornos Saludables</h3>
            <p>Arquitectura vs. Entorno: La importancia de armonizar los espacios que habitamos.</p>
            <Link href="/blog/tu-hogar-como-refugio" className="read-more">Leer artículo &rarr;</Link>
          </article>
          <article className="blog-card-home">
            <h3>Huellas en Calma</h3>
            <p>Terapia floral y vibracional aplicada al bienestar y comportamiento animal.</p>
            <Link href="/blog/huellas-en-calma" className="read-more">Leer artículo &rarr;</Link>
          </article>
        </div>
        <div className="text-center mt-5">
          <Link href="/blog" className="btn btn-primary">Ver Biblioteca Completa</Link>
        </div>
      </div>

      </section >

    {/* Introduction / Storytelling */ }
    < section className = "section-intro container" >
      <div className="intro-text">
        <h2>Sanación Integral: Ciencia y Esencia</h2>
        <p>
          Nuestra base de conocimiento culminó en una formación académica rigurosa,
          donde contamos con tres especializaciones de grado: <strong>Guitarra, Educación Musical Inicial y de Adultos</strong>.
          Esta base técnica sólida es el cimiento sobre el que construimos nuestra propuesta.
        </p>
        <p>
          Sin embargo, la búsqueda de integralidad nos llevó más allá. Integramos disciplinas certificadas como <strong>Yoga, Reiki,
            Terapia con Flores de Bach y Gemoterapia</strong>. En &quot;La Magia de los Vientos&quot;, fusionamos la precisión
          de la música académica con la intuición de la sanación vibracional para ofrecerte una experiencia transformadora.
        </p>
      </div>
      </section >

    <LeadMagnet />

  {/* Pillars Grid */ }
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

      <FAQ />

      <style jsx>{`
        /* Science Section Styles */
        .blog-grid-home {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        .blog-card-home {
            background: white;
            padding: 2rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow-sm);
            transition: transform 0.3s;
            border-top: 4px solid var(--color-primary);
        }
        .blog-card-home:hover {
            transform: translateY(-5px);
        }
        .blog-card-home h3 {
            color: var(--color-primary);
            margin-bottom: 1rem;
        }
        .read-more {
            color: var(--color-secondary-dark);
            font-weight: 600;
            text-decoration: none;
            margin-top: 1rem;
            display: inline-block;
        }
        .bg-light {
            background-color: #f8f9fa;
        }
        .text-center { text-align: center; }
        .mb-5 { margin-bottom: 3rem; }
        .mt-5 { margin-top: 3rem; }

        .hero {
          min-height: 90vh; /* Full screen feel */
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          overflow: hidden;
          color: white; /* Make text white for better contrast on image */
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4); /* Dark overlay for readability */
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2; /* Ensure content is above overlay */
          max-width: 800px;
        }

        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 0.5rem;
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .hero-subtitle {
          font-size: 1.5rem;
          font-style: italic;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1.5rem;
          font-weight: 300;
        }

        .hero-description {
          font-size: 1.125rem;
          margin-bottom: 2.5rem;
          color: rgba(255, 255, 255, 0.85);
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
