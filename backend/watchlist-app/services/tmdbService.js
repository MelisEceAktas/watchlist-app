const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Get movie details by TMDB ID
async function getMovieDetails(movieId) {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movieId}`,  // Path parameter for movie_id
    headers: {
      accept: 'application/json',
    },
    params: {
      api_key: TMDB_API_KEY,
      language: 'en-US',  // Query parameter for language
    }
  };

  try {
    // Make the request to the API
    const res = await axios.request(options);
    //genre is a list/ have to get data 
    const {title, genres, release_date, poster_path} = res.data;
    const genreNames = genres.map(genre => genre.name);
    console.log('Movie Details:', {id, title, genreNames, release_date, poster_path});
    return { id, title, genreNames, release_date, poster_path} ;

  } 
  catch(error){
    return null;
  }
}

async function findMovie(movieName) {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`,
    headers: {
      accept: 'application/json',
    },
    params: {
      api_key: TMDB_API_KEY,
      language: 'en-US',  // Query parameter for language
    }
  };

  try {
    const res = await axios.request(options);

    if (res.data.results && res.data.results.length > 0) {

      const firstMovie = res.data.results[0];

      const {id, title, release_date, poster_path} = firstMovie;
      return {id, title, release_date, poster_path};
    }
    else{
      return null;
    }
  } 
  catch(error){
    return null;
  }
}



module.exports = { getMovieDetails,
                    findMovie
                  };
