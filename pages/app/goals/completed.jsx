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
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [numberOfGoalsToShow, setNumberOfGoalsToShow] = useState(4)
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
    goals && setLoading(false)
  }, [goals])

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

  useEffect(() => {
    if (goals) {
      const completedGoals = goals.filter(item => item['is_completed'] === true).length
      setNumOfCols(completedGoals <= 4 ? completedGoals : 4)
    }
  }, [])


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
            {goals && goals.filter(item => item['is_completed'] === true).map((goal, index) => {
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
              goals && goals.length > 3 &&
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