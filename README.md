# My Green Face Recognition

This is the final project for my bachelor degree.
I'm currently using face-api.js libriry for face detection and face recognitions.
Node.js is the language for my backend server and with express, the game is even more easier.
I'm currently looking for a green-pass api for checking the greenpass validity once is uploaded.

## Execution 

Download the project and:
1) change the variable <const dbURI> in dbConnection.js file and connect your mongodb db.
2) change herokuData with localData in function fetchDB for testing it with your local data. File position => public/scripts/script.js
  
## Test on my heroku site. 
  if u what to test my application directly go to https://face-greenpass.herokuapp.com/.
  
##Bugs 
  Heroku has an ephemeral fs. your recognition system will work just for 30min average. After that time, you may do another registration of yourself. the login section is useless for now. 
