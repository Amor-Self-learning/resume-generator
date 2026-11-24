# resumé. — Thoughtful Resume Builder

A modern, private, local-first resume builder built with React 19, TypeScript, and Vite.

## Features

- **Ten Distinct Visual Styles**: Still (minimalist), Signal (modernist), Ledger (editorial), Play (playful), Summit (executive), Field (organic), Terminal (developer), Orbit (bold), Frame (geometric), and Proof (academic).
- **Live Preview & Styling**: Personalize each resume with its own typography, accent color, type scale, section spacing, icon, and page size.
- **Comprehensive Resume Sections**:
  - Personal details & headlines
  - Profile / Summary
  - Experience & Education entries
  - Skills with tags
  - Key Achievements
  - Interests & Hobbies
- **Private & Local-First**: All resume data, template selections, and theme preferences persist privately in browser `localStorage`.
- **Export & Print**: Select A4, US Letter, or US Legal. PDF and browser printing flow naturally across as many pages as the resume needs.
- **Keyboard Shortcuts**: Quick actions for power users (Ctrl+S to save, Ctrl+E to export PDF, Ctrl+P to print, Ctrl+T to toggle theme).
- **SEO & PWA**: Accessible markup, structured metadata with `react-helmet-async`, and offline PWA support.

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Type Checking & Testing
```bash
npm run typecheck
npm run test:run
npm run lint
```

### Production Build
```bash
npm run build
```
