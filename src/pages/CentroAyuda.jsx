import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/Card";
import { BookOpenText, Link, FileText } from "lucide-react";

const recursos = [
  {
    tipo: "guía",
    titulo: "Qué hacer antes, durante y después de un sismo",
    descripcion:
      "Recomendaciones rápidas y claras para actuar correctamente ante un sismo.",
    enlace: "#",
  },
  {
    tipo: "documento",
    titulo: "Plan familiar de emergencias",
    descripcion:
      "PDF descargable para organizar roles, recursos y puntos de encuentro familiares.",
    enlace: "#",
  },
  {
    tipo: "enlace",
    titulo: "Instituto Geofísico del Ecuador",
    descripcion:
      "Alertas sísmicas oficiales y reportes actualizados en tiempo real.",
    enlace: "https://www.igepn.edu.ec/",
  },
];

// Tipos disponibles para filtro
const tiposFiltro = ["", "guía", "documento", "enlace"];

const CentroAyuda = () => {
  const [tipoFiltro, setTipoFiltro] = useState(() => localStorage.getItem("tipoFiltro") || "");
  const [busqueda, setBusqueda] = useState(() => localStorage.getItem("busquedaFiltro") || "");
  const [resultados, setResultados] = useState(recursos);
  const [cargando, setCargando] = useState(false);
  const [filtrosGuardados, setFiltrosGuardados] = useState(() => {
    const saved = localStorage.getItem("filtrosGuardados");
    return saved ? JSON.parse(saved) : [];
  });
  const [mensajeNoResultados, setMensajeNoResultados] = useState("");

  // Guardar filtros frecuentes
  const guardarFiltroActual = () => {
    const nuevoFiltro = { tipoFiltro, busqueda };
    // Evitar duplicados
    if (
      !filtrosGuardados.some(
        (f) => f.tipoFiltro === tipoFiltro && f.busqueda === busqueda
      )
    ) {
      const actualizados = [...filtrosGuardados, nuevoFiltro].slice(-5); // max 5 guardados
      setFiltrosGuardados(actualizados);
      localStorage.setItem("filtrosGuardados", JSON.stringify(actualizados));
    }
  };

  // Aplicar filtros con retardo simulado para feedback
  useEffect(() => {
    setCargando(true);
    const timer = setTimeout(() => {
      let filtrados = recursos;

      if (tipoFiltro) {
        filtrados = filtrados.filter((r) => r.tipo === tipoFiltro);
      }
      if (busqueda.trim()) {
        const texto = busqueda.toLowerCase();
        filtrados = filtrados.filter(
          (r) =>
            r.titulo.toLowerCase().includes(texto) ||
            r.descripcion.toLowerCase().includes(texto)
        );
      }
      setResultados(filtrados);
      setCargando(false);

      setMensajeNoResultados(
        filtrados.length === 0
          ? "No se encontraron recursos que coincidan con los filtros."
          : ""
      );
    }, 300);

    // Guardar filtros en localStorage para persistencia
    localStorage.setItem("tipoFiltro", tipoFiltro);
    localStorage.setItem("busquedaFiltro", busqueda);

    return () => clearTimeout(timer);
  }, [tipoFiltro, busqueda]);

  // Limpiar filtros
  const limpiarFiltros = () => {
    setTipoFiltro("");
    setBusqueda("");
    setMensajeNoResultados("");
  };

  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
        padding: "1rem",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "1rem",
          color: "#b71c1c",
        }}
      >
        Centro de Ayuda Comunitaria
      </h1>

      <p
        style={{
          textAlign: "center",
          fontSize: "1.1rem",
          color: "#555",
          marginBottom: "2.5rem",
          maxWidth: "700px",
          marginInline: "auto",
        }}
      >
        Accede a guías prácticas, documentos útiles y recursos oficiales que pueden salvar vidas en situaciones de emergencia.
      </p>

      {/* Filtros */}
      <form
        aria-label="Filtros para recursos del centro de ayuda"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          guardarFiltroActual();
        }}
      >
        {/* Filtro por tipo */}
        <div style={{ minWidth: "160px", flexGrow: 1 }}>
          <label htmlFor="tipoFiltro" style={{ fontWeight: "600", display: "block", marginBottom: "0.3rem" }}>
            Tipo de recurso
          </label>
          <select
            id="tipoFiltro"
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              cursor: "pointer",
            }}
            aria-describedby="tipoFiltroHelp"
          >
            <option value="">-- Todos los tipos --</option>
            {tiposFiltro
              .filter((t) => t)
              .map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
          </select>
          <small id="tipoFiltroHelp" style={{ color: "#666" }}>
            Filtra recursos por su tipo
          </small>
        </div>

        {/* Filtro por texto */}
        <div style={{ minWidth: "200px", flexGrow: 2 }}>
          <label htmlFor="busqueda" style={{ fontWeight: "600", display: "block", marginBottom: "0.3rem" }}>
            Buscar en título y descripción
          </label>
          <input
            id="busqueda"
            type="search"
            placeholder="Ej. sismo, emergencia"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            autoComplete="off"
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
            aria-describedby="busquedaHelp"
          />
          <small id="busquedaHelp" style={{ color: "#666" }}>
            Escribe palabras clave para buscar
          </small>
        </div>

        {/* Botones */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "0.6rem 1rem",
              fontWeight: "600",
              cursor: "pointer",
              userSelect: "none",
            }}
            aria-label="Aplicar filtros"
          >
            Aplicar filtros
          </button>
          <button
            type="button"
            onClick={limpiarFiltros}
            style={{
              backgroundColor: "#ccc",
              color: "#222",
              border: "none",
              borderRadius: "6px",
              padding: "0.6rem 1rem",
              fontWeight: "600",
              cursor: "pointer",
              userSelect: "none",
            }}
            aria-label="Limpiar filtros"
          >
            Limpiar filtros
          </button>
        </div>
      </form>

      {/* Filtros guardados frecuentes */}
      {filtrosGuardados.length > 0 && (
        <section
          aria-label="Filtros frecuentes guardados"
          style={{
            marginBottom: "1.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#f0f4f8",
            borderRadius: "6px",
          }}
        >
          <strong>Filtros guardados:</strong>{" "}
          {filtrosGuardados.map((filt, i) => (
            <button
              key={i}
              onClick={() => {
                setTipoFiltro(filt.tipoFiltro);
                setBusqueda(filt.busqueda);
              }}
              style={{
                margin: "0 0.3rem",
                padding: "0.3rem 0.7rem",
                borderRadius: "4px",
                border: "1px solid #1976d2",
                background: "#e3f2fd",
                color: "#1976d2",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
              aria-label={`Aplicar filtro guardado: tipo ${filt.tipoFiltro || "todos"}, búsqueda ${filt.busqueda || "vacía"}`}
            >
              {filt.tipoFiltro ? `${filt.tipoFiltro}` : "Todos"} | {filt.busqueda || "Sin búsqueda"}
            </button>
          ))}
        </section>
      )}

      {/* Feedback de carga */}
      {cargando && (
        <p
          aria-live="polite"
          style={{ textAlign: "center", fontWeight: "600", color: "#1976d2" }}
        >
          Aplicando filtros...
        </p>
      )}

      {/* Mensaje no resultados */}
      {mensajeNoResultados && (
        <p
          aria-live="polite"
          style={{ textAlign: "center", color: "#d32f2f", fontWeight: "600" }}
        >
          {mensajeNoResultados}
        </p>
      )}

      {/* Lista de recursos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
        }}
      >
        {resultados.map((recurso, index) => (
          <Card
            key={index}
            style={{
              borderRadius: "8px",
              border: "1.5px solid #ccc",
              backgroundColor: "#fefefe",
              padding: "1.2rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
                  color: "#000",
                }}
              >
                {recurso.tipo === "guía" && <BookOpenText size={28} />}
                {recurso.tipo === "documento" && <FileText size={28} />}
                {recurso.tipo === "enlace" && <Link size={28} />}
                <h2
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    margin: 0,
                  }}
                >
                  {recurso.titulo}
                </h2>
              </div>

              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  color: "#444",
                  marginBottom: "1.5rem",
                  minHeight: "3rem",
                }}
              >
                {recurso.descripcion}
              </p>

              <a
                href={recurso.enlace}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#1976d2",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                Ver recurso &rarr;
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CentroAyuda;
