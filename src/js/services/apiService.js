import 'js-loading-overlay';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '1db5479ca98fac1ae129bcbe15cc6182';

const configs = {
  overlayBackgroundColor: '#666666',
  overlayOpacity: '0.1',
  spinnerIcon: 'ball-circus',
  spinnerColor: '#000',
  spinnerSize: '3x',
  overlayIDName: 'overlay',
  spinnerIDName: 'spinner',
  offsetY: 0,
  offsetX: 0,
  lockScroll: true,
  containerID: null,
};

let genresArr = [];
let url = '';

let searchMovies = `${BASE_URL}/search/movie`;
let trendMovies = `${BASE_URL}/trending/movie/week`;

const fetchGenre = async () => {
  JsLoadingOverlay.show(configs);
  url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json(); //[{}, {}, ..., {}]
  JsLoadingOverlay.hide();
  genresArr = data.genres;
};

const fetchMovies = async (page = 1, query) => {
  if (query) {
    // JsLoadingOverlay.show(configs);
    url = `${searchMovies}?api_key=${API_KEY}&query=${query}&page=${page}`;
  } else {
    // JsLoadingOverlay.show(configs);
    url = `${trendMovies}?api_key=${API_KEY}&page=${page}`;
  }
  JsLoadingOverlay.show(configs);
  const response = await fetch(url);
  const data = await response.json(); // Получаем объект c полем results: [{}, {}, ..., {}]
  // ["названия жарнов", ""]
  data.results = data.results.map(movie => {
    return {
      ...movie,
      genres: movie.genre_ids
        .slice(0, 2)
        .map(id => {
          const movieGenre = genresArr.find(genre => genre.id === id);
          return movieGenre?.name || '';
        })
        .join(', '),
    };
  });
  JsLoadingOverlay.hide();

  return data;
};

const fetchMovieById = async id => {
  JsLoadingOverlay.show(configs);
  url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
  https: try {
    const response = await fetch(url);
    const movie = await response.json();
    url = '';
    JsLoadingOverlay.hide();

    return movie;
  } catch (error) {
    console.log(error);
  }
};

export { fetchGenre, genresArr, fetchMovies, fetchMovieById };