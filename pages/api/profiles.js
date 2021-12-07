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
  console.log("Update profile fired")
  console.log("Req.body", req.body)
  const { id, username, email, website, avatar_url, stripeCustomerId } = req.body
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        // 'username': username,
        'email': email,
        // 'website': website,
        // 'avatar_url': avatar_url,
        'stripe_customer_id': stripeCustomerId
      })
      .match({ "id": id })
    if (data) {
      console.log("Update profile data", data)
      res.status(200).json(data)
      res.end()
    }
    if (error) {
      console.log(error)
      res.status(500).json(error)
      res.end()
    }
  } catch (error) {
    res.json(error.message)
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