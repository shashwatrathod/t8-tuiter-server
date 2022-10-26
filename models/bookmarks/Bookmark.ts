import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Bookmark represents a relationship between user where the user
 * bookmarks a tuit to read it later.
 *
 * @property {User} bookmarkedBy the user who bookmarked the tuit
 * @property {Tuit} tuit the tuit which was bookmarked
 */
export default interface Bookmark {
  bookmarkedBy: User;
  tuit: Tuit;
}
