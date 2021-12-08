import axios from 'axios'

export default function getSubscriptionByEmail(userId, setSubscriptionData){
  console.log('id: ', userId)
  axios
    .post('/api/v1/subscriptions', {
      "id": userId,
    })
    .then(function (response) {
      console.log(response.data);
      setSubscriptionData(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
}