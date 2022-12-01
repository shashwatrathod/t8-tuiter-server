/**
 * @file Data access object RESTful Web service API for message resource
 */

 import IUserMentionsDao from "../interfaces/IUserMentionsDao";
import Tuit from "../models/tuits/Tuit";
import TuitModel from "../mongoose/tuits/TuitModel";
 
 /**
  * This class represents the Message DAO for implementing the API endpoints for Message resource.
  */
 export default class UserMentionsDao implements IUserMentionsDao {
   private static userMentionsDao: UserMentionsDao | null = null;
 
   /**
    * Creates singleton DAO instance
    * @return MessageDao
    */
   public static getInstance = (): UserMentionsDao => {
     if (UserMentionsDao.userMentionsDao === null) {
       UserMentionsDao.userMentionsDao = new UserMentionsDao();
     }
     return UserMentionsDao.userMentionsDao;
   };

 }
 