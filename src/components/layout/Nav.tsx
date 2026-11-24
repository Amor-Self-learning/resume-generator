import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@context';

export function Nav() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isEditor = location.pathname === '/editor';

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <Link to="/" className="brand" aria-label="resumé. home">
        <span className="brand-mark">r</span> resumé<span className="brand-dot">.</span>
      </Link>

      <div className="nav-links">
        <Link to="/#templates">
          Templates
        </Link>
        <Link to="/guide" className={location.pathname === '/guide' ? 'active' : ''}>
          Guide
        </Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
          About
        </Link>
      </div>

      {!isEditor ? (
        <Link to="/editor" className="nav-cta">
          Build my resume <span>↗</span>
        </Link>
      ) : (
        <button
          type="button"
          className="text-button print-action"
          onClick={() => window.print()}
          style={{ marginLeft: 'auto' }}
        >
          Print resume <span>↗</span>
        </button>
      )}

      <button
        type="button"
        className="theme-toggle"
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        onClick={toggleTheme}
      >
        <span>{theme === 'dark' ? '☼' : '◐'}</span>
      </button>
    </nav>
  );
}