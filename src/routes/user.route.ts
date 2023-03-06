import {
createUser  ,getAllUsers
  } from '../controllers/user.controller';
import express from 'express';
import validate from '../middleware/validate';
import { createUserType } from '../zod.schema/zod.user';

const route = express.Router();

route.get('/', getAllUsers);

route.post('/',validate(createUserType) ,createUser);

export default route