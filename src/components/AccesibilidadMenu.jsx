import React, { useEffect, useState } from "react";
import "./AccesibilidadMenu.css";
import { Accessibility } from "lucide-react";

const AccesibilidadMenu = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
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
  const [zoomActivado, setZoomActivado] = useState(false);
  const [pausarAnimaciones, setPausarAnimaciones] = useState(false);
  const [lectorPantalla, setLectorPantalla] = useState(false);
  const [descripcionAudio, setDescripcionAudio] = useState(false);

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
    document.body.style.zoom = zoomActivado ? "120%" : "100%";
  }, [zoomActivado]);

  useEffect(() => {
    if (pausarAnimaciones) {
      document.body.classList.add("pausar-animaciones");
    } else {
      document.body.classList.remove("pausar-animaciones");
    }
  }, [pausarAnimaciones]);

  useEffect(() => {
    if (lectorPantalla) {
      const texto = document.body.innerText;
      const speech = new SpeechSynthesisUtterance(texto);
      speech.lang = "es-ES";
      window.speechSynthesis.speak(speech);
    } else {
      window.speechSynthesis.cancel();
    }
  }, [lectorPantalla]);

  useEffect(() => {
    if (descripcionAudio) {
      alert("Descripción de audio activada (placeholder)");
    }
  }, [descripcionAudio]);

  useEffect(() => {
    if (modoLecturaFacil) {
      document.body.classList.add("modo-lectura-facil");
    } else {
      document.body.classList.remove("modo-lectura-facil");
    }
  }, [modoLecturaFacil]);

  return (
    <>
      {/* Botón importado de Navbar */}
      <div
        onClick={() => setMostrarMenu(!mostrarMenu)}
        style={{
          backgroundColor: "#25D366",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1100,
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
        }}
        title="Opciones de accesibilidad"
        aria-label="Abrir menú de accesibilidad"
      >
        <Accessibility color="white" size={24} />
      </div>

      {mostrarMenu && (
        <div className="menu-accesibilidad" role="dialog" aria-label="Opciones de accesibilidad">
          <div className="menu-header">
            <h3>Opciones de Accesibilidad</h3>
            <button className="btn-cerrar" onClick={() => setMostrarMenu(false)}>✖</button>
          </div>

          <fieldset>
            <legend>Contraste</legend>
            <label><input type="checkbox" checked={altoContraste} onChange={() => { setAltoContraste(!altoContraste); setContrasteSuave(false); setModoSepia(false); }} /> Alto Contraste</label>
            <label><input type="checkbox" checked={contrasteSuave} onChange={() => { setContrasteSuave(!contrasteSuave); setAltoContraste(false); setModoSepia(false); }} /> Contraste Suave</label>
            <label><input type="checkbox" checked={modoSepia} onChange={() => { setModoSepia(!modoSepia); setAltoContraste(false); setContrasteSuave(false); }} /> Modo Sepia</label>
          </fieldset>

          <fieldset>
            <legend>Texto</legend>
            <label>Tamaño: {tamañoTexto}%
              <input type="range" min="75" max="150" value={tamañoTexto} onChange={e => setTamañoTexto(Number(e.target.value))} />
            </label>
            <label>Interlineado: {interlineado.toFixed(1)}
              <input type="range" min="1" max="3" step="0.1" value={interlineado} onChange={e => setInterlineado(Number(e.target.value))} />
            </label>
            <label><input type="checkbox" checked={fuenteDislexia} onChange={() => setFuenteDislexia(!fuenteDislexia)} /> Fuente Dislexia</label>
          </fieldset>

          <fieldset>
            <legend>Visualización</legend>
            <label><input type="checkbox" checked={resaltarFoco} onChange={() => setResaltarFoco(!resaltarFoco)} /> Resaltar Foco</label>
            <label><input type="checkbox" checked={zoomActivado} onChange={() => setZoomActivado(!zoomActivado)} /> Zoom</label>
            <label><input type="checkbox" checked={modoLecturaFacil} onChange={() => setModoLecturaFacil(!modoLecturaFacil)} /> Lectura Fácil</label>
            <label><input type="checkbox" checked={pausarAnimaciones} onChange={() => setPausarAnimaciones(!pausarAnimaciones)} /> Pausar Animaciones</label>
          </fieldset>

          <fieldset>
            <legend>Audio y Ayuda</legend>
            <label><input type="checkbox" checked={lectorPantalla} onChange={() => setLectorPantalla(!lectorPantalla)} /> Lector de Pantalla</label>
            <label><input type="checkbox" checked={descripcionAudio} onChange={() => setDescripcionAudio(!descripcionAudio)} /> Descripción de Audio</label>
          </fieldset>

          <fieldset>
            <legend>Teclado</legend>
            <button type="button" onClick={() => setMostrarInstruccionesTeclado(!mostrarInstruccionesTeclado)}>
              {mostrarInstruccionesTeclado ? "Ocultar instrucciones" : "Mostrar instrucciones"}
            </button>
            {mostrarInstruccionesTeclado && (
              <ul className="teclado-ayuda">
                <li><kbd>Tab</kbd>: siguiente elemento</li>
                <li><kbd>Shift + Tab</kbd>: anterior</li>
                <li><kbd>Enter</kbd>: activar</li>
                <li><kbd>Flechas</kbd>: navegar</li>
              </ul>
            )}
          </fieldset>
        </div>
      )}
    </>
  );
};

export default AccesibilidadMenu;