import {
createUser  ,getAllUsers , login
  } from '../controllers/user.controller';
import express from 'express';
import validate from '../middleware/validate';
import { createUserType ,loginType} from '../zod.schema/zod.user';

const route = express.Router();

route.get('/', getAllUsers);

route.post('/login',validate(loginType), login);

route.post('/',validate(createUserType) ,createUser);

export default route