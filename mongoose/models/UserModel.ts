import mongoose from "mongoose";
import UserSchema from "../schemas/UserSchema";

const UserModel = mongoose.model("UserModel", UserSchema);
export default UserModel;
