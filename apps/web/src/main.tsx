import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from './components/theme/theme-provider'
import { Router } from './routes'

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <ThemeProvider storageKey="synapse-theme" defaultTheme="dark">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
