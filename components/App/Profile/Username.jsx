import { useState } from "react";
import Button from "../../Global/Button";
import Card from "../../Global/Card";
import CardTitle from "../../Global/CardTitle";
import TextInput from "../../Global/TextInput";

export default function Username() {
  const [username, setUsername] = useState()

  return (
    <Card>
      <div className="flex justify-between">
        <div>
          <CardTitle>Username</CardTitle>
          <p>Update your username address.</p>
        </div>
        <div className="flex mr-16">
          <div className="w-72">
            <TextInput value={username} type="text" label="Username" onChangeHandler={(e) => setUsername(e.target.value)} />
          </div>
          <div className="max-w-min mt-8">
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}