import {supabase} from "../../../lib/supabaseClient";

async function getSearchResults(req, res) {
  const { query, ownerId } = req.query
  try {
    const { data, error, status } = await supabase
      .from('goals')
      .select()
      .ilike('title', `%${query}%`)
      .eq('owner_id', ownerId)
    if (data) {
      console.log("SearchData: ", data)
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
    return getSearchResults(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}