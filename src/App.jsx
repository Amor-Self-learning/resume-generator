import { useEffect, useState } from 'react'
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom'
import { Icon } from './icons'
import { iconNames } from './iconData'
import './styles.css'

const templates = [
  { id: 'atelier', name: 'Mosaic', type: 'Minimal', description: 'Quiet confidence with generous space.', tone: 'Air', className: 'template-atelier' },
  { id: 'signal', name: 'Vector', type: 'Technical', description: 'Crisp structure for systems thinkers.', tone: 'Sky', className: 'template-signal' },
  { id: 'ledger', name: 'Index', type: 'Editorial', description: 'A composed, information-first classic.', tone: 'Paper', className: 'template-ledger' },
  { id: 'canvas', name: 'Pulse', type: 'Creative', description: 'A little more energy, still polished.', tone: 'Lilac', className: 'template-canvas' },
  { id: 'summit', name: 'Aperture', type: 'Executive', description: 'Confident hierarchy for senior profiles.', tone: 'Ink', className: 'template-summit' },
  { id: 'studio', name: 'Field', type: 'Portfolio', description: 'Designed for people who make things.', tone: 'Lime', className: 'template-studio' },
  { id: 'terminal', name: 'Console', type: 'Developer', description: 'A sharp, monospace-forward system.', tone: 'Mint', className: 'template-terminal' },
  { id: 'orbit', name: 'Orbit', type: 'Modern', description: 'A bold profile with modular rhythm.', tone: 'Cobalt', className: 'template-orbit' },
  { id: 'frame', name: 'Frame', type: 'Creative', description: 'A visual grid for multidisciplinary work.', tone: 'Tangerine', className: 'template-frame' },
  { id: 'proof', name: 'Proof', type: 'Research', description: 'A precise, evidence-led profile.', tone: 'Rose', className: 'template-proof' },
]

const defaultResume = {
  fullName: 'Amor Zephyr',
  role: 'Product designer & builder',
  email: 'amor@example.com',
  phone: '+92 300 123 4567',
  location: 'Multan, Pakistan',
  website: 'amorzephyr.dev',
  summary: 'Product designer who turns complex ideas into calm, useful experiences. I enjoy working across research, systems, and the final thoughtful detail.',
  experience: [
    { role: 'Product Designer', company: 'Northstar Studio', dates: '2023 — Present', description: 'Led product design for a suite of tools used by 40k+ monthly users. Partnered with engineering and research to turn customer insight into simple workflows.' },
    { role: 'UX Designer', company: 'Field Notes', dates: '2021 — 2023', description: 'Designed mobile and web experiences from early concept through launch, improving activation by 28% across two core journeys.' },
  ],
  education: [{ role: 'B.S. Computer Science', company: 'NUML Multan', dates: '2021 — 2025', description: 'Focus in human-computer interaction and accessible product development.' }],
  skills: ['Product strategy', 'Figma', 'Design systems', 'User research', 'Prototyping', 'HTML & CSS'],
  sections: { summary: true, experience: true, education: true, skills: true },
  icon: 'spark',
}

