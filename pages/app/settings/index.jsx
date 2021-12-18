import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import AppLoadingState from "../../../components/App/Utils/AppLoadingState";
import CardTitle from "../../../components/Global/CardTitle";
import YourSubscription from "../../../components/App/Settings/YourSubscription";
import YourPaymentInfo from "../../../components/App/Settings/YourPaymentInfo";
import StateWrapper from "../../../components/App/Layout/StateWrapper";
import YourBillingHistory from "../../../components/App/Settings/YourBillingHistory";
import getSubscriptionByEmail from "../../../helpers/subscription/getSubscriptionByEmail";
import ModalCancel from "../../../components/App/Settings/ModalCancel";

export default function Index() {
  const [subscriptionData, setSubscriptionData] = useState()
  const [loading, setLoading] = useState(true)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)

  useEffect(() => {
    const user = supabase.auth.user()
    getSubscriptionByEmail(user.email, setSubscriptionData)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 350)
  }, [subscriptionData])

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