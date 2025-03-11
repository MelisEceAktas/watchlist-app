const User = require("../models/User.js");
const express =  require("express");
const router = express.Router();

const {addUser, getUsers, getUser, getUserWithName , changeName, deleteUser, addMovieToUser, delMovieToUser} = require("../controllers/user.controller.js")

//add user to database (name, password)
router.post('/', addUser);
  
//gives all users
router.get('/', getUsers);
router.post('/login', getUserWithName);

//gives one user
router.get('/:id', getUser);

//updates user
router.put('/:id/username', changeName);
//json movieId 
router.put('/:id/movies', addMovieToUser);

//deletes user
router.delete('/:id', deleteUser);
router.delete('/:id/movies/:movieId', delMovieToUser);

module.exports  = router;
  