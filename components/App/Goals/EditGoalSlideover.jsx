import { useEffect, useState } from "react";
import Button from "../../Global/Button";
import CardTitle from "../../Global/CardTitle";
import ChooseContact from "./ChooseContact";
import SingleDatePicker from "../Utils/DatePicker";
import Slideover from "../Layout/Slideover";
import TextInput from "../../Global/TextInput";
import updateGoal from "../../../helpers/goals/updateGoal";

export default function EditGoalSlideover({ title, open, setOpen, selectedGoal, user, getUserGoals }) {
  const [goalTitle, setGoalTitle] = useState('')
  const [goalDesc, setGoalDesc] = useState('')
  const [goalOutcome, setGoalOutcome] = useState('')
  const [selectedDate, setSelectedDate] = useState();
  const [selectedContactId, setSelectedContactId] = useState()

  useEffect(() => {
    if (selectedGoal) {
      setGoalTitle(selectedGoal.title)
      setGoalDesc(selectedGoal.description)
      setGoalOutcome(selectedGoal.outcome)
      setSelectedContactId(selectedGoal['contact_id'])
      // Convert yyyy-mm-dd into unix
      const unixTime = new Date(selectedGoal['due_date']).getTime() + 86400000 - 14400000 //+ 100000000
      console.log("DATE!", selectedGoal['due_date'])
      console.log("UNIX TIME: ", unixTime)
      console.log("DATE 2!", new Date(unixTime))
      setSelectedDate(new Date(unixTime))
      console.log("selectedDate: ", selectedDate)
      // setSelectedDate(unixTime)
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
        <CardTitle>Create a goal</CardTitle>
        <p>Create a new goal</p>
        <TextInput type="text" label="Goal title" value={goalTitle} onChangeHandler={(e) => setGoalTitle(e.target.value)} />
        <div className="my-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mx-2">
            Goal description
          </label>
          <div className="mt-1 mx-2">
        <textarea
          rows={4}
          name="description"
          id="description"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          value={goalDesc}
          onChange={(e) => setGoalDesc(e.target.value)}
        />
          </div>
        </div>
        <div>
          <label htmlFor="outcomes" className="block text-sm font-medium text-gray-700 mx-2">
            How will you know that this goal is achieved?
          </label>
          <div className="mt-1 mx-2">
        <textarea
          rows={4}
          name="outcomes"
          id="outcomes"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          value={goalOutcome}
          onChange={(e) => setGoalOutcome(e.target.value)}
        />
          </div>
        </div>
        <ChooseContact selectedContactId={selectedContactId} setSelectedContactId={setSelectedContactId} />
        <div className="flex justify-between flex-row-reverse my-6 mx-2">
          <div>
            <p className="mb-1">
              Due date
            </p>
            <SingleDatePicker selected={selectedDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>
          <p className="self-center max-w-md mt-2">Must be completed by</p>
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