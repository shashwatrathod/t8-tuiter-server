/**
 * @file Controller Interface for authentication
 */
import { Request, Response } from "express";

/**
 * The interface contains the method signatures that need to be implemented by the Controller for authentication
 */
export default interface IAuthController {
  signup(req: Request, res: Response): Promise<void>;
  profile(req: Request, res: Response): Promise<void>;
  logout(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
}
