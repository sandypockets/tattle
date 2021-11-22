import { supabase } from "../../../lib/supabaseClient";

async function createContact(req, res) {
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

export default function handler(req, res) {
  if (req.method === 'POST') {
    createContact(req, res)
  } else if (req.method === 'GET') {
    //
  } else {
    res.send("Something's not right. Check your query.")
  }
}