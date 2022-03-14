const express = require('express');
const { engine } = require ('express-handlebars');
//importing my custom module
const routing = require('./src/routing')

// importing bodyParser for parsing request data
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3001;

//calling my custom modules for routing
routing(app)

//for dinamic files like html views exc...
app.engine("handlebars", engine({defaultLayout: 'main'}));
app.set("view engine", "handlebars");
app.set('views', './views');

// for statc element like files or static pages
app.use(express.static(__dirname + '/public'))



//this is making the post (req.body) possible
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/registration",  (req, res) =>{
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
