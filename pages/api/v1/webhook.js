import { supabase } from "../../../lib/supabaseClient";

async function createSubscription(argData, req, res) {
  try {
    const { data, error, status } = await supabase
      .from('subscriptions')
      .insert({
        owner_id: argData[0]['user_id'],
        plan_amount_cents: argData[0]['amount_cents'],
        stripe_id: argData[0]['stripe_id'],
        amount_cents_captured: argData[0]['amount_cents_captured'],
        balance_transaction: argData[0]['balance_transaction'],
        city: argData[0]['city'],
        country: argData[0]['country'],
      })
      // .match({ stripe_payment_intent_id: argData[0]['stripe_payment_intent_id'] })
    if (data) {
      // res.status(200).json(data)
      console.log("Create subscription successful.")
    }
    if (error) {
      console.log("Error creating subscription: ", error)
      // res.status(200).json(error)
    }
  } catch (err) {
    console.log(err)
  }
}

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
          // console.log("DATA!!!! ", data)
          await createSubscription(data, req, res)
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
    default:
      res.status(400).end()
  }

  // if (payload.object === 'payment_intent' && payload.status === 'succeeded') {
  //   console.log("Webhook type: ", payload)
  //   const paymentId = payload.id
  //   const amountCents = payload.amount
  //   // const clientSecret = payload.client_secret
  //   try {
  //     const { data, error, status } = await supabase
  //       .from('stripe')
  //       .update({
  //         payment_successful: true,
  //         amount_cents: amountCents,
  //         live_mode: payload.livemode,
  //       })
  //       .match({ stripe_payment_intent_id: paymentId })
  //     if (data) {
  //       res.status(200).json(data)
  //     }
  //     if (error || status !== 200) {
  //       console.log("No records found.")
  //       res.status(200).json(error)
  //     }
  //   } catch (err) {
  //     console.error(err)
  //   } finally {
  //     res.end()
  //   }
  // }

  // if (payload.object === 'charge') {
  //   // console.log("CHARGE PAYLOAD: ", payload)
  //   // console.log("CHARGE FIRED!")
  //   try {
  //     const { data, error, status } = await supabase
  //       .from('stripe')
  //       .update({
  //         payment_successful: true,
  //         stripe_id: payload.id,
  //         amount_cents: payload.amount,
  //         live_mode: payload.livemode,
  //         amount_cents_captured: payload.amount_captured,
  //         amount_refunded: payload.amount_refunded,
  //         balance_transaction: payload.balance_transaction,
  //         city: payload.billing_details.address.city,
  //         country: payload.billing_details.address.country,
  //         postal_code: payload.billing_details.address.postal_code,
  //         calculated_statement_descriptor: payload.calculated_statement_descriptor,
  //         is_captured: payload.captured,
  //         currency: payload.currency,
  //         network_status: payload.outcome.network_status,
  //         risk_level: payload.outcome.risk_level,
  //         risk_score: payload.outcome.risk_score,
  //         seller_message: payload.outcome.seller_message,
  //         stripe_payment_intent_id: payload.payment_intent,
  //         payment_method: payload.payment_method,
  //         card_type: payload.payment_method_details.card.brand,
  //         card_postal_code_check: payload.payment_method_details.card.checks.address_postal_code_check,
  //         card_cvc_check: payload.payment_method_details.card.checks.cvc_check,
  //         card_last_four: payload.payment_method_details.card.last4,
  //         stripe_receipt_url: payload.receipt_url
  //       })
  //       .match({ stripe_payment_intent_id: payload.payment_intent })
  //     if (data) {
  //       res.status(200).json(data)
  //     }
  //     if (error || status !== 200) {
  //       console.log("Error! ", error)
  //       console.log("No records found.")
  //       res.status(200).json(error)
  //     }
  //   } catch (err) {
  //     console.error(err)
  //   } finally {
  //     res.end()
  //   }
  // } else {
  //   res.status(400).end()
  // }
  // Create row in subscriptions table
  // try {
  //
  // } catch (err) {
  //
  // }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    return markAsPaid(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}