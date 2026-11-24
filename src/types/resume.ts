export interface ResumeData {
  fullName: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillEntry[];
  achievements: AchievementEntry[];
  hobbies: HobbyEntry[];
  sections: SectionsVisibility;
  icon: string;
  template: string;
  theme: 'light' | 'dark';
  fontFamily: string;
  fontSize: number;
  accentColor: string;
  pageSize: ResumePageSize;
  scale?: number;
  spacing?: number;
}

export const PAGE_SIZES = {
  A4: { label: 'A4', css: 'A4', pdf: 'A4', width: '210mm', height: '297mm' },
  Letter: { label: 'US Letter', css: 'letter', pdf: 'LETTER', width: '8.5in', height: '11in' },
  Legal: { label: 'US Legal', css: 'legal', pdf: 'LEGAL', width: '8.5in', height: '14in' },
} as const;

export type ResumePageSize = keyof typeof PAGE_SIZES;

export function isResumePageSize(value: unknown): value is ResumePageSize {
  return typeof value === 'string' && Object.hasOwn(PAGE_SIZES, value);
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  dates: { start: string; end: string } | string;
  description: string;
}

export interface EducationEntry {
  id: string;
  role: string;
  company: string;
  dates: { start: string; end: string } | string;
  description: string;
}

export interface SkillEntry {
  id: string;
  label: string;
  initialValue: number;
}

export interface AchievementEntry {
  id: string;
  title: string;
  value: string;
}

export interface HobbyEntry {
  id: string;
  value: string;
}

export interface SectionsVisibility {
  summary: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
  achievements: boolean;
  hobbies: boolean;
}

export interface Template {
  id: string;
  name: string;
  type: string;
  description: string;
  tone: string;
  className: string;
}

export const TEMPLATES: Template[] = [
  { id: 'atelier', name: 'Still', type: 'Minimalist', description: 'A quiet, single-column layout with generous breathing room.', tone: 'Paper', className: 'template-atelier' },
  { id: 'signal', name: 'Signal', type: 'Modernist', description: 'A crisp color-block header and information-led side rail.', tone: 'Sky', className: 'template-signal' },
  { id: 'ledger', name: 'Ledger', type: 'Editorial', description: 'Serif headlines and a composed magazine-style grid.', tone: 'Ink', className: 'template-ledger' },
  { id: 'canvas', name: 'Play', type: 'Playful', description: 'Soft color, rounded details, and an expressive personality.', tone: 'Lilac', className: 'template-canvas' },
  { id: 'summit', name: 'Summit', type: 'Executive', description: 'A confident, compact hierarchy for leadership profiles.', tone: 'Olive', className: 'template-summit' },
  { id: 'studio', name: 'Field', type: 'Organic', description: 'Warm, tactile experience cards for makers and creatives.', tone: 'Moss', className: 'template-studio' },
  { id: 'terminal', name: 'Terminal', type: 'Developer', description: 'A dark, monospace-inspired system with clear structure.', tone: 'Forest', className: 'template-terminal' },
  { id: 'orbit', name: 'Orbit', type: 'Bold', description: 'A full-bleed midnight banner with a bright accent signal.', tone: 'Cobalt', className: 'template-orbit' },
  { id: 'frame', name: 'Frame', type: 'Geometric', description: 'An architectural side rail and sharply aligned sections.', tone: 'Terracotta', className: 'template-frame' },
  { id: 'proof', name: 'Proof', type: 'Academic', description: 'A restrained, evidence-first layout for research and policy.', tone: 'Berry', className: 'template-proof' },
];

