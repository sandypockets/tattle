import { supabase } from "../../lib/supabaseClient";

// Not working
export default async function updateAuthProfile(email, password) {
  try {
    const { user, error } = await supabase.auth.update({
      'email': email,
      'password': password
    })
    if (user) {
      console.log(user)
    }
    if (error) {
      console.log(error)
    }
  } catch (error) {
    console.error(error.message)
  }
}