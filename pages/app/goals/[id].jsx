import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import Button from "../../../components/Global/Button";
import Card from "../../../components/Global/Card";
import CardTitle from "../../../components/Global/CardTitle";
import GridCard from "../../../components/Global/GridCard";
import LoadingWheel from "../../../components/Global/LoadingWheel";
import LoadingWheelWrapper from "../../../components/Global/LoadingWheelWrapper";
import getGoal from "../../../helpers/getGoal";
import getContact from "../../../helpers/getContact";
import markAsDone from "../../../helpers/markAsDone";

export default function SingleGoal() {
  const [contact, setContact] = useState()
  const [goal, setGoal] = useState()
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState()
  const [isCompletedOnTime, setIsCompletedOnTime] = useState(false)
  const router = useRouter()
  const user = supabase.auth.user()

  useEffect(() => {
    const user = supabase.auth.user()
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
    goal && contact && setLoading(false)
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

  return (
    <AppLayout>
      {loading && (
        <LoadingWheelWrapper>
          <LoadingWheel />
        </LoadingWheelWrapper>
      )}
      {!loading && goal && (
        <>
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
                  // user && goal && markAsDone(user.id, goal['id'], isCompletedOnTime)
                }}>
                  Mark as done
                </Button>
              </div>
            </div>
          </section>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
            <GridCard>
              {goal['is_completed'] === true && (
                <CardTitle><span>Complete</span></CardTitle>
              )}
              { goal['is_completed'] === false && (
                <>
                  <h2>{timeLeft.toString()[0] === '-' ? "Days late" : "Time remaining"}</h2>
                  <CardTitle><span className={timeLeft.toString()[0] === '-' ? "text-red-500" : "text-black"}>{timeLeft.toString()[0] === '-' ? timeLeft.toString().slice(1) : timeLeft}{timeLeft === 1 ? " day" : " days"}</span></CardTitle>
                </>
              )}
            </GridCard>
            <GridCard>
              <h2>Created on</h2>
              <CardTitle>{new Date(goal['created_at']).toLocaleDateString("en-UK")}</CardTitle>
            </GridCard>
            <GridCard>
              <h2>Due on</h2>
              <CardTitle>{new Date(goal['due_date']).toLocaleDateString("en-UK")}</CardTitle>
            </GridCard>
            <GridCard>
              <h2>Assigned to</h2>
              <CardTitle>{contact && contact.name}</CardTitle>
            </GridCard>
          </div>
          <Card>
            <CardTitle>Description</CardTitle>
            <p>Description: <span>{goal['description']}</span></p>
          </Card>
          <Card>
            <CardTitle>Outcome</CardTitle>
            <p>Outcome: <span>{goal['outcome']}</span></p>
          </Card>
        </>
      )}
    </AppLayout>
  )
}