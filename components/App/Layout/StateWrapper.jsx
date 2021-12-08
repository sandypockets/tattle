import {useEffect, useState} from "react";
import {supabase} from "../../../lib/supabaseClient";
import getUserPlan from "../../../helpers/subscription/getUserPlan";
import CardTitle from "../../Global/CardTitle";
import Checkout from "../Checkout/Checkout";
// import { Transition } from '@headlessui/react'

export default function StateWrapper({ children }) {
  const [session, setSession] = useState(null)
  const [hasSubscription, setHasSubscription] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    const user = supabase.auth.user()
    if (!supabase.auth.session()) {
      router.push('/app/signin')
    } else if (user && user.id) {
      return getUserPlan(user.id, setHasSubscription)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [hasSubscription])

  if (!hasSubscription || loading) {
    return (
      <>
        <CardTitle>Checkout</CardTitle>
        <div className="grid grid-cols-2">
          <div>
            <h3>Some title</h3>
            <p>Some summary</p>
            <div>$3 USD / month</div>
            <div>Terms and conditions</div>
            <div>Powered by Stripe</div>
          </div>
          <div>
            <Checkout session={session} />
          </div>
        </div>
      </>
    )
  } else {
    return (
      <div className="opacity-0 transition delay-300 transition-opacity-1 duration-900 ease-in-out">

        {children}
      </div>
    )
  }
}