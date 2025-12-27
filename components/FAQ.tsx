'use client';

import { useState } from 'react';

const faqData = [
  {
    question: "¿Por qué la formación académica musical es el diferencial de este método?",
    answer: "La formación académica de grado permite entender la música como una estructura física precisa. Esto nos habilita a utilizar frecuencias exactas (como las del Handpan) que interactúan con el sistema nervioso para generar estados reales de calma, garantizando un abordaje profesional y seguro."
  },
  {
    question: "¿Cómo funcionan las Flores de Bach con el sonido?",
    answer: "El sonido prepara el 'terreno' biológico bajando el cortisol, lo que permite que la sutileza de las flores actúe sin bloqueos químicos. Es una sinergia metodológica."
  },
  {
    question: "¿Aceptan Mercado Pago?",
    answer: "Sí, aceptamos todas las tarjetas a través de Mercado Pago y también transferencia bancaria directa."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section container">
      <h2 className="section-title">Preguntas Frecuentes</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggle(index)}>
              {item.question}
              <span className="icon">{activeIndex === index ? '-' : '+'}</span>
            </button>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .faq-section {
          padding: 4rem 1.5rem;
          max-width: 800px;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 3rem;
          color: var(--color-primary);
        }

        .faq-item {
          border-bottom: 1px solid rgba(0,0,0,0.1);
          margin-bottom: 1rem;
        }

        .faq-question {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 1.5rem 0;
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--foreground);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .faq-question:hover {
          color: var(--color-primary);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }

        .faq-item.active .faq-answer {
          max-height: 200px; /* Adjust as needed */
        }

        .faq-answer p {
          padding-bottom: 1.5rem;
          color: var(--color-earth);
          line-height: 1.6;
        }

        .icon {
          font-size: 1.5rem;
          color: var(--color-primary);
        }
      `}</style>
    </section>
  );
}
