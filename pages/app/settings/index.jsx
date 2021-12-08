import {useEffect, useState} from "react";
import {supabase} from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import CardTitle from "../../../components/Global/CardTitle";
import YourSubscription from "../../../components/App/Settings/YourSubscription";
import YourPaymentInfo from "../../../components/App/Settings/YourPaymentInfo";
import YourBillingHistory from "../../../components/App/Settings/YourBillingHistory";

import getSubscriptionData from "../../../helpers/getSubscriptionData";
import LoadingWheelWrapper from "../../../components/Global/Loading/LoadingWheelWrapper";
import LoadingWheel from "../../../components/Global/Loading/LoadingWheel";
import getProfile from "../../../helpers/profile/getProfile";

export default function Index() {
  const [subscriptionData, setSubscriptionData] = useState()
  const [loading, setLoading] = useState(true)
  const [customerId, setCustomerId] = useState()

  useEffect(() => {
    const user = supabase.auth.user()
    getProfile(user, setCustomerId)
  }, [])

  useEffect(() => {
    const user = supabase.auth.user()
    getSubscriptionData(user.id, setSubscriptionData)
  }, [])

  useEffect(() => {
    console.log("CUSTOMER ID: ", customerId)
  }, [customerId])


  useEffect(() => {
    if (subscriptionData) {
      setLoading(false)
    }
  }, [subscriptionData])

  if (loading) {
    return (
      <AppLayout>
        <LoadingWheelWrapper>
          <LoadingWheel />
        </LoadingWheelWrapper>
      </AppLayout>
    )
  } else {
    return (
      <AppLayout>
        <CardTitle>Settings</CardTitle>
        <YourSubscription subscriptionData={subscriptionData} />
        <YourPaymentInfo subscriptionData={subscriptionData} />
        <YourBillingHistory billingHistory={subscriptionData} />
      </AppLayout>
    )
  }
}