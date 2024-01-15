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
