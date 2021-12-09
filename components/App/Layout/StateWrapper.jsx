import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import CardTitle from "../../Global/CardTitle";
import Checkout from "../Checkout/Checkout";
import getUserPlan from "../../../helpers/subscription/getUserPlan";
import SignInPage from "../../../pages/app/signin";

export default function StateWrapper({ children }) {
  const [session, setSession] = useState(null)
  const [hasSubscription, setHasSubscription] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const user = supabase.auth.user()

  useEffect(() => {
    if (!supabase.auth.session()) {
      return router.push('/app/signin')
    } else if (user && user.id) {
      return getUserPlan(user.id, setHasSubscription)
    }
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [hasSubscription])

  if (loading) {
    return (
      <div className="h-full w-full" />
    )
  }

  if (!hasSubscription && !loading) {
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
      <div>
        {children}
      </div>
    )
  }
}