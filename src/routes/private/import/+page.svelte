<script>
  let file;
  let isProcessing = false; // To track if the process is ongoing
  let fileSelected = false;  // To track if a file has been selected
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const BATCH_SIZE = 50; // Limit to 50 requests per second
  const DELAY = 1000; // 1 second delay between each batch
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

  import { createClient } from '@supabase/supabase-js';

  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY;
  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

  function handleFileUpload(event) {
    file = event.target.files[0];
    fileSelected = !!file; // Set fileSelected to true if a file is chosen
  }

  async function startUpload() {
    if (!file) return;
    isProcessing = true; // Start loading spinner

    const reader = new FileReader();

    reader.onload = async (event) => {
      const csv = event.target.result;
      const addresses = parseCSV(csv);

      // Process addresses in batches of 50
      for (let i = 0; i < addresses.length; i += BATCH_SIZE) {
        const batch = addresses.slice(i, i + BATCH_SIZE);
        await processBatch(batch);
        await sleep(DELAY); // Add delay between batches
      }
      isProcessing = false; // Stop loading spinner when done
    };

    reader.readAsText(file);
  }

  function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');

    return lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        address: values[headers.indexOf('ADDRESS')],
        address2: values[headers.indexOf('ADDRESS2')] || '',
        city: values[headers.indexOf('CITY')],
        state: values[headers.indexOf('STATE')],
        zip5: values[headers.indexOf('ZIP_5')],
        zip9: values[headers.indexOf('ZIP_9')] || ''
      };
    });
  }

  async function processBatch(batch) {
    const promises = batch.map(({ address, address2, city, state, zip5, zip9 }) => 
      geocodeAndStoreLead(address, address2, city, state, zip5, zip9)
    );
    await Promise.all(promises);
  }

  async function geocodeAndStoreLead(address, address2, city, state, zip5, zip9) {
    const fullAddress = `${address}, ${city}, ${state} ${zip5}, USA`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      const location = data.results[0].geometry.location;

      // Now store the lead in the database with geolocation data
      await storeLeadInDB({
        address,
        address2,
        city,
        state,
        zip5,
        zip9,
        latitude: location.lat,
        longitude: location.lng,
        status: 0 // Assuming new lead status
      });

    } else {
      console.error('Geocoding failed for address:', fullAddress, 'Status:', data.status);
    }
  }

  async function storeLeadInDB(leadData) {
    const { data, error } = await supabase
      .from('leads')
      .insert({
        org_id: 1, // Default org_id as you mentioned
        address: leadData.address,
        address2: leadData.address2,
        city: leadData.city,
        state: leadData.state,
        zip5: leadData.zip5,
        zip9: leadData.zip9,
        latitude: leadData.latitude,
        longitude: leadData.longitude,
        status: leadData.status,
        created_at: new Date(),
        updated_at: new Date()
      });

    if (error) {
      console.error('Error inserting lead into database:', error.message);
    } else {
      console.log('Lead inserted successfully:', data);
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
</script>

<div class="border-b border-gray-200 pb-5">
  <h3 class="text-base font-semibold leading-6 text-gray-900">Import Leads</h3>
</div>

<div class="flex w-full mt-72 items-center justify-center">
  <div class="text-center flex flex-col">
    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    </svg>
    <h3 class="mt-2 text-sm font-semibold text-gray-900">Import Leads</h3>
    <p class="mt-1 text-sm text-gray-500">Select a CSV file from your device</p>
    <div class="mt-6">
      <input type="file" accept=".csv" on:change="{handleFileUpload}" />
    </div>
    {#if fileSelected}
      <button 
        class="mt-6 bg-blue-500 text-white py-2 px-4 rounded flex justify-center items-center"
        on:click="{startUpload}"
        disabled={isProcessing}
      >
        {#if isProcessing}
          <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        {/if}
        {isProcessing ? 'Uploading...' : 'Start Upload'}
      </button>
    {/if}
  </div>
</div>
