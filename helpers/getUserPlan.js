import axios from 'axios'

export default function getUserPlan(ownerId, setHasSubscription, setLoading){
  axios.get('/api/v1/auth/plan', {
    params: { ownerId: ownerId }
  })
    .then(function (response) {
      setHasSubscription(response.data[0]['is_subscribed'])
      setLoading(false)
    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}