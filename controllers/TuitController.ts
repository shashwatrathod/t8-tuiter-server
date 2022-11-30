import { Request, Response, Express } from "express";
import { Session } from "..";
import TuitDao from "../daos/TuitDao";
import TuitVersionDao from "../daos/TuitVersionDao";
import ITuitController from "../interfaces/ITuitController";
import ITuitDao from "../interfaces/ITuitDao";
import Tuit from "../models/tuits/Tuit";
import TuitVersion from "../models/tuits/TuitVersion";

/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/tuits to create a new tuit instance for
 *     a given user</li>
 *     <li>GET /api/tuits to retrieve all the tuit instances</li>
 *     <li>GET /api/tuits/:tid to retrieve a particular tuit instances</li>
 *     <li>GET /api/users/:uid/tuits to retrieve tuits for a given user </li>
 *     <li>PUT /api/tuits/:tid to modify an individual tuit instance </li>
 *     <li>DELETE /api/tuits/:tid to remove a particular tuit instance</li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
export default class TuitController implements ITuitController {
  private static tuitDao: ITuitDao = TuitDao.getInstance();
  private static tuitController: TuitController | null = null;
  private static tuitVersionDao: TuitVersionDao = TuitVersionDao.getInstance();

  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return TuitController
   */
  public static getInstance = (app: Express): TuitController => {
    if (TuitController.tuitController === null) {
      TuitController.tuitController = new TuitController();
      app.get("/api/tuits", TuitController.tuitController.findAllTuits);
      app.get(
        "/api/users/:uid/tuits",
        TuitController.tuitController.findAllTuitsByUser
      );
      app.get("/api/tuits/:uid", TuitController.tuitController.findTuitById);
      app.post(
        "/api/users/:uid/tuits",
        TuitController.tuitController.createTuitByUser
      );
      app.put("/api/tuits/:tid", TuitController.tuitController.updateTuit);
      app.delete("/api/tuits/:tid", TuitController.tuitController.deleteTuit);
      app.get("/api/tuits/:tid/versions", TuitController.tuitController.getVersions);
      app.put("/api/tuits/:tid/edit", TuitController.tuitController.editTuit);
    }
    return TuitController.tuitController;
  };

  private constructor() {}

  /**
   * Retrieves all tuits from the database and returns an array of tuits.
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects
   */
  findAllTuits = (req: Request, res: Response) =>
    TuitController.tuitDao
      .findAllTuits()
      .then((tuits: Tuit[]) => res.json(tuits));

  /**
   * Retrieves all tuits from the database for a particular user and returns
   * an array of tuits.
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects
   */
  findAllTuitsByUser = (req: Request, res: Response) => {
    const uid =
      req.params.uid == "me" && (req.session as Session).profile
        ? (req.session as Session).profile._id
        : req.params.uid;

    TuitController.tuitDao
      .findAllTuitsByUser(uid)
      .then((tuits: Tuit[]) => res.json(tuits));
  };

  /**
   * @param {Request} req Represents request from client, including path
   * parameter tid identifying the primary key of the tuit to be retrieved
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the tuit that matches the user ID
   */
  findTuitById = (req: Request, res: Response) =>
    TuitController.tuitDao
      .findTuitById(req.params.uid)
      .then((tuit: Tuit) => res.json(tuit));

  /**
   * @param {Request} req Represents request from client, including body
   * containing the JSON object for the new tuit to be inserted in the
   * database. If uid params is "me", create tuit through logged in user.
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new tuit that was inserted in the
   * database
   */
  createTuitByUser = (req: Request, res: Response) => {
    const uid =
      req.params.uid === "me" && (req.session as Session).profile
        ? (req.session as Session).profile._id
        : req.params.uid;

    TuitController.tuitDao
      .createTuitByUser(uid, req.body)
      .then((tuit: Tuit) => res.json(tuit));
  };

  /**
   * @param {Request} req Represents request from client, including path
   * parameter tid identifying the primary key of the tuit to be modified
   * @param {Response} res Represents response to client, including status
   * on whether updating a tuit was successful or not
   */
  updateTuit = (req: Request, res: Response) =>
    TuitController.tuitDao
      .updateTuit(req.params.tid, req.body)
      .then((status) => res.send(status));
  
  /**
   * @param {Request} req Represents request from client, including path
   * parameter tid identifying the primary key of the tuit to be modified
   * @param {Response} res Represents response to client, including status
   * on whether updating a tuit was successful or not
   */
   editTuit = async (req: Request, res: Response) => {
    //get the tuit from Tuits collection by the req. body id
    const ogTuit = await TuitController.tuitDao.findTuitById(req.params.tid)
    // add that tuit to the tuit version 
    TuitController.tuitVersionDao
    //@ts-ignore
    .createTuitVersion(ogTuit._id,ogTuit.tuit,ogTuit.v!)
    //update the tuits text
    TuitController.tuitDao.updateTuit(req.params.tid,req.body).then((status)=>res.send(status))
    //update the tuit version
    //@ts-ignore
    TuitController.tuitDao.updateVersion(req.params.tid)
   }
   

  /**
   * @param {Request} req Represents request from client, including path
   * parameter tid identifying the primary key of the tuit to be removed
   * @param {Response} res Represents response to client, including status
   * on whether deleting a user was successful or not
   */
  deleteTuit = (req: Request, res: Response) =>
    TuitController.tuitDao
      .deleteTuit(req.params.tid)
      .then((status) => res.send(status));

  /**
   * @param {Request} req Represents request from client, including path
   * parameter tid identifying the primary key of the tuit whose 
   * version history to be viewed.
   * @param {Response} res Represents response to client, array of all the versions of the 
   * Tuit.
   */
  getVersions = (req: Request, res: Response) =>{
    TuitController.tuitVersionDao.findAllPreviousVersions(req.params.tid)
    .then((tuitVersion: TuitVersion[]) => res.json(tuitVersion))
  }
    
};
