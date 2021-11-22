import Slideover from "../Layout/Slideover";
import TextInput from "../../Global/TextInput";
import {useEffect, useState} from "react";
import Button from "../../Global/Button";
import Card from "../../Global/Card";
import updateContact from "../../../helpers/updateContact";

export default function EditContactSlideover({ title, open, setOpen, selectedContact, user}) {
  const [name, setName] = useState()
  const [phone, setPhone] = useState()

  return (
    <Slideover title={title} open={open} setOpen={setOpen}>
      {user && selectedContact && (
        <Card>
          <div className="-m-8">
            <h3 className="font-bold mb-2">Editing {selectedContact.name} - {selectedContact.phone}</h3>
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
        </Card>
      )}
      <Card>
        <div className="-m-8">
          Editing a contact only updates their phone number moving forward. Any existing goals will still use the old number.
        </div>
      </Card>
    </Slideover>
  )
}