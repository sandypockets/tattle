const stripeSecretKey = process.env.NEXT_STRIPE_SECRET_KEY
const stripe = require('stripe')(`${stripeSecretKey}`);

async function createStripeSubscription(req, res) {
  const {stripeCustomerId, items } = req.body
  try {
    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: items,
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
    res.send({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    return createStripeSubscription(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}