const copy = (value) => JSON.parse(JSON.stringify(value))
const preferredTheme = () => window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
const pageMetadata = {
  home: { title: 'resumé. — make your work easy to remember', description: 'resumé. is a thoughtful resume builder with expressive templates, live preview, private local editing, and clean PDF printing.' },
  guide: { title: 'Resume Guide: How to Write a Resume People Remember | resumé.', description: 'Practical resume writing advice for clearer headlines, stronger evidence, better structure, and a resume that is easy to read.' },
  about: { title: 'About resumé. — a thoughtful resume builder', description: 'resumé. is a private, local-first resume builder for people who care about the work they make and how they present it.' },
  privacy: { title: 'Privacy — resumé. keeps your resume local', description: 'Learn how resumé. stores resume data locally in your browser and what happens when you use external links.' },
  editor: { title: 'Build your resume | resumé.', description: 'Build, style, preview, and print a resume privately in your browser.' },
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const page = location.pathname === '/editor' ? 'editor' : location.pathname.slice(1) || 'home'
  const [theme, setTheme] = useState(() => localStorage.getItem('quiet-theme') || preferredTheme())
  const [template, setTemplate] = useState(() => localStorage.getItem('quiet-template') || 'atelier')
  const [resume, setResume] = useState(() => {
    try { return JSON.parse(localStorage.getItem('quiet-resume') || 'null') || copy(defaultResume) } catch { return copy(defaultResume) }
  })
  const [settings, setSettings] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('quiet-settings') || '{}')
      return { accent: '#6c58ed', scale: 100, spacing: 100, icon: 'spark', ...stored, font: ['Outfit', 'ComicShannsMono Nerd Font'].includes(stored.font) ? stored.font : 'Outfit' }
    } catch { return { accent: '#6c58ed', scale: 100, spacing: 100, font: 'Outfit', icon: 'spark' } }
  })
  const setPage = (nextPage) => navigate(nextPage === 'home' ? '/' : `/${nextPage}`)
  const setThemePreference = (nextTheme) => {
    setTheme(nextTheme)
    localStorage.setItem('quiet-theme', nextTheme)
  }

  useEffect(() => { localStorage.setItem('quiet-resume', JSON.stringify(resume)) }, [resume])
  useEffect(() => { localStorage.setItem('quiet-template', template); localStorage.setItem('quiet-settings', JSON.stringify(settings)) }, [template, settings])
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('quiet-theme', theme) }, [theme])
  useEffect(() => {
    const metadata = pageMetadata[page] || pageMetadata.home
    const canonicalUrl = `${window.location.origin}${page === 'home' ? '/' : `/${page}`}`
    const setMeta = (selector, content) => document.querySelector(selector)?.setAttribute('content', content)
    document.title = metadata.title
    setMeta('meta[name="description"]', metadata.description)
    setMeta('meta[name="robots"]', page === 'editor' ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
    setMeta('meta[property="og:title"]', metadata.title)
    setMeta('meta[property="og:description"]', metadata.description)
    setMeta('meta[property="og:url"]', canonicalUrl)
    setMeta('meta[property="og:image"]', `${window.location.origin}/og-card.png`)
    setMeta('meta[property="og:image:secure_url"]', `${window.location.origin}/og-card.png`)
    setMeta('meta[name="twitter:title"]', metadata.title)
    setMeta('meta[name="twitter:description"]', metadata.description)
    setMeta('meta[name="twitter:image"]', `${window.location.origin}/og-card.png`)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)
  }, [page])

  const selectedTemplate = templates.find((item) => item.id === template) || templates[0]
  const update = (key, value) => setResume((current) => ({ ...current, [key]: value }))
  const updateEntry = (section, index, key, value) => setResume((current) => {
    const entries = current[section].map((entry, entryIndex) => entryIndex === index ? { ...entry, [key]: value } : entry)
    return { ...current, [section]: entries }
  })
  const addEntry = (section) => update(section, [...resume[section], { role: 'New title', company: 'Company name', dates: '2024 — 2025', description: 'Add a short, specific description of your impact.' }])
  const removeEntry = (section, index) => update(section, resume[section].filter((_, entryIndex) => entryIndex !== index))

  if (page === 'editor') return <Editor {...{ resume, update, updateEntry, addEntry, removeEntry, template, setTemplate, selectedTemplate, settings, setSettings, setPage, theme, setTheme: setThemePreference }} />
  if (page === 'guide' || page === 'privacy' || page === 'about') return <Article page={page} setPage={setPage} theme={theme} setTheme={setThemePreference} />
  return <Home setPage={setPage} setTemplate={(id) => { setTemplate(id); setPage('editor') }} theme={theme} setTheme={setThemePreference} />
}

export function RoutedApp() {
  return <BrowserRouter><App /></BrowserRouter>
}

function Nav({ setPage, editor = false, onPrint, theme, setTheme }) {
  const openTemplates = () => {
    const scrollToTemplates = () => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (window.location.pathname !== '/') {
      setPage('home')
      window.setTimeout(scrollToTemplates, 100)
      return
    }
    scrollToTemplates()
  }

  return <nav className="nav">
    <button className="brand" onClick={() => setPage('home')}><span className="brand-mark">r</span> resumé<span className="brand-dot">.</span></button>
    <div className="nav-links">
      <button onClick={openTemplates}>Templates</button>
      <button onClick={() => setPage('guide')}>Guide</button>
      <button onClick={() => setPage('about')}>About</button>
    </div>
    {!editor && <button className="nav-cta" onClick={() => setPage('editor')}>Build my resume <span>↗</span></button>}
    <button className="theme-toggle" title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><span>{theme === 'dark' ? '☼' : '◐'}</span></button>
    {editor && <button className="text-button print-action" onClick={onPrint}>Print resume <span>↗</span></button>}
  </nav>
}

