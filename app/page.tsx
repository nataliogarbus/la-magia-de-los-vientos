'use client';

import Image from 'next/image';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import LeadMagnet from '@/components/LeadMagnet';
import { blogPosts } from '@/lib/blog-data';

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
          <h1 className="hero-title">Centro de Armonización Vibracional</h1>
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

      {/* Methodology / Intro */}
      <section className="section-intro container">
        <div className="methodology-box fade-in-up">
          <h2 className="section-title">Nuestra Metodología</h2>

          <div className="methodology-content">
            <p>
              En <strong>La Magia de los Vientos</strong>, no entendemos el bienestar como una abstracción, sino como un proceso
              biológico y físico medible.
            </p>

            <div className="decorative-divider">✻</div>

            <p>
              Nuestra propuesta se fundamenta en una <strong>sólida formación académica de grado</strong> con especializaciones
              en instrumentación y pedagogía musical. Esta base técnica nos permite aplicar la <strong>Frecuencia Sonora</strong>
              como una herramienta de precisión para la estabilidad del sistema nervioso.
            </p>

            <div className="decorative-divider">✻</div>

            <p>
              Integramos la física de los armónicos (Handpan) con la <strong>Terapia Floral de Precisión</strong>, creando una
              sinergia metodológica que aborda tanto el bloqueo vibracional como el desequilibrio emocional.
            </p>
          </div>

          <div className="mt-5">
            <Link href="/servicios" className="btn btn-outline">
              Conocer nuestros Protocolos de Armonización
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars of Service */}

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

      {/* Science & Well-being (Blog Feed) */}
      <section className="science-section section-padding bg-light">
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

      {/* Introduction / Storytelling */}
      {/* Introduction / Storytelling */}
      <section className="section-intro container">
        <div className="intro-text">
          <h2>Ciencia y Esencia: Un Camino Hacia el Eje</h2>
          <p>
            Creemos que la verdadera transformación ocurre cuando la técnica profesional se encuentra con la sensibilidad humana. Nuestra propuesta se apoya en una formación académica rigurosa en instrumentación y educación musical, garantizando que cada intervención sonora tenga un propósito claro y un cimiento sólido.
          </p>
          <p>
            Esta estructura se entrelaza con la práctica certificada de Flores de Bach, Gemoterapia y Reiki, permitiéndonos abordar el bienestar desde todos sus ángulos. En nuestro espacio, fusionamos el conocimiento académico con la sanación integral para ofrecerte una experiencia de sintonía profunda y duradera.
          </p>
        </div>
      </section>

      <LeadMagnet />

      {/* Pillars of Service */}
      <section className="section-pillars container">
        <h2 className="section-title">Nuestros Pilares</h2>
        <div className="pillars-grid">
          {/* Consultoría Humana */}
          <div className="pillar-card">
            <div className="card-header">
              <h3>Consultoría Humana</h3>
              <p className="card-subtitle">Gestión emocional con Flores de Bach.</p>
            </div>

            <div className="pricing-body">
              <div className="price-item">
                <div className="price-header">
                  <h4>Sesión Individual</h4>
                  <span className="price-value">$50.000</span>
                </div>
                <ul className="include-list">
                  <li>✓ Entrevista de diagnóstico</li>
                  <li>✓ Sesión sonora / Armonización</li>
                  <li>✓ Preparado floral personalizado</li>
                  <li>✓ <strong>Reporte Digital de Sintonía</strong></li>
                </ul>
                <Link href="/reservas" className="btn btn-outline width-100">
                  Agendar Sesión Única
                </Link>
              </div>

              <div className="divider"></div>

              <div className="price-item highlight-plan">
                <div className="price-header">
                  <h4>Plan Sintonía (3 Meses)</h4>
                  <span className="price-value">$120.000</span>
                </div>
                <span className="badge-save">Ahorrás $30.000</span>
                <ul className="include-list premium">
                  <li>✓ Seguimiento continuo</li>
                  <li>✓ Ajuste de fórmula mes a mes</li>
                  <li>✓ <strong>Dossier Técnico Evolutivo</strong></li>
                </ul>
                <Link href="https://wa.me/5491131671954?text=Hola,%20me%20interesa%20el%20Plan%20Sintonia%20de%20Consultoria%20Humana" className="btn btn-primary width-100 mt-auto">
                  Iniciar Proceso Trimestral
                </Link>
              </div>
            </div>
          </div>

          {/* Bienestar Animal */}
          <div className="pillar-card">
            <div className="card-header">
              <h3>Huellas en Calma</h3>
              <p className="card-subtitle">Terapia floral para mascotas.</p>
            </div>

            <div className="pricing-body">
              <div className="price-item">
                <div className="price-header">
                  <h4>Sesión Individual</h4>
                  <span className="price-value">$40.000</span>
                </div>
                <ul className="include-list">
                  <li>✓ Entrevista con responsable</li>
                  <li>✓ Diagnóstico vincular</li>
                  <li>✓ Preparado floral incluido</li>
                  <li>✓ <strong>Reporte Digital de Sintonía</strong></li>
                </ul>
                <Link href="/reservas" className="btn btn-outline width-100">
                  Agendar Sesión Única
                </Link>
              </div>

              <div className="divider"></div>

              <div className="price-item highlight-plan">
                <div className="price-header">
                  <h4>Plan Sintonía (3 Meses)</h4>
                  <span className="price-value">$96.000</span>
                </div>
                <span className="badge-save">Ahorrás $24.000</span>
                <ul className="include-list premium">
                  <li>✓ Acompañamiento en cambios</li>
                  <li>✓ Ajuste de fórmula mes a mes</li>
                  <li>✓ <strong>Dossier Técnico Evolutivo</strong></li>
                </ul>
                <Link href="https://wa.me/5491131671954?text=Hola,%20me%20interesa%20el%20Plan%20Sintonia%20de%20Huellas%20en%20Calma" className="btn btn-primary width-100 mt-auto">
                  Iniciar Proceso Trimestral
                </Link>
              </div>
            </div>
          </div>

          {/* Armonización */}
          <div className="pillar-card">
            <div className="card-header">
              <h3>Armonización</h3>
              <p className="card-subtitle">Alineación vibracional de espacios.</p>
            </div>

            <div className="pricing-body">
              <div className="price-item">
                <div className="price-header">
                  <h4>Sesión Individual</h4>
                  <span className="price-value">$70.000</span>
                </div>
                <ul className="include-list">
                  <li>✓ Limpieza sonora in situ</li>
                  <li>✓ Sahumado energético</li>
                  <li>✓ Diagnóstico del entorno</li>
                  <li>✓ <strong>Reporte Digital de Sintonía</strong></li>
                </ul>
                <Link href="https://wa.me/5491131671954?text=Hola,%20me%20interesa%20una%20sesion%20de%20Armonizacion%20de%20Espacios" className="btn btn-outline width-100">
                  Agendar Sesión Única
                </Link>
              </div>

              <div className="divider"></div>

              <div className="price-item highlight-plan">
                <div className="price-header">
                  <h4>Plan Sintonía (3 Meses)</h4>
                  <span className="price-value">$180.000</span>
                </div>
                <span className="badge-save">Ahorrás $30.000</span>
                <ul className="include-list premium">
                  <li>✓ Mantenimiento energético</li>
                  <li>✓ Sostenimiento de la frecuencia</li>
                  <li>✓ <strong>Dossier Técnico Evolutivo</strong></li>
                </ul>
                <Link href="https://wa.me/5491131671954?text=Hola,%20me%20interesa%20el%20Plan%20Sintonia%20de%20Espacios" className="btn btn-primary width-100 mt-auto">
                  Iniciar Proceso Trimestral
                </Link>
              </div>
            </div>
          </div>

          {/* Código Vibratorio */}
          <div className="pillar-card premium">
            <div className="card-header">
              <h3>Código Vibratorio</h3>
              <p className="card-subtitle">Composición musical única.</p>
            </div>

            <div className="pricing-body centered-body">
              <p className="premium-desc">
                Una pieza musical única, creada específicamente para tu frecuencia.
                Composición académica y grabación de alta fidelidad.
              </p>

              <div className="price-item">
                <div className="price-header centered">
                  <h4>Inversión</h4>
                </div>
                <p className="consultar-precio">Consultar presupuesto personalizado</p>
              </div>

              <div className="card-actions mt-auto">
                <Link href="https://wa.me/5491131671954?text=Hola,%20me%20interesa%20solicitar%20un%20presupuesto%20para%20el%20Codigo%20Vibratorio%20exclusivo" className="btn btn-primary width-100">
                  Solicitar Presupuesto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section className="section-science">
        <div className="container">
          <div className="section-intro no-padding-top">
            <h2 className="section-title">Ciencia y Bienestar</h2>
            <p>Artículos para entender la biología de la sintonía personal.</p>
          </div>

          <div className="blog-grid-home">
            {blogPosts.map((post) => (
              <article key={post.slug} className="blog-card-home">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="read-more">
                  Leer artículo completo →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      <style jsx>{`
        /* Science Section Styles */
        .section-science {
            background-color: rgba(232, 211, 211, 0.15); /* Alternated background */
            padding: 8rem 0; /* Consistent spacing */
        }
        
        .no-padding-top {
            padding-top: 0;
            padding-bottom: 3rem;
        }

        .blog-grid-home {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            max-width: 1000px;
            margin: 0 auto;
        }
        .blog-card-home {
            background: white;
            padding: 2.5rem;
            border-radius: var(--radius);
            box-shadow: 0 4px 20px rgba(0,0,0,0.05); /* Soft, subtle shadow */
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
          display: flex;
          justify-content: center;
        }

        .methodology-box {
            background-color: #faf9f9; /* Very subtle warm gray */
            border: 1px solid rgba(58, 107, 101, 0.1); /* Subtle primary color border */
            padding: 4rem 3rem;
            border-radius: var(--radius);
            max-width: 900px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.03); /* Soft elevation */
            position: relative;
        }
        
        /* Decorative corner accents implies institutional elegance */
        .methodology-box::before {
            content: "";
            position: absolute;
            top: 1rem;
            left: 1rem;
            width: 3rem;
            height: 3rem;
            border-top: 2px solid var(--color-secondary);
            border-left: 2px solid var(--color-secondary);
            opacity: 0.6;
        }

        .methodology-box::after {
            content: "";
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            width: 3rem;
            height: 3rem;
            border-bottom: 2px solid var(--color-secondary);
            border-right: 2px solid var(--color-secondary);
            opacity: 0.6;
        }

        .section-title {
          margin-bottom: 2.5rem;
          font-size: 2.5rem;
          color: var(--color-primary);
        }
        
        .methodology-content p {
            font-size: 1.15rem;
            line-height: 1.8;
            color: var(--color-foreground);
            margin-bottom: 1rem;
        }

        .decorative-divider {
            color: var(--color-secondary);
            font-size: 1.5rem;
            margin: 1.5rem 0;
            opacity: 0.8;
        }

        .section-pillars {
          padding-bottom: 8rem;
          padding-top: 4rem;
        }

        .section-title {
          text-align: center;
          margin-bottom: 4rem;
          font-size: 2.8rem;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
          align-items: stretch; /* Stretch to same height */
        }

        .pillar-card {
          background: white;
          padding: 2.5rem; /* Increased padding */
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
          transition: transform 0.3s, box-shadow 0.3s;
          border: 1px solid rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
        }

        .pillar-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .card-header {
            text-align: center;
            margin-bottom: 2rem;
            min-height: 80px; /* Align titles */
        }

        .pillar-card h3 {
          margin-bottom: 0.75rem; /* Increased from 0.5rem */
          color: var(--color-primary);
          font-size: 1.6rem;
        }
        
        .card-subtitle {
            color: var(--foreground);
            font-size: 0.95rem;
            opacity: 0.8;
            margin-bottom: 2.5rem; /* Increased significantly for spacing */
        }
        
        /* Pricing Body Styles */
        .pricing-body {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        
        .price-item {
            margin-bottom: 1.5rem;
        }
        
        .price-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 0.5rem;
        }
        
        .price-header h4 {
            font-size: 1rem;
            color: var(--foreground);
            font-weight: 600;
        }
        
        .price-value {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--color-primary);
        }
        
        .include-list {
            list-style: none;
            padding: 0;
            margin: 1rem 0;
            font-size: 0.9rem;
            color: var(--foreground);
        }
        
        .include-list li {
            margin-bottom: 0.4rem;
        }
        
        .divider {
            height: 1px;
            background-color: rgba(0,0,0,0.05);
            margin: 1.5rem 0;
        }
        
        .highlight-plan {
            background-color: #FDFDFB; /* Subtle highlight */
            margin: -1rem -1rem 1.5rem -1rem;
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid rgba(0,0,0,0.02);
        }
        
        .badge-save {
            background-color: var(--color-secondary);
            color: var(--foreground);
            font-size: 0.8rem;
            padding: 0.2rem 0.6rem;
            border-radius: 999px;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 0.5rem;
        }
        
        .include-list.premium li {
            color: var(--color-primary); /* Highlight benefits */
        }
        
        /* Premium Card */
        .pillar-card.premium {
          background: linear-gradient(135deg, white 0%, #fcfbfb 100%);
          border: 1px solid var(--color-secondary);
        }
        
        .centered-body {
            text-align: center;
            justify-content: center;
        }
        
        .price-header.centered {
            justify-content: center;
        }
        
        .consultar-precio {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--color-primary);
            margin: 1rem 0 2rem 0;
        }
        
        .premium-desc {
            margin-bottom: 2rem;
            color: var(--foreground);
            line-height: 1.6;
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
