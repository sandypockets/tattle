import CardTitle from "../../Global/CardTitle";
import Card from "../../Global/Card";
import TextInput from "../../Global/TextInput";
import {useState} from "react";
import Button from "../../Global/Button";
import {supabase} from "../../../lib/supabaseClient";

export default function Password({ setShowMessage, setIsSuccess, setSectionName }) {
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  async function updateAuthPassword(password, confirmPassword) {
    if (password === confirmPassword) {
      try {
        const { user, error } = await supabase.auth.update({password: password})
        if (user) {
          console.log("Password update success: ", user)
          setIsSuccess(true)
          setSectionName('password')
          setShowMessage(true)
        }
        error && console.error("Password update error: ", error)
      } catch (err) {
        console.error(err)
      } finally {
        setPassword('')
        setConfirmPassword('')
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
          <p>Update your password.</p>
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
              <Button onClickHandler={() => updateAuthPassword(password, confirmPassword)}>Save</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}