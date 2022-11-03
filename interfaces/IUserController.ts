import { Request, Response } from "express";

/**
 * The interface contains the method signatures that need to be implemented by the Controller for User resource
 */
export default interface IUserController {
  findAllUsers(req: Request, res: Response): void;
  findUserById(req: Request, res: Response): void;
  createUser(req: Request, res: Response): void;
  updateUser(req: Request, res: Response): void;
  deleteUser(req: Request, res: Response): void;
  deleteAllUsers(req: Request, res: Response): void;
  deleteUserByCondition(req: Request, res: Response): void;
}
