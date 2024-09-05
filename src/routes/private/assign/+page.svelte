<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { writable } from 'svelte/store';

  export let data;
  const teams = data.userProfile.teams;
  const users = data.users;
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapId = "YOUR_MAP_ID";

  // Create a writable store for leads
  const leadsStore = writable(data.leads);

  let map;
  let drawingManager;
  let selectedLeads = [];
  let showModal = false;
  let selectedTeam = "";
  let selectedUser = "";
  let assignmentType = "team";

  $: if (map && $leadsStore) {
    addLeadsToMap($leadsStore);
  }

  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.67757510, lng: -113.07306380 },
      zoom: 10,
      mapId,
    });

    drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: null,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON],
      },
    });
    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        const polygon = event.overlay;
        selectedLeads = $leadsStore.filter(lead => 
          google.maps.geometry.poly.containsLocation(
            new google.maps.LatLng(lead.latitude, lead.longitude), 
            polygon
          )
        );
        showModal = true;
        polygon.setMap(null);
      }
    });
  }

  function addLeadsToMap(leads) {
  // Clear existing markers if any
  if (map.markers) {
    map.markers.forEach(marker => marker.setMap(null));
  }
  map.markers = [];

  leads.forEach((lead) => {
    let pinOptions;

    // Check for user assignment first
    if (lead.user_id !== null && lead.user_id !== undefined) {
      // Blue marker for user-assigned leads
      pinOptions = new google.maps.marker.PinElement({
        background: "#4285F4", // Blue background
        borderColor: "#1A73E8", // Dark blue border
        glyphColor: "#0c59d4",
        scale: 1, // Adjust scale if needed
      });
    } 
    // Check for team assignment with user_id being null
    else if (lead.team_id !== null && lead.team_id !== undefined) {
      // Green marker for team-assigned leads where user_id is null
      pinOptions = new google.maps.marker.PinElement({
        background: "#34A853", // Green background
        borderColor: "#0F9D58", // Dark green border
        glyphColor: "#0d874c",
        scale: 1,
      });
    } 
    // Unassigned (red)
    else {
      // Red marker for unassigned leads
      pinOptions = new google.maps.marker.PinElement({
        background: "#EA4335", // Red background
        borderColor: "#C5221F", // Dark red border
        scale: 1,
      });
    }

    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: lead.latitude, lng: lead.longitude },
      map,
      content: pinOptions.element, // Use the custom pin element
      title: `${lead.address}, ${lead.city}, ${lead.state}`, // Optional title
    });

    const infoWindow = new google.maps.InfoWindow({
      content: getInfoWindowContent(lead),
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    map.markers.push(marker);
  });
}







  function getInfoWindowContent(lead) {
    let content = `<div><strong>Address:</strong> ${lead.address}, ${lead.city}, ${lead.state}</div>`;
    
    if (lead.user_id) {
      const user = users.find(u => u.user_id === lead.user_id);
      content += `<div><strong>Assigned to:</strong> ${user ? user.first_name + ' ' + user.last_name : 'Unknown User'}</div>`;
    }
    
    if (lead.team_id) {
      const team = teams.find(t => t.id === lead.team_id);
      content += `<div><strong>Team:</strong> ${team ? team.name : 'Unknown Team'}</div>`;
    }
    
    if (!lead.user_id && !lead.team_id) {
      content += `<div><strong>Status:</strong> Unassigned</div>`;
    }
    
    return content;
  }

  async function assignLeads() {
    const assignType = assignmentType;
    const assignId = assignType === 'team' ? selectedTeam : selectedUser;

    if (!assignId) {
      alert("Please select a team or user for assignment.");
      return;
    }

    const leadIds = selectedLeads.map(lead => lead.id);

    try {
      const response = await fetch('/api/assignarea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leadIds, assignType, assignId }),
      });

      const result = await response.json();

      if (result.success) {
        alert(`Successfully assigned ${leadIds.length} leads.`);
        // Update the local leads data
        leadsStore.update(leads => 
          leads.map(lead => {
            if (leadIds.includes(lead.id)) {
              return {
                ...lead,
                [assignType === 'team' ? 'team_id' : 'user_id']: assignId,
                [assignType === 'team' ? 'user_id' : 'team_id']: null // Clear the other assignment
              };
            }
            return lead;
          })
        );
      } else {
        alert(`Failed to assign leads: ${result.error}`);
      }
    } catch (error) {
      console.error('Error assigning leads:', error);
      alert('An error occurred while assigning leads.');
    }

    showModal = false;
    selectedLeads = [];
    selectedTeam = "";
    selectedUser = "";
    assignmentType = "team";
  }

  function handleAssignmentTypeChange(type) {
    assignmentType = type;
    selectedTeam = "";
    selectedUser = "";
  }

  onMount(() => {
    if (browser) {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=drawing,geometry,marker`;
        script.async = true;
        script.defer = true;
        window.initMap = initMap;
        document.head.appendChild(script);
      } else {
        initMap();
      }
    }
  });
</script>

<style>
  #map {
    height: 90vh;
    width: 100%;
  }
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
</style>

<div id="map"></div>

{#if showModal}
  <div class="modal">
    <h2>Assign {selectedLeads.length} Leads</h2>
    <div class="assignment-type">
      <label>
        <input type="radio" name="assignmentType" value="team" checked={assignmentType === 'team'} on:change={() => handleAssignmentTypeChange('team')}>
        Assign to Team
      </label>
      <label>
        <input type="radio" name="assignmentType" value="user" checked={assignmentType === 'user'} on:change={() => handleAssignmentTypeChange('user')}>
        Assign to User
      </label>
    </div>
    {#if assignmentType === 'team'}
      <select bind:value={selectedTeam}>
        <option value="">Select a team</option>
        {#each teams as team}
          <option value={team.id}>{team.name}</option>
        {/each}
      </select>
    {:else}
      <select bind:value={selectedUser}>
        <option value="">Select a user</option>
        {#each users as user}
          <option value={user.user_id}>{user.first_name} {user.last_name}</option>
        {/each}
      </select>
    {/if}
    <button on:click={assignLeads}>Assign</button>
    <button on:click={() => showModal = false}>Cancel</button>
  </div>
{/if}