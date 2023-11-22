import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import WebSocket from "ws";

import mongo from "./mongo.ts";
import wsConnect from "./wsConnect.ts";

mongo.connect();

const app = express();
const server = createServer(app);
const port = process.env.PORT || "4000";

server.listen(port, () =>
  console.log(`Example app listening on ws://localhost:${port}`),
);

const wss = new WebSocket.Server({ server });
const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB connected!");
  wss.on("connection", (ws: WebSocket) => {
    // ws.box = "";
    ws.onmessage = wsConnect.onMessage(wss, ws);
  });
});
