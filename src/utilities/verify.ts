import express, { Request, Response } from 'express'
import { is_valid_jwt } from './auth'


export const verify_middle = (req: Request, res: Response, next: Function) => {
    // is there jwt 
    if (!(req.body && req.body.jwt)) {
        console.log('there is not jwt')
        res.statusCode = 401
        res.json({ status_code: 401, message: "Unauthorized" })        
        
    }
    else {
        // if not valid jwt 
        if (!is_valid_jwt(req.body.jwt)) {
            res.statusCode = 401
            res.json({ status_code: 401, message: "Unauthorized" })
            res.end()
        }
        else {
            // continue
            next()
        }
    }

}