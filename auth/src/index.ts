import express from "express";
import { json } from "body-parser";
import { routers } from "./routes";
const app = express();
app.use(json());

Object.values(routers).forEach((router) => {
  app.use(router);
});

app.listen(3000, () => {
  console.log("Listening on port 3000!!!");
});
