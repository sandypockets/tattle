import AppLayout from "../../components/App/Layout/AppLayout";
import CardTitle from "../../components/Global/CardTitle";
import Card from "../../components/Global/Card";
import YourSubscription from "../../components/App/Settings/YourSubscription";
import YourPaymentInfo from "../../components/App/Settings/YourPaymentInfo";
import YourBillingHistory from "../../components/App/Settings/YourBillingHistory";

export default function Settings() {
  return (
    <AppLayout>
      <CardTitle>Settings</CardTitle>
      <YourSubscription />
      <YourPaymentInfo />
      <YourBillingHistory />
    </AppLayout>
  )
}