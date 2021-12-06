import axios from 'axios'

export default function getSubscriptionData(ownerId, setSubscriptionData){
  axios.get('/api/v1/subscriptions', {
    params: { ownerId: ownerId }
  })
    .then(function (response) {
      setSubscriptionData(response.data)
    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}