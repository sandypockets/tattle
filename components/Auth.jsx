import {useEffect, useState} from "react";
import { supabase } from "../utils/supabaseClient";
import Link from 'next/link'

export default function Auth({ registrationType }) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('signup')

  useEffect(() => {
    if (registrationType === 'signup') {
      setContent('signup')
    }
    if (registrationType === 'signin') {
      setContent('signin')
    }
  }, [])


  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

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
                    <a className="font-medium text-green-600 hover:text-green-500">
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
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={(e) => {
                      e.preventDefault()
                      handleLogin(email)
                    }}
                    disabled={loading}
                  >
                    {content === 'signin' ? "Sign in" : "Sign up"}
                  </button>
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
