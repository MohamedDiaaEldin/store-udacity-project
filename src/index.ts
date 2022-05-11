require('dotenv').config()
import express, {  Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app:express.Application = express()
const host = '0.0.0.0' 
const port  = 5000 

//// how to use cors 
// define cors option
const cors_options = {
    origin:' http://localhost:1234',
    optionsSuccessStatus:200
}

app.get('/', (req:Request, res:Response)=>{
    res.send('hi')

})

app.listen(port, host ,  ()=>{
    console.log(`server runing on ${host}:${port}`)
})
export default app

