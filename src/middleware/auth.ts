import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

interface User {
    id:string
}

const auth = (req: Request, res: Response, next: NextFunction) =>{
    try {
        const header = req.headers.authorization;
        const token = header?.split(' ')[1]

        if(!token){
            return res.status(403).json({'msg':'you are not authorize , please provide a vaild token'})
        }
        
        const user = jwt.verify(token,process.env.MYSECRET as string) as User
        
        res.locals.user = user
        next()
    } catch (error) {
        return res.status(403).json({'msg':'you are not authorize , please provide a vaild token'})

    }
}

export default auth