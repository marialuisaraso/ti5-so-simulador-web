import React from 'react';
import ReactDOM from 'react-dom/client';
import Simulador from './view/Simulador';
import { CpuProvider } from './view/context/CpuContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CpuProvider>
      <Simulador />
    </CpuProvider>
  </React.StrictMode>
);
