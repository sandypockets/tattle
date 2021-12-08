import axios from "axios";

export default function updateProfile({user, username, email, website, avatar_url, setLoading}) {
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