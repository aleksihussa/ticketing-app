import express from "express";
import { validateRequestBodyMiddleware } from "../middleware/validators";
import { baseUserSchema } from "../utils/schemas";
import { UserModel } from "../models/user";
import { comparePasswords } from "../utils/authentication";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post(
  "/api/users/signIn",
  validateRequestBodyMiddleware(baseUserSchema),
  async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(401).send("Invalid credentials");
    }

    const isPasswordValid = await comparePasswords(
      existingUser.password,
      password
    );

    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }

    const jwtToken = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );
    req.session = { bearer: jwtToken };

    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
