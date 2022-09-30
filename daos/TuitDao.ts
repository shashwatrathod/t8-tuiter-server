import Tuit from "../models/Tuit";
import ITuitDao from "../interfaces/ITuitDao";
import TuitModel from "../mongoose/models/TuitModel";

export default class TuitDao implements ITuitDao {
  async findAllTuits(): Promise<Tuit[]> {
    return await TuitModel.find();
  }
  async findTuitsByUser(uid: string): Promise<Tuit[]> {
    return await TuitModel.find({ postedBy: uid });
  }
  async findTuitById(tid: string): Promise<Tuit | null> {
    return await TuitModel.findById(tid);
  }
  async createTuit(tuit: Tuit): Promise<Tuit> {
    return await TuitModel.create(tuit);
  }
  async updateTuit(tid: string, tuit: Tuit): Promise<any> {
    return await TuitModel.updateOne({ _id: tid }, { $set: tuit });
  }
  async deleteTuit(tid: string): Promise<any> {
    return await TuitModel.deleteOne({ _id: tid });
  }
}
