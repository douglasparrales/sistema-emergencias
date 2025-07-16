import React, { useState, useEffect, useRef } from "react";

const zonasDisponibles = ["Norte", "Sur", "Centro", "Este", "Oeste"];

const GestionVoluntarios = () => {
  // Estados campos
  const [nombre, setNombre] = useState(localStorage.getItem("borradorNombre") || "");
  const [telefono, setTelefono] = useState(localStorage.getItem("borradorTelefono") || "");
  const [zona, setZona] = useState(localStorage.getItem("borradorZona") || "");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);

  // Validación
  const [errores, setErrores] = useState({});
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [confirmarGuardar, setConfirmarGuardar] = useState(false);
  const [errorDuplicado, setErrorDuplicado] = useState("");
  const [fortalezaPass, setFortalezaPass] = useState(0);

  // Lista voluntarios
  const [voluntarios, setVoluntarios] = useState([]);

  // Ref para detectar cambios y controlar abandono sin guardar
  const cambiosSinGuardar = useRef(false);

  // Detectar cambios para aviso abandono
  useEffect(() => {
    cambiosSinGuardar.current =
      nombre !== "" || telefono !== "" || zona !== "" || password !== "";
  }, [nombre, telefono, zona, password]);

  useEffect(() => {
    const handler = (e) => {
      if (cambiosSinGuardar.current) {
        e.preventDefault();
        e.returnValue = ""; // Para Chrome
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // Guardar borrador en localStorage
  useEffect(() => {
    localStorage.setItem("borradorNombre", nombre);
    localStorage.setItem("borradorTelefono", telefono);
    localStorage.setItem("borradorZona", zona);
  }, [nombre, telefono, zona]);

  // Validar campos (en tiempo real y al enviar)
  useEffect(() => {
    const nuevosErrores = {};

    if (!nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    else if (nombre.trim().length < 3)
      nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres";

    if (!telefono.trim()) nuevosErrores.telefono = "El teléfono es obligatorio";
    else if (!/^\d{10,15}$/.test(telefono))
      nuevosErrores.telefono = "El teléfono debe tener entre 10 y 15 dígitos numéricos";

    if (!zona) nuevosErrores.zona = "Seleccione una zona";

    if (!password.trim()) nuevosErrores.password = "La contraseña es obligatoria";
    else if (password.length < 6)
      nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres";

    setErrores(nuevosErrores);
  }, [nombre, telefono, zona, password]);

  // Calcular fortaleza contraseña
  useEffect(() => {
    let fuerza = 0;
    if (password.length >= 6) fuerza++;
    if (/[A-Z]/.test(password)) fuerza++;
    if (/[0-9]/.test(password)) fuerza++;
    if (/[^A-Za-z0-9]/.test(password)) fuerza++;
    setFortalezaPass(fuerza);
  }, [password]);

  // Manejo de registro - con confirmación visual antes de guardar
  const manejarEnviar = (e) => {
    e.preventDefault();
    if (Object.keys(errores).length > 0) {
      alert("Corrige los errores antes de guardar.");
      return;
    }
    setConfirmarGuardar(true);
  };

  // Confirmar guardar voluntario
  const confirmarYGuardar = () => {
    setConfirmarGuardar(false);
    setErrorDuplicado("");

    // Verificar si ya existe un voluntario con el mismo nombre y teléfono
    const existe = voluntarios.some(
      (v) =>
        v.nombre.toLowerCase() === nombre.trim().toLowerCase() &&
        v.telefono === telefono.trim()
    );
    if (existe) {
      setErrorDuplicado("El voluntario con este nombre y teléfono ya está registrado.");
      return;
    }

    const nuevoVoluntario = {
      id: Date.now(),
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      zona,
    };

    setVoluntarios((prev) => [...prev, nuevoVoluntario]);
    setRegistroExitoso(true);
    limpiarFormulario();
  };

  // Limpiar formulario y borrador
  const limpiarFormulario = () => {
    setNombre("");
    setTelefono("");
    setZona("");
    setPassword("");
    setMostrarPassword(false);
    setErrores({});
    localStorage.removeItem("borradorNombre");
    localStorage.removeItem("borradorTelefono");
    localStorage.removeItem("borradorZona");
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        padding: "1rem",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2rem", color: "#b71c1c", marginBottom: "0.5rem" }}>
          Gestión de Voluntarios
        </h2>
        <p style={{ color: "#555" }}>
          Registra a los voluntarios disponibles para actuar en situaciones de emergencia y organiza mejor su participación en cada zona.
        </p>
      </header>

      <form
        onSubmit={manejarEnviar}
        noValidate
        aria-label="Formulario de registro de voluntarios"
        style={{
          background: "#f9f9f9",
          padding: "1.5rem",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        {/* Datos Personales */}
        <fieldset
          style={{ border: "none", marginBottom: "1rem" }}
          aria-describedby="descDatosPersonales"
        >
          <legend
            style={{ fontWeight: "bold", marginBottom: "0.5rem", fontSize: "1.1rem" }}
          >
            Datos Personales
          </legend>
          <p id="descDatosPersonales" style={{ fontSize: "0.875rem", color: "#555" }}>
            Información básica para identificar al voluntario.
          </p>

          <label htmlFor="nombre">
            Nombre completo{" "}
            <span aria-hidden="true" style={{ color: "red" }}>
              *
            </span>
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            placeholder="Ej. Juan Pérez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            aria-describedby="errorNombre"
            aria-invalid={errores.nombre ? "true" : "false"}
            required
            style={{
              ...inputEstilo,
              borderColor: errores.nombre ? "#d32f2f" : "#ccc",
            }}
          />
          {errores.nombre && (
            <span
              id="errorNombre"
              role="alert"
              style={{ color: "#d32f2f", fontSize: "0.875rem" }}
            >
              {errores.nombre}
            </span>
          )}
        </fieldset>

        {/* Contacto */}
        <fieldset
          style={{ border: "none", marginBottom: "1rem" }}
          aria-describedby="descContacto"
        >
          <legend
            style={{ fontWeight: "bold", marginBottom: "0.5rem", fontSize: "1.1rem" }}
          >
            Contacto
          </legend>
          <p id="descContacto" style={{ fontSize: "0.875rem", color: "#555" }}>
            Información para contactar al voluntario.
          </p>

          <label htmlFor="telefono">
            Teléfono{" "}
            <span aria-hidden="true" style={{ color: "red" }}>
              *
            </span>
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            autoComplete="tel"
            placeholder="Ej. 0998765432"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            aria-describedby="errorTelefono"
            aria-invalid={errores.telefono ? "true" : "false"}
            required
            style={{
              ...inputEstilo,
              borderColor: errores.telefono ? "#d32f2f" : "#ccc",
            }}
          />
          {errores.telefono && (
            <span
              id="errorTelefono"
              role="alert"
              style={{ color: "#d32f2f", fontSize: "0.875rem" }}
            >
              {errores.telefono}
            </span>
          )}

          <label htmlFor="zona" style={{ marginTop: "1rem", display: "block" }}>
            Zona asignada{" "}
            <span aria-hidden="true" style={{ color: "red" }}>
              *
            </span>
          </label>
          <select
            id="zona"
            name="zona"
            value={zona}
            onChange={(e) => setZona(e.target.value)}
            aria-describedby="errorZona"
            aria-invalid={errores.zona ? "true" : "false"}
            required
            style={{
              ...inputEstilo,
              borderColor: errores.zona ? "#d32f2f" : "#ccc",
              appearance: "none",
              cursor: "pointer",
            }}
          >
            <option value="">-- Seleccione zona --</option>
            {zonasDisponibles.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
          {errores.zona && (
            <span
              id="errorZona"
              role="alert"
              style={{ color: "#d32f2f", fontSize: "0.875rem" }}
            >
              {errores.zona}
            </span>
          )}
        </fieldset>

        {/* Credenciales */}
        <fieldset
          style={{ border: "none", marginBottom: "1rem" }}
          aria-describedby="descCredenciales"
        >
          <legend
            style={{ fontWeight: "bold", marginBottom: "0.5rem", fontSize: "1.1rem" }}
          >
            Credenciales
          </legend>
          <p id="descCredenciales" style={{ fontSize: "0.875rem", color: "#555" }}>
            Seguridad para acceso y edición.
          </p>

          <label htmlFor="password">
            Contraseña{" "}
            <span aria-hidden="true" style={{ color: "red" }}>
              *
            </span>
          </label>
          <div style={{ position: "relative" }}>
            <input
              id="password"
              name="password"
              type={mostrarPassword ? "text" : "password"}
              placeholder="Crea una contraseña segura"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="errorPassword fortalezaPassword"
              aria-invalid={errores.password ? "true" : "false"}
              required
              style={{
                ...inputEstilo,
                paddingRight: "3rem",
                borderColor: errores.password ? "#d32f2f" : "#ccc",
              }}
            />
            <button
              type="button"
              onClick={() => setMostrarPassword((prev) => !prev)}
              aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              style={{
                position: "absolute",
                right: "0.5rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.9rem",
                color: "#1976d2",
                fontWeight: "bold",
              }}
            >
              {mostrarPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          {errores.password && (
            <span
              id="errorPassword"
              role="alert"
              style={{ color: "#d32f2f", fontSize: "0.875rem" }}
            >
              {errores.password}
            </span>
          )}

          {/* Barra fortaleza */}
          <div
            id="fortalezaPassword"
            aria-live="polite"
            style={{
              height: "8px",
              backgroundColor: "#ddd",
              borderRadius: "4px",
              marginTop: "0.25rem",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(fortalezaPass / 4) * 100}%`,
                backgroundColor:
                  fortalezaPass <= 1
                    ? "#d32f2f"
                    : fortalezaPass === 2
                    ? "#fbc02d"
                    : fortalezaPass === 3
                    ? "#388e3c"
                    : "#2e7d32",
                borderRadius: "4px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <small
            style={{
              display: "block",
              marginTop: "0.25rem",
              color:
                fortalezaPass <= 1
                  ? "#d32f2f"
                  : fortalezaPass === 2
                  ? "#fbc02d"
                  : fortalezaPass === 3
                  ? "#388e3c"
                  : "#2e7d32",
              fontWeight: "bold",
            }}
          >
            {fortalezaPass <= 1
              ? "Muy débil"
              : fortalezaPass === 2
              ? "Débil"
              : fortalezaPass === 3
              ? "Buena"
              : "Excelente"}
          </small>
        </fieldset>

        {/* Botones */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
            marginTop: "1rem",
          }}
        >
          <button
            type="button"
            onClick={limpiarFormulario}
            style={{
              padding: "0.8rem 1.5rem",
              backgroundColor: "#ccc",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            style={{
              padding: "0.8rem 1.5rem",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Guardar
          </button>
        </div>
      </form>

      {/* Confirmación visual */}
      {registroExitoso && (
        <div
          role="alert"
          aria-live="polite"
          style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: "#dff0d8",
            borderRadius: "6px",
            color: "#3c763d",
            fontWeight: "bold",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="24"
            height="24"
            aria-hidden="true"
            focusable="false"
            style={{ color: "#3c763d" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Voluntario guardado con éxito 🎉
        </div>
      )}

      {/* Error duplicado */}
      {errorDuplicado && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: "#f8d7da",
            borderRadius: "6px",
            color: "#721c24",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {errorDuplicado}
        </div>
      )}

      {/* Confirmación modal antes de guardar */}
      {confirmarGuardar && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tituloConfirmacion"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setConfirmarGuardar(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "10px",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
            }}
          >
            <h3 id="tituloConfirmacion" style={{ marginBottom: "1rem" }}>
              ¿Confirma que desea guardar el voluntario?
            </h3>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                onClick={() => setConfirmarGuardar(false)}
                style={{
                  padding: "0.8rem 1.5rem",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  background: "#eee",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmarYGuardar}
                style={{
                  padding: "0.8rem 1.5rem",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#1976d2",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista voluntarios */}
      <section
        aria-label="Lista de voluntarios registrados"
        style={{ marginTop: "2rem" }}
      >
        <h3 style={{ marginBottom: "1rem", color: "#333" }}>📋 Voluntarios Registrados</h3>
        {voluntarios.length === 0 ? (
          <p style={{ color: "#777" }}>Aún no se han registrado voluntarios.</p>
        ) : (
          <ul
            style={{ listStyle: "none", padding: 0 }}
            tabIndex="0"
            aria-live="polite"
            aria-relevant="additions"
          >
            {voluntarios.map((v) => (
              <li
                key={v.id}
                style={{
                  padding: "0.8rem",
                  borderBottom: "1px solid #ddd",
                  background: "#fff",
                  borderRadius: "6px",
                  marginBottom: "0.5rem",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
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
  fontSize: "1rem",
  width: "100%",
  boxSizing: "border-box",
};

export default GestionVoluntarios;
