import Button from "../../Global/Button";
import CardTitle from "../../Global/CardTitle";

export default function Heading({ setDisplayFormType }) {
  return (
    <div className="flex justify-between">
      <CardTitle>Contacts</CardTitle>
      <div className="max-w-min">
        <Button onClickHandler={() => setDisplayFormType('create')}>Create</Button>
      </div>
    </div>
  )
}