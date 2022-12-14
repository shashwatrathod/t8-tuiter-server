import Stats from "../models/tuits/Stats";
import Tuit from "../models/tuits/Tuit";

/**
 * @file Declares API for Tuits related data access object methods
 */
export default interface ITuitDao {
  findAllTuits(): Promise<Tuit[]>;
  findAllTuitsByUser(uid: string): Promise<Tuit[]>;
  findTuitById(tid: string): Promise<Tuit>;
  createTuitByUser(uid: string, tuit: Tuit): Promise<Tuit>;
  updateTuit(tid: string, tuit: Tuit): Promise<any>;
  updateStats(tid: string, newStats: Stats): Promise<any>;
  updateVersion(tid: string): Promise<any>;
  deleteTuit(tid: string): Promise<any>;
}
