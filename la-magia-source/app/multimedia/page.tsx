'use client';

export default function MultimediaPage() {
    return (
        <div className="page-container container">
            <header className="page-header-simple">
                <h1>Frecuencias Sanadoras</h1>
                <p>Escuchá la vibración de los Handpans y conectá con tu eje.</p>
            </header>

            <div className="media-grid">
                <div className="media-card">
                    <div className="media-thumbnail">
                        <div className="play-icon">▶</div>
                    </div>
                    <div className="media-info">
                        <h3>Viaje Interior (Hangpan)</h3>
                        <p>Frecuencia para meditación profunda.</p>
                        <audio controls className="audio-player">
                            <source src="/audio/demo.mp3" type="audio/mpeg" />
                            Tu navegador no soporta el elemento de audio.
                        </audio>
                    </div>
                </div>

                <div className="media-card">
                    <div className="media-thumbnail">
                        <div className="play-icon">▶</div>
                    </div>
                    <div className="media-info">
                        <h3>Renacer (Guitarra y Cuencos)</h3>
                        <p>Armonización suave para el descanso.</p>
                        <audio controls className="audio-player">
                            <source src="/audio/demo2.mp3" type="audio/mpeg" />
                        </audio>
                    </div>
                </div>
            </div>

            <div className="video-section">
                <h2>Experiencia Visual</h2>
                <div className="video-placeholder">
                    <p>Video de presentación próximamente</p>
                </div>
            </div>

            <style jsx>{`
        .page-header-simple {
          text-align: center;
          padding: 4rem 0;
        }

        .page-header-simple h1 {
          font-size: 2.5rem;
          color: var(--color-primary);
        }

        .media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .media-card {
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .media-thumbnail {
          height: 200px;
          background-color: var(--color-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 3rem;
        }

        .media-info {
          padding: 1.5rem;
        }

        .media-info h3 {
          margin-bottom: 0.5rem;
          color: var(--foreground);
        }

        .audio-player {
          width: 100%;
          margin-top: 1rem;
        }

        .video-section {
          margin-bottom: 4rem;
          text-align: center;
        }

        .video-placeholder {
          background-color: #eee;
          height: 400px;
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
        }
      `}</style>
        </div>
    );
}
