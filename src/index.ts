import { middleware } from "#middlewares.js";
import express from "express";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("close", () => {
    console.log("Client disconnedted");
  });
});

console.log("Websocket Server stared on port 8080");

const port = process.env.PORT ?? "9001";
const app = express();

app.get("/", middleware);

app.listen(port, () => {
  console.log(`Express server started on port ${port}`);
});
