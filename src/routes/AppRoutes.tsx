import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@components/layout';
import { Home, Editor, Guide, About, Privacy } from '@pages';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
