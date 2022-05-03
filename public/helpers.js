// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
  const select = document.getElementById('genres');

  for (const genre of genres) {
    let option = document.createElement('option');
    option.value = genre.id;
    option.text = genre.name;
    select.appendChild(option);
  }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
  const selectedGenre = document.getElementById('genres').value;
  return selectedGenre;
};

// Get random page of result
const getRandomPage = (min = 0, max = 500) => {
  const randomPage = Math.floor(Math.random() * (max - min) + min);
  return randomPage;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
  const btnDiv = document.getElementById('likeOrDislikeBtns');
  btnDiv.removeAttribute('hidden');
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
  const moviePosterDiv = document.getElementById('moviePoster');
  const movieTextDiv = document.getElementById('movieText');
  moviePosterDiv.innerHTML = '';
  movieTextDiv.innerHTML = '';
};

// After liking a movie, clears the current movie from the screen, gets another random movie and adds to list of liked movies
const likeMovie = (movieInfo) => {
  clearCurrentMovie();
  showRandomMovie();
  addToLikedMovies(movieInfo);
};

const likedMovies = [];

// Add movie to list of liked movies
const addToLikedMovies = (movieInfo) => {
  likedMovies.push(movieInfo);
  displayLikedMovies(likedMovies);
};

// Show liked movies at the bottom of page
const displayLikedMovies = (likedMovies) => {
  const movieList = document.getElementById('likedMoviesList');
  if (movieList.hasChildNodes()) {
    while (movieList.firstChild) {
      movieList.removeChild(movieList.firstChild);
    }
  }
  likedMovies.forEach((movie) => {
    const title = document.createElement('li');
    title.classList.add('likedMovie');
    title.setAttribute('id', 'likedMovie');
    title.innerText = movie.title;
    movieList.appendChild(title);
  });
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
  clearCurrentMovie();
  showRandomMovie();
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

  const posterImg = document.createElement('img');
  posterImg.setAttribute('src', moviePosterUrl);
  posterImg.setAttribute('id', 'moviePoster');

  return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
  const titleHeader = document.createElement('h1');
  titleHeader.setAttribute('id', 'movieTitle');
  titleHeader.innerHTML = title;

  return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
  const overviewParagraph = document.createElement('p');
  overviewParagraph.setAttribute('id', 'movieOverview');
  overviewParagraph.innerHTML = overview;

  return overviewParagraph;
};

// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
  const moviePosterDiv = document.getElementById('moviePoster');
  const movieTextDiv = document.getElementById('movieText');
  const likeBtn = document.getElementById('likeBtn');
  const dislikeBtn = document.getElementById('dislikeBtn');

  // Create HTML content containing movie info
  const moviePoster = createMoviePoster(movieInfo.poster_path);
  const titleHeader = createMovieTitle(movieInfo.title);
  const overviewText = createMovieOverview(movieInfo.overview);

  // Append title, poster, and overview to page
  moviePosterDiv.appendChild(moviePoster);
  movieTextDiv.appendChild(titleHeader);
  movieTextDiv.appendChild(overviewText);

  showBtns();
  likeBtn.onclick = () => likeMovie(movieInfo);

  dislikeBtn.onclick = () => dislikeMovie(movieInfo);
};