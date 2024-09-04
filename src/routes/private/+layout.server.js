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

    if (data.user_type !== 'super_user') {
        throw redirect(303, '/');
    }

    // Extract the organization name from the data
    const orgName = data.teams.organization.name;

    return {
      userProfile: {
        ...data,
        orgName,  // Include the organization name in the returned data
        user_id: user.id
      }
    };
};
