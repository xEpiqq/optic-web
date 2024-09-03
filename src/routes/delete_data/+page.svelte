<script>
    let email = '';
    let showSuccessMessage = false;
  
    function deleteData() {
      // Simulate data deletion logic
      showSuccessMessage = true;
    }
  </script>
  
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Request Data Deletion
      </h2>
      <label for="email" class="block text-sm font-medium text-gray-700">
        Email Address
      </label>
      <input
        id="email"
        type="email"
        bind:value={email}
        placeholder="Enter your email"
        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <button
        class="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200"
        on:click={deleteData}
      >
        Delete My Data
      </button>
  
      {#if showSuccessMessage}
        <p class="mt-4 text-center text-green-600 font-semibold">
          Your data has been successfully deleted!
        </p>
      {/if}
    </div>
  </div>
  