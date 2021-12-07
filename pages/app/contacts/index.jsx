import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import ContactsEmptyState from "../../../components/App/Contacts/ContactsEmptyState";
import CreateContact from "../../../components/App/Contacts/CreateContact";
import ContactsTable from "../../../components/App/Contacts/ContactsTable";
import EditContactSlideover from "../../../components/App/Contacts/EditContactSlideover";
import Heading from "../../../components/App/Contacts/Heading";
import IntroCard from "../../../components/App/Contacts/IntroCard";
import LoadingWheel from "../../../components/Global/LoadingWheel";
import LoadingWheelWrapper from "../../../components/Global/LoadingWheelWrapper";
import getContacts from "../../../helpers/getContacts";

export default function Index() {
  const [loading, setLoading] = useState(true)
  const [displayFormType, setDisplayFormType] = useState('empty')
  const [contacts, setContacts] = useState()
  const [user, setUser] = useState()
  const [open, setOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState()

  useEffect(() => {
    setUser(supabase.auth.user())
  }, [])

  async function getUserContacts() {
    const user = await supabase.auth.user()
    const id = user['id']
    getContacts(id, setContacts)
  }

  useEffect(() => {
    getUserContacts()
  }, [])

  useEffect(() => {
    console.log("Contacts!: ", contacts)
  }, [contacts])

  useEffect(() => {
    user && contacts && setLoading(false)
  }, [contacts])

  if (loading) {
    return (
      <AppLayout>
        <LoadingWheelWrapper>
          <LoadingWheel />
        </LoadingWheelWrapper>
      </AppLayout>
    )
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