import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
    const { user } = locals;
    const { leadIds, assignType, assignId } = await request.json();
    console.log(leadIds, assignType, assignId);

    try {
        if (assignType === 'user') {
            // Fetch the team_id for the user
            const { data: profileData, error: profileError } = await locals.supabase
                .from('profiles')
                .select('team_id')
                .eq('user_id', assignId) // Fetch the team_id based on assignId (which is the user's ID)
                .single();

            if (profileError) {
                console.error('Error fetching team_id:', profileError);
                return json({ error: profileError.message }, { status: 500 });
            }

            const teamId = profileData.team_id;

            // Update each lead's user_id and team_id
            const { data, error } = await locals.supabase
                .from('leads')
                .update({ user_id: assignId, team_id: teamId }) // Update user_id and team_id
                .in('id', leadIds); // Apply to all leadIds

            if (error) {
                console.error('Error updating leads:', error);
                return json({ error: error.message }, { status: 500 });
            }

            return json({ success: true, updatedLeads: data }, { status: 200 });

        } else if (assignType === 'team') {
            // Only update the team_id when assignType is "team"
            const { data, error } = await locals.supabase
                .from('leads')
                .update({ team_id: assignId }) // Only update team_id
                .in('id', leadIds); // Apply to all leadIds

            if (error) {
                console.error('Error updating leads:', error);
                return json({ error: error.message }, { status: 500 });
            }

            return json({ success: true, updatedLeads: data }, { status: 200 });
        }

        // Handle other cases if any

    } catch (err) {
        console.error('Unexpected error:', err);
        return json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}
