import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import AppLoadingState from "../../../components/App/Utils/AppLoadingState";
import Banner from "../../../components/App/Utils/Banner";
import CardTitle from "../../../components/Global/CardTitle";
import ContactsEmptyState from "../../../components/App/Contacts/ContactsEmptyState";
import CreateGoal from "../../../components/App/Goals/CreateGoal";
import GoalsEmptyState from "../../../components/App/Goals/GoalsEmptyState";
import StateWrapper from "../../../components/App/Layout/StateWrapper";
import { getGoals } from "../../../helpers/goals";
import { getContacts } from "../../../helpers/contacts";
import {SITE_NAME} from "../../../lib/constants";
import Head from "next/head";

export default function New() {
  const [displayFormType, setDisplayFormType] = useState('empty')
  const [goals, setGoals] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [contacts, setContacts] = useState([])
  const [contactFormState, setContactFormState] = useState('')
  const router = useRouter()

  async function getUserGoals() {
    const authUser = await supabase.auth.user()
    if (authUser?.id) {
      const id = authUser['id']
      getGoals(id, setGoals)
      setUser(authUser)
    }
  }

  useEffect(() => {
    getUserGoals()
  }, [])

  useEffect(() => {
    user && getContacts(user.id, setContacts)
  }, [user])

  useEffect(() => {
    goals?.length > 0 && setDisplayFormType('create')
    goals && setTimeout(() => {
      setLoading(false)
    }, 100)
  }, [goals])

  useEffect(() => {
    let path = router.asPath
    path = path.split('#')
    if (path[1] === 'first') {
      setDisplayFormType('create')
    }
  }, [])

  useEffect(() => {
    if (contactFormState === 'create') {
      router.push('/app/contacts/new')
    }
  }, [contactFormState])

    return (
      <>
        <Head>
          <title>New goal | {SITE_NAME}</title>
        </Head>
        <AppLayout>
          {loading ? <AppLoadingState /> : (
            <StateWrapper>
              <CardTitle>Create a goal</CardTitle>
              {!contacts && !goals || contacts?.length >= 1 && goals?.length === 0 && displayFormType === 'empty' &&
                <GoalsEmptyState setState={setDisplayFormType} />
              }
              {/*{!goals || goals?.length < 1 && <CreateGoal getUserGoals={getUserGoals} setDisplayFormType={setDisplayFormType} />}*/}
              {displayFormType === 'create' &&
                <CreateGoal getUserGoals={getUserGoals} setDisplayFormType={setDisplayFormType} />}
              {!contacts || contacts?.length === 0 && (
                <>
                  <Banner>
                    <p className="mt-1">You need to add a contact before you can create a goal.</p>
                  </Banner>
                  <ContactsEmptyState setState={setContactFormState} />
                </>
              )}
            </StateWrapper>
          )}
        </AppLayout>
      </>
    )
}