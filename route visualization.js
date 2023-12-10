// App.js

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import polyline from 'polyline';

const App = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [tollMarkers, setTollMarkers] = useState([]);

  useEffect(() => {
    // Coordinates for a simple route
    const startCoordinate = [51.505, -0.09]; // Example: London
    const endCoordinate = [48.8566, 2.3522]; // Example: Paris

    // Encode the route coordinates to a polyline
    const polylineEncoded = L.polyline([startCoordinate, endCoordinate]).toGeoJSON().geometry.coordinates;
    const encodedPolyline = polyline.fromGeoJSON({ type: 'LineString', coordinates: polylineEncoded });

    // TollGuru API endpoint
    const apiUrl = `https://dev.tollguru.com/v1/calc/route?from=${startCoordinate[0]},${startCoordinate[1]}&to=${endCoordinate[0]},${endCoordinate[1]}&vehicleType=2AxlesAuto&departure_time=2023-01-01T12%3A00%3A00Z&polyline=${encodeURIComponent(encodedPolyline)}`;

    // Include your TollGuru API key in the headers
    const headers = {
      'x-api-key': 'YOUR_TOLLGURU_API_KEY',
    };

    // Send request to TollGuru API
    axios.get(apiUrl, { headers })
      .then(response => {
        const { path, tolls } = response.data.route;
        setRouteCoordinates(path);
        setTollMarkers(tolls);
      })
      .catch(error => {
        console.error('Error fetching route from TollGuru:', error);
      });
  }, []);

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
        <Marker key={index} position={[marker.location.latitude, marker.location.longitude]}>
          <Popup>
            <div>
              <h3>{marker.name}</h3>
              <p>Cost: {marker.charge}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default App;
