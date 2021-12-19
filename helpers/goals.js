import axios from 'axios'

export function getGoals(id, setGoals){
  axios.get('/api/v1/goals', {
    params: { ownerId: id }
  })
    .then(function (response) {
      console.log("Get Goals: ", response.data)
      setGoals(response.data)

    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}

export function getGoal(ownerId, id, setGoal){
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

export function createGoal(userId, goalTitle, goalDesc, goalOutcome, selectedDate, selectedContactId){
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

export function updateGoal( userId, selectedContactId, selectedGoalId, goalTitle, goalDesc, goalOutcome, selectedDate ){
  axios
    .post('/api/v1/goals', {
      'type': 'update',
      'goalId': selectedGoalId,
      userId,
      goalTitle,
      goalDesc,
      goalOutcome,
      'dueDate': selectedDate,
      selectedContactId,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log("Update error", error);
    });
}

export function markAsDone(userId, goalId, isCompletedOnTime){
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

export function updateGoalContact( userId, selectedContactId, selectedGoalId ){
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