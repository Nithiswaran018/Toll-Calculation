// cost and Details
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';

const MapWithRoute = ({ routeCoordinates, tollMarkers }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && routeCoordinates.length > 0) {
      const bounds = routeCoordinates.reduce((acc, point) => {
        return acc.extend(point);
      }, new window.L.LatLngBounds());

      map.fitBounds(bounds);
    }
  }, [map, routeCoordinates]);

  return (
    <MapContainer
      center={[0, 0]} // Set the initial center of the map
      zoom={13} // Set the initial zoom level
      style={{ height: '400px', width: '100%' }}
      whenCreated={setMap}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {routeCoordinates.length > 0 && <Polyline positions={routeCoordinates} color="blue" />}

      {tollMarkers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>
            <div>
              <h3>Toll Information</h3>
              <p>
                <strong>Cost:</strong> ${marker.cost}
              </p>
              <p>
                <strong>Details:</strong> {marker.additionalDetails}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapWithRoute;
