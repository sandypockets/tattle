import {useEffect, useState} from "react";
import AppLayout from "../../../components/App/Layout/AppLayout";
import Card from "../../../components/Global/Card";
import CardTitle from "../../../components/Global/CardTitle";
import CustomSms from "../../../components/App/Profile/CustomSms";
import CustomVoice from "../../../components/App/Profile/CustomVoice";
import StateWrapper from "../../../components/App/Layout/StateWrapper";
import Button from "../../../components/Global/Button";
import {getCustomMessages, updateCustomMessages} from "../../api/v1/customMessages";
import {supabase} from "../../../lib/supabaseClient";

const user = supabase.auth.user()
export default function Customize() {
  const [smsMessageText, setSmsMessageText] = useState("Hey {{ contact_name }}! {{ user_name }} didn't achieve their goal: {{ goal_title }}")
  const [voiceMessageText, setVoiceMessageText] = useState("Hey {{ contact_name }}! {{ user_name }} didn't achieve their goal: {{ goal_title }}")

  useEffect(() => {
    getCustomMessages(user?.id, setSmsMessageText, setVoiceMessageText)
  }, [])



  return (
    <AppLayout>
      <StateWrapper>
        <div className="flex">
          <CardTitle>Customize</CardTitle>
          <div className="max-w-min fixed flex-end right-40">
            <Button onClickHandler={() => updateCustomMessages(user?.id, smsMessageText, voiceMessageText)}>Save</Button>
          </div>
        </div>
        <Card>
          <CardTitle>Have some fun with it</CardTitle>
          In the event that you don't achieve your goal, Tattle sends an SMS or voice message to the contact you specified. Use these settings to change the text or voice script that is sent to your contact.
        </Card>
        <Card>
          <h3>Variables</h3>
          <p>Use the variables below to help customize your message dynamically</p>

        </Card>
        <CustomSms smsMessageText={smsMessageText} setSmsMessageText={setSmsMessageText} />
        <CustomVoice voiceMessageText={voiceMessageText} setVoiceMessageText={setVoiceMessageText} />
      </StateWrapper>
    </AppLayout>
  )
}