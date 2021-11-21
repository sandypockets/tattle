import CardTitle from "../../Global/CardTitle";
import Card from "../../Global/Card";
import TextInput from "../../Global/TextInput";
import {useState} from "react";
import Button from "../../Global/Button";

export default function Password() {
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  return (
    <Card>
      <div className="flex justify-between">

        <div>
          <CardTitle>Password</CardTitle>
          <p>Update your password.</p>
        </div>

        <div className="flex mr-16">
          <div className="w-72">
            <TextInput value={password} type={password} label="Password" onChangeHandler={(e) => setPassword(e.target.value)} />
            <TextInput value={confirmPassword} type={confirmPassword} label="Confirm password" onChangeHandler={(e) => setConfirmPassword(e.target.value)} />
            {/*<div className="mx-2 mt-3">*/}
            {/*  <Button>Save</Button>*/}
            {/*</div>*/}
          </div>
        </div>

      </div>
    </Card>
  )
}