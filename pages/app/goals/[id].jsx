import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AppLayout from "../../../components/App/Layout/AppLayout";
import getGoal from "../../../helpers/getGoal";
import {supabase} from "../../../lib/supabaseClient";

export default function SingleGoal() {
  const [goal, setGoal] = useState()
  const router = useRouter()

  useEffect(() => {
    const user = supabase.auth.user()
    const { id } = router.query
    console.log("goalId", id)
    getGoal(user.id, id, setGoal)
  }, [])


  return (
    <AppLayout>
      <p>Time remaining until due date</p>
      {goal && (
        <div>
          <p>ID: <span>{goal['id']}</span></p>
          <p>Contact ID: <span>{goal['contact_id']}</span></p>
          <p>Created At: <span>{goal['created_at']}</span></p>
          <p>Description: <span>{goal['description']}</span></p>
          <p>Is completed: <span>{goal['is_completed'] ? "true" : "false"}</span></p>
          <p>Outcome: <span>{goal['outcome']}</span></p>
          <p>Owner ID: <span>{goal['owner_id']}</span></p>
          <p>Title: <span>{goal['title']}</span></p>
        </div>
      )}
    </AppLayout>
  )
}