export const DEFAULT_RESUME: ResumeData = {
  fullName: 'Amor Zephyr',
  role: 'Product designer & builder',
  email: 'amor@example.com',
  phone: '+92 300 123 4567',
  location: 'Multan, Pakistan',
  website: 'amorzephyr.dev',
  summary: 'Product designer who turns complex ideas into calm, useful experiences. I enjoy working across research, systems, and the final thoughtful detail.',
  experience: [
    { id: 'exp-1', role: 'Product Designer', company: 'Northstar Studio', dates: { start: '2023', end: 'Present' }, description: 'Led product design for a suite of tools used by 40k+ monthly users. Partnered with engineering and research to turn customer insight into simple workflows.' },
    { id: 'exp-2', role: 'UX Designer', company: 'Field Notes', dates: { start: '2021', end: '2023' }, description: 'Designed mobile and web experiences from early concept through launch, improving activation by 28% across two core journeys.' },
  ],
  education: [
    { id: 'edu-1', role: 'B.S. Computer Science', company: 'NUML Multan', dates: { start: '2021', end: '2025' }, description: 'Focus in human-computer interaction and accessible product development.' },
  ],
  skills: [
    { id: 'skill-1', label: 'Product strategy', initialValue: 90 },
    { id: 'skill-2', label: 'Figma', initialValue: 95 },
    { id: 'skill-3', label: 'Design systems', initialValue: 85 },
    { id: 'skill-4', label: 'User research', initialValue: 80 },
    { id: 'skill-5', label: 'Prototyping', initialValue: 88 },
    { id: 'skill-6', label: 'HTML & CSS', initialValue: 75 },
  ],
  achievements: [
    { id: 'ach-1', title: 'Activation increase', value: 'Improved user activation by 28% across two core product journeys through research-driven redesign.' },
    { id: 'ach-2', title: 'Design system adoption', value: 'Established a design system adopted by 12 product teams, reducing UI inconsistency by 60%.' },
  ],
  hobbies: [
    { id: 'hob-1', value: 'Urban sketching' },
    { id: 'hob-2', value: 'Mechanical keyboards' },
    { id: 'hob-3', value: 'Specialty coffee' },
  ],
  sections: { summary: true, experience: true, education: true, skills: true, achievements: true, hobbies: true },
  icon: 'spark',
  template: 'atelier',
  theme: 'light',
  fontFamily: 'Outfit',
  fontSize: 11,
  accentColor: '#6c58ed',
  pageSize: 'A4',
  scale: 100,
  spacing: 100,
};

export type Page = 'home' | 'editor' | 'guide' | 'about' | 'privacy';

