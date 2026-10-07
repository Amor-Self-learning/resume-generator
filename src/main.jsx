import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RoutedApp } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoutedApp />
  </StrictMode>,
)
