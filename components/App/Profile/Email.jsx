import CardTitle from "../../Global/CardTitle";
import Card from "../../Global/Card";
import TextInput from "../../Global/TextInput";
import {useState} from "react";
import Button from "../../Global/Button";

export default function Email() {
  const [email, setEmail] = useState()

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
          {/*<div className="max-w-min mt-8">*/}
          {/*  <Button>Save</Button>*/}
          {/*</div>*/}
        </div>
      </div>
    </Card>
  )
}