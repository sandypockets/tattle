import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import AppLayout from "../../components/App/Layout/AppLayout";
import LoadingWheelWrapper from "../../components/Global/Loading/LoadingWheelWrapper";
import LoadingWheel from "../../components/Global/Loading/LoadingWheel";
import getGoals from "../../helpers/getGoals";
import getTattleStats from "../../helpers/getTattleStats";
import UpcomingGoals from "../../components/App/Dashboard/UpcomingGoals";
import Stats from "../../components/App/Dashboard/Stats";
import GoalsEmptyState from "../../components/App/Goals/GoalsEmptyState";
import ContactsEmptyState from "../../components/App/Contacts/ContactsEmptyState";
import { useRouter } from "next/router";

export default function Index() {
  const [loading, setLoading] = useState(true)
  const [goals, setGoals] = useState()
  const [numberOfGoalsToShow, setNumberOfGoalsToShow] = useState(4)
  const [userStats, setUserStats] = useState({
    'statOne': 0,
    'statOneText': 'Goals created',
    'statTwo': 0,
    'statTwoText': 'Completed on time',
    'statThree': 0,
    'statThreeText': 'times Tattled on',
  })
  const [numOfCols, setNumOfCols] = useState(4)
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
      setUserStats({
        'statOne': goals.length,
        'statOneText': 'Goals created',
        'statTwo': '2',
        'statTwoText': 'Goals completed on time',
        'statThree': '1',
        'statThreeText': 'times Tattled on',
        'statFourText':'Goals due this week',
        'statFour':'1'
      })
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
      const outstandingGoals = goals.filter(item => item['is_completed'] === false)
      setNumOfCols(outstandingGoals.length <= 3 ? outstandingGoals.length + 1 : 4)
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
    return (
      <AppLayout>
        <LoadingWheelWrapper>
          <LoadingWheel />
        </LoadingWheelWrapper>
      </AppLayout>
    )
  } else {
    return (
      <AppLayout>
        {/*<StatsSection statProps={userStats} showHeadings={false} />*/}
        <Stats statProps={userStats} />
        {goals.length > 0 ? (
          <UpcomingGoals incompleteGoals={incompleteGoals} numOfCols={numOfCols} numberOfGoalsToShow={numberOfGoalsToShow} setNumberOfGoalsToShow={setNumberOfGoalsToShow} />
        ) : (
          <>
          <ContactsEmptyState setState={newContactRedirect} />
          <GoalsEmptyState setState={newGoalRedirect} />
          </>
        )}
      </AppLayout>
    )
  }
}