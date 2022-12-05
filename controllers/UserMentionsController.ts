/**
 * @file Controller RESTful Web service API for messages resource
 */
 import { Request, Response, Express, json } from "express";
 import { Session } from "..";
 import IUserMentionsController from "../interfaces/IUserMentionsController";
 import UserMentionsDao from "../daos/UserMentionsDao";
 import TuitDao from "../daos/TuitDao";
 import UserDao from "../daos/UserDao";
import Tuit from "../models/tuits/Tuit";
 
 /**
  * @class MessageController Implements RESTful Web service API for messages resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/messages/sent to retrieve all the messages sent by user
  *     </li>
  *     <li>GET /api/users/:uid/messages/received to retrieve all messages recieved by user
  *     </li>
  *     <li>POST /api/messages to record that a user sends a message to another user
  *     </li>
  *     <li>DELETE /api/messages/:mid delete a message</li>
  * </ul>
  * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
  * @property {MessageController} messageController Singleton controller implementing
  * RESTful Web service API
  */
 export default class UserMentionsController implements IUserMentionsController {
   private static userMentionsDao: UserMentionsDao = UserMentionsDao.getInstance();
   private static userMentionsController: UserMentionsController | null = null;
   private static tuitDao: TuitDao = TuitDao.getInstance();
   private static userDao: UserDao = UserDao.getInstance(); 
   /**
    * Creates singleton controller instance
    * @param {Express} app Express instance to declare the RESTful Web service
    * API
    * @return MessageController
    */
   public static getInstance = (app: Express): UserMentionsController => {
     if (UserMentionsController.userMentionsController === null) {
       UserMentionsController.userMentionsController = new UserMentionsController();
       app.get(
         "/api/users/:uid/mentions",
         UserMentionsController.userMentionsController.findUserLikesTuit
       );
       
     }
     return UserMentionsController.userMentionsController;
   };

   private constructor() {}

findUserLikesTuit = async (req: Request, res: Response) => {
    const userId =
      req.params.uid === "me" && (req.session as Session).profile
        ? (req.session as Session).profile._id
        : req.params.uid;
    const userName = UserMentionsController.userDao.findUserById(userId);

    const str = new String('@ellenripley');
    const searchUserName = str.concat('');
//     const searchUserName = str.concat(await username);
    const allTuits = await UserMentionsController.tuitDao.findAllTuits();
    let mentionTuits : string[];
    mentionTuits = [];
    let eachTuit: Tuit;
    // Have to convert all Tuits to Json
    // After getting each tuit
    for(var key in allTuits){
      eachTuit = allTuits[key];
      if(eachTuit.tuit.includes(searchUserName)){
        mentionTuits.push(eachTuit._id.toString());
        }
    }
    console.log(mentionTuits);
    UserMentionsController.userMentionsDao
      .findUserLikesTuit(mentionTuits)
      .then((mentionTuits: Tuit[]) => res.json(mentionTuits));
   };
 }
 