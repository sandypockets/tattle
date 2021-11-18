import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'
import HomePage from "../components/HomePage";
import Layout from '../components/Layout/Layout'
import LoadingWheel from "../components/Utils/LoadingWheel";

export default function Index() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if (!supabase.auth.session()) {
      router.push('/signin')
    }
  }, [session])

  return (
    <>
      {loading || !session ? (
        <div className="flex justify-center mt-24">
          <LoadingWheel />
        </div>
        ) : (
        <Layout>
          <HomePage />
        </Layout>
      )}
    </>
  )
}