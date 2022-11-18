import Dislike from "../models/dislikes/Dislike";

/**
 * @file Declares API for Dislikes related data access object methods
 */
export default interface IDislikeDao {
  findAllUsersThatDislikedTuit(tid: string): Promise<Dislike[]>;
  findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]>;
  userUnDislikesTuit(tid: string, uid: string): Promise<any>;
  userDislikesTuit(tid: string, uid: string): Promise<Dislike>;
  findUserDislikesTuit(tid: string, uid: string): Promise<Dislike | null>;
  findDislikesCount(tid: string): Promise<number>;
}
