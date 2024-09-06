  <script>
    export let slug;
  
    // Dummy data for teams and reps
    const teams = [
      {
        name: 'Top Tier',
        reps: [
          { name: 'John Doe', deals: 12, doorsKnocked: 100, lastKnocked: '2 days ago', last30DaysDeals: 50 },
          { name: 'Jane Smith', deals: 8, doorsKnocked: 80, lastKnocked: '3 days ago', last30DaysDeals: 40 },
        ],
      },
      {
        name: 'Team Beta',
        reps: [
          { name: 'Scavenger', deals: 15, doorsKnocked: 120, lastKnocked: '1 day ago', last30DaysDeals: 55 },
          { name: 'Bob Green', deals: 10, doorsKnocked: 90, lastKnocked: '4 days ago', last30DaysDeals: 35 },
        ],
      },
    ];
  
    let selectedTeam = 'All Teams';
  
    const selectTeam = (teamName) => {
      selectedTeam = teamName;
    };
  
    const filteredReps = selectedTeam === 'All Teams'
      ? teams.flatMap(team => team.reps)
      : teams.find(team => team.name === selectedTeam)?.reps || [];
  
    const topPerformers = filteredReps.sort((a, b) => b.deals - a.deals).slice(0, 3);
  
    // Additional functions for stats
    const calculateConversionRate = (rep) => {
      return ((rep.deals / rep.doorsKnocked) * 100).toFixed(2);
    };
  
    const calculateAverageDealsPerDay = (rep) => {
      return (rep.last30DaysDeals / 30).toFixed(1);
    };
  
    // Aggregate team stats
    const getTeamStats = () => {
      const allReps = teams.flatMap(team => team.reps);
      const totalDeals = allReps.reduce((sum, rep) => sum + rep.deals, 0);
      const totalDoorsKnocked = allReps.reduce((sum, rep) => sum + rep.doorsKnocked, 0);
      const avgDealsPerRep = (totalDeals / allReps.length).toFixed(2);
      return { totalDeals, totalDoorsKnocked, avgDealsPerRep };
    };
  
    const teamStats = getTeamStats();
  </script>
  
  <div class="container mx-auto p-6">
    <div class="mb-6 text-center">
      <h1 class="text-4xl font-bold text-gray-800">Reporting Dashboard</h1>
      <p class="text-lg text-gray-600">Comprehensive stats on deals, performance, and conversions</p>
      <p class="text-xl font-bold text-gray-700 mt-2">Report for: {slug}</p>
    </div>
  
    <!-- Team Summary Stats -->
    <div class="bg-gray-100 p-6 rounded-lg shadow mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Team Statistics</h2>
      <div class="flex justify-around mt-4">
        <div class="text-center">
          <h3 class="text-lg font-medium text-gray-600">Total Deals</h3>
          <p class="text-2xl font-bold text-gray-700">{teamStats.totalDeals}</p>
        </div>
        <div class="text-center">
          <h3 class="text-lg font-medium text-gray-600">Total Doors Knocked</h3>
          <p class="text-2xl font-bold text-gray-700">{teamStats.totalDoorsKnocked}</p>
        </div>
        <div class="text-center">
          <h3 class="text-lg font-medium text-gray-600">Avg Deals per Rep</h3>
          <p class="text-2xl font-bold text-gray-700">{teamStats.avgDealsPerRep}</p>
        </div>
      </div>
    </div>
  
    <!-- Team Selector -->
    <div class="mb-6">
      <label class="block mb-2 text-gray-700">Filter by Team:</label>
      <select class="w-full p-2 border rounded" bind:value={selectedTeam}>
        <option>All Teams</option>
        {#each teams as team}
          <option>{team.name}</option>
        {/each}
      </select>
    </div>
  
    <!-- Top Performers -->
    <div class="mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Top Performers</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {#each topPerformers as rep}
          <div class="p-4 bg-white shadow-lg rounded-lg">
            <h3 class="text-xl font-bold text-gray-700">{rep.name}</h3>
            <p class="text-gray-600">Deals: {rep.deals}</p>
            <p class="text-gray-600">Conversion Rate: {calculateConversionRate(rep)}%</p>
            <p class="text-gray-600">Average Deals/Day: {calculateAverageDealsPerDay(rep)}</p>
          </div>
        {/each}
      </div>
    </div>
  
    <!-- All Reps Summary -->
    <div class="mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Last 30 Days Summary</h2>
      <table class="w-full mt-4 table-auto">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 text-left text-gray-600">Name</th>
            <th class="px-4 py-2 text-left text-gray-600">Deals</th>
            <th class="px-4 py-2 text-left text-gray-600">Doors Knocked</th>
            <th class="px-4 py-2 text-left text-gray-600">Last Knocked</th>
            <th class="px-4 py-2 text-left text-gray-600">Last 30 Days Deals</th>
            <th class="px-4 py-2 text-left text-gray-600">Conversion Rate</th>
            <th class="px-4 py-2 text-left text-gray-600">Avg Deals/Day</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredReps as rep}
            <tr class="border-t">
              <td class="px-4 py-2">{rep.name}</td>
              <td class="px-4 py-2">{rep.deals}</td>
              <td class="px-4 py-2">{rep.doorsKnocked}</td>
              <td class="px-4 py-2">{rep.lastKnocked}</td>
              <td class="px-4 py-2">{rep.last30DaysDeals}</td>
              <td class="px-4 py-2">{calculateConversionRate(rep)}%</td>
              <td class="px-4 py-2">{calculateAverageDealsPerDay(rep)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  
  <style>
    select {
      transition: box-shadow 0.2s;
    }
  
    select:focus {
      box-shadow: 0 0 0 2px rgba(0, 128, 255, 0.5);
    }
  </style>
  