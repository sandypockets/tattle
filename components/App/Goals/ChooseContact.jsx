import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import getContacts from "../../../helpers/contacts/getContacts";

export default function ChooseContact({ selectedContactId, setSelectedContactId }) {
  const [contacts, setContacts] = useState()

  async function getUserContacts() {
    const user = await supabase.auth.user()
    const id = user['id']
    getContacts(id, setContacts)
  }

  useEffect(() => {
    getUserContacts()
  }, [])

  // Create default select value
  if (contacts) {
    !selectedContactId && setSelectedContactId(contacts[0]['id'])
  } else {
    setSelectedContactId(null)
  }

  return (
    <div className="flex mx-2 mt-6 justify-between flex-row-reverse">
      <div className="flex flex-col">
        <p>Choose a contact</p>
        <select defaultValue={selectedContactId} className="w-56" onChange={(e) => setSelectedContactId(event.target.value)}>
          {contacts && contacts.map((option) => (
            <option value={option.id} key={option.id}>{option.name} - {option.phone}</option>
          ) )}
        </select>
      </div>
      <p className="self-center mt-4 max-w-md">Select the person you'd like us to contact if you don't achieve your goal.</p>
    </div>
  )
}