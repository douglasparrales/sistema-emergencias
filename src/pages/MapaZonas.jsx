import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


const MapaZonas = () => {
  const [markers, setMarkers] = useState([]);

  const ManejadorMapa = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkers([...markers, { lat, lng }]);
      },
    });
    return null;
  };

  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>Mapa de Zonas Seguras</h2>
      <p>Haz clic en el mapa para registrar una nueva zona segura.</p>

      {/* CONTENEDOR CUADRADO */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          height: "400px",
          border: "2px solid #ccc",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >
        <MapContainer
          center={[-0.946934, -80.709195]} // Manta - Parque Agustín Intriago
          zoom={15}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ManejadorMapa />
          {markers.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lng]} icon={customIcon}>
              <Popup>ZONA SEGURA #{index + 1}</Popup>
            </Marker>

          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapaZonas;
