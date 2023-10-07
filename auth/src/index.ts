import express from "express";
import { json } from "body-parser";
import { routers } from "./routes";
import { handleError } from "./middleware/handleError";
import mongoose from "mongoose";
const app = express();
app.use(json());

Object.values(routers).forEach((router) => {
  app.use(router);
});

app.use(handleError);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("success");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!");
  });
};

start();
