import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Button from "../../Global/Button";
import Card from "../../Global/Card";
import CardTitle from "../../Global/CardTitle";
import TextInput from "../../Global/TextInput";

export default function Password({ setShowMessage, setIsSuccess, setSectionName }) {
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [loading, setLoading] = useState(false)

  async function updateAuthPassword(password, confirmPassword) {
    if (password === confirmPassword && password.length > 8) {
      setLoading(true)
      try {
        const { user, error } = await supabase.auth.update({password: password})
        if (user) {
          console.log("Password update success: ", user)
          setIsSuccess(true)
          setSectionName('password')
        }
        if (error) {
          console.error("Password update error: ", error)
          setIsSuccess(false)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setPassword('')
        setConfirmPassword('')
        setShowMessage(true)
        setLoading(false)
      }
    } else {
      console.log("Error: Password and password confirmation fields do not match.")
    }
  }

  return (
    <Card>
      <div className="flex justify-between">
        <div>
          <CardTitle>Password</CardTitle>
          <p>Update your password. Minimum 8 characters.</p>
        </div>
        <div className="flex mr-16">
          <div className="flex">
            <div className="w-52">
              <TextInput value={password} type={"password"} label="New password" onChangeHandler={(e) => setPassword(e.target.value)} />
            </div>
            <div className="w-52">
              <TextInput value={confirmPassword} type={"password"} label="Confirm new password" onChangeHandler={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="max-w-min mt-8">
              <Button type="submit" disabled={loading} onClickHandler={() => updateAuthPassword(password, confirmPassword)}>{loading ? 'Saving...' : 'Update'}</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}