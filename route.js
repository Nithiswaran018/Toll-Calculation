import React from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

const App = () => {
  // Coordinates for a simple route
  const routeCoordinates = [
    [51.505, -0.09], // Example: London
    [48.8566, 2.3522], // Example: Paris
  ];

  return (
    <MapContainer center={[51.505, -0.09]} zoom={4} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Polyline to represent the route */}
      <Polyline positions={routeCoordinates} color="blue" />
    </MapContainer>
  );
};

export default App;
