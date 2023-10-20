import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticationRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    return res.status(401).send("Not authorized");
  }

  next();
};
