const jwt = require('jsonwebtoken');
require('dotenv').config()



type JWTData={
    first_name : string, 
    id:number
}

/// take data and generate jwt token
export const make_jwt = (data:JWTData):string=>{
    return jwt.sign(data, process.env.TOKEN_SECRET);
}

/// verify jwt token 
export const is_valid_jwt =(token:string):Boolean=>{
    try{
        jwt.verify(token, process.env.TOKEN_SECRET)
        return true
    }
    catch(err){
        return false
    }
}