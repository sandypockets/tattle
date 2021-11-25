import axios from 'axios'

export default function updateEmail(userId, email){
  axios
    .post('/api/v1/profiles', {
      'type': 'update',
      'content': 'email',
      userId,
      email
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log("Update error", error);
    });
}