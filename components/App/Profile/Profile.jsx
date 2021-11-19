import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import { supabase } from '../../../lib/supabaseClient'
import ProfileForm from "./ProfileForm"
import getProfile from "../../../helpers/profile/getProfile";

export default function Profile() {
  const user = supabase.auth.user()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatar_url, setAvatarUrl] = useState('')
  const [email, setEmail] = useState(user ? user.email : '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [session, setSession] = useState(null)
  const router = useRouter()

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if (user.id) {
      getProfile(user, setUsername, setWebsite, setAvatarUrl)
    }
  }, [session])

  return (
    <div>
    {user && (
      <div className="flex justify-center mt-24">
        <ProfileForm
          username={username}
          email={email}
          user={user}
          password={password}
          website={website}
          setUsername={setUsername}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          setWebsite={setWebsite}
          confirmPassword={confirmPassword}
          loading={loading}
          router={router}
        />
      </div>
    )}
    </div>
  )
}
