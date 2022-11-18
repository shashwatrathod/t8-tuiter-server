import Tuit from "../models/tuits/Tuit";
import ITuitDao from "../interfaces/ITuitDao";
import TuitModel from "../mongoose/tuits/TuitModel";
import Stats from "../models/tuits/Stats";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {UserDao} tuitDao Private single instance of UserDao
 */
export default class TuitDao implements ITuitDao {
  private static tuitDao: TuitDao | null = null;
  public static getInstance = (): TuitDao => {
    if (TuitDao.tuitDao === null) {
      TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
  };
  private constructor() {}

  /**
   * @returns all the tuits in the db
   */
  findAllTuits = async (): Promise<Tuit[]> =>
    TuitModel.find().populate("postedBy").exec();

  /**
   *
   * @param uid id of the user
   * @returns list of all tuits posted by this user
   */
  findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
    TuitModel.find({ postedBy: uid })
      // .populate("postedBy") removing to improve performance
      .exec();

  /**
   *
   * @param tid id of the tuit
   * @returns find the tuit  specified by tid
   */
  findTuitById = async (tid: string): Promise<any> =>
    TuitModel.findById(tid)
      // .populate("postedBy") removing to improve performance
      .exec();

  /**
   * Create a new tuit
   * @param uid id of the author
   * @param tuit body of the tuit
   */
  createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
    TuitModel.create({ ...tuit, postedBy: uid });

  /**
   * Modify an existing tuit
   * @param tid id of the tuit to be modified
   * @param tuit modified tuit
   */
  updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
    TuitModel.updateOne({ _id: tid }, { $set: tuit });

  /**
   * Update a tuit's stats
   * @param tid id of the tuit
   * @param newStats new stats for the tuit
   */
  updateStats = async (tid: string, newStats: Stats): Promise<any> =>
    TuitModel.updateOne({ _id: tid }, { $set: { stats: newStats } });

  /**
   * Delete the tuit specified by tid
   * @param tid id of the tuit to be deleted
   */
  deleteTuit = async (tid: string): Promise<any> =>
    TuitModel.deleteOne({ _id: tid });
}