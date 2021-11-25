import axios from 'axios'

export default function createGoal(userId, goalTitle, goalDesc, goalOutcome, selectedDate, selectedContactId){
  axios
    .post('/api/v1/goals', {
      'type': 'create',
      userId,
      goalTitle,
      goalDesc,
      goalOutcome,
      'dueDate': selectedDate,
      selectedContactId
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}