import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Real-time functional feature: Automated system performance tracking
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    const performanceData = window.performance.timing;
    const loadMetric = performanceData.loadEventEnd - performanceData.navigationStart;
    console.info(`[AnyAstro Architecture] Corporate network ignition complete. Active load metric: ${loadMetric}ms`);
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)