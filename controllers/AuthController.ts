import UserDao from "../daos/UserDao";
import bcrypt from "bcrypt";
import { Express, Request, Response } from "express";
import IAuthController from "../interfaces/IAuthController";
import IUserDao from "../interfaces/IUserDao";
import { Session } from "..";

const saltRounds = 10;

/**
 * @class UserController Implements RESTful Web service API for Authentication.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/auth/signup to create and authenticate a new user</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * @property {AuthController} authController Singleton controller implementing
 * RESTful Web service API
 */
export default class AuthController implements IAuthController {
  private static authController: IAuthController | null = null;
  private static userDao: IUserDao = UserDao.getInstance();

  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @returns AuthController
   */
  public static getInstance = (app: Express): AuthController => {
    if (AuthController.authController === null) {
      AuthController.authController = new AuthController();
      app.post("/api/auth/signup", AuthController.authController.signup);
      app.post("/api/auth/login", AuthController.authController.login);
      app.get("/api/auth", AuthController.authController.profile);
      app.delete("/api/auth", AuthController.authController.logout);
    }

    return AuthController.authController;
  };

  private constructor() {}

  /**
   * Creates a new user.
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON user object and cookie set as the new user
   */
  signup = async (req: Request, res: Response): Promise<void> => {
    const newUser = req.body;
    const password = newUser.password;

    try {
      const hash = await bcrypt.hash(password, saltRounds);
      newUser.password = hash;

      const existingUser = await AuthController.userDao.findUserByCondition({
        username: req.body.username,
      });

      if (existingUser) {
        res.sendStatus(403);
        return;
      } else {
        const insertedUser = await AuthController.userDao.createUser(newUser);
        insertedUser.password = "";
        (req.session as Session).profile = insertedUser;
        res.json(insertedUser);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };

  /**
   * Determine if someone is logged in or not.
   * @param req request from client
   * @param res response containing the profile if logged in.
   */
  profile = async (req: Request, res: Response): Promise<void> => {
    const { profile } = req.session as Session;
    if (profile) {
      profile.password = "";
      res.json(profile);
    } else {
      res.sendStatus(403);
    }
  };

  /**
   * Determine if someone is logged in or not.
   * @param req request from client
   * @param res response containing the profile if logged in.
   */
  login = async (req: Request, res: Response): Promise<void> => {
    const user = req.body;
    const password = user.password;
    const existingUser = await AuthController.userDao.findUserByCondition({
      username: req.body.username,
    });

    if (!existingUser) {
      res.sendStatus(403);
      return;
    }

    const match = await bcrypt.compare(password, existingUser.password);

    if (match) {
      existingUser.password = "*****";
      (req.session as Session).profile = existingUser;
      res.json(existingUser);
    } else {
      res.sendStatus(403);
    }
  };

  /**
   * Determine if someone is logged in or not.
   * @param req request from client
   * @param res response containing the profile if logged in.
   */
  logout = async (req: Request, res: Response): Promise<void> => {
    req.session.destroy((err) => {
      if (!err) {
        res.sendStatus(200);
      } else {
        console.log(err);
        res.sendStatus(500);
      }
    });
  };
}
