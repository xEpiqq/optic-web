<script>
    import { onMount } from "svelte";
    import { browser } from "$app/environment"; // Import browser check for SSR
  
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const mapId = "YOUR_MAP_ID"; // Replace this with your actual Map ID
  
    // Define the initMap function and assign it to the window object
    function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 37.4239163, lng: -122.0947209 }, // Initial map center
            zoom: 8,
            mapId, // Add the Map ID to ensure Advanced Markers work correctly
        });
  
        // Add the advanced marker
        const marker = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: { lat: 37.4239163, lng: -122.0947209 }, // Marker position
        });
  
        // Attach the marker to the map
        marker.map = map;
    }
  
    onMount(() => {
      if (browser) {
        // Check if the Google Maps script is already loaded
        if (!document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)) {
          // Attach the initMap function to the window object
          window.initMap = initMap;
  
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=marker`;
          script.async = true;
          document.head.appendChild(script);
        } else {
          // If the script is already loaded, directly call the initMap function
          initMap();
        }
      }
    });
  </script>
  
  <style>
    #map {
        height: 400px;
        width: 100%;
    }
  </style>
  
  <div id="map"></div>
  