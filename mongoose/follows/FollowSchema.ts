import mongoose from "mongoose";
import Follow from "../../models/follows/Follow";

const FollowSchema = new mongoose.Schema<Follow>(
  {
    followedBy: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    followed: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  },
  {
    collection: "follows",
  }
);

export default FollowSchema;
