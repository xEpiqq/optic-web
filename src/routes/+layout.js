import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export const load = async ({ data, depends, fetch }) => {
  // Declare a dependency to invalidate the layout on session refresh
  depends('supabase:auth');

  const supabase = isBrowser()
    ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
      })
    : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
        cookies: {
          getAll() {
            return data.cookies;
          },
        },
      });

  // Get the current session
  const sessionResponse = await supabase.auth.getSession();
  const session = sessionResponse?.data?.session;

  // If there's no session, avoid redirect loop
  if (!session) {
    return {
      session: null,
      user: null,
      userProfile: null
    };
  }

  // Get the authenticated user
  const userResponse = await supabase.auth.getUser();
  const user = userResponse?.data?.user;

  // If the user is not found, ensure proper handling
  if (!user) {
    return {
      session,
      user: null,
      userProfile: null
    };
  }

  // Fetch the user's profile from the 'profiles' table
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  // Handle any potential error in fetching the profile
  if (profileError) {
    console.error('Error fetching profile:', profileError);
    return {
      session,
      user,
      userProfile: null
    };
  }

  // Return session, supabase instance, user, and profile
  return {
    session,
    supabase,
    user,
    userProfile: profile // Include the user profile here
  };
};
