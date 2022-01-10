import { useState } from "react";
import Button from "../../Global/Button";
import Card from "../../Global/Card";
import CardTitle from "../../Global/CardTitle";
import PhoneInput from "./PhoneInput";
import TextInput from "../../Global/TextInput";
import { createContact } from "../../../helpers/contacts";
import { validPhone } from "../../../helpers/regex";

export default function CreateContact({ user, getUserContacts, setDisplayFormType, setLoading }) {
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactCountryCode, setContactCountryCode] = useState('')
  const [phoneError, setPhoneError] = useState(false)

  async function submitAndRefreshData(validatedPhone) {
    await createContact(user.id, contactName, validatedPhone, contactCountryCode)
    setTimeout(() => {
      return getUserContacts()
    }, 1000)
    setDisplayFormType('empty')
  }

  function validatePhone(phoneNumber) {
    setPhoneError(false)
    let preFilteredPhone = phoneNumber.split(' ').join('-')
    preFilteredPhone = preFilteredPhone.split('.').join('-')
    preFilteredPhone = preFilteredPhone.split('_').join('-')
    preFilteredPhone = preFilteredPhone.split(',').join('-')
    preFilteredPhone = preFilteredPhone.split('(').join('-')
    preFilteredPhone = preFilteredPhone.split(')').join('-')
    preFilteredPhone = preFilteredPhone.split('+').join('-')
    preFilteredPhone = preFilteredPhone.trim()
    if (preFilteredPhone[0] === '-') {
      preFilteredPhone = preFilteredPhone.slice(1, preFilteredPhone.length) //?
    }
    if (preFilteredPhone[preFilteredPhone.length - 1] === '-') {
      preFilteredPhone = preFilteredPhone.slice(0, preFilteredPhone.length - 1) //?
    }
    console.log(preFilteredPhone)
    if (validPhone.test(preFilteredPhone)) {
      console.log("Phone number is valid")
      return submitAndRefreshData(preFilteredPhone)
    } else {
      console.error("Phone number format is not valid")
    }
  }

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
          <PhoneInput value={contactPhone} onChangeHandler={(e) => setContactPhone(e.target.value)} setContactCountryCode={setContactCountryCode} error={phoneError} />
          <div className="flex justify-end mt-4 mr-2">
            <div className="max-w-min">
              <Button type="button" onClickHandler={() => {
                return validatePhone(contactPhone)
              }}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}