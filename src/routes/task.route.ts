import {
  createTask,
  deleteTask,
  getAllTasks,
  getTasksForOneUser,
  updateTask,
} from '../controllers/task.controller';
import express from 'express';
import validate from '../middleware/validate';
import { createTaskType , deleteTaskType , getTasksForOneUserType , updateTaskType} from '../zod.schema/zod.task';


const route = express.Router();

route.get('/', getAllTasks);

route.get('/id',validate(getTasksForOneUserType), getTasksForOneUser);

route.post('/',validate(createTaskType), createTask);

route.delete('/',validate(deleteTaskType), deleteTask);

route.put('/',validate(updateTaskType), updateTask);

export default route
