import { Request, Response } from "express";

/**
 * The interface contains the method signatures that need to be implemented by the Controller for Follow resource
 */
export default interface IFollowController {
  findFollowers(req: Request, res: Response): void;
  findFollowing(req: Request, res: Response): void;
  userFollowsAnotherUser(req: Request, res: Response): void;
  userUnfollowsAnotherUser(req: Request, res: Response): void;
}