function Home({ setPage, setTemplate, theme, setTheme }) {
  return <div className="site-shell">
    <Nav setPage={setPage} theme={theme} setTheme={setTheme} />
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> Resumé, but make it yours.</p>
          <h1>A resume that<br /><em>feels like you.</em></h1>
          <p className="hero-lede">Thoughtful templates, smart defaults, and a calm little editor. Make a resume you’re proud to send.</p>
          <div className="hero-actions"><button className="primary-button" onClick={() => setPage('editor')}>Start building <span>↗</span></button><button className="quiet-button" onClick={() => setPage('guide')}>How it works <span>↓</span></button></div>
          <div className="hero-proof"><div className="avatar-stack"><span>AS</span><span>MK</span><span>JR</span><span>+</span></div><p><strong>Made for real applications</strong><br />private, local, and yours</p></div>
        </div>
        <div className="hero-art">
          <div className="art-note note-one">Design<br /><strong>with intent</strong></div><div className="art-note note-two">Good work<br /><strong>deserves a good<br />first impression.</strong></div>
          <div className="hero-resume"><div className="resume-mini-head"><span className="mini-avatar">A</span><span><b>AMOR ZEPHYR</b><small>Product designer & builder</small></span></div><div className="mini-rule" /><div className="mini-columns"><div><i /><i /><i /><i /></div><div><b /><b /><b /><b /><b /></div></div></div>
          <span className="art-scribble">✳</span>
        </div>
      </section>
      <section className="templates-section" id="templates">
        <div className="section-heading"><div><p className="eyebrow">Start somewhere good</p><h2>Ten ways to <em>stand out.</em></h2></div><p>Choose a visual point of view, then make it yours.<br />Every template keeps the focus on your work.</p></div>
        <div className="template-grid">{templates.map((item, index) => <TemplateCard key={item.id} item={item} index={index} onClick={() => setTemplate(item.id)} />)}</div>
      </section>
      <section className="value-strip"><div><span className="value-icon">✦</span><b>Designed with intention</b><p>Clear hierarchy, expressive type, and enough room to think.</p></div><div><span className="value-icon">↗</span><b>Easy to make your own</b><p>Choose a direction, write your story, and refine in real time.</p></div><div><span className="value-icon">⌁</span><b>Private by default</b><p>Your resume stays in this browser. No account or upload required.</p></div></section>
    </main>
    <Footer setPage={setPage} />
  </div>
}

function TemplateCard({ item, index, onClick }) {
  return <button className={`template-card ${item.className}`} onClick={onClick}><div className="card-top"><span className="card-number">0{index + 1}</span><span className="card-arrow">↗</span></div><div className="template-preview"><span className="preview-name">Amor Zephyr</span><span className="preview-role">Product designer</span><div className="preview-lines"><i /><i /><i /><i /><i /></div></div><div className="card-label"><div><b>{item.name}</b><small>{item.type} · {item.tone}</small></div><span>{item.description}</span></div></button>
}

