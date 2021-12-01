import axios from 'axios'

export default function getBillingHistory(id, setBillingHistory){
  axios.get('/api/v1/billing', {
    params: { ownerId: id }
  })
    .then(function (response) {
      console.log(response.data)
      setBillingHistory(response.data)

    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}