import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Login from '../pages/Login';
import './Navbar.css';
import { Accessibility } from "lucide-react";

const Navbar = ({ usuario, onLogin, onLogout, toggleAccMenu }) => {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);

  const isActive = (path) => (location.pathname === path ? 'active-link' : '');

  const handleLoginClick = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleLoginSuccess = (usuario) => {
    onLogin(usuario);
    setShowLogin(false);
  };

  return (
    <>
      <nav className="navbar">
        <h2>Sistema de Emergencias</h2>
        <ul className="nav-links">
          <li><Link className={isActive('/')} to="/">Inicio</Link></li>
          <li><Link className={isActive('/fuente-alertas')} to="/fuente-alertas">Fuente de Alertas</Link></li>
          <li><Link className={isActive('/gestion-voluntarios')} to="/gestion-voluntarios">Gestión Voluntarios</Link></li>
          <li><Link className={isActive('/centro-ayuda')} to="/centro-ayuda">Centro de Ayuda</Link></li>
          <li><Link className={isActive('/zonas-seguras')} to="/zonas-seguras">Mapa de Zonas Seguras</Link></li>
        </ul>

        <div className="nav-login-section">
          {usuario ? (
            <>
              <span className="nav-usuario">Hola, {usuario}</span>
              <button onClick={onLogout} className="btn-logout">Cerrar sesión</button>
            </>
          ) : (
            <button onClick={handleLoginClick} className="btn-login">Iniciar sesión</button>
          )}
        </div>
      </nav>

      {/* Botón de accesibilidad flotante */}
      <button
        onClick={toggleAccMenu}
        style={{
          backgroundColor: "#4caf50",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "fixed",
          bottom: "20px",  // Lo colocamos abajo para no tapar menú (que está a bottom: 80px)
          right: "20px",
          zIndex: 1100,
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        }}
        title="Opciones de accesibilidad"
        aria-label="Abrir menú de accesibilidad"
      >
        <Accessibility color="white" size={24} />
      </button>

      {showLogin && (
        <div className="login-modal">
          <div className="login-modal-content">
            <button className="close-btn" onClick={handleCloseLogin}>&times;</button>
            <Login onLogin={handleLoginSuccess} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
