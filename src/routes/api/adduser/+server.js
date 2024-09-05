import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { PRIVATE_SERVICE_ROLE_KEY } from '$env/static/private';

export async function POST({ request, locals }) {
    try {
        const { email, firstName, lastName, phone, team, role, organization_id } = await request.json();
        
        // this is an admin client because i used public_service_role_key
        const supabase = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SERVICE_ROLE_KEY, {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        })
        
        // Step 1: Create the user in Supabase Auth
        const { data: authUser, error: signUpError } = await supabase.auth.admin.createUser({
            email,
            password: '123456', // Default password
            email_confirm: true,
        });

        if (signUpError) {
            console.error('Error creating user:', signUpError);
            return json({ error: 'Failed to create user' }, { status: 500 });
        }

        // Step 2: Add user to the profiles table
        const { data: profile, error: profileError } = await locals.supabase
            .from('profiles')
            .upsert({
                user_id: authUser.user.id,
                first_name: firstName,
                last_name: lastName,
                user_type: role,
                email: email,
                phone: phone,
                team_id: team,
                org: organization_id
            }, { onConflict: 'id' })
            .select()
            .single();

        if (profileError) {
            console.error('Error creating profile:', profileError);
            // If profile creation fails, we should delete the auth user
            await supabase.auth.admin.deleteUser(authUser.user.id);
            return json({ error: 'Failed to create user profile' }, { status: 500 });
        }

        return json(profile);
    } catch (error) {
        console.error('Unexpected error:', error);
        return json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}