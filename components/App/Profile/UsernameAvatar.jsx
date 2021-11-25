import { useState } from "react";
import Button from "../../Global/Button";
import Card from "../../Global/Card";
import CardTitle from "../../Global/CardTitle";
import Image from 'next/image'
import TextInput from "../../Global/TextInput";

export default function UsernameAvatar() {
  const [username, setUsername] = useState()

  return (
    <Card>
      <div className="flex justify-between">
        <div>
          <CardTitle>Username & avatar</CardTitle>
          <p className="mb-8">Update your username or profile photo</p>

          <div className="flex mt-20">
            <div className="w-72">
              <TextInput value={username} type="text" label="Username" onChangeHandler={(e) => setUsername(e.target.value)} />
            </div>
            <div className="max-w-min mt-8">
              <Button>Submit</Button>
            </div>
          </div>

        </div>
        <div className="mr-36 mt-7">
          <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                 height={140}
                 width={140}
                 className="rounded-full"
          />
          <div className="max-w-min mx-auto mt-6">
            <Button>Upload</Button>
          </div>
        </div>
      </div>


    </Card>
  )
}