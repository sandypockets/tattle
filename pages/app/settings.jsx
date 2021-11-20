import AppLayout from "../../components/App/Layout/AppLayout";
import CardTitle from "../../components/Global/CardTitle";
import Card from "../../components/Global/Card";
import YourSubscription from "../../components/App/Settings/YourSubscription";
import YourPaymentInfo from "../../components/App/Settings/YourPaymentInfo";

export default function Settings() {
  return (
    <AppLayout>
      <CardTitle>Settings</CardTitle>
      <YourSubscription />
      <YourPaymentInfo />
      <Card>
        <CardTitle>Subscription information</CardTitle>
        <p>Some subscription information</p>
      </Card>

    </AppLayout>
  )
}