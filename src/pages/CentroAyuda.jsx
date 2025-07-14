import React from "react";
import { Card, CardContent } from "../components/Card";
import { BookOpenText, Link, FileText } from "lucide-react";

const recursos = [
  {
    tipo: "guía",
    titulo: "Qué hacer antes, durante y después de un sismo",
    descripcion: "Recomendaciones rápidas y claras para actuar correctamente ante un sismo.",
    enlace: "#",
  },
  {
    tipo: "documento",
    titulo: "Plan familiar de emergencias",
    descripcion: "PDF descargable para organizar roles, recursos y puntos de encuentro familiares.",
    enlace: "#",
  },
  {
    tipo: "enlace",
    titulo: "Instituto Geofísico del Ecuador",
    descripcion: "Alertas sísmicas oficiales y reportes actualizados en tiempo real.",
    enlace: "https://www.igepn.edu.ec/",
  },
];

const CentroAyuda = () => {
  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
        }}
      >
        {recursos.map((recurso, index) => (
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