import {supabase} from "../../../lib/supabaseClient";

async function getBills(req, res) {
  const { ownerId } = req.query
  try {
    const { data, error, status } = await supabase
      .from('payments')
      .select('id, type, created_at, amount_cents')
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

  } else if (req.method === 'GET') {
    return getBills(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}