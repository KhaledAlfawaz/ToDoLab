import { TypeOf, z } from 'zod';

const userObj = z.object({
  id: z.string({
    required_error: 'id is required',
    invalid_type_error: 'id must be string',
  }),
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be string',
  }),
  name: z.string({
    required_error: 'name is required',
    invalid_type_error: 'name must be string',
  }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be string',
  }),
  
});

export const createUserType = z.object({
  body: userObj.omit({ id: true}),
});

export const loginType = z.object({
  body: userObj.pick({ email:true , password:true}),
});

export type createUserTypeSchema = TypeOf<typeof createUserType>['body'];
export type loginTypeSchema = TypeOf<typeof loginType>['body'];

