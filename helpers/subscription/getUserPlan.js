import axios from 'axios'

export default function getUserPlan(ownerId, setHasSubscription){
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