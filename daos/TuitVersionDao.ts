import ITuitVersionDao from "../interfaces/ITuitVersionDao";
import TuitVersion from "../models/tuits/TuitVersion";
import TuitVersionModel from "../mongoose/tuitVersions/TuitVersionModel";

/**
 * Represents the Like DAO for implementing the API endpoints for Like resource.
 */
export default class TuitVersionDao implements ITuitVersionDao {
  private static tuitVersionDao: ITuitVersionDao | null = null;

  private constructor() {}

  /**
   * @returns a static instance of the DAO
   */
  public static getInstance = (): ITuitVersionDao => {
    if (TuitVersionDao.tuitVersionDao === null) {
      TuitVersionDao.tuitVersionDao = new TuitVersionDao();
    }

    return TuitVersionDao.tuitVersionDao;
  };

  /**
   * Create a new version for a tuit that exists in the Tuits collection
   * @param tid _id of the original tuit
   * @param tuit text body of the tuit (Tuit.tuit)
   * @param v version number of the tuit before most recent edit was pushed
   */
  createTuitVersion = (
    tid: string,
    tuit: string,
    v: number
  ): Promise<TuitVersion> => TuitVersionModel.create({ tuit, v, tid });

  /**
   * Find all the pervious versions of the tuit specified by tid. (DOES NOT include the most recent version present in Tuits collection).
   * @param tid id of the tuit
   * @returns list of all previous versions of the tuit
   */
  findAllPreviousVersions = (tid: string): Promise<TuitVersion[]> =>
    TuitVersionModel.find({ tid }).exec();
}
    
