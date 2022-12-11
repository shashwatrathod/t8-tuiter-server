import Tuit from "../models/tuits/Tuit";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface IUserMentionsDao {
  findUserLikesTuit(uid: string[]): Promise<Tuit[]>;
 }