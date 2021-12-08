import axios from 'axios'

export default function getSubscriptionData(customerId, setSubscriptionData){
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