import {useEffect, useState} from "react";
import AppLayout from "../../../components/App/Layout/AppLayout";
import GoalsEmptyState from "../../../components/App/Goals/GoalsEmptyState";
import CreateGoal from "../../../components/App/Goals/CreateGoal";
import {supabase} from "../../../lib/supabaseClient";
import getGoals from "../../../helpers/getGoals";
import LoadingWheelWrapper from "../../../components/Global/LoadingWheelWrapper";
import LoadingWheel from "../../../components/Global/LoadingWheel";

export default function New() {
  const [displayFormType, setDisplayFormType] = useState('empty')
  const [goals, setGoals] = useState()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

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

  return (
    <AppLayout>
      {loading && (
        <LoadingWheelWrapper>
          <LoadingWheel />
        </LoadingWheelWrapper>
      )}
      {!loading && (
        <>
          {!goals && <GoalsEmptyState setState={setDisplayFormType} />}
          {goals && <CreateGoal getUserGoals={getUserGoals} />}
        </>
      )}
    </AppLayout>
  )
}