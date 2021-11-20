import Card from "../../Global/Card";
import CardTitle from "../../Global/CardTitle";
import TextInput from "../../Global/TextInput";
import {useState} from "react";
import Button from "../../Global/Button";

export default function CreateContact() {
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')

  return (
    <Card>
      <CardTitle>Create a contact</CardTitle>
      <div className="flex justify-around">
        <div className="pt-6 w-96">
          <p>After a contact is created, you can assign the contact to a goal.</p>
          <p className="pt-6">If you fail to achieve your goal before the due date, then Tattle will send an SMS or voice message to your contact to let them know.</p>
        </div>
        <div className="w-72">
          <TextInput type="text" label="Name" value={contactName} onChangeHandler={(e) => setContactName(e.target.value)} />
          <TextInput type="phone" label="Phone number" value={contactPhone} onChangeHandler={(e) => setContactPhone(e.target.value)} />
          <div className="flex justify-end mt-4 mr-2">
            <div className="max-w-min">
              <Button type="button">
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}