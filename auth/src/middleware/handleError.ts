import { NextFunction, Response, Request } from "express";

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Something went wrong", err.message);
  res.status(500).send({ error: err.message });
};
