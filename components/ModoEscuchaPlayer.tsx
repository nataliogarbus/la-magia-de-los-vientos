'use client';

import { useEffect, useRef, useState } from 'react';
import { AmbientSoundEngine, SoundMood } from '@/lib/ambient-audio';

interface ModoEscuchaPlayerProps {
  audioSrc?: string;
  onPlayingChange?: (playing: boolean) => void;
}

const ATMOSFERAS: { id: SoundMood; label: string }[] = [
  { id: 'ambient', label: 'Armonía Serena' },
  { id: 'ruido-mental', label: 'Frecuencia Tierra' },
  { id: 'desanimo', label: 'Silencio Cálido' },
];

export default function ModoEscuchaPlayer({
  audioSrc,
  onPlayingChange,
}: ModoEscuchaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mood, setMood] = useState<SoundMood>('ambient');
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

  useEffect(() => {
    onPlayingChange?.(isPlaying);
  }, [isPlaying, onPlayingChange]);

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
      engineRef.current.start(mood, volume);
      setIsPlaying(true);
      setExpanded(true);
    }
  };

  const handleMoodChange = (nextMood: SoundMood) => {
    setMood(nextMood);
    if (isPlaying && !audioSrc) {
      engineRef.current?.start(nextMood, volume);
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

  const activeMoodLabel = ATMOSFERAS.find((a) => a.id === mood)?.label || 'Armonía Serena';

  return (
    <aside className="capsula-wrap" aria-label="Cápsula Sonora Modo Escucha">
      {audioSrc && <audio ref={audioRef} src={audioSrc} loop preload="none" />}

      {expanded && (
        <div className="capsula-popover">
          {!audioSrc && (
            <div className="atmos-selector">
              <span className="popover-label">Atmósfera sonora</span>
              <div className="atmos-pills">
                {ATMOSFERAS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMoodChange(item.id)}
                    className={`atmos-pill ${mood === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="volume-row">
            <label htmlFor="modo-escucha-vol" className="popover-label">
              Volumen
            </label>
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
        </div>
      )}

      <div className={`capsula-pill ${isPlaying ? 'playing' : ''}`}>
        <button
          type="button"
          onClick={togglePlay}
          className="play-orb-btn"
          aria-pressed={isPlaying}
          aria-label={isPlaying ? 'Pausar Modo Escucha' : 'Activar Modo Escucha'}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l10-6.5-10-6.5z" />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="capsula-info-btn"
          aria-expanded={expanded}
        >
          <span className="capsula-title">Modo Escucha</span>
          <span className="capsula-sub">
            {isPlaying ? activeMoodLabel : 'Apagado · Opcional'}
          </span>
        </button>

        <div className={`sound-bars ${isPlaying ? 'active' : ''}`} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <style jsx>{`
        .capsula-wrap {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          z-index: 950;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.65rem;
        }

        .capsula-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(246, 243, 236, 0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(184, 151, 104, 0.45);
          border-radius: 9999px;
          padding: 0.45rem 1rem 0.45rem 0.45rem;
          box-shadow: 0 12px 32px rgba(44, 58, 51, 0.14);
          transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .capsula-pill.playing {
          background: rgba(44, 58, 51, 0.9);
          border-color: rgba(184, 151, 104, 0.75);
        }

        .play-orb-btn {
          width: 38px;
          height: 38px;
          border-radius: 9999px;
          border: none;
          background-color: #2c3a33;
          color: #f6f3ec;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.25s ease, background-color 0.25s ease;
        }

        .capsula-pill.playing .play-orb-btn {
          background-color: #b89768;
          color: #2c3a33;
        }

        .play-orb-btn:hover {
          transform: scale(1.06);
        }

        .capsula-info-btn {
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          padding: 0;
        }

        .capsula-title {
          font-family: var(--font-serif);
          font-size: 0.95rem;
          color: #1d221f;
          line-height: 1.15;
        }

        .capsula-pill.playing .capsula-title {
          color: #f6f3ec;
        }

        .capsula-sub {
          font-family: var(--font-main);
          font-size: 0.7rem;
          color: #7a746e;
          letter-spacing: 0.04em;
        }

        .capsula-pill.playing .capsula-sub {
          color: #b89768;
        }

        .sound-bars {
          display: inline-flex;
          align-items: flex-end;
          gap: 2.5px;
          height: 16px;
          margin-left: 0.2rem;
        }

        .sound-bars span {
          width: 2.5px;
          height: 4px;
          background-color: rgba(184, 151, 104, 0.45);
          border-radius: 9999px;
          transition: height 0.3s ease;
        }

        .sound-bars.active span {
          background-color: #b89768;
          animation: barDance 1.15s ease-in-out infinite;
        }

        .sound-bars.active span:nth-child(1) {
          animation-delay: 0s;
        }
        .sound-bars.active span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .sound-bars.active span:nth-child(3) {
          animation-delay: 0.45s;
        }
        .sound-bars.active span:nth-child(4) {
          animation-delay: 0.15s;
        }

        @keyframes barDance {
          0%,
          100% {
            height: 4px;
          }
          50% {
            height: 15px;
          }
        }

        .capsula-popover {
          background: rgba(246, 243, 236, 0.92);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(184, 151, 104, 0.45);
          border-radius: 16px;
          padding: 1rem;
          box-shadow: 0 20px 45px rgba(44, 58, 51, 0.16);
          width: 250px;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .popover-label {
          display: block;
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #2c3a33;
          font-weight: 700;
          margin-bottom: 0.45rem;
        }

        .atmos-pills {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .atmos-pill {
          text-align: left;
          padding: 0.45rem 0.75rem;
          border-radius: 9999px;
          border: 1px solid rgba(44, 58, 51, 0.18);
          background: rgba(255, 255, 255, 0.6);
          font-family: var(--font-main);
          font-size: 0.78rem;
          color: #1d221f;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .atmos-pill.active {
          background-color: #2c3a33;
          border-color: #2c3a33;
          color: #f6f3ec;
        }

        .volume-row {
          display: flex;
          flex-direction: column;
        }

        .volume-row input[type='range'] {
          width: 100%;
          accent-color: #2c3a33;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .capsula-wrap {
            bottom: 1.25rem;
            left: 1rem;
          }
        }
      `}</style>
    </aside>
  );
}
