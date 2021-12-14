import axios from 'axios'

export default function getSubscriptionByEmail(email, setSubscriptionData){
  console.log('customerEmail: ', email)
  axios
    .post('/api/v1/subscriptions', {
      "type": "getByEmail",
      "customerEmail": email,
    })
    .then(function (response) {
      console.log("getSubscriptionByEmail: ", response.data);
      setSubscriptionData(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
}