import User from "../models/users/User";

/**
 * @file Declares API for Users related data access object methods
 */
export default interface IUserDao {
  findAllUsers(): Promise<User[]>;
  findUserById(uid: string): Promise<any>;
  createUser(user: User): Promise<User>;
  updateUser(uid: string, user: User): Promise<any>;
  deleteUser(uid: string): Promise<any>;
  deleteUserByCondition(condition: any): Promise<any>;
  deleteAllUsers(): Promise<any>;
}
