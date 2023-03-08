import { prisma } from "../config/db";
import { Request, Response } from 'express';

export const createTask = async (req :Request, res:Response) => {
    try {
        const newTasks = await prisma.task.create({
            data:{
                userId:res.locals.user.id,
                title:req.body.title
            }
        })
        if(newTasks){
            return res.json({msg:'task created' , task:newTasks})
        }
        throw("Something went wrong , please try again")
    } catch (error) {
        res.status(500).json({Error:error})
    }
}

export const getAllTasks = async (req :Request, res:Response) => {
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
}

export const getTasksForOneUser = async (req :Request, res:Response) => {
    const userId = res.locals.user
    try {
        const tasks = await prisma.task.findMany({
            where:{
                userId:userId.id
            },
            select:{
                id:true,
                title:true,
                isCompleted:true,
                user:{
                    select:{
                        name:true
                    }
                },
                
            }
        })
        if(tasks){
            return res.json(tasks)
        }
    } catch (error) {
        res.status(500).json({Error:error})
    }
}

export const updateTask = async (req :Request, res:Response) => {
    const userId = res.locals.user
    const id = req.body.id
    const title = req.body.title
    const isCompleted = req.body.isCompleted
    try {
        const task = await prisma.task.updateMany({
            where:{
                id:id,
                userId:userId.id
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
}

export const deleteTask = async (req :Request, res:Response) => {
    const userId = res.locals.user
    const id = req.body.id
    console.log(userId.id);
    
    try {
        const task = await prisma.task.deleteMany({
            where:{
                id:id,
                userId:userId.id
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
}