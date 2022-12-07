import TuitVersion from "../models/tuits/TuitVersion";

/**
 * @file Declares API for TuitVersions related data access object methods
 */
export default interface ITuitVersionDao {
  findAllPreviousVersions(tid: string): Promise<TuitVersion[]>;
  createTuitVersion(tid: string, tuit: string, v: number): Promise<TuitVersion>;
}
