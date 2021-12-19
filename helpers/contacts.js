import axios from "axios";

export function getContacts(id, setContacts){
  axios.get('/api/v1/contacts', {
    params: {
      "type": 'all',
      "ownerId": id,
    }
  })
    .then(function (response) {
      setContacts(response.data)
    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}

export function getContact(ownerId, id, setContact){
  axios.get('/api/v1/contacts', {
    params: {
      type: 'single',
      ownerId: ownerId,
      contactId: id
    }
  })
    .then(function (response) {
      setContact(response.data[0])
    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}

export function createContact(ownerId, name, phone, countryCode){
  axios
    .post('/api/v1/contacts', {
      'type': 'create',
      ownerId,
      name,
      phone,
      countryCode
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function updateContact(userId, contactId, name, phone){
  axios
    .post('/api/v1/contacts', {
      'type': 'update',
      userId,
      contactId,
      name,
      phone
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log("Update error", error);
    });
}