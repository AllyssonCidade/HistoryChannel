import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './Routes/routes';
import { AuthProvider } from './componentes/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);
