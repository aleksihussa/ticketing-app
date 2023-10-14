import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/currentUser", (req, res) => {
  if (!req.session?.bearer) {
    return res.send({ currentUser: null }).status(401);
  }
  try {
    const payload = jwt.verify(req.session.bearer, process.env.JWT_KEY!) as {
      email: string;
      id: string;
    };
    res.send({ currentUser: payload }).status(200);
  } catch (err) {
    res.send({ currentUser: null }).status(401);
  }
});

export { router as currentUserRouter };
