import { supabase } from "../../lib/supabaseClient";

async function getProfile(req, res) {
  const userId = req.query.id
  try {
    let { data, error, status } = await supabase
      .from('profiles')
      .select()
      .eq('id', userId)
      .single()
    if (error && status !== 406) {
      throw error
    }
    if (data) {
      res.status(200)
      res.json(data)
    }
  } catch (error) {
    console.error(error)
    res.json(error.message)
  } finally {
    res.end()
  }
}

async function updateProfile(req, res) {
  const { id, email, stripeCustomerId } = req.body
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        'email': email,
        'stripe_customer_id': stripeCustomerId
      })
      .match({ "id": id })
    if (data) {
      res.status(200).json(data)
    }
    if (error) {
      console.log(error)
      res.status(500).json(error)
    }
  } catch (error) {
    res.json(error.message)
  } finally {
    res.end()
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    return updateProfile(req, res)
  } else if (req.method === 'GET') {
    return getProfile(req, res)
  } else {
    res.send("Something's not right. Check your query.")
  }
}