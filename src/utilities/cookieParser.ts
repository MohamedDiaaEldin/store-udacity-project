import {Request, Response} from 'express'

export const cookie_parser = (req:Request, _res:Response, next: Function) =>{
    if (req.headers.cookie) {
        const cookies = req.headers.cookie.split(';')
        const obj = new Map<string, string>()
        for (const cookie of cookies) {
            const key_values = cookie.trim().split('=')
            obj.set(key_values[0], key_values[1])
        }        
        req.cookies =obj        
    }
    next()
}