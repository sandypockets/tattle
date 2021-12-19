import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import Button from "../../Global/Button";
import Card from "../../Global/Card";
import ChooseContact from "./ChooseContact";
import SingleDatePicker from "../Utils/DatePicker";
import TextInput from "../../Global/TextInput";
import LoadingWheelWrapper from "../../Global/Loading/LoadingWheelWrapper";
import LoadingWheel from "../../Global/Loading/LoadingWheel";
import { createGoal } from "../../../helpers/goals";

export default function CreateGoal({ getUserGoals, setDisplayFormType }) {
  const [goalTitle, setGoalTitle] = useState('')
  const [goalDesc, setGoalDesc] = useState('')
  const [goalOutcome, setGoalOutcome] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedContactId, setSelectedContactId] = useState()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleCreateGoal() {
    setLoading(true)
    const user = await supabase.auth.user()
    const userId = user.id
    await createGoal(userId, goalTitle, goalDesc, goalOutcome, selectedDate, selectedContactId)
    setDisplayFormType('empty')
    setTimeout(() => {
      getUserGoals().then(function() {
        setLoading(false)
        router.push('/app/goals')
      })
    }, 200)
  }

  if (loading) {
    return (
      <LoadingWheelWrapper>
        <LoadingWheel />
      </LoadingWheelWrapper>
    )
  } else {
    return (
      <Card>
        <div className="mx-2">
          <TextInput type="text" label="Goal title" value={goalTitle} onChangeHandler={(e) => setGoalTitle(e.target.value)} />
        </div>
        <div className="my-6 mx-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mx-2">
            Goal description
          </label>
          <div className="mt-1 mx-2">
    <textarea
      rows={4}
      name="description"
      id="description"
      className="shadow-sm focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none block w-full sm:text-sm border-gray-300 rounded-md"
      value={goalDesc}
      onChange={(e) => setGoalDesc(e.target.value)}
    />
          </div>
        </div>
        <div className="mx-2">
          <label htmlFor="outcomes" className="block text-sm font-medium text-gray-700 mx-2">
            How will you know that this goal is achieved?
          </label>
          <div className="mt-1 mx-2">
    <textarea
      rows={4}
      name="outcomes"
      id="outcomes"
      className="shadow-sm focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none block w-full sm:text-sm border-gray-300 rounded-md"
      value={goalOutcome}
      onChange={(e) => setGoalOutcome(e.target.value)}
    />
          </div>
        </div>
        <ChooseContact selectedContactId={selectedContactId} setSelectedContactId={setSelectedContactId} />

        <div className="flex justify-between sm:justify-center flex-row-reverse my-6 mx-4">
          <div className="flex flex-col flex-col-reverse lg:flex-row-reverse lg:justify-center">
            <div className="flex flex-row">
              <div className="mx-2 sm:mx-0 lg:mx-4">
                <label className="mt-6 sm:mt-4 mb-1">
                  <small>
                    Due date
                  </small>
                </label>
                <SingleDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
              </div>
            </div>
            <p className="self-center w-full sm:max-w-lg ml-4 xs:ml-2 sm:ml-0 mb-2 sm:mb-0 lg:mx-4 my-2">If you do not mark your goal as complete by this date, we'll tattle on you.</p>
          </div>
        </div>

        <div className="mx-4 pt-6 pb-8 sm:pb-6">
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
}