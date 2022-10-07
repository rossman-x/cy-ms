import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import redis from "redis";
import RedisStore from "connect-redis";
import cors from "cors";
import { getScore, getScorePrivate, updateScorePrivate } from "./services.js";

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:8081",
    credentials: true,
    methods: ["GET", "POST"],
  })
);

const client = redis.createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASS,
  port: 6379,
  legacyMode: true,
});

client.connect();

const redisStore = RedisStore(session);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new redisStore({ client }),
  })
);

app.get("/score/get", async (req, res) => {
  const body = await getScore(req, client);
  if (body.error) {
    res.status(404).send(JSON.stringify(body));
    return;
  }
  res.end(JSON.stringify(body));
});

app.post("/private/score/get", async (req, res) => {
  const body = await getScorePrivate(req, client);
  if (body.error) {
    res.status(404).send(JSON.stringify(body));
    return;
  }
  res.end(JSON.stringify(body));
});

app.post("/private/score/update", async (req, res) => {
  const body = await updateScorePrivate(req, client);
  if (body.error) {
    res.status(404).send(JSON.stringify(body));
    return;
  }
  res.end(JSON.stringify(body));
});

app.listen(4000);
