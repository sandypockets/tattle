import AppLayout from "../../components/App/Layout/AppLayout";
import CardTitle from "../../components/Global/CardTitle";
import Card from "../../components/Global/Card";

export default function Profile() {
  return (
    <AppLayout>
      <CardTitle>Profile</CardTitle>

      <Card>
        <CardTitle>Username & avatar</CardTitle>
        <p>Update your username or display photo</p>
      </Card>

      <Card>
        <CardTitle>Email & password</CardTitle>
        <p>Update your email or password.</p>
      </Card>

      <Card>
        <CardTitle>Custom SMS message</CardTitle>
        <p>If Tattle sends an SMS to one of your contacts, it cycles through a few predefined responses. Some of which you can see here. The field below allows you to use your own custom Tattle SMS message.</p>
      </Card>

      <Card>
        <CardTitle>Custom voice script</CardTitle>
        <p>If Tattle calls one of your contacts, it cycles through a few predefined responses. Some of which you can hear here. The field below allows you to use your own custom Tattle voice message.</p>
      </Card>

    </AppLayout>
  )
}