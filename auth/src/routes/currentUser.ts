import express from "express";
import jwt from "jsonwebtoken";
import { currentUserMiddleware } from "../middleware/currentUser";
import { authenticationRequired } from "../middleware/authenticationRequired";

const router = express.Router();

router.get(
  "/api/users/currentUser",
  currentUserMiddleware,
  authenticationRequired,
  (req, res) => {
    if (!req.session?.bearer) {
      return res.send({ currentUser: null }).status(401);
    }
    const currUser = req.currentUser;

    res.send({ currentUser: currUser ?? null }).status(200);
  }
);

export { router as currentUserRouter };
