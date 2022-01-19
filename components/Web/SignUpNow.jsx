import { useState } from "react";
import { useRouter } from "next/router";
import { handleSignUp } from "../../helpers/auth";
import Button from "../Global/Button";
import TextInput from "../Global/TextInput";

export default function SignUpNow() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="mt-8">
      <div className="mt-6 w-72 sm:w-96">
        <form action="#" method="POST" className="space-y-1">
          <TextInput label="First name" type="first-name" onChangeHandler={(e) => setName(e.target.value)} required={true} value={name} useDark={false} />
          <TextInput label="Email address" type="email" onChangeHandler={(e) => setEmail(e.target.value)} required={true} value={email} useDark={false} />
          <TextInput label="Password" type="password" onChangeHandler={(e) => setPassword(e.target.value)} required={true} value={password} useDark={false} />
          <div className="mx-2 pt-4">
            <Button type="submit" onClickHandler={(e) => {
              e.preventDefault()
              return handleSignUp(email, password, router)
            }}>
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}