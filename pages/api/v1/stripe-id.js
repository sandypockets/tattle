import { supabase } from "../../../lib/supabaseClient";

async function getStripeId(req, res) {
  const userId = req.query.id
  try {
    let { data, error, status } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single()
    if (error && status !== 406) {
      throw error
    }
    if (data) {
      res.status(200).json(data)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json(error.message)
  } finally {
    res.end()
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    //
  } else if (req.method === 'GET') {
    return getStripeId(req, res)
  } else {
    res.send("Something's not right. Check your query.")
  }
}