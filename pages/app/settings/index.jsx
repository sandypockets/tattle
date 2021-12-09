import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import AppLoadingState from "../../../components/App/Utils/AppLoadingState";
import CardTitle from "../../../components/Global/CardTitle";
import YourSubscription from "../../../components/App/Settings/YourSubscription";
import YourPaymentInfo from "../../../components/App/Settings/YourPaymentInfo";
import StateWrapper from "../../../components/App/Layout/StateWrapper";
import YourBillingHistory from "../../../components/App/Settings/YourBillingHistory";
import getIdAndSubscription from "../../../helpers/subscription/getSubscriptionByEmail";
import getSubscriptionByEmail from "../../../helpers/subscription/getSubscriptionByEmail";

export default function Index() {
  const [subscriptionData, setSubscriptionData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = supabase.auth.user()
    getSubscriptionByEmail(user.email, setSubscriptionData)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 150)
  }, [subscriptionData])

  if (loading) {
    return (<AppLoadingState />)
  } else {
    console.log("Subscription Data!: ", subscriptionData)
    return (
      <AppLayout>
        <StateWrapper>
          <CardTitle>Settings</CardTitle>
          <YourSubscription subscriptionData={subscriptionData} />
          <YourPaymentInfo subscriptionData={subscriptionData} />
          {/*<YourBillingHistory billingHistory={subscriptionData} />*/}
        </StateWrapper>
      </AppLayout>
    )
  }
}