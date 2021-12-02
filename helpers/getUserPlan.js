import axios from 'axios'

export default function getUserPlan(ownerId, setHasSubscription){
  axios.get('/api/v1/auth/plan', {
    params: { ownerId: ownerId }
  })
    .then(function (response) {
      console.log(response.data[0]['is_subscribed'])
      setHasSubscription(response.data[0]['is_subscribed'])
    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}