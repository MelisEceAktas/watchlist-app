const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const userSchema =  new Schema({
    username : {
        type: String, 
        required : [true, "No name"] //if no name send error
    },
    password : {
        type: String,
        required : true
    },
    movies : {
        type: [Number],
        default: []
    }
}, {timestamps: true})//created at, updated at field

const User = mongoose.model('User', userSchema)
module.exports = User