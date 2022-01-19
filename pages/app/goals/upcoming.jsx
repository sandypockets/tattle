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

export default function Upcoming() {
  const [goals, setGoals] = useState()
  const [loading, setLoading] = useState(true)
  const [numberOfGoalsToShow, setNumberOfGoalsToShow] = useState(4)
  const [upcomingGoals, setUpcomingGoals] = useState()
  const [numOfCols, setNumOfCols] = useState(2)

  async function getUserGoals() {
    const user = await supabase.auth.user()
    if (user?.id) {
      getGoals(user.id, setGoals)
    }
  }

  useEffect(() => {
    getUserGoals()
  }, [])

  useEffect(() => {
    goals && sortTwice(goals, 'due_date', 'id', true)
    goals && setUpcomingGoals(goals?.filter(item => item['is_completed'] === false))
  }, [goals])

  useEffect(() => {
    if (upcomingGoals) {
      setNumOfCols(upcomingGoals?.length <= 1 ? upcomingGoals + 1 : 2)
      setLoading(false)
    }
  }, [upcomingGoals])

  if (upcomingGoals?.length < 1) {
    return (
      <AppLayout>
        <StateWrapper>
          <CardTitle>Goals due soon</CardTitle>
          <p>You don't have any outstanding goals.</p>
        </StateWrapper>
      </AppLayout>
    )
  } else {
    return (
      <>
        <Head>
          <title>Upcoming goals | {SITE_NAME}</title>
        </Head>
        <AppLayout>
          {loading ? <AppLoadingState /> : (
            <StateWrapper>
              <CardTitle>Goals due soon</CardTitle>
              <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-${numOfCols} gap-5`}>
                {upcomingGoals?.map((goal, index) => {
                  if (index < numberOfGoalsToShow) {
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
                  upcomingGoals?.length > 4 && numberOfGoalsToShow <= upcomingGoals?.length &&
                  <Button disabled={numberOfGoalsToShow > upcomingGoals?.length} onClickHandler={() => setNumberOfGoalsToShow(numberOfGoalsToShow + 4)}>
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
