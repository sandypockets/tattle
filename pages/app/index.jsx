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
import { getContacts } from "../../helpers/contacts";
import { getGoals } from "../../helpers/goals";
import { getTattleStats } from "../../helpers/subscriptions";
import { sortTwice } from "../../helpers/sort";

export default function Index() {
  const [loading, setLoading] = useState(true)
  const [goals, setGoals] = useState([])
  const [contacts, setContacts] = useState([])
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
  const [incompleteGoals, setIncompleteGoals] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function getUserData() {
      const user = await supabase.auth.user()
      if (user?.id) {
        const id = user['id']
        getGoals(id, setGoals)
        getTattleStats(id, setUserStats)
        getContacts(id, setContacts)
      }
    }
    getUserData()
  }, [])

  useEffect(() => {
    if (goals) {
      setUserStats(prev => ({ ...prev, statOne: goals?.length }))
      let goalsCompletedOnTime = 0
      for (const goal of goals) {
        goal['is_completed_on_time'] === true && goalsCompletedOnTime++
      }
      setUserStats(prev => ({ ...prev, statTwo: goalsCompletedOnTime }))
    }
  }, [goals])

  useEffect(() => {
    if (goals) {
      setUserStats(prev => ({ ...prev, statOne: goals?.length }))
      let goalsCompleted = 0
      for (const goal of goals) {
        goal['is_completed'] === true && goalsCompleted++
      }
      setUserStats(prev => ({ ...prev, statFour: goalsCompleted }))
    }
  }, [goals])

  useEffect(() => {
    if (goals) {
      const outstandingGoals = goals?.filter(item => item['is_completed'] === false)
      setNumOfCols(outstandingGoals.length <= 2 ? outstandingGoals.length + 1 : 3)
      setIncompleteGoals(sortTwice(outstandingGoals, 'due_date', 'id', true))
      userStats && setLoading(false)
    }
  }, [userStats, goals])

  function newGoalRedirect(arg) {
    return router.push('/app/goals/new#first')
  }

  function newContactRedirect(arg) {
    return router.push('/app/contacts/new')
  }

    return (
      <AppLayout>
        {loading ? <AppLoadingState /> : (
          <StateWrapper>
            <Stats statProps={userStats} />
            {goals?.length > 0 ? (
              <UpcomingGoals
                incompleteGoals={incompleteGoals} numOfCols={numOfCols}
                numberOfGoalsToShow={numberOfGoalsToShow} setNumberOfGoalsToShow={setNumberOfGoalsToShow}
              />
            ) : (
              <>
                {contacts.length < 1 && <ContactsEmptyState setState={newContactRedirect} />}
                {contacts.length > 0 && <GoalsEmptyState setState={newGoalRedirect}/>}
              </>
            )}
          </StateWrapper>
        )}
      </AppLayout>
    )

}