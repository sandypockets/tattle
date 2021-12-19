// function createCustomer() {
//   let billingEmail = document.querySelector('#email').value;
//   return fetch('/create-customer', {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       email: billingEmail,
//     }),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((result) => {
//       // result.customer.id is used to map back to the customer object
//       return result;
//     });
// }
//
// // Set your publishable key: remember to change this to your live publishable key in production
// // See your keys here: https://dashboard.stripe.com/apikeys
// let stripe = Stripe('pk_test_51IkyECLSQuRsBVHwF7qm2tCexmpVUdG2fMphLozNAwUelsH4aklQqXVOu8HjkJjq0dWcALrjPfnAQerGxlEpQI8000E8OwzIHi');
// let elements = stripe.elements();