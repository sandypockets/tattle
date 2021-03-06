import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import AppLoadingState from "../../../components/App/Utils/AppLoadingState";
import Button from "../../../components/Global/Button";
import CardTitle from "../../../components/Global/CardTitle";
import GoalCard from "../../../components/App/Dashboard/GoalCard";
import StateWrapper from "../../../components/App/Layout/StateWrapper";
import { getGoals } from "../../../helpers/goals";
import { sortTwice } from "../../../helpers/sort";
import {SITE_NAME} from "../../../lib/constants";
import Head from "next/head";

export default function Completed() {
  const [goals, setGoals] = useState()
  const [completedGoals, setCompletedGoals] = useState()
  const [loading, setLoading] = useState(true)
  const [numberOfGoalsToShow, setNumberOfGoalsToShow] = useState(4)
  const [numOfCols, setNumOfCols] = useState(2)

  async function getUserGoals() {
    const supabaseUser = await supabase.auth.user()
    const id = supabaseUser['id']
    getGoals(id, setGoals)
  }

  useEffect(() => {
    getUserGoals()
  }, [])

  useEffect(() => {
    goals && setLoading(false)
  }, [goals])

  useEffect(() => {
    goals && setCompletedGoals(goals?.filter(item => item['is_completed'] === true))
  }, [goals])

  useEffect(() => {
    completedGoals && setNumOfCols(completedGoals?.length <= 1 ? completedGoals?.length + 1 : 3)
  }, [completedGoals])

  useEffect(() => {
    completedGoals && sortTwice(completedGoals, 'due_date', 'id', true)
  }, [completedGoals])

if (completedGoals?.length < 1) {
  return (
    <>
      <Head>
        <title>Completed goals - No Goals | {SITE_NAME}</title>
      </Head>
      <AppLayout>
        <StateWrapper>
          <CardTitle>Completed goals</CardTitle>
          <p>You haven't completed any goals yet.</p>
        </StateWrapper>
      </AppLayout>
    </>
  )} else if (numOfCols) {
    return (
      <>
        <Head>
          <title>Completed goals | {SITE_NAME}</title>
        </Head>
        <AppLayout>
          {loading ? <AppLoadingState /> : (
            <StateWrapper>
              <CardTitle>Completed goals</CardTitle>
              <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-${numOfCols} gap-5`}>
                {completedGoals?.map((goal, index) => {
                  if (index <= numberOfGoalsToShow) {
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
                  completedGoals?.length > numOfCols &&
                  <Button disabled={numberOfGoalsToShow > completedGoals?.length} onClickHandler={() => setNumberOfGoalsToShow(numberOfGoalsToShow + 4)}>
                    Show more
                  </Button>
                }
              </div>
            </StateWrapper>
          )}
        </AppLayout>
      </>
    )
  }
}