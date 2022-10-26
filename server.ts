/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import mongoose from "mongoose";
import dotenv from "dotenv";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";

dotenv.config();

const cors = require("cors");
const app = express();

mongoose.connect(process.env.MONGO_URI || "").then(() => {
  console.log("Connected to Mongo.");
});

app.use(cors());
app.use(express.json());

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

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Started Server on: http://localhost:" + port + "/");
});
