import express from "express";
import * as z from "zod";
import { validateRequestBodyMiddleware } from "../utils/validators";
import { baseUserSchema } from "../utils/schemas";

const router = express.Router();

router.post(
  "/api/users/signUp",
  validateRequestBodyMiddleware(baseUserSchema),
  (req, res) => {
    const { email, password } = req.body as z.infer<typeof baseUserSchema>;
    res.send("yepyep").status(200);
  }
);

export { router as signUpRouter };
