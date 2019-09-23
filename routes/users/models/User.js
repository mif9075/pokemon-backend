const mongoose = require('mongoose');
const moment = require('moment');

let UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, unique: true, lowercase: true },
    password: { type: String, default: ''},
    timestamp: { type: String, default: ()=>{ moment().format('dddd, MMMM Do YYYY, h:mm:ss a') }}
})

module.exports = mongoose.model('user', UserSchema);