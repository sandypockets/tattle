import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import Button from "../../../components/Global/Button";
import CardTitle from "../../../components/Global/CardTitle";
import GoalCard from "../../../components/App/Dashboard/GoalCard";
import getGoals from "../../../helpers/getGoals";
import LoadingWheelWrapper from "../../../components/Global/LoadingWheelWrapper";
import LoadingWheel from "../../../components/Global/LoadingWheel";

export default function Completed() {
  const [goals, setGoals] = useState()
  const [completedGoals, setCompletedGoals] = useState()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [numberOfGoalsToShow, setNumberOfGoalsToShow] = useState(4)
  const [numOfCols, setNumOfCols] = useState(4)

  async function getUserGoals() {
    const supabaseUser = await supabase.auth.user()
    setUser(supabaseUser)
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
    goals && setCompletedGoals(goals.filter(item => item['is_completed'] === true))
  }, [goals])

  useEffect(() => {
    completedGoals && setNumOfCols(completedGoals.length <= 4 ? completedGoals.length : 4)
  }, [completedGoals])

  completedGoals && completedGoals.sort(
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

  return (
    <AppLayout>
      {loading && (
        <LoadingWheelWrapper>
          <LoadingWheel />
        </LoadingWheelWrapper>
      )}
      {!loading && numOfCols && (
        <>
          <CardTitle>Completed goals</CardTitle>
          <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-${numOfCols} gap-5`}>
            {completedGoals && completedGoals.map((goal, index) => {
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
              completedGoals && completedGoals.length > 3 &&
              <Button disabled={numberOfGoalsToShow > goals.length} onClickHandler={() => setNumberOfGoalsToShow(numberOfGoalsToShow + 4)}>
                Show more
              </Button>
            }
          </div>
        </>
      )}
    </AppLayout>
  )
}