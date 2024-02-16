import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/login/login';
import ClientPage from '../pages/gerencia/cliente';
import EstagiarioPage from '../pages/gerencia/estagiario';
import ProfessorPage from '../pages/gerencia/professor';
import ProcessoPage from '../pages/gerencia/processo';
import RelatorioPage from '../pages/gerencia/relatorio';
import HomePage from '../pages/home/home';


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/client" element={<ClientPage />} />
        <Route path="/estagiario" element={<EstagiarioPage />} />
        <Route path="/professor" element={<ProfessorPage />} />
        <Route path="/processo" element={<ProcessoPage />} />
        <Route path="/relatorio" element={<RelatorioPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Router