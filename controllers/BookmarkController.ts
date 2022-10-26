import BookmarkDao from "../daos/BookmarkDao";
import IBookmarkController from "../interfaces/IBookmarkController";
import { Express, Request, Response } from "express";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmark resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/bookmarks to find all the tuits bookmarked by this user
 *     </li>
 *     <li>POST /api/users/:uid/bookmarks/:tid registers that a user bookmarked a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/bookmarks/:tid registers that a user
 *     unbookmarked a tuit</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements IBookmarkController {
  private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
  private static bookmarkController: BookmarkController | null = null;

  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return BookmarkController
   */
  public static getInstance = (app: Express): BookmarkController => {
    if (BookmarkController.bookmarkController === null) {
      BookmarkController.bookmarkController = new BookmarkController();
      app.get(
        "/api/users/:uid/bookmarks",
        BookmarkController.bookmarkController.findTuitsBookmarkedByUser
      );
      app.post(
        "/api/users/:uid/bookmarks/:tid",
        BookmarkController.bookmarkController.userBookmarksTuit
      );
      app.delete(
        "/api/users/:uid/bookmarks/:tid",
        BookmarkController.bookmarkController.userUnbookmarksTuit
      );
    }
    return BookmarkController.bookmarkController;
  };

  private constructor() {}

  /**
   * Retrieves all tuits that that are bookmarked by this user
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user for which tuits are to be retrieved
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user objects
   */
  findTuitsBookmarkedByUser = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .findTuitsBookmarkedByUser(req.params.uid)
      .then((bookmarks) => res.json(bookmarks));

  /**
   * Registers that this user bookmarked a tuit
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is bookmarking the tuit
   * and the tuit being bookmarked
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new bookmarks that was inserted in the
   * database
   */
  userBookmarksTuit = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .userBookmarksTuit(req.params.uid, req.params.tid)
      .then((bookmarks) => res.json(bookmarks));

  /**
   * Registers that this user unbookmarked a tuit
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is unmarking
   * the tuit and the tuit being unmarked
   * @param {Response} res Represents response to client, including status
   * on whether deleting the like was successful or not
   */
  userUnbookmarksTuit = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .userUnbookmarksTuit(req.params.uid, req.params.tid)
      .then((status) => res.send(status));
}
