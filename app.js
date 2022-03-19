const express = require('express');
const { engine } = require ('express-handlebars');
const upload = require('express-fileupload')
const fs = require('fs')
const { randomUUID } = require('crypto'); // Added in: node v14.17.0 generate unique ID

// importing bodyParser for parsing request data
const bodyParser = require('body-parser');
//importing my custom module
const routing = require('./src/routing')
const regFrom = require('./src/dbConnection');


//creating my application
const app = express();
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

//this is making the post (req.body) possible
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload())




app.post("/registration",  (req, res) =>{
  //generating subfolder with the imgaes data
  const folderName = `${req.body.name}_${req.body.surname}_${randomUUID()}`
const folderPath = `${__dirname}/public/labeled_images/${folderName}`
console.log(folderName)
try {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
  }
} catch (err) {
  console.error(err)
} 

 regData(req.body,folderName)
//mving photos into the folders

/*
  if(req.files.greenpass){
    let pass = req.files.greenpass
    pass.name = `${folderName}.JPG` // changing file name for the script.js
    pass.mv(`./public/labeled_images/greenpassFolder/${pass.name}`)
  }
*/
  if(req.files.face1){
    
    let face1 = req.files.face1
 //   face1.mv(`./public/labeled_images/FacesImages/${face1.name}`)
    face1.name = "1.JPG" // changing file name for the script.js
     face1.mv(`./public/labeled_images/${folderName}/${face1.name}`)
  }
  if(req.files.face2){
    let face2 = req.files.face2
   // face2.mv(`./public/labeled_images/FacesImages/${face2.name}`)
    face2.name = "2.JPG"
    face2.mv(`./public/labeled_images/${folderName}/${face2.name}`)
  }

  res.redirect('/recognitions');
  
})

app.get('/registrationHandler',(req,res)=>{
  regFrom.find({}, {folderName :1}, (err,result)=>{
    if(err) console.warn(err)
    let myArr = []
    for(let i = 0; i < result.length; i++){
        myArr = [...myArr,result[i].folderName]
    
    }
    console.log(myArr)
    res.json(myArr)
  
  })
})

//uploading data function
const regData = (bodyData,fName/*greenimg*/) =>{
  regFrom({data: bodyData, folderName:fName/*, greenPassImg:greenimg*/}).save((err) => {
   if (err) {throw err}
   })
}

// Tring to serve a dossier image [custom api]
app.get('/dossierAPI',(req,res)=>{
  
/*var files =fs.readdirSync('./public/FacesImages')
console.log(files)
*/
regFrom.find({}, (err,result)=>{
  if(err) console.warn(err)
  res.json(result)
})


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
