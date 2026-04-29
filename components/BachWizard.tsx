'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductInfo {
  name: string;
  price: string;
  flow: string;
  benefit: string;
}

const PROFILES = [
  { id: 'adulto', label: 'Adultos', icon: 'I.', desc: 'Fórmula con base alcohólica tradicional para máxima estabilidad.' },
  { id: 'kids', label: 'Niños & Mamás', icon: 'II.', desc: 'Fórmula 0% alcohol conservada en glicerina vegetal pura.' },
  { id: 'mascotas', label: 'Mascotas', icon: 'III.', desc: 'Fórmula insípida ideal para mezclar sutilmente en su agua.' },
];

const EMOTIONS = [
  { id: 'rescate', label: 'Crisis & Shock', icon: '01.', title: 'Situación de estrés agudo, susto o bloqueo.' },
  { id: 'ansiedad', label: 'Estrés Permanente', icon: '02.', title: 'Pensamientos acelerados y tensión corporal continua.' },
  { id: 'sueño', label: 'Insomnio', icon: '03.', title: 'Dificultad para conciliar o mantener el sueño.' },
  { id: 'foco', label: 'Falta de Enfoque', icon: '04.', title: 'Mind-wandering, distracción y procrastinación.' },
  { id: 'animo', label: 'Tristeza & Apatía', icon: '05.', title: 'Falta de energía y motivación vital.' },
];

const PRODUCTS: Record<string, ProductInfo> = {
  rescate: { name: 'SOS Rescate', price: '$18.900', flow: 'Rescue Remedy', benefit: 'Alivio inmediato ante crisis o shock.' },
  ansiedad: { name: 'Calma Total', price: '$18.900', flow: 'Impatiens + White Chestnut', benefit: 'Serenidad mental y control del estrés.' },
  sueño: { name: 'Descanso Profundo', price: '$18.900', flow: 'White Chestnut + Red Chestnut', benefit: 'Inducción al sueño y mente en calma.' },
  foco: { name: 'Enfoque & Claridad', price: '$18.900', flow: 'Clematis + Larch', benefit: 'Máxima concentración y foco operativo.' },
  animo: { name: 'Ánimo & Vitalidad', price: '$18.900', flow: 'Mustard + Gentian', benefit: 'Recuperá tu energía y optimismo.' },
};

