import React, { useState } from "react";

const GestionVoluntarios = () => {
  const [voluntarios, setVoluntarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [zona, setZona] = useState("");

  const manejarRegistro = (e) => {
    e.preventDefault();
    if (!nombre || !telefono || !zona) return alert("Complete todos los campos");

    const nuevoVoluntario = {
      id: Date.now(),
      nombre,
      telefono,
      zona,
    };

    setVoluntarios((prev) => [...prev, nuevoVoluntario]);

    // Limpiar campos
    setNombre("");
    setTelefono("");
    setZona("");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", fontFamily: "Segoe UI, sans-serif" }}>
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2rem", color: "#b71c1c", marginBottom: "0.5rem" }}>
          Gestión de Voluntarios
        </h2>
        <p style={{ color: "#555" }}>
          Registra a los voluntarios disponibles para actuar en situaciones de emergencia y organiza mejor su participación en cada zona.
        </p>
      </header>

      <form
        onSubmit={manejarRegistro}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginBottom: "2rem",
          background: "#f9f9f9",
          padding: "1.5rem",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
        }}
      >
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={inputEstilo}
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
          style={inputEstilo}
        />
        <input
          type="text"
          placeholder="Zona asignada"
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          required
          style={inputEstilo}
        />
        <button
          type="submit"
          style={{
            padding: "0.8rem",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Registrar Voluntario
        </button>
      </form>

      <section>
        <h3 style={{ marginBottom: "1rem", color: "#333" }}>📋 Voluntarios Registrados</h3>
        {voluntarios.length === 0 ? (
          <p style={{ color: "#777" }}>Aún no se han registrado voluntarios.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {voluntarios.map((v) => (
              <li
                key={v.id}
                style={{
                  padding: "0.8rem",
                  borderBottom: "1px solid #ddd",
                  background: "#fff",
                  borderRadius: "6px",
                  marginBottom: "0.5rem",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                }}
              >
                <strong>{v.nombre}</strong> &nbsp; | &nbsp;
                Tel: {v.telefono} &nbsp; | &nbsp;
                Zona: <span style={{ color: "#b71c1c" }}>{v.zona}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

const inputEstilo = {
  padding: "0.8rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem"
};

export default GestionVoluntarios;
