import Button from "../../Global/Button";

export default function GoalHeaderButtons({ markGoalAsDone, isCompletedOnTime, user, goal}) {
  return (
    <div className="flex">
      <div className="w-36 mx-4">
        <Button>
          Update contact
        </Button>
      </div>
      <div className="w-36">
        <Button onClickHandler={() => {
          user && goal && markGoalAsDone(user.id, goal['id'], isCompletedOnTime)
        }}>
          Mark as done
        </Button>
      </div>
    </div>
  )
}