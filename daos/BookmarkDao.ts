/**
 * @file Data access object RESTful Web service API for the bookmark resource
 */

import IBookmarkDao from "../interfaces/IBookmarkDao";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

/**
 * This class represents the Bookmark DAO for implementing the API endpoints for Bookmark resource.
 */
export default class BookmarkDao implements IBookmarkDao {
  private static bookmarkDao: BookmarkDao | null = null;

  /**
   * Returns a singleton DAO instance
   * @return BookmarkDao
   */
  public static getInstance = (): BookmarkDao => {
    if (BookmarkDao.bookmarkDao === null) {
      BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
  };

  private constructor() {}

  /**
   * Find all tuits that that are bookmarked by this user
   * @param uid representing the user for which tuits are to be retrieved
   */
  findTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
    BookmarkModel.find({ bookmarkedBy: uid }).populate("tuit").exec();

  /**
   * User bookmarks a tuit
   * @param uid representing the user that is bookmarking the tuit
   * @param tid tuit being bookmarked
   */
  userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
    BookmarkModel.create({ bookmarkedBy: uid, tuit: tid });

  /**
   * User un-bookmarks a tuit
   * @param uid representing the user that is unmarking the tuit
   * @param tid tuit that is being unmarked
   */
  userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
    BookmarkModel.deleteOne({ bookmarkedBy: uid, tuit: tid });
}
