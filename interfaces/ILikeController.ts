import { Request, Response } from "express";

/**
 * The interface contains the method signatures that need to be implemented by the Controller for Like resource
 */
export default interface ILikeController {
  findAllUsersThatLikedTuit(req: Request, res: Response): void;
  findAllTuitsLikedByUser(req: Request, res: Response): void;
  userLikesTuit(req: Request, res: Response): void;
  userUnlikesTuit(req: Request, res: Response): void;
  findUserLikesTuit(req: Request, res: Response): void;
}
