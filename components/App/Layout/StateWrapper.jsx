import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { getSubscriptionByEmail, getUserPlan } from "../../../helpers/subscriptions";
import CheckoutPage from "../Checkout/CheckoutPage";
import AppLoadingState from "../Utils/AppLoadingState";

export default function StateWrapper({ children }) {
  const [session, setSession] = useState(null)
  const [hasSubscription, setHasSubscription] = useState(null)
  const [subscriptionData, setSubscriptionData] = useState()
  const [loading, setLoading] = useState(true)
  const [sessionIsTrial, setSessionIsTrial] = useState(null)
  const user = supabase.auth.user()

  const createdAtUnix = new Date(user?.created_at).getTime()
  const currentTImeUnix = new Date().getTime()
  const trialPeriod = 1219000000
  const daysLeftInTrial = Math.round(((createdAtUnix + trialPeriod) - currentTImeUnix) / 86400000)

  useEffect(() => {
    if (user?.id) {
      if (createdAtUnix + trialPeriod < currentTImeUnix) {
        setSessionIsTrial(false)
        return getUserPlan(user.id, setHasSubscription)
      } else {
        setSessionIsTrial(true)
        setHasSubscription(false)
      }
    }
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    getSubscriptionByEmail(user?.email, setSubscriptionData)
  }, [])

  useEffect(() => {
    if (hasSubscription !== null && sessionIsTrial !== null) {
      setTimeout(() => {
        setLoading(false)
      }, 300)
    }
  }, [hasSubscription, sessionIsTrial, subscriptionData])

  if (!loading && !sessionIsTrial && !hasSubscription) {
    return (
      <CheckoutPage session={session} />
    )
  } else {
    return (
      <div>
        {loading && <AppLoadingState />}
        {!loading && children}
        {sessionIsTrial && (
          <div className="fixed bottom-0 h-12 w-full bg-yellow-300 text-black left-0">
            <h4 className="text-md sm:text-xl font-semibold flex justify-center pt-2 tracking-wide">
              Your free trial of Tattle ends in {daysLeftInTrial} {daysLeftInTrial === 1 ? "day" : "days"}
            </h4>
          </div>
        )}
      </div>
    )
  }
}