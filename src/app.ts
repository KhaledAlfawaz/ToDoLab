import express, { Request, Response } from 'express'
import userRoutes from './routes/user.route'
import taskRoutes from './routes/task.route'
import * as dotenv from 'dotenv'

const app = express()
const port=3000

app.use(express.json())
dotenv.config()

app.use('/users' , userRoutes)
app.use('/tasks' , taskRoutes)


app.listen(port , ()=> {
    console.log(`Express running on port:${port}`);
})