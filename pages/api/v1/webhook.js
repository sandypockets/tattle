import { supabase } from "../../../lib/supabaseClient";

async function markAsPaid(req, res) {
  const payload = req.body.data.object
  // console.log(payload.client_secret)
  // console.log("WEBHOOK PAYLOAD: ", payload)

  if (payload.object === 'payment_intent' && payload.status === 'succeeded') {
    console.log("Webhook type: ", payload.object)
    const paymentId = payload.id
    const amountCents = payload.amount
    // const clientSecret = payload.client_secret
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

  if (payload.object === 'charge') {
    console.log("CHARGE PAYLOAD: ", payload)
    console.log("CHARGE FIRED!")
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
          stripe_created_at: payload.created,
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