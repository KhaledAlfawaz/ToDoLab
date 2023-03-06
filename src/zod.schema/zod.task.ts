import { TypeOf, z } from 'zod';

const userObj = z.object({
  id: z.string({
    required_error: 'id is required',
    invalid_type_error: 'id must be string',
  }),
  title: z.string({
    required_error: 'title is required',
    invalid_type_error: 'title must be string',
  }),
  isCompleted: z.boolean({
    required_error: 'isCompleted is required',
    invalid_type_error: 'isCompleted must be boolean',
  }),
  userId: z.string({
    required_error: 'userId is required',
    invalid_type_error: 'userId must be string',
  }),
  
});

export const createTaskType = z.object({
  body: userObj.omit({ id: true,}),
});

export const getTasksForOneUserType = z.object({
    body: userObj.pick({ userId: true,}),
  });
  

  export const updateTaskType = z.object({
    body: userObj.omit({ }),
  });
  

  export const deleteTaskType = z.object({
    body: userObj.pick({id:true , userId:true }),
  });

export type createTaskTypeSchema = TypeOf<typeof createTaskType>['body'];
export type getTasksForOneUserTypeSchema = TypeOf<typeof getTasksForOneUserType>['body'];
export type updateTaskTypeSchema = TypeOf<typeof updateTaskType>['body'];
export type deleteTaskTypeSchema = TypeOf<typeof deleteTaskType>['body'];



