const { string } = require('@tensorflow/tfjs')
const mongoose = require('mongoose')


//connect to mongodb
const dbURI = "mongodb+srv://<yourname>:<yourpass><your_db_connection_link>"
mongoose.connect(dbURI)
.then(result => console.log('connected'))
.catch(err => console.log(err))

// database schema data (setting a scheme fro the db data)
const userSchema = new mongoose.Schema({
  data: Object,
  folderName: String,
 /* greenPassImg:{
      data:Buffer,
      contentype:String,
  }*/
},{collection: "user_collection"})

//define the collection where the data can be storaged
module.exports = mongoose.model("user_collection", userSchema)
// function form passing the date into the DB


//need to fix image uploading
