import AppLayout from "../../../components/App/Layout/AppLayout";
import Card from "../../../components/Global/Card";
import CardTitle from "../../../components/Global/CardTitle";
import CustomSms from "../../../components/App/Profile/CustomSms";
import CustomVoice from "../../../components/App/Profile/CustomVoice";

export default function Customize() {
  return (
    <AppLayout>
      <CardTitle>Customize</CardTitle>
      <Card>
        <CardTitle>Have some fun with it</CardTitle>
        In the event that you don't achieve your goal, Tattle sends an SMS or voice message to the contact you specified. Use these settings to change the text or voice script that is sent to your contact.
      </Card>
      <CustomSms />
      <CustomVoice />
    </AppLayout>
  )
}