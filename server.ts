/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import session from "express-session";
import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import mongoose from "mongoose";
import dotenv from "dotenv";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import { SessionOptions } from "http2";
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.MONGO_URI || "").then(() => {
  console.log("Connected to Mongo.");
});

const app = express();

const sess: session.SessionOptions = {
  secret: process.env.SECRET || "somethingVerySecret",
  cookie: {
    secure: false,
  },
};

if (process.env.ENV === "PRODUCTION") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie = {
    ...sess.cookie,
    secure: true,
  }; // serve secure cookies
}

app.use(cors());
app.use(express.json());
app.use(session(sess));

app.get("/", (req: Request, res: Response) =>
  res.send("Welcome to Foundation of Software Engineering!!!!")
);

app.get("/hello", (req: Request, res: Response) =>
  res.send("Welcome to Foundation of Software Engineering!")
);

UserController.getInstance(app);
TuitController.getInstance(app);
LikeController.getInstance(app);
FollowController.getInstance(app);
BookmarkController.getInstance(app);
MessageController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Started Server on: http://localhost:" + port + "/");
});
