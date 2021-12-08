import axios from 'axios'

export default function markAsDone(userId, goalId, isCompletedOnTime){
  axios
    .post('/api/v1/goal', {
      'type': 'complete',
      userId,
      goalId,
      isCompletedOnTime
    })
    .then(function (response) {
      console.log("mark as complete: ", response);
    })
    .catch(function (error) {
      console.log(error);
    });
}