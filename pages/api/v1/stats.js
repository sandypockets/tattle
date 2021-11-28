import { supabase } from "../../../lib/supabaseClient";

async function getTattleCount(req, res) {
  const { ownerId } = req.query
  try {
    const { error, status, count } = await supabase
      .from('tattles')
      .select('*', { head: true, count: 'exact' })
      .match({ owner_id: ownerId })
    if (count) {
      res.status(status).json(count)
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
    //
  } else if (req.method === 'GET') {
    return getTattleCount(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}