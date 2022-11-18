import ILikeDao from "../interfaces/ILikeDao";
import Like from "../models/likes/Like";
import LikeModel from "../mongoose/likes/LikeModel";

/**
 * Represents the Like DAO for implementing the API endpoints for Like resource.
 */
export default class LikeDao implements ILikeDao {
  private static likeDao: LikeDao | null = null;

  /**
   * Creates singleton DAO instance
   * @return LikeDao
   */
  public static getInstance = (): LikeDao => {
    if (LikeDao.likeDao === null) {
      LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
  };

  private constructor() {}

  /**
   * Find all users that liked this tuit
   * @param tid id of the tuit
   * @returns list of users that liked the tuit
   */
  findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
    LikeModel.find({ tuit: tid }).populate("likedBy").exec();

  /**
   * Find all the tuits liked by this user
   * @param uid id of the user
   * @returns list of tuits liked by this user
   */
  findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
    LikeModel.find({ likedBy: uid }).populate("tuit").exec();

  /**
   * Register that a user likes a tuit
   * @param uid id of the user who likes the tuit
   * @param tid id of the tuit being liked
   */
  userLikesTuit = async (tid: string, uid: string): Promise<any> =>
    LikeModel.create({ tuit: tid, likedBy: uid });

  /**
   * Register that a user un-likes a tuit
   *
   * @param uid id of the user who unlikes the tuit
   * @param tid id of the tuit being unliked
   */
  userUnlikesTuit = async (tid: string, uid: string): Promise<any> =>
    LikeModel.deleteOne({ tuit: tid, likedBy: uid });

  /**
   * Find if a user likes this tuit
   * @param tid id of the tuit
   * @param uid id of the user
   * @returns Like if this user has liked this tuit
   */
  findUserLikesTuit = async (tid: string, uid: string): Promise<Like | null> =>
    LikeModel.findOne({ tuit: tid, likedBy: uid });

  /**
   * Find the number of likes on this tuit
   * @param tid the tuit
   * @returns number of likes on the tuit
   */
  findLikesCount = async (tid: string): Promise<number> =>
    LikeModel.count({ tuit: tid });
}
