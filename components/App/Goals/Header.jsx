import CardTitle from "../../Global/CardTitle";
import Button from "../../Global/Button";

export default function Header({ goals, setDisplayFormType }) {
  return (
    <div className="flex justify-between">
      <CardTitle>Goals</CardTitle>
      <div className="max-w-min">
        <Button disabled={!goals || goals.length === 0} onClickHandler={() => setDisplayFormType('create')}>Create</Button>
      </div>
    </div>
  )
}