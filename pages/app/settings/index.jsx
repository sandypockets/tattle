import {useEffect, useState} from "react";
import {supabase} from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import CardTitle from "../../../components/Global/CardTitle";
import YourSubscription from "../../../components/App/Settings/YourSubscription";
import YourPaymentInfo from "../../../components/App/Settings/YourPaymentInfo";
import YourBillingHistory from "../../../components/App/Settings/YourBillingHistory";

import getSubscriptionData from "../../../helpers/getSubscriptionData";

export default function Index() {
  const [subscriptionData, setSubscriptionData] = useState()

  useEffect(() => {
    const user = supabase.auth.user()
    getSubscriptionData(user.id, setSubscriptionData)
  }, [])

  useEffect(() => {
    if (!Array.isArray(subscriptionData)) {
      setSubscriptionData([subscriptionData].flat())
    }
  }, [subscriptionData])

  return (
    <AppLayout>
      <CardTitle>Settings</CardTitle>
      <YourSubscription subscriptionData={subscriptionData} />
      <YourPaymentInfo subscriptionData={subscriptionData} />
      <YourBillingHistory billingHistory={subscriptionData} />
    </AppLayout>
  )
}