import CardTitle from "../../Global/CardTitle";
import Button from "../../Global/Button";

export default function Header({ goals, setDisplayFormType, contacts }) {
  return (
    <div className="flex justify-between">
      <CardTitle>All goals</CardTitle>
      <div className="max-w-min">
        <Button disabled={!contacts || contacts.length === 0} onClickHandler={() => setDisplayFormType('create')}>Create</Button>
      </div>
    </div>
  )
}