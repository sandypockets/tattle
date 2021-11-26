import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import AppLayout from "../../components/App/Layout/AppLayout";
import Button from "../../components/Global/Button";
import CardTitle from "../../components/Global/CardTitle";
import GoalCard from "../../components/App/Dashboard/GoalCard";
import getGoals from "../../helpers/getGoals";

export default function Index() {
  const [goals, setGoals] = useState()
  const [numberOfGoalsToShow, setNumberOfGoalsToShow] = useState(2)

  async function getUserGoals() {
    const user = await supabase.auth.user()
    const id = user['id']
    getGoals(id, setGoals)
  }

  useEffect(() => {
    getUserGoals()
  }, [])

  goals && goals.sort((a,b) => (a['due_date'] > b['due_date']) ? 1 : ((b['due_date'] > a['due_date']) ? -1 : 0)).reverse()

  return (
    <AppLayout>
      <CardTitle>Your goals</CardTitle>
      <div className="grid grid-cols-2 gap-10">
        {goals && goals.map((goal, index) => {
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
        <Button onClickHandler={() => setNumberOfGoalsToShow(numberOfGoalsToShow + 4)}>Show more</Button>
      </div>
    </AppLayout>
  )
}