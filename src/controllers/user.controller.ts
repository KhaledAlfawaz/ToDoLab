import { prisma } from "../config/db";
import { Request, Response } from 'express';
import * as argon2 from 'argon2'


export const createUser = async (req :Request, res:Response) => {
    const hashedPassword = await argon2.hash(req.body.password)
    const email = req.body.email
    const name = req.body.name
    try {
        const newUser = await prisma.user.create({
            data:{
                email:email,
                name:name,
                password:hashedPassword
            }
        })
        if(newUser){
            return res.json({msg:'user created' , task:newUser})
        }
        throw("Something went wrong , please try again")
    } catch (error) {
        res.status(500).json({Error:error})
    }
}

export const getAllUsers = async (req :Request, res:Response) => {
    try {
        const tasks = await prisma.user.findMany()
        if(tasks){
            return res.json(tasks)
        }
    } catch (error) {
        res.status(500).json({Error:error})
    }
}




