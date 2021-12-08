import axios from "axios";

export default function getStripeCustomerId(userId, setStripeCustomerId) {
  axios
    .get('/api/v1/stripe-id', {
      params: { id: userId }
    })
    .then(function (response) {
      setStripeCustomerId(response.data['stripe_customer_id'])
    })
    .catch(function (error) {
      console.log(error);
    })
}