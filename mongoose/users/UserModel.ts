import mongoose from "mongoose";
import UserSchema from "./UserSchema";

/**
 * @file Implements mongoose model to CRUD
 * documents in the user collection
 */
const UserModel = mongoose.model("UserModel", UserSchema);
export default UserModel;
