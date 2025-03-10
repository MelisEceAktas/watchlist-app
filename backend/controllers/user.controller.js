const User = require("../models/User.js");


//get all users in api
const getUsers = async(req, res) =>{
  try{
    const users = await User.find({});
    res.status(200).json(users);
  }catch(error){
      res.status(500).json({message: error.message});//500->error
  }
}

//get single user with id
const getUser = async(req, res) =>{
  try{
    const { id } = req.params;
    const user = await User.findById(id); 
    if(!user ){
      return res.status(404).json({message: "User not found"});
    }
    res.status(200).json(user);
  }catch(error){
      res.status(500).json({message: error.message});//500->error
  }
}

//getUser with name
const getUserWithName = async(req, res) =>{
  try{
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    const user = await User.findOne({ username });
    if(!password == user.password) {
      return res.status(400).json({message: "Cannot login because incorrect password!"});
    }
    if(!user ){
      return res.status(404).json({message: "There is no such user!"});
    }
    res.status(200).json(user);
  }catch(error){
      res.status(500).json({message: error.message});//500->error
  }
}

//add user to database (name, password)
const addUser =  async(req, res) =>{
    try{
      const { username } = req.body;
      if (!username) {
        return res.status(400).json({ message: "Username is required" });
      }
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const user = await User.create(req.body);

      res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: error.message});
    }
  }


const changeName =  async(req, res) =>{
  try{
    const { newUsername } = req.body;
    const { id } = req.params; // from htpl req
    const user = await User.findByIdAndUpdate(id, {username: newUsername}) ;

    if(!user){
      return res.status(404).json({message: "User not found"});
    }

    const updatedProduct = await User.findById(id)
    res.status(200).json(updatedProduct);
  }catch(error){
      res.status(500).json({message: error.message});//500->error
  }
}

const deleteUser = ('/api/users/:id', async(req, res) =>{
  try{
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id); 

    if(!user ){
      return res.status(404).json({message: "User not found"});
    }

    res.status(200).json(user);
  }catch(error){
      res.status(500).json({message: error.message});//500->error
  }
})

const addMovieToUser = async(req, res) =>{
  try{
    const { id } = req.params; // from htpl req
    const { movieId } = req.body;
    const user = await User.findById(id) ;
    
    if(!user){
      return res.status(404).json({message: "User not found"});
    }

    if (!user.movies.includes(movieId)) {
      user.movies.push(movieId);
      await user.save();
    }
    const updatedProduct = await User.findById(id)
    res.status(200).json(updatedProduct);
  }catch(error){
      res.status(500).json({message: error.message});//500->error
  }
}

const delMovieToUser = async(req, res) =>{
  try{
    const { id } = req.params; // from htpl req
    const { movieId } = req.body;
    const user = await User.findById(id) ;
    
    if(!user){
      return res.status(404).json({message: "User not found"});
    }

    user.movies.pull(movieId);
    await user.save();

    const updatedProduct = await User.findById(id)
    res.status(200).json(updatedProduct);
  }catch(error){
      res.status(500).json({message: error.message});//500->error
  }
}

module.exports = {
    getUsers,
    getUser,
    getUserWithName,
    addUser,
    changeName,
    deleteUser,
    addMovieToUser,
    delMovieToUser
}