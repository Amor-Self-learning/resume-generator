import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <Link to="/" className="brand" aria-label="resumé. home">
        <span className="brand-mark">r</span>
        resumé<span className="brand-dot">.</span>
      </Link>
      <p>Made for the next good thing.</p>
      <div className="footer-links">
        <Link to="/guide">Guide</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/about">About</Link>
      </div>
    </footer>
  );
}