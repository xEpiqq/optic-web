import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    const { supabase, user } = locals;

    // Ensure user exists
    if (!user) {
        throw redirect(303, '/auth');
    }

    // Fetch the user's profile along with their team and organization name
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select(`
            *,
            teams (
                id,
                name,
                organization: organizations (id, name)
            )
        `)
        .eq('user_id', user.id)
        .single();

    // Handle error fetching profile
    if (profileError) {
        console.error('Error fetching profile:', profileError);
        throw redirect(303, '/');
    }

    // Ensure the user is a super_user
    if (profile.user_type !== 'super_user') {
        throw redirect(303, '/');
    }

    // Get the organization ID from the profile
    const orgId = profile.teams.organization.id;

    // Fetch all teams and their users within the organization
    const { data: teams, error: teamsError } = await supabase
        .from('teams')
        .select(`
            id,
            name,
            users: profiles (user_id, first_name, last_name, user_type)
        `)
        .eq('organization_id', orgId);

    // Handle error fetching teams and users
    if (teamsError) {
        console.error('Error fetching teams and users:', teamsError);
        throw redirect(303, '/');
    }

    // Flatten all users across all teams
    const allUsers = teams.flatMap(team => team.users);

    console.log("all users............")
    console.log(allUsers)
    // Organize users by team
    const usersPerTeam = teams.map(team => ({
        team_name: team.name,
        users: team.users,
    }));

    // Return data to the frontend
    return {
        allUsers, // All users across the whole organization (flattened)
        usersPerTeam, // Users organized by each team
        organizationName: profile.teams.organization.name // Organization name
    };
};
