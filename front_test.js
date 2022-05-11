import 'regenerator-runtime/runtime';
import axios from 'axios';
axios.get('http://localhost:5000/students').then(res=>{
    console.log(res)
    console.log(res.data)
    document.querySelector('h3').textContent = JSON.stringify(res.data)
    
})