import { useEffect, useState } from "react";
import Button from "../../Global/Button";
import Slideover from "../Layout/Slideover";
import TextInput from "../../Global/TextInput";
import { updateContact } from "../../../helpers/contacts";

export default function EditContactSlideover({ open, setOpen, selectedContact, user }) {
  const [name, setName] = useState()
  const [phone, setPhone] = useState()

  useEffect(() => {
    if (selectedContact) {
      setName(selectedContact.name)
      setPhone(selectedContact.phone)
    }
  }, [selectedContact])

  return (
    <Slideover open={open} setOpen={setOpen}>
      {user && selectedContact && (
        <div>
          <div>
            <h3 className="font-bold mb-2 dark:text-gray-300">Editing {selectedContact.name} - {selectedContact.phone}</h3>
            <TextInput value={name} type="text" label="Name" onChangeHandler={(e) => setName(e.target.value)} />
            <TextInput value={phone} type="phone" label="Phone" onChangeHandler={(e) => setPhone(e.target.value)} />
            <div className="max-w-min mx-2 mt-4">
              <Button onClickHandler={() => {
                updateContact(user.id, selectedContact.id, name, phone)
              }}>
                Update
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="mx-4 mt-8">
        <p className="mb-4 dark:text-gray-400">Editing a contact's phone number changes the phone number for all goals the contact is assigned to.</p>
        <p className="dark:text-gray-400">Once the old phone number is overwritten, it cannot be recovered.</p>
      </div>
    </Slideover>
  )
}