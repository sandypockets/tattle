import { useEffect, useState } from "react";
import Button from "../../Global/Button";
import CardTitle from "../../Global/CardTitle";
import ChooseContact from "./ChooseContact";
import SingleDatePicker from "../Utils/DatePicker";
import Slideover from "../Layout/Slideover";
import TextInput from "../../Global/TextInput";
import { updateGoal } from "../../../helpers/goals";

export default function EditGoalSlideover({ title, open, setOpen, selectedGoal, user, getUserGoals }) {
  const [goalTitle, setGoalTitle] = useState('')
  const [goalDesc, setGoalDesc] = useState('')
  const [goalOutcome, setGoalOutcome] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date);
  const [selectedContactId, setSelectedContactId] = useState(Number)

  useEffect(() => {
    if (selectedGoal) {
      setGoalTitle(selectedGoal.title)
      setGoalDesc(selectedGoal.description)
      setGoalOutcome(selectedGoal.outcome)
      setSelectedContactId(selectedGoal['contact_id'])
      // Convert yyyy-mm-dd into unix
      const unixTime = new Date(selectedGoal['due_date']).getTime() + 86400000 - 14400000 //+ 100000000
      setSelectedDate(new Date(unixTime))
    }
  }, [selectedGoal])

  async function updateGoalWrapper() {
    await updateGoal( user.id, selectedContactId, selectedGoal.id, goalTitle, goalDesc, goalOutcome, selectedDate )
    await getUserGoals()
    setOpen(false)
  }


  return (
    <Slideover open={open} setOpen={setOpen}>
      <div className="overflow-scroll">
        <CardTitle>{title}</CardTitle>
        <TextInput type="text" label="Goal title" value={goalTitle} onChangeHandler={(e) => setGoalTitle(e.target.value)} />
        <div className="my-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mx-2 dark:text-gray-300">
            Goal description
          </label>
          <div className="mt-1 mx-2">
        <textarea
          rows={4}
          name="description"
          id="description"
          className="h-36 shadow-sm focus:ring-yellow-400 focus:border-yellow-400 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300"
          value={goalDesc}
          onChange={(e) => setGoalDesc(e.target.value)}
        />
          </div>
        </div>
        <div className="-mb-6">
          <label htmlFor="outcomes" className="block text-sm font-medium text-gray-700 mx-2 dark:text-gray-300">
            How will you know that this goal is achieved?
          </label>
          <div className="mt-1 mx-2">
            <textarea
              rows={4}
              name="outcomes"
              id="outcomes"
              className="h-36 shadow-sm focus:ring-yellow-400 focus:border-yellow-400 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300"
              value={goalOutcome}
              onChange={(e) => setGoalOutcome(e.target.value)}
            />
          </div>
        </div>
        <ChooseContact selectedContactId={selectedContactId} setSelectedContactId={setSelectedContactId} useCase="narrow" />
        <div className="flex justify-between flex-row-reverse my-6 mx-2">
          <div>
            <p className="mb-1 dark:text-gray-300">
              Due date
            </p>
            <SingleDatePicker selected={selectedDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} useCase="narrow" />
          </div>
        </div>
        <div className="mx-2 mb-12">
          <Button
            onClickHandler={() => {
              updateGoalWrapper()
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </Slideover>
  )
}