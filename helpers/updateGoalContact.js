import axios from 'axios'

export default function updateGoalContact( userId, selectedContactId, selectedGoalId ){
  axios
    .post('/api/v1/goal', {
      'type': 'assign',
      'goalId': selectedGoalId,
      userId,
      "contactId": selectedContactId,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log("Update error", error);
    });
}