import { supabase } from "../../lib/supabaseClient";

export default async function handleLogin(email) {
  try {
    const { error } = await supabase.auth.signIn({ email })
    if (error) throw error
    console.error(error)
  } catch (error) {
    console.error(error.error_description || error.message)
  }
}