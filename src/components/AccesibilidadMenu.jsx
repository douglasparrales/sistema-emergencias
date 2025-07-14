import React, { useEffect, useState } from "react";

const AccesibilidadMenu = ({ mostrar }) => {
  const [altoContraste, setAltoContraste] = useState(false);
  const [tamañoTexto, setTamañoTexto] = useState(100); // porcentaje base 100%
  const [resaltarFoco, setResaltarFoco] = useState(false);
  // Nuevas opciones para discapacidad auditiva
  const [subtitulosCerrados, setSubtitulosCerrados] = useState(false);
  const [alertasVisuales, setAlertasVisuales] = useState(false);

  // Aplicar/remover modo contraste globalmente (permanece activo aunque el menú esté oculto)
  useEffect(() => {
    if (altoContraste) {
      document.body.classList.add("modo-contraste");
    } else {
      document.body.classList.remove("modo-contraste");
    }
  }, [altoContraste]);

  // Cambiar tamaño de texto global
  useEffect(() => {
    document.body.style.fontSize = `${tamañoTexto}%`;
  }, [tamañoTexto]);

  // Resaltar foco global
  useEffect(() => {
    if (resaltarFoco) {
      document.body.classList.add("resaltar-foco");
    } else {
      document.body.classList.remove("resaltar-foco");
    }
  }, [resaltarFoco]);

  // Alertas visuales global (puedes personalizar el efecto)
  useEffect(() => {
    if (alertasVisuales) {
      document.body.classList.add("alertas-visuales");
    } else {
      document.body.classList.remove("alertas-visuales");
    }
  }, [alertasVisuales]);

  // No renderizar menú si mostrar es false
  if (!mostrar) return null;

  return (
    <div
      id="menu-accesibilidad"
      style={{
        position: "fixed",
        bottom: "80px",       // Fijo abajo para que siempre esté visible aunque scroll
        right: "20px",
        backgroundColor: "#fff",
        border: "2px solid #4caf50",
        borderRadius: "8px",
        padding: "1rem",
        width: "320px",
        maxHeight: "70vh",
        overflowY: "auto",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        zIndex: 1500,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
      aria-label="Opciones de accesibilidad"
      role="region"
    >
      <h3 style={{ marginTop: 0, color: "#4caf50" }}>Opciones de Accesibilidad</h3>

      {/* Opciones discapacidad visual */}
      <label style={{ display: "block", marginBottom: "10px", cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={altoContraste}
          onChange={() => setAltoContraste(!altoContraste)}
          style={{ marginRight: "8px" }}
        />
        Modo Alto Contraste
      </label>

      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="tamañoTexto" style={{ display: "block", marginBottom: "4px" }}>
          Tamaño de Texto: {tamañoTexto}%
        </label>
        <input
          type="range"
          id="tamañoTexto"
          min="75"
          max="150"
          value={tamañoTexto}
          onChange={(e) => setTamañoTexto(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>

      <label style={{ display: "block", marginBottom: "20px", cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={resaltarFoco}
          onChange={() => setResaltarFoco(!resaltarFoco)}
          style={{ marginRight: "8px" }}
        />
        Resaltar Foco y Enlaces
      </label>

      {/* Opciones discapacidad auditiva */}
      <h4 style={{ color: "#388e3c", marginBottom: "10px" }}>Opciones para discapacidad auditiva</h4>

      <label style={{ display: "block", marginBottom: "10px", cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={subtitulosCerrados}
          onChange={() => setSubtitulosCerrados(!subtitulosCerrados)}
          style={{ marginRight: "8px" }}
        />
        Subtítulos cerrados (videos)
      </label>

      <label style={{ display: "block", marginBottom: "10px", cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={alertasVisuales}
          onChange={() => setAlertasVisuales(!alertasVisuales)}
          style={{ marginRight: "8px" }}
        />
        Alertas visuales alternativas
      </label>

      <div style={{ fontSize: "0.9rem", color: "#555", marginTop: "1rem" }}>
        <p><strong>Navegación por teclado:</strong> Use Tab para moverse.</p>
        <p><strong>Lector de pantalla:</strong> Use el lector predeterminado del sistema.</p>
      </div>

      <style>{`
        .modo-contraste {
          background-color: #000 !important;
          color: #fff !important;
          filter: invert(1) hue-rotate(180deg);
        }
        .modo-contraste #menu-accesibilidad {
          filter: invert(1) hue-rotate(180deg);
        }
        .resaltar-foco *:focus {
          outline: 3px solid #4caf50 !important;
          outline-offset: 3px;
        }
        .alertas-visuales {
          outline: 4px dashed #f44336;
          animation: parpadeo 1.5s infinite;
        }
        @keyframes parpadeo {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default AccesibilidadMenu;
