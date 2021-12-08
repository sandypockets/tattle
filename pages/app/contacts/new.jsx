import AppLayout from "../../../components/App/Layout/AppLayout";
import CreateContact from "../../../components/App/Contacts/CreateContact";
import {useEffect, useState} from "react";
import {supabase} from "../../../lib/supabaseClient";
import { useRouter } from "next/router";
import getContacts from "../../../helpers/getContacts";

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
      <CreateContact user={user} getUserContacts={getUserContacts} setDisplayFormType={setDisplayFormType} />
    </AppLayout>
  )
}