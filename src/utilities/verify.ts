import express, { Request, Response } from 'express'
import { is_valid_jwt } from './auth'




export const verify = (req: Request, res: Response, next: Function) => {
    console.log(req.headers.cookie)
    if (req.cookies && is_valid_jwt(req.cookies.get('jwt'))) {
        next()
    }
    else {
        res.statusCode = 401
        res.json({ status_code: 401, message: "Unauthorizedddd" })
    }
}