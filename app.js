const express = require('express');
const { engine } = require ('express-handlebars');
const routing = require('./routing')

const upload = require('express-fileupload')

// importing bodyParser for parsing request data
const bodyParser = require('body-parser');

//creating my application
const app = express();

//defining what port to use.
const port = process.env.PORT || 3001;

//
routing(app)

//for dinamic files like html views exc...
app.engine("handlebars", engine({defaultLayout: 'main'}));
app.set("view engine", "handlebars");
app.set('views', './views');

// for statc element like files or static pages
app.use(express.static(__dirname + '/public'))



//passing data with a post
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload())

app.get("/registration",  (req, res) =>{

  res.sendFile(__dirname + './uploadFaces')
})

app.post("/registration",  (req, res) =>{
  if(req.files.face){
    let face = req.files.face
    console.log(face.name)
    face.mv('./uploadFaces/'+face.name)
    
  }
  console.log(req.body)
})



// 404 page
app.use((req, res) => {
  res.status(404);
  res.render("404");
});

// 500 page
/*
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render("500");
});
*/

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error')
    })

app.listen(port);
