import CardTitle from "../../Global/CardTitle";
import GoalCard from "./GoalCard";
import Button from "../../Global/Button";

export default function UpcomingGoals({ numOfCols, incompleteGoals, numberOfGoalsToShow, setNumberOfGoalsToShow }) {
  return (
    <>
      <CardTitle>Goals due soon</CardTitle>
      <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-${numOfCols} gap-5`}>
        {incompleteGoals && incompleteGoals.map((goal, index) => {
          if (index < numberOfGoalsToShow) {
            return (
              <article key={index}>
                <GoalCard goal={goal} />
              </article>
            )
          }
        })}
      </div>
      <div className="w-36 mx-auto mt-10">
        {
          incompleteGoals && incompleteGoals.length > 3 &&
          <Button disabled={numberOfGoalsToShow > incompleteGoals.length} onClickHandler={() => setNumberOfGoalsToShow(numberOfGoalsToShow + 4)}>
            Show more
          </Button>
        }
      </div>
    </>
  )
}