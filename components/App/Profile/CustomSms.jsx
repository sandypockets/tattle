import CardTitle from "../../Global/CardTitle";
import Card from "../../Global/Card";

export default function CustomSms() {
  return (
    <Card>
      <CardTitle>Custom SMS message</CardTitle>
      <p>If Tattle sends an SMS to one of your contacts, it cycles through a few predefined responses. Some of which you can see here. The field below allows you to use your own custom Tattle SMS message.</p>
    </Card>
  )
}