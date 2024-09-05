// +page.server.js
export const load = async ({ locals }) => {
  
    // Fetch leads data from the Supabase database
    const { data: leads, error } = await locals.supabase
      .from("leads")
      .select("id, latitude, longitude, address, city, state, team_id, user_id");

  
    if (error) {
      console.error("Error fetching leads:", error);
      return { leads: [] }; // Return an empty array if there's an error
    }

    // fetch all users
    const {data: users, error: usererror } = await locals.supabase
      .from("profiles")
      .select("first_name, last_name, user_id, team_id")
  
    return {
      leads,
      users
    };
  };
  