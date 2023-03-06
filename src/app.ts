import express, { Request, Response } from 'express'
import userRoutes from './routes/user.route'
import taskRoutes from './routes/task.route'

const app = express()
const port=3000

app.use(express.json())

app.use('/users' , userRoutes)
app.use('/tasks' , taskRoutes)


app.listen(port , ()=> {
    console.log(`Express running on port:${port}`);
})