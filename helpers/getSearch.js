import axios from "axios";

export default function getSearch(query, ownerId, setSearchResults) {
  axios
    .get('/api/v1/search', {
      params: {
        query: query,
        ownerId: ownerId
      }
    })
    .then(function (response) {
      setSearchResults(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
}