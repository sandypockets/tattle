import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import CardTitle from "../../Global/CardTitle";
import Checkout from "../Checkout/Checkout";
import getUserPlan from "../../../helpers/subscription/getUserPlan";

export default function StateWrapper({ children }) {
  const [session, setSession] = useState(null)
  const [hasSubscription, setHasSubscription] = useState()
  const [loading, setLoading] = useState(true)
  const user = supabase.auth.user()

  useEffect(() => {
    if (user && user.id) {
      return getUserPlan(user.id, setHasSubscription)
    }
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    // setTimeout(() => {
      setLoading(false)
    // }, 50)
  }, [hasSubscription])

  if (loading) {
    return (
      <div className="h-full w-full" />
    )
  }

  if (hasSubscription === false && !loading) {
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