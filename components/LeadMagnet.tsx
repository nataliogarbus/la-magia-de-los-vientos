'use client';

import { useState } from 'react';

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Enviar a n8n Webhook (Configurar N8N_WEBHOOK_URL en .env)
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://n8n.kapi.com.ar/webhook/la-magia-leads';
      
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          source: 'lead_magnet_v2',
          target: 'guia_sintonia_casa'
        }),
      });

      setSubmitted(true);
      // Descarga automática del recurso
      const link = document.createElement('a');
      link.href = '/Sintonia_en_Casa_Guia.pdf'; // Ruta al PDF en public
      link.download = 'Sintonia_en_Casa_Guia.pdf';
      link.click();
    } catch (error) {
      console.error('Error enviando lead:', error);
      // Fallback: mostrar mensaje de éxito igual para no romper UX
      setSubmitted(true);
    }
  };

  return (
    <section className="lead-magnet container">
      <div className="lead-content">
        {!submitted ? (
          <>
            <div className="text-block">
              <h2>🎁 Regalo Exclusivo</h2>
              <h3>Guía: &quot;Sintonía en Casa&quot;</h3>
              <p>
                Descubrí cómo usar frecuencias y flores para armonizar tu día a día.
                Dejá tu mail y recibí el Ebook gratuito al instante.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="magnet-form">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
              />
              <button type="submit" className="btn btn-primary">
                Descargar Guía
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <h3>¡Gracias por suscribirte!</h3>
            <p>La descarga ha comenzado autómaticamente.</p>
            <div className="community-cta">
              <p>¿Querés recibir consejos semanales y píldoras sonoras?</p>
              <a
                href="https://whatsapp.com/channel/community-link"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Unite al Canal de WhatsApp 🌿
              </a>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .lead-magnet {
          margin: 4rem auto;
          background: linear-gradient(135deg, #FDFDFB 0%, var(--color-secondary) 100%);
          border: 1px solid var(--color-secondary-dark);
          border-radius: var(--radius);
          padding: 3rem;
          box-shadow: var(--shadow-md);
        }

        .lead-content {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        h2 {
          color: var(--color-primary);
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }

        h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        p {
          margin-bottom: 2rem;
          color: var(--foreground);
        }

        .magnet-form {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .email-input {
          padding: 0.75rem 1rem;
          border: 1px solid #ccc;
          border-radius: 9999px;
          width: 300px;
          font-family: inherit;
        }

        .success-message {
          animation: fadeIn 0.5s ease;
        }

        .community-cta {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(0,0,0,0.1);
        }

        @media (max-width: 600px) {
          .magnet-form {
            flex-direction: column;
          }
          .email-input {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
