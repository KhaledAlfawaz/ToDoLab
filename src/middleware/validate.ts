import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { ZodError } from 'zod/lib';

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
      });
      next();
    } catch (error) {
      const zodError = error as ZodError;
      return res.status(400).json({
        message: zodError.errors[0].message,
      });
    }
  };

export default validate;
