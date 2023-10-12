import express from "express";
import * as z from "zod";
import { validateRequestBodyMiddleware } from "../middleware/validators";
import { baseUserSchema } from "../utils/schemas";
import UserModel from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signUp",
  validateRequestBodyMiddleware(baseUserSchema),
  async (req, res) => {
    const { email, password } = req.body as z.infer<typeof baseUserSchema>;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email in use");
    }

    const newUser = UserModel.build({ email, password });
    await newUser.save();
    res.status(201).send(newUser);
  }
);

export { router as signUpRouter };
