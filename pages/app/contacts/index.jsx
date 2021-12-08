import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import AppLoadingState from "../../../components/App/Utils/AppLoadingState";
import ContactsEmptyState from "../../../components/App/Contacts/ContactsEmptyState";
import CreateContact from "../../../components/App/Contacts/CreateContact";
import ContactsTable from "../../../components/App/Contacts/ContactsTable";
import EditContactSlideover from "../../../components/App/Contacts/EditContactSlideover";
import Heading from "../../../components/App/Contacts/Heading";
import IntroCard from "../../../components/App/Contacts/IntroCard";
import getContacts from "../../../helpers/contacts/getContacts";

export default function Index() {
  const [contacts, setContacts] = useState()
  const [displayFormType, setDisplayFormType] = useState('empty')
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState()
  const [user, setUser] = useState()

  async function getUserContacts() {
    const user = await supabase.auth.user()
    const id = user['id']
    getContacts(id, setContacts)
  }

  useEffect(() => {
    setUser(supabase.auth.user())
  }, [])

  useEffect(() => {
    getUserContacts()
  }, [user])

  useEffect(() => {
    user && contacts && setLoading(false)
  }, [contacts])

  if (loading) {
    return (<AppLoadingState />)
  } else {
    return (
      <AppLayout>
        <Heading setDisplayFormType={setDisplayFormType} />
        <IntroCard />
        {displayFormType === 'empty' && contacts.length === 0 && <ContactsEmptyState setState={setDisplayFormType} />}
        {displayFormType === 'create' && <CreateContact user={user} getUserContacts={getUserContacts} setDisplayFormType={setDisplayFormType} />}
        {contacts.length > 0 && <ContactsTable contacts={contacts} setOpen={setOpen} selectedContact={selectedContact} setSelectedContact={setSelectedContact} /> }
        <EditContactSlideover title="Edit contact" open={open} setOpen={setOpen} selectedContact={selectedContact} user={user} />
      </AppLayout>
    )
  }
}