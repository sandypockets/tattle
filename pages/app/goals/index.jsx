import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { sortOnce } from "../../../helpers/sort";
import AppLayout from "../../../components/App/Layout/AppLayout";
import AppLoadingState from "../../../components/App/Utils/AppLoadingState";
import CreateGoal from "../../../components/App/Goals/CreateGoal";
import EditGoalSlideover from "../../../components/App/Goals/EditGoalSlideover";
import GoalCard from "../../../components/App/Dashboard/GoalCard";
import GoalsEmptyState from "../../../components/App/Goals/GoalsEmptyState";
import GoalsTable from "../../../components/App/Goals/GoalsTable";
import HasNoContactsBanner from "../../../components/App/Goals/HasNoContactsBanner";
import Header from "../../../components/App/Goals/Header";
import IntroCard from "../../../components/App/Goals/IntroCard";
import StateWrapper from "../../../components/App/Layout/StateWrapper";
import { getContacts } from "../../../helpers/contacts";
import { getGoals } from "../../../helpers/goals";
import {SITE_NAME} from "../../../lib/constants";
import Head from "next/head";

export default function Index() {
  const [loading, setLoading] = useState(true)
  const [displayFormType, setDisplayFormType] = useState('empty')
  const [goals, setGoals] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState({})
  const [numOfCols, setNumOfCols] = useState(4)
  const [contacts, setContacts] = useState({})
  const user = supabase.auth.user()

  async function getUserGoals() {
    if (user?.id) {
      const id = user['id']
      getGoals(id, setGoals)
    }
  }

  async function getUserContacts() {
    if (user?.id) {
      const id = user['id']
      getContacts(id, setContacts)
    }
  }

  useEffect(() => {
    getUserGoals().then(() => getUserContacts())
  }, [])

  useEffect(() => {
    if (goals && contacts) {
      setNumOfCols(goals?.length <= 4 ? goals?.length : 4)
      sortOnce(goals, 'id', false)
    }
    if (user && goals && contacts) {
      setTimeout(() => {
        setLoading(false)
      }, 300)
    }
  }, [goals, contacts])

    return (
      <>
        <Head>
          <title>Goals | {SITE_NAME}</title>
        </Head>
        <AppLayout>
          <StateWrapper>
            {loading ? <AppLoadingState /> : (
              <>
                <Header setDisplayFormType={setDisplayFormType} goals={goals} contacts={contacts} />
                {displayFormType === 'create' &&
                  <CreateGoal setDisplayFormType={setDisplayFormType} getUserGoals={getUserGoals} />}
                <div className="hidden lg:block">
                  {goals?.length > 0 &&
                    <GoalsTable goals={goals} setSelectedGoal={setSelectedGoal} contacts={contacts} setOpen={setOpen} />}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 lg:hidden">
                  {goals?.map((goal) => (
                    <div key={goal.id}>
                      <GoalCard goal={goal} />
                    </div>
                  ))}
                </div>
                {!contacts || contacts?.length === 0 &&
                  <HasNoContactsBanner />}
                {goals?.length < 1 &&
                  <IntroCard contacts={contacts} />}
                {displayFormType === 'empty' && goals?.length < 1 && contacts?.length > 0 &&
                  <GoalsEmptyState setState={setDisplayFormType} />}
                <EditGoalSlideover title="Edit goal" open={open} setOpen={setOpen} user={user} selectedGoal={selectedGoal} getUserGoals={getUserGoals} />
              </>
            )}
          </StateWrapper>
        </AppLayout>
      </>
    )
  // }
}