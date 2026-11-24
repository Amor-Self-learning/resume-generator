import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, ResumeProvider } from '@context';
import { AppRoutes } from './routes';
import './styles.css';

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ResumeProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ResumeProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export function RoutedApp() {
  return <App />;
}

export default App;
