import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { getContacts } from "../../../helpers/contacts";

export default function ChooseContact({ selectedContactId, setSelectedContactId, useCase }) {
  const [contacts, setContacts] = useState()

  async function getUserContacts() {
    const user = await supabase.auth.user()
    const id = user['id']
    getContacts(id, setContacts)
  }

  useEffect(() => {
    getUserContacts()
  }, [])

  useEffect(() => {
    // Create default select value
    if (contacts) {
      !selectedContactId && setSelectedContactId(contacts[0]['id'])
    } else {
      setSelectedContactId(null)
    }
  }, [contacts])


  return (
    <div className="flex mx-4 mt-6 justify-between sm:justify-center flex-row-reverse">
      <div className={useCase === 'narrow' ? "flex flex-col flex-wrap-reverse flex-col-reverse lg:flex-row-reverse" : "flex flex-col flex-col-reverse lg:flex-row-reverse"}>
        <div className="flex flex-col mx-2 sm:mx-0">
          <label className="mt-3 sm:mt-0"><small>Choose a contact</small></label>
          <select
            defaultValue={selectedContactId}
            className={useCase === 'narrow' ? "w-96 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300" : "w-full lg:w-56 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300"}
            onChange={(e) => setSelectedContactId(e.target.value)}>
            {contacts?.map((option) => (
              <option value={option.id} key={option.id}>{option.name} - {option.phone}</option>
            ) )}
          </select>
        </div>
        <p className="self-center mt-4 pr-6 w-full sm:max-w-lg dark:text-gray-300">Select the person you'd like us to contact if you don't achieve your goal.</p>
      </div>
    </div>
  )
}