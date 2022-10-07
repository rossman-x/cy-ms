import { GenerateWord, connectUser, getUser } from "./services.js";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import redis from "redis";
import RedisStore from "connect-redis";
import cors from "cors";

const app = express();

app.use(bodyParser.json());

app.use(cors({ origin: "*", credentials: true, methods: ["GET", "POST"] }));

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

app.get("/get", async (req, res) => {
  const body = await GenerateWord(req, client);
  res.end(JSON.stringify(body));
});

app.post("/verify", async (req, res) => {});

app.post("/connect", async (req, res) => {
  const body = await connectUser(req, client);
  res.end(JSON.stringify(body));
});

app.get("/connect", async (req, res) => {
  const body = await getUser(req, client);
  if (body.error) {
    res.status(404).send(JSON.stringify(body));
    return;
  }
  res.end(JSON.stringify(body));
});

app.listen(4000);