function Editor({ resume, update, updateEntry, addEntry, removeEntry, template, setTemplate, selectedTemplate, settings, setSettings, setPage, theme, setTheme }) {
  const [tab, setTab] = useState('content')
  const [saved, setSaved] = useState(false)
  const [printMode, setPrintMode] = useState(false)
  const [printScale, setPrintScale] = useState(1)
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 1800) }
  const handlePrint = () => {
    setPrintMode(true)
    requestAnimationFrame(() => {
      const paper = document.querySelector('.print-root .resume-paper')
      const pageHeight = (297 / 25.4) * 96
      const measuredHeight = paper?.scrollHeight || pageHeight
      const nextScale = Math.min(1, pageHeight / measuredHeight)
      setPrintScale(nextScale)
      requestAnimationFrame(() => {
        window.focus()
        window.print()
        window.setTimeout(() => {
          setPrintMode(false)
          setPrintScale(1)
        }, 500)
      })
    })
  }
  const toggle = (name) => update('sections', { ...resume.sections, [name]: !resume.sections[name] })
  return <div className={`editor-shell ${printMode ? 'is-printing' : ''}`} style={{ '--accent': settings.accent, '--resume-scale': `${settings.scale / 100}`, '--resume-spacing': `${settings.spacing / 100}` }}>
    <Nav setPage={setPage} editor onPrint={handlePrint} theme={theme} setTheme={setTheme} />
    <div className="editor-layout">
      <aside className="editor-panel">
        <div className="editor-title"><div><p className="eyebrow">Resume builder</p><h2>Shape your<br /><em>next move.</em></h2></div><button className="close-editor" aria-label="Close editor" onClick={() => setPage('home')}>×</button></div>
        <div className="editor-tabs"><button className={tab === 'content' ? 'active' : ''} onClick={() => setTab('content')}>Content</button><button className={tab === 'style' ? 'active' : ''} onClick={() => setTab('style')}>Style</button></div>
        {tab === 'content' ? <div className="form-scroll"><Field label="Your name" value={resume.fullName} onChange={(value) => update('fullName', value)} /><Field label="Role / headline" value={resume.role} onChange={(value) => update('role', value)} /><div className="form-row"><Field label="Email" value={resume.email} onChange={(value) => update('email', value)} /><Field label="Phone" value={resume.phone} onChange={(value) => update('phone', value)} /></div><div className="form-row"><Field label="Location" value={resume.location} onChange={(value) => update('location', value)} /><Field label="Website" value={resume.website} onChange={(value) => update('website', value)} /></div><FormSection title="About you" enabled={resume.sections.summary} toggle={() => toggle('summary')}><textarea value={resume.summary} onChange={(event) => update('summary', event.target.value)} /></FormSection><EntryEditor title="Experience" entries={resume.experience} section="experience" updateEntry={updateEntry} addEntry={addEntry} removeEntry={removeEntry} enabled={resume.sections.experience} toggle={() => toggle('experience')} /><EntryEditor title="Education" entries={resume.education} section="education" updateEntry={updateEntry} addEntry={addEntry} removeEntry={removeEntry} enabled={resume.sections.education} toggle={() => toggle('education')} /><FormSection title="Skills" enabled={resume.sections.skills} toggle={() => toggle('skills')}><input value={resume.skills.join(', ')} onChange={(event) => update('skills', event.target.value.split(',').map((skill) => skill.trim()).filter(Boolean))} /></FormSection></div> : <StylePanel {...{ template, setTemplate, settings, setSettings }} />}
        <div className="editor-footer"><button className="save-button" onClick={save}>{saved ? 'Saved ✓' : 'Save progress'}</button><span>Saved privately in this browser</span></div>
      </aside>
      <main className="preview-area"><div className="preview-toolbar"><span><i className="status-dot" /> Live preview</span><span>{selectedTemplate.name} template</span></div><ResumePreview resume={resume} template={template} settings={settings} /></main>
    </div>
    <div className="print-root" style={{ '--print-scale': printScale }} aria-hidden="true"><ResumePreview resume={resume} template={template} settings={settings} /></div>
  </div>
}

