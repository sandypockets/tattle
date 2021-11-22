import axios from 'axios'

export default function createGoal(userId, goalTitle, goalDesc, goalOutcome, selectedDate, selectedContactId){
  axios
    .post('/api/v1/goals', {
      'user_id': userId,
      'goal_title': goalTitle,
      'goal_description': goalDesc,

    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}