import { supabase } from "../../../lib/supabaseClient";
const stripeSecretKey = process.env.NEXT_STRIPE_SECRET_KEY
const stripe = require('stripe')(`${stripeSecretKey}`);

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

async function cancelStripeSubscription(req, res) {
  const { subscriptionId, userId } = req.body
  const deleted = await stripe.subscriptions.del(
    `${subscriptionId}`
  );
  if (deleted) {
    res.status(200).json(deleted)
  }
}

// async function cancelStripeSubscription(req, res) {
//   const { subscriptionId, userId } = req.body
//   let responseData = {
//     "profilesResponse": [],
//     "subscriptionsResponse": []
//   }
//   const deleted = await stripe.subscriptions.del(
//     `${subscriptionId}`
//   );
//   if (deleted) {
//     try {
//       const { data, error } = await supabase
//         .from('profiles')
//         .update({ is_subscribed: false })
//         .match({ id: userId })
//       if (data) {
//         responseData = {
//           "profilesResponse": data,
//           ...responseData
//         }
//       }
//       error && res.status(500).json(error)
//     } catch (err) {
//       console.error(err)
//     } finally {
//       try {
//         const { data, error } = await supabase
//           .from('stripe_subscriptions')
//           .insert({
//             data_type: 'subscription',
//             billing_cycle_anchor: deleted.billing_cycle_anchor,
//             cancel_at_period_end: deleted.cancel_at_period_end,
//             canceled_at: deleted.canceled_at,
//             collection_method: deleted.collection_method,
//             current_period_end: deleted.current_period_end,
//             current_period_start: deleted.current_period_start,
//             customer_id: deleted.customer,
//             latest_invoice_id: deleted.latest_invoice,
//             livemode: deleted.livemode,
//             plan_price_id: deleted?.plan.id,
//             status: deleted.status
//           })
//         data &&
//       } catch (err) {
//
//       } finally {
//         res.status(200).json(responseData)
//       }
//     }
//   } else {
//     console.error("Deleted: false")
//   }
// }


export default function handler(req, res) {
  if (req.method === 'POST') {
    if (req.body.type === 'getByEmail') {
      return getSubscriptionByEmail(req, res)
    }
    if (req.body.type === 'cancelStripe') {
      console.log("CancelStripe")
      return cancelStripeSubscription(req, res)
    }
    if (req.body.type === 'cancelTattle') {
      console.log("CancelTattle")
      // return cancelStripeSubscription(req, res)
    }
  } else if (req.method === 'GET') {
    return getSubscription(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}