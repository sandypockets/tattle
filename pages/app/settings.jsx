import AppLayout from "../../components/App/Layout/AppLayout";
import CardTitle from "../../components/Global/CardTitle";
import Card from "../../components/Global/Card";

export default function Settings() {
  return (
    <AppLayout>
      <CardTitle>Settings</CardTitle>
      <Card>
        <CardTitle>Subscription information</CardTitle>
        <p>Some subscription information</p>
      </Card>
      <Card>
        <CardTitle>Payment info</CardTitle>
        <p>Some payment form</p>
      </Card>
    </AppLayout>
  )
}