import { Outlet, useLocation } from 'react-router-dom';
import { Nav } from './Nav';
import { Footer } from './Footer';

export function Layout() {
  const location = useLocation();
  const isEditor = location.pathname === '/editor';

  return (
    <div className="site-shell">
      <Nav />
      <main id="main-content" className={isEditor ? '' : 'main-content'}>
        <Outlet />
      </main>
      {!isEditor && <Footer />}
    </div>
  );
}