import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import FuenteAlertas from './pages/FuenteAlertas';
import GestionVoluntarios from './pages/GestionVoluntarios';
import CentroAyuda from './pages/CentroAyuda';
import MapaZonas from './pages/MapaZonas';

const App = () => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  const handleLogin = (usuario) => {
    setUsuarioLogueado(usuario);
  };

  const handleLogout = () => {
    setUsuarioLogueado(null);
  };

  return (
    <Router>
      <Navbar usuario={usuarioLogueado} onLogin={handleLogin} onLogout={handleLogout} />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/fuente-alertas" element={<FuenteAlertas />} />
          <Route path="/gestion-voluntarios" element={<GestionVoluntarios />} />
          <Route path="/centro-ayuda" element={<CentroAyuda />} />
          <Route path="/zonas-seguras" element={<MapaZonas />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
