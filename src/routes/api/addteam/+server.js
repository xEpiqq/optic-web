import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
    try {
        const { name } = await request.json();
        const { user } = locals;

        // Get the current org id
        const { data: org, error: orgError } = await locals.supabase
            .from("profiles")
            .select("org")
            .eq("user_id", user.id)
            .single();

        if (orgError) {
            console.error('Error fetching org:', orgError);
            return json({ error: 'Failed to fetch organization' }, { status: 500 });
        }

        const org_id = org.org;

        // Insert the new team
        const { data: newTeam, error: insertError } = await locals.supabase
            .from("teams")
            .insert({ name, organization_id: org_id })
            .select()
            .single();

        if (insertError) {
            console.error('Error inserting team:', insertError);
            return json({ error: 'Failed to add team' }, { status: 500 });
        }

        // Return the newly created team
        return json(newTeam);
    } catch (error) {
        console.error('Unexpected error:', error);
        return json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}