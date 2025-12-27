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
                        src="/logo.png"
                        alt="La Magia de los Vientos"
                        width={50}
                        height={50}
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
                    <li><Link href="/servicios" onClick={() => setIsOpen(false)}>Servicios</Link></li>
                    <li><Link href="/multimedia" onClick={() => setIsOpen(false)}>Sonidos</Link></li>
                    <li><Link href="/reservas" onClick={() => setIsOpen(false)} className="btn btn-primary btn-sm">Reserva tu Turno</Link></li>
                </ul>
            </div>

            <style jsx>{`
        .navbar {
          background-color: rgba(253, 253, 251, 0.9);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          padding: 1rem 0;
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
          font-weight: 600;
          font-size: 1.25rem;
          color: var(--color-primary);
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
          list-style: none;
        }

        .nav-links a {
          font-weight: 500;
          color: var(--foreground);
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: var(--color-primary);
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
