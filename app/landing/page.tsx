'use client';

import Image from 'next/image';
import Link from 'next/link';
import BachWizard from '@/components/BachWizard';
import SocialProof from '@/components/SocialProof';
import FAQ from '@/components/FAQ';

export default function LandingPage() {
  return (
    <div className="landing-layout">
      {/* Escondemos el navbar global para que sea una página de aterrizaje 100% aislada */}
      <style dangerouslySetInnerHTML={{ __html: '.navbar { display: none !important; } footer { display: none !important; }' }} />
      
      {/* Minimal Header */}
      <header className="landing-header">
        <Image src="/logo-circular-v2.png" alt="La Magia de los Vientos" width={50} height={50} style={{ borderRadius: '50%' }}/>
        <span className="landing-brand">La Magia de los Vientos</span>
      </header>

      {/* Hero Enfocado en el Dolor */}
      <section className="landing-hero bg-cream">
        <div className="container landing-hero-container">
          <div className="landing-hero-text">
            <span className="badge-landing">Terapia Floral 1:1</span>
            <h1>¿No lográs que tu mente pare?</h1>
            <p>
              El estrés crónico, la falta de sueño y la ansiedad no desaparecen con fórmulas mágicas genéricas. 
              Necesitas una intervención botánica a tu medida.
            </p>
            <div className="pain-points">
              <div className="pain-item">✓ Apto para adultos, niños y mascotas.</div>
              <div className="pain-item">✓ Sistema original de 38 esencias.</div>
              <div className="pain-item">✓ Atención cálida y seguimiento.</div>
            </div>
          </div>
          <div className="landing-hero-action">
            <a href="#diagnostico" className="btn btn-primary btn-landing">
              Comenzar Mi Autodiagnóstico
            </a>
            <small>Toma 30 segundos. Sin compromiso de compra.</small>
          </div>
        </div>
      </section>

      {/* Mecanismo Unico: El Wizard */}
      <section id="diagnostico" className="landing-wizard-section">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title">Elige tu caso</h2>
            <p>Selecciona tu perfil para que el sistema encuentre tu fórmula botánica ideal.</p>
          </div>
          <BachWizard />
        </div>
      </section>

      {/* Autoridad en formato Landing */}
      <section className="landing-authority">
        <div className="container authority-split">
          <div className="authority-img-box">
             <div className="img-placeholder-portrait">Especialista</div>
          </div>
          <div className="authority-copy">
            <h2>Detrás de cada frasco, hay escucha clínica.</h2>
            <p>
              Hola, soy la creadora de La Magia de los Vientos. Como terapeuta certificada en el sistema original de Flores de Bach, mi objetivo no es venderte un gotero, sino ayudarte a entender la raíz emocional de tu malestar.
            </p>
            <p>
              Por eso, cada fórmula que recetamos y preparamos a mano con nuestro kit original de 38 esencias, lleva un pedazo de mi dedicación clínica. Confiar tu bienestar (o el de tus hijos/mascotas) a alguien más es difícil, por eso la primera consulta por WhatsApp es siempre directa conmigo.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProof />

      <FAQ />

      <style jsx>{`
        .landing-layout {
          background-color: var(--background);
        }
        .landing-header {
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          border-bottom: 1px solid var(--color-secondary-dark);
        }
        .landing-brand {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--color-primary);
        }
        .bg-cream {
          background-color: var(--color-secondary);
        }
        .landing-hero {
          padding: 8rem 0;
          text-align: center;
        }
        .landing-hero-container {
          max-width: 800px;
          margin: 0 auto;
        }
        .badge-landing {
          display: inline-block;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          border: 1px solid var(--foreground);
          padding: 0.3rem 0.8rem;
          margin-bottom: 2rem;
        }
        .landing-hero h1 {
          font-size: 3.8rem;
          margin-bottom: 1.5rem;
        }
        .landing-hero p {
          font-size: 1.2rem;
          line-height: 1.8;
          color: var(--color-earth);
          margin-bottom: 2rem;
        }
        .pain-points {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 4rem;
          flex-wrap: wrap;
        }
        .pain-item {
          font-size: 0.95rem;
          font-weight: 500;
        }
        .landing-hero-action {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .btn-landing {
          padding: 1.2rem 3rem;
          font-size: 1.1rem;
        }
        .landing-hero-action small {
          color: var(--color-earth-light);
        }

        .landing-wizard-section {
          padding: 6rem 0;
        }

        .landing-authority {
          padding: 8rem 0;
          border-top: 1px solid var(--color-secondary-dark);
        }
        .authority-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .authority-img-box .img-placeholder-portrait {
          width: 100%;
          height: 500px;
          background: var(--color-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--color-earth-light);
        }
        .authority-copy h2 {
          font-size: 2.2rem;
          margin-bottom: 1.5rem;
        }
        .authority-copy p {
          font-size: 1.1rem;
          color: var(--color-earth);
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }

        @media (max-width: 768px) {
          .landing-hero h1 { font-size: 2.5rem; }
          .authority-split { grid-template-columns: 1fr; }
          .pain-points { flex-direction: column; gap: 1rem; }
        }
      `}</style>
    </div>
  );
}
