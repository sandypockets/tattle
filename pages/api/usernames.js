import { supabase } from "../../lib/supabaseClient";

async function getUsername(req, res) {
  const userId = req.query.id
  try {
    let { data, error, status } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', userId)
      .single()
    if (error && status !== 406) {
      throw error
    }
    if (data) {
      res.status(200).json({ data })
    }
  } catch (error) {
    console.log(error)
    res.send(error.message)
  }
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    getUsername(req, res)
  } else {
    res.send("Something's not right. Check your query.")
  }
}