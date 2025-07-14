import React, { useEffect, useState } from "react";

const mockAlertas = [
  { id: 1, tipo: "Sismo", mensaje: "Sismo de magnitud 5.5 en Naranjal, Guayas", hora: "21 junio 2025, 14:18 TL" },
  { id: 2, tipo: "Inundación", mensaje: "Alerta de inundación en Guayaquil", hora: "12 julio 2025, 09:50 AM" },
];

const FuenteAlertas = () => {
  const [alertas, setAlertas] = useState(mockAlertas);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "2rem 1rem", fontFamily: "Segoe UI, sans-serif", color: "#222" }}>
      <h1 style={{ textAlign: "center", color: "#b71c1c", marginBottom: "1rem" }}>
        Alertas Oficiales – Instituto Geofísico del Ecuador (@IGecuador)
      </h1>
      <p style={{ textAlign: "center", color: "#555", marginBottom: "2rem" }}>
        Información verificada sobre sismos recientes, directamente desde fuentes oficiales.
      </p>

      {/* Muestras simuladas de alertas */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {alertas.map(a => (
          <li key={a.id} style={{
            border: "1px solid #ccc",
            borderLeft: "5px solid #b71c1c",
            marginBottom: "1rem",
            padding: "1rem",
            backgroundColor: "#fffef8",
            borderRadius: "6px",
          }}>
            <strong style={{ fontSize: "1.1rem" }}>{a.tipo}</strong>: {a.mensaje}
            <br />
            <small style={{ color: "#555" }}>{a.hora}</small>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "2rem", borderTop: "1px solid #ddd", paddingTop: "1rem" }}>
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "0.8rem" }}>
          🐦 Actualización en vivo desde Twitter
        </h2>

        {/* Widget oficial de Twitter */}
        <div style={{ textAlign: "center" }}>
          <a
            className="twitter-timeline"
            data-theme="light"
            data-height="600"
            href="https://twitter.com/IGecuador?ref_src=twsrc%5Etfw"
          >
            Tweets by IGecuador
          </a>
        </div>
      </div>

      {/* Script necesario para cargar el widget */}
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    </div>
  );
};

export default FuenteAlertas;
