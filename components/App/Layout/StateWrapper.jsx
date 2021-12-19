import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Checkout from "../Checkout/Checkout";
import { getUserPlan } from "../../../helpers/subscriptions";

const months = ['January','February','March','April','May','Jun','July','August','September','October','November','December']
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

export default function StateWrapper({ children }) {
  const [session, setSession] = useState(null)
  const [hasSubscription, setHasSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = supabase.auth.user()

  const currentMonth = new Date(Date.now()).getMonth()
  const currentDate = new Date(Date.now()).getDate()
  const nextMonthIndex = currentMonth + 1 > 11 ? 0 : currentMonth + 1
  const currentDay = new Date(Date.now()).getDay()
  let suffix = ''
  switch (currentDate[-1]) {
    case 1:
      suffix = 'st'
      break
    case 2:
      suffix = 'nd'
      break
    default:
      suffix = 'th'
  }
  const nextBillingDate = `${days[currentDay]}, ${months[nextMonthIndex]} ${currentDate}${suffix}`

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

  if (hasSubscription === false) {
    return (
      <>
        <div className="grid grid-cols-2 mt-16">
          <div className="mt-8 max-w-sm">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 px-1">Tattle monthly</h1>
            <h4 className="-mt-6 text-md px-2">$3 USD / month. Cancel anytime.</h4>
            <div className="my-6 grid grid-cols-2 max-w-1xs bg-gray-100 p-4">
              <div>
                <p className="font-thin">Subtotal:</p>
                <p className="font-thin">Taxes:</p>
                <p className="font-medium text-xl mt-2">Due today:</p>
              </div>
              <div className="font-thin">
                <p className="font-thin text-right">$3.00</p>
                <p className="text-right">$0.00</p>
                <p className="text-xl font-medium text-right mt-2">$3.00 <small className="text-sm">USD</small></p>
              </div>
            </div>
            <div className="flex flex-col">
              <small className="px-1"><span className="font-semibold pr-3">Next billing date:</span> {nextBillingDate}</small>
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
        {!loading && children}
      </div>
    )
  }
}