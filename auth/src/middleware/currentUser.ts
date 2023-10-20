import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
export const currentUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.bearer) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.bearer,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err: any) {
    throw new Error(err);
  }

  next();
};
