import { supabase } from "../../../lib/supabaseClient";

async function getTattleCount(req, res) {
  const { ownerId } = req.query
  try {
    const { count } = await supabase
      .from('tattles')
      .select('*', { head: true, count: 'exact' })
      .match({ owner_id: ownerId })
    res.status(200).json(count)
  } catch (err) {
    res.json(err)
  } finally {
    res.end()
  }
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    return getTattleCount(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}