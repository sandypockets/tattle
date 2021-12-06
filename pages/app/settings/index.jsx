import {useEffect, useState} from "react";
import {supabase} from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import CardTitle from "../../../components/Global/CardTitle";
import YourSubscription from "../../../components/App/Settings/YourSubscription";
import YourPaymentInfo from "../../../components/App/Settings/YourPaymentInfo";
import YourBillingHistory from "../../../components/App/Settings/YourBillingHistory";

import getSubscriptionData from "../../../helpers/getSubscriptionData";
import getBillingHistory from "../../../helpers/getBillingHistory";

export default function Index() {
  const [subscriptionData, setSubscriptionData] = useState()
  const [billingHistory, setBillingHistory] = useState()

  useEffect(() => {
    const user = supabase.auth.user()
    getSubscriptionData(user.id, setSubscriptionData)
  }, [])

  useEffect(() => {
    const user = supabase.auth.user()
    getBillingHistory(user.id, setBillingHistory)
  }, [])

  return (
    <AppLayout>
      <CardTitle>Settings</CardTitle>
      <YourSubscription subscriptionData={subscriptionData} />
      <YourPaymentInfo />
      <YourBillingHistory billingHistory={billingHistory} />
    </AppLayout>
  )
}