function Field({ label, value, onChange }) { return <label className="field"><span>{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} /></label> }
function FormSection({ title, enabled, toggle, children }) { return <section className={`form-section ${enabled ? '' : 'disabled'}`}><div className="form-section-head"><b>{title}</b><button onClick={toggle}>{enabled ? 'Hide' : 'Show'}</button></div>{enabled && children}</section> }
function EntryEditor({ title, entries, section, updateEntry, addEntry, removeEntry, enabled, toggle }) { return <FormSection title={title} enabled={enabled} toggle={toggle}>{entries.map((entry, index) => <div className="entry-form" key={`${section}-${index}`}><div className="entry-form-head"><span>0{index + 1}</span>{entries.length > 1 && <button onClick={() => removeEntry(section, index)}>Remove</button>}</div><div className="form-row"><Field label="Title" value={entry.role} onChange={(value) => updateEntry(section, index, 'role', value)} /><Field label="Dates" value={entry.dates} onChange={(value) => updateEntry(section, index, 'dates', value)} /></div><Field label="Organization" value={entry.company} onChange={(value) => updateEntry(section, index, 'company', value)} /><textarea value={entry.description} onChange={(event) => updateEntry(section, index, 'description', event.target.value)} /></div>)}<button className="add-button" onClick={() => addEntry(section)}>+ Add another</button></FormSection> }
function StylePanel({ template, setTemplate, settings, setSettings }) { const fonts = ['Outfit', 'ComicShannsMono Nerd Font']; return <div className="style-panel"><p className="panel-caption">Choose a resume identity</p><div className="style-templates">{templates.map((item) => <button key={item.id} className={template === item.id ? 'selected' : ''} onClick={() => setTemplate(item.id)}><span className={`style-swatch ${item.className}`} />{item.name}<small>{item.type}</small></button>)}</div><label className="font-field"><span>Resume font</span><select value={settings.font} onChange={(event) => setSettings({ ...settings, font: event.target.value })}>{fonts.map((font) => <option key={font}>{font}</option>)}</select></label><p className="panel-caption">Accent color</p><div className="color-picker-row"><input aria-label="Choose any accent color" type="color" value={settings.accent} onChange={(event) => setSettings({ ...settings, accent: event.target.value })} /><input aria-label="Accent hex value" value={settings.accent} onChange={(event) => setSettings({ ...settings, accent: event.target.value })} /></div><p className="panel-caption icon-caption">Choose your icon language</p><div className="icon-picker">{iconNames.map((name) => <button aria-label={`Use ${name} icon`} className={settings.icon === name ? 'selected' : ''} key={name} onClick={() => setSettings({ ...settings, icon: name })}><Icon name={name} /></button>)}</div><Range label="Type scale" value={settings.scale} onChange={(value) => setSettings({ ...settings, scale: value })} min="90" max="110" /><Range label="Section spacing" value={settings.spacing} onChange={(value) => setSettings({ ...settings, spacing: value })} min="80" max="120" /></div> }
function Range({ label, value, onChange, min, max }) { return <label className="range-field"><span>{label}<b>{value}%</b></span><input type="range" min={min} max={max} value={value} onChange={(event) => onChange(event.target.value)} /></label> }

