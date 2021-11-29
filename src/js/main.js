import fetchMovies from './services/api';
import './services/localStorage';

import './header';
import './footer';
import makeMoviesMarkup from './services/markupMovies';
import getMovies from './services/getMovies';
import cardTpl from '../templates/card.hbs';
import genres from './services/getGenre';
import './services/modalFilm';

getMovies();
console.log(genres);
