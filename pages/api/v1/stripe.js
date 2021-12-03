// import stripe from 'stripe'
// // const stripe = require('stripe');
// const endpointSecret = process.env.NEXT_STRIPE_ENDPOINT_SECRET;
//
// // Receives webhooks from Stripe
// // These webhooks will be used to update the database when Stripe changes
//
// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     const sig = req.rawHeaders[13];
//     console.log("SIG: ", sig)
//     const payload = req.body.data.object
//     // console.log("req.body.data.object: ", req.body.data.object)
//
//     let event;
//     try {
//       event = stripe.webhooks.constructEvent(req.headers, sig, endpointSecret)
//     } catch (err) {
//       console.log("Webhook error: ", err)
//       res.status(400).send(`Webhook Error: ${err.message}`);
//     }
//
//     // A temporary fix
//     if (payload.object === 'charge') {
//       console.log("A charge event!")
//       // console.log("Payload: ", payload)
//     }
//     if (payload.object === 'payment_intent') {
//       console.log("payment intent event!")
//       // console.log("Payload: ", payload)
//     }
//
//
//     // Return a 200 response to acknowledge receipt of the event
//     res.status(200);
//   } else if (req.method === 'GET') {
//
//   } else {
//     res.send("Something's not right. Check your query.").end()
//   }
// }