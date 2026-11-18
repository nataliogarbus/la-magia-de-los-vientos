'use client';

import { useEffect, useRef, useState } from 'react';
import { AmbientSoundEngine } from '@/lib/ambient-audio';

interface ModoEscuchaPlayerProps {
  audioSrc?: string;
}

export default function ModoEscuchaPlayer({ audioSrc }: ModoEscuchaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [expanded, setExpanded] = useState(false);

  const engineRef = useRef<AmbientSoundEngine | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    engineRef.current = new AmbientSoundEngine();
    return () => {
      engineRef.current?.stop();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioSrc && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.volume = volume;
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
      return;
    }

    if (!engineRef.current) return;
    if (isPlaying) {
      engineRef.current.stop();
      setIsPlaying(false);
    } else {
      engineRef.current.start('ambient', volume);
      setIsPlaying(true);
      setExpanded(true);
    }
  };

  const handleVolumeChange = (nextVolume: number) => {
    setVolume(nextVolume);
    if (audioSrc && audioRef.current) {
      audioRef.current.volume = nextVolume;
    } else {
      engineRef.current?.setVolume(nextVolume);
    }
  };

  return (
    <aside className="modo-escucha-wrap" aria-label="Reproductor ambiental Modo Escucha">
      {audioSrc && <audio ref={audioRef} src={audioSrc} loop preload="none" />}

      <div className={`modo-escucha-pill ${isPlaying ? 'playing' : ''}`}>
        <button
          type="button"
          onClick={togglePlay}
          className="play-toggle-btn"
          aria-pressed={isPlaying}
          aria-label={isPlaying ? 'Pausar Modo Escucha' : 'Activar Modo Escucha'}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l10-6.5-10-6.5z" />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="modo-label-btn"
        >
          <span className="modo-title">Modo Escucha</span>
          <span className="modo-sub">
            {isPlaying ? 'Armonía ambiental activa' : 'Opcional · Apagado'}
          </span>
        </button>

        {isPlaying && (
          <span className="eq-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        )}
      </div>

      {expanded && (
        <div className="volume-drawer">
          <label htmlFor="modo-escucha-vol">Volumen</label>
          <input
            id="modo-escucha-vol"
            type="range"
            min="0.05"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
          />
        </div>
      )}

      <style jsx>{`
        .modo-escucha-wrap {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          z-index: 950;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .modo-escucha-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background-color: var(--background);
          border: 1px solid var(--color-earth-light);
          border-radius: var(--radius);
          padding: 0.55rem 0.9rem 0.55rem 0.6rem;
          box-shadow: var(--shadow-md);
          transition: border-color 0.3s ease, background-color 0.3s ease;
        }

        .modo-escucha-pill.playing {
          border-color: var(--color-primary);
          background-color: var(--color-secondary);
        }

        .play-toggle-btn {
          width: 34px;
          height: 34px;
          border-radius: var(--radius);
          border: none;
          background-color: var(--color-primary);
          color: var(--color-secondary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: background-color 0.2s ease;
        }

        .play-toggle-btn:hover {
          background-color: var(--foreground);
        }

        .modo-label-btn {
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          padding: 0;
        }

        .modo-title {
          font-family: var(--font-serif);
          font-size: 0.92rem;
          color: var(--foreground);
          line-height: 1.2;
        }

        .modo-sub {
          font-family: var(--font-main);
          font-size: 0.7rem;
          color: var(--color-earth);
          letter-spacing: 0.04em;
        }

        .eq-bars {
          display: inline-flex;
          align-items: flex-end;
          gap: 2px;
          height: 14px;
          margin-left: 0.25rem;
        }

        .eq-bars span {
          width: 2px;
          background-color: var(--color-accent-dark);
          border-radius: 1px;
          animation: eqPulse 1.2s ease-in-out infinite;
        }

        .eq-bars span:nth-child(1) {
          height: 6px;
          animation-delay: 0s;
        }
        .eq-bars span:nth-child(2) {
          height: 13px;
          animation-delay: 0.25s;
        }
        .eq-bars span:nth-child(3) {
          height: 9px;
          animation-delay: 0.5s;
        }

        @keyframes eqPulse {
          0%,
          100% {
            transform: scaleY(0.45);
          }
          50% {
            transform: scaleY(1);
          }
        }

        .volume-drawer {
          background-color: var(--background);
          border: 1px solid var(--color-earth-light);
          border-radius: var(--radius);
          padding: 0.6rem 0.9rem;
          box-shadow: var(--shadow-sm);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .volume-drawer label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-earth);
          font-weight: 600;
        }

        .volume-drawer input[type='range'] {
          width: 110px;
          accent-color: var(--color-primary);
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .modo-escucha-wrap {
            bottom: 1.25rem;
            left: 1rem;
          }
        }
      `}</style>
    </aside>
  );
}
