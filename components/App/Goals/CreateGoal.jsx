import Card from "../../Global/Card";
import CardTitle from "../../Global/CardTitle";
import TextInput from "../../Global/TextInput";
import {useEffect, useState} from "react";
import Button from "../../Global/Button";
import SingleDatePicker from "../DatePicker";
import ChooseContact from "./ChooseContact";
import {supabase} from "../../../lib/supabaseClient";
import getContacts from "../../../helpers/getContacts";

export default function CreateGoal() {
  const [goalTitle, setGoalTitle] = useState('')
  const [goalDesc, setGoalDesc] = useState('')
  const [goalOutcome, setGoalOutcome] = useState('')
  const [goalDueDate, setGoalDueDate] = useState()
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedContactId, setSelectedContactId] = useState()

  useEffect(() => {
    console.log("selectedContactId: ", selectedContactId)
  }, [selectedContactId])

  return (
    <Card>
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
          <SingleDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        <p className="self-center max-w-md mt-2">If you do not mark your goal as complete by this date, we'll tattle on you.</p>
      </div>

      <div className="mx-2">
        <Button>
          Save
        </Button>
      </div>
    </Card>
  )
}