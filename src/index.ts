import { middleware } from "#middlewares.js";
import express from "express";

const port = process.env.PORT ?? "9001";
const app = express();

app.get("/", middleware);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
