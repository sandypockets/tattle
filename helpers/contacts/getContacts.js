import axios from 'axios'

export default function getContacts(id, setContacts){
  axios.get('/api/v1/contacts', {
    params: {
      "type": 'all',
      "ownerId": id,
    }
  })
    .then(function (response) {
      console.log(response.data)
      setContacts(response.data)
    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}