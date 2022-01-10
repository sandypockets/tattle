import CardTitle from "../../Global/CardTitle";
import Card from "../../Global/Card";

export default function IntroCard({ contacts }) {
  return (
    <Card>
      <CardTitle>Manage your goals</CardTitle>
      {
        !contacts || contacts?.length ?
          <p className="my-4">Create a new goal, or modify an existing one.</p> :
          <p>After you have at least 1 contact, then you can create or manage your existing goals here.</p>
      }
    </Card>
  )
}