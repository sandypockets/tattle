// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripeSecretKey = process.env.NEXT_STRIPE_SECRET_KEY
const stripe = require('stripe')(stripeSecretKey);

async function createStripeSubscription(req, res) {
  const { stripeCustomerId } = req.body
  const subscription = await stripe.subscriptions.create({
    customer: stripeCustomerId,
    items: [
      {price: 'price_1K252ULSQuRsBVHwBmVYETzD'},
    ],
  });
}


// async function createSubscription(req, res) {
//   try {
//     await stripe.paymentMethods.attach(req.body.paymentMethodId, {
//       customer: req.body.customerId,
//     });
//   } catch (error) {
//     return res.status('402').send({ error: { message: error.message } });
//   }
//
//   await stripe.customers.update(
//     req.body.customerId,
//     {
//       invoice_settings: {
//         default_payment_method: req.body.paymentMethodId,
//       },
//     }
//   );
//
//   const subscription = await stripe.subscriptions.create({
//     customer: req.body.customerId,
//     items: [{ price: 'price_HGd7M3DV3IMXkC' }],
//     expand: ['latest_invoice.payment_intent'],
//   });
//   res.send(subscription);
// }

export default function handler(req, res) {
  if (req.method === 'POST') {
    return createStripeSubscription(req, res)


  } else {
    res.send("Something's not right. Check your query.").end()
  }
}