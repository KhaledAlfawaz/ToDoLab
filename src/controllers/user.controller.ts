import { prisma } from "../config/db";
import { Request, Response } from 'express';
import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'


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
        const users = await prisma.user.findMany()
        if(users){
            return res.json(users)
        }
    } catch (error) {
        res.status(500).json({Error:error})
    }
}

export const login = async (req :Request, res:Response) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(!user){
            res.status(400).json({
                msg:"wrong email"
            }) 
        }else if (!await argon2.verify(user.password , password)){
            res.status(400).json({
                msg:"wrong password"
            }) 
        } else {
            const token = jwt.sign({id:user.id},process.env.MYSECRET as string , {expiresIn:'2h'})
            res.json({msg:`Welcome ${user.name}` , token:token})
        }
    } catch (error) {
        
    }
}