import AppLayout from "../../components/App/Layout/AppLayout";
import CardTitle from "../../components/Global/CardTitle";
import UsernameAvatar from "../../components/App/Profile/UsernameAvatar";
import Password from "../../components/App/Profile/Password";
import CustomSms from "../../components/App/Profile/CustomSms";
import CustomVoice from "../../components/App/Profile/CustomVoice";
import Email from "../../components/App/Profile/Email";
import Avatar from "../../components/App/Profile/Avatar";
import Username from "../../components/App/Profile/Username";

export default function Profile() {
  return (
    <AppLayout>
      <CardTitle>Profile</CardTitle>
      {/*<UsernameAvatar />*/}
      <Username />
      <Avatar />
      <Email />
      <Password />
      {/*<CustomSms />*/}
      {/*<CustomVoice />*/}
    </AppLayout>
  )
}