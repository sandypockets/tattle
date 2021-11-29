import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Button from "../Button";
import TextInput from "../TextInput";
import updateProfile from "../../../helpers/profile/updateProfile";
import updateAuthProfile from "../../../helpers/auth/updateAuthProfile";

export default function ProfileForm({ username, email, user, password, website, setUsername, setEmail, setPassword, setConfirmPassword, setWebsite, confirmPassword, router }) {
  const [loading, setLoading] = useState(false)

  return (
    <div className="flex flex-col bg-gray-200 rounded-lg p-4 mx-6 w-full sm:w-3/4 sm:mx-0 md:w-1/2 lg:w-3/8 xl:w-1/2">
      <h1 className="flex justify-center text-2xl mt-12 mb-2">Edit your profile</h1>
      <div className="py-2">
        <TextInput value={username ? username : ''} label="Username" type="text" onChangeHandler={(e) => setUsername(e.target.value)} />
        <TextInput value={website} label="Website" type="text" onChangeHandler={(e) => setWebsite(e.target.value)} />
        <TextInput value={email ? email : user.email} label="Email" type="email" onChangeHandler={(e) => setEmail(e.target.value)} required={true} />
        <TextInput value={password} label="Password" type="password" onChangeHandler={(e) => setPassword(e.target.value)} required={true} />
        <TextInput value={confirmPassword} label="Confirm password" type="password" onChangeHandler={(e) => setConfirmPassword(e.target.value)} required={true} />
      </div>
      <div className="flex justify-end mt-8 text-white">
        <div className="px-5">
          <Button
            onClickHandler={() => {
              supabase.auth.signOut()
              router.push('/')
            }}
            type="button"
          >
            Sign out
          </Button>
        </div>
        <div>
          <Button
            onClickHandler={() => {
              setLoading(true)
              if (password === confirmPassword) {
                updateProfile({user, username, email, website, setLoading})
                updateAuthProfile(email, password)
              }
            }}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}