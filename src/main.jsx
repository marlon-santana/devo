import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./AuthContext";
import { DebtorsProvider } from "./DebtorsContext";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <React.StrictMode>
    <AuthProvider>
      <DebtorsProvider>
      <App />
      </DebtorsProvider>
    </AuthProvider>
  </React.StrictMode>
  </StrictMode>,
)
