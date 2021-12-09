import { supabase } from "../../../lib/supabaseClient";

async function getSubscription(req, res) {
  const { customerId } = req.query
  let dataObject = {}
  try {
    const { data, error } = await supabase
      .from('stripe_subscriptions')
      .select('id, created_at, total, customer_email, hosted_invoice_url, invoice_pdf, subscription_id')
      .match({data_type: 'invoice', customer_id: customerId, status: 'paid'})
      .order('id', { ascending: false })
      .limit(1)
    if (data) {
      dataObject = {
        "invoice": data[0]
      }
      try {
        const { data, error } = await supabase
          .from('stripe_subscriptions')
          .select('id, created_at, card_brand, card_exp_month, card_exp_year, card_last_four')
          .match({data_type: 'charge', customer_id: customerId, paid: true})
          .order('id', { ascending: false })
          .limit(1)
        if (data) {
          dataObject = {
            ...dataObject,
            "charge": data[0]
          }
          error && console.log(error)
          res.status(200).json(dataObject)
        }
      } catch (err) {
        console.log(err)
      }
    }
    if (error) {
      console.log(error)
      res.status(500).json(error)
    }
  } catch (err) {
    res.json(err)
  } finally {
    res.end()
  }
}

async function getSubscriptionByEmail(req, res) {
  const { customerEmail } = req.body
  let dataObject = {}
  try {
    const { data, error } = await supabase
      .from('stripe_subscriptions')
      .select('id, created_at, total, customer_email, hosted_invoice_url, invoice_pdf, subscription_id, customer_id')
      .match({data_type: 'invoice', customer_email: customerEmail, status: 'paid'})
      .order('id', { ascending: false })
      .limit(1)
    if (data) {
      console.log("DATA! ", data)
      dataObject = {
        "invoice": data[0]
      }
      try {
        const { data, error } = await supabase
          .from('stripe_subscriptions')
          .select('id, created_at, card_brand, card_exp_month, card_exp_year, card_last_four')
          .match({data_type: 'charge', customer_id: dataObject['invoice']['customer_id'], paid: true})
          .order('id', { ascending: false })
          .limit(1)
        if (data) {
          dataObject = {
            ...dataObject,
            "charge": data[0]
          }
          error && console.log(error)
          res.status(200).json(dataObject)
        }
      } catch (err) {
        console.log(err)
      }
    }
    if (error) {
      console.log(error)
      res.status(500).json(error)
    }
  } catch (err) {
    res.json(err)
  } finally {
    res.end()
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    return getSubscriptionByEmail(req, res)
  } else if (req.method === 'GET') {
    return getSubscription(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}