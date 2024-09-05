export const load = async ({ locals }) => {
    const { user } = locals;
  
    // Get the current org id
    const { data: org } = await locals.supabase
      .from("profiles")
      .select("org")
      .eq("user_id", user.id)
      .single();
  
    const org_id = org.org;
    console.log(org_id);
  
    // Query the teams
    const { data: teams } = await locals.supabase
      .from("teams")
      .select("id, name")
      .eq("organization_id", org_id);
  
    // Get the users associated with each team
    const teamsWithUsers = await Promise.all(
      teams.map(async (team) => {
        const { data: users } = await locals.supabase
          .from("profiles")
          .select("*")
          .eq("team_id", team.id);
  
        return {
          ...team,
          users: users || [], // Attach users to the team
        };
      })
    );
  
    return {
      teams: teamsWithUsers,
    };
  };
  