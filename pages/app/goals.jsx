import {useEffect, useState} from "react";
import AppLayout from "../../components/App/Layout/AppLayout";
import Banner from "../../components/App/Banner";
import Button from "../../components/Global/Button";
import Card from "../../components/Global/Card";
import CardTitle from "../../components/Global/CardTitle";
import CreateGoal from "../../components/App/Goals/CreateGoal";
import GoalsEmptyState from "../../components/App/Goals/GoalsEmptyState";
import GoalsTable from "../../components/App/Goals/GoalsTable";
import Link from 'next/link'
import {supabase} from "../../lib/supabaseClient";
import getGoals from "../../helpers/getGoals";

export default function Goals() {
  const [displayFormType, setDisplayFormType] = useState('empty')
  const [goals, setGoals] = useState()

  async function getUserGoals() {
    const user = await supabase.auth.user()
    const id = user['id']
    getGoals(id, setGoals)
  }

  useEffect(() => {
    getUserGoals()
  }, [])

  return (
    <AppLayout>
      <div className="flex justify-between">
        <CardTitle>Goals</CardTitle>
        <div className="max-w-min">
          <Button onClickHandler={() => setDisplayFormType('create')}>Create</Button>
        </div>
      </div>
      <Banner>
        <p className="h-12">Before you can create a goal, you need to{' '}
          <Link href="/app/contacts">
            <a className="text-yellow-200">
              create a contact
            </a>
          </Link>
          .</p>
      </Banner>
      <Card>
        <CardTitle>Manage your goals</CardTitle>
        <p className="my-4">Add your mom, your best friend, or anyone else that will help keep you accountable.</p>
        <p>After saving a contact, you can assign the contact to any goals you create.</p>
      </Card>
      {displayFormType === 'empty' && !goals && <GoalsEmptyState setState={setDisplayFormType} />}
      {displayFormType === 'create' && <CreateGoal />}
      {goals && (
        <div>
          <GoalsTable goals={goals} />
        </div>
      )}
    </AppLayout>
  )
}