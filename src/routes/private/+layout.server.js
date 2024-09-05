import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    const { user } = locals;

    // Fetch the user's profile along with their team and organization name
    const { data, error } = await locals.supabase
      .from('profiles')
      .select(`
        *,
        teams ( 
            name, 
            organization: organizations (name)
        )
      `)
      .eq('user_id', user.id)
      .single();

    if (error) {
        console.error('Error fetching profile:', error);
        throw redirect(303, '/');
    }

    // make sure user is super_user if not kick em out
    if (data.user_type !== 'super_user') {
        throw redirect(303, '/');
    }

    const orgName = data.teams.organization.name;

    // get team ids and team names

    const { data: teams, error: error2 } = await locals.supabase
      .from("teams")
      .select("id, name")
      .eq("organization_id", 1)
    
    if (error2) {
        console.error('Error fetching teams:', error2);
        throw redirect(303, '/');
    }

    return {
      userProfile: {
        ...data,
        orgName,  // Include the organization name in the returned data
        user_id: user.id,
        teams
      }
    };
};
