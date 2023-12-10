import React, { useRef, useEffect } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

import './App.css';

const App = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.leafletElement;

      // Define the start and end points
      const startPoint = L.latLng(51.505, -0.09); // Example: London
      const endPoint = L.latLng(48.8566, 2.3522); // Example: Paris

      // Add the Leaflet Routing Machine control
      L.Routing.control({
        waypoints: [startPoint, endPoint],
        routeWhileDragging: true,
      }).addTo(map);
    }
  }, []);

  return (
    <Map
      center={[51.505, -0.09]}
      zoom={13}
      style={{ width: '100%', height: '500px' }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </Map>
  );
};

export default App;
