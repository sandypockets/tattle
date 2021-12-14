const stripeApiKey = process.env.NEXT_STRIPE_SECRET_KEY
const stripe = require("stripe")(stripeApiKey);

async function createStripeCustomer(req, res) {
  const customer = await stripe.customers.create({
    email: req.body.email,
  });
  console.log("DEBUG 8: ", customer)
  res.status(200).json(customer)
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    return createStripeCustomer(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}