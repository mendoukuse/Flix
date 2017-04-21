const API_KEY = 'a07e22bc18f5cb106bfe4cc1f83ad8ed';
const BASE_URL = 'https://api.themoviedb.org/3/movie';
const NOW_PLAYING_URL = `${BASE_URL}/now_playing?api_key=${API_KEY}`;
const TOP_RATED_URL = `${BASE_URL}/top_rated?api_key=${API_KEY}`;

const IMAGE_URI_PREFIX = 'https://image.tmdb.org/t/p';
const IMAGE_URI_PREFIX_HIGH = `${IMAGE_URI_PREFIX}/original`;
const IMAGE_URI_PREFIX_LOW = `${IMAGE_URI_PREFIX}/w45`;

export function fetchMovies(type) {
  const url = type == 'TOP_RATED' ? TOP_RATED_URL : NOW_PLAYING_URL;

  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => responseJson.results);
}

export function getPosterUrl(posterPath) {
  return `${IMAGE_URI_PREFIX_HIGH}${posterPath}`;
}

export function getPosterUrlHigh(posterPath) {
  return `${IMAGE_URI_PREFIX_HIGH}/${posterPath}`;
}

export function getPosterUrlLow(posterPath) {
  return `${IMAGE_URI_PREFIX_LOW}/${posterPath}`;
}
