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
                  Or{' '}
                  <Link href={"/signup"}>
                    <a className="font-medium text-yellow-500 hover:text-green-500">
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
                    <a className="font-medium text-green-600 hover:text-green-500">
                      Sign in.
                    </a>
                  </Link>
                </p>
              </>
            )}
          </div>
          <div className="mt-8">
            <div className="mt-6">
              <form action="#" method="POST" className="space-y-6">
                <TextInput label="Email address" type="email" onChangeHandler={(e) => setEmail(e.target.value)} required={true} value={email} />
                <TextInput label="Password" type="password" onChangeHandler={(e) => setPassword(e.target.value)} required={true} value={password} />
                <div>
                  <Button type="submit" onClickHandler={(e) => {
                    e.preventDefault()
                    content === 'signup' ? handleSignUp(email, password, router) : handleSignIn(email, password, router)
                  }}>
                    {content === 'signin' ? "Sign in" : "Sign up"}
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
          src="https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmxhY2slMjBhbmQlMjB3aGl0ZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt=""
        />
      </div>
    </div>
  )
}
