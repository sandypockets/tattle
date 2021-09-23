import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Account() {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [session, setSession] = useState(null)
  const user = supabase.auth.user()

  useEffect(() => {
    getProfile()
  }, [])

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  async function getProfile() {
    try {
      setLoading(true)
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }
      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true)
      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }
      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })
      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    {user && (
      <div className="flex justify-center mt-48">
        <div className="flex flex-col p-4 bg-gray-200 w-1/3 rounded-lg">
          <h1 className="flex justify-center text-2xl mb-12">Edit your profile</h1>

          <div className="py-2 flex">
            <label
              className="pr-7"
              htmlFor="email">
              Email
            </label>
            <input className="w-full" id="email" type="text" value={user.email} disabled />
          </div>

          <div className="py-2">
            <label
              className="pr-6"
              htmlFor="username">
              Name
            </label>
            <input
              className="w-full"
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="py-2">
            <label
              className="pr-2"
              htmlFor="website">
              Website
            </label>
            <input
              className="w-full"
              id="website"
              type="website"
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="flex justify-around mt-8 text-white">
            <div>
              <button className="bg-blue-400 rounded-lg py-1 px-3" onClick={() => supabase.auth.signOut()}>
                Sign Out
              </button>
            </div>

            <div>
              <button
                className="bg-blue-400 rounded-lg py-1 px-3"
                onClick={() => updateProfile({ username, website, avatar_url })}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Update'}
              </button>
            </div>
          </div>

        </div>
      </div>

    )}

    </>
  )
}
