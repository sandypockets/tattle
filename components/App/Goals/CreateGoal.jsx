import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import Button from "../../Global/Button";
import Card from "../../Global/Card";
import ChooseContact from "./ChooseContact";
import SingleDatePicker from "../Utils/DatePicker";
import TextInput from "../../Global/TextInput";
import createGoal from "../../../helpers/goals/createGoal";

export default function CreateGoal({ getUserGoals, setDisplayFormType }) {
  const [goalTitle, setGoalTitle] = useState('')
  const [goalDesc, setGoalDesc] = useState('')
  const [goalOutcome, setGoalOutcome] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedContactId, setSelectedContactId] = useState()
  const router = useRouter()

  async function handleCreateGoal() {
    const user = await supabase.auth.user()
    const userId = user.id
    await createGoal(userId, goalTitle, goalDesc, goalOutcome, selectedDate, selectedContactId)
    setDisplayFormType('empty')
    setTimeout(() => {
      getUserGoals()
      router.push('/app/goals')
    }, 200)
  }

  return (
    <Card>
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
          <SingleDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        <p className="self-center max-w-md mt-2">If you do not mark your goal as complete by this date, we'll tattle on you.</p>
      </div>
      <div className="mx-2">
        <Button
          onClickHandler={() => {
            handleCreateGoal()
          }}
        >
          Save
        </Button>
      </div>
    </Card>
  )
}