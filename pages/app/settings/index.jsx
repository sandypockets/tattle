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
import CheckoutPage from "../../../components/App/Checkout/CheckoutPage";
import {SITE_NAME} from "../../../lib/constants";
import Head from "next/head";

export default function Index() {
  const [subscriptionData, setSubscriptionData] = useState()
  const [loading, setLoading] = useState(true)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [session, setSession] = useState({})

  const user = supabase.auth.user()
  const createdAtUnix = new Date(user?.created_at).getTime()
  const currentTImeUnix = new Date().getTime()
  const trialPeriod = 1219000000

  useEffect(() => {
    getSubscriptionByEmail(user?.email, setSubscriptionData)
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

  if (!subscriptionData?.charge && createdAtUnix + trialPeriod > currentTImeUnix) {
    return (
      <>
        <Head>
          <title>Checkout | {SITE_NAME}</title>
        </Head>
        <AppLayout>
          <StateWrapper>
            <CheckoutPage session={session} />
          </StateWrapper>
        </AppLayout>
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title>Settings | {SITE_NAME}</title>
        </Head>
        <AppLayout>
          <StateWrapper>
            {loading || !subscriptionData?.charge ? <AppLoadingState /> : (
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
      </>
    )
  }
}