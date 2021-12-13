import Button from "../../Global/Button";

export default function GoalHeaderButtons({ markGoalAsDone, isCompletedOnTime, user, goal}) {
  return (
    <div className="flex flex-col 2xs:flex-row">
      <div className="w-36 ml-4 mr-4 2xs:mr-2 mb-2 2xs:mb-0">
        <Button>
          Update contact
        </Button>
      </div>
      <div className="w-36 mr-4 ml-4 2xs:ml-2">
        <Button onClickHandler={() => {
          user && goal && markGoalAsDone(user.id, goal['id'], isCompletedOnTime)
        }}>
          Mark as done
        </Button>
      </div>
    </div>
  )
}