import React from 'react';
import './Dashboard.css';

const Dashboard = ({ accessibility = {} }) => {

  const { altoContraste, zoomActivado, subtitulosCerrados } = accessibility;

  const videoContainerClass = `
    video-container
    ${accessibility.altoContraste ? 'contraste-alto' : ''}
    ${accessibility.zoomActivado ? 'zoom-video' : ''}
  `;

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', color: '#333' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Bienvenido al Sistema Integral de Emergencias y Desastres
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#555' }}>
          Una plataforma moderna y confiable para gestionar, informar y actuar ante situaciones de emergencia en tiempo real.
        </p>
      </header>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>

        {/* Video informativo */}
        <div style={{
          backgroundColor: '#fff',
          padding: '1.5rem',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          width: '50%'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#b71c1c' }}>🎥 Video informativo</h2>

          <div className={videoContainerClass}>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/Kjuv88cLzRs"
              title="Video de emergencia"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: '8px' }}
            ></iframe>
          </div>

          {subtitulosCerrados && (
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
              [Subtítulo simulado]: En caso de emergencia, mantén la calma y sigue las instrucciones oficiales.
            </p>
          )}
        </div>


        {/* Objetivos */}
        <div style={{
          backgroundColor: '#f8f8f8',
          padding: '1.5rem',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          width: '80%'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#b71c1c' }}>🎯 Objetivos Principales</h2>
          <ul style={{ lineHeight: '1.7' }}>
            <li>Detectar y visualizar alertas en tiempo real para la toma rápida de decisiones.</li>
            <li>Organizar la respuesta de voluntarios y centros de ayuda estratégicamente.</li>
            <li>Brindar orientación a la población en situaciones críticas.</li>
            <li>Facilitar el acceso a zonas seguras y recursos de emergencia.</li>
          </ul>
        </div>

        {/* Noticias */}
        <div style={{
          backgroundColor: '#f1f1f1',
          padding: '1.5rem',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          width: '80%'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#b71c1c' }}>📢 Noticias Relevantes</h2>
          <ul style={{ lineHeight: '1.7' }}>
            <li><strong>⚠️ Simulacro Nacional:</strong> El próximo 25 de julio se realizará un simulacro de evacuación a nivel nacional. ¡Prepárate!</li>
            <li><strong>🆕 Nueva zona segura agregada:</strong> Parque Central de Manta habilitado como punto de encuentro.</li>
            <li><strong>💡 Consejo de prevención:</strong> Mantén tu mochila de emergencia lista y revisa tus rutas de evacuación.</li>
          </ul>
        </div>

        {/* Beneficios */}
        <div style={{
          backgroundColor: '#fff8f8',
          padding: '1.5rem',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          width: '80%'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#b71c1c' }}>🤝 ¿En qué te beneficia esta plataforma?</h2>
          <ul style={{ lineHeight: '1.7' }}>
            <li>Acceso inmediato a información verificada durante emergencias.</li>
            <li>Ubicación en tiempo real de zonas seguras cercanas.</li>
            <li>Comunicación directa con centros de ayuda y voluntarios disponibles.</li>
            <li>Participación activa en la red ciudadana de apoyo.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
