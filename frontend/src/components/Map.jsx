// Componentes/Map.js
import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 

// Crie um ícone personalizado usando L.Icon
const customIcon = new L.Icon({
  iconUrl: '/icons/icon-mapa.png',
  iconSize: [32, 32], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34],
});


const Map = ({ clients, route }) => { 
  const defaultPosition = [-25.4295963, -49.2712724]; // Coordenadas de São Paulo para exemplo

  // Ajuste a ordem das coordenadas para a Polyline
  const polylinePositions = route.map(coord => [coord[1], coord[0]]);

  return (
    <MapContainer center={defaultPosition} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline color="blue" positions={polylinePositions} />
      {/* Mapear os clientes para marcadores no mapa */}
      {clients.map(client => (
        <Marker 
          key={client.id} 
          position={[client.y_coordinate, client.x_coordinate]}
          icon={customIcon} // Use o ícone personalizado aqui
        >
          <Popup>
            {client.name} <br /> {client.phone}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
