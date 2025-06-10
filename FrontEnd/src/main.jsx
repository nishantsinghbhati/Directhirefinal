import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css'
import App from './App.jsx'
import SmoothScrollWrapper from '../components/Smoothscrole.jsx';
import './assets/fonts/WEB/css/clash-display.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
      <SmoothScrollWrapper>
        <App />
        </SmoothScrollWrapper>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
); 
