import Stripe from 'stripe';

const stripeApiKey = process.env.NEXT_STRIPE_SECRET_KEY;
const stripeTestEmail = process.env.NEXT_STRIPE_TEST_RECEIPT_EMAIL_ADDRESS;
const stripe = new Stripe(stripeApiKey);

async function createStripeSubscription() {
  const customer = await stripe.customers.create({
    email: stripeTestEmail,
  });
  console.log("Stripe Customer ID: ", customer.id);
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    // create stripe subscription
  } else if (req.method === 'GET') {

  } else {
    res.send("Something's not right. Check your query.").end()
  }
}