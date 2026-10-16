import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import React, { StrictMode } from 'react' // ← AJOUT ICI
import { AppProvider } from './context/AppContext.jsx'
import { MotionConfig } from 'motion/react'


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AppProvider>
            <MotionConfig viewport={{ once: true }}>
                <App />
            </MotionConfig>
        </AppProvider>
    </BrowserRouter>
)

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed: ', err));
    });
}
