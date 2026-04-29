'use client';

import Link from 'next/link';

const SERVICIOS = [
  {
    id: 'humana',
    numero: '01',
    nombre: 'Consultoría Humana',
    subtitulo: 'Sesión de Armonización Personal',
    descripcion: 'Un espacio de escucha profunda donde identificamos los bloqueos emocionales y diseñamos un protocolo de trabajo personalizado. Combinamos el diagnóstico bio-emocional con la aplicación de frecuencias sonoras (Handpan) y terapia floral.',
    beneficios: [
      'Reducción mensurable del estrés y la ansiedad crónica',
      'Identificación de la raíz emocional del síntoma, no solo el síntoma',
      'Protocolo personalizado de 38 flores diseñado en sesión',
      'Seguimiento terapéutico a los 21 días incluido',
    ],
    formato: 'Presencial · Online',
    duracion: '60 minutos',
    precio: '$25.000',
    tag: 'Más solicitado',
    icono: '🌿',
  },
  {
    id: 'animal',
    numero: '02',
    nombre: 'Huellas en Calma',
    subtitulo: 'Bienestar Emocional para Mascotas',
    descripcion: 'Los animales son esponjas vibracionales de su entorno. Este protocolo identifica el origen emocional de conductas problemáticas (ansiedad, agresividad, miedo) y diseña una fórmula floral inodora e insípida adaptada a la especie.',
    beneficios: [
      'Diagnóstico conductual emocional sin medicación',
      'Fórmula personalizada base agua/glicerina (sin alcohol)',
      'Compatible con cualquier tratamiento veterinario',
      'Acompañamiento durante la adaptación',
    ],
    formato: 'Online con video de la mascota',
    duracion: '45 minutos',
    precio: '$20.000',
    tag: 'Para tu compañero',
    icono: '🐾',
  },
  {
    id: 'espacios',
    numero: '03',
    nombre: 'Armonización de Espacios',
    subtitulo: 'Limpieza Energética de Hogares y Oficinas',
    descripcion: 'Los espacios retienen la carga emocional de quienes los habitan. Mediante técnicas de limpieza sonora con cuencos y Handpan, Reiki y aspersión floral, restauramos el flujo vital del entorno para convertirlo en un motor de bienestar.',
    beneficios: [
      'Transformación del ambiente percibido en hogares y oficinas',
      'Ideal post-mudanza, post-conflicto o ante bloqueos creativos',
      'Incluye diagnóstico previo del espacio',
      'Recomendaciones de mantenimiento energético',
    ],
    formato: 'Presencial (zona GBA)',
    duracion: '90 minutos',
    precio: '$35.000',
    tag: 'Presencial',
    icono: '🏡',
  },
  {
    id: 'vibratorio',
    numero: '04',
    nombre: 'Código Vibratorio',
    subtitulo: 'Tu Pieza Musical Personalizada',
    descripcion: 'Nuestra propuesta más exclusiva. Tras una sesión de sintonía profunda donde identificamos tu tono fundamental y tus necesidades armónicas, componemos una pieza musical original grabada en alta fidelidad, diseñada exclusivamente para tu frecuencia.',
    beneficios: [
      'Composición original, no generada por IA',
      'Grabación en calidad de estudio (WAV/MP3)',
      'Tu medicina sonora portable: para meditar, dormir o volver a tu eje',
      'Activo digital de por vida',
    ],
    formato: 'Presencial + entrega digital',
    duracion: '2 sesiones',
    precio: '$60.000',
    tag: 'Servicio Premium',
    icono: '🎵',
  },
];

const FAQ_ITEMS = [
  {
    q: '¿Las sesiones son presenciales u online?',
    a: 'Depende del servicio. Las Consultorías Humanas y de Bienestar Animal pueden realizarse online. La Armonización de Espacios y el Código Vibratorio requieren presencialidad en zona GBA.'
  },
  {
    q: '¿Cuántas sesiones necesito?',
    a: 'Una sola sesión ya genera cambios perceptibles. Lo ideal es un proceso de 3 sesiones en 60 días para abordar capas más profundas. El seguimiento a los 21 días está incluido.'
  },
  {
    q: '¿Tiene efectos secundarios?',
    a: 'No. La terapia floral actúa de forma sutil y no tiene contraindicaciones. Es compatible con medicación convencional, embarazo y niños desde recién nacidos.'
  },
  {
    q: '¿Cómo me preparo para la sesión?',
    a: 'Solo llegar con disposición para hablar. No se requiere preparación especial. Recomendamos no tomar alcohol las 24hs previas y llegar hidratado.'
  },
];

