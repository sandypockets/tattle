import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import CreateContact from "../../../components/App/Contacts/CreateContact";
import StateWrapper from "../../../components/App/Layout/StateWrapper";
import { getContacts } from "../../../helpers/contacts";
import {SITE_NAME} from "../../../lib/constants";
import Head from "next/head";

export default function NewContact() {
  const [contacts, setContacts] = useState()
  const [displayFormType, setDisplayFormType] = useState('empty')
  const [user, setUser] = useState(supabase.auth.user())
  const router = useRouter()

  async function getUserContacts() {
    const user = await supabase.auth.user()
    const id = user['id']
    await getContacts(id, setContacts)
    router.push('/app/contacts')
  }

  return (
    <>
      <Head>
        <title>New contact | {SITE_NAME}</title>
      </Head>
      <AppLayout>
        <StateWrapper>
          <CreateContact user={user} getUserContacts={getUserContacts} setDisplayFormType={setDisplayFormType} />
        </StateWrapper>
      </AppLayout>
    </>
  )
}