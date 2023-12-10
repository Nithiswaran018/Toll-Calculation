// ...

useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.leafletElement;
  
      // Define the start and end points
      const startPoint = L.latLng(51.505, -0.09); // Example: London
      const endPoint = L.latLng(48.8566, 2.3522); // Example: Paris
  
      // Add the Leaflet Routing Machine control
      const control = L.Routing.control({
        waypoints: [startPoint, endPoint],
        routeWhileDragging: true,
        // Add event listener to handle route creation
        createMarker: function (i, waypoint, number) {
          const marker = L.marker(waypoint.latLng);
  
          // Simulated toll information (replace with your actual toll information)
          const tollInfo = {
            name: `Toll Point ${number}`,
            cost: `$${number * 2}.00`,
          };
  
          // Add toll information to the marker popup
          marker.bindPopup(`
            <div>
              <h3>${tollInfo.name}</h3>
              <p>Cost: ${tollInfo.cost}</p>
            </div>
          `);
  
          return marker;
        },
      }).addTo(map);
  
      // Handle route creation event
      map.on('routing:routeWaypoints', function (event) {
        // Do something with the route waypoints
        console.log('Route Waypoints:', event.waypoints);
      });
    }
  }, []);
  
  // ...
  