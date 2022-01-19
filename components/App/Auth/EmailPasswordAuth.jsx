import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import Link from 'next/link'
import Button from '../../Global/Button'
import TextInput from "../../Global/TextInput";
import { handleSignIn } from "../../../helpers/auth";
import { handleSignUp } from "../../../helpers/auth";

export default function Auth({ registrationType }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [content, setContent] = useState('signup')
  const [name, setName] = useState()

  const router = useRouter()

  useEffect(() => {
    if (registrationType === 'signup') {
      setContent('signup')
    }
    if (registrationType === 'signin') {
      setContent('signin')
    }
  }, [])

  useEffect(() => {
    if (supabase.auth.session()) {
      router.push('/app/')
    }
  }, [])

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            {content === 'signin' && (
              <>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-sm text-gray-600">
                  or{' '}
                  <Link href={"/signup"}>
                    <a className="font-medium text-black hover:bg-yellow-400 bg-yellow-300 py-1 px-3 rounded-lg text-xs">
                      start your 14-day free trial
                    </a>
                  </Link>
                </p>
              </>
            )}
            {content === 'signup' && (
              <>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Start your free trial</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href={"/signin"}>
                    <a className="font-medium text-black hover:bg-yellow-400 bg-yellow-300 py-1 px-2 rounded-lg text-xs">
                      Sign in
                    </a>
                  </Link>
                </p>
              </>
            )}
          </div>
          <div className="mt-8">
            <div className="mt-6">
              <form action="#" method="POST" className="space-y-1">
                {content === 'signup' && (
                  <TextInput
                    label="First name"
                    type="name"
                    onChangeHandler={(e) => setName(e.target.value)}
                    required={true}
                    value={name}
                    useDark={false}
                    placeholder="Charlie"
                  />
                )}
                <TextInput
                  label="Email address"
                  type="email"
                  onChangeHandler={(e) => setEmail(e.target.value)}
                  required={true}
                  value={email}
                  useDark={false}
                  placeholder="charlie@gmail.com"
                />
                <TextInput
                  label="Password"
                  type="password"
                  onChangeHandler={(e) => setPassword(e.target.value)}
                  required={true}
                  value={password}
                  useDark={false}
                />
                <div className="mx-2 pt-2">
                  <Button type="submit" onClickHandler={(e) => {
                    e.preventDefault()
                    content === 'signup' ? handleSignUp(email, password, name).then(() => setTimeout(() => { return router.push('/app') }, 1000)) : handleSignIn(email, password, router)
                  }}>
                    <span className="tracking-wider">
                      {content === 'signin' ? "Sign in" : "Sign up"}
                    </span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover filter grayscale-`"
          src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80"
          alt=""
        />
      </div>
    </div>
  )
}
