/**
 * @file Controller RESTful Web service API for likes resource
 */
import { Express, Request, Response } from "express";
import { Session } from "..";
import DislikeDao from "../daos/DislikeDao";
import LikeDao from "../daos/LikeDao";
import TuitDao from "../daos/TuitDao";
import ILikeController from "../interfaces/ILikeController";

/**
 * @class TuitController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no londer likes a tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikeController implements ILikeController {
  private static likeDao: LikeDao = LikeDao.getInstance();
  private static likeController: LikeController | null = null;
  private static tuitDao: TuitDao = TuitDao.getInstance();
  private static dislikeDao: DislikeDao = DislikeDao.getInstance();

  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return TuitController
   */
  public static getInstance = (app: Express): LikeController => {
    if (LikeController.likeController === null) {
      LikeController.likeController = new LikeController();
      app.get(
        "/api/users/:uid/likes",
        LikeController.likeController.findAllTuitsLikedByUser
      );
      app.get(
        "/api/tuits/:tid/likes",
        LikeController.likeController.findAllUsersThatLikedTuit
      );
      app.post(
        "/api/users/:uid/likes/:tid",
        LikeController.likeController.userLikesTuit
      );
      app.get(
        "/api/users/:uid/likes/:tid",
        LikeController.likeController.findUserLikesTuit
      );
      app.delete(
        "/api/users/:uid/unlikes/:tid",
        LikeController.likeController.userUnlikesTuit
      );
    }
    return LikeController.likeController;
  };

  private constructor() {}

  /**
   * Retrieves all users that liked a tuit from the database
   * @param {Request} req Represents request from client, including the path
   * parameter tid representing the liked tuit
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user objects
   */
  findAllUsersThatLikedTuit = (req: Request, res: Response) =>
    LikeController.likeDao
      .findAllUsersThatLikedTuit(req.params.tid)
      .then((likes) => res.json(likes));

  /**
   * Retrieves all tuits liked by a user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user liked the tuits
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects that were liked
   */
  findAllTuitsLikedByUser = (req: Request, res: Response) =>
    LikeController.likeDao
      .findAllTuitsLikedByUser(req.params.uid)
      .then((likes) => res.json(likes));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is liking the tuit
   * and the tuit being liked
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new likes that was inserted in the
   * database
   */
  userLikesTuit = async (req: Request, res: Response) => {
    const uid = req.params.uid;
    const tid = req.params.tid;
    const { profile } = req.session as Session;
    const userId = uid === "me" && profile ? profile._id : uid;

    if (userId === "me") {
      console.log("User is not logged in.");
      res.sendStatus(403);
      return;
    }

    try {
      const userAlreadyLikedTuit =
        await LikeController.likeDao.findUserLikesTuit(tid, userId);

      let howManyLikedTuit = await LikeController.likeDao.findLikesCount(tid);
      let howManyDislikedTuit =
        await LikeController.dislikeDao.findDislikesCount(tid);

      let tuit = await LikeController.tuitDao.findTuitById(tid);

      if (userAlreadyLikedTuit) {
        await LikeController.likeDao.userUnlikesTuit(tid, userId);
        await LikeController.dislikeDao.userDislikesTuit(tid, userId);
        howManyLikedTuit -= 1;
        howManyDislikedTuit += 1;
      } else {
        await LikeController.likeDao.userLikesTuit(tid, userId);
        await LikeController.dislikeDao.userUnDislikesTuit(tid, userId);
        howManyLikedTuit += 1;
        howManyDislikedTuit -= 1;
      }

      tuit.stats = {
        ...tuit.stats,
        likes: howManyLikedTuit,
        dislikes: howManyDislikedTuit,
      };

      await LikeController.tuitDao.updateStats(tid, tuit.stats);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(404);
    }
  };

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is unliking
   * the tuit and the tuit being unliked
   * @param {Response} res Represents response to client, including status
   * on whether deleting the like was successful or not
   */
  userUnlikesTuit = (req: Request, res: Response) =>
    LikeController.likeDao
      .userUnlikesTuit(req.params.tid, req.params.uid)
      .then((status) => res.send(status));

  /**
   * Find if a user has liked this tuit
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is liking the tuit
   * and the tuit being liked
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new likes that was inserted in the
   * database
   */
  findUserLikesTuit = (req: Request, res: Response) => {
    const userId =
      req.params.uid === "me" && (req.session as Session).profile
        ? (req.session as Session).profile._id
        : req.params.uid;

    if (userId === "me") {
      console.log("User is not logged in.");
      res.sendStatus(403);
      return;
    }

    LikeController.likeDao
      .findUserLikesTuit(req.params.tid, userId)
      .then((response) => res.send(response))
      .catch((e) => console.log(e));
  };
}
