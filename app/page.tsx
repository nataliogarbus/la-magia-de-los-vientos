'use client';

import Image from 'next/image';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import LeadMagnet from '@/components/LeadMagnet';
import BachWizard from '@/components/BachWizard';
import ProductCarousel from '@/components/ProductCarousel';
import FeaturedCategories from '@/components/FeaturedCategories';
import { blogPosts } from '@/lib/blog-data';

export default function Home() {
  return (
    <>
      {/* Hero Section - Inmersive & Botanical Authority */}
      <section className="hero">
        <div className="hero-bg">
          <Image
            src="/hero-conceptual.png"
            alt="Alquimia Botánica la Magia de los Vientos"
            fill
            priority
            style={{ objectFit: 'cover' }}
            quality={100}
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-narrative text-center">
            <h1 className="hero-title">Alquimia para el <br/><span>Alma Moderna</span></h1>
            <p className="hero-subtitle">Equilibrio emocional a través de la naturaleza pura.</p>
            <div className="hero-description">
              Bienestar sutil para reconectar con tu esencia natural.
            </div>
            <div className="hero-actions">
              <Link href="#bach-wizard" className="btn btn-primary">
                Comenzar Mi Transformación
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Carousel - Quick Catalog Access */}
      <ProductCarousel />

      {/* Narrative Section - The Concept */}
      <section className="section-ritual bg-dark-green">
        <div className="container">
          <div className="ritual-grid">
            <div className="ritual-text">
              <span className="ritual-caption">Nuestra Filosofía</span>
              <h2 className="section-title text-white">El Ritual de <br/>la Escucha</h2>
              <p className="ritual-p">
                En **La Magia de los Vientos**, cada frasco es un compromiso. 
                No creemos en fórmulas genéricas, sino en el poder de la 
                esencia correcta para el momento exacto.
              </p>
              <div className="ritual-steps">
                <div className="step">
                  <span className="step-num">01</span>
                  <div className="step-content">
                    <h4>Diagnóstico Bio-Emocional</h4>
                    <p>Identificamos la raíz de la tensión, no solo el síntoma superficial.</p>
                  </div>
                </div>
                <div className="step">
                  <span className="step-num">02</span>
                  <div className="step-content">
                    <h4>Selección de Esencias</h4>
                    <p>Curaduría artesanal entre las 38 flores de Bach originales.</p>
                  </div>
                </div>
                <div className="step">
                  <span className="step-num">03</span>
                  <div className="step-content">
                    <h4>Preparado Magistral</h4>
                    <p>Dinaminación manual para activar la memoria vibracional de la planta.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="ritual-visual">
              <div className="ritual-image-container">
                <Image 
                  src="/ritual-background.png" 
                  alt="Ritual Botánico" 
                  width={600} 
                  height={800} 
                  style={{ objectFit: 'cover', borderRadius: 'var(--radius)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Wizard - Conversion Core */}
      <section id="bach-wizard" className="section-wizard bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Asistente de Bienestar</h2>
            <p className="section-subtitle">Respondé 2 preguntas y encontrá el preparado ideal para vos, tu hijo o tu mascota.</p>
          </div>
          <BachWizard />
        </div>
      </section>

      {/* Value Proposition - Authority */}
      <section className="section-benefits container">
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon">I.</div>
            <h3>Pureza Garantizada</h3>
            <p>Usamos esencias originales y conservantes naturales según el perfil biológico de la persona.</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">II.</div>
            <h3>Rigor Académico</h3>
            <p>Formación certificada para asegurar que cada mezcla tenga el cimiento terapéutico correcto.</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">III.</div>
            <h3>Envío Cuidado</h3>
            <p>Llevamos el bienestar a todo el país con empaques seguros que protegen el frasco y su esencia.</p>
          </div>
        </div>
      </section>

      {/* Personalized Consultancy - Premium Upsell */}
      <section className="section-consultancy">
        <div className="container">
          <div className="consultancy-card">
            <div className="consultancy-content">
              <h2>¿Buscás algo más profundo?</h2>
              <p>
                La **Consultoría Personalizada** es una sesión 1:1 donde analizamos tu biografía emocional 
                para crear una fórmula de 38 flores única para vos.
              </p>
              <ul className="consultancy-list">
                <li>✓ Sesión de 60 minutos</li>
                <li>✓ Preparado a medida incluido</li>
                <li>✓ Seguimiento terapéutico</li>
              </ul>
              <Link href="/reservas" className="btn btn-primary mt-4">
                Agendar Consultoría Real
              </Link>
            </div>
            <div className="consultancy-image">
              <div className="img-placeholder-large">Sesión 1:1</div>
            </div>
          </div>
        </div>
      </section>

      <LeadMagnet />

      {/* Featured Banners - MeLi Style */}
      <FeaturedCategories />

      {/* Knowledge Base */}
      <section className="science-section section-padding">
        <div className="container">
          <h2 className="section-title text-center">Biblioteca de Bienestar</h2>
          <div className="blog-grid-home">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.slug} className="blog-card-home">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="read-more">
                  Seguir leyendo →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Specialist Authority Section - Elite Profile */}
      <section className="section-specialist">
        <div className="container">
          <div className="specialist-grid">
            <div className="specialist-image-box animate-float">
              <div className="img-placeholder-portrait">
                <span className="placeholder-text">Autoridad Terapéutica</span>
              </div>
              <div className="experience-badge">10+ Años</div>
            </div>
            <div className="specialist-info">
              <span className="badge-specialist">Terapeuta Certificada</span>
              <h2 className="section-title text-left">El Cuidado en Buenas Manos</h2>
              <p className="specialist-bio">
                Combinamos el rigor académico con la dedicación artesanal. Cada fórmula 
                se prepara íntegramente con nuestro kit de 38 esencias puras, 
                asegurando una trazabilidad emocional absoluta.
              </p>
              <p className="specialist-bio secondary">
                No creemos en la estandarización. Creemos en la escucha profunda 
                para identificar el "dolor" emocional y transformarlo en equilibrio.
              </p>
              <div className="specialist-values">
                <div className="value"><span>—</span> Kit Esencias Originales</div>
                <div className="value"><span>—</span> Consultas Bio-Emocionales</div>
                <div className="value"><span>—</span> Envío Protegido a Todo el País</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LeadMagnet />

      <FAQ />

      <style jsx>{`
        .hero {
          min-height: 40vh; /* Aún más finito */
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          color: white;
          padding: 2rem 2rem 6rem;
          overflow: hidden;
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
          background: linear-gradient(180deg, rgba(27,39,28,0.4) 0%, rgba(27,39,28,0.7) 50%, rgba(27,39,28,0.9) 100%);
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1200px;
          text-align: center;
        }
        .hero-narrative {
          position: relative;
          z-index: 2;
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-family: var(--font-serif);
          margin-bottom: 1rem;
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 20px rgba(0,0,0,0.6);
          color: #F8F5F2; 
        }
        .hero-title span {
          color: var(--color-accent);
          display: block;
          text-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }
        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.4rem);
          font-family: var(--font-outfit);
          font-weight: 300;
          margin-bottom: 2rem;
          color: rgba(255,255,255,0.95);
          letter-spacing: 0.05em;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        .hero-description {
          font-size: 1.15rem;
          margin-bottom: 3.5rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.85);
          max-width: 650px;
          margin-left: auto;
          margin-right: auto;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
          font-weight: 400;
        }
        .hero-actions {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin-top: 2rem;
        }
        .hero-actions .btn-secondary {
            color: white;
            border-color: rgba(255,255,255,0.5);
            background: rgba(255,255,255,0.05);
        }
        .hero-actions .btn-secondary:hover {
            background: white;
            color: var(--color-primary);
        }

        /* Ritual Section Concept */
        .section-ritual {
          padding: 12rem 0;
          background-color: var(--color-primary);
          position: relative;
        }
        .ritual-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }
        .ritual-caption {
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 0.3em;
          font-size: 0.8rem;
          font-weight: 700;
          display: block;
          margin-bottom: 2rem;
        }
        .ritual-p {
          color: rgba(255,255,255,0.8);
          font-size: 1.25rem;
          line-height: 1.8;
          margin-bottom: 4rem;
          font-weight: 300;
        }
        .ritual-steps {
          display: grid;
          gap: 3rem;
        }
        .step {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }
        .step-num {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--color-accent);
          opacity: 0.5;
          padding-top: 0.2rem;
        }
        .step-content h4 {
          color: white;
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          font-family: var(--font-serif);
        }
        .step-content p {
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
        }
        .ritual-image-container {
          position: relative;
          padding-left: 2rem;
        }
        .ritual-image-container::before {
          content: '';
          position: absolute;
          top: -2rem;
          left: 0;
          width: 80%;
          height: 100%;
          border: 1px solid var(--color-accent);
          opacity: 0.3;
          z-index: 0;
          border-radius: var(--radius);
        }
        .ritual-image-container img {
          position: relative;
          z-index: 1;
          box-shadow: var(--shadow-xl);
        }

        .section-wizard {
          padding: 10rem 0;
          background-color: var(--color-secondary);
        }

        .section-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          color: var(--color-primary);
          margin-bottom: 1rem;
          font-family: var(--font-serif);
        }
        .section-subtitle {
          color: var(--color-earth);
          font-size: 1.2rem;
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          padding: 10rem 0;
        }
        .benefit-item {
          padding: 3rem;
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
          transition: all 0.4s ease;
          border-top: 2px solid transparent;
        }
        .benefit-item:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-top-color: var(--color-accent);
        }
        .benefit-icon {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          color: var(--color-accent);
          margin-bottom: 2rem;
          opacity: 0.6;
        }
        .benefit-item h3 {
          margin-bottom: 1.2rem;
          color: var(--color-primary);
          font-size: 1.3rem;
          letter-spacing: 0.05em;
        }
        .benefit-item p {
          color: var(--color-earth);
          font-weight: 300;
          font-size: 1rem;
          line-height: 1.8;
        }

        .section-consultancy {
          padding: 8rem 0;
        }
        .consultancy-card {
          background: var(--color-primary);
          color: white;
          border-radius: var(--radius);
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        .consultancy-content {
          padding: 5rem;
        }
        .consultancy-content h2 {
          color: var(--color-accent);
          font-size: 3rem;
          margin-bottom: 2rem;
          font-family: var(--font-serif);
        }
        .consultancy-content p {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 3rem;
            line-height: 1.8;
        }
        .consultancy-list {
          list-style: none;
          margin: 3rem 0;
        }
        .consultancy-list li {
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.1rem;
        }
        .consultancy-list li::before {
            content: '✓';
            color: var(--color-accent);
            font-weight: bold;
        }
        .img-placeholder-large {
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #1B271C, #2D3F2E);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-family: var(--font-serif);
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 0.25em;
        }

        .blog-grid-home {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 3rem;
          margin: 5rem 0;
        }
        .blog-card-home {
          padding: 3rem;
          background: var(--color-secondary);
          border-radius: var(--radius);
          transition: all 0.3s ease;
        }
        .blog-card-home:hover {
            background: white;
            box-shadow: var(--shadow-md);
        }

        /* Specialist Section Styles */
        .section-specialist {
          padding: 12rem 0;
          background-color: var(--background);
        }
        .specialist-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 8rem;
          align-items: center;
        }
        .specialist-image-box {
            position: relative;
        }
        .img-placeholder-portrait {
          width: 100%;
          height: 650px;
          background: var(--color-secondary-dark);
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          color: var(--color-primary);
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          border: 1px solid var(--color-earth-light);
        }
        .experience-badge {
            position: absolute;
            bottom: -30px;
            right: -30px;
            background: var(--color-accent);
            color: var(--color-primary);
            width: 120px;
            height: 120px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-family: var(--font-serif);
            box-shadow: var(--shadow-md);
            border: 4px solid white;
        }
        .badge-specialist {
          text-transform: uppercase;
          letter-spacing: 0.3em;
          font-size: 0.8rem;
          color: var(--color-accent);
          font-weight: 700;
          display: block;
          margin-bottom: 2rem;
        }
        .specialist-bio {
          font-size: 1.4rem;
          line-height: 1.8;
          color: var(--color-primary);
          margin-bottom: 2.5rem;
          font-weight: 300;
        }
        .specialist-bio.secondary {
            font-size: 1.1rem;
            color: var(--color-earth);
        }
        .specialist-values {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-top: 4rem;
        }
        .value {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          font-size: 1.1rem;
          font-weight: 400;
          color: var(--color-primary);
        }
        .value span { color: var(--color-accent); font-weight: bold; }
        
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }

        @media (max-width: 992px) {
          .specialist-grid { grid-template-columns: 1fr; gap: 6rem; }
          .img-placeholder-portrait { height: 500px; }
          .consultancy-card { grid-template-columns: 1fr; }
          .experience-badge { bottom: -20px; right: 20px; width: 100px; height: 100px; }
        }

        @media (max-width: 768px) {
            .hero-title { font-size: 3rem; }
            .consultancy-content { padding: 3rem 2rem; }
        }
      `}</style>
    </>
  );
}
