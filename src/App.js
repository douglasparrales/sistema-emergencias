import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import FuenteAlertas from './pages/FuenteAlertas';
import GestionVoluntarios from './pages/GestionVoluntarios';
import CentroAyuda from './pages/CentroAyuda';
import MapaZonas from './pages/MapaZonas';
import AccesibilidadMenu from './components/AccesibilidadMenu';

const App = () => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [mostrarAccesibilidad, setMostrarAccesibilidad] = useState(false);
  const [altoContraste, setAltoContraste] = useState(false);
  const [zoomActivado, setZoomActivado] = useState(false);
  const [subtitulosCerrados, setSubtitulosCerrados] = useState(false);


  const handleLogin = (usuario) => {
    setUsuarioLogueado(usuario);
  };

  const handleLogout = () => {
    setUsuarioLogueado(null);
  };

  return (
    <Router>
      <div id="accesibilidad-contenedor">
        <Navbar
          usuario={usuarioLogueado}
          onLogin={handleLogin}
          onLogout={handleLogout}
          toggleAccMenu={() => setMostrarAccesibilidad(prev => !prev)}
        />
        <AccesibilidadMenu
          mostrar={mostrarAccesibilidad}
          altoContraste={altoContraste}
          setAltoContraste={setAltoContraste}
          zoomActivado={zoomActivado}
          setZoomActivado={setZoomActivado}
          subtitulosCerrados={subtitulosCerrados}
          setSubtitulosCerrados={setSubtitulosCerrados}
        />

        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={
              <Dashboard accessibility={{
                altoContraste,
                zoomActivado,
                subtitulosCerrados
              }} />
            } />

            <Route path="/fuente-alertas" element={<FuenteAlertas />} />
            <Route path="/gestion-voluntarios" element={<GestionVoluntarios />} />
            <Route path="/centro-ayuda" element={<CentroAyuda />} />
            <Route path="/zonas-seguras" element={<MapaZonas />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
