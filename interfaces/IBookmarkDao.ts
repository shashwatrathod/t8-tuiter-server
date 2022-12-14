import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @file Declares API for Bookmark related data access object methods
 */
export default interface IBookmarkDao {
  findTuitsBookmarkedByUser(uid: string): Promise<Bookmark[]>;
  userBookmarksTuit(uid: string, tid: string): Promise<Bookmark>;
  userUnbookmarksTuit(uid: string, tid: string): Promise<any>;
}
