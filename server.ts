/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import TuitDao from "./daos/TuitDao";
import UserDao from "./daos/UserDao";
import mongoose from "mongoose";

const cors = require("cors");
const app = express();

mongoose.connect("mongodb://localhost:27017/").then(() => {
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

new UserController(app, new UserDao());
new TuitController(app, new TuitDao());

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const port = process.env.port || 4000;
app.listen(port, () => {
  console.log("Started Server on: http://localhost:" + port + "/");
});
