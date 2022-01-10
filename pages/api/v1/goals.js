import { supabase } from "../../../lib/supabaseClient";

async function createGoal(req, res) {
  const {
    userId,
    goalTitle,
    goalDesc,
    goalOutcome,
    dueDate,
    selectedContactId,
    notificationMethod
  } = req.body

  if (goalTitle && dueDate && selectedContactId) {
    try {
      const { data, error, status } = await supabase
        .from('goals')
        .insert([{
          "title": goalTitle,
          "due_date": dueDate,
          "outcome": goalOutcome,
          "owner_id": userId,
          "contact_id": selectedContactId,
          "is_completed": false,
          "description": goalDesc,
          "notification_type": notificationMethod
        }])
      if (data) {
        console.log("Create new goal data: ", data)
        res.status(status).json(data)
      }
      if (error) {
        res.status(status).json(error)
      }
    } catch (error) {
      res.json(error)
    } finally {
      res.end()
    }
  } else {
    res.json('Error - No content')
  }
}

async function updateUserGoal(req, res) {
  const {
    userId,
    goalId,
    goalTitle,
    goalDesc,
    goalOutcome,
    dueDate,
    selectedContactId
  } = req.body

  try {
    const { data, error, status } = await supabase
      .from('goals')
      .update({
        "title": goalTitle,
        "description": goalDesc,
        "outcome": goalOutcome,
        "due_date": dueDate,
        "contact_id": selectedContactId
      })
      .match({ "id": goalId, "owner_id": userId })
    if (data) {
      res.status(status).json(data)
    }
    if (error) {
      res.status(status).json(error)
    }
  } catch (err) {
    console.error("Error!", err)
  } finally {
    res.end()
  }
}

async function getGoals(req, res) {
  const { ownerId } = req.query
  try {
    const { data, error, status } = await supabase
      .from('goals')
      .select()
      .eq('owner_id', ownerId)
    if (data) {
      res.status(status).json(data)
    }
    if (error) {
      res.status(status).json(error)
    }
  } catch (err) {
    res.json(err)
  } finally {
    res.end()
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    if (req.body.type === 'update') {
      return updateUserGoal(req, res)
    } else if (req.body.type === 'create') {
      return createGoal(req, res)
    }
  } else if (req.method === 'GET') {
    return getGoals(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}