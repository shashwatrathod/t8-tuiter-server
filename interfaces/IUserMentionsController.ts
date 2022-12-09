/**
 * @file Controller Interface for UserMentions resource
 */
 import { Request, Response } from "express";

 /**
  * The interface contains the method signatures that need to be implemented by the Controller for UserMentions resource
  */
 export default interface IUserMentionsController {
  findUserMentions(req: Request, res: Response): void;
 }
 