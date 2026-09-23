import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// Clean up any service workers left over from an earlier PWA experiment so the
// browser stops requesting /sw.js (which no longer exists).
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((r) => r.unregister());
    }).catch(() => {});
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)