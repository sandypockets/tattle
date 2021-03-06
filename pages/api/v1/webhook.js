import Stripe from "stripe";
import { buffer } from 'micro';
import { supabase } from "../../../lib/supabaseClient";

const webhookSecret = `${process.env.NEXT_PUBLIC_STRIPE_ENDPOINT_SECRET}`;
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function markAsSubscribed(payload) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ is_subscribed: true })
      .match({ stripe_customer_id: payload.customer })
    if (data) {
      console.log("markAsSubscribed", data)
    }
    if (error) {
      console.log("markAsSubscribed", error)
    }
  } catch (err) {
    console.log(err)
  }
}

async function handleWebhook(req, res, event) {
  const payload = event.data.object
  switch (payload.object) {
    case 'payment_intent':
      try {
        const { data, error, status } = await supabase
          .from('stripe_subscriptions')
          .insert({
            payment_intent_id: payload.id,
            data_type: payload.object,
            amount: payload.amount,
            amount_capturable: payload.amount_capturable,
            amount_received: payload.amount_received,
            capture_method: payload.capture_method,
            client_secret: payload.client_secret,
            confirmation_method: payload.confirmation_method,
            created: payload.created,
            currency: payload.currency,
            customer_id: payload.customer,
            description: payload.description,
            invoice_id: payload.invoice,
            livemode: payload.livemode,
            setup_future_usage: payload.setup_future_usage,
            statement_descriptor: payload.statement_descriptor,
            status: payload.status
          })
        if (data) {
          res.status(200).json(data)
        }
        if (error) {
          console.log(error)
          res.status(200).json(error)
        }
      } catch (err) {
        console.error(err)
      } finally {
        res.end()
      }
      if (payload.status === 'succeeded') {
        return markAsSubscribed(payload)
      }
      break;
    case 'charge':
      try {
        const { data, error, status } = await supabase
          .from('stripe_subscriptions')
          .insert({
            charge: payload.charge,
            data_type: payload.object,
            amount: payload.amount,
            amount_captured: payload.amount_captured,
            balance_transaction: payload.balance_transaction,
            captured: payload.captured,
            created: payload.created,
            currency: payload.currency,
            customer_id: payload.customer,
            description: payload.description,
            dispute: payload.dispute,
            disputed: payload.disputed,
            invoice_id: payload.invoice,
            livemode: payload.livemode,
            network_status: payload.outcome.network_status,
            risk_level: payload.outcome.risk_level,
            risk_score: payload.outcome.risk_score,
            seller_message: payload.outcome.seller_message,
            outcome_type: payload.outcome.type,
            paid: payload.paid,
            payment_intent_id: payload.payment_intent,
            payment_method_id: payload.payment_method,
            card_brand: payload.payment_method_details.card.brand,
            card_country: payload.payment_method_details.card.country,
            card_exp_month: payload.payment_method_details.card.exp_month,
            card_exp_year: payload.payment_method_details.card.exp_year,
            card_fingerprint: payload.payment_method_details.card.fingerprint,
            card_funding: payload.payment_method_details.card.funding,
            card_last_four: payload.payment_method_details.card.last4,
            card_network: payload.payment_method_details.card.network,
            card_three_d_secure: payload.payment_method_details.card.three_d_secure,
            card_wallete: payload.payment_method_details.card.wallet,
            receipt_url: payload.receipt_url,
            statement_descriptor: payload.statement_descriptor
          })
        if (data) {
          res.status(200).json(data)
        }
        if (error || status !== 200) {
          console.log("Error! ", error)
          res.status(200).json(error)
        }
      } catch (err) {
        console.error(err)
      } finally {
        res.end()
      }
      break;
    case 'subscription':
      if (payload.canceled_at !== null) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .update({ is_subscribed: false })
            .match({ stripe_customer_id: payload.customer })
          if (data) {
            console.log("Update profile successful.", data)
          }
          error && console.error(error)
        } catch (err) {
          console.error(err)
        }
      }

      try {
        const { data, error, status } = await supabase
          .from('stripe_subscriptions')
          .insert({
            subscription_id: payload.id,
            data_type: payload.object,
            billing_cycle_anchor: payload.billing_cycle_anchor,
            cancel_at: payload.cancel_at,
            cancel_at_period_end: payload.cancel_at_period_end,
            canceled_at: payload.canceled_at,
            collection_method: payload.collection_method,
            created: payload.created,
            current_period_end: payload.current_period_end,
            current_period_start: payload.current_period_start,
            customer_id: payload.customer,
            latest_invoice_id: payload.latest_invoice,
            livemode: payload.livemode,
            plan_price_id: payload.plan.id,
            plan_active: payload.plan.active,
            plan_amount: payload.plan.amount,
            plan_created: payload.plan.created,
            plan_interval: payload.plan.interval,
            plan_interval_count: payload.plan.interval_count,
            plan_product_id: payload.plan.product,
            start_date: payload.start_date,
            status: payload.status,
            trial_end: payload.trial_end,
            trial_start: payload.trial_start
          })
        if (data) {
          res.status(200).json(data)
        }
        if (error) {
          console.log(error)
          res.status(status).json(error)
        }
      } catch (err) {
        console.log("Webhook error: ", err)
      } finally {
        res.end()
      }
      break;
    case 'invoice':
      try {
        const { data, error, status } = await supabase
          .from('stripe_subscriptions')
          .insert({
            invoice_id: payload.invoice,
            data_type: payload.object,
            account_country: payload.account_country,
            account_name: payload.account_name,
            amount_due: payload.amount_due,
            amount_paid: payload.amount_paid,
            amount_remaining: payload.amount_remaining,
            attempt_count: payload.attempt_count,
            attempted: payload.attempted,
            auto_advance: payload.auto_advance,
            billing_reason: payload.billing_reason,
            charge: payload.charge,
            collection_method: payload.collection_method,
            created: payload.created,
            currency: payload.currency,
            customer_id: payload.customer,
            customer_email: payload.customer_email,
            hosted_invoice_url: payload.hosted_invoice_url,
            invoice_pdf: payload.invoice_pdf,
            livemode: payload.livemode,
            paid: payload.paid,
            number: payload.number,
            payment_intent_id: payload.payment_intent,
            status: payload.status,
            subscription_id: payload.subscription,
            subtotal: payload.subtotal,
            total: payload.total
          })
        if (data) {
          res.status(200).json(data)
        }
        if (error) {
          console.log(error)
          res.status(status).json(error)
        }
      } catch (err) {
        console.log("Webhook error: ", err)
      } finally {
        res.end()
      }
      break;
    case 'customer':
      if (req.body.type === 'customer.created') {
        try {
          const { data, error, status } = await supabase
            .from('profiles')
            .update({ stripe_customer_id: payload.id })
            .match({ email: payload.email })
          if (data) {
            res.status(200).json(data)
          }
          if (error) {
            console.log(error)
            res.status(status).json(error)
          }
        } catch (err) {
          console.log("Webhook error: ", err)
        } finally {
          res.end()
        }
      }
      break;
    default:
      res.status(200).end()
  }
}


async function checkSignature(req, res) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  console.log("Sig", sig)
  console.log("Secret", webhookSecret)
  console.log("Buffer", buf.toString())

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
    if (event) {
      console.log("Webhook signature verified.")
    }
  } catch (err) {
    res.status(400).send(`Webhook signature could not be verified.`);
    console.error("Webhook signature could not be verified: ", err.message)
    return;
  }
  return handleWebhook(req, res, event)
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    return checkSignature(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}