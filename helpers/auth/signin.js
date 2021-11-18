import { supabase } from "../../lib/supabaseClient";

export default async function handleSignIn(userEmail, userPassword, router) {
  try {
    const { email, password, error } = await supabase.auth.signIn(
      {
        email: userEmail,
        password: userPassword,
      })
    if (error) throw error
    const userSession = await supabase.auth.session()
    if (!userSession) {
      console.error(error)
    }
  } catch (error) {
    console.error(error.error_description || error.message)
  } finally {
    if (await supabase.auth.session()) {
      router.push('/')
    }
  }
}