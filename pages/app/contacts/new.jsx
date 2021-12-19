import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import CreateContact from "../../../components/App/Contacts/CreateContact";
import StateWrapper from "../../../components/App/Layout/StateWrapper";
import { getContacts } from "../../../helpers/contacts";

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
    <AppLayout>
      <StateWrapper>
        <CreateContact user={user} getUserContacts={getUserContacts} setDisplayFormType={setDisplayFormType} />
      </StateWrapper>
    </AppLayout>
  )
}