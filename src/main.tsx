import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// 1. Importas esta línea nueva
import { defineCustomElements } from '@ionic/pwa-elements/loader';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 2. Ejecutas la función al final del archivo
defineCustomElements(window);