import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import SignIn from "../components/Auth";
import { useRouter } from 'next/router'
import HomePage from "../components/HomePage";
import Layout from '../components/Layout/Layout'
import LoadingWheel from "../components/LoadingWheel";

export default function Index() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Loading delay
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }, [session])

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <>
      {loading ? (
        <div className="flex justify-center mt-24">
          <LoadingWheel />
        </div>
        ) :
        !session ? <SignIn /> : (
        <Layout>
          <HomePage />
        </Layout>
      )}
    </>
  )
}