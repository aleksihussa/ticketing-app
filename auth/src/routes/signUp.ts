import express from "express";
import * as z from "zod";

const router = express.Router();

router.post("/api/users/signUp", (req, res) => {
  const { email, password } = req.body;
  res.send("yepyep");
});

export { router as signUpRouter };