function ResumePreview({ resume, template, settings }) { const websiteUrl = resume.website.startsWith('http') ? resume.website : `https://${resume.website}`; return <article className={`resume-paper ${templates.find((item) => item.id === template)?.className || ''}`} style={{ fontFamily: settings.font }}><header className="resume-header"><div className="resume-identity"><span className="resume-icon"><Icon name={settings.icon || resume.icon} size={22} /></span><div><h1>{resume.fullName}</h1><p>{resume.role}</p></div></div><div className="contact-line"><a href={`mailto:${resume.email}`}>{resume.email}</a> <i /> <a href={`tel:${resume.phone}`}>{resume.phone}</a> <i /> {resume.location} <i /> <a href={websiteUrl}>{resume.website}</a></div></header><div className="resume-body"><div className="resume-main">{resume.sections.summary && <ResumeSection title="Profile"><p className="resume-summary">{resume.summary}</p></ResumeSection>}{resume.sections.experience && <ResumeSection title="Experience">{resume.experience.map((item, index) => <ResumeEntry key={index} {...item} />)}</ResumeSection>}{resume.sections.education && <ResumeSection title="Education">{resume.education.map((item, index) => <ResumeEntry key={index} {...item} />)}</ResumeSection>}</div>{resume.sections.skills && <aside className="resume-side"><ResumeSection title="Skills"><ul className="skill-list">{resume.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></ResumeSection><ResumeSection title="Details"><p>{resume.location}</p><p><a href={`mailto:${resume.email}`}>{resume.email}</a></p><p><a href={websiteUrl}>{resume.website}</a></p></ResumeSection></aside>}</div></article> }
function ResumeSection({ title, children }) { return <section className="resume-section"><h2>{title}</h2>{children}</section> }
function ResumeEntry({ role, company, dates, description }) { return <div className="resume-entry"><div className="entry-top"><h3>{role}</h3><span>{dates}</span></div><b>{company}</b><p>{description}</p></div> }

function Article({ page, setPage, theme, setTheme }) {
  const content = {
    guide: {
      kicker: 'The practical resume guide',
      title: <>Write a resume<br /><em>worth reading.</em></>,
      intro: 'A strong resume is not a biography. It is a clear, useful invitation to learn more about the way you think, the problems you solve, and the work you can do.',
      sections: [
        ['Lead with the role you want', 'Your name and headline should make your direction obvious in seconds. Say what you do, who you help, or what kind of problems you solve. A focused headline gives every other section a job.'],
        ['Turn responsibilities into proof', 'Replace a list of duties with evidence. Explain what changed because you were there, then add a real number, time frame, scale, or result when you have one. Never invent a metric—specific and honest beats impressive and vague.'],
        ['Make the page easy to scan', 'Use familiar section names such as Profile, Experience, Education, and Skills. Keep entries short, use consistent dates, and leave enough whitespace that a reader can find the important parts without working for them.'],
        ['Choose a template that matches your signal', 'Technical resumes benefit from structure and precision. Creative resumes can show more personality. Executive resumes need calm hierarchy. Choose a visual direction that supports your work instead of competing with it.'],
        ['Tailor the details, not your identity', 'For each application, adjust the headline, summary, skills, and order of experience toward the role. A good resume builder should make this easy without asking you to rewrite your whole story every time.'],
        ['Do a final export check', 'Open every link, check the dates, read the page aloud, and print or preview the PDF before sending it. A polished resume is not about perfection; it is about removing the small distractions that make good work harder to see.'],
      ],
    },
    about: {
      kicker: 'A small tool with a clear point of view',
      title: <>Good work deserves<br /><em>a good first impression.</em></>,
      intro: 'resumé. is a thoughtful resume builder for people who care about what they make. It helps you turn experience, potential, and unfinished ideas into a document you are proud to send.',
      sections: [
        ['Built for thoughtful applications', 'Most resume tools make you choose between rigid forms and over-designed templates. resumé. keeps the structure useful and the visual language expressive, so the result can feel professional without feeling generic.'],
        ['Expressive, not decorative', 'The template collection is designed for different kinds of work: technical, editorial, creative, executive, portfolio, and everything in between. Typography, spacing, and hierarchy do the heavy lifting so decoration never gets in the way.'],
        ['Private by default', 'Your resume is saved locally in this browser. There is no account to create, no profile to maintain, and no server-side resume database quietly collecting your personal details.'],
        ['Made to get out of the way', 'The editor is intentionally small. Write your story, switch directions, see the result immediately, and print when it feels right. The goal is not more features; it is a better moment between you and your next opportunity.'],
      ],
    },
    privacy: {
      kicker: 'The uninteresting but important bit',
      title: <>Your words are<br /><em>your business.</em></>,
      intro: 'resumé. is designed to work without an account or a server-side resume profile. Here is the short version of what that means.',
      sections: [
        ['Local by default', 'Resume content, template choices, theme preferences, and editor settings are saved in local browser storage on your device. Clearing that browser data removes the saved copy.'],
        ['No resume upload', 'The editor does not send your resume content to a server to create the live preview or print output. Your work stays in the browser while you use the app.'],
        ['A note on external links', 'The resume preview can include email, phone, and website links that you enter. Those links open the relevant application or website, whose privacy practices are separate from resumé.'],
      ],
    },
  }[page]

  return <div className="site-shell article-shell"><Nav setPage={setPage} theme={theme} setTheme={setTheme} /><main className="article-page"><p className="eyebrow"><span className="eyebrow-line" /> {content.kicker}</p><h1>{content.title}</h1><p className="article-intro">{content.intro}</p><div className="article-sections">{content.sections.map(([title, text], index) => <section key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{title}</h2><p>{text}</p></div></section>)}</div><button className="primary-button" onClick={() => setPage('editor')}>Make your resume <span>↗</span></button></main><Footer setPage={setPage} /></div>
}
function Footer({ setPage }) { return <footer><button className="brand" onClick={() => setPage('home')}><span className="brand-mark">r</span> resumé<span className="brand-dot">.</span></button><p>Made for the next good thing.</p><div><button onClick={() => setPage('guide')}>Guide</button><button onClick={() => setPage('privacy')}>Privacy</button><button onClick={() => setPage('about')}>About</button></div></footer> }

export default App
