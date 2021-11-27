import cardTpl from '../../templates/card.hbs';
import emptyImg from '../../images/not_found.jpg';
import refs from './refs';
import genres from './getGenre';

const makeMoviesMarkup = movies => {
  return movies
    .map(({ title, poster_path, vote_average, genre_ids, release_date, id }) => {
      const releaseYear = new Date(release_date).getFullYear();
      let poster = emptyImg;
      if (poster_path) {
        poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
      }

      return cardTpl({ title, poster, vote_average, genre_ids, releaseYear, id });
    })
    .join('');
};
const renderMovies = data => {
  refs.trendMovies.innerHTML = makeMoviesMarkup(data);
};

export default renderMovies;
