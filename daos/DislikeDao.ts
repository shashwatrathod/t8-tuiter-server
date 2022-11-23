import IDislikeDao from "../interfaces/IDislikeDao";
import Dislike from "../models/dislikes/Dislike";
import DislikeModel from "../mongoose/dislikes/DislikeModel";

/**
 * Represents the Dislike DAO for implementing the API endpoints for Dislike resource.
 */
export default class DislikeDao implements IDislikeDao {
  private static dislikeDao: DislikeDao | null = null;

  /**
   * Creates singleton DAO instance
   * @return DislikeDao
   */
  public static getInstance = (): DislikeDao => {
    if (DislikeDao.dislikeDao === null) {
      DislikeDao.dislikeDao = new DislikeDao();
    }
    return DislikeDao.dislikeDao;
  };

  private constructor() {}

  /**
   * Find all users that disliked this tuit
   * @param tid id of the tuit
   * @returns list of users that disliked the tuit
   */
  findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
    DislikeModel.find({ tuit: tid }).populate("dislikedBy").exec();

  /**
   * Find all the tuits disliked by this user
   * @param uid id of the user
   * @returns list of tuits disliked by this user
   */
  findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
    DislikeModel.find({ dislikedBy: uid }).populate("tuit").exec();

  /**
   * Register that a user dislikes a tuit
   * @param uid id of the user who dislikes the tuit
   * @param tid id of the tuit being disliked
   */
  userDislikesTuit = async (tid: string, uid: string): Promise<any> =>
    DislikeModel.create({ tuit: tid, dislikedBy: uid });

  /**
   * Register that a user un-dislikes a tuit
   *
   * @param uid id of the user who undislikes the tuit
   * @param tid id of the tuit being unliked
   */
  userUnDislikesTuit = async (tid: string, uid: string): Promise<any> =>
    DislikeModel.deleteOne({ tuit: tid, dislikedBy: uid });

  /**
   * Find if a user dislikes this tuit
   * @param tid id of the tuit
   * @param uid id of the user
   * @returns Dislike if this user has disliked this tuit
   */
  findUserDislikesTuit = async (
    tid: string,
    uid: string
  ): Promise<Dislike | null> =>
    DislikeModel.findOne({ tuit: tid, dislikedBy: uid });

  /**
   * Find the number of dislikes on this tuit
   * @param tid the tuit
   * @returns number of dislikes on the tuit
   */
  findDislikesCount = async (tid: string): Promise<number> =>
    DislikeModel.count({ tuit: tid });
}
