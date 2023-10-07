import { Router } from "express";
import { isNamedExportBindings } from "typescript";
import * as z from "zod";

export const validateRequestBodyMiddleware = (
  schema: z.ZodObject<any, any, any>
) => {
  return async (req: any, res: any, next: any) => {
    try {
      schema.parse(req.body);
      await next();
    } catch (err) {
      // Customize the error message as needed
      const errorMessage = "Invalid request body: " + err;
      const error = new Error(errorMessage);
      await next(error);
    }
  };
};
