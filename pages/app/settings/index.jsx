import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import AppLoadingState from "../../../components/App/Utils/AppLoadingState";
import CardTitle from "../../../components/Global/CardTitle";
import YourSubscription from "../../../components/App/Settings/YourSubscription";
import YourPaymentInfo from "../../../components/App/Settings/YourPaymentInfo";
import getIdAndSubscription from "../../../helpers/subscription/getSubscriptionByEmail";
import getSubscriptionByEmail from "../../../helpers/subscription/getSubscriptionByEmail";

export default function Index() {
  const [subscriptionData, setSubscriptionData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = supabase.auth.user()
    // not working
    getSubscriptionByEmail(user.id, setSubscriptionData)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 100)
  }, [subscriptionData])

  if (loading) {
    return (<AppLoadingState />)
  } else {
    return (
      <AppLayout>
        <CardTitle>Settings</CardTitle>
        {/*<YourSubscription subscriptionData={subscriptionData} />*/}
        {/*<YourPaymentInfo subscriptionData={subscriptionData} />*/}
        {/*<YourBillingHistory billingHistory={subscriptionData} />*/}
      </AppLayout>
    )
  }
}