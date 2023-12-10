// App.js

import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';

const App = () => {
  // Coordinates for a simple route
  const routeCoordinates = [
    [51.505, -0.09], // Example: London
    [48.8566, 2.3522], // Example: Paris
  ];

  // Toll information for each marker
  const tollMarkers = [
    {
      position: [51.3, -0.1], // Example: Toll Marker 1
      tollInfo: { name: 'Toll Booth 1', cost: '$5.00' },
    },
    {
      position: [48.9, 2.4], // Example: Toll Marker 2
      tollInfo: { name: 'Toll Booth 2', cost: '$7.00' },
    },
  ];

  return (
    <MapContainer center={[51.505, -0.09]} zoom={4} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Polyline to represent the route */}
      <Polyline positions={routeCoordinates} color="blue" />

      {/* Markers with toll information */}
      {tollMarkers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>
            <div>
              <h3>{marker.tollInfo.name}</h3>
              <p>Cost: {marker.tollInfo.cost}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default App;
