import axios from 'axios'

export default function getUserPlan(ownerId, setHasSubscription, setLoading){
  axios.get('/api/v1/auth/plan', {
    params: { ownerId: ownerId }
  })
    .then(function (response) {
      console.log("GET USER PLAN: ", response.data)
      setHasSubscription(response.data[0]['is_subscribed'])
      setLoading(false)
    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}