import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import Button from "../../../components/Global/Button";
import CardTitle from "../../../components/Global/CardTitle";
import GoalCard from "../../../components/App/Dashboard/GoalCard";
import getGoals from "../../../helpers/getGoals";
import LoadingWheelWrapper from "../../../components/Global/LoadingWheelWrapper";
import LoadingWheel from "../../../components/Global/LoadingWheel";

export default function Upcoming() {
  const [goals, setGoals] = useState()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [numberOfGoalsToShow, setNumberOfGoalsToShow] = useState(4)
  const [upcomingGoals, setUpcomingGoals] = useState()
  const [numOfCols, setNumOfCols] = useState(4)

  async function getUserGoals() {
    const user = await supabase.auth.user()
    setUser(user)
    const id = user['id']
    getGoals(id, setGoals)
  }

  useEffect(() => {
    getUserGoals()
  }, [])

  useEffect(() => {
    goals && goals.sort(
      function(a, b) {
        if (a['due_date'] > b['due_date']) {
          return -1
        } else if (a['due_date'] < b['due_date']) {
          return 1
        }
        if (a['id'] > b['id']) {
          return -1
        } else if (a['id'] < b['id']) {
          return 1
        }
      }
    ).reverse()
    goals && setUpcomingGoals(goals.filter(item => item['is_completed'] === false))
  }, [goals])

  useEffect(() => {
    if (upcomingGoals) {
      setNumOfCols(upcomingGoals.length <= 4 ? upcomingGoals : 4)
      setLoading(false)
    }
  }, [upcomingGoals])

  return (
    <AppLayout>
      {loading && (
        <LoadingWheelWrapper>
          <LoadingWheel />
        </LoadingWheelWrapper>
      )}
      {!loading && (
        <>
          <CardTitle>Goals due soon</CardTitle>
          <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-${numOfCols} gap-5`}>
            {upcomingGoals && upcomingGoals.map((goal, index) => {
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
              upcomingGoals && upcomingGoals.length > 3 &&
              <Button disabled={numberOfGoalsToShow > upcomingGoals.length} onClickHandler={() => setNumberOfGoalsToShow(numberOfGoalsToShow + 4)}>
                Show more
              </Button>
            }
          </div>
        </>
      )}
    </AppLayout>
  )
}