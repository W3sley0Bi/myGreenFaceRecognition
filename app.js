const express = require('express');
const { engine } = require ('express-handlebars');
const upload = require('express-fileupload')
const mongoose = require('mongoose')
const flash = require('connect-flash');
const session = require('express-session')
//importing my custom module
const routing = require('./src/routing')
//const userSchema = require('./src/dbmodels')

// importing bodyParser for parsing request data
const bodyParser = require('body-parser');


//creating my application
const app = express();

//connect to mongodb
const dbURI = "mongodb+srv://Crocker:2wpuxhM0dnU9SQNm@facedb.eaiqv.mongodb.net/FaceGreen?retryWrites=true&w=majority"
mongoose.connect(dbURI)
.then(result => console.log('connected'))
.catch(err => console.log(err))

// database schema data (setting a scheme fro the db data)
const userSchema = new mongoose.Schema({
  data: Object,
},{collection: "user_collection"})
//define the collection where the data can be storaged
const regFrom = mongoose.model("user_collection", userSchema)
// function form passing the date into the DB
const regData = (bodyData) =>{
  regFrom({data: bodyData}).save((err) => {
   if (err) {throw err}
   })
}

//defining what port to use.
const port = process.env.PORT || 3000;

//calling my custom modules for routing
routing(app)

//for dinamic files like html views exc...
app.engine("handlebars", engine({defaultLayout: 'main'}));
app.set("view engine", "handlebars");
app.set('views', './views');

// for statc element like files or static pages
app.use(express.static(__dirname + '/public'))

app.use(session({
  secret: 'secret key',
  resave: true,
  saveUninitialized: true
}));

app.use(flash())

//this is making the post (req.body) possible
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload())

app.get("/registration",  (req, res) =>{
  //here create a function that create a new Folder with the name and the surname of the user
 
 // res.sendFile(__dirname + './uploadFaces') pushing mages in that folder
 req.flash('message', 'Submission success');
 
})

app.post("/registration",  (req, res) =>{
 // const xxx = `${req.body.name} ${req.body.surname}`
 // console.log(xxx)
 regData(req.body)
// res.send(req.flash('message'))
 res.redirect('/recognitions');
  
  /* error if i use this to move the file photo 
  if(req.files.face){
    let face = req.files.face
    console.log(face.name)
    face.mv('./uploadFaces/'+face.name)
    
  }*/

  
  
})




// 404 page
app.use((req, res) => {
  res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found D-:')
});


// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error')
    })

app.listen(port);
