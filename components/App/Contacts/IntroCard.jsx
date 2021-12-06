import Card from "../../Global/Card";
import CardTitle from "../../Global/CardTitle";

export default function IntroCard() {
  return (
    <Card>
      <CardTitle>Manage your contacts</CardTitle>
      <p>Before you can create a goal, you need to create a contact. Contacts are the phone numbers that Tattle messages when you don't achieve your goal.</p>
      <p className="my-4">Add your mom, your best friend, or anyone else that will help keep you accountable.</p>
      <p>After saving a contact, you can assign the contact to any goals you create.</p>
    </Card>
  )
}