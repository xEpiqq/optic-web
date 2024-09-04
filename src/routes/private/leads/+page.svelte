<script>
    import { onMount } from 'svelte';
  
    let map;
    let markers = [];
    let drawingManager;
    let selectedPolygon = null;
  
    // Example locations for markers
    const locations = [
      { lat: 37.1305, lng: -113.5083, title: 'Location 1' }, 
      { lat: 37.1405, lng: -113.5183, title: 'Location 2' }, 
      { lat: 37.1505, lng: -113.5283, title: 'Location 3' }
    ];
  
    // Load Google Maps script dynamically
    function loadGoogleMaps() {
      return new Promise((resolve, reject) => {
        if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
          resolve();
        } else {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=drawing,geometry`;
          script.async = true;
          script.defer = true;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        }
      });
    }
  
    // Add markers to the map
    function addMarkers(locations) {
      locations.forEach(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.title
        });
        markers.push(marker);
      });
    }
  
    // Initialize drawing manager for polygon drawing
    function initDrawingManager() {
      drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: null, // Default to no drawing
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ['polygon']
        },
        polygonOptions: {
          fillColor: '#ffdc6c',
          fillOpacity: 0.5,
          strokeWeight: 2,
          clickable: false,
          editable: false,
          zIndex: 1
        }
      });
  
      drawingManager.setMap(map);
  
      // Listen for the completion of the polygon
      window.google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
        if (selectedPolygon) {
          selectedPolygon.setMap(null); // Remove previous polygon
        }
        selectedPolygon = polygon;
  
        // Check which markers are inside the polygon
        markers.forEach(marker => {
          if (window.google.maps.geometry.poly.containsLocation(marker.getPosition(), polygon)) {
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png'); // Change marker color if inside
          } else {
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png'); // Change marker color if outside
          }
        });
      });
    }
  
    onMount(async () => {
      try {
        await loadGoogleMaps();
  
        // Create a map after Google Maps script is loaded
        map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: 37.1305, lng: -113.5083 },
          zoom: 12
        });
  
        // Add markers after the map is loaded
        addMarkers(locations);
  
        // Initialize drawing manager for lasso tool (polygon drawing)
        initDrawingManager();
      } catch (error) {
        console.error('Google Maps failed to load:', error);
      }
    });
  </script>
  
  <style>
    #map {
      height: 90vh;
      width: 90%;
    }
  </style>
  
  <div id="map"></div>
  