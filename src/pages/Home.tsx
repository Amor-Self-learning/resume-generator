import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { TEMPLATES, PAGE_METADATA } from '@types';
import { useResume } from '@context';

export function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateField } = useResume();
  const metadata = PAGE_METADATA.home;

  useEffect(() => {
    if (location.hash !== '#templates') return;
    document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.hash]);

  const handleSelectTemplate = (id: string) => {
    updateField('template', id);
    navigate('/editor');
  };

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.ogTitle} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta name="twitter:title" content={metadata.ogTitle} />
        <meta name="twitter:description" content={metadata.ogDescription} />
        <meta name="twitter:image" content={metadata.ogImage} />
        <link rel="canonical" href="https://resume-generator-en.vercel.app/" />
      </Helmet>

      <div>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" /> Resumé, but make it yours.
            </p>
            <h1>
              A resume that
              <br />
              <em>feels like you.</em>
            </h1>
            <p className="hero-lede">
              Thoughtful templates, smart defaults, and a calm little editor.
              Make a resume you’re proud to send.
            </p>
            <div className="hero-actions">
              <Link to="/editor" className="primary-button">
                Start building <span>↗</span>
              </Link>
              <Link to="/guide" className="quiet-button">
                How it works <span>↓</span>
              </Link>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack">
                <span>AS</span>
                <span>MK</span>
                <span>JR</span>
                <span>+</span>
              </div>
              <p>
                <strong>Made for real applications</strong>
                <br />
                private, local, and yours
              </p>
            </div>
          </div>

          <div className="hero-art">
            <div className="art-note note-one">
              Design
              <br />
              <strong>with intent</strong>
            </div>
            <div className="art-note note-two">
              Good work
              <br />
              <strong>
                deserves a good
                <br />
                first impression.
              </strong>
            </div>
            <div className="hero-resume">
              <div className="resume-mini-head">
                <span className="mini-avatar">A</span>
                <span>
                  <b>AMOR ZEPHYR</b>
                  <small>Product designer & builder</small>
                </span>
              </div>
              <div className="mini-rule" />
              <div className="mini-columns">
                <div>
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div>
                  <b />
                  <b />
                  <b />
                  <b />
                  <b />
                </div>
              </div>
            </div>
            <span className="art-scribble">✳</span>
          </div>
        </section>

        {/* Templates Section */}
        <section className="templates-section" id="templates">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Start somewhere good</p>
              <h2>
                Ten ways to <em>stand out.</em>
              </h2>
            </div>
            <p>
              Choose a visual point of view, then make it yours.
              <br />
              Every template keeps the focus on your work.
            </p>
          </div>

          <div className="template-grid">
            {TEMPLATES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`template-card ${item.className}`}
                onClick={() => handleSelectTemplate(item.id)}
              >
                <div className="card-top">
                  <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="card-arrow">↗</span>
                </div>
                <div className="template-preview">
                  <span className="preview-name">Amor Zephyr</span>
                  <span className="preview-role">Product designer</span>
                  <div className="preview-lines">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <div className="card-label">
                  <div>
                    <b>{item.name}</b>
                    <small>
                      {item.type} · {item.tone}
                    </small>
                  </div>
                  <span>{item.description}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Value Strip */}
        <section className="value-strip">
          <div>
            <span className="value-icon">✦</span>
            <b>Designed with intention</b>
            <p>Clear hierarchy, expressive type, and enough room to think.</p>
          </div>
          <div>
            <span className="value-icon">↗</span>
            <b>Easy to make your own</b>
            <p>Choose a direction, write your story, and refine in real time.</p>
          </div>
          <div>
            <span className="value-icon">⌁</span>
            <b>Private by default</b>
            <p>Your resume stays in this browser. No account or upload required.</p>
          </div>
        </section>
      </div>
    </>
  );
}