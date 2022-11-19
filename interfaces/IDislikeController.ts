import { Request, Response } from "express";

/**
 * The interface contains the method signatures that need to be implemented by the Controller for Dislike resource
 */
export default interface IDislikeController {
  findAllUsersThatDislikedTuit(req: Request, res: Response): void;
  findAllTuitsDislikedByUser(req: Request, res: Response): void;
  userDislikesTuit(req: Request, res: Response): void;
  userUnDislikesTuit(req: Request, res: Response): void;
}
