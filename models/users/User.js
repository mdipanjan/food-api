const mongoose = require('mongoose');

//Create User schema
const userschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone: {
        type: String 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const User = mongoose.model('user', userschema);
module.exports = User;
