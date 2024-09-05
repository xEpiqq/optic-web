import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { PRIVATE_SERVICE_ROLE_KEY } from '$env/static/private';

export async function PUT({ request, locals }) {
    try {
        const { user_id, email, firstName, lastName, phone, team, role } = await request.json();

        // Create an admin client
        const supabase = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SERVICE_ROLE_KEY, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        });

        // Step 1: Update user in Supabase Auth (only email can be updated here)
        const { error: authUpdateError } = await supabase.auth.admin.updateUserById(
            user_id,
            { email: email }
        );

        if (authUpdateError) {
            console.error('Error updating user in auth:', authUpdateError);
            return json({ error: 'Failed to update user in auth' }, { status: 500 });
        }

        // Step 2: Update user in the profiles table
        const { data: profile, error: profileError } = await locals.supabase
            .from('profiles')
            .update({
                first_name: firstName,
                last_name: lastName,
                user_type: role,
                email: email,
                phone: phone,
                team_id: team
            })
            .eq('user_id', user_id)
            .select()
            .single();

        if (profileError) {
            console.error('Error updating user profile:', profileError);
            return json({ error: 'Failed to update user profile' }, { status: 500 });
        }

        return json(profile);
    } catch (error) {
        console.error('Unexpected error:', error);
        return json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}