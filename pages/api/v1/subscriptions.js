import {supabase} from "../../../lib/supabaseClient";

async function getSubscription(req, res) {
  const { ownerId } = req.query
  try {
    const { data, error, status } = await supabase
      .from('subscriptions')
      .select('plan_billing_frequency, plan_amount_cents')
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
    // handle post
  } else if (req.method === 'GET') {
    return getSubscription(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}