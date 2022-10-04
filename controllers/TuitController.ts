import { Request, Response, Express } from "express";
import ITuitController from "../interfaces/ITuitController";
import ITuitDao from "../interfaces/ITuitDao";

export default class TuitController implements ITuitController {
  private app: Express;
  private tuitDao: ITuitDao;

  constructor(app: Express, tuitDao: ITuitDao) {
    this.app = app;
    this.tuitDao = tuitDao;
    this.app.get("/tuits", this.findAllTuits);
    this.app.get("/tuits/:tid", this.findTuitById);
    this.app.get("/users/:uid/tuits", this.findTuitsByUser);
    this.app.post("/tuits", this.createTuit);
    this.app.delete("/tuits/:tid", this.deleteTuit);
    this.app.put("/tuits/:tid", this.updateTuit);
  }

  findAllTuits = (req: Request, res: Response): void => {
    this.tuitDao.findAllTuits().then((tuits) => res.json(tuits));
  };

  findTuitById = (req: Request, res: Response): void => {
    this.tuitDao.findTuitById(req.params?.tid).then((tuits) => res.json(tuits));
  };

  findTuitsByUser = (req: Request, res: Response): void => {
    this.tuitDao
      .findTuitsByUser(req.params?.uid)
      .then((tuits) => res.json(tuits));
  };

  createTuit = (req: Request, res: Response): void => {
    this.tuitDao.createTuit(req.body).then((tuit) => res.json(tuit));
  };

  updateTuit = (req: Request, res: Response): void => {
    this.tuitDao
      .updateTuit(req.params.tid, req.body)
      .then((tuit) => res.json(tuit));
  };

  deleteTuit = (req: Request, res: Response): void => {
    this.tuitDao.deleteTuit(req.params?.tid).then((status) => res.json(status));
  };
}
