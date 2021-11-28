import axios from 'axios'

export default function getGoal(ownerId, id, setGoal){
  axios.get('/api/v1/goal', {
    params: { ownerId: ownerId, goalId: id }
  })
    .then(function (response) {
      console.log(response.data)
      setGoal(response.data[0])
    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}