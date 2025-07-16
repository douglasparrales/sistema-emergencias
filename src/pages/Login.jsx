import React, { useState, useEffect, useRef } from "react";

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState(localStorage.getItem("usuario") || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [intentos, setIntentos] = useState(0);

  const usuarioRef = useRef(null);

  useEffect(() => {
    usuarioRef.current.focus(); // Foco automático
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuario === "" || password === "") {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (usuario === "admin" && password === "1234") {
      onLogin(usuario);
      localStorage.setItem("usuario", usuario); // Guardar usuario
      setError("");
    } else {
      setIntentos(prev => prev + 1);
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div
      style={{
        maxWidth: "460px",
        margin: "4rem auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#fff",
        boxSizing: "border-box",
      }}
    >

      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Iniciar sesión
      </h2>

      <form onSubmit={handleSubmit} aria-label="Formulario de inicio de sesión">
        {/* Usuario */}
        <label htmlFor="usuario" style={{ display: "block", marginBottom: "0.5rem" }}>
          Usuario:
        </label>
        <input
          ref={usuarioRef}
          id="usuario"
          name="usuario"
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          autoComplete="username"
          aria-required="true"
          aria-label="Campo de usuario"
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "4px",
            border: `1px solid ${error ? "#e53935" : "#ccc"}`,
          }}
          required
        />

        {/* Contraseña */}
        <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem" }}>
          Contraseña:
        </label>
        <div style={{ position: "relative" }}>
          <input
            id="password"
            name="password"
            type={mostrarPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            aria-required="true"
            aria-label="Campo de contraseña"
            style={{
              width: "100%",
              padding: "0.5rem",
              paddingRight: "3rem",
              borderRadius: "4px",
              border: `1px solid ${error ? "#e53935" : "#ccc"}`,
            }}
            required
          />
          <button
            type="button"
            onClick={() => setMostrarPassword((prev) => !prev)}
            aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            style={{
              position: "absolute",
              right: "0.8rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "1.2rem",
              padding: 0,
              lineHeight: 1,
            }}
          >
            {mostrarPassword ? "🙈" : "👁️"}
          </button>

        </div>

        {/* Error */}
        {error && (
          <p
            style={{ color: "#e53935", marginTop: "0.5rem" }}
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}

        {/* Intentos fallidos */}
        {intentos >= 3 && (
          <p style={{ color: "orange", marginTop: "0.5rem" }}>
            Múltiples intentos fallidos. ¿Eres tú o un bot? 🤖
          </p>
        )}

        {/* Botón */}
        <button
          type="submit"
          style={{
            marginTop: "1rem",
            width: "100%",
            padding: "0.7rem",
            backgroundColor: "#1565c0",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600",
          }}
          aria-label="Botón para iniciar sesión"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
