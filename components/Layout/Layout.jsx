import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import Navigation from "./Navigation";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const [username, setUsername] = useState(null)
  const router = useRouter()
  const currentUrl = router.asPath

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    getUsername()
  }, [session])
  async function getUsername() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div>
      <Navigation username={username} currentUrl={currentUrl} />
      {children}
    </div>
  )
}