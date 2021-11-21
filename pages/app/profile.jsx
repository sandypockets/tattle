import AppLayout from "../../components/App/Layout/AppLayout";
import CardTitle from "../../components/Global/CardTitle";
import Card from "../../components/Global/Card";
import UsernameAvatar from "../../components/App/Profile/UsernameAvatar";
import EmailPassword from "../../components/App/Profile/EmailPassword";
import CustomSms from "../../components/App/Profile/CustomSms";
import CustomVoice from "../../components/App/Profile/CustomVoice";

export default function Profile() {
  return (
    <AppLayout>
      <CardTitle>Profile</CardTitle>
      <UsernameAvatar />
      <EmailPassword />
      <CustomSms />
      <CustomVoice />
    </AppLayout>
  )
}