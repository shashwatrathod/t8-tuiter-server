import User from "../models/User";
import IUserDao from "../interfaces/IUserDao";
import UserModel from "../mongoose/models/UserModel";

export default class UserDao implements IUserDao {
  async findAllUsers(): Promise<User[]> {
    return await UserModel.find();
  }
  async findUserById(uid: string): Promise<User | null> {
    return await UserModel.findById(uid);
  }
  async createUser(user: User): Promise<User> {
    return await UserModel.create(user);
  }
  async deleteUser(uid: string): Promise<any> {
    return await UserModel.deleteOne({ _id: uid });
  }
  async updateUser(uid: string, user: User): Promise<any> {
    return await UserModel.updateOne({ _id: uid }, { $set: user });
  }
}
