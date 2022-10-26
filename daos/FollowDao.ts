import IFollowDao from "../interfaces/IFollowDao";
import Follow from "../models/follows/Follow";
import FollowModel from "../mongoose/follows/FollowModel";

/**
 * Represents the Follow DAO for implementing the API endpoints for Follow resource.
 */
export default class FollowDao implements IFollowDao {
  private static followDao: FollowDao | null = null;

  /**
   * Creates singleton DAO instance
   * @return FollowDao
   */
  public static getInstance = (): FollowDao => {
    if (FollowDao.followDao === null) {
      FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
  };
  private constructor() {}

  /**
   * Retrieves all users that follow this user
   * @param uid user whose followers are to be retrieved
   */
  findFollowers = async (uid: string): Promise<Follow[]> =>
    FollowModel.find({ followed: uid }).populate("followedBy").exec();

  /**
   * Retrieves all users followed by a user from the database
   * @param uid User whose following is to be retrieved
   */
  findFollowing = async (uid: string): Promise<Follow[]> =>
    FollowModel.find({ followedBy: uid }).populate("followed").exec();

  /**
   * User can follow another user
   * @param uid1 user that wants to follow
   * @param uid2 user that is being followed
   */
  userFollowsAnotherUser = async (uid1: string, uid2: string): Promise<any> =>
    FollowModel.create({ followedBy: uid1, followed: uid2 });

  /**
   * User can unfollow another user
   * @param uid1 user that wants to unfollow
   * @param uid2 user that is being unfollowed
   */
  userUnfollowsAnotherUser = async (uid1: string, uid2: string): Promise<any> =>
    FollowModel.deleteOne({ followedBy: uid1, followed: uid2 });
}
