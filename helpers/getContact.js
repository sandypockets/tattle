import axios from 'axios'

export default function getContact(ownerId, id, setContact){
  axios.get('/api/v1/contact', {
    params: { ownerId: ownerId, contactId: id }
  })
    .then(function (response) {
      setContact(response.data[0])
    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}