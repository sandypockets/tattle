import { supabase } from "../../../lib/supabaseClient";

// async function createSubscription(argData, req, res) {
//   try {
//     const { data, error } = await supabase
//       .from('subscriptions')
//       .insert({
//         owner_id: argData[0]['user_id'],
//         plan_amount_cents: argData[0]['amount_cents'],
//         stripe_id: argData[0]['stripe_id'],
//         amount_cents_captured: argData[0]['amount_cents_captured'],
//         balance_transaction: argData[0]['balance_transaction'],
//         city: argData[0]['city'],
//         country: argData[0]['country'],
//       })
//     if (data) {
//       console.log("Create subscription successful.")
//     }
//     if (error) {
//       console.log("Error creating subscription: ", error)
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }

async function markAsPaid(req, res) {
  const payload = req.body.data.object
  switch (payload.object) {
    case 'payment_intent':
      if (payload.status === 'succeeded') {
        const paymentId = payload.id
        const amountCents = payload.amount
        try {
          const { data, error, status } = await supabase
            .from('stripe')
            .update({
              payment_successful: true,
              amount_cents: amountCents,
              live_mode: payload.livemode,
            })
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
      }
      break;
    case 'charge':
      try {
        const { data, error, status } = await supabase
          .from('stripe')
          .update({
            payment_successful: true,
            stripe_id: payload.id,
            amount_cents: payload.amount,
            live_mode: payload.livemode,
            amount_cents_captured: payload.amount_captured,
            amount_refunded: payload.amount_refunded,
            balance_transaction: payload.balance_transaction,
            city: payload.billing_details.address.city,
            country: payload.billing_details.address.country,
            postal_code: payload.billing_details.address.postal_code,
            calculated_statement_descriptor: payload.calculated_statement_descriptor,
            is_captured: payload.captured,
            currency: payload.currency,
            network_status: payload.outcome.network_status,
            risk_level: payload.outcome.risk_level,
            risk_score: payload.outcome.risk_score,
            seller_message: payload.outcome.seller_message,
            stripe_payment_intent_id: payload.payment_intent,
            payment_method: payload.payment_method,
            card_type: payload.payment_method_details.card.brand,
            card_postal_code_check: payload.payment_method_details.card.checks.address_postal_code_check,
            card_cvc_check: payload.payment_method_details.card.checks.cvc_check,
            card_last_four: payload.payment_method_details.card.last4,
            stripe_receipt_url: payload.receipt_url
          })
          .match({ stripe_payment_intent_id: payload.payment_intent })
        if (data) {
          // await createSubscription(data, req, res)
          res.status(200).json(data)
        }
        if (error || status !== 200) {
          console.log("Error! ", error)
          console.log("No records found.")
          res.status(200).json(error)
        }
      } catch (err) {
        console.error(err)
      } finally {
        res.end()
      }
      break;
    case 'subscription':
      console.log("SUBSCRIPTION: ", payload)
      try {
        // const { data, error, status } = await supabase
        //   .from('')
        //   .update({
        //     subscription_id: req.body.data.id,
        //     billing_cycle_anchor: payload['billing_cycle_anchor'],
        //     cancel_at: payload['cancel_at'],
        //     cancel_at_period_end: payload['cancel_at_period_end'],
        //     canceled_at: payload['canceled_at'],
        //     collection_method: 'charge_automatically',
        //     stripe_created_at: payload['created_at'],
        //     stripe_current_period_end: payload['current_period_end'],
        //     stripe_current_period_start: payload['current_period_start'],
        //     stripe_customer: payload['customer'],
        //     latest_invoice_id: payload['latest_invoice'],
        //     livemode: payload['livemode'],
        //     start_date: payload['start_date'],
        //     status: payload['status'],
        //     trial_end: payload['trial_end'],
        //     trial_start: payload['trial_start']
        //   })
        //   .match({ stripe_payment_intent_id: payload.payment_intent })

      } catch (err) {
        console.log("Webhook error: ", err)
      }
      break;
    case 'invoice':
      console.log("INVOICE: ", payload)
      break;
    default:
      res.status(200).end()
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    // console.log("WEBHOOK REQ.BODY: ", req.body)
    return markAsPaid(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}