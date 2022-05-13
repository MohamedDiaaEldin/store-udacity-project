import axios from 'axios'

axios.post('http://localhost:5000/customers', {jwt:"yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoibW9oYW1lZCIsImlkIjoxLCJpYXQiOjE2NTI0NDQzMDR9.fNEdFZdRQTl3UR54Vh69Ru78XuD_VOuOJ3QJbr5vjc8"}).then(res=>{
    console.log(res.status)
    console.log(res.data)
}).catch(err=>console.log(err.response.data))