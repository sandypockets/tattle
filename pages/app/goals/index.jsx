import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import AppLoadingState from "../../../components/App/Utils/AppLoadingState";
import CreateGoal from "../../../components/App/Goals/CreateGoal";
import EditGoalSlideover from "../../../components/App/Goals/EditGoalSlideover";
import GoalsEmptyState from "../../../components/App/Goals/GoalsEmptyState";
import GoalsTable from "../../../components/App/Goals/GoalsTable";
import HasNoContactsBanner from "../../../components/App/Goals/HasNoContactsBanner";
import Header from "../../../components/App/Goals/Header";
import IntroCard from "../../../components/App/Goals/IntroCard";
import StateWrapper from "../../../components/App/Layout/StateWrapper";
import getGoals from "../../../helpers/goals/getGoals";
import getContacts from "../../../helpers/contacts/getContacts";

export default function Index() {
  const [loading, setLoading] = useState(true)
  const [displayFormType, setDisplayFormType] = useState('empty')
  const [goals, setGoals] = useState()
  const [open, setOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState()
  const [numOfCols, setNumOfCols] = useState(4)
  const [contacts, setContacts] = useState()
  const user = supabase.auth.user()

  async function getUserGoals() {
    if (user && user['id']) {
      const id = user['id']
      getGoals(id, setGoals)
    }
  }

  async function getUserContacts() {
    if (user && user['id']) {
      const id = user['id']
      getContacts(id, setContacts)
    }
  }

  useEffect(() => {
    getUserGoals()
  }, [])

  useEffect(() => {
    getUserContacts()
  }, [])

  useEffect(() => {
    if (goals) {
      setNumOfCols(goals.length <= 4 ? goals.length : 4)
      user && setLoading(false)
      goals.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
    }
  }, [goals])

  if (loading) {
    return (<AppLoadingState />)
  } else {
    return (
      <AppLayout>
        <StateWrapper>
          <Header setDisplayFormType={setDisplayFormType} goals={goals} contacts={contacts} />
          {!contacts || contacts.length === 0 && <HasNoContactsBanner />}
          {goals.length < 1 && <IntroCard/>}
          {displayFormType === 'empty' && goals.length < 1 && <GoalsEmptyState setState={setDisplayFormType} />}
          {displayFormType === 'create' && <CreateGoal setDisplayFormType={setDisplayFormType} getUserGoals={getUserGoals} />}
          {goals && goals.length > 0 && <GoalsTable goals={goals} setSelectedGoal={setSelectedGoal} setOpen={setOpen} />}
          <EditGoalSlideover title="Edit goal" open={open} setOpen={setOpen} user={user} selectedGoal={selectedGoal} getUserGoals={getUserGoals} />
        </StateWrapper>
      </AppLayout>
    )
  }
}