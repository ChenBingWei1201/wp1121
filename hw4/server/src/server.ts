import express from 'express';
import WebSocket from 'ws';
import wsConnect from './wsConnect.ts';
import mongoose from 'mongoose';
import mongo from './mongo.ts'
import { createServer } from "http";

mongo.connect();

const app = express();
const server = createServer(app);
const port = process.env.PORT || 4000;

server.listen(port, () =>
  console.log(`Example app listening on ws://localhost:${port}`),
);

const wss = new WebSocket.Server({ server });
const db = mongoose.connection;

db.once('open', () => {
  console.log("MongoDB connected!");
  wss.on("connection", (ws: any) => {
    ws.box = "";
    ws.onmessage = wsConnect.onMessage(wss, ws);
  });
});