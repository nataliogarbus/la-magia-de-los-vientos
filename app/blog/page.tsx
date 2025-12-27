'use client';

import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';

export default function BlogIndex() {
    return (
        <div className="container blog-container">
            <h1 className="section-title">Blog & Recursos</h1>
            <p className="section-subtitle">Artículos para educar tu percepción y armonizar tu vida.</p>

            <div className="blog-grid">
                {blogPosts.map((post) => (
                    <article key={post.slug} className="blog-card">
                        <Link href={`/blog/${post.slug}`} className="card-link">
                            <div className="card-content">
                                <h2>{post.title}</h2>
                                <p>{post.excerpt}</p>
                                <span className="read-more">Leer más &rarr;</span>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>

            <style jsx>{`
        .blog-container {
          padding-top: 4rem;
          padding-bottom: 6rem;
        }

        .section-title {
          text-align: center;
          margin-bottom: 1rem;
          color: var(--color-primary);
        }

        .section-subtitle {
          text-align: center;
          margin-bottom: 4rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          color: var(--color-earth);
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .blog-card {
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
          transition: transform 0.3s, box-shadow 0.3s;
          border: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
          height: 100%;
        }

        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-secondary);
        }

        .card-link {
          display: block;
          height: 100%;
          text-decoration: none;
          color: inherit;
          padding: 2rem;
        }

        .card-content h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--color-primary);
          line-height: 1.3;
        }

        .card-content p {
          color: var(--foreground);
          opacity: 0.8;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .read-more {
          color: var(--color-primary);
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>
        </div>
    );
}
