import { supabase } from "../../../lib/supabaseClient";

async function markAsPaid(req, res) {
  const payload = req.body.data.object
  console.log(payload.client_secret)
  console.log("WEBHOOK PAYLOAD: ", payload)
  if (payload.object === 'payment_intent' && payload.status === 'succeeded') {
    console.log("Webhook type: ", payload.object)
    const paymentId = payload.id
    // const clientSecret = payload.client_secret
    try {
      const { data, error, status } = await supabase
        .from('stripe')
        .update({ payment_successful: true })
        .match({ stripe_payment_intent_id: paymentId })
      if (data) {
        res.status(200).json(data)
      }
      if (error || status !== 200) {
        console.log("No records found.")
        res.status(200).json(error)
      }
    } catch (err) {
      console.error(err)
    } finally {
      res.end()
    }
  } else {
    res.status(400).end()
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    return markAsPaid(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}