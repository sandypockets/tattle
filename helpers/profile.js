import axios from "axios";

export function getProfile(user, setCustomerId) {
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

export function updateProfile({user, username, email, website, avatar_url, setLoading}) {
  axios
    .post('/api/profiles', {
        'id': user.id,
        'username': username,
        'email': email,
        'website': website,
        'avatar_url': avatar_url
      }
    )
    .then(function (response) {
      console.log("Update profile: ", response)
      return setLoading(false)
    })
    .catch(function (error) {
      console.log(error);
    })
}

export function updateEmail(userId, email){
  axios
    .post('/api/v1/profiles', {
      'type': 'update',
      'content': 'email',
      userId,
      email
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log("Update error", error);
    });
}