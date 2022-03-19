



let localData = 'http://localhost:3000/registrationHandler'
let fullData = 'http://localhost:3000/dossierAPI'
let herokuData = 'https://face-greenpass.herokuapp.com/registrationHandler'
let fullHerokuData = 'https://face-greenpass.herokuapp.com//dossierAPI'

fetchDB()

async function fetchDB (){
  const res = await fetch(herokuData)
  const dataImage = await res.json();
  const res1 = await fetch(fullHerokuData)
  const data = await res1.json();
  let imagesGigaWrapper = document.getElementById('imagesGigaWrapper')

 for(let i = 0; i < dataImage.length; i++){
    let imagesWrapper = document.createElement('div')
    imagesWrapper.setAttribute("class","imageWrapper")
    let faceIMG = document.createElement('img')
    faceIMG.setAttribute("src",`labeled_images/${dataImage[i]}/1.JPG`)
    imagesWrapper.append(faceIMG)
     for(let j = 0; j < data.length; j++){
    
    
    if (data[j].folderName === dataImage[i]){
  
    let dbUserID = data[j]._id
    let name = data[j].data.name
    let surname = data[j].data.surname
    let email = data[j].data.email
    let age = data[j].data.age
    let gender = data[j].data.gender
    let folderName = data[j].folderName


    let p1 = document.createElement('p')
    let p2 = document.createElement('p')
    let p3 = document.createElement('p')
    let p4 = document.createElement('p')
    let p5 = document.createElement('p')
    let p6 = document.createElement('p')
    let p7 = document.createElement('p')


    p1.append(`id: ${dbUserID}`)
    p2.append(`Nome: ${name}`)
    p3.append(`cognome: ${surname}`)
    p4.append(`età: ${age}`)
    p5.append(`email: ${email}`)
    p6.append(`sesso: ${gender}`)
    p7.append(`idCartella: ${folderName}`)

    imagesWrapper.append(p1,p2,p3,p4,p5,p6,p7)

    }
    }
    imagesGigaWrapper.append(imagesWrapper)
    
}
}





