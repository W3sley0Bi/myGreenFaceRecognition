const regFrom = require('./dbConnection')

 async function dbCaller(){
     regFrom.find({}, {folderName :1}, (err,result)=>{
    if(err) console.warn(err)
    let myArr = []
    for(let i = 0; i < result.length; i++){
        myArr = [...myArr,result[i].folderName]
    
    }

    return myArr
  
  })
}

module.exports = dbCaller

//usless module