'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link href="/" className="logo-link">
          <Image
            src="/logo-magia.png"
            alt="La Magia de los Vientos"
            width={60}
            height={60}
            className="logo-img"
          />
          <span className="brand-name">La Magia de los Vientos</span>
        </Link>

        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isOpen ? 'open' : ''}`}></span>
        </button>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><Link href="/" onClick={() => setIsOpen(false)}>Inicio</Link></li>
          <li><Link href="/consultas" onClick={() => setIsOpen(false)}>Consultas</Link></li>
          <li><Link href="/preparados" onClick={() => setIsOpen(false)}>Preparados</Link></li>
          <li><Link href="/reservas" onClick={() => setIsOpen(false)} className="btn btn-primary btn-sm">Reserva tu Turno</Link></li>
        </ul>
      </div>

      <style jsx>{`
        .navbar {
          background-color: rgba(255, 255, 255, 0.8); /* Pure white glass */
          backdrop-filter: blur(20px);
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding: 1.2rem 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: var(--font-serif);
          font-weight: 500;
          font-size: 1.4rem;
          color: var(--color-primary);
          text-decoration: none;
          line-height: 1;
        }
        
        .logo-img {
            border-radius: 50%; /* Ensure circular if the image isn't already */
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
          list-style: none;
        }

        .nav-links a {
          font-weight: 400;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--foreground);
          transition: all 0.3s ease;
          position: relative;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--color-accent);
          transition: width 0.3s ease;
        }
        .nav-links a:hover {
          color: var(--color-primary);
        }
        .nav-links a:hover::after {
          width: 100%;
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }

        .hamburger {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--foreground);
          position: relative;
          transition: all 0.3s;
        }

        .hamburger::before, .hamburger::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 2px;
          background: var(--foreground);
          transition: all 0.3s;
        }

        .hamburger::before { top: -8px; }
        .hamburger::after { top: 8px; }

        .hamburger.open {
          background: transparent;
        }

        .hamburger.open::before {
          transform: rotate(45deg);
          top: 0;
        }

        .hamburger.open::after {
          transform: rotate(-45deg);
          top: 0;
        }

        @media (max-width: 768px) {
          .mobile-toggle {
            display: block;
          }

          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--background);
            flex-direction: column;
            padding: 2rem;
            gap: 1.5rem;
            transform: translateY(-150%);
            transition: transform 0.3s ease-in-out;
            box-shadow: var(--shadow-md);
          }

          .nav-links.active {
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}
