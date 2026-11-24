import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PAGE_METADATA } from '@types';

export function Guide() {
  const metadata = PAGE_METADATA.guide;

  const sections = [
    [
      'Lead with the role you want',
      'Your name and headline should make your direction obvious in seconds. Say what you do, who you help, or what kind of problems you solve. A focused headline gives every other section a job.',
    ],
    [
      'Turn responsibilities into proof',
      'Replace a list of duties with evidence. Explain what changed because you were there, then add a real number, time frame, scale, or result when you have one. Never invent a metric—specific and honest beats impressive and vague.',
    ],
    [
      'Make the page easy to scan',
      'Use familiar section names such as Profile, Experience, Education, and Skills. Keep entries short, use consistent dates, and leave enough whitespace that a reader can find the important parts without working for them.',
    ],
    [
      'Choose a template that matches your signal',
      'Technical resumes benefit from structure and precision. Creative resumes can show more personality. Executive resumes need calm hierarchy. Choose a visual direction that supports your work instead of competing with it.',
    ],
    [
      'Tailor the details, not your identity',
      'For each application, adjust the headline, summary, skills, and order of experience toward the role. A good resume builder should make this easy without asking you to rewrite your whole story every time.',
    ],
    [
      'Do a final export check',
      'Open every link, check the dates, read the page aloud, and print or preview the PDF before sending it. A polished resume is not about perfection; it is about removing the small distractions that make good work harder to see.',
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
            <span className="eyebrow-line" /> The practical resume guide
          </p>
          <h1>
            Write a resume
            <br />
            <em>worth reading.</em>
          </h1>
          <p className="article-intro">
            A strong resume is not a biography. It is a clear, useful invitation
            to learn more about the way you think, the problems you solve, and
            the work you can do.
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
