/**
 * @file Controller RESTful Web service API for follow resource
 */
import { Express, Request, Response } from "express";
import FollowDao from "../daos/FollowDao";
import IFollowController from "../interfaces/IFollowController";

/**
 * @class FollowController Implements RESTful Web service API for follow resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/following to retrieve list of users that this user follows
 *     </li>
 *     <li>GET /api/users/:uid/followers to retrieve list of users that follow this user
 *     </li>
 *     <li>POST /api/users/:uid1/follows/:uid2 to record that a user follows another user
 *     </li>
 *     <li>DELETE /api/users/:uid1/follows/:uid2 to record that a user
 *     no longer follows another user </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements IFollowController {
  private static followDao: FollowDao = FollowDao.getInstance();
  private static followController: FollowController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return TuitController
   */
  public static getInstance = (app: Express): FollowController => {
    if (FollowController.followController === null) {
      FollowController.followController = new FollowController();
      app.get(
        "/api/users/:uid/followers",
        FollowController.followController.findFollowers
      );
      app.get(
        "/api/users/:uid/following",
        FollowController.followController.findFollowing
      );
      app.post(
        "/api/users/:uid1/follows/:uid2",
        FollowController.followController.userFollowsAnotherUser
      );
      app.delete(
        "/api/users/:uid1/follows/:uid2",
        FollowController.followController.userUnfollowsAnotherUser
      );
    }
    return FollowController.followController;
  };

  private constructor() {}

  /**
   * Retrieves list of users that follow this user
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user follows objects
   */
  findFollowers = (req: Request, res: Response) =>
    FollowController.followDao
      .findFollowers(req.params.uid)
      .then((followers) => res.json(followers));

  /**
   * Retrieves list of users that are followed by this user
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user follows objects that were liked
   */
  findFollowing = (req: Request, res: Response) =>
    FollowController.followDao
      .findFollowing(req.params.uid)
      .then((follows) => res.json(follows));

  /**
   * Makes User1 follow User2
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is following another user and user that is being
   * followed
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new follow that was inserted in the
   * database
   */
  userFollowsAnotherUser = (req: Request, res: Response) =>
    FollowController.followDao
      .userFollowsAnotherUser(req.params.uid1, req.params.uid2)
      .then((follow) => res.json(follow));

  /**
   * Makes User1 unfollow User2
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is unfollowing
   * another user and user being unfollowed
   * @param {Response} res Represents response to client, including status
   * on whether deleting the like was successful or not
   */
  userUnfollowsAnotherUser = (req: Request, res: Response) =>
    FollowController.followDao
      .userUnfollowsAnotherUser(req.params.uid1, req.params.uid2)
      .then((status) => res.send(status));
}
