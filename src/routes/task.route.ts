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
import auth from '../middleware/auth';


const route = express.Router();

route.get('/', getAllTasks);

route.get('/id',auth, getTasksForOneUser);

route.post('/',auth,validate(createTaskType), createTask);

route.delete('/',auth , validate(deleteTaskType), deleteTask);

route.put('/',auth ,validate(updateTaskType), updateTask);

export default route
