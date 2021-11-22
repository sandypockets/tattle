import axios from 'axios'

export default function updateContact(userId, contactId, name, phone){
  axios
    .post('/api/v1/contacts', {
      'type': 'update',
      'user_id': userId,
      'contact_id': contactId,
      'name': name,
      'phone': phone
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log("Update error", error);
    });
}