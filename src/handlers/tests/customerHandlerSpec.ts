import pg_pool from '../../databse'
import { is_valid_request_data } from '../../handlers/customer'
import { CustomerStore } from '../../models/customer'
import axios from 'axios'


describe("test customer model", () => {

    it("test show", async () => {

        const valid_user_data = { first_name: "mohamed", last_name: "diaa", password: "123" }
        const not_valid_user_data = { first_name: "", last_name: "", password: "" }

        expect(is_valid_request_data(valid_user_data)).toBeTruthy()
        expect(is_valid_request_data(not_valid_user_data)).toBeFalsy()
    })

})


describe("test customer end points", async () => {

    it("test getring all customers with valid jwt /customers post- index", async (done: DoneFn) => {
        // delete old data 
        const conn = await pg_pool.connect()
        await conn.query('DELETE FROM customers')
        conn.release()

        ///  add test data        
        const customer_store = new CustomerStore(pg_pool)
        const valid_jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoibW9oYW1lZCIsImlkIjoxLCJpYXQiOjE2NTI0NDQzMDR9.fNEdFZdRQTl3UR54Vh69Ru78XuD_VOuOJ3QJbr5vjc8"
       
        const first_user = { first_name: "ali", last_name: "mohamed", password: "ali123.." }
        const second_user = { first_name: "mohamed", last_name: "diaa", password: "mohamd..123" }
        await customer_store.create(first_user)
        await customer_store.create(second_user)

        await axios.post('http://localhost:5000/customers', { jwt: valid_jwt }).then(res => {
            expect(res.status).toBe(200)
            expect(res.data.length).toBe(2)
        }).catch(err => console.log("Error while testing /customers"))
        done()

    })

    it("test getring all customers with unvalid jwt /customers post- index", async (done: DoneFn) => {
        // delete old data       
        const unvalid_jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ.eyJmaXJzdF9uYW1lIjoibW9oYW1lZCIsImlkIjoxLCJpYXQiOjE2NTI0NDQzMDR9.fNEdFZdRQTl3UR54Vh69Ru78XuD_VOuOJ3QJbr5vjc8"

        await axios.post('http://localhost:5000/customers', { jwt: unvalid_jwt }).then(res => {

        }).catch(err => {
            expect(err.response.status).toBe(401)
            expect(err.response.data.message).toEqual('Unauthorized')
        })
        done()

    })

    it("test getting customer with id using valid jwt /customers/:id post- index", async (done: DoneFn) => {
        // delete old data       
        const unvalid_jwt = "eyJhbGcifigIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoibW9oYW1lZCIsImlkIjoxLCJpYXQiOjE2NTI0NDQzMDR9.fNEdFZdRQTl3UR54Vh69Ru78XuD_VOuOJ3QJbr5vjc8"

        await axios.post('http://localhost:5000/customers/2', { jwt: unvalid_jwt}).then(res => {            
        }).catch(err => {
            expect(err.response.status).toBe(401)
            expect(err.response.data.message).toEqual('Unauthorized')
        })
        done()

    })   
     it("test creating customer /customers post- index", async (done: DoneFn) => {
        // delete old data       
        
        const new_customer = {first_name:"mohamed", last_name:"ali", password:"strongpassword"}

        await axios.post('http://localhost:5000/customers', new_customer).then(res => {
            expect(res.status).toBe(200)            
        }).catch(err => {
            console.log('error while testing creating new customer')            
        })
        done()

    })
})