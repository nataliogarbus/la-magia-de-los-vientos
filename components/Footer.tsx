'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <Image
              src="/logo-circular-v2.png"
              alt="La Magia de los Vientos"
              width={60}
              height={60}
            />
          </div>
          <h3>La Magia de los Vientos</h3>
          <p>Armonía vibracional y bienestar integral.</p>
          <a href="https://whatsapp.com/channel/community-link" className="community-link">Unite a nuestra Comunidad 🌿</a>
        </div>

        <div className="footer-payments">
          <h4>Medios de Pago</h4>
          <div className="payment-logos">
            <span className="payment-badge">Mercado Pago</span>
            <span className="payment-badge">Transferencia</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} La Magia de los Vientos. Todos los derechos reservados.</p>
      </div>

      <style jsx>{`
        .site-footer {
          background-color: var(--color-primary);
          color: white;
          padding-top: 4rem;
          margin-top: 4rem;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          padding-bottom: 3rem;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .footer-brand h3 {
          color: white; /* Override global h3 color */
          margin-bottom: 0.5rem;
        }
        
        .footer-logo {
          margin-bottom: 1rem;
        }

        .footer-payments h4 {
          color: white;
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .payment-logos {
          display: flex;
          gap: 1rem;
        }

        .payment-badge {
          background: rgba(255,255,255,0.2);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }

        .footer-bottom {
          background-color: rgba(0,0,0,0.1);
          padding: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        @media (max-width: 600px) {
          .footer-content {
            flex-direction: column;
            text-align: center;
          }
          
          .payment-logos {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}
