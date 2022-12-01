/**
 * @file Controller Interface for Message resource
 */
 import { Request, Response } from "express";

 /**
  * The interface contains the method signatures that need to be implemented by the Controller for Message resource
  */
 export default interface IUserMentionsController {
  findUserLikesTuit(req: Request, res: Response): void;
 }
 