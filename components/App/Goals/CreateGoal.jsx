import Card from "../../Global/Card";
import CardTitle from "../../Global/CardTitle";
import TextInput from "../../Global/TextInput";
import {useEffect, useState} from "react";
import Button from "../../Global/Button";
import SingleDatePicker from "../DatePicker";

export default function CreateGoal() {
  const [goalTitle, setGoalTitle] = useState('')
  const [goalDesc, setGoalDesc] = useState('')
  const [goalOutcome, setGoalOutcome] = useState('')
  const [goalDueDate, setGoalDueDate] = useState()
  const [selectedDate, setSelectedDate] = useState(new Date());

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
      <div className="my-6">
        <SingleDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>


      <Button>
        Save
      </Button>
    </Card>
  )
}