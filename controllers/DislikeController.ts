/**
 * @file Controller RESTful Web service API for likes resource
 */
import { Express, Request, Response } from "express";
import { Session } from "..";
import DislikeDao from "../daos/DislikeDao";
import LikeDao from "../daos/LikeDao";
import TuitDao from "../daos/TuitDao";
import IDislikeController from "../interfaces/IDislikeController";

/**
 * @class TuitController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/dislikes/:tid to record that a user dislikes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/undislikes/:tid to record that a user
 *     no londer dislikes a tuit</li>
 * </ul>
 * @property {DislikeDao} dislikeDao Singleton DAO implementing dislikes CRUD operations
 * @property {DislikeController} DislikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class DislikeController implements IDislikeController {
  private static dislikeDao: DislikeDao = DislikeDao.getInstance();
  private static likeDao: LikeDao = LikeDao.getInstance();
  private static dislikeController: DislikeController | null = null;
  private static tuitDao: TuitDao = TuitDao.getInstance();

  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return TuitController
   */
  public static getInstance = (app: Express): DislikeController => {
    if (DislikeController.dislikeController === null) {
      DislikeController.dislikeController = new DislikeController();
      app.get(
        "/api/users/:uid/dislikes",
        DislikeController.dislikeController.findAllTuitsDislikedByUser
      );
      app.get(
        "/api/tuits/:tid/dislikes",
        DislikeController.dislikeController.findAllUsersThatDislikedTuit
      );
      app.post(
        "/api/users/:uid/dislikes/:tid",
        DislikeController.dislikeController.userDislikesTuit
      );
      app.delete(
        "/api/users/:uid/undislikes/:tid",
        DislikeController.dislikeController.userUnDislikesTuit
      );
    }
    return DislikeController.dislikeController;
  };

  private constructor() {}

  /**
   * Retrieves all users that disliked a tuit from the database
   * @param {Request} req Represents request from client, including the path
   * parameter tid representing the disliked tuit
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user objects
   */
  findAllUsersThatDislikedTuit = (req: Request, res: Response) =>
    DislikeController.dislikeDao
      .findAllUsersThatDislikedTuit(req.params.tid)
      .then((dislikes) => res.json(dislikes));

  /**
   * Retrieves all tuits disliked by a user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user disliked the tuits
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects that were disliked
   */
  findAllTuitsDislikedByUser = (req: Request, res: Response) =>
    DislikeController.dislikeDao
      .findAllTuitsDislikedByUser(req.params.uid)
      .then((dislikes) => res.json(dislikes));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is disliking the tuit
   * and the tuit being disliked
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new dislikes that was inserted in the
   * database
   */
  userDislikesTuit = async (req: Request, res: Response) => {
    const uid = req.params.uid;
    const tid = req.params.tid;
    const { profile } = req.session as Session;
    const userId = uid === "me" && profile ? profile._id : uid;

    try {
      const userAlreadyDislikedTuit =
        await DislikeController.dislikeDao.findUserDislikesTuit(tid, userId);

      const howManyDislikedTuit =
        await DislikeController.dislikeDao.findDislikesCount(tid);

      const howManyLikedTuit = await DislikeController.likeDao.findLikesCount(
        tid
      );

      let tuit = await DislikeController.tuitDao.findTuitById(tid);

      if (userAlreadyDislikedTuit) {
        await DislikeController.dislikeDao.userUnDislikesTuit(tid, userId);
        await DislikeController.likeDao.userLikesTuit(tid, userId);
        tuit.stats.likes = howManyLikedTuit + 1;
        tuit.stats.dislikes = howManyDislikedTuit - 1;
      } else {
        await DislikeController.dislikeDao.userDislikesTuit(tid, userId);
        await DislikeController.likeDao.userUnlikesTuit(tid, userId);
        tuit.stats.dislikes = howManyDislikedTuit + 1;
        tuit.stats.likes = howManyDislikedTuit - 1;
      }

      await DislikeController.tuitDao.updateStats(tid, tuit.stats);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(404);
    }
  };

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is undisliking
   * the tuit and the tuit being undisliked
   * @param {Response} res Represents response to client, including status
   * on whether deleting the like was successful or not
   */
  userUnDislikesTuit = (req: Request, res: Response) =>
    DislikeController.dislikeDao
      .userUnDislikesTuit(req.params.tid, req.params.uid)
      .then((status) => res.send(status));
}
