const stripeApiKey = process.env.NEXT_STRIPE_SECRET_KEY
const stripe = require('stripe')(`${stripeApiKey}`);

async function createPortalSession(req, res) {
  const { currentUser, customerId } = req.body
  if (currentUser?.id) {
    const session = await stripe.billingPortal.sessions.create({
      customer: `${customerId}`,
      return_url: 'https://kobe.ngrok.io/app/settings',
    });
    res.json(session.url)
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    return createPortalSession(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}