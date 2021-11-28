import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import Card from "../../../components/Global/Card";
import CardTitle from "../../../components/Global/CardTitle";
import GridCard from "../../../components/Global/GridCard";
import getGoal from "../../../helpers/getGoal";
import Button from "../../../components/Global/Button";
import getContact from "../../../helpers/getContact";

export default function SingleGoal() {
  const [goal, setGoal] = useState()
  const [contact, setContact] = useState()
  const router = useRouter()
  const user = supabase.auth.user()

  useEffect(() => {
    const { id } = router.query
    console.log("goalId", id)
    getGoal(user.id, id, setGoal)
  }, [])

  useEffect(() => {
    goal && getContact(user.id, goal['contact_id'], setContact)
  }, [goal])

  return (
    <AppLayout>
      {goal && (
        <>
          <section className="flex justify-between">
            <CardTitle>{goal['title']}</CardTitle>
            <div className="flex">
              <div className="w-36 mx-4">
                <Button>
                  Update contact
                </Button>
              </div>
              <div className="w-36">
                <Button>
                  Mark as done
                </Button>
              </div>
            </div>
          </section>
          <div className="grid grid-cols-4 gap-6">
            <GridCard>
              <h2>Time remaining</h2>
              <CardTitle>10 days</CardTitle>
            </GridCard>
            <GridCard>
              <h2>Created on</h2>
              <CardTitle>{new Date(goal['created_at']).toLocaleDateString("en-UK")}</CardTitle>
            </GridCard>
            <GridCard>
              <h2>Due on</h2>
              <CardTitle>{new Date(goal['due_date']).toLocaleDateString("en-UK")}</CardTitle>
            </GridCard>
            <GridCard>
              <h2>Assigned to</h2>
              <CardTitle>{contact && contact.name}</CardTitle>
            </GridCard>
            {/*<GridCard>*/}
            {/*  <h2>Status</h2>*/}
            {/*  {goal['isCompleted'] ? (*/}
            {/*    <CardTitle>Done</CardTitle>*/}
            {/*  ) : (*/}
            {/*    <CardTitle>Incomplete</CardTitle>*/}
            {/*  )}*/}
            {/*</GridCard>*/}
          </div>

          <Card>
            <CardTitle>Description</CardTitle>
            <p>Description: <span>{goal['description']}</span></p>
          </Card>
          <Card>
            <CardTitle>Outcome</CardTitle>
            <p>Outcome: <span>{goal['outcome']}</span></p>
          </Card>
        </>
      )}
    </AppLayout>
  )
}