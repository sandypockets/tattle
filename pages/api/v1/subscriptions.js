import { supabase } from "../../../lib/supabaseClient";

async function getSubscription(req, res) {
  const { ownerId } = req.query
  try {
    const { data, error, status } = await supabase
      .from('stripe')
      .select('billing_frequency, amount_cents, created_at')
      .match({user_id: ownerId, payment_successful: true})
    if (data) {
      for (const item in data) {
        const dateString = data[item]['created_at']
        data[item]['created_at'] = new Date(dateString).getTime()
      }

      console.log("data", data)

      // Sort newest to oldest
      data.sort(
        function(a, b) {
          if (a['created_at'] > b['created_at']) {
            return -1
          } else if (a['created_at'] < b['created_at']) {
            return 1
          }
          if (a['id'] > b['id']) {
            return -1
          } else if (a['id'] < b['id']) {
            return 1
          }
        }
      ).reverse()

      console.log("sorted data", data)

      res.status(status).json(data[0])
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