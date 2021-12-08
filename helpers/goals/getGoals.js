import axios from 'axios'

export default function getGoals(id, setGoals){
  axios.get('/api/v1/goals', {
    params: { ownerId: id }
  })
    .then(function (response) {
      setGoals(response.data)

    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}