export default function BachWizard() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState('');
  const [emotion, setEmotion] = useState('');

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const reset = () => { setStep(1); setProfile(''); setEmotion(''); };

  const getProduct = () => PRODUCTS[emotion];

  return (
    <div className="wizard-container">
      <div className="wizard-card animate-fade-in">
        <div className="wizard-header">
          <div className="step-indicator">Paso {step} de 3</div>
          <h2>{step === 1 ? '¿Para quién es el preparado?' : step === 2 ? '¿Qué estado quieres trabajar?' : 'Tu solución recomendada'}</h2>
        </div>

        <div className="wizard-body">
          {step === 1 && (
            <div className="grid-options">
              {PROFILES.map((p) => (
                <button 
                  key={p.id} 
                  className={`option-card ${profile === p.id ? 'active' : ''}`}
                  onClick={() => { setProfile(p.id); nextStep(); }}
                >
                  <span className="option-icon">{p.icon}</span>
                  <div className="option-info">
                    <strong>{p.label}</strong>
                    <p>{p.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid-options">
              {EMOTIONS.map((e) => (
                <button 
                  key={e.id} 
                  className={`option-card ${emotion === e.id ? 'active' : ''}`}
                  onClick={() => { setEmotion(e.id); nextStep(); }}
                >
                  <span className="option-icon">{e.icon}</span>
                  <div className="option-info">
                    <strong>{e.label}</strong>
                    <p>{e.title}</p>
                  </div>
                </button>
              ))}
              <div className="wizard-footer">
                <button className="btn-text" onClick={prevStep}>← Volver</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="result-area">
              <div className="result-summary">
                <p>
                  Basado en tu perfil para <strong>{PROFILES.find(p => p.id === profile)?.label}</strong> y 
                  el estado de <strong>{EMOTIONS.find(e => e.id === emotion)?.label}</strong>, 
                  nuestra especialista recomienda:
                </p>
              </div>
              
              <div className="product-display mt-4">
                <div className="product-visual">
                  <Image 
                    src="/frasco-ambar.png" 
                    alt="Tu preparado recomendado" 
                    width={180} 
                    height={250} 
                    style={{ objectFit: 'contain' }} 
                  />
                </div>
                <div className="product-details">
                  <span className="badge-profile">{PROFILES.find(p => p.id === profile)?.label}</span>
                  <h3>{getProduct()?.name}</h3>
                  <p className="product-price">{getProduct()?.price}</p>
                  <p className="product-benefit">{getProduct()?.benefit}</p>
                  <small>Fórmula: {getProduct()?.flow}</small>
                  
                  <div className="product-actions">
                    <a 
                      href={`https://wa.me/5491131671954?text=Hola! Vengo de la web. Quiero comprar el preparado ${getProduct()?.name} para ${PROFILES.find(p => p.id === profile)?.label}.`} 
                      className="btn btn-primary width-100"
                      target="_blank"
                    >
                      Comprar por WhatsApp 🌿
                    </a>
                    <button className="btn btn-outline width-100" onClick={reset}>
                      Necesito una Consultoría Personalizada
                    </button>
                  </div>
                </div>
              </div>
              <div className="wizard-footer">
                <button className="btn-text" onClick={reset}>Reiniciar búsqueda</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .wizard-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        .wizard-card {
          background: white;
          border-radius: var(--radius);
          padding: 5rem 2rem;
          min-height: 600px;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-md);
        }
        .wizard-header {
          text-align: center;
          margin-bottom: 5rem;
        }
        .step-indicator {
          font-family: var(--font-main);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--color-accent);
          font-weight: 600;
          margin-bottom: 1.5rem;
        }
        .wizard-header h2 {
          font-size: 2.8rem;
          color: var(--color-primary);
          letter-spacing: -0.01em;
        }
        .grid-options {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.2rem;
          max-width: 650px;
          margin: 0 auto;
          width: 100%;
        }
        .option-card {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 1.8rem 2.5rem;
          border: 1px solid var(--color-secondary-dark);
          border-radius: var(--radius);
          background: var(--background);
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.2, 1, 0.3, 1);
          text-align: left;
          position: relative;
        }
        .option-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 10%;
          width: 80%;
          height: 1px;
          background: rgba(0,0,0,0.05);
        }
        .option-card:hover {
          border-color: var(--color-accent);
          background-color: var(--color-secondary);
          transform: translateY(-3px);
          box-shadow: var(--shadow-sm);
        }
        .option-card.active {
          border-color: var(--color-primary);
          background-color: var(--color-secondary-dark);
        }
        .option-icon {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--color-earth-light);
          width: 40px;
          text-align: right;
        }
        .option-card:hover .option-icon {
          color: var(--foreground);
        }
        .option-info strong {
          display: block;
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--foreground);
          margin-bottom: 0.2rem;
        }
        .option-info p {
          font-family: var(--font-main);
          font-size: 0.85rem;
          color: var(--color-earth);
          margin: 0;
          font-weight: 300;
        }
        .wizard-footer {
          margin-top: 2rem;
          text-align: center;
        }
        .btn-text {
          background: none;
          border: none;
          color: var(--color-earth);
          cursor: pointer;
          font-weight: 500;
          text-decoration: underline;
        }
        
        .result-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeIn 0.5s ease;
        }
        .result-summary {
          text-align: center;
          margin-bottom: 3rem;
          padding: 2rem;
          background-color: var(--color-secondary);
          border-radius: var(--radius);
          width: 100%;
        }
        .result-summary p {
          font-family: var(--font-main);
          font-size: 1.2rem;
          color: var(--foreground);
          margin: 0;
          line-height: 1.6;
        }
        .result-summary strong {
          color: var(--color-accent-dark);
          border-bottom: 1px solid var(--color-accent-light);
        }
        .mt-4 { margin-top: 2rem; }

        .product-display {
          display: flex;
          gap: 3rem;
          align-items: center;
          width: 100%;
        }
        .product-visual {
          width: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .product-details {
          flex: 1;
        }
        .badge-profile {
          display: inline-block;
          background: var(--color-primary-light);
          color: white;
          padding: 0.2rem 0.8rem;
          border-radius: 99px;
          font-size: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .product-price {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--color-primary);
          margin: 0.5rem 0;
        }
        .product-benefit {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: var(--foreground);
        }
        .product-actions {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        @media (max-width: 600px) {
          .product-display {
            flex-direction: column;
            text-align: center;
            gap: 2rem;
          }
          .wizard-card {
            padding: 1.5rem;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
