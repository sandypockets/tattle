import { supabase } from "../../../lib/supabaseClient";

async function updateProfileEmail(req, res) {
  const { userId, email } = req.body
  try {
    const { data, error, status } = await supabase
      .from('profiles')
      .update({
        email: email,
      })
      .match({"id": userId})
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

async function getCustomerId(req, res) {
  const { id } = req.query
  try {
    const { data, error, status } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', id)
    data && res.status(200).json(data)
    error && res.status(status).json(error)
  } catch (err) {
    res.json(err)
  } finally {
    res.end()
  }
}

async function createCustomerId(req, res) {
  const { id, stripeCustomerId } = req.body
  try {
    const { data, error, status } = await supabase
      .from('profiles')
      .update({ stripe_customer_id: stripeCustomerId })
      .match({ id: id })
    data && res.status(status).json(data)
    error && res.status(status).json(error)
    data && console.log("DATA: ", data)
    error && console.log("error: ", error)
  } catch (err) {
    res.json(err)
  } finally {
    res.end()
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    if (req.body.type === 'update' && req.body.content === 'email ') {
      return updateProfileEmail(req, res)
    } else if (req.body.type === 'update' && req.body.content === 'stripeId') {
      return createCustomerId(req, res)
    }
  } else if (req.method === 'GET') {
    return getCustomerId(req, res)
  } else {
    res.send("Something's not right. Check your query.")
  }
}