const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

//mongodb connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected!!'))
  .catch(err => console.error('Database connection error:', err));


const app = express();

app.use(cors());
// Middleware
app.use(morgan('dev'));
//to be able to handle json
app.use(express.json()); // Built-in body parsing
app.use(express.urlencoded({ extended: false}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//routes
const movieRoute = require('./routes/tmdb.route');
const userRoute = require('./routes/user.route'); 

app.use('/api/users/', userRoute);
app.use('/api/movies/', movieRoute);
