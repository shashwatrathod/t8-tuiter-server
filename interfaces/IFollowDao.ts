import Follow from "../models/follows/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface IFollowDao {
  findFollowers(uid: string): Promise<Follow[]>;
  findFollowing(uid: string): Promise<Follow[]>;
  userFollowsAnotherUser(uid1: string, uid2: string): Promise<Follow>;
  userUnfollowsAnotherUser(uid1: string, uid2: string): Promise<any>;
}
