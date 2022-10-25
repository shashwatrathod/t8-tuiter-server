import Tuit from "../models/tuits/Tuit";
import ITuitDao from "../interfaces/ITuitDao";
import TuitModel from "../mongoose/tuits/TuitModel";

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
  findAllTuits = async (): Promise<Tuit[]> =>
    TuitModel.find().populate("postedBy").exec();
  findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
    TuitModel.find({ postedBy: uid })
      // .populate("postedBy") removing to improve performance
      .exec();
  findTuitById = async (uid: string): Promise<any> =>
    TuitModel.findById(uid)
      // .populate("postedBy") removing to improve performance
      .exec();
  createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
    TuitModel.create({ ...tuit, postedBy: uid });
  updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
    TuitModel.updateOne({ _id: tid }, { $set: tuit });
  deleteTuit = async (tid: string): Promise<any> =>
    TuitModel.deleteOne({ _id: tid });
}