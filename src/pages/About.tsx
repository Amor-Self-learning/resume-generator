import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PAGE_METADATA } from '@types';

export function About() {
  const metadata = PAGE_METADATA.about;

  const sections = [
    [
      'Built for thoughtful applications',
      'Most resume tools make you choose between rigid forms and over-designed templates. resumé. keeps the structure useful and the visual language expressive, so the result can feel professional without feeling generic.',
    ],
    [
      'Expressive, not decorative',
      'The template collection is designed for different kinds of work: technical, editorial, creative, executive, portfolio, and everything in between. Typography, spacing, and hierarchy do the heavy lifting so decoration never gets in the way.',
    ],
    [
      'Private by default',
      'Your resume is saved locally in this browser. There is no account to create, no profile to maintain, and no server-side resume database quietly collecting your personal details.',
    ],
    [
      'Made to get out of the way',
      'The editor is intentionally small. Write your story, switch directions, see the result immediately, and print when it feels right. The goal is not more features; it is a better moment between you and your next opportunity.',
    ],
  ];

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.ogTitle} />
        <meta property="og:description" content={metadata.ogDescription} />
      </Helmet>

      <div className="article-shell">
        <main className="article-page">
          <p className="eyebrow">
            <span className="eyebrow-line" /> A small tool with a clear point of view
          </p>
          <h1>
            Good work deserves
            <br />
            <em>a good first impression.</em>
          </h1>
          <p className="article-intro">
            resumé. is a thoughtful resume builder for people who care about what
            they make. It helps you turn experience, potential, and unfinished
            ideas into a document you are proud to send.
          </p>
          <div className="article-sections">
            {sections.map(([title, text], index) => (
              <section key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </div>
              </section>
            ))}
          </div>
          <Link to="/editor" className="primary-button">
            Make your resume <span>↗</span>
          </Link>
        </main>
      </div>
    </>
  );
}
