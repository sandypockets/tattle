import axios from 'axios'

export default function getSubscriptionData(ownerId, setSubscriptionData){
  axios.get('/api/v1/subscriptions', {
    params: { ownerId: ownerId }
  })
    .then(function (response) {
      console.log(response.data)
      setSubscriptionData(response.data[0])
    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}