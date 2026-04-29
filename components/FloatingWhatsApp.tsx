'use client';

import Link from 'next/link';

export default function FloatingWhatsApp() {
  return (
    <>
      <Link 
        href="https://wa.me/5491131671954?text=Hola! Vengo de la web y me gustaría hacer una consulta."
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <svg 
          viewBox="0 0 24 24" 
          width="32" 
          height="32" 
          fill="currentColor" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.606-1.446c.158-.173.346-.217.461-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.101.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.082 20.301l-.014-.001c-1.385-.001-2.812-.375-4.025-1.085l-.289-.168-3.048.799.816-2.971-.184-.293c-.767-1.221-1.172-2.656-1.171-4.143.001-4.225 3.444-7.669 7.674-7.67 4.228 0 7.669 3.444 7.669 7.669 0 4.225-3.441 7.669-7.428 7.863z"/>
        </svg>
      </Link>
      <style jsx>{`
        .whatsapp-float {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 60px;
          height: 60px;
          background-color: var(--foreground);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-md);
          z-index: 1000;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .whatsapp-float:hover {
          transform: translateY(-5px) scale(1.05);
          background-color: var(--color-primary);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .whatsapp-float {
            bottom: 1.5rem;
            right: 1.5rem;
            width: 55px;
            height: 55px;
          }
        }
      `}</style>
    </>
  );
}
