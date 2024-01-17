import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/app/App.js';
import { DocumentProvider } from './contexts/DocumentsContext.js';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DocumentProvider>
      <App />
    </DocumentProvider>
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      (registration) => {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        );
      },
      (err) => {
        console.log('ServiceWorker registration failed: ', err);
      }
    );
  });
}
