import { supabase } from "../../../lib/supabaseClient";

async function getSubscription(req, res) {
  const { ownerId } = req.query
  try {
    const { data, error, status } = await supabase
      .from('stripe')
      .select('id, subscription_type, created_at, amount_cents, stripe_receipt_url, billing_frequency, card_last_four, card_type')
      .match({user_id: ownerId, payment_successful: true})
    if (data) {
      console.log("data", data)
      let dataArr = []
      // Should be sorted first
      dataArr.push(data[0])
      res.status(status).json(dataArr)
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