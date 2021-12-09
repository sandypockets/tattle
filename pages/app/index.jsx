import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import AppLayout from "../../components/App/Layout/AppLayout";
import AppLoadingState from "../../components/App/Utils/AppLoadingState";
import ContactsEmptyState from "../../components/App/Contacts/ContactsEmptyState";
import GoalsEmptyState from "../../components/App/Goals/GoalsEmptyState";
import StateWrapper from "../../components/App/Layout/StateWrapper";
import Stats from "../../components/App/Dashboard/Stats";
import UpcomingGoals from "../../components/App/Dashboard/UpcomingGoals";
import getGoals from "../../helpers/goals/getGoals";
import getTattleStats from "../../helpers/subscription/getTattleStats";

export default function Index() {
  const [loading, setLoading] = useState(true)
  const [goals, setGoals] = useState()
  const [numberOfGoalsToShow, setNumberOfGoalsToShow] = useState(3)
  const [userStats, setUserStats] = useState({
    'statOne': 0,
    'statOneText': 'Goals created',
    'statTwo': 0,
    'statTwoText': 'Completed on time',
    'statThree': 0,
    'statThreeText': 'Times Tattled on',
    'statFour': 0,
    'statFourText': 'Goals completed',
  })
  const [numOfCols, setNumOfCols] = useState(3)
  const [incompleteGoals, setIncompleteGoals] = useState()
  const router = useRouter()

  useEffect(() => {
    async function getGoalsAndStats() {
      const user = await supabase.auth.user()
      if (user) {
        const id = user['id']
        getGoals(id, setGoals)
        getTattleStats(id, setUserStats)
      }
    }
    getGoalsAndStats()
  }, [])

  useEffect(() => {
    if (goals) {
      setUserStats(prev => ({ ...prev, statOne: goals.length }))
      let goalsCompletedOnTime = 0
      for (const goal of goals) {
        goal['is_completed_on_time'] === true && goalsCompletedOnTime++
      }
      setUserStats(prev => ({ ...prev, statTwo: goalsCompletedOnTime }))
    }
  }, [goals])

  useEffect(() => {
    if (goals) {
      setUserStats(prev => ({ ...prev, statOne: goals.length }))
      let goalsCompleted = 0
      for (const goal of goals) {
        goal['is_completed'] === true && goalsCompleted++
      }
      setUserStats(prev => ({ ...prev, statFour: goalsCompleted }))
    }
  }, [goals])

  useEffect(() => {
    if (goals) {
      const outstandingGoals = goals.filter(item => item['is_completed'] === false)
      setNumOfCols(outstandingGoals.length <= 2 ? outstandingGoals.length + 1 : 3)
      // Sort goals by due_date, then by id
      outstandingGoals.sort(
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
      setIncompleteGoals(outstandingGoals)
      userStats && setLoading(false)
    }
  }, [userStats, goals])

  function newGoalRedirect(arg) {
    return router.push('/app/goals/new')
  }

  function newContactRedirect(arg) {
    return router.push('/app/contacts/new')
  }

  if (loading) {
    return (<AppLoadingState /> )
  } else {
    return (
      <AppLayout>
        <StateWrapper>
          <Stats statProps={userStats} />
          {goals && goals.length > 0 ? (
            <UpcomingGoals incompleteGoals={incompleteGoals} numOfCols={numOfCols} numberOfGoalsToShow={numberOfGoalsToShow} setNumberOfGoalsToShow={setNumberOfGoalsToShow} />
          ) : (
            <>
            <ContactsEmptyState setState={newContactRedirect} />
            <GoalsEmptyState setState={newGoalRedirect} />
            </>
          )}
        </StateWrapper>
      </AppLayout>
    )
  }
}