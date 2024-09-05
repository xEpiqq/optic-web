export const load = async ({locals}) => {
  const { user } = locals
  const {data} = await locals.supabase
    .from("profiles")
    .select("org")
    .eq("user_id", user.id)
    .single()

  const org = data.org

  const {data: teams} = await locals.supabase
    .from("teams")
    .select("id, name")
    .eq("organization_id", org)

    return {
      teams
    }
  }