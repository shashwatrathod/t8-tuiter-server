/**
 * @file Controller Interface for bookmark resource
 */
import { Request, Response } from "express";

/**
 * The interface contains the method signatures that need to be implemented by the Controller for Bookmark resource
 */
export default interface IBookmarkController {
  findTuitsBookmarkedByUser(req: Request, res: Response): void;
  userBookmarksTuit(req: Request, res: Response): void;
  userUnbookmarksTuit(req: Request, res: Response): void;
}
