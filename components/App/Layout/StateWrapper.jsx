import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Checkout from "../Checkout/Checkout";
import getUserPlan from "../../../helpers/subscription/getUserPlan";

export default function StateWrapper({ children }) {
  const [session, setSession] = useState(null)
  const [hasSubscription, setHasSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = supabase.auth.user()

  useEffect(() => {
    if (user?.id) {
      return getUserPlan(user.id, setHasSubscription)
    }
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if (hasSubscription !== null) {
      setLoading(false)
    }
  }, [hasSubscription])

  if (loading) {
    return (
      <div className="h-full w-full" />
    )
  }

  if (hasSubscription === false && !loading) {
    return (
      <>
        <div className="grid grid-cols-2 mt-16">
          <div className="mt-12 max-w-sm">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Tattle monthly</h1>
            <h4 className="-mt-6 text-md">$3 USD / month. Cancel anytime.</h4>
            <div className="my-6 grid grid-cols-2 max-w-1xs bg-gray-100 p-4">
              <div>
                <p className="font-thin">Subtotal:</p>
                <p className="font-thin">Taxes:</p>
                <p className="font-medium text-xl mt-2">Total:</p>
              </div>
              <div className="font-thin">
                <p className="font-thin text-right">$3.00</p>
                <p className="text-right">$0.00</p>
                <p className="text-xl font-medium text-right mt-2">$3.00</p>
              </div>
            </div>
            <div className="flex flex-col">
              <small>Terms and conditions</small>
              <small>Powered by Stripe</small>
            </div>
          </div>
          <div>
            <Checkout session={session} />
          </div>
        </div>
      </>
    )
  }
  else {
    return (
      <div>
        {children}
      </div>
    )
  }
}