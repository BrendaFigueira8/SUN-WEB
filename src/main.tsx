import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { CreatePlanning } from './pages/CreatePlanning';
import { ViewPlanning } from './pages/ViewPlanning';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/criar-planejamento" element={<CreatePlanning />} />
        <Route path="/visualizar-planejamento" element={<ViewPlanning />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
