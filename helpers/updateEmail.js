import axios from 'axios'

export default function updateEmail(userId, email){
  axios
    .post('/api/v1/profiles', {
      'type': 'update',
      'content': 'email',
      'user_id': userId,
      'email': email
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log("Update error", error);
    });
}