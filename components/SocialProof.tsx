'use client';

export default function SocialProof() {
  const testimonials = [
    {
      text: "Llevaba meses sin dormir corrido. Desde que probé el preparado Descanso Profundo, mis noches cambiaron radicalmente. El proceso de consultoría fue súper sanador.",
      author: "María L.",
      role: "Madre y Profesional"
    },
    {
      text: "Mi perro, que tenía Pánico Post-Trauma, ahora puede salir a la calle sin hiperventilar gracias al kit Sensitive de Mascotas. Totalmente recomendado.",
      author: "Carlos G.",
      role: "Padre de 'Simón'"
    },
    {
      text: "La atención 1:1 es un lujo. Prepararon una fórmula específica para mis niveles de estrés corporativo y los resultados en mi foco diario son innegables.",
      author: "Verónica S.",
      role: "Directora de Ventas"
    }
  ];

  return (
    <section className="social-proof-section section-padding bg-cream">
      <div className="container">
        <h2 className="section-title text-center mb-5">Historias Reales</h2>
        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="quote-icon">“</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <strong>{t.author}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .bg-cream {
          background-color: var(--color-secondary);
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
        }
        .testimonial-card {
          padding: 3rem 2rem;
          background: var(--background);
          border: 1px solid var(--color-secondary-dark);
          position: relative;
        }
        .quote-icon {
          font-family: var(--font-serif);
          font-size: 5rem;
          line-height: 0;
          color: var(--color-earth-light);
          position: absolute;
          top: 3.5rem;
          left: 1rem;
          opacity: 0.3;
        }
        .testimonial-text {
          font-family: var(--font-main);
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--foreground);
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }
        .testimonial-author strong {
          display: block;
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--foreground);
        }
        .testimonial-author span {
          display: block;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-earth);
          margin-top: 0.2rem;
        }
      `}</style>
    </section>
  );
}
