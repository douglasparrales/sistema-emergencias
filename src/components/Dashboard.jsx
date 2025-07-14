// src/pages/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de Emergencias</h1>

      {/* Resumen de Alertas */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Alertas Activas</h2>
        <ul className="list-disc list-inside text-red-600">
          <li>Sismo - Nivel Rojo - Quito</li>
          <li>Inundación - Nivel Amarillo - Guayas</li>
        </ul>
      </section>

      {/* Accesos Rápidos */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Accesos Rápidos</h2>
        <div className="grid grid-cols-2 gap-4">
          <a href="/alertas" className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 text-center">
            Alertas Manuales
          </a>
          <a href="/voluntarios" className="bg-green-500 text-white p-4 rounded hover:bg-green-600 text-center">
            Gestión de Voluntarios
          </a>
          <a href="/centro-ayuda" className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600 text-center">
            Centro de Ayuda
          </a>
          <a href="/zonas-seguras" className="bg-yellow-500 text-white p-4 rounded hover:bg-yellow-600 text-center">
            Zonas Seguras
          </a>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
