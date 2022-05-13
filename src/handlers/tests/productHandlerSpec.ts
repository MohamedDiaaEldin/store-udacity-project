import axios from 'axios'
import pg_pool from '../../databse'
import { is_valid_prodcut_data } from '../../handlers/products'
import { ProductStore } from '../../models/products'

describe("test customer handler", () => {
    it("test show", async () => {

        const valid_product_data = { name: "mac laptop", price: 25000 }
        const not_valid_product_data = { name: "", price: 25000 }

        expect(is_valid_prodcut_data(valid_product_data)).toBeTruthy()
        expect(is_valid_prodcut_data(not_valid_product_data)).toBeFalsy()
    })

    it("GET /products  index test", async (done: DoneFn) => {
        const con = await pg_pool.connect()
        con.query('DELETE FROM products ;')
        con.release()

        const product_store = new ProductStore(pg_pool)
        product_store.create({ name: "iphon 30", price: 12000 })


        await axios.get('http://localhost:5000/products').then(res => {
            expect(res.status).toBe(200)
        })
        done()
    })

    it("GET /products/:id  show test", async (done: DoneFn) => {
        await axios.get('http://localhost:5000/products/1').then(res => {
            expect(res.status).toBe(200)
        })
        done()
    })

    it("POST /products  create test with valid jwt ", async (done: DoneFn) => {

        const valid_jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoibW9oYW1lZCIsImlkIjoxLCJpYXQiOjE2NTI0NDQzMDR9.fNEdFZdRQTl3UR54Vh69Ru78XuD_VOuOJ3QJbr5vjc8'
        const new_product = { jwt: valid_jwt, name: "iphon 33", price: 18000 }
        await axios.post('http://localhost:5000/products', new_product).then(res => {
            expect(res.status).toBe(200)
            expect(res.data.message).toEqual('product added successfully')
        })
        done()
    })

    it("POST /products  create test with unvalid jwt", async (done: DoneFn) => {
        // delete old data       
        const valid_jwt = "eyJhsGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoibW9oYW1lZCIsImlkIjoxLCJpYXQiOjE2NTI0NDQzMDR9.fNEdFZdRQTl3UR54Vh69Ru78XuD_VOuOJ3QJbr5vjc8"
        const new_products = {jwt:valid_jwt, name:"iphone 13", price:3000}

        await axios.post('http://localhost:5000/customers', new_products).then(res => {                  
        }).catch(err => {
            expect(err.response.status).toBe(401)
        })
        done()

    })

})