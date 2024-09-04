export const load = async ({ locals }) => {
    const { user } = locals;
  
    const { data } = await locals.supabase
      .from('Users')
      .select('user_type')
      .eq('id', user.id)
      .single();
  
    console.log(data);
  
    return {
      user: {
        ...user,
        user_type: data?.user_type
      }
    };
  };
  