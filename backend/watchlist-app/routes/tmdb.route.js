const express =  require("express");
const router = express.Router();

const { fetchMovieDetails, findMovieController } = require("../controllers/TMDBController.js")

// Define a route that takes a movieId as a parameter
router.get('/:movieId', fetchMovieDetails);  // This will handle GET requests like /movie/550
router.get('/',findMovieController); 

module.exports = router;
