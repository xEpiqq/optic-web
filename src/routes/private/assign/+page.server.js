// +page.server.js
export const load = async ({ locals }) => {
  
    // Fetch leads data from the Supabase database
    const { data: leads, error } = await locals.supabase
      .from("leads")
      .select("latitude, longitude, address, city, state");

  
    if (error) {
      console.error("Error fetching leads:", error);
      return { leads: [] }; // Return an empty array if there's an error
    }
  
    return {
      leads,
    };
  };
  