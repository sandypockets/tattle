const stripeApiKey = process.env.NEXT_STRIPE_SECRET_KEY;
const stripeTestEmail = process.env.NEXT_STRIPE_TEST_RECEIPT_EMAIL_ADDRESS;

async function createStripeSubscription() {
  // Do stuff
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    // create stripe subscription
  } else if (req.method === 'GET') {

  } else {
    res.send("Something's not right. Check your query.").end()
  }
}