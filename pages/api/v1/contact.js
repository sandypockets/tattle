import { supabase } from "../../../lib/supabaseClient";

async function getSingleContact(req, res) {
  const { ownerId, contactId } = req.query
  try {
    const { data, error, status } = await supabase
      .from('contacts')
      .select('name')
      .match({ owner_id: ownerId, id: contactId })
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
    //
  } else if (req.method === 'GET') {
    return getSingleContact(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}