import axios from 'axios'

export default function getTattleStats(ownerId, setUserStats){
  axios.get('/api/v1/stats', {
    params: { ownerId: ownerId }
  })
    .then(function (response) {
      console.log("FUNC STATS: ", response.data)
      setUserStats(prev => ({ ...prev, "statThree": response.data }))
    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}