import { useState } from "react";
import AppLayout from "../../components/App/Layout/AppLayout";
import CardTitle from "../../components/Global/CardTitle";
import Email from "../../components/App/Profile/Email";
import Message from "../../components/App/Profile/Message";
import Password from "../../components/App/Profile/Password";
import StateWrapper from "../../components/App/Layout/StateWrapper";
import {SITE_NAME} from "../../lib/constants";
import Head from "next/head";

export default function Profile() {
  const [showMessage, setShowMessage] = useState(false)
  const [isSuccess, setIsSuccess] = useState(true)
  const [sectionName, setSectionName] = useState('')

  return (
    <>
      <Head>
        <title>Profile | {SITE_NAME}</title>
      </Head>
      <AppLayout>
        <StateWrapper>
          <div className="flex justify-between">
            <CardTitle>Profile</CardTitle>
            {showMessage && <Message showMessage={showMessage} setShowMessage={setShowMessage} isSuccess={isSuccess} sectionName={sectionName} />}
          </div>
          <form>
            <Email setShowMessage={setShowMessage} setIsSuccess={setIsSuccess} setSectionName={setSectionName} />
            <div className="py-2 sm:py-0" />
            <Password setShowMessage={setShowMessage} setIsSuccess={setIsSuccess} setSectionName={setSectionName} />
          </form>
        </StateWrapper>
      </AppLayout>
    </>
  )
}