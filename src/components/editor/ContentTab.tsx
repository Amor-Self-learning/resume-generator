import { useState, KeyboardEvent } from 'react';
import { useResume } from '@context';

export function ContentTab() {
  const {
    resume,
    updateField,
    toggleSection,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
    addAchievement,
    updateAchievement,
    removeAchievement,
    addHobby,
    removeHobby,
  } = useResume();

  const [newSkillText, setNewSkillText] = useState('');
  const [newHobbyText, setNewHobbyText] = useState('');

  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (newSkillText.trim()) {
      addSkill(newSkillText.trim());
      setNewSkillText('');
    }
  };

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleAddHobby = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (newHobbyText.trim()) {
      addHobby(newHobbyText.trim());
      setNewHobbyText('');
    }
  };

  const handleHobbyKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddHobby();
    }
  };

  return (
    <div className="form-scroll">
      {/* Contact & Personal Information */}
      <label className="field">
        <span>Your name</span>
        <input
          value={resume.fullName}
          onChange={e => updateField('fullName', e.target.value)}
          placeholder="e.g. Amor Zephyr"
        />
      </label>

      <label className="field">
        <span>Role / headline</span>
        <input
          value={resume.role}
          onChange={e => updateField('role', e.target.value)}
          placeholder="e.g. Product designer & builder"
        />
      </label>

      <div className="form-row">
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            value={resume.email}
            onChange={e => updateField('email', e.target.value)}
            placeholder="amor@example.com"
          />
        </label>
        <label className="field">
          <span>Phone</span>
          <input
            type="tel"
            value={resume.phone}
            onChange={e => updateField('phone', e.target.value)}
            placeholder="+92 300 123 4567"
          />
        </label>
      </div>

      <div className="form-row">
        <label className="field">
          <span>Location</span>
          <input
            value={resume.location}
            onChange={e => updateField('location', e.target.value)}
            placeholder="e.g. Multan, Pakistan"
          />
        </label>
        <label className="field">
          <span>Website / Portfolio</span>
          <input
            value={resume.website}
            onChange={e => updateField('website', e.target.value)}
            placeholder="amorzephyr.dev"
          />
        </label>
      </div>

      {/* Profile / Summary Section */}
      <section className={`form-section ${resume.sections.summary ? '' : 'disabled'}`}>
        <div className="form-section-head">
          <b>About you</b>
          <button type="button" onClick={() => toggleSection('summary')}>
            {resume.sections.summary ? 'Hide' : 'Show'}
          </button>
        </div>
        {resume.sections.summary && (
          <textarea
            value={resume.summary}
            onChange={e => updateField('summary', e.target.value)}
            placeholder="Brief professional summary focusing on your key strengths and impact..."
            rows={4}
          />
        )}
      </section>

      {/* Experience Section */}
      <section className={`form-section ${resume.sections.experience ? '' : 'disabled'}`}>
        <div className="form-section-head">
          <b>Experience</b>
          <button type="button" onClick={() => toggleSection('experience')}>
            {resume.sections.experience ? 'Hide' : 'Show'}
          </button>
        </div>
        {resume.sections.experience && (
          <>
            {resume.experience.map((entry, index) => {
              const startVal = typeof entry.dates === 'object' ? entry.dates.start : entry.dates?.split('—')[0]?.trim() || '';
              const endVal = typeof entry.dates === 'object' ? entry.dates.end : entry.dates?.split('—')[1]?.trim() || '';

              return (
                <div className="entry-form" key={entry.id}>
                  <div className="entry-form-head">
                    <span>0{index + 1}</span>
                    {resume.experience.length > 1 && (
                      <button type="button" onClick={() => removeExperience(entry.id)}>
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="form-row">
                    <label className="field">
                      <span>Title</span>
                      <input
                        value={entry.role}
                        onChange={e => updateExperience(entry.id, { role: e.target.value })}
                        placeholder="Role / Title"
                      />
                    </label>
                    <label className="field">
                      <span>Dates</span>
                      <input
                        value={typeof entry.dates === 'string' ? entry.dates : `${startVal} — ${endVal}`}
                        onChange={e => updateExperience(entry.id, { dates: e.target.value })}
                        placeholder="2023 — Present"
                      />
                    </label>
                  </div>
                  <label className="field">
                    <span>Organization</span>
                    <input
                      value={entry.company}
                      onChange={e => updateExperience(entry.id, { company: e.target.value })}
                      placeholder="Company name"
                    />
                  </label>
                  <textarea
                    value={entry.description}
                    onChange={e => updateExperience(entry.id, { description: e.target.value })}
                    placeholder="Describe your achievements, metrics, or core responsibilities..."
                    rows={3}
                  />
                </div>
              );
            })}
            <button type="button" className="add-button" onClick={addExperience}>
              + Add another position
            </button>
          </>
        )}
      </section>

      {/* Education Section */}
      <section className={`form-section ${resume.sections.education ? '' : 'disabled'}`}>
        <div className="form-section-head">
          <b>Education</b>
          <button type="button" onClick={() => toggleSection('education')}>
            {resume.sections.education ? 'Hide' : 'Show'}
          </button>
        </div>
        {resume.sections.education && (
          <>
            {resume.education.map((entry, index) => {
              const startVal = typeof entry.dates === 'object' ? entry.dates.start : entry.dates?.split('—')[0]?.trim() || '';
              const endVal = typeof entry.dates === 'object' ? entry.dates.end : entry.dates?.split('—')[1]?.trim() || '';

              return (
                <div className="entry-form" key={entry.id}>
                  <div className="entry-form-head">
                    <span>0{index + 1}</span>
                    {resume.education.length > 1 && (
                      <button type="button" onClick={() => removeEducation(entry.id)}>
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="form-row">
                    <label className="field">
                      <span>Degree / Program</span>
                      <input
                        value={entry.role}
                        onChange={e => updateEducation(entry.id, { role: e.target.value })}
                        placeholder="B.S. Computer Science"
                      />
                    </label>
                    <label className="field">
                      <span>Dates</span>
                      <input
                        value={typeof entry.dates === 'string' ? entry.dates : `${startVal} — ${endVal}`}
                        onChange={e => updateEducation(entry.id, { dates: e.target.value })}
                        placeholder="2021 — 2025"
                      />
                    </label>
                  </div>
                  <label className="field">
                    <span>Institution</span>
                    <input
                      value={entry.company}
                      onChange={e => updateEducation(entry.id, { company: e.target.value })}
                      placeholder="University or College"
                    />
                  </label>
                  <textarea
                    value={entry.description}
                    onChange={e => updateEducation(entry.id, { description: e.target.value })}
                    placeholder="Focus areas, honors, or thesis..."
                    rows={2}
                  />
                </div>
              );
            })}
            <button type="button" className="add-button" onClick={addEducation}>
              + Add another degree
            </button>
          </>
        )}
      </section>

      {/* Skills Section */}
      <section className={`form-section ${resume.sections.skills ? '' : 'disabled'}`}>
        <div className="form-section-head">
          <b>Skills</b>
          <button type="button" onClick={() => toggleSection('skills')}>
            {resume.sections.skills ? 'Hide' : 'Show'}
          </button>
        </div>
        {resume.sections.skills && (
          <div className="skills-editor">
            {resume.skills && resume.skills.length > 0 && (
              <div className="tags-list">
                {resume.skills.map(skill => (
                  <span key={skill.id} className="tag-chip">
                    {skill.label}
                    <button
                      type="button"
                      className="tag-remove-btn"
                      onClick={() => removeSkill(skill.id)}
                      title="Remove skill"
                      aria-label={`Remove ${skill.label}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="tag-input-row">
              <input
                value={newSkillText}
                onChange={e => setNewSkillText(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type skill & press Enter"
              />
              <button
                type="button"
                className="tag-add-btn"
                onClick={() => handleAddSkill()}
              >
                + Add
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Achievements Section */}
      <section className={`form-section ${resume.sections.achievements ? '' : 'disabled'}`}>
        <div className="form-section-head">
          <b>Key Achievements</b>
          <button type="button" onClick={() => toggleSection('achievements')}>
            {resume.sections.achievements ? 'Hide' : 'Show'}
          </button>
        </div>
        {resume.sections.achievements && (
          <>
            {(resume.achievements || []).map((entry, index) => (
              <div className="entry-form" key={entry.id}>
                <div className="entry-form-head">
                  <span>0{index + 1}</span>
                  <button type="button" onClick={() => removeAchievement(entry.id)}>
                    Remove
                  </button>
                </div>
                <label className="field">
                  <span>Achievement Title</span>
                  <input
                    value={entry.title}
                    onChange={e => updateAchievement(entry.id, { title: e.target.value })}
                    placeholder="e.g. Revenue growth, Design system adoption"
                  />
                </label>
                <textarea
                  value={entry.value}
                  onChange={e => updateAchievement(entry.id, { value: e.target.value })}
                  placeholder="Details of the achievement, metrics, and measurable impact..."
                  rows={2}
                />
              </div>
            ))}
            <button type="button" className="add-button" onClick={addAchievement}>
              + Add another achievement
            </button>
          </>
        )}
      </section>

      {/* Hobbies & Interests Section */}
      <section className={`form-section ${resume.sections.hobbies ? '' : 'disabled'}`}>
        <div className="form-section-head">
          <b>Interests & Hobbies</b>
          <button type="button" onClick={() => toggleSection('hobbies')}>
            {resume.sections.hobbies ? 'Hide' : 'Show'}
          </button>
        </div>
        {resume.sections.hobbies && (
          <div className="hobbies-editor">
            {resume.hobbies && resume.hobbies.length > 0 && (
              <div className="tags-list">
                {(resume.hobbies || []).map(hobby => (
                  <span key={hobby.id} className="tag-chip">
                    {hobby.value}
                    <button
                      type="button"
                      className="tag-remove-btn"
                      onClick={() => removeHobby(hobby.id)}
                      title="Remove interest"
                      aria-label={`Remove ${hobby.value}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="tag-input-row">
              <input
                value={newHobbyText}
                onChange={e => setNewHobbyText(e.target.value)}
                onKeyDown={handleHobbyKeyDown}
                placeholder="Type interest & press Enter"
              />
              <button
                type="button"
                className="tag-add-btn"
                onClick={() => handleAddHobby()}
              >
                + Add
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
