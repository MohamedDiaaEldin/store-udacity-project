require('dotenv').config()
import express, {  Request, Response} from 'express'
import customer_routes from './handlers/customer'
import cors from 'cors'
import bodyParser from 'body-parser'
import { verify_middle } from './utilities/verify'


const app:express.Application = express()
const host = '0.0.0.0' 
const port  = 5000 

//// how to use cors 
// define cors option
const cors_options = {
    origin:' http://localhost:1234',
    optionsSuccessStatus:200
}
app.use(express.json())

app.get('/', verify_middle, (req:Request, res:Response)=>{
    if (12==12){
        res.send('yes')
        return
    }
    res.send('not')
})

customer_routes(app)

app.listen(port, host ,  ()=>{
    console.log(`server runing on ${host}:${port}`)
})
export default app

