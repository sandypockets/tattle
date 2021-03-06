import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import AppLoadingState from "../../../components/App/Utils/AppLoadingState";
import Card from "../../../components/Global/Card";
import CardTitle from "../../../components/Global/CardTitle";
import EditGoalSlideover from "../../../components/App/Goals/EditGoalSlideover";
import GoalHeaderButtons from "../../../components/App/Goals/GoalHeaderButtons";
import GridCard from "../../../components/Global/GridCard";
import StateWrapper from "../../../components/App/Layout/StateWrapper";
import SmallCardTitle from "../../../components/Global/SmallCardTitle";
import { getContact } from "../../../helpers/contacts";
import { getGoal, markAsDone } from "../../../helpers/goals";
import {SITE_NAME} from "../../../lib/constants";
import Head from "next/head";

export default function SingleGoal() {
  const [contact, setContact] = useState(Object)
  const [goal, setGoal] = useState(Object)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(Number)
  const [isCompletedOnTime, setIsCompletedOnTime] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState({})

  const router = useRouter()
  const user = supabase.auth.user()

  async function getUserGoal() {
    getGoal(user.id, goal.id, setGoal)
  }

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

  return (
    <>
      <Head>
        <title>{goal?.title || "Goal"} | {SITE_NAME}</title>
      </Head>
      <AppLayout>
        {loading || !goal ? <AppLoadingState /> : (
          <StateWrapper>
            <section className="flex flex-col-reverse sm:flex-row justify-between">
              <CardTitle>{goal['title']}</CardTitle>
              <div className="pb-6 sm:pb-0 flex justify-center sm:justify-end">
                <GoalHeaderButtons goal={goal} user={user} isCompletedOnTime={isCompletedOnTime} markGoalAsDone={markGoalAsDone} setSelectedGoal={setSelectedGoal} setOpen={setOpen} />
              </div>
            </section>
            <div className="grid grid-cols-1 2xs:grid-cols-2 xl:grid-cols-4 gap-1 2xs:gap-3 sm:gap-4 md:gap-6 mb-8 2xs:mb-0">
              <GridCard>
                {goal['is_completed'] === true && (
                  <>
                    <h3 className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">Status</h3>
                    <SmallCardTitle>Complete</SmallCardTitle>
                  </>
                )}
                {goal['is_completed'] === false && (
                  <>
                    <h3 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{timeLeft.toString()[0] === '-' ? "Days late" : "Time remaining"}</h3>
                    <SmallCardTitle><span className={timeLeft.toString()[0] === '-' ? "text-red-500 dark:text-red-600 text-md" : "text-black text-md"}>{timeLeft.toString()[0] === '-' ? timeLeft.toString().slice(1) : timeLeft}{timeLeft.toString().slice(1) === '1' || timeLeft.toString() === '1' ? " day" : " days"}</span></SmallCardTitle>
                  </>
                )}
              </GridCard>
              <GridCard>
                <h3 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Created on</h3>
                <SmallCardTitle>{new Date(goal['created_at']).toLocaleDateString("en-UK")}</SmallCardTitle>
              </GridCard>
              <GridCard>
                <h3 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Due on</h3>
                <SmallCardTitle>{new Date(goal['due_date']).toLocaleDateString("en-UK")}</SmallCardTitle>
              </GridCard>
              <GridCard>
                <h3 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Assigned to</h3>
                <SmallCardTitle>{contact && contact.name}</SmallCardTitle>
              </GridCard>
            </div>
            <div className="mt-8 sm:mt-12 md:mt-14">
              <Card>
                <SmallCardTitle>Description</SmallCardTitle>
                <p className="dark:text-gray-400">{goal['description']}</p>
              </Card>
              <Card>
                <SmallCardTitle>Outcome</SmallCardTitle>
                <p className="dark:text-gray-400">{goal['outcome']}</p>
              </Card>
            </div>
            <EditGoalSlideover title="Edit your goal" open={open} setOpen={setOpen} user={user} selectedGoal={selectedGoal} getUserGoals={getUserGoal} />
          </StateWrapper>
        )}
      </AppLayout>
    </>
  )
}