export interface PageMetadata {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export const PAGE_METADATA: Record<Page, PageMetadata> = {
  home: {
    title: 'resumé. — make your work easy to remember',
    description: 'resumé. is a thoughtful resume builder with expressive templates, live preview, private local editing, and clean PDF printing.',
    ogTitle: 'Make your work easy to remember. | resumé.',
    ogDescription: 'A thoughtful resume builder with expressive templates, live preview, private local editing, and clean PDF printing.',
    ogImage: 'https://resume-generator-en.vercel.app/og-card.png',
  },
  editor: {
    title: 'Resume Editor — resumé.',
    description: 'Build your resume with expressive templates, live preview, and private local editing.',
    ogTitle: 'Resume Editor | resumé.',
    ogDescription: 'Create a professional resume with our intuitive editor. Choose from expressive templates and export to PDF.',
  },
  guide: {
    title: 'Resume Guide: How to Write a Resume People Remember | resumé.',
    description: 'Practical resume writing advice for clearer headlines, stronger evidence, better structure, and a resume that is easy to read.',
    ogTitle: 'Resume Guide | resumé.',
    ogDescription: 'Practical resume writing advice for clearer headlines, stronger evidence, better structure.',
  },
  about: {
    title: 'About resumé. — a thoughtful resume builder',
    description: 'resumé. is a thoughtful resume builder for people who care about what they make.',
    ogTitle: 'About resumé. | A thoughtful resume builder',
    ogDescription: 'Learn about resumé., a thoughtful resume builder with expressive templates and private local editing.',
  },
  privacy: {
    title: 'Privacy Policy | resumé.',
    description: 'Your words are your business. resumé. is designed to work without an account or server-side resume profile.',
    ogTitle: 'Privacy Policy | resumé.',
    ogDescription: 'resumé. privacy policy. Your data stays in your browser.',
  },
};

export interface IconData {
  name: string;
  path: string;
}

export const ICONS: IconData[] = [
  { name: 'spark', path: 'M10 1.5l1.8 5.7L17.5 5l-3.2 4.8 5.2 2.4-5.9.7.7 5.9-4.3-4.1-4.3 4.1.7-5.9-5.9-.7 5.2-2.4L4.5 5l5.7 2.2L10 1.5z' },
  { name: 'circle', path: 'M10 2.2a7.8 7.8 0 1 0 0 15.6 7.8 7.8 0 0 0 0-15.6z' },
  { name: 'square', path: 'M3 3h14v14H3z' },
  { name: 'triangle', path: 'M10 2l8 15H2L10 2z' },
  { name: 'diamond', path: 'M10 2l8 8-8 8-8-8 8-8z' },
  { name: 'plus', path: 'M10 2v16M2 10h16' },
  { name: 'arrow-up', path: 'M10 17V3m0 0L5 8m5-5 5 5' },
  { name: 'arrow-right', path: 'M3 10h14m0 0-5-5m5 5-5 5' },
  { name: 'arrow-down', path: 'M10 3v14m0 0-5-5m5 5 5-5' },
  { name: 'arrow-left', path: 'M17 10H3m0 0 5-5m-5 5 5 5' },
  { name: 'star', path: 'M10 2l2.4 5.1 5.6.8-4 4 1 5.6-5-2.7-5 2.7 1-5.6-4-4 5.6-.8L10 2z' },
  { name: 'heart', path: 'M10 17S3 13.2 3 7.7A3.7 3.7 0 0 1 10 6a3.7 3.7 0 0 1 7 1.7C17 13.2 10 17 10 17z' },
  { name: 'leaf', path: 'M10 17c-4-2.2-6-5.2-6-9 2.5-.2 4.5.5 6 2 1.5-1.5 3.5-2.2 6-2 0 3.8-2 6.8-6 9z' },
  { name: 'sun', path: 'M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM10 1v2m0 14v2m9-9h-2M3 10H1m15.36-6.36l-1.41 1.41M5.05 14.95l-1.41 1.41m12.72 0l-1.41-1.41M5.05 5.05L3.64 3.64' },
  { name: 'moon', path: 'M16.5 13.5A7.5 7.5 0 0 1 6.5 3.5 8 8 0 1 0 16.5 13.5z' },
  { name: 'shield', path: 'M10 2s6 2 6 7c0 5-6 9-6 9s-6-4-6-9c0-5 6-7 6-7z' },
  { name: 'pen', path: 'M14 2l4 4-11 11H3v-4L14 2z' },
  { name: 'eye', path: 'M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6zm8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' },
  { name: 'download', path: 'M10 3v10m0 0l-4-4m4 4l4-4M3 17h14' },
  { name: 'palette', path: 'M10 2a8 8 0 1 0 5 14.2c.5-.4.8-1 .8-1.7 0-1.4-1.1-2.5-2.5-2.5H12a2 2 0 0 1-2-2c0-.5.2-1 .5-1.4.3-.4.5-.9.5-1.4 0-1.7-1.3-3.2-3-3.2z' },
  { name: 'code', path: 'M6 7l-4 3 4 3m8-6l4 3-4 3m-3-8l-2 10' },
  { name: 'briefcase', path: 'M3 7h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zm4 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2' },
  { name: 'mail', path: 'M3 4h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm0 2l7 5 7-5' },
  { name: 'phone', path: 'M4 3h3l1.5 3.5L6.5 8a11 11 0 0 0 5.5 5.5l1.5-2 3.5 1.5v3a1 1 0 0 1-1 1A15 15 0 0 1 3 4a1 1 0 0 1 1-1z' },
  { name: 'link', path: 'M8 12a4 4 0 0 0 6 0l2-2a4 4 0 0 0-6-6l-1 1m-1 7a4 4 0 0 0-6 0l-2 2a4 4 0 0 0 6 6l1-1' },
  { name: 'trash', path: 'M4 6h12m-10 0v10a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6M7 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2' },
  { name: 'check', path: 'M4 10l4 4 8-8' },
];