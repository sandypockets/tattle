import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Meta from "./Meta";

export default function Layout({ children }) {
  const [session, setSession] = useState(null)
  const router = useRouter()
  const currentUrl = router.asPath

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <>
      <Meta />
      <header>
        <Navigation currentUrl={currentUrl} />
      </header>
      <main className="mt-10">
        {children}
      </main>
      <Footer />
    </>
  )
}