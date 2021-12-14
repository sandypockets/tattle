import axios from 'axios'

function cancelStripeSubscription(subscriptionId, userId) {
  axios
    .post('/api/v1/subscriptions', {
      "type": "cancelStripe",
      "subscriptionId": subscriptionId,
      "userId": userId
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function cancelTattleSubscription(subscriptionId, userId) {
  axios
    .post('/api/v1/subscriptions', {
      "type": "cancelTattle",
      "subscriptionId": subscriptionId,
      "userId": userId
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default function cancelSubscription(subscriptionId, userId){
  cancelStripeSubscription(subscriptionId, userId)
  cancelTattleSubscription(subscriptionId, userId)
}