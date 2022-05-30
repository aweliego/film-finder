const tmdbKey = config.MY_API_KEY;
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

// Load liked and disliked movies from local storage
const myLikedMovies = JSON.parse(localStorage.getItem('likedMovies'));
const myDislikedMovies = JSON.parse(localStorage.getItem('dislikedMovies'));

if (myLikedMovies) {
  myLikedMovies.forEach((movie) => createLikedMovie(movie));
}

if (myDislikedMovies) {
  myDislikedMovies.forEach((movie) => createDislikedMovie(movie));
}

// Delete btns need to be queried after local storage has been fetched and movies have been (re)created, otherwise empty node list is returned
const deleteBtns = document.querySelectorAll('.delete-btn');

deleteBtns.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    deleteMovie(e.currentTarget.parentNode);
  })
);

// API calls
const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const randomPage = getRandomPage();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&page=${randomPage}`;
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
