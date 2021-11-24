import CardTitle from "../../Global/CardTitle";
import Card from "../../Global/Card";
import TextInput from "../../Global/TextInput";
import {useEffect, useState} from "react";
import Button from "../../Global/Button";
import updateEmail from "../../../helpers/updateEmail";
import {supabase} from "../../../lib/supabaseClient";

export default function Email() {
  const [email, setEmail] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    const user = supabase.auth.user()
    user && setEmail(user.email)
    user && setUser(user)
  }, [])

  return (
    <Card>
      <div className="flex justify-between">

        <div>
          <CardTitle>Email</CardTitle>
          <p>Update your email address.</p>
        </div>

        <div className="flex mr-16">
          <div className="w-72">
            <TextInput value={email} type={email} label="Email" onChangeHandler={(e) => setEmail(e.target.value)} />
          </div>
          <div className="max-w-min mt-8">
            <Button onClickHandler={() => {
              email && updateEmail(user['id'], email)
            }}>Save</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}