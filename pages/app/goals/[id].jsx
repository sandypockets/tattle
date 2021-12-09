import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import AppLoadingState from "../../../components/App/Utils/AppLoadingState";
import Button from "../../../components/Global/Button";
import Card from "../../../components/Global/Card";
import CardTitle from "../../../components/Global/CardTitle";
import GridCard from "../../../components/Global/GridCard";
import getGoal from "../../../helpers/goals/getGoal";
import getContact from "../../../helpers/contacts/getContact";
import markAsDone from "../../../helpers/goals/markAsDone";
import StateWrapper from "../../../components/App/Layout/StateWrapper";
import SmallCardTitle from "../../../components/Global/SmallCardTitle";

export default function SingleGoal() {
  const [contact, setContact] = useState(Object)
  const [goal, setGoal] = useState(Object)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(Number)
  const [isCompletedOnTime, setIsCompletedOnTime] = useState(false)
  const router = useRouter()
  const user = supabase.auth.user()

  useEffect(() => {
    const { id } = router.query
    getGoal(user.id, id, setGoal)
  }, [])

  useEffect(() => {
    if (goal) {
      getContact(user.id, goal['contact_id'], setContact)
      const unixDueDate = new Date(goal['due_date']).getTime()
      const unixDateNow = Date.now()
      const unixTimeRemaining = unixDueDate - unixDateNow
      const numberOfDaysRemaining = Math.round(Math.round(unixTimeRemaining / 86400) / 1000)
      setTimeLeft(numberOfDaysRemaining)
      if (unixTimeRemaining < 0) {
        setIsCompletedOnTime(false)
      } else {
        setIsCompletedOnTime(true)
      }
    }
  }, [goal])

  useEffect(() => {
    goal && contact && setTimeout(() => {
      setLoading(false)
    }, 100)
  }, [goal, contact])

 function markGoalAsDone() {
    if (user && goal) {
      markAsDone(user.id, goal['id'], isCompletedOnTime)
      setTimeout(() => {
        const { id } = router.query
        return getGoal(user.id, id, setGoal)
      }, 50)
    }
  }

  if (loading) {
    return (<AppLoadingState />)
  } else if (goal) {
    return (
      <AppLayout>
        <StateWrapper>
          <section className="flex justify-between">
            <CardTitle>{goal['title']}</CardTitle>
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
          </section>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
            <GridCard>
              {/*<h3 className="text-sm text-gray-500">Status</h3>*/}
              {goal['is_completed'] === true && (
                <SmallCardTitle>Complete</SmallCardTitle>
              )}
              {goal['is_completed'] === false && (
                <>
                  <h3 className="text-sm text-gray-500">{timeLeft.toString()[0] === '-' ? "Days late" : "Time remaining"}</h3>
                  <SmallCardTitle><span className={timeLeft.toString()[0] === '-' ? "text-red-500" : "text-black"}>{timeLeft.toString()[0] === '-' ? timeLeft.toString().slice(1) : timeLeft}{timeLeft === 1 ? " day" : " days"}</span></SmallCardTitle>
                </>
              )}
            </GridCard>
            <GridCard>
              <h3 className="text-sm text-gray-500">Created on</h3>
              <SmallCardTitle>{new Date(goal['created_at']).toLocaleDateString("en-UK")}</SmallCardTitle>
            </GridCard>
            <GridCard>
              <h3 className="text-sm text-gray-500">Due on</h3>
              <SmallCardTitle>{new Date(goal['due_date']).toLocaleDateString("en-UK")}</SmallCardTitle>
            </GridCard>
            <GridCard>
              <h3 className="text-sm text-gray-500">Assigned to</h3>
              <SmallCardTitle>{contact && contact.name}</SmallCardTitle>
            </GridCard>
          </div>
          <Card>
            <SmallCardTitle>Description</SmallCardTitle>
            <p>{goal['description']}</p>
          </Card>
          <Card>
            <SmallCardTitle>Outcome</SmallCardTitle>
            <p>{goal['outcome']}</p>
          </Card>
        </StateWrapper>
      </AppLayout>
    )
  }
}