import { supabase } from "../../../lib/supabaseClient";

async function createGoal(req, res) {
  const id = req.body['user_id']
  const goalTitle = req.body['goal_title']
  const goalDesc = req.body['goal_description']
  const goalOutcome = req.body['goal_outcome']
  const dueDate = req.body['due_date']
  const contactId = req.body['selected_contact_id']
  if (goalTitle && dueDate && contactId) {
    try {
      const { data, error } = await supabase
        .from('goals')
        .insert([{
          "title": goalTitle,
          "due_date": dueDate,
          "outcome": goalOutcome,
          "owner_id": id,
          "contact_id": contactId,
          "is_completed": false,
          "description": goalDesc
        }])
      if (data) {
        console.log("Create new goal data: ", data)
        res.json(data)
        res.send(200)
      }
      if (error) {
        res.json(error)
        res.send(400)
      }
    } catch (error) {
      res.send(400)
      res.json(error)
    } finally {
      res.end()
    }
  } else {
    res.json('Error - No content')
    res.end()
  }
}

async function updateUserGoal(req, res) {
  const id = req.body['user_id']
  const goalId = req.body['goal_id']
  const goalTitle = req.body['goal_title']
  const goalDesc = req.body['goal_description']
  const goalOutcome = req.body['goal_outcome']
  const dueDate = req.body['due_date']
  const contactId = req.body['selected_contact_id']
  console.log("UPDATE goal: ", req.body)
  try {
    const { data, error } = await supabase
      .from('goals')
      .update({
        "title": goalTitle,
        "description": goalDesc,
        "outcome": goalOutcome,
        "due_date": dueDate,
        "contact_id": contactId
      })
      .match({ "id": goalId, "owner_id": id })
    if (data) {
      res.json(data)
      res.send(200)
    }
    if (error) {
      res.json(error)
      res.send(400)
    }
  } catch (err) {
    console.error("Error!", err)
  } finally {
    res.end()
  }
}

async function getGoals(req, res) {
  const ownerId = req.query['id']
  try {
    const { data, error, status } = await supabase
      .from('goals')
      .select()
      .eq('owner_id', ownerId)
    if (data) {
      res.json(data)
      res.send(200)
    }
    // if (error) {
    //   res.json(error)
    // }
  } catch (err) {
    res.json(err)
    res.send(400)
  } finally {
    res.end()
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    if (req.body.type === 'update') {
      updateUserGoal(req, res)
    } else if (req.body.type === 'create') {
      createGoal(req, res)
    }
  } else if (req.method === 'GET') {
    getGoals(req, res)
  } else {
    res.send("Something's not right. Check your query.")
  }
}