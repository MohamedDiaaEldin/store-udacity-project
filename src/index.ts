require('dotenv').config()
import express, { Request, Response } from 'express'
import customer_routes from './handlers/customer'
import cors from 'cors'
import { verify } from './utilities/verify'
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
app.use(cookie_parser)

// alive test 
app.get('/', (req: Request, res: Response) => {
    if (12 == 12) {
        res.send('yes')
        return
    }
    res.send('not')
})



app.get('/jwt', verify,  (req: Request, res: Response) => {        
    res.send('jwt end')
})

customer_routes(app)
products_routes(app)
orders_handler(app)

app.listen(port, host, () => {
    console.log(`server runing on ${host}:${port}`)
})
export default app

