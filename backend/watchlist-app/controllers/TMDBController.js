// controllers/movieController.js
const { getMovieDetails, findMovie } = require("../services/tmdbService.js");

const fetchMovieDetails = async (req, res) => {
  const { movieId } = req.params;  // Get the movie ID from the request parameters

  try {
    // Fetch movie details from the TMDB service
    const movieDetails = await getMovieDetails(movieId);

    // Send the filtered movie details as JSON response
    if (!movieDetails) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movieDetails);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movie details from TMDB' });
  }
};


const findMovieController = async (req, res) => {
  const { name } = req.query;  

  if (!name) {
    return res.status(400).json({ message: 'Queuery is empty' });
  }

  try {
    const output = await findMovie(name); // calls funct that returns id num

    if (!output) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // success
    res.status(200).json(output); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to find the movie', error: error.message });
  }
};


module.exports = { fetchMovieDetails, findMovieController };