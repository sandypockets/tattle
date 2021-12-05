import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Link from 'next/link'
import AppLayout from "../../../components/App/Layout/AppLayout";
import Banner from "../../../components/App/Banner";
import Button from "../../../components/Global/Button";
import Card from "../../../components/Global/Card";
import CardTitle from "../../../components/Global/CardTitle";
import CreateGoal from "../../../components/App/Goals/CreateGoal";
import GoalsEmptyState from "../../../components/App/Goals/GoalsEmptyState";
import GoalsTable from "../../../components/App/Goals/GoalsTable";
import EditGoalSlideover from "../../../components/App/Goals/EditGoalSlideover";
import LoadingWheelWrapper from "../../../components/Global/LoadingWheelWrapper";
import LoadingWheel from "../../../components/Global/LoadingWheel";
import getGoals from "../../../helpers/getGoals";

export default function Index() {
  const [loading, setLoading] = useState(true)
  const [displayFormType, setDisplayFormType] = useState('empty')
  const [goals, setGoals] = useState()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState()
  const [selectedGoal, setSelectedGoal] = useState()
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
    if (goals) {
      setNumOfCols(goals.length <= 4 ? goals.length : 4)
      user && setLoading(false)
      goals.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
    }
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
          <div className="flex justify-between">
            <CardTitle>Goals</CardTitle>
            <div className="max-w-min">
              <Button disabled={!goals || goals.length === 0} onClickHandler={() => setDisplayFormType('create')}>Create</Button>
            </div>
          </div>
          {!goals || goals.length === 0 && (
            <Banner>
              <p className="h-12">Before you can create a goal, you need to{' '}
                <Link href="/app/contacts">
                  <a className="text-yellow-200">
                    create a contact
                  </a>
                </Link>
                .</p>
            </Banner>
          )}
          <Card>
            <CardTitle>Manage your goals</CardTitle>
            <p className="my-4">Add your mom, your best friend, or anyone else that will help keep you accountable.</p>
            <p>After saving a contact, you can assign the contact to any goals you create.</p>
          </Card>
          {displayFormType === 'empty' && !goals && <GoalsEmptyState setState={setDisplayFormType} />}
          {displayFormType === 'create' && <CreateGoal setDisplayFormType={setDisplayFormType} getUserGoals={getUserGoals} />}
          {goals && goals.length > 0 && <GoalsTable goals={goals} setSelectedGoal={setSelectedGoal} setOpen={setOpen} />}
          <EditGoalSlideover title="Edit goal" open={open} setOpen={setOpen} user={user} selectedGoal={selectedGoal} getUserGoals={getUserGoals} />
        </>
      )}
    </AppLayout>
  )
}