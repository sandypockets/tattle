import axios from 'axios'

export default function getGoals(id, setGoals){
  axios.get('/api/v1/goals', {
    params: { id: id }
  })
    .then(function (response) {
      console.log(response.data)
      setGoals(response.data)
    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}