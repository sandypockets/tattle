import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import Navigation from "./Navigation";
import axios from "axios";
import Footer from "./Footer";
import Meta from "./Meta";

export default function Layout({ children }) {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const [username, setUsername] = useState(null)
  const router = useRouter()
  const currentUrl = router.asPath
  const user = supabase.auth.user()

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if (user) {
      axios
        .get('/api/usernames', {
          params: { id: user.id }
        })
        .then(function (response) {
          setUsername(response.data.data.username)
        })
        .catch(function (error) {
          console.error(error);
        })
    }
  }, [session])

  return (
    <>
      <Meta />
      <header>
        <Navigation username={username} currentUrl={currentUrl} />
      </header>
      <main className="mt-10">
        {children}
      </main>
      <Footer />
    </>
  )
}