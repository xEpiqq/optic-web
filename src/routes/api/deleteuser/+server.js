import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { PRIVATE_SERVICE_ROLE_KEY } from '$env/static/private';

export async function DELETE({ request, locals }) {
    try {
        const { user_id } = await request.json();

        // Create an admin client
        const supabase = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SERVICE_ROLE_KEY, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        });

        // Step 1: Delete user from the profiles table
        const { error: profileError } = await locals.supabase
            .from('profiles')
            .delete()
            .eq('user_id', user_id);

        if (profileError) {
            console.error('Error deleting user profile:', profileError);
            return json({ error: 'Failed to delete user profile' }, { status: 500 });
        }

        // Step 2: Delete the user from Supabase Auth
        const { error: authError } = await supabase.auth.admin.deleteUser(user_id);

        if (authError) {
            console.error('Error deleting user from auth:', authError);
            return json({ error: 'Failed to delete user from auth' }, { status: 500 });
        }

        return json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Unexpected error:', error);
        return json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}