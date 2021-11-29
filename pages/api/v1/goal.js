import { supabase } from "../../../lib/supabaseClient";

async function getSingleGoal(req, res) {
  const { ownerId, goalId } = req.query
  try {
    const { data, error, status } = await supabase
      .from('goals')
      .select()
      .match({ owner_id: ownerId, id: goalId })
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

async function markGoalComplete(req, res) {
  const { userId, goalId, isCompletedOnTime } = req.body
  try {
    const { data, status, error } = await supabase
      .from('goals')
      .update({
        is_completed: true,
        is_completed_on_time: isCompletedOnTime
      })
      .match({ id: goalId, owner_id: userId })
    data && status && res.status(status).json(data)
    error && status && res.status(status).json(error)
  } catch (err) {
    res.json(err)
  } finally {
    res.end()
  }
}

async function assignContactToGoal(req, res) {
  const { userId, goalId, contactId } = req.body
  try {
    const { data, status, error } = await supabase
      .from('goals')
      .update({
        contact_id: contactId,
      })
      .match({ id: goalId, owner_id: userId })
    data && status && res.status(status).json(data)
    error && status && res.status(status).json(error)
  } catch (err) {
    res.json(err)
  } finally {
    res.end()
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    if (req.body.type === 'complete') {
      return markGoalComplete(req, res)
    }
    if (req.body.type === 'assign') {
      return assignContactToGoal(req, res)
    }
  } else if (req.method === 'GET') {
    return getSingleGoal(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}