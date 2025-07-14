import React, { useEffect, useState } from "react";

const AccesibilidadMenu = ({ mostrar }) => {
  const [altoContraste, setAltoContraste] = useState(false);
  const [contrasteSuave, setContrasteSuave] = useState(false);
  const [modoSepia, setModoSepia] = useState(false);
  const [tamañoTexto, setTamañoTexto] = useState(100);
  const [interlineado, setInterlineado] = useState(1.5);
  const [resaltarFoco, setResaltarFoco] = useState(false);
  const [fuenteDislexia, setFuenteDislexia] = useState(false);
  const [alertasVisuales, setAlertasVisuales] = useState(false);
  const [mostrarInstruccionesTeclado, setMostrarInstruccionesTeclado] = useState(false);
  const [modoLecturaFacil, setModoLecturaFacil] = useState(false);

  // Manejar modos de contraste mutuamente excluyentes
  useEffect(() => {
    if (altoContraste) {
      document.body.classList.add("modo-contraste");
      document.body.classList.remove("contraste-suave", "modo-sepia");
    } else if (contrasteSuave) {
      document.body.classList.add("contraste-suave");
      document.body.classList.remove("modo-contraste", "modo-sepia");
    } else if (modoSepia) {
      document.body.classList.add("modo-sepia");
      document.body.classList.remove("modo-contraste", "contraste-suave");
    } else {
      document.body.classList.remove("modo-contraste", "contraste-suave", "modo-sepia");
    }
  }, [altoContraste, contrasteSuave, modoSepia]);

  useEffect(() => {
    document.body.style.fontSize = `${tamañoTexto}%`;
  }, [tamañoTexto]);

  useEffect(() => {
    document.body.style.lineHeight = interlineado;
  }, [interlineado]);

  useEffect(() => {
    if (resaltarFoco) {
      document.body.classList.add("resaltar-foco");
    } else {
      document.body.classList.remove("resaltar-foco");
    }
  }, [resaltarFoco]);

  useEffect(() => {
    if (fuenteDislexia) {
      document.body.classList.add("fuente-dislexia");
    } else {
      document.body.classList.remove("fuente-dislexia");
    }
  }, [fuenteDislexia]);

  useEffect(() => {
    if (alertasVisuales) {
      // Aquí podrías agregar código para activar alertas visuales (ejemplo: cambiar sonidos por iconos)
      console.log("Alertas visuales activadas");
    } else {
      console.log("Alertas visuales desactivadas");
    }
  }, [alertasVisuales]);

  useEffect(() => {
    if (modoLecturaFacil) {
      document.body.classList.add("modo-lectura-facil");
    } else {
      document.body.classList.remove("modo-lectura-facil");
    }
  }, [modoLecturaFacil]);

  if (!mostrar) return null;

  return (
    <div
      id="menu-accesibilidad"
      style={{
        position: "fixed",
        bottom: "80px",
        right: "20px",
        backgroundColor: "#fff",
        border: "2px solid #4caf50",
        borderRadius: "8px",
        padding: "1rem",
        width: "320px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        zIndex: 1500,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxHeight: "90vh",
        overflowY: "auto"
      }}
      aria-label="Opciones de accesibilidad"
      role="region"
    >
      <h3 style={{ marginTop: 0, color: "#4caf50" }}>Opciones de Accesibilidad</h3>

      {/* Modos de contraste */}
      <fieldset style={{ marginBottom: "10px" }}>
        <legend style={{ fontWeight: "600" }}>Contraste</legend>
        <label style={{ display: "block", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={altoContraste}
            onChange={() => {
              setAltoContraste(!altoContraste);
              if (!altoContraste) {
                setContrasteSuave(false);
                setModoSepia(false);
              }
            }}
            style={{ marginRight: "8px" }}
          />
          Alto Contraste
        </label>
        <label style={{ display: "block", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={contrasteSuave}
            onChange={() => {
              setContrasteSuave(!contrasteSuave);
              if (!contrasteSuave) {
                setAltoContraste(false);
                setModoSepia(false);
              }
            }}
            style={{ marginRight: "8px" }}
          />
          Contraste Suave
        </label>
        <label style={{ display: "block", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={modoSepia}
            onChange={() => {
              setModoSepia(!modoSepia);
              if (!modoSepia) {
                setAltoContraste(false);
                setContrasteSuave(false);
              }
            }}
            style={{ marginRight: "8px" }}
          />
          Modo Sepia
        </label>
      </fieldset>

      {/* Tamaño de texto */}
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

      {/* Interlineado */}
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="interlineado" style={{ display: "block", marginBottom: "4px" }}>
          Espacio entre líneas: {interlineado.toFixed(1)}
        </label>
        <input
          type="range"
          id="interlineado"
          min="1"
          max="3"
          step="0.1"
          value={interlineado}
          onChange={(e) => setInterlineado(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>

      {/* Resaltar foco */}
      <label style={{ display: "block", marginBottom: "10px", cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={resaltarFoco}
          onChange={() => setResaltarFoco(!resaltarFoco)}
          style={{ marginRight: "8px" }}
        />
        Resaltar Foco y Enlaces
      </label>

      {/* Fuente para dislexia */}
      <label style={{ display: "block", marginBottom: "10px", cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={fuenteDislexia}
          onChange={() => setFuenteDislexia(!fuenteDislexia)}
          style={{ marginRight: "8px" }}
        />
        Fuente amigable para Dislexia
      </label>

      {/* Alertas visuales en lugar de sonidos */}
      <label style={{ display: "block", marginBottom: "10px", cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={alertasVisuales}
          onChange={() => setAlertasVisuales(!alertasVisuales)}
          style={{ marginRight: "8px" }}
        />
        Alertas visuales alternativas (sin sonido)
      </label>

      {/* Modo lectura fácil */}
      <label style={{ display: "block", marginBottom: "10px", cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={modoLecturaFacil}
          onChange={() => setModoLecturaFacil(!modoLecturaFacil)}
          style={{ marginRight: "8px" }}
        />
        Modo Lectura Fácil
      </label>

      {/* Mostrar instrucciones navegación por teclado */}
      <button
        type="button"
        onClick={() => setMostrarInstruccionesTeclado(!mostrarInstruccionesTeclado)}
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "8px",
          backgroundColor: "#4caf50",
          border: "none",
          borderRadius: "4px",
          color: "#fff",
          fontWeight: "600",
          cursor: "pointer",
        }}
        aria-expanded={mostrarInstruccionesTeclado}
      >
        {mostrarInstruccionesTeclado ? "Ocultar instrucciones teclado" : "Mostrar instrucciones teclado"}
      </button>

      {mostrarInstruccionesTeclado && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#e8f5e9",
            borderRadius: "4px",
            fontSize: "0.9rem",
            color: "#2e7d32",
          }}
          role="region"
          aria-live="polite"
        >
          <p><strong>Navegación por teclado:</strong></p>
          <ul>
            <li>Tab: mover al siguiente elemento</li>
            <li>Shift + Tab: mover al elemento anterior</li>
            <li>Enter o Espacio: activar botón o enlace</li>
            <li>Flechas: navegar dentro de menús o listas</li>
          </ul>
        </div>
      )}

      <style>{`
        .modo-contraste {
          background-color: #000 !important;
          color: #fff !important;
          filter: invert(1) hue-rotate(180deg);
        }
        .contraste-suave {
          filter: contrast(1.5);
        }
        .modo-sepia {
          filter: sepia(0.6);
        }
        .modo-lectura-facil {
          font-size: 1.1rem !important;
          line-height: 1.8 !important;
          font-weight: 400 !important;
          letter-spacing: 0.05em !important;
        }
        .resaltar-foco *:focus {
          outline: 3px solid #4caf50 !important;
          outline-offset: 3px;
        }
        .fuente-dislexia {
          font-family: "OpenDyslexic", Arial, sans-serif !important;
        }
      `}</style>
    </div>
  );
};

export default AccesibilidadMenu;
