import axios from 'axios'

export function getUserPlan(ownerId, setHasSubscription){
  axios.get('/api/v1/auth/plan', {
    params: { ownerId: ownerId }
  })
    .then(function (response) {
      setHasSubscription(response.data['is_subscribed'])
    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}

export function getTattleStats(ownerId, setUserStats){
  axios.get('/api/v1/stats', {
    params: { ownerId: ownerId }
  })
    .then(function (response) {
      setUserStats(prev => ({ ...prev, "statThree": response.data }))
    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}

export function getSubscriptionData(customerId, setSubscriptionData){
  axios.get('/api/v1/subscriptions', {
    params: { customerId: customerId }
  })
    .then(function (response) {
      setSubscriptionData(response.data)
    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}

export function getSubscriptionByEmail(email, setSubscriptionData){
  axios
    .post('/api/v1/subscriptions', {
      "type": "getByEmail",
      "customerEmail": email,
    })
    .then(function (response) {
      console.log("getSubscriptionByEmail: ", response.data);
      setSubscriptionData(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
}

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
export function cancelSubscription(subscriptionId, userId){
  cancelStripeSubscription(subscriptionId, userId)
  cancelTattleSubscription(subscriptionId, userId)
}

export function getStripeCustomerId(userId, setStripeCustomerId) {
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