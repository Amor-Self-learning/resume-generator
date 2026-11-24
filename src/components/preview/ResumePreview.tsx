import { useMemo } from 'react';
import type { ResumeData } from '@types';
import { TEMPLATES } from '@types';
import { Icon } from '@components/common/Icon';

interface ResumePreviewProps {
  resume: ResumeData;
  className?: string;
}

function formatDates(dates: { start: string; end: string } | string | undefined): string {
  if (!dates) return '';
  if (typeof dates === 'string') return dates;
  if (!dates.start && !dates.end) return '';
  if (dates.start && !dates.end) return dates.start;
  if (!dates.start && dates.end) return dates.end;
  return `${dates.start} — ${dates.end}`;
}

export function ResumePreview({ resume, className = '' }: ResumePreviewProps) {
  const selectedTemplate = useMemo(() => {
    return TEMPLATES.find(item => item.id === resume.template) || TEMPLATES[0];
  }, [resume.template]);

  const websiteUrl = useMemo(() => {
    if (!resume.website || !resume.website.trim()) return '';
    return resume.website.startsWith('http') ? resume.website : `https://${resume.website}`;
  }, [resume.website]);

  const scale = (resume.scale || 100) / 100;
  const spacing = (resume.spacing || 100) / 100;
  const accent = resume.accentColor || '#6c58ed';
  const font = resume.fontFamily || 'Outfit';

  return (
    <article
      className={`resume-paper ${selectedTemplate.className} ${className}`}
      style={{
        fontFamily: font,
        ['--accent' as string]: accent,
        ['--resume-scale' as string]: `${scale}`,
        ['--resume-spacing' as string]: `${spacing}`,
      }}
    >
      <header className="resume-header">
        <div className="resume-identity">
          <span className="resume-icon">
            <Icon name={resume.icon || 'spark'} size={22} />
          </span>
          <div>
            <h1>{resume.fullName || 'Your Name'}</h1>
            <p>{resume.role || 'Your Headline'}</p>
          </div>
        </div>

        <div className="contact-line">
          {resume.email && (
            <>
              <a href={`mailto:${resume.email}`}>{resume.email}</a>
              {(resume.phone || resume.location || websiteUrl) && <i />}
            </>
          )}
          {resume.phone && (
            <>
              <a href={`tel:${resume.phone}`}>{resume.phone}</a>
              {(resume.location || websiteUrl) && <i />}
            </>
          )}
          {resume.location && (
            <>
              <span>{resume.location}</span>
              {websiteUrl && <i />}
            </>
          )}
          {websiteUrl && (
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
              {resume.website.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>
      </header>

      <div className="resume-body">
        <div className="resume-main">
          {/* Profile / Summary Section */}
          {resume.sections?.summary && resume.summary && (
            <section className="resume-section">
              <h2>Profile</h2>
              <p className="resume-summary">{resume.summary}</p>
            </section>
          )}

          {/* Experience Section */}
          {resume.sections?.experience && resume.experience && resume.experience.length > 0 && (
            <section className="resume-section">
              <h2>Experience</h2>
              {resume.experience.map(item => (
                <div className="resume-entry" key={item.id}>
                  <div className="entry-top">
                    <h3>{item.role}</h3>
                    <span>{formatDates(item.dates)}</span>
                  </div>
                  <b>{item.company}</b>
                  {item.description && <p>{item.description}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Education Section */}
          {resume.sections?.education && resume.education && resume.education.length > 0 && (
            <section className="resume-section">
              <h2>Education</h2>
              {resume.education.map(item => (
                <div className="resume-entry" key={item.id}>
                  <div className="entry-top">
                    <h3>{item.role}</h3>
                    <span>{formatDates(item.dates)}</span>
                  </div>
                  <b>{item.company}</b>
                  {item.description && <p>{item.description}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Achievements Section (Main or Side) */}
          {resume.sections?.achievements && resume.achievements && resume.achievements.length > 0 && (
            <section className="resume-section">
              <h2>Key Achievements</h2>
              {resume.achievements.map(item => (
                <div className="resume-entry" key={item.id}>
                  <div className="entry-top">
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.value}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Side Column */}
        <aside className="resume-side">
          {/* Skills */}
          {resume.sections?.skills && resume.skills && resume.skills.length > 0 && (
            <section className="resume-section">
              <h2>Skills</h2>
              <ul className="skill-list">
                {resume.skills.map(skill => (
                  <li key={skill.id}>{skill.label}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Interests / Hobbies */}
          {resume.sections?.hobbies && resume.hobbies && resume.hobbies.length > 0 && (
            <section className="resume-section">
              <h2>Interests</h2>
              <ul className="skill-list">
                {resume.hobbies.map(hobby => (
                  <li key={hobby.id}>{hobby.value}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Contact Details summary */}
          <section className="resume-section">
            <h2>Details</h2>
            {resume.location && <p>{resume.location}</p>}
            {resume.email && (
              <p>
                <a href={`mailto:${resume.email}`}>{resume.email}</a>
              </p>
            )}
            {resume.phone && (
              <p>
                <a href={`tel:${resume.phone}`}>{resume.phone}</a>
              </p>
            )}
            {websiteUrl && (
              <p>
                <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                  {resume.website.replace(/^https?:\/\//, '')}
                </a>
              </p>
            )}
          </section>
        </aside>
      </div>
    </article>
  );
}
