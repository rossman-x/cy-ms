import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import redis from "redis";
import RedisStore from "connect-redis";
import cors from "cors";
import { verifyWord } from "./services.js";
import { createLogger } from "winston";
import { LokiConfig, WORD } from "./config.js";

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:8081",
    credentials: true,
    methods: ["GET", "POST"],
  })
);
const logger = createLogger(LokiConfig);

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

app.get("/core/game", async (req, res) => {
  logger.info({
    message: "URL " + req.url,
    labels: {
      url: req.url,
      username: req.session ? req.session.username : null,
    },
  });
  const body = {
    length: WORD.length-1,
  };
  if (body.error) {
    res.status(404).send(JSON.stringify(body));
    return;
  }
  res.end(JSON.stringify(body));
});

app.post("/core/validate", async (req, res) => {
  logger.info({
    message: "URL " + req.url,
    labels: {
      url: req.url,
      username: req.session ? req.session.username : null,
    },
  });
  const body = await verifyWord(req, client);
  if (body.error) {
    res.status(404).send(JSON.stringify(body));
    return;
  }
  res.end(JSON.stringify(body));
});

app.listen(4000);
