/**
 * @file Controller Interface for Message resource
 */
import { Request, Response } from "express";

/**
 * The interface contains the method signatures that need to be implemented by the Controller for Message resource
 */
export default interface IMessageController {
  userSendsMessage(req: Request, res: Response): void;
  userDeletesMessage(req: Request, res: Response): void;
  getAllMessagesSentByUser(req: Request, res: Response): void;
  getAllMessagesSentToUser(req: Request, res: Response): void;
}
