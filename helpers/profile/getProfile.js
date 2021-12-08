import axios from "axios";

export default function getProfile(user, setCustomerId) {
  axios
    .get('/api/v1/profiles', {
      params: { id: user.id }
    })
    .then(function (response) {
      setCustomerId(response.data[0]['stripe_customer_id'])
    })
    .catch(function (error) {
      console.log(error);
    })
}