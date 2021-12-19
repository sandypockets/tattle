// import axios from 'axios'
//
// export default function updateGoal( userId, selectedContactId, selectedGoalId, goalTitle, goalDesc, goalOutcome, selectedDate ){
//   axios
//     .post('/api/v1/goals', {
//       'type': 'update',
//       'goalId': selectedGoalId,
//       userId,
//       goalTitle,
//       goalDesc,
//       goalOutcome,
//       'dueDate': selectedDate,
//       selectedContactId,
//     })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log("Update error", error);
//     });
// }