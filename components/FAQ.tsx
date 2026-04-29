'use client';

import { useState } from 'react';

const faqData = [
  {
    question: "¿Qué son las Flores de Bach y cómo pueden ayudarme?",
    answer: "Las Flores de Bach son un sistema de 38 esencias naturales que ayudan a equilibrar estados emocionales. No actúan por componente químico, sino por resonancia biológica, ayudando a transformar miedos en coraje, estrés en calma y tristeza en optimismo."
  },
  {
    question: "¿Es seguro para niños, embarazadas y mascotas?",
    answer: "Absolutamente. Al ser una terapia 100% natural y sin contraindicaciones químicas, es ideal para todas las etapas de la vida. Para estos perfiles, utilizamos una base de glicerina vegetal sin alcohol, asegurando una toma segura y agradable."
  },
  {
    question: "¿Cuánto tiempo tarda en notarse el efecto?",
    answer: "Depende de la cronicidad del estado emocional. En casos agudos (como un susto o crisis), el efecto puede ser inmediato. Para procesos profundos, se suele notar una mejoría gradual en la primera semana de toma constante."
  },
  {
    question: "¿Por qué elegir nuestros preparados personalizados?",
    answer: "A diferencia de los productos genéricos de farmacia, aquí utilizamos el kit de 38 esencias originales y formulamos cada frasco tras una escucha activa de tu necesidad actual, garantizando la combinación exacta para tu biografía emocional."
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
