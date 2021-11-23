import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from 'next/link'
import AppLayout from "../../components/App/Layout/AppLayout";
import Banner from "../../components/App/Banner";
import Button from "../../components/Global/Button";
import Card from "../../components/Global/Card";
import CardTitle from "../../components/Global/CardTitle";
import CreateGoal from "../../components/App/Goals/CreateGoal";
import GoalsEmptyState from "../../components/App/Goals/GoalsEmptyState";
import GoalsTable from "../../components/App/Goals/GoalsTable";
import getGoals from "../../helpers/getGoals";
import EditGoalSlideover from "../../components/App/Goals/EditGoalSlideover";

export default function Goals() {
  const [displayFormType, setDisplayFormType] = useState('empty')
  const [goals, setGoals] = useState()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState()
  const [selectedGoal, setSelectedGoal] = useState()

  async function getUserGoals() {
    const user = await supabase.auth.user()
    setUser(user)
    const id = user['id']
    getGoals(id, setGoals)
  }

  useEffect(() => {
    getUserGoals()
  }, [])

  goals && goals.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))

  return (
    <AppLayout>
      <div className="flex justify-between">
        <CardTitle>Goals</CardTitle>
        <div className="max-w-min">
          <Button onClickHandler={() => setDisplayFormType('create')}>Create</Button>
        </div>
      </div>
      {!goals && (
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
      {goals && <GoalsTable goals={goals} setSelectedGoal={setSelectedGoal} setOpen={setOpen} />}
      <EditGoalSlideover title="Edit goal" open={open} setOpen={setOpen} user={user} selectedGoal={selectedGoal} getUserGoals={getUserGoals} />
    </AppLayout>
  )
}