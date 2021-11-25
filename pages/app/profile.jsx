import AppLayout from "../../components/App/Layout/AppLayout";
import CardTitle from "../../components/Global/CardTitle";
import Password from "../../components/App/Profile/Password";
import Email from "../../components/App/Profile/Email";
import {Message} from "../../components/App/Profile/Message";
import {useState} from "react";

export default function Profile() {
  const [showMessage, setShowMessage] = useState(false)
  const [isSuccess, setIsSuccess] = useState(true)
  const [sectionName, setSectionName] = useState('')

  return (
    <AppLayout>
      <div className="flex justify-between">
        <CardTitle>Profile</CardTitle>
        {showMessage && <Message setShowMessage={setShowMessage} isSuccess={isSuccess} sectionName={sectionName} />}
      </div>
      <Email />
      <Password setShowMessage={setShowMessage} setIsSuccess={setIsSuccess} setSectionName={setSectionName} />
    </AppLayout>
  )
}