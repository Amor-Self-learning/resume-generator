import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PAGE_METADATA } from '@types';

export function Privacy() {
  const metadata = PAGE_METADATA.privacy;

  const sections = [
    [
      'Local by default',
      'Resume content, template choices, theme preferences, and editor settings are saved in local browser storage on your device. Clearing that browser data removes the saved copy.',
    ],
    [
      'No resume upload',
      'The editor does not send your resume content to a server to create the live preview or print output. Your work stays in the browser while you use the app.',
    ],
    [
      'A note on external links',
      'The resume preview can include email, phone, and website links that you enter. Those links open the relevant application or website, whose privacy practices are separate from resumé.',
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
            <span className="eyebrow-line" /> The uninteresting but important bit
          </p>
          <h1>
            Your words are
            <br />
            <em>your business.</em>
          </h1>
          <p className="article-intro">
            resumé. is designed to work without an account or a server-side
            resume profile. Here is the short version of what that means.
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
