import User from "../users/User";

/**
 * @typedef Follow Represents follows relationship between two users,
 * as in a user follows another user
 * @property {User} followedBy the user who followed another user
 * @property {User} followed the user who was followed
 */
export default interface Follow {
  followedBy: User;
  followed: User;
}
