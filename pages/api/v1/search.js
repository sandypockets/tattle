import { supabase } from "../../../lib/supabaseClient";

async function getSearchResults(req, res) {
  const { query, ownerId } = req.query
  let outputData = {
    "goalData": [],
    "contactData": []
  }
  try {
    const { data, error, status } = await supabase
      .from('goals')
      .select()
      .ilike('title', `%${query}%`)
      .eq('owner_id', ownerId)
    if (data) {
      outputData = {
        ...outputData,
        goalData: data
      }
    }
    error && console.error("Search Error: ", error)
  } catch (err) {
    res.json(err)
  } finally {
    try {
      const { data, error, status } = await supabase
        .from('contacts')
        .select()
        .ilike('name', `%${query}%`)
        .eq('owner_id', ownerId)
      if (data) {
        outputData = {
          ...outputData,
          contactData: data
        }
      }
      error && console.error("Search Error: ", error)
    } catch (err) {
      console.error("Search Error: ", err)
    } finally {
      res.status(200).json(outputData)
    }
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