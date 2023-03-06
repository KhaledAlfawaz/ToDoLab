import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2'

const app = express()
const port=3000


const prisma = new PrismaClient()

app.use(express.json())


app.post('/users' ,async(req :Request, res:Response) =>{
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
} )

app.get('/tasks/byId' , async(req :Request, res:Response) => {
    const userId = req.body.userId
    try {
        const tasks = await prisma.task.findMany({
            where:{
                userId:userId
            },
            select:{
                user:{
                    select:{
                        name:true
                    }
                },
                title:true,
                isCompleted:true,
                
            }
        })
        if(tasks){
            return res.json(tasks)
        }
    } catch (error) {
        res.status(500).json({Error:error})
    }
})

app.delete('/tasks' , async(req :Request, res:Response) => {
    const userId = req.body.userId
    const id = req.body.id
    try {
        const task = await prisma.task.deleteMany({
            where:{
                id:id,
                userId:userId
            },
        })
        if(task.count == 0){
            res.json({msg:'task not deleted'})
        }else {
            return res.json({msg:`task deleted`})
        }
    } catch (error) {
        res.status(500).json({Error:error})
    }
})

app.put('/tasks' , async(req :Request, res:Response) => {
    const userId = req.body.userId
    const id = req.body.id
    const title = req.body.title
    const isCompleted = req.body.isCompleted
    try {
        const task = await prisma.task.updateMany({
            where:{
                id:id,
                userId:userId
            },
            data:{
                title:title,
                isCompleted:isCompleted
            }
        })
        
        if(task){
            return res.json({msg:`task updated`})
        } else {
            res.json({msg:'not updated'})
        }
    } catch (error) {
        res.status(500).json({Error:error})
    }
})

app.get('/tasks' , async(req :Request, res:Response) => {
    try {
        const tasks = await prisma.task.findMany({
            select:{
                id:true,
                title:true,
                isCompleted:true,
                user:{
                    select:{
                        name:true
                    }
                }
            }
        })
        if(tasks){
            return res.json(tasks)
        }
    } catch (error) {
        res.status(500).json({Error:error})
    }
})

app.post('/tasks' ,async(req :Request, res:Response) =>{
    const tasks = req.body
    try {
        const newTasks = await prisma.task.create({
            data:tasks
        })
        if(newTasks){
            return res.json({msg:'task created' , task:newTasks})
        }
        throw("Something went wrong , please try again")
    } catch (error) {
        res.status(500).json({Error:error})
    }
} )

app.listen(port , ()=> {
    console.log(`Express running on port:${port}`);
})