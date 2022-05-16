require('dotenv').config()
import express, { Request, Response } from 'express'
import customer_routes from './handlers/customer'
import cors from 'cors'
import bodyParser from 'body-parser'
import { verify_middle } from './utilities/verify'
import { products_routes } from './handlers/products'
import { orders_handler } from './handlers/orders'
import { cookie_parser } from './utilities/cookieParser'

const app: express.Application = express()
const host = '0.0.0.0'
const port = 5000


const cors_options = {
    origin: ' http://localhost:1234',
    optionsSuccessStatus: 200
}

app.use(express.json())

// alive test 
app.get('/', verify_middle, (req: Request, res: Response) => {
    if (12 == 12) {
        res.send('yes')
        return
    }
    res.send('not')
})

// const get_cookies = (req: Request): Map<string, string> | null => {
//     if (req.headers.cookie) {
//         const cookies = req.headers.cookie.split(';')
//         const obj = new Map<string, string>()
//         for (const cookie of cookies) {
//             const key_values = cookie.trim().split('=')
//             obj.set(key_values[0], key_values[1])
//         }        
//         req.cookies = obj
//         return obj
//     }
//     return null
// }

app.get('/jwt', cookie_parser, (req: Request, res: Response) => {
    // console.log(req.headers.cookie)    
    console.log(req.cookies.get('jwt'))
    res.send('jwt end')
})

customer_routes(app)
products_routes(app)
orders_handler(app)

app.listen(port, host, () => {
    console.log(`server runing on ${host}:${port}`)
})
export default app

