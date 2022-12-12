/**
 * @file Controller RESTful Web service API for managing user mentions
 */
 import { Request, Response, Express } from "express";
 import { Session } from "..";
 import IUserMentionsController from "../interfaces/IUserMentionsController";
 import TuitDao from "../daos/TuitDao";
 import UserDao from "../daos/UserDao";
 
 /**
  * @class UserMentionsController Implements RESTful Web service API for user mentions.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/mentions to retrieve all the tuits that mentioned this user
  *     </li>
  * </ul>
  * @property {UserMentionsController} userMentionsController Singleton controller implementing
  * RESTful Web service API
  */
 export default class UserMentionsController implements IUserMentionsController {
   private static userMentionsController: UserMentionsController | null = null;
   private static tuitDao: TuitDao = TuitDao.getInstance();
   private static userDao: UserDao = UserDao.getInstance(); 

   /**
    * Creates singleton controller instance
    * @param {Express} app Express instance to declare the RESTful Web service
    * API
    * @return UserMentionsController
    */
   public static getInstance = (app: Express): UserMentionsController => {
     if (UserMentionsController.userMentionsController === null) {
       UserMentionsController.userMentionsController = new UserMentionsController();
       app.get(
         "/api/users/:uid/mentions",
         UserMentionsController.userMentionsController.findUserMentions
       );
       
     }
     return UserMentionsController.userMentionsController;
   };

   private constructor() {}

   /**
    * Find the tuits that mention the username of the user specified by the userId in this request's params. e.g. "This is a sample tuit from @johndoe"
    */
findUserMentions = async (req: Request, res: Response) => {
  try 
  {const userId =
    req.params.uid === "me" && (req.session as Session).profile
      ? (req.session as Session).profile._id
      : req.params.uid;

  if (userId === "me") res.sendStatus(403); // If the user is not logged in, but still passes "me", we don't want to process this request any further
  const user = await UserMentionsController.userDao.findUserById(userId);

  if (!user) res.sendStatus(400); // The user with given ID doesn't exists. This is a bad request

  const allTuits = await UserMentionsController.tuitDao.findAllTuits();

  let username = `@${user?.username.toLocaleLowerCase()}`;

  const mentionedTuits = allTuits.filter(tuit => tuit.tuit.toLocaleLowerCase().includes(username));

  res.json(mentionedTuits);
  }
    catch(e){res.sendStatus(400)}
    
   };
 }
 