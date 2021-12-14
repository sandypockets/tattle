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
import StateWrapper from "../../../components/App/Layout/StateWrapper";
import ContactCard from "../../../components/App/Contacts/ContactCard";

export default function Index() {
  const [contacts, setContacts] = useState([])
  const [displayFormType, setDisplayFormType] = useState('empty')
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState({})
  const [user, setUser] = useState({})

  async function getUserContacts() {
    const user = await supabase.auth.user()
    const id = user['id']
    await getContacts(id, setContacts)
    setTimeout(() => {
      setLoading(false)
    }, 500)
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

    return (
      <AppLayout>
        {loading ? <AppLoadingState /> : (
          <StateWrapper>
            <Heading setDisplayFormType={setDisplayFormType} />
            {contacts?.length < 1 && <IntroCard/>}
            {displayFormType === 'empty' && contacts?.length === 0 && <ContactsEmptyState setState={setDisplayFormType} />}
            {displayFormType === 'create' && <CreateContact setLoading={setLoading} user={user} getUserContacts={getUserContacts} setDisplayFormType={setDisplayFormType} />}
            {contacts?.length > 0 && (
              <section className="hidden sm:block">
                <ContactsTable contacts={contacts} setOpen={setOpen} selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
              </section>
            )}
            <section className="sm:hidden grid grid-cols-1 gap-2 2xs:grid-cols-2 2xs:gap-3">
              {contacts?.map((contact, index) => (
                <div key={index}>
                  <ContactCard contact={contact} />
                </div>
              ))}
            </section>

            <EditContactSlideover title="Edit contact" open={open} setOpen={setOpen} selectedContact={selectedContact} user={user} />
          </StateWrapper>
        )}
      </AppLayout>
    )

}