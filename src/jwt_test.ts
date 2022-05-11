const jwt = require('jsonwebtoken');
require('dotenv').config()


let token = jwt.sign({ name: 'mohamed' }, process.env.TOKEN_SECRET);
// console.log(token)


// console.log(token[0])
// token = 
console.log(token)
token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXJrIjoiYmF0dGVyeSBwYXJrIn0.bQEjsBRGfhKKEFtGhh83sTsMSXgSstFA_P8g2qV5Sns"

   
try{
    jwt.verify(token, process.env.TOKEN_SECRET)
    console.log('valid')
}
catch(err){
    console.log('not valid ' , err)
}
