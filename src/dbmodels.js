const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   data: Object,
},{collection: "user_collection"})


module.exports = mongoose.model('users', userSchema)