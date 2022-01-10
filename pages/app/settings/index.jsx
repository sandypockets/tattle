import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import AppLoadingState from "../../../components/App/Utils/AppLoadingState";
import CardTitle from "../../../components/Global/CardTitle";
import ModalCancel from "../../../components/App/Settings/ModalCancel";
import StateWrapper from "../../../components/App/Layout/StateWrapper";
import YourBillingHistory from "../../../components/App/Settings/YourBillingHistory";
import YourPaymentInfo from "../../../components/App/Settings/YourPaymentInfo";
import YourSubscription from "../../../components/App/Settings/YourSubscription";
import { getSubscriptionByEmail } from "../../../helpers/subscriptions";
import Checkout from "../../../components/App/Checkout/Checkout";

export default function Index() {
  const [subscriptionData, setSubscriptionData] = useState()
  const [loading, setLoading] = useState(true)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [session, setSession] = useState({})
  const user = supabase.auth.user()

  const createdAtUnix = new Date(user?.created_at).getTime()
  const currentTImeUnix = new Date().getTime()
  const trialPeriod = 1219000000

  const months = ['January','February','March','April','May','Jun','July','August','September','October','November','December']
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
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
    // const user = supabase.auth.user()
    getSubscriptionByEmail(user.email, setSubscriptionData)
  }, [])

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 350)
  }, [subscriptionData])

  if (createdAtUnix + trialPeriod > currentTImeUnix) {
    return (
      <AppLayout>
        <StateWrapper>
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 mt-16 sm:px-0 md:px-10">
            <div className="mt-8 mb-12 lg:mb-0 mx-auto w-full lg:max-w-sm sm:px-6 md:px-0">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-6 px-1">Tattle monthly</h1>
              <h4 className="-mt-6 text-md px-2">$3 USD / month. Cancel anytime.</h4>
              <div className="my-6 grid grid-cols-2 w-full lg:max-w-1xs bg-gray-100 p-4">
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
        </StateWrapper>
      </AppLayout>
    )
  } else {
    return (
      <AppLayout>
        <StateWrapper>
          {loading || !subscriptionData ? <AppLoadingState /> : (
            <>
              <CardTitle>Settings</CardTitle>
              <YourSubscription subscriptionData={subscriptionData} />
              <YourPaymentInfo setCancelModalOpen={setCancelModalOpen} subscriptionData={subscriptionData} />
              <YourBillingHistory billingHistory={subscriptionData} />
              <ModalCancel subscriptionId={subscriptionData?.invoice?.subscription_id} cancelModalOpen={cancelModalOpen} setCancelModalOpen={setCancelModalOpen} />
            </>
          )}
        </StateWrapper>
      </AppLayout>
    )
  }
}