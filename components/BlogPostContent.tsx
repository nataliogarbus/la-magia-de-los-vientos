'use client';

import Link from 'next/link';

interface BlogPostContentProps {
    post: {
        title: string;
        content: string;
    };
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
    return (
        <article className="blog-post-container container">
            <Link href="/blog" className="back-link">&larr; Volver al Blog</Link>

            <header className="post-header">
                <h1>{post.title}</h1>
            </header>

            <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <style jsx>{`
        .blog-post-container {
          padding-top: 4rem;
          padding-bottom: 6rem;
          max-width: 800px; /* Reading width */
        }

        .back-link {
          display: inline-block;
          margin-bottom: 2rem;
          color: var(--color-earth);
          font-weight: 500;
        }

        .back-link:hover {
          color: var(--color-primary);
        }

        .post-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .post-header h1 {
          font-size: 2.5rem;
          color: var(--color-primary);
          line-height: 1.2;
        }

        /* Content Styling */
        .post-content {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--foreground);
        }

        :global(.post-content p) {
          margin-bottom: 1.5rem;
        }

        :global(.post-content h3) {
          color: var(--color-primary);
          font-size: 1.8rem;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
        }

        :global(.post-content strong) {
          color: var(--color-primary);
          font-weight: 600;
        }

        :global(.post-content .intro) {
          font-size: 1.3rem;
          color: var(--color-earth);
          border-left: 4px solid var(--color-secondary);
          padding-left: 1.5rem;
          margin-bottom: 2.5rem;
        }

        :global(.cta-block) {
          background-color: #f8f9fa;
          border: 1px solid var(--color-secondary);
          padding: 2.5rem;
          text-align: center;
          margin-top: 4rem;
          border-radius: var(--radius);
        }

        :global(.cta-block p) {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: var(--color-primary);
        }
      `}</style>
        </article>
    );
}
