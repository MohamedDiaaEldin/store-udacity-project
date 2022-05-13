import axios from "axios"

describe('orders handler test ', () => {

    it(" POST /orders/:user_id test get orders by user id - unvalid jwt", (done: DoneFn) => {
        const unvalid_jwt = "eyJhbGciUiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmasJzdF9uYW1lIjoibW9oYW1lZCIsImlkIjoxLCJpYXQiOjE2NTI0NDQzMDR9.fNEdFZdRQTl3UR54Vh69Ru78XuD_VOuOJ3QJbr5vjc8"
        axios.post('http://localhost:5000/orders/197', { jwt:unvalid_jwt}).then(res=>{

        }).catch(err=>{
            expect(err.response.status).toBe(401)
            expect(err.response.body.message).toEqual('Unauthorized')
        })

        done()
    })

    
    it(" POST /orders/:user_id test get orders by user id - valid jwt - wrong user_id", (done: DoneFn) => {

        const valid_jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoibW9oYW1lZCIsImlkIjoxLCJpYXQiOjE2NTI0NDQzMDR9.fNEdFZdRQTl3UR54Vh69Ru78XuD_VOuOJ3QJbr5vjc8"
        axios.post('http://localhost:5000/orders/1000', { jwt:valid_jwt}).then(res=>{

        }).catch(err=>{
            expect(err.response.status).toBe(404)
        })

        done()
    })

})