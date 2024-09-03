export const load = async ({ locals: { supabase } }) => {
    const { data: countries } = await supabase.from('countries').select('name').limit(15).order('name');
    return { countries: countries ?? [] };
  };