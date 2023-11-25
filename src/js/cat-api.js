import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_OBjv0Oj4OGSxSEy9Q8186sbBWmKASuOeyGn0VRQvZfu8jhQMT6WOQUULEY8vUrZo';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get('https://api.thecatapi.com/v1/images/search?breed_ids=' + breedId)
    .then(response => response.data);
}
