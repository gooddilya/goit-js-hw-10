import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_OBjv0Oj4OGSxSEy9Q8186sbBWmKASuOeyGn0VRQvZfu8jhQMT6WOQUULEY8vUrZo';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

export function fetchBreeds() {
  return axios.get('breeds').then(response => response.data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get('images/search?breed_ids=' + breedId)
    .then(response => response.data);
}

export function onFetchError(_error) {
  return axios.get('breeds123').then(response => response.data);
}
