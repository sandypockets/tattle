import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import AppLayout from "../../components/App/Layout/AppLayout";
import Button from "../../components/Global/Button";
import Card from "../../components/Global/Card";
import CardTitle from "../../components/Global/CardTitle";
import ContactsEmptyState from "../../components/App/Contacts/ContactsEmptyState";
import CreateContact from "../../components/App/Contacts/CreateContact";
import ContactsTable from "../../components/App/Contacts/ContactsTable";
import EditContactSlideover from "../../components/App/Contacts/EditContactSlideover";
import getContacts from "../../helpers/getContacts";
import LoadingWheelWrapper from "../../components/Global/LoadingWheelWrapper";
import LoadingWheel from "../../components/Global/LoadingWheel";

export default function Contacts() {
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

  return (
    <AppLayout>
      {loading && (
        <LoadingWheelWrapper>
          <LoadingWheel />
        </LoadingWheelWrapper>
      )}
      {!loading && (
        <>
          <div className="flex justify-between">
            <CardTitle>Contacts</CardTitle>
            <div className="max-w-min">
              <Button onClickHandler={() => setDisplayFormType('create')}>Create</Button>
            </div>
          </div>
          <Card>
            <CardTitle>Manage your contacts</CardTitle>
            <p>Before you can create a goal, you need to create a contact. Contacts are the phone numbers that Tattle messages when you don't achieve your goal.</p>
            <p className="my-4">Add your mom, your best friend, or anyone else that will help keep you accountable.</p>
            <p>After saving a contact, you can assign the contact to any goals you create.</p>
          </Card>
          {displayFormType === 'empty' && !contacts && <ContactsEmptyState setState={setDisplayFormType} />}
          {displayFormType === 'create' && <CreateContact user={user} getUserContacts={getUserContacts} setDisplayFormType={setDisplayFormType} />}
          {contacts && <ContactsTable contacts={contacts} setOpen={setOpen} selectedContact={selectedContact} setSelectedContact={setSelectedContact} /> }
          <EditContactSlideover title="Edit contact" open={open} setOpen={setOpen} selectedContact={selectedContact} user={user} />
        </>
      )}
    </AppLayout>
  )
}