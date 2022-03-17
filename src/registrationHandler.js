

app.post("/registration",  (req, res) =>{
    //generating subfolder with the imgaes data
    const folderName = `${req.body.name}_${req.body.surname}`
  const folderPath = `${__dirname}/public/labeled_images/${folderName}`
  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    }
  } catch (err) {
    console.error(err)
  } 
  
   regData(req.body,folderName)
  
  //mving photos into the folders
    if(req.files.face1){
      let face1 = req.files.face1
      face1.name = "1.JPG" // changing file name for the script.js
       face1.mv(`./public/labeled_images/${folderName}/${face1.name}`)
    }
    if(req.files.face2){
      let face2 = req.files.face2
      face2.name = "2.JPG"
      face2.mv(`./public/labeled_images/${folderName}/${face2.name}`)
    }
  
    res.redirect('/recognitions');
    
  })