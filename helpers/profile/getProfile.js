import axios from "axios";

export default function getProfile(user, setUsername, setWebsite, setAvatarUrl) {
  axios
    .get('/api/profiles', {
      params: { id: user.id }
    })
    .then(function (response) {
      setUsername(response.data.username)
      setWebsite(response.data.website)
      setAvatarUrl(response.data.avatar_url)
    })
    .catch(function (error) {
      console.log(error);
    })
}