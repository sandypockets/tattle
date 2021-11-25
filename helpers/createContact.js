import axios from 'axios'

export default function createContact(userId, name, phone){
  axios
    .post('/api/v1/contacts', {
      'type': 'create',
      ownerId,
      name,
      phone
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}