export default function ConsultasClient() {
  // FAQ Schema for AEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  };

  return (
    <div className="consultas-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="consultas-hero">
        <div className="container">
          <span className="hero-caption">Servicios Terapéuticos</span>
          <h1>Consultas &<br />Armonización</h1>
          <p className="hero-lead">
            Cada proceso es único. Trabajamos desde la escucha profunda para
            identificar el desequilibrio real y diseñar una intervención precisa.
          </p>
        </div>
      </section>

      {/* Metodología */}
      <section className="method-strip">
        <div className="container">
          <div className="method-steps">
            {[
              { num: '01', titulo: 'Diagnóstico', desc: 'Identificamos la raíz emocional, no solo el síntoma superficial.' },
              { num: '02', titulo: 'Protocolo', desc: 'Diseñamos una intervención combinada: frecuencia sonora + terapia floral.' },
              { num: '03', titulo: 'Seguimiento', desc: 'Acompañamos el proceso para ajustar la fórmula y verificar el avance.' },
            ].map((step, i) => (
              <div key={i} className="step-wrapper">
                <div className="method-step">
                  <span className="step-num">{step.num}</span>
                  <div>
                    <h4>{step.titulo}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
                {i < 2 && <div className="method-divider" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="servicios-section">
        <div className="container">
          {SERVICIOS.map((s) => (
            <article key={s.id} className="servicio-card">
              <div className="servicio-header">
                <span className="servicio-num">{s.numero}</span>
                <div className="servicio-tags">
                  <span className="tag-formato">{s.formato}</span>
                  {s.tag && <span className="tag-highlight">{s.tag}</span>}
                </div>
              </div>
              <div className="servicio-body">
                <div className="servicio-info">
                  <p className="servicio-icono">{s.icono}</p>
                  <h2 className="servicio-nombre">{s.nombre}</h2>
                  <p className="servicio-subtitulo">{s.subtitulo}</p>
                  <p className="servicio-desc">{s.descripcion}</p>
                  <ul className="servicio-beneficios">
                    {s.beneficios.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
                <div className="servicio-cta-box">
                  <div className="cta-detail">
                    <div className="cta-row">
                      <span className="cta-label">Duración</span>
                      <span className="cta-value">{s.duracion}</span>
                    </div>
                    <div className="cta-row">
                      <span className="cta-label">Modalidad</span>
                      <span className="cta-value">{s.formato}</span>
                    </div>
                    <div className="cta-price">{s.precio}</div>
                    <p className="cta-price-note">por sesión</p>
                  </div>
                  <div className="cta-buttons">
                    <Link href="/reservas" className="btn btn-primary">Agendar Consulta</Link>
                    <a
                      href={`https://wa.me/5491131671954?text=Hola! Quiero consultar por: ${s.nombre}`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      Consultar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Formación */}
      <section className="formacion-section">
        <div className="container">
          <div className="formacion-card">
            <span className="formacion-caption">Nuestra Credencial</span>
            <h2>La Autoridad detrás del Método</h2>
            <p>
              La efectividad de cada sesión se sustenta en una sólida formación académica:
              egresada del <strong>Conservatorio de San Martín</strong> con triple especialización
              en Guitarra, Educación Musical Inicial y de Adultos.
            </p>
            <p>
              Complementada con certificaciones en <strong>Yoga, Reiki, Terapia Floral de Bach
              y Gemoterapia</strong>, nuestra metodología integra el rigor científico-musical
              con el conocimiento vibracional.
            </p>
            <div className="formacion-credenciales">
              <span>Conservatorio Provincial de Música</span>
              <span>Facilitadora Certificada de Flores de Bach</span>
              <span>Instructora de Yoga y Reiki</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-consultas">
        <div className="container">
          <h2 className="faq-title">Preguntas frecuentes</h2>
          <div className="faq-grid">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="faq-item-c">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .consultas-page { padding-bottom: 10rem; }
        .consultas-hero { padding: 10rem 0 7rem; background: var(--color-primary); color: white; }
        .hero-caption { display: block; text-transform: uppercase; letter-spacing: 0.4em; font-size: 0.75rem; font-weight: 700; color: var(--color-accent); margin-bottom: 2rem; }
        .consultas-hero h1 { font-size: clamp(3rem, 8vw, 5.5rem); color: var(--color-secondary); line-height: 1.0; margin-bottom: 2.5rem; letter-spacing: -0.02em; }
        .hero-lead { font-size: 1.2rem; color: rgba(255,255,255,0.65); font-weight: 300; line-height: 1.8; max-width: 580px; }
        .method-strip { padding: 5rem 0; border-bottom: 1px solid var(--color-earth-light); }
        .method-steps { display: flex; align-items: center; gap: 0; flex-wrap: wrap; }
        .step-wrapper { display: contents; }
        .method-step { display: flex; gap: 1.5rem; align-items: flex-start; flex: 1; min-width: 200px; padding: 0 2rem; }
        .step-num { font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-accent); opacity: 0.5; flex-shrink: 0; padding-top: 0.1rem; }
        .method-step h4 { font-size: 1rem; color: var(--foreground); margin-bottom: 0.4rem; }
        .method-step p { font-size: 0.9rem; color: var(--color-earth); line-height: 1.6; font-weight: 300; }
        .method-divider { width: 1px; height: 60px; background: var(--color-earth-light); flex-shrink: 0; }
        .servicios-section { padding: 8rem 0; }
        .servicio-card { border-bottom: 1px solid var(--color-earth-light); padding: 6rem 0; }
        .servicio-card:first-child { padding-top: 0; }
        .servicio-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4rem; }
        .servicio-num { font-family: var(--font-serif); font-size: 4rem; color: var(--color-earth-light); line-height: 1; font-weight: 400; }
        .servicio-tags { display: flex; gap: 0.75rem; align-items: center; }
        .tag-formato { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-earth); border: 1px solid var(--color-earth-light); padding: 0.3rem 0.75rem; border-radius: var(--radius); }
        .tag-highlight { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; background: var(--color-accent); color: var(--color-primary); padding: 0.3rem 0.75rem; border-radius: var(--radius); font-weight: 700; }
        .servicio-body { display: grid; grid-template-columns: 1.4fr 1fr; gap: 6rem; align-items: start; }
        .servicio-icono { font-size: 2.5rem; margin-bottom: 1.5rem; }
        .servicio-nombre { font-size: clamp(2rem, 4vw, 3rem); color: var(--foreground); margin-bottom: 0.75rem; font-weight: 400; line-height: 1.1; }
        .servicio-subtitulo { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--color-earth); margin-bottom: 2rem; }
        .servicio-desc { font-size: 1.1rem; color: var(--foreground); line-height: 1.8; font-weight: 300; margin-bottom: 2.5rem; }
        .servicio-beneficios { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
        .servicio-beneficios li { font-size: 0.95rem; color: var(--color-earth); padding-left: 1.5rem; position: relative; line-height: 1.6; font-weight: 300; }
        .servicio-beneficios li::before { content: '—'; position: absolute; left: 0; color: var(--color-accent); font-weight: 500; }
        .servicio-cta-box { background: var(--color-secondary); border: 1px solid var(--color-earth-light); padding: 3rem; border-radius: var(--radius); position: sticky; top: 100px; }
        .cta-detail { margin-bottom: 2.5rem; }
        .cta-row { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--color-earth-light); }
        .cta-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-earth); }
        .cta-value { font-size: 0.9rem; color: var(--foreground); }
        .cta-price { font-family: var(--font-serif); font-size: 3rem; color: var(--foreground); margin-top: 2rem; line-height: 1; }
        .cta-price-note { font-size: 0.8rem; color: var(--color-earth); text-transform: uppercase; letter-spacing: 0.15em; margin-top: 0.25rem; margin-bottom: 2rem; }
        .cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .cta-buttons .btn { width: 100%; justify-content: center; }
        .formacion-section { padding: 10rem 0; background: var(--color-primary); }
        .formacion-card { max-width: 800px; margin: 0 auto; text-align: center; }
        .formacion-caption { display: block; text-transform: uppercase; letter-spacing: 0.4em; font-size: 0.75rem; font-weight: 700; color: var(--color-accent); margin-bottom: 2rem; }
        .formacion-card h2 { font-size: clamp(2rem, 4vw, 3rem); color: var(--color-secondary); margin-bottom: 2.5rem; font-weight: 400; }
        .formacion-card p { font-size: 1.1rem; color: rgba(255,255,255,0.65); line-height: 1.8; margin-bottom: 1.5rem; font-weight: 300; }
        .formacion-card strong { color: rgba(255,255,255,0.9); font-weight: 500; }
        .formacion-credenciales { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 3rem; }
        .formacion-credenciales span { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; border: 1px solid rgba(255,255,255,0.2); padding: 0.5rem 1rem; border-radius: var(--radius); color: rgba(255,255,255,0.7); }
        .faq-consultas { padding: 8rem 0; }
        .faq-title { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.3em; color: var(--color-earth); font-family: var(--font-main); font-weight: 700; margin-bottom: 4rem; }
        .faq-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 3rem; }
        .faq-item-c { border-top: 1px solid var(--color-earth-light); padding-top: 2rem; }
        .faq-item-c h3 { font-size: 1.05rem; color: var(--foreground); margin-bottom: 1rem; font-weight: 400; line-height: 1.4; font-family: var(--font-serif); }
        .faq-item-c p { font-size: 0.95rem; color: var(--color-earth); line-height: 1.7; font-weight: 300; }
        @media (max-width: 900px) {
          .servicio-body { grid-template-columns: 1fr; gap: 3rem; }
          .servicio-cta-box { position: static; }
          .method-divider { display: none; }
        }
        @media (max-width: 600px) {
          .faq-grid { grid-template-columns: 1fr; }
          .servicio-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
