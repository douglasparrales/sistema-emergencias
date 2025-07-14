import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Login from '../pages/Login'; // tu formulario Login
import './Navbar.css';

const Navbar = ({ usuario, onLogin, onLogout }) => {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

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
