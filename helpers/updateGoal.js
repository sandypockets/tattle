import axios from 'axios'

export default function updateGoal( userId, selectedContactId, selectedGoalId, goalTitle, goalDesc, goalOutcome, selectedDate ){
  axios
    .post('/api/v1/goals', {
      'type': 'update',
      'goal_id': selectedGoalId,
      'user_id': userId,
      'goal_title': goalTitle,
      'goal_description': goalDesc,
      'goal_outcome': goalOutcome,
      'due_date': selectedDate,
      'selected_contact_id': selectedContactId,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log("Update error", error);
    });
}