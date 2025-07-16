import React, { useState, useEffect, useRef } from "react";

const mockAlertas = [
  {
    id: 1,
    tipo: "Sismo",
    mensaje: "Sismo de magnitud 5.5 en Naranjal, Guayas",
    hora: "21 junio 2025, 14:18 TL",
    activo: true,
  },
  {
    id: 2,
    tipo: "Inundación",
    mensaje: "Alerta de inundación en Guayaquil",
    hora: "12 julio 2025, 09:50 AM",
    activo: true,
  },
];

// Opciones para tipo de alerta
const tiposAlerta = ["Sismo", "Inundación", "Incendio", "Volcán", "Otro"];

const FuenteAlertas = () => {
  const [alertas, setAlertas] = useState(mockAlertas);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({
    id: "",
    tipo: "",
    mensaje: "",
    hora: "",
    activo: true,
  });
  const [originalForm, setOriginalForm] = useState(null);
  const [errores, setErrores] = useState({});
  const [confirmarGuardar, setConfirmarGuardar] = useState(false);
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  const [alertaParaEliminar, setAlertaParaEliminar] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeEliminarExito, setMensajeEliminarExito] = useState("");

  const inputRef = useRef(null);

  // Cuando empieza edición, cargar datos en formulario
  const comenzarEdicion = (alerta) => {
    setEditandoId(alerta.id);
    setForm({ ...alerta }); // copia
    setOriginalForm({ ...alerta });
    setErrores({});
    setMensajeExito("");
    setMensajeEliminarExito("");
    setConfirmarGuardar(false);
    setConfirmarEliminar(false);

    // foco en el primer input después de render
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };


  // Validación simple en tiempo real y antes de guardar
  const validar = (datos) => {
    const errs = {};
    if (!datos.tipo) errs.tipo = "El tipo de alerta es obligatorio.";
    if (!datos.mensaje.trim()) errs.mensaje = "El mensaje no puede estar vacío.";
    if (!datos.hora.trim()) errs.hora = "Debe especificar la hora de la alerta.";
    return errs;
  };

  // Manejo de cambios en el formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrores((err) => {
      const nuevo = { ...err };
      delete nuevo[name]; // elimina error al corregir
      return nuevo;
    });
    setMensajeExito("");
  };

  // Detectar si hay cambios respecto al original
  const hayCambios = () => {
    if (!originalForm) return false;
    return (
      form.tipo !== originalForm.tipo ||
      form.mensaje !== originalForm.mensaje ||
      form.hora !== originalForm.hora ||
      form.activo !== originalForm.activo
    );
  };

  // Confirmar y guardar cambios
  const intentarGuardar = (e) => {
    e.preventDefault();
    const errs = validar(form);
    setErrores(errs);
    if (Object.keys(errs).length > 0) return;

    // Confirmar si hay cambios en campo crítico (tipo)
    if (originalForm && form.tipo !== originalForm.tipo) {
      setConfirmarGuardar(true);
    } else {
      guardarCambios();
    }
  };

  // Guardar cambios reales
  const guardarCambios = () => {
    setGuardando(true);
    setTimeout(() => {
      setAlertas((prev) =>
        prev.map((a) => (a.id === form.id ? { ...form } : a))
      );
      setMensajeExito("Alerta actualizada correctamente.");
      setEditandoId(null);
      setConfirmarGuardar(false);
      setGuardando(false);
      setOriginalForm(null);
    }, 1000);
  };

  // Cancelar edición
  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm({
      id: "",
      tipo: "",
      mensaje: "",
      hora: "",
      activo: true,
    });
    setErrores({});
    setMensajeExito("");
    setMensajeEliminarExito("");
    setConfirmarGuardar(false);
    setConfirmarEliminar(false);
  };

  // Confirmar eliminación
  const pedirEliminar = (alerta) => {
    setAlertaParaEliminar(alerta);
    setConfirmarEliminar(true);
    setMensajeExito("");
    setMensajeEliminarExito("");
  };

  // Ejecutar eliminación lógica (inactivar)
  const eliminarAlerta = () => {
    if (!alertaParaEliminar) return;
    setEliminando(true);

    setTimeout(() => {
      setAlertas((prev) =>
        prev.map((a) =>
          a.id === alertaParaEliminar.id ? { ...a, activo: false } : a
        )
      );
      setMensajeEliminarExito(
        `Alerta "${alertaParaEliminar.tipo} - ${alertaParaEliminar.mensaje.substring(
          0,
          30
        )}..." eliminada (inactivada) correctamente.`
      );
      setConfirmarEliminar(false);
      setAlertaParaEliminar(null);
      setEliminando(false);
      // Si estaba editando esa alerta, salir de edición
      if (editandoId === alertaParaEliminar.id) cancelarEdicion();
    }, 1200);
  };

  // Detectar si usuario intenta abandonar con cambios sin guardar
  useEffect(() => {
    const manejarAntesDeSalir = (e) => {
      if (hayCambios()) {
        e.preventDefault();
        e.returnValue =
          "Hay cambios sin guardar. ¿Está seguro que desea salir sin guardar?";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", manejarAntesDeSalir);
    return () => window.removeEventListener("beforeunload", manejarAntesDeSalir);
  }, [form, originalForm]);

  // Para destacar campos modificados
  const campoModificado = (campo) => {
    if (!originalForm) return false;
    return form[campo] !== originalForm[campo];
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "auto",
        padding: "2rem 1rem",
        fontFamily: "Segoe UI, sans-serif",
        color: "#222",
      }}
    >
      <h1
        style={{ textAlign: "center", color: "#b71c1c", marginBottom: "1rem" }}
      >
        Alertas Oficiales – Instituto Geofísico del Ecuador (@IGecuador)
      </h1>
      <p style={{ textAlign: "center", color: "#555", marginBottom: "2rem" }}>
        Información verificada sobre sismos recientes, directamente desde fuentes
        oficiales.
      </p>

      {/* Formulario para agregar nueva alerta */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const nueva = {
            ...form,
            id: alertas.length + 1,
            tipo: form.tipo.trim(),
            mensaje: form.mensaje.trim(),
            hora: form.hora.trim(),
            activo: true,
          };
          const errores = validar(nueva);
          if (Object.keys(errores).length > 0) {
            setErrores(errores);
            return;
          }
          setAlertas((prev) => [...prev, nueva]);
          setMensajeExito("✅ Nueva alerta agregada correctamente.");
          setForm({ id: "", tipo: "", mensaje: "", hora: "", activo: true });
          setErrores({});
        }}
        aria-labelledby="tituloAgregar"
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem 1.5rem",
          backgroundColor: "#eef7ef",
          marginBottom: "2rem",
        }}
      >
        <h2 id="tituloAgregar" style={{ color: "#2e7d32", textAlign: "center", marginBottom: "1rem" }}>
          Agregar Nueva Alerta
        </h2>

        {/* Tipo de alerta */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="tipoNuevo" style={{ fontWeight: "600" }}>
            Tipo de alerta <span aria-hidden="true" style={{ color: "red" }}>*</span>
          </label>
          <select
            id="tipoNuevo"
            name="tipo"
            value={form.tipo}
            onChange={manejarCambio}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: errores.tipo ? "1px solid red" : "1px solid #ccc",
            }}
          >
            <option value="">Seleccione un tipo</option>
            {tiposAlerta.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errores.tipo && <div style={{ color: "red", fontSize: "0.9rem" }}>{errores.tipo}</div>}
        </div>

        {/* Mensaje */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="mensajeNuevo" style={{ fontWeight: "600" }}>
            Mensaje <span aria-hidden="true" style={{ color: "red" }}>*</span>
          </label>
          <input
            id="mensajeNuevo"
            name="mensaje"
            type="text"
            value={form.mensaje}
            onChange={manejarCambio}
            placeholder="Escriba el mensaje de la alerta"
            required
            autoComplete="off"
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: errores.mensaje ? "1px solid red" : "1px solid #ccc",
            }}
          />
          {errores.mensaje && <div style={{ color: "red", fontSize: "0.9rem" }}>{errores.mensaje}</div>}
        </div>

        {/* Hora */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="horaNuevo" style={{ fontWeight: "600" }}>
            Hora <span aria-hidden="true" style={{ color: "red" }}>*</span>
          </label>
          <input
            id="horaNuevo"
            name="hora"
            type="text"
            value={form.hora}
            onChange={manejarCambio}
            placeholder="Ej: 16 julio 2025, 18:45 PM"
            required
            autoComplete="off"
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: errores.hora ? "1px solid red" : "1px solid #ccc",
            }}
          />
          {errores.hora && <div style={{ color: "red", fontSize: "0.9rem" }}>{errores.hora}</div>}
        </div>

        {/* Botones */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#2e7d32",
              color: "white",
              padding: "0.5rem 1.5rem",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={() => {
              setForm({ id: "", tipo: "", mensaje: "", hora: "", activo: true });
              setErrores({});
              setMensajeExito("");
            }}
            style={{
              backgroundColor: "#888",
              color: "white",
              padding: "0.5rem 1.5rem",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Cancelar
          </button>
        </div>
      </form>


      {/* Lista y edición */}
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem" }}>
        {alertas.map((a) => (
          <li
            key={a.id}
            style={{
              border: "1px solid #ccc",
              borderLeft: a.activo ? "5px solid #b71c1c" : "5px solid #aaa",
              marginBottom: "1rem",
              padding: "1rem",
              backgroundColor: a.activo ? "#fffef8" : "#f5f5f5",
              borderRadius: "6px",
              opacity: a.activo ? 1 : 0.6,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong style={{ fontSize: "1.1rem" }}>
                {a.tipo} {a.activo ? "" : "(Inactivo)"}
              </strong>
              : {a.mensaje}
              <br />
              <small style={{ color: "#555" }}>{a.hora}</small>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {a.activo && (
                <button
                  onClick={() => comenzarEdicion(a)}
                  aria-label={`Editar alerta ${a.tipo}`}
                  style={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.4rem 0.7rem",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Editar
                </button>
              )}
              <button
                onClick={() => pedirEliminar(a)}
                aria-label={`Eliminar alerta ${a.tipo}`}
                style={{
                  backgroundColor: a.activo ? "#d32f2f" : "#aaa",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.4rem 0.7rem",
                  cursor: a.activo ? "pointer" : "not-allowed",
                  fontWeight: "600",
                }}
                disabled={!a.activo || eliminando}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}

      </ul>


      {/* Formulario edición */}
      {editandoId !== null && (
        <form
          onSubmit={intentarGuardar}
          aria-labelledby="tituloEdicion"
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem 1.5rem",
            backgroundColor: "#f9f9f9",
            marginBottom: "2rem",
          }}
        >
          <h2
            id="tituloEdicion"
            style={{ color: "#b71c1c", marginBottom: "1rem", textAlign: "center" }}
          >
            Editar Alerta #{form.id}
          </h2>

          {/* ID (no editable) */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="id" style={{ fontWeight: "600" }}>
              ID (no editable)
            </label>
            <input
              id="id"
              name="id"
              type="text"
              value={form.id}
              disabled
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                backgroundColor: "#eee",
              }}
            />
          </div>

          {/* Tipo de alerta */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="tipo" style={{ fontWeight: "600" }}>
              Tipo de Alerta <span aria-hidden="true" style={{ color: "red" }}>*</span>
            </label>
            <select
              id="tipo"
              name="tipo"
              value={form.tipo}
              onChange={manejarCambio}
              aria-required="true"
              aria-invalid={errores.tipo ? "true" : "false"}
              aria-describedby="errorTipo"
              ref={inputRef}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "6px",
                border: campoModificado("tipo")
                  ? "2px solid #1976d2"
                  : "1px solid #ccc",
                fontSize: "1rem",
                cursor: "pointer",
                outline: errores.tipo ? "2px solid #d32f2f" : "none",
              }}
            >
              <option value="">-- Seleccione tipo --</option>
              {tiposAlerta.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errores.tipo && (
              <p
                id="errorTipo"
                style={{ color: "#d32f2f", marginTop: "0.3rem", fontSize: "0.9rem" }}
                role="alert"
              >
                {errores.tipo}
              </p>
            )}
          </div>

          {/* Mensaje */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="mensaje" style={{ fontWeight: "600" }}>
              Mensaje <span aria-hidden="true" style={{ color: "red" }}>*</span>
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={form.mensaje}
              onChange={manejarCambio}
              aria-required="true"
              aria-invalid={errores.mensaje ? "true" : "false"}
              aria-describedby="errorMensaje"
              rows={3}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "6px",
                border: campoModificado("mensaje")
                  ? "2px solid #1976d2"
                  : "1px solid #ccc",
                fontSize: "1rem",
                outline: errores.mensaje ? "2px solid #d32f2f" : "none",
                resize: "vertical",
              }}
            />
            {errores.mensaje && (
              <p
                id="errorMensaje"
                style={{ color: "#d32f2f", marginTop: "0.3rem", fontSize: "0.9rem" }}
                role="alert"
              >
                {errores.mensaje}
              </p>
            )}
          </div>

          {/* Hora */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="hora" style={{ fontWeight: "600" }}>
              Hora de la Alerta <span aria-hidden="true" style={{ color: "red" }}>*</span>
            </label>
            <input
              id="hora"
              name="hora"
              type="text"
              value={form.hora}
              onChange={manejarCambio}
              aria-required="true"
              aria-invalid={errores.hora ? "true" : "false"}
              aria-describedby="errorHora"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "6px",
                border: campoModificado("hora")
                  ? "2px solid #1976d2"
                  : "1px solid #ccc",
                fontSize: "1rem",
                outline: errores.hora ? "2px solid #d32f2f" : "none",
              }}
            />
            {errores.hora && (
              <p
                id="errorHora"
                style={{ color: "#d32f2f", marginTop: "0.3rem", fontSize: "0.9rem" }}
                role="alert"
              >
                {errores.hora}
              </p>
            )}
          </div>

          {/* Activo */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="activo" style={{ fontWeight: "600" }}>
              Estado
            </label>
            <select
              id="activo"
              name="activo"
              value={form.activo ? "activo" : "inactivo"}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  activo: e.target.value === "activo",
                }))
              }
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          {/* Mensajes de éxito */}
          {mensajeExito && (
            <p
              role="alert"
              style={{
                color: "green",
                fontWeight: "600",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              ✅ {mensajeExito}
            </p>
          )}

          {/* Mensaje si no hay cambios */}
          {!hayCambios() && (
            <p
              role="alert"
              style={{
                color: "#555",
                fontStyle: "italic",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              No se detectaron cambios para guardar.
            </p>
          )}

          {/* Botones */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <button
              type="submit"
              disabled={guardando || !hayCambios()}
              style={{
                backgroundColor: guardando || !hayCambios() ? "#90caf9" : "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "0.6rem 1.5rem",
                fontWeight: "600",
                cursor: guardando || !hayCambios() ? "not-allowed" : "pointer",
              }}
              aria-disabled={guardando || !hayCambios()}
            >
              {guardando ? "Guardando..." : "Actualizar"}
            </button>
            <button
              type="button"
              onClick={cancelarEdicion}
              disabled={guardando}
              style={{
                backgroundColor: "#ccc",
                color: "#222",
                border: "none",
                borderRadius: "6px",
                padding: "0.6rem 1.5rem",
                fontWeight: "600",
                cursor: guardando ? "not-allowed" : "pointer",
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Modal confirmación guardar cambios críticos */}
      {confirmarGuardar && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirmarGuardarTitulo"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              maxWidth: "400px",
              width: "100%",
              padding: "1.5rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            <h3
              id="confirmarGuardarTitulo"
              style={{ marginBottom: "1rem", color: "#b71c1c" }}
            >
              Confirmar cambio crítico
            </h3>
            <p>
              Cambió el <strong>tipo de alerta</strong>. ¿Está seguro de guardar esta
              modificación?
            </p>

            <div
              style={{
                marginTop: "1.5rem",
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <button
                onClick={() => {
                  setConfirmarGuardar(false);
                }}
                style={{
                  backgroundColor: "#ccc",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={guardarCambios}
                style={{
                  backgroundColor: "#1976d2",
                  border: "none",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                autoFocus
              >
                Confirmar y Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal confirmación eliminar */}
      {confirmarEliminar && alertaParaEliminar && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirmarEliminarTitulo"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              maxWidth: "400px",
              width: "100%",
              padding: "1.5rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            <h3
              id="confirmarEliminarTitulo"
              style={{ marginBottom: "1rem", color: "#d32f2f" }}
            >
              Confirmar eliminación
            </h3>
            <p>
              ¿Está seguro que desea <strong>eliminar</strong> esta alerta?
            </p>
            <p>
              <strong>Tipo:</strong> {alertaParaEliminar.tipo} <br />
              <strong>Mensaje:</strong>{" "}
              {alertaParaEliminar.mensaje.length > 50
                ? alertaParaEliminar.mensaje.substring(0, 50) + "..."
                : alertaParaEliminar.mensaje}
              <br />
              <strong>ID:</strong> {alertaParaEliminar.id}
            </p>
            <p
              style={{
                color: "#555",
                fontStyle: "italic",
                marginTop: "0.8rem",
                fontSize: "0.9rem",
              }}
            >
              La alerta no será eliminada permanentemente, sino desactivada.
            </p>

            <div
              style={{
                marginTop: "1.5rem",
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <button
                onClick={() => setConfirmarEliminar(false)}
                disabled={eliminando}
                style={{
                  backgroundColor: "#ccc",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: eliminando ? "not-allowed" : "pointer",
                  fontWeight: "600",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={eliminarAlerta}
                disabled={eliminando}
                style={{
                  backgroundColor: "#d32f2f",
                  border: "none",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: eliminando ? "not-allowed" : "pointer",
                  fontWeight: "600",
                }}
                aria-disabled={eliminando}
                aria-live="polite"
              >
                {eliminando ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje éxito eliminación */}
      {mensajeEliminarExito && (
        <p
          role="alert"
          style={{
            color: "green",
            fontWeight: "600",
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
          ✅ {mensajeEliminarExito}
        </p>
      )}

      {/* Actualización Twitter (solo vista, no se repite el script para evitar problemas) */}
      <div
        style={{
          marginTop: "2rem",
          borderTop: "1px solid #ddd",
          paddingTop: "1rem",
        }}
      >
        <h2
          style={{ textAlign: "center", color: "#333", marginBottom: "0.8rem" }}
        >
          🐦 Actualización en vivo desde Twitter
        </h2>

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
    </div>
  );
};

export default FuenteAlertas;
