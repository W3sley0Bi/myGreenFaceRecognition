const video = document.getElementById('video')
video.setAttribute("playsinline", true);
//laoding Models
Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
]).then(startVideo)

async function startVideo() {
  console.log('Models Loading Completed')
  // navigator.mediaDevices.getUserMedia -> try this for the smartphons
  navigator.mediaDevices.getUserMedia(
    { video: true } ).then(
    stream => video.srcObject = stream
  )

  recognizeFaces()
}

async function recognizeFaces() {

const labeledDescriptors = await loadLabeledImages()
const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7)

video.play()
video.onplay = async () => {
  $('.FaceIdImages').css("display", "none")
  console.log('Playing')
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  
  faceapi.matchDimensions(canvas, displaySize)
  
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    
    const results = resizedDetections.map((d) => {
      return faceMatcher.findBestMatch(d.descriptor)
  })
  results.forEach( (result, i) => {
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
      drawBox.draw(canvas)
  })
  }, 100)
}
}

let myDatas = []

let localData = 'http://localhost:3000/registrationHandler'

let herokuData = 'https://face-greenpass.herokuapp.com/registrationHandler'

async function fetchDB (){
  const res = await fetch(herokuData)
  const data = await res.json();
  myDatas = data
  console.log(myDatas)
  return data
  }

  fetchDB()
function loadLabeledImages() {
  const labels = myDatas // for WebCam
   console.log(labels)
  return Promise.all(
      labels.map(async (label)=>{
          const descriptions = []
          for(let i=1; i<=2; i++) {
              const img = await faceapi.fetchImage(`../labeled_images/${label}/${i}.JPG`)
              const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
              console.log(label + i + JSON.stringify(detections))
              descriptions.push(detections.descriptor)
          }
          console.log(label+' Faces Loaded ! ')
          return new faceapi.LabeledFaceDescriptors(label, descriptions)
      })